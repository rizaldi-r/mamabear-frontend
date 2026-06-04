/**
 * Represents the simplified product data returned within a cart item.
 */
export interface CartProduct {
  id: number;
  name: string;
  isActive: boolean;
}

/**
 * Represents the simplified variant data returned within a cart item.
 */
export interface CartVariant {
  id: number;
  priceIdr: string;
  stock: number;
  productId: number;
}

/**
 * Represents an individual item inside the shopping cart.
 */
export interface CartItem {
  id: string;
  cartId: string;
  productId: number;
  variantId: number;
  quantity: number;
  price: string;
  createdAt: string;
  product: CartProduct;
  variant: CartVariant;
}

/**
 * Represents the shopping cart session for a user or guest.
 */
export interface Cart {
  id: string;
  userId: string | null;
  sessionId: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  items: CartItem[];
}