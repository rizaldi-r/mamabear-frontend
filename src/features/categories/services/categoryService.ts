import { API_BASE_URL } from "@/lib/config";
import { ApiResponse, Category } from "../types/category.type";

/**
 * Category Service
 * Handles API communication for categories.
 */

/**
 * fetchCategories
 * Fetches the full list of categories for the listing page.
 * Returns a result object { data, error } suitable for Server Components.
 */
export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return { data: null, error: `Server error: ${res.status}` };
    }

    const response: ApiResponse<Category[]> = await res.json();

    if (!response.success) {
      return { data: null, error: response.message || "Gagal mengambil data" };
    }

    return { data: response.data, error: null };
  } catch (err) {
    console.error("[categoryService] fetchCategories error:", err);
    return {
      data: null,
      error: "Koneksi bermasalah. Harap periksa jaringan Mama.",
    };
  }
}

/**
 * getCategoryBySlug
 * Fetches a single category by mapping the slug to an ID first.
 * Used by the useCategory hook.
 */
export async function getCategoryBySlug(slug: string): Promise<Category> {
  // 1. Fetch the list to find the ID associated with the slug
  const listRes = await fetch(`${API_BASE_URL}/categories`);
  if (!listRes.ok) throw new Error("Gagal mengambil data pemetaan kategori");

  const listData = await listRes.json();
  const mapping = listData.data.find((c: Category) => c.slug === slug);

  if (!mapping) throw new Error("Kategori tidak ditemukan");

  // 2. Fetch the specific detail using the ID as per BE requirement
  const detailRes = await fetch(`${API_BASE_URL}/categories/${mapping.id}`);
  if (!detailRes.ok) throw new Error("Gagal mengambil detail kategori");

  const detailData = await detailRes.json();
  return detailData.data;
}
