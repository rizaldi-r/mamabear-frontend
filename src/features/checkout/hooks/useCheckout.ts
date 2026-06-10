import { useState, useEffect } from "react";
import { Cart } from "@/features/cart/types/cart.types";
import { Address } from "@/features/address/types/address.types";
import { CreateOrderPayload } from "@/features/checkout/types/checkoutOrder.types";
import { createOrder } from "@/features/checkout/services/checkoutService";
import { ShippingOption } from "@/features/address/types/shipping.types";
import { calculateShippingCost } from "@/features/address/services/shippingService";
import { createPayment } from "@/features/checkout/services/paymentService";
import { fetchCart, updateCartItemCourier } from "@/features/cart/services/cartService";
import { useCartStore } from "@/features/cart/store/use-cart-store";

export function useCheckout(initialAddresses: Address[], userEmail: string) {
  // Store selector to refresh checkout items
  const initializeCart = useCartStore((state) => state.initializeCart);

  // State: selectedAddressId is managed as string for seamless UI rendering
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    initialAddresses.length > 0 ? String(initialAddresses[0].id) : null,
  );

  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoadingCart, setIsLoadingCart] = useState(true);

  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);

  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>("");

  const [isOrderCreated, setIsOrderCreated] = useState(false);
  const [paymentRedirectUrl, setPaymentRedirectUrl] = useState<string | null>(null);

  // Derived Values: Safe lookup matching as strings
  const selectedAddress = initialAddresses.find((a) => String(a.id) === selectedAddressId);
  const subtotal = cart?.items?.reduce((sum, item) => sum + parseInt(item.price) * item.quantity, 0) || 0;
  const shippingCost = selectedShipping?.cost || 0;
  const promoDiscount = 0; // Placeholder for promo logic
  const grandTotal = subtotal + shippingCost - promoDiscount;

  // Effects
  useEffect(() => {
    async function loadCart() {
      try {
        const cartData = await fetchCart();
        setCart(cartData);
      } catch (error) {
        console.error("Failed to load cart for checkout", error);
      } finally {
        setIsLoadingCart(false);
      }
    }
    loadCart();
  }, []);

  useEffect(() => {
    async function getShippingOptions() {
      if (!selectedAddress || !cart?.id || !cart?.items?.length) {
        setShippingOptions([]);
        setSelectedShipping(null);
        return;
      }

      setIsCalculatingShipping(true);
      try {
        const options = await calculateShippingCost({
          destination: selectedAddress.subdistrictId,
          priceSortDirection: "lowest",
        });
        setShippingOptions(options);
        
        if (options.length > 0) {
          const defaultOption = options[0];
          setSelectedShipping(defaultOption); // Default to first option
          
          // Automatically hit updateCartItemCourier for the newly defaulted option
          try {
            const updatedCart = await updateCartItemCourier(cart.id, {
              shippingCostIdr: defaultOption.cost,
              courierName: defaultOption.name || defaultOption.code.toUpperCase(),
              courierCode: defaultOption.code,
              shippingMethod: defaultOption.service,
            });
            // Merge updated cart data while retaining existing items
            setCart((prev) => prev ? { ...updatedCart, items: prev.items } : updatedCart);
          } catch (updateError) {
            console.error("Failed to sync default courier with cart backend", updateError);
          }
        }
      } catch (error) {
        console.error("Failed to calculate shipping", error);
        setShippingOptions([]);
      } finally {
        setIsCalculatingShipping(false);
      }
    }

    getShippingOptions();
    // Intentionally omitting 'cart' from deps to avoid infinite loops when cart is updated
    // We only want this to run when the address changes, or if the cart ID/items structure changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAddressId, cart?.id, cart?.items?.length]); 

  // Handlers
  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id);
  };

  const handleSelectShipping = async (optionIndex: number) => {
    const selectedOption = shippingOptions[optionIndex];
    setSelectedShipping(selectedOption);

    if (cart && selectedOption) {
      try {
        // Hit updateCartItemCourier when user manually selects a courier
        const updatedCart = await updateCartItemCourier(cart.id, {
          shippingCostIdr: selectedOption.cost,
          courierName: selectedOption.name || selectedOption.code.toUpperCase(),
          courierCode: selectedOption.code,
          shippingMethod: selectedOption.service,
        });
        // Merge updated cart data while retaining existing items
        setCart({ ...updatedCart, items: cart.items }); 
      } catch (error) {
        console.error("Failed to update cart courier selection:", error);
      }
    }
  };

  const handleNotesChange = (value: string) => {
    setNotes(value);
  };

  const handleCheckout = async () => {
    if (!selectedAddress || !selectedShipping || !cart) {
      setErrorMessage("Mohon lengkapi alamat dan opsi pengiriman.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // 1. Post Order Creation
      // Convert frontend string ID back into a number (integer) for the backend API
      const payload: CreateOrderPayload = {
        cartId: cart.id,
        addressId: Number(selectedAddress.id), // Casted safely to integer (number)
        notes: notes,
      };

      const order = await createOrder(payload);

      // 2. Post Payment Session Initiation
      const paymentPayload = {
        orderId: order.id,
        // subtotal: order.subtotalIdr,
        subtotal: grandTotal,
        customerDetails: [
          {
            firstName: order.shippingAddress.name,
            email: userEmail,
            phone: order.shippingAddress.phone,
          },
        ],
      };

      const transaction = await createPayment(paymentPayload);

      // 3. Save states, refresh store cart, and Auto-redirect
      setPaymentRedirectUrl(transaction.redirect_url);
      setIsOrderCreated(true);

      try {
        await initializeCart();
      } catch (cartSyncError) {
        console.error("Failed to sync cart after purchase:", cartSyncError);
      }

      if (transaction.redirect_url) {
        window.open(transaction.redirect_url, "_blank");
      }

    } catch (error) {
      console.error("Checkout process failed:", error);
      const msg =
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat memproses pesanan Anda.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    addresses: initialAddresses,
    cart,
    isLoadingCart,
    selectedAddressId,
    shippingOptions,
    selectedShipping,
    isCalculatingShipping,
    isSubmitting,
    errorMessage,
    isOrderCreated,
    paymentRedirectUrl,
    notes,
    totals: {
      subtotal,
      shippingCost,
      promoDiscount,
      grandTotal,
    },
    actions: {
      handleSelectAddress,
      handleSelectShipping,
      handleNotesChange,
      handleCheckout,
    },
  };
}