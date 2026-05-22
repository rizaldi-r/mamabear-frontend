import Image from "next/image";
import Link from "next/link";
import { AlertCircle, RefreshCcw } from "lucide-react";

import { fetchCategories } from "@/features/categories/services/categoryService";

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

export async function CategoryShowcase() {
  const { data: categories, error } = await fetchCategories();

  // Error State
  if (error) {
   return (
     <div className="max-w-6xl mx-auto px-4 py-12">
       <CategoryListHeader />
       <ErrorState message={error} />
     </div>
   );
 }

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Section Title */}
        <div className="text-center mb-10">
          <p className="text-pink-400 text-xs font-black uppercase tracking-[0.25em] mb-2">
            Kategori Produk
          </p>

          <h2 className="text-font-4 md:text-font-5 font-black text-[var(--mama-brown)]">
            Temukan Nutrisi Terbaik
          </h2>

          <p className="text-stone-500 text-sm mt-3 max-w-xl mx-auto">
            Pilihan produk sehat untuk mendukung perjalanan Mama &
            Si Kecil setiap hari.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {(categories ?? []).map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group"
            >
              <div className="bg-pink-50/40 border border-pink-100 rounded-[32px] p-5 hover:shadow-lg hover:border-pink-200 transition-all text-center h-full">
                
                {/* Image Bubble */}
                <div className="relative w-24 h-24 md:w-28 md:h-28 mx-auto mb-4 rounded-full bg-white border-4 border-white shadow-lg shadow-pink-100 flex items-center justify-center">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Category Name */}
                <h3 className="font-black text-[var(--mama-brown)] group-hover:text-pink-600 transition-colors leading-tight">
                  {cat.name}
                </h3>

                {/* Optional Description */}
                <p className="text-xs text-stone-500 mt-2 line-clamp-2">
                  {cat.description ||
                    "Produk sehat terbaik untuk Mama & Si Kecil."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}