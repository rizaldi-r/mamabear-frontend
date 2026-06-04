import { Cart, CartItem } from "../types/cart.types";
import { apiClient } from "@/lib/api";

/**
 * Standard API response structure as defined in the guidelines.
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface AddToCartPayload {
  productId: number;
  variantId: number;
  quantity: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function fetchCart(): Promise<Cart | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/cart`, {
      cache: "no-store",
      credentials: "include", // ADD THIS to accept cookies!
    });


    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Gagal mengambil keranjang: HTTP ${res.status}`);
    }

    const response: ApiResponse<Cart> = await res.json();
    console.log("🚀 ~ response fetch cart:", response)

    if (!response.success) {
      throw new Error(response.message || "Gagal mengambil data keranjang");
    }

    return response.data || null;
  } catch (error) {
    console.error("[cartService] fetchCart failed:", error);
    throw error;
  }
}

/**
 * Adds a new item to the cart. 
 * Returns the created/updated CartItem.
 */
export async function addToCart(payload: AddToCartPayload): Promise<CartItem> {
  try {
    const response = await apiClient.post(`/cart/items`, payload);
    const result: ApiResponse<CartItem> = await response.json();

    if (!result.success || !result.data) {
      throw new Error(result.message || "Gagal menambahkan produk ke keranjang");
    }

    return result.data;
  } catch (error) {
    console.error(`[cartService] addToCart failed:`, error);
    throw error;
  }
}

/**
 * Updates the quantity of a specific cart item.
 * Returns the updated CartItem.
 */
export async function updateCartItemQuantity(
  itemId: string,
  quantity: number
): Promise<CartItem> {
  try {
    const response = await apiClient.patch(`/cart/items/${itemId}`, { quantity });
    const result: ApiResponse<CartItem> = await response.json();

    if (!result.success || !result.data) {
      throw new Error(result.message || "Gagal memperbarui jumlah produk");
    }

    return result.data;
  } catch (error) {
    console.error(`[cartService] updateCartItemQuantity failed:`, error);
    throw error;
  }
}

/**
 * Removes a specific item from the cart.
 */
export async function removeCartItem(itemId: string): Promise<void> {
  try {
    const response = await apiClient.delete(`/cart/items/${itemId}`);
    const result: ApiResponse<void> = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Gagal menghapus produk dari keranjang");
    }
  } catch (error) {
    console.error(`[cartService] removeCartItem failed:`, error);
    throw error;
  }
}

export async function clearCart(): Promise<void> {
  try {
    const response = await apiClient.delete(`/cart`);
    const result: ApiResponse<void> = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Gagal mengosongkan keranjang");
    }
  } catch (error) {
    console.error(`[cartService] clearCart failed:`, error);
    throw error;
  }
}

export async function mergeCart(): Promise<Cart> {
  try {
    const response = await apiClient.post(`/cart/merge`);
    const result: ApiResponse<Cart> = await response.json();

    if (!result.success || !result.data) {
      throw new Error(result.message || "Gagal menggabungkan keranjang");
    }

    return result.data;
  } catch (error) {
    console.error(`[cartService] mergeCart failed:`, error);
    throw error;
  }
}

export const cartService = {
  fetchCart,
  addToCart,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
  mergeCart,
};