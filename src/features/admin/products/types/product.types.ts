/**
 * Product Feature Types
 * Defines the structure of Product entities, variants, and relations.
 */

export interface ProductImage {
  id?: number;
  imageUrl?: string;
  // Note: Add additional fields if your image object has them (e.g., publicId, altText)
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

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  sortOrder: number;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  isActive: boolean;
  totalSold: number;
  categoryId: number;
  highlightId: number | null;
  tags: string[];
  description: string | null;
  ingredients: string | null;
  usageInstructions: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: string;
  updatedAt: string;
  category?: ProductCategory;
  highlight?: ProductHighlight;
  images: ProductImage[];
  variants: ProductVariant[];
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
}

export interface ProductFilterParams {
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  cursor?: string;
  limit?: number;
}