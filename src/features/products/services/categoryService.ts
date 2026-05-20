import { Category } from "@/features/products/types/products.types";
import { API_BASE_URL } from "@/lib/config";
import { ApiResponse } from "@/types/api";

/**
 * Category Service
 * Handles API communication for categories using the strictly typed
 * Category interface defined in product.types.ts.
 */

/**
 * fetchCategories
 * Fetches the full list of categories from the /api/categories endpoint.
 * @returns Promise resolving to an array of Category objects
 */
export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      // or use 'force-cache' / 'next: { revalidate }' for better performance if they are mostly static.
      next: { revalidate: 86400 } 
    });

    if (!res.ok) {
      console.error(`[categoryService] HTTP Error: ${res.status}`);
      return [];
    }

    const response: ApiResponse<Category[]> = await res.json();

    if (!response.success) {
      console.error(`[categoryService] API Error: ${response.message}`);
      return [];
    }

    return response.data || [];
  } catch (error) {
    console.error("[categoryService] fetchCategories failed:", error);
    return []; // Return empty array to handle fallbacks gracefully in the UI
  }
}

/**
 * getCategoryBySlug
 * Fetches a single category's detailed information by its unique slug.
 * @param slug - The string slug of the category
 * @returns Promise resolving to a Category object or null if not found
 */
export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/categories/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const response: ApiResponse<Category> = await res.json();

    return response.success ? response.data : null;
  } catch (error) {
    console.error("[categoryService] getCategoryBySlug failed:", error);
    return null;
  }
}

/**
 * Exporting as an object pattern to allow 'categoryService.fetchCategories'
 * usage if preferred elsewhere in the app.
 */
export const categoryService = {
  fetchCategories,
  getCategoryBySlug,
};
