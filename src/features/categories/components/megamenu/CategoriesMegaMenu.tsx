"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const categories = [
  {
    id: "asi-booster",
    name: "ASI Booster",
    image:
      "https://raw.githubusercontent.com/regencode/mamabear-backend/main/assets/images/AsiBooster/AsiBooster-01.jpg",
  },
  {
    id: "healthy-snack",
    name: "Healthy Snack",
    image:
      "https://raw.githubusercontent.com/regencode/mamabear-backend/main/assets/images/AsiBooster/AsiBooster-01.jpg",
  },
  {
    id: "vitamin",
    name: "Vitamin",
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
        <div className="absolute top-full left-0 pt-4 z-50">
          <div className="w-[700px] rounded-3xl border border-stone-100 bg-white shadow-2xl p-6 grid grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group rounded-2xl p-4 hover:bg-pink-50 transition-all"
              >
                <div className="aspect-square rounded-2xl bg-stone-50 overflow-hidden border border-stone-100 mb-4 flex items-center justify-center">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-24 h-24 object-contain group-hover:scale-105 transition-transform"
                  />
                </div>

                <h3 className="font-bold text-stone-800 group-hover:text-pink-600 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}