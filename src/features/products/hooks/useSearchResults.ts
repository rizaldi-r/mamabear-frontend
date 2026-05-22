import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SearchProduct } from "@/features/products/types/search.types";
import { searchService } from "@/features/products/services/searchService";

export function useSearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setProducts([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await searchService.getProducts(query);
        if (response.success) {
          setProducts(response.data);
        } else {
          setError(response.message?.[0] || "Gagal memuat hasil pencarian.");
        }
      } catch (err) {
        console.error("Search error:", err);
        setError("Terjadi kesalahan saat mencari produk.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return {
    query,
    products,
    isLoading,
    error,
  };
}
