import {
  CategoryEmptyState,
  CategoryList,
  CategoryListHeader,
  ErrorState,
} from "@/features/categories/components/listing/CategoryListHeader";
import { fetchCategories } from "@/features/categories/services/categoryService";
import { CategoriesMegaMenu } from "@/features/categories/components/megamenu/CategoriesMegaMenu";

/**
 * MAIN PAGE: Category Listing
 * Clean Server Component that orchestrates sub-components.
 */
export default async function CategoriesPage() {
   try {
      const categories = await fetchCategories();

      return (
         <div className="max-w-6xl mx-auto px-4 py-12">
            <CategoriesMegaMenu/>

           <CategoryListHeader />
      
           {categories && categories.length > 0 ? (
             <CategoryList categories={categories} />
           ) : (
             <CategoryEmptyState />
           )}
         </div>
       );

   } catch (error) {
      return (
         <div className="max-w-6xl mx-auto px-4 py-12">
           <CategoryListHeader />
           <ErrorState message={
               error instanceof Error ? error.message : "Terjadi kesalahan sistem"
           } />
         </div>
       );
   }

}