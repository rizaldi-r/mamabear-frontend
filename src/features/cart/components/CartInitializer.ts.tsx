"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/features/cart/store/useCartStore";

export function CartInitializer() {
  const { status } = useSession();
  const items = useCartStore((state) => state.items);
  const mergeGuestCart = useCartStore((state) => state.mergeGuestCart);
  const initializeCart = useCartStore((state) => state.initializeCart);
  const clearCart = useCartStore((state) => state.clearCart);
  
  // Use a ref to ensure we only run the merge/initialize logic ONCE per session lifecycle
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Only run this logic once the session has finished loading and is authenticated
    if (status === "authenticated" && !hasInitialized.current) {
      hasInitialized.current = true;

      // Guest items created locally have the dummy ID "guest-cart".
      const hasGuestItems = items.some((item) => item.cartId === "guest-cart");

      if (hasGuestItems) {
        // If they have guest items, push them to the DB and sync
        mergeGuestCart();
      } else {
        // If their local cart is empty, just fetch their existing DB cart
        initializeCart(true);
      }
    }
    
    // Reset the ref if they log out, so it can run again if they log back in
    if (status === "unauthenticated") {
      hasInitialized.current = false;
      
      // SECURITY: If the user logs out, their DB cart might still be cached in localStorage.
      // We check if any items belong to the database (cartId !== "guest-cart").
      // If so, we wipe the local storage so the next guest gets a fresh empty cart.
      const hasDbItems = items.some((item) => item.cartId !== "guest-cart");
      if (hasDbItems) {
        clearCart(false); // 'false' ensures we only clear the local state, not the DB
      }
    }
  }, [status, items, mergeGuestCart, initializeCart, clearCart]);

  return null;
}