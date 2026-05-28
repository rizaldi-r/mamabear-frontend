import React from "react";
import { categoryService } from "@/features/categories/services/categoryService";
import { CategoryList } from "@/features/admin/categories/components/listing/CategoryListingClient";

/**
 * Admin Categories Page (Server Component)
 * Fetches the initial category list and renders the interactive CategoryList component.
 */
export default async function AdminCategoriesPage() {
  // Fetch data on the server using our predefined service
  const categories = await categoryService.fetchCategories();

  return <CategoryList initialCategories={categories} />;
}
