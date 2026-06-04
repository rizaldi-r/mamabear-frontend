import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/features/cart/store/useCartStore";

const FREE_SHIPPING_THRESHOLD = 150000;
const DUMMY_PROMO_CODE = "MAMABEAR";
const DUMMY_PROMO_DISCOUNT = 30146;

export function useCartLogic() {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const router = useRouter();
  
  // Intercept the raw items and guarantee it falls back to an empty array without breaking references
  const { items: rawItems, updateQuantity, removeItem, clearCart, isLoading } = useCartStore();
  const items = useMemo(() => rawItems || [], [rawItems]);
  
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // useEffect(() => {
  //   console.log("[Cart Page] Current Cart Data:", items);
  // }, [items]);

  useEffect(() => {
    if (items.length > 0 && selectedIds.size === 0) {
      const allIds = new Set(items.map((item) => item.id));
      setSelectedIds(allIds);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleAll = () => {
    if (selectedIds.size === items.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(items.map((item) => item.id)));
    }
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === DUMMY_PROMO_CODE) {
      setAppliedPromo(promoCode.toUpperCase());
    } else {
      alert("Kode promo tidak valid");
      setAppliedPromo(null);
    }
  };

  const handleRemoveSelected = async () => {
    if (selectedIds.size === items.length) {
      await clearCart(isLoggedIn);
      setSelectedIds(new Set());
      return;
    }

    for (const id of Array.from(selectedIds)) {
      await removeItem(id, isLoggedIn);
    }
    setSelectedIds(new Set());
  };

  const handleCheckout = () => {
    if (selectedIds.size === 0) return;

    // Convert the Set of selected IDs to a comma-separated string for the URL
    const itemsQuery = Array.from(selectedIds).join(",");
    const targetUrl = `/checkout?items=${itemsQuery}`;

    router.push(targetUrl);
    // if (!isLoggedIn) {
    //   // Not logged in: Send to login page, but remember where they wanted to go
    //   router.push(`/login?callbackUrl=${encodeURIComponent(targetUrl)}`);
    // } else {
    //   // Logged in: Go straight to checkout
    //   router.push(targetUrl);
    // }
  };

  const { subtotal, totalQuantity } = useMemo(() => {
    let sub = 0;
    let qty = 0;
    // Extra defensive fallback inside the loop
    (items || []).forEach((item) => {
      if (selectedIds.has(item.id)) {
        sub += Number(item.price) * item.quantity;
        qty += item.quantity;
      }
    });
    return { subtotal: sub, totalQuantity: qty };
  }, [items, selectedIds]);

  const discountAmount = appliedPromo ? DUMMY_PROMO_DISCOUNT : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount);

  const missingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return {
    items,
    isLoading,
    isLoggedIn,
    selectedIds,
    toggleSelection,
    toggleAll,
    updateQuantity,
    removeItem,
    handleRemoveSelected,
    handleCheckout,
    subtotal,
    totalQuantity,
    grandTotal,
    discountAmount,
    missingForFreeShipping,
    freeShippingProgress,
    promoCode,
    setPromoCode,
    appliedPromo,
    handleApplyPromo
  };
}