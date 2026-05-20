export type ViewMode = "grid" | "list";

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  imageUrl: string | null;
  publicId: string;
  altText: string | null;
  width: number | null;
  height: number | null;
  fileSize: number | null;
  format: string | null;
}

export interface ProductImage {
  id: number;
  productId: number;
  publicId: string;
  variantId: number | null;
  imageUrl: string;
  sortOrder: number;
  altText: string;
  width: number | null;
  height: number | null;
  fileSize: number | null;
  format: string | null;
}

export interface ProductVariant {
  id: number;
  productId: number;
  name: string;
  priceIdr: string; // Stored as string in JSON (e.g., "80000")
  weightG: number;
  sku: string;
  stock: number;
  sortOrder: number;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  isActive: boolean;
  categoryId: number;
  highlightId: number;
  tags: string[]; // Adjust type if tags contain objects in other payloads
  description: string;
  ingredients: string | null; // Null in your payload, assuming string if populated
  usageInstructions: string | null; // Null in your payload, assuming string if populated
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  category: Category;
  images: ProductImage[];
  variants: ProductVariant[];
}
