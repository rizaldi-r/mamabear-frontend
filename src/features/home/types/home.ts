/**
 * Product Image Interface
 * Sesuai dengan struktur baru dari backend.
 */
interface ProductImage {
  id: number;
  productId: number;
  imageUrl: string;
  sortOrder: number;
  altText: string;
}

/**
 * Product Interface
 * Diperbarui untuk mendukung array objek gambar dengan properti imageUrl.
 */
export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price_idr: string;
  weight_g: number;
  sku: string;
  stock: number;
  isActive: boolean;
  images: ProductImage[];
  variants: any[];
  // Field opsional untuk highlight UI
  discount?: string;
  badge?: string;
  rating?: number;
  sold?: string;
}
