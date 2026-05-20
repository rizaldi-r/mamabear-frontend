"use client";

import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

const categories = [
  {
    id: "asi-booster",
    name: "ASI Booster",
    description: "Pelancar ASI alami untuk Mama",
    image:
      "https://raw.githubusercontent.com/regencode/mamabear-backend/main/assets/images/AsiBooster/AsiBooster-01.jpg",
  },
  {
    id: "healthy-snack",
    name: "Healthy Snack",
    description: "Snack sehat rendah gula & bergizi",
    image:
      "https://raw.githubusercontent.com/regencode/mamabear-backend/main/assets/images/AsiBooster/AsiBooster-01.jpg",
  },
  {
    id: "vitamin",
    name: "Vitamin",
    description: "Nutrisi tambahan untuk Mama & Anak",
    image:
      "https://raw.githubusercontent.com/regencode/mamabear-backend/main/assets/images/AsiBooster/AsiBooster-01.jpg",
  },
];

export function CategoriesMegaMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative hidden lg:block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger */}
      <button className="flex items-center gap-2 font-bold text-[var(--mama-brown)] hover:text-pink-600 transition-colors">
        Kategori

        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Mega Menu */}
      {open && (
        <div className="absolute top-full left-0 pt-5 z-50">
          <div className="w-[820px] rounded-[40px] border border-pink-100 bg-white shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="px-8 pt-8 pb-6 border-b border-pink-100 bg-pink-50/40">
              <p className="text-pink-400 text-xs font-black uppercase tracking-[0.25em] mb-2">
                Kategori Produk
              </p>

              <h2 className="text-3xl font-black text-[#8B5E3C]">
                Temukan Nutrisi Terbaik
              </h2>

              <p className="text-stone-500 text-sm mt-2 max-w-lg">
                Pilihan produk sehat untuk mendukung perjalanan Mama &
                Si Kecil setiap hari.
              </p>
            </div>

            {/* Categories */}
            <div className="p-6 grid grid-cols-1 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="group relative overflow-hidden rounded-[32px] border border-stone-100 bg-pink-50/40 p-5 hover:shadow-lg hover:border-pink-200 transition-all"
                >
                  <div className="flex items-center justify-between gap-6">
                    
                    {/* LEFT */}
                    <div className="flex items-center gap-5">
                      
                      {/* Image Bubble */}
                      <div className="relative w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg shadow-pink-100 flex items-center justify-center shrink-0">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      {/* Text */}
                      <div>
                        <div className="flex items-center gap-2 text-pink-400 text-[10px] font-black uppercase tracking-[0.25em] mb-2">
                          Kategori
                          <ChevronRight size={12} />
                          {category.name}
                        </div>

                        <h3 className="text-2xl font-black text-[#8B5E3C] group-hover:text-pink-600 transition-colors">
                          {category.name}
                        </h3>

                        <p className="text-sm text-stone-500 mt-2 max-w-md leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="hidden xl:flex items-center">
                      <div className="w-12 h-12 rounded-full bg-white border border-pink-100 flex items-center justify-center group-hover:bg-pink-500 transition-colors">
                        <ChevronRight className="w-5 h-5 text-pink-500 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>

                  {/* Decorative Glow */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-100/40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}