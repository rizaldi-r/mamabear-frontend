import { useState, useEffect } from "react";
import { getCategoryBySlug } from "../services/categoryService";
import { Category } from "../types/category.types";

/**
 * useCategory Hook
 * Encapsulates the loading state and data fetching logic for a single category.
 */
export function useCategory(slug: string) {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCategory() {
      try {
        setLoading(true);
        setError(null);
        const data = await getCategoryBySlug(slug);
        setCategory(data);
      } catch (error: unknown) {
        const err = error as Error;
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadCategory();
    }
  }, [slug]);

  return { category, loading, error };
}
