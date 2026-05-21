import React from 'react';
import { LayoutGrid, AlertCircle, RefreshCcw, ChevronRight } from 'lucide-react';
import { fetchCategories } from '@/features/categories/services/categoryService';
import { Category } from '../../types/category.type'

/**
* SUB-COMPONENT: CategoryListHeader
* Renders the top title and icon section.
*/
function CategoryListHeader() {
 return (
   <div className="flex items-center gap-3 mb-10">
     <div>
       <h1 className="text-3xl font-black text-[#8B5E3C]">Semua Kategori</h1>
       <p className="text-stone-400 text-sm font-medium">Jelajahi berbagai pilihan nutrisi terbaik untuk Mama & Si Kecil</p>
     </div>
   </div>
 );
}

/**
* SUB-COMPONENT: CategoryListItem
* Horizontal layout for category information.
* Replaces the previous Card design.
*/
function CategoryListItem({ category } : { category : Category }) {
 return (
   <a
     href={`/categories/${category.slug}`}
     className="group bg-white border border-stone-100 rounded-3xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4"
   >
     <div className="flex items-center gap-4 md:gap-6">
       <div className="w-16 h-16 md:w-24 md:h-24 overflow-hidden rounded-2xl bg-stone-50 border border-stone-50 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
         <img
           src={category.image}
           alt={category.name}
           className="w-12 h-12 md:w-16 md:h-16 object-contain p-1"
         />
       </div>
       <div className="flex flex-col">
         <h3 className="text-base md:text-xl font-bold text-[#8B5E3C] group-hover:text-pink-500 transition-colors">
           {category.name}
         </h3>
         <p className="text-[10px] md:text-xs font-bold text-stone-400 uppercase tracking-widest mt-1">
           {category.productCount} Produk Tersedia
         </p>
       </div>
     </div>
     
     <div className="flex items-center gap-2 text-stone-300 group-hover:text-pink-500 transition-colors px-2">
       <span className="hidden md:block text-xs font-bold uppercase tracking-tighter">Lihat Koleksi</span>
       <ChevronRight size={20} />
     </div>
   </a>
 );
}

/**
* SUB-COMPONENT: CategoryList
* Renders the vertical stack of categories.
*/
function CategoryList({ categories } : { categories : Category[] }) {
 return (
   <div className="flex flex-col gap-4 max-w-4xl mx-auto">
     {categories.map((cat) => (
       <CategoryListItem key={cat.id} category={cat} />
     ))}
   </div>
 );
}

/**
* SUB-COMPONENT: CategoryEmptyState
* Renders when no categories are returned.
*/
function CategoryEmptyState() {
 return (
   <div className="text-center py-20 bg-stone-50 rounded-[40px] border-2 border-dashed border-stone-200">
     <p className="text-stone-400 font-bold tracking-tight">Belum ada kategori yang tersedia saat ini.</p>
   </div>
 );
}

/**
* SUB-COMPONENT: ErrorState
* Visual feedback when the fetch fails.
*/
function ErrorState({ message } : { message : string }) {
 return (
   <div className="flex flex-col items-center justify-center py-20 px-6 bg-red-50/50 border-2 border-dashed border-red-100 rounded-[40px] text-center">
     <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-4">
       <AlertCircle size={32} />
     </div>
     <h2 className="text-xl font-black text-stone-800 mb-2">Oops! Ada kendala teknis</h2>
     <p className="text-sm text-stone-500 max-w-xs mb-6">{message}</p>
     <a
       href="/categories"
       className="flex items-center gap-2 px-6 py-2.5 bg-red-500 text-white rounded-full text-sm font-bold shadow-lg shadow-red-100 hover:bg-red-600 transition-all"
     >
       <RefreshCcw size={16} /> Coba Lagi
     </a>
   </div>
 );
}

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
