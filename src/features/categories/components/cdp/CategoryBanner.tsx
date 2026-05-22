import React from 'react';
import { Filter, LayoutGrid, ChevronRight, ShoppingCart, Star } from 'lucide-react';
import { getCategoryBySlug } from '@/features/categories/services/categoryService';
import { fetchProductsByCategory } from '@/features/products/services/productService';
import type { Category } from '@/features/categories/types/category.type'
import type { Product } from '@/features/products/types/product.types'
/**
* SUB-COMPONENT: CategoryBanner
* Renders the hero section with category details and branding in Indonesian.
*/
function CategoryBanner({ category } : { category : Category }) {
 return (
   <div className="bg-pink-50/50 rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 border border-pink-100 relative overflow-hidden">
     <div className="flex-1 space-y-4 z-10 text-center md:text-left">
       <div className="flex items-center justify-center md:justify-start gap-2 text-pink-400 text-xs font-black uppercase tracking-widest">
         Kategori <ChevronRight size={12} /> {category.name}
       </div>
       <h1 className="text-4xl md:text-5xl font-black text-[#8B5E3C]">{category.name}</h1>
       <p className="text-stone-500 leading-relaxed max-w-lg text-sm md:text-base">
         {category.description}
       </p>
     </div>
     <div className="w-48 h-48 md:w-64 md:h-64 bg-white rounded-full flex items-center justify-center shadow-xl shadow-pink-100 border-4 border-white z-10">
       <img src={category.image} alt={category.name} className="w-3/4 h-3/4 object-contain" /> {/* TODO: Add a placeholder image in case it the image is null */}
     </div>
     {/* Decorative background element */}
     <div className="absolute -top-24 -right-24 w-64 h-64 bg-pink-100/30 rounded-full blur-3xl" />
   </div>
 );
}

/**
* SUB-COMPONENT: ProductListItem
* Horizontal layout for product items based on your "list instead of card" request.
*/
function ProductListItem({ product } : { product : Product }) {
 const formattedPrice = new Intl.NumberFormat('id-ID', {
   style: 'currency',
   currency: 'IDR',
   minimumFractionDigits: 0
 }).format(product.price || 0);

 return (
   <div className="group bg-white border border-stone-100 rounded-3xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all flex items-center gap-4 md:gap-8">
     {/* Product Image */}
     <div className="w-24 h-24 md:w-36 md:h-36 overflow-hidden rounded-2xl bg-stone-50 border border-stone-50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
       <img
         src={product.image || "https://raw.githubusercontent.com/regencode/mamabear-backend/main/assets/images/AsiBooster/AsiBooster-01.jpg"}
         alt={product.name}
         className="w-20 h-20 md:w-28 md:h-28 object-contain p-2"
       />
     </div>
     
     {/* Product Info */}
     <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
       <div className="space-y-2">
         <h3 className="text-base md:text-xl font-bold text-stone-800 group-hover:text-pink-600 transition-colors">
           {product.name}
         </h3>
         <div className="flex items-center gap-3">
           <div className="flex items-center gap-1">
             <Star className="w-4 h-4 fill-pink-500 text-pink-500" />
             <span className="text-sm font-bold text-stone-600">{product.rating || "5.0"}</span>
           </div>
           <div className="w-px h-3 bg-stone-200" />
           <span className="text-[10px] md:text-xs font-bold text-stone-400 uppercase tracking-widest">
             {product.sold || "0"} Terjual
           </span>
         </div>
       </div>

       <div className="flex items-center justify-between md:flex-col md:items-end gap-3">
         <div className="text-right">
            <p className="text-lg md:text-2xl font-black text-pink-600">
              {formattedPrice}
            </p>
         </div>
         <button className="flex items-center gap-2 bg-pink-500 text-white px-5 py-2.5 rounded-full shadow-lg shadow-pink-100 hover:bg-pink-600 transition-all active:scale-95 font-bold text-xs">
           <ShoppingCart size={16} /> <span>+ Keranjang</span>
         </button>
       </div>
     </div>
   </div>
 );
}

/**
* SUB-COMPONENT: CategoryProductsHeader
* Renders the title with product count and the filter action button.
*/
function CategoryProductsHeader({ count } : { count : number }) {
 return (
   <div className="flex items-center justify-between border-b border-stone-100 pb-4">
     <h2 className="text-lg font-black text-[#8B5E3C] uppercase tracking-tight">
       Produk Tersedia ({count})
     </h2>
     <button className="flex items-center gap-2 px-4 py-2 bg-stone-50 text-stone-600 rounded-full text-xs font-bold hover:bg-stone-100 transition-all">
       <Filter size={14} /> Filter & Urutkan
     </button>
   </div>
 );
}

/**
* SUB-COMPONENT: CategoryProductList
* Handles the mapping of products or displays an empty state in Indonesian.
*/
function CategoryProductList({ products } : { products : Product[] }) {
 if (products.length === 0) {
   return (
     <div className="text-center py-24 bg-stone-50 rounded-[40px] border-2 border-dashed border-stone-200">
       <p className="text-stone-400 font-bold tracking-tight">
         Belum ada produk yang tersedia dalam kategori ini.
       </p>
     </div>
   );
 }

 return (
   <div className="flex flex-col gap-6">
     {products.map((product) => (
       <ProductListItem key={product.id} product={product} />
     ))}
   </div>
 );
}

/**
* MAIN PAGE: Category Detail View (Server Component)
* Orchestrates parallel fetching for metadata and products.
* Refactored to use extracted sub-components for a cleaner page structure.
*/
export default async function CategoryDetailPage({ params } : { params : { slug : string } }) {
 const { slug } = params;

 // 1. Fetch Category Data
 const category = await getCategoryBySlug(slug);
 
 // 2. Error handling for non-existent category
 if (!category) {
   return (
     <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
       <LayoutGrid size={48} className="text-stone-200 mb-4" />
       <h2 className="text-xl font-bold text-stone-700">Waduh! Kategori tidak ditemukan</h2>
       <a href="/categories" className="mt-4 text-pink-500 font-bold underline">Kembali ke semua kategori</a>
     </div>
   );
 }

 // 3. Fetch Products based on the Category ID
 const products = await fetchProductsByCategory(category.id);

 return (
   <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
     {/* Hero Banner Section */}
     <CategoryBanner category={category} />

     {/* Product List Section */}
     <div className="space-y-6">
       <CategoryProductsHeader count={products.length} />
       <CategoryProductList products={products} />
     </div>
   </div>
 );
}
