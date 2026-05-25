/**
 * Category Feature Types
 */
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
