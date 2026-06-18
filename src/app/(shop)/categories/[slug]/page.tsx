interface Props {
   params: {
     slug: string;
   };
 }
 
 export default function CategoryDetailPage({ params }: Props) {
   return (
     <main className="min-h-screen bg-pink-50/30 px-4 py-16">
       <div className="max-w-5xl mx-auto">
         
         {/* Banner */}
         <section className="relative overflow-hidden rounded-[40px] border border-pink-100 bg-pink-50/50 p-8 md:p-12">
           
           {/* Decorative Glow */}
           <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-pink-100/40 blur-3xl" />
 
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
             
             {/* Text */}
             <div className="flex-1 text-center md:text-left">
               <p className="text-pink-400 text-xs font-black uppercase tracking-[0.25em] mb-3">
                 Kategori Produk
               </p>
 
               <h1 className="text-4xl md:text-5xl font-black text-[#8B5E3C]">
                 {params.slug}
               </h1>
 
               <p className="mt-4 text-stone-500 leading-relaxed max-w-xl">
                 Halaman detail kategori sedang dalam proses pengembangan.
                 Nantinya produk-produk kategori ini akan tampil di sini.
               </p>
             </div>
 
             {/* Placeholder Image */}
             <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-white border-4 border-white shadow-xl shadow-pink-100 flex items-center justify-center">
               <div className="text-center">
                 <div className="text-6xl">🍼</div>
 
                 <p className="mt-2 text-sm font-bold text-stone-400">
                   Coming Soon
                 </p>
               </div>
             </div>
           </div>
         </section>
 
         {/* Product Placeholder */}
         <section className="mt-12 space-y-4">
           
           <div className="flex items-center justify-between border-b border-stone-200 pb-4">
             <h2 className="text-xl font-black text-[#8B5E3C]">
               Produk Tersedia
             </h2>
 
             <div className="rounded-full bg-stone-100 px-4 py-2 text-xs font-bold text-stone-500">
               0 Produk
             </div>
           </div>
 
           <div className="rounded-[32px] border-2 border-dashed border-stone-200 bg-white py-24 text-center">
             <p className="text-lg font-bold text-stone-400">
               Produk kategori ini belum tersedia.
             </p>
 
             <p className="mt-2 text-sm text-stone-500">
               Team products masih dalam tahap integrasi backend.
             </p>
           </div>
         </section>
       </div>
     </main>
   );
 }