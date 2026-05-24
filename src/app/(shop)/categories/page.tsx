import {
  CategoryEmptyState,
  CategoryList,
  CategoryListHeader,
  ErrorState,
} from "@/features/categories/components/listing/CategoryListHeader";
import { fetchCategories } from "@/features/categories/services/categoryService";

/**
 * MAIN PAGE: Category Listing
 * Clean Server Component that orchestrates sub-components.
 */
export default async function CategoriesPage() {
  const { data: categories, error } = await fetchCategories();

  // If there's an error, we early return the ErrorState
  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <CategoryListHeader />
        <ErrorState message={error} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <CategoryListHeader />

      {categories && categories.length > 0 ? (
        <CategoryList categories={categories} />
      ) : (
        <CategoryEmptyState />
      )}
    </div>
  );
}
