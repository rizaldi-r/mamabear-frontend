import { useState, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ProductDetail, ProductImage } from "../types/product.types";

export const useProductDetail = (product: ProductDetail) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const variantQuery = searchParams.get("variant");

  // Initialize variant from URL or fallback to the first available variant
  const initialVariant = useMemo(() => {
    if (variantQuery && product.variants) {
      const found = product.variants.find(
        (v) => v.id.toString() === variantQuery,
      );
      if (found) return found;
    }
    return product.variants?.length > 0 ? product.variants[0] : null;
  }, [variantQuery, product.variants]);

  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    initialVariant ? initialVariant.id : null,
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<
    "description" | "ingredients" | "usage"
  >("description");
  const [mainImage, setMainImage] = useState<ProductImage | null>(
    product.images?.length > 0 ? product.images[0] : null,
  );

  const currentVariant = useMemo(() => {
    return product.variants?.find((v) => v.id === selectedVariantId) || null;
  }, [selectedVariantId, product.variants]);

  // Synchronize variant selection with URL search params
  const handleVariantSelect = (id: number) => {
    setSelectedVariantId(id);
    setQuantity(1); // Reset quantity when variant changes

    const params = new URLSearchParams(searchParams.toString());
    params.set("variant", id.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleQuantityChange = (type: "increase" | "decrease") => {
    setQuantity((prev) => {
      if (type === "increase") {
        const maxStock = currentVariant?.stock || 1;
        return prev < maxStock ? prev + 1 : prev;
      } else {
        return prev > 1 ? prev - 1 : 1;
      }
    });
  };

  return {
    selectedVariantId,
    currentVariant,
    quantity,
    activeTab,
    mainImage,
    setActiveTab,
    setMainImage,
    handleVariantSelect,
    handleQuantityChange,
  };
};
