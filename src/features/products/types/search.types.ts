import {Product} from "@/features/products/types/products.types";

/**
 * Represents the simplified product data returned by the search endpoint.
 * Omit removes the heavy nested relations that aren't included in this specific payload.
 */
export type SearchProduct = Product;

export interface SearchSuggestion {
  name: string;
  similarity: number; // Decimal score returned by the fuzzy search matcher
}

// Global API Response wrapper based on MamaBear guidelines
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string[];
  // TODO: add this in api
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
