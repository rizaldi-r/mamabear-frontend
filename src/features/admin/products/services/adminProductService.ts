import {
  CreateProductInput,
} from "@/features/admin/products/types/product.types";
import {ProductImage} from "@/features/products/types/product.types";
import {
  Product,
} from "@/features/products/types/products.types";
import { apiClient, fetchWrapper } from "@/lib/api";
import { ApiResponse } from "@/types/api.types";

/**
 * Pagination metadata structure returned by the backend.
 */
export interface PaginationMeta {
  limit: number;
  nextCursor: string | null;
  hasNextPage: boolean;
}

/**
 * Response structure for the paginated product list.
 */
export interface PaginatedProducts {
  success: boolean;
  data: Product[];
  pagination: PaginationMeta;
}

/**
 * uploadProductImages
 * Uploads product images using FormData and returns the uploaded image data.
 */
export async function uploadProductImages(
  formData: FormData,
): Promise<ProductImage | ProductImage[]> {
  try {
    const response = await fetchWrapper("/admin/upload/images", {
      method: "POST",
      body: formData,
    });

    // The API might return a single object or an array depending on if multiple files were uploaded
    const result: ApiResponse<ProductImage | ProductImage[]> =
      await response.json();

    if (!result.success || !result.data) {
      throw new Error(result.message?.[0] || "Gagal mengunggah gambar produk");
    }

    return result.data;
  } catch (error) {
    console.error("[adminProductService] uploadProductImages failed:", error);
    throw error;
  }
}

/**
 * createProduct
 * Creates a new product using the JSON payload now that images are uploaded separately.
 */
export async function createProduct(
  data: CreateProductInput,
): Promise<Product> {
  try {
    const response = await apiClient.post("/admin/products", data);
    const result: ApiResponse<Product> = await response.json();

    if (!result.success || !result.data) {
      throw new Error(result.message?.[0] || "Gagal membuat produk baru");
    }

    return result.data;
  } catch (error) {
    console.error("[adminProductService] createProduct failed:", error);
    throw error;
  }
}

/**
 * updateProduct
 * Updates an existing product.
 */
export async function updateProduct(
  productId: number,
  data: Partial<Product>,
): Promise<Product> {
  try {
    const response = await apiClient.put(`/admin/products/${productId}`, data);
    const result: ApiResponse<Product> = await response.json();

    if (!result.success || !result.data) {
      throw new Error(result.message?.[0] || "Gagal memperbarui produk");
    }

    return result.data;
  } catch (error) {
    console.error(
      `[adminProductService] updateProduct failed for ${productId}:`,
      error,
    );
    throw error;
  }
}

/**
 * deleteProduct
 * Removes a product.
 */
export async function deleteProduct(productId: number): Promise<boolean> {
  try {
    const response = await apiClient.delete(`/admin/products/${productId}`);
    const result: ApiResponse<null> = await response.json();

    if (!result.success) {
      throw new Error(result.message?.[0] || "Gagal menghapus produk");
    }

    return true;
  } catch (error) {
    console.error(
      `[adminProductService] deleteProduct failed for ${productId}:`,
      error,
    );
    throw error;
  }
}

/**
 * Exporting as an object pattern to allow 'productService.fetchFilteredProducts'
 * usage if preferred elsewhere in the app.
 */
export const adminProductService = {
  uploadProductImages,
  createProduct,
  updateProduct,
  deleteProduct,
};
