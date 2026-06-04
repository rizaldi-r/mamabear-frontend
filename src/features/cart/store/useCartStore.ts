import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  ProductDetail,
  ProductVariant,
} from "@/features/products/types/product.types";
import { CartItem } from "@/features/cart/types/cart.types";
import { cartService } from "@/features/cart/services/cartService";

export interface AddItemPayload {
  id: string; // Used for local guest tracking
  product: ProductDetail;
  variant: ProductVariant | null;
  quantity: number;
}

export interface Coordinates {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  isOpen: boolean;

  // Animation state
  cartIconRect: Coordinates | null;
  isFlying: boolean; // Triggers the bounce effect on the cart

  setIsOpen: (isOpen: boolean) => void;
  setCartIconRect: (rect: Coordinates | null) => void;
  triggerCartBounce: () => void;
  initializeCart: (isLoggedIn: boolean) => Promise<void>;
  mergeGuestCart: () => Promise<void>;
  addItem: (payload: AddItemPayload, isLoggedIn: boolean) => Promise<void>;
  updateQuantity: (
    itemId: string,
    quantity: number,
    isLoggedIn: boolean,
  ) => Promise<void>;
  removeItem: (itemId: string, isLoggedIn: boolean) => Promise<void>;
  clearCart: (isLoggedIn: boolean) => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      isOpen: false,
      cartIconRect: null,
      isFlying: false,

      setIsOpen: (isOpen) => set({ isOpen }),

      setCartIconRect: (rect) => set({ cartIconRect: rect }),

      triggerCartBounce: () => {
        set({ isFlying: true });
        setTimeout(() => set({ isFlying: false }), 300); // match bounce animation duration
      },

      initializeCart: async (isLoggedIn) => {
        if (!isLoggedIn) return;

        set({ isLoading: true });
        try {
          const dbCart = await cartService.fetchCart();
          console.log("🚀 ~ dbCart:", dbCart)
          console.log("🚀 ~ dbCart:", dbCart ? "yes" : "false")
          set({ items: dbCart ? dbCart.items : [] });
        } catch (error) {
          console.error("[useCartStore] initializeCart failed:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      mergeGuestCart: async () => {
        const guestItems = get().items || [];
        if (guestItems.length === 0) return;

        set({ isLoading: true });
        try {
          for (const item of guestItems) {
            await cartService.addToCart({
              productId: item.productId,
              variantId: item.variantId,
              quantity: item.quantity,
            });
          }
          const updatedCart = await cartService.fetchCart();
          set({ items: updatedCart ? updatedCart.items : [] });
        } catch (error) {
          console.error("[useCartStore] mergeGuestCart failed:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      addItem: async (payload, isLoggedIn) => {
        const { id, product, variant, quantity } = payload;
        set({ isLoading: true });

        try {
          const currentItems = get().items || [];

          if (isLoggedIn) {
            // Server returns only the CartItem WITHOUT nested product/variant objects
            const dbItem = await cartService.addToCart({
              productId: product.id,
              variantId: variant?.id || 0,
              quantity,
            });

            // Find if item exists in our local array to update its quantity
            const existingItemIndex = currentItems.findIndex(
              (i) =>
                i.productId === product.id &&
                i.variantId === (variant?.id || 0),
            );

            const newItems = [...currentItems];
            if (existingItemIndex >= 0) {
              // Just update the quantity using the response from DB
              newItems[existingItemIndex].quantity = dbItem.quantity;
            } else {
              // Construct the full UI object using DB data + Local Product data
              newItems.push({
                ...dbItem,
                product: { id: product.id, name: product.name, isActive: true },
                variant: variant
                  ? {
                      id: variant.id,
                      priceIdr: variant.priceIdr,
                      stock: variant.stock,
                      productId: product.id,
                    }
                  : { id: 0, priceIdr: "0", stock: 0, productId: product.id },
              });
            }
            set({ items: newItems, isOpen: true });
          } else {
            // Guest mode logic
            const existingItemIndex = currentItems.findIndex(
              (i) => i.id === id,
            );
            const newItems = [...currentItems];

            if (existingItemIndex >= 0) {
              newItems[existingItemIndex].quantity += quantity;
            } else {
              newItems.push({
                id,
                cartId: "guest-cart",
                productId: product.id,
                variantId: variant?.id || 0,
                quantity,
                price: variant
                  ? variant.priceIdr
                  : product.currentPrice.toString(),
                createdAt: new Date().toISOString(),
                product: { id: product.id, name: product.name, isActive: true },
                variant: variant
                  ? {
                      id: variant.id,
                      priceIdr: variant.priceIdr,
                      stock: variant.stock,
                      productId: product.id,
                    }
                  : { id: 0, priceIdr: "0", stock: 0, productId: product.id },
              });
            }
            set({ items: newItems, isOpen: true });
          }
        } catch (error) {
          console.error("[useCartStore] addItem failed:", error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      updateQuantity: async (itemId, quantity, isLoggedIn) => {
        console.log("🚀 ~ itemId:", itemId);
        set({ isLoading: true });
        try {
          if (isLoggedIn) {
            // We ping the DB, then map our local state based on success
            const dbItem = await cartService.updateCartItemQuantity(
              itemId,
              quantity,
            );
            const newItems = (get().items || []).map((item) =>
              item.id === itemId
                ? { ...item, quantity: dbItem.quantity }
                : item,
            );
            set({ items: newItems });
          } else {
            const newItems = (get().items || []).map((item) =>
              item.id === itemId ? { ...item, quantity } : item,
            );
            set({ items: newItems });
          }
        } catch (error) {
          console.error("[useCartStore] updateQuantity failed:", error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (itemId, isLoggedIn) => {
        set({ isLoading: true });
        try {
          if (isLoggedIn) {
            await cartService.removeCartItem(itemId);
          }
          // Filter it out of our local array whether they are logged in or not
          const newItems = (get().items || []).filter(
            (item) => item.id !== itemId,
          );
          set({ items: newItems });
        } catch (error) {
          console.error("[useCartStore] removeItem failed:", error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      clearCart: async (isLoggedIn) => {
        set({ isLoading: true });
        try {
          if (isLoggedIn) {
            await cartService.clearCart();
          }
          set({ items: [] });
        } catch (error) {
          console.error("[useCartStore] clearCart failed:", error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "mamabear-cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === "mamabear-cart-storage") {
      useCartStore.persist.rehydrate();
    }
  });
}
