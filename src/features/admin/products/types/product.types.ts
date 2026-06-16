import { Category } from "@/features/categories/types/category.types";

export type ViewMode = "grid" | "list";

export type AdminProductSortField =
  | "name"
  | "price"
  | "createdAt"
  | "totalSold";

/**
 * Interface mapping to the UI form fields
 */
export interface ProductFormValues {
  name: string;
  description: string;
  sku: string;
  categoryId: string;
  price: number;
  stock: number;
  weightG: number;
  isActive: string; // "true" or "false" from select
  metaTitle: string;
  metaDescription: string;
  ingredients: string;
  usageInstructions: string;
}

/**
 * Product Feature Types
 * Defines the structure of Product entities, variants, and relations.
 */
export interface ProductImage {
  id: number;
  publicId: string;
  productId: number | null;
  variantId: number | null;
  reviewId: number | null;
  categoryId: number | null;
  imageUrl: string;
  sortOrder: number;
  altText: string;
  width: number;
  height: number;
  fileSize: number;
  format: string;
}
export interface ProductVariant {
  id: number;
  productId: number;
  name: string;
  priceIdr: string; // Represented as string in JSON (e.g., "185000")
  weightG: number;
  sku: string;
  stock: number;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  images: ProductImage[];
}

export interface ProductHighlight {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  isActive: boolean;
  categoryId: number;
  highlightId: number;
  tags: string[];
  description: string;
  ingredients: string | null;
  usageInstructions: string | null;
  createdAt: string;
  updatedAt: string;

  // Rich relational payloads
  category?: Category;
  images?: ProductImage[];
  variants?: ProductVariant[];
  highlight?: Highlight | null;

  // Analytical and dynamic pricing fields
  currentPrice?: string;
  originalPrice?: string;
  discountPercent?: number;
  rating?: number;
  reviewsCount?: number;
  totalSold?: number;
}

export interface CreateProductInput {
  name: string;
  isActive: boolean;
  totalSold?: number;
  categoryId: number;
  highlightId?: number | null;
  tags: string[];
  description: string | null;
  ingredients: string | null;
  usageInstructions: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  images?: ProductImage[];
  priceIdr: string;
  weightG: number;
  stock: number;
  sku?: string;
}

export interface ProductFilterParams {
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  cursor?: string;
  limit?: number;
}
