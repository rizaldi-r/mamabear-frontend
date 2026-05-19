"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Trash2, ChevronDown, Star, ShoppingCart, X } from "lucide-react";

/**
 * MOCK DATA
 * Represents the products shown in the screenshot.
 */
const MOCK_PRODUCTS = Array(6)
  .fill({
    id: "1",
    name: "MamaBear ASI Booster Kapsul ASI BOOSTER dengan TRIPLE BENEFIT",
    price: 65073,
    rating: 5.0,
    sold: "10RB+",
    image:
      "https://raw.githubusercontent.com/regencode/mamabear-backend/main/assets/images/AsiBooster/AsiBooster-01.jpg",
    badges: [
      { text: "-50%", color: "bg-red-500 text-white" },
      { text: "NEW", color: "bg-pink-100 text-pink-600" },
    ],
  })
  .map((p, i) => ({ ...p, id: String(i + 1) }));

const CATEGORIES = [
  "Semua Produk",
  "Asi Booster",
  "AlmonMix",
  "Teh Pelancar Asi",
  "Kukis Series",
  "ZoyaMix",
  "Gift & Hampers",
  "Mama Support",
  "SALE",
];

/**
 * -------------------------------------------------------------------------
 * SUB-COMPONENT: ProductListingBanner
 * Location: src/features/products/components/listing/ProductListingBanner.tsx
 * -------------------------------------------------------------------------
 */
function ProductListingBanner() {
  return (
    <div className="w-full bg-[#FFF5F7] rounded-b-[40px] overflow-hidden mb-12 relative border-b border-pink-100">
      <div className="container mx-auto px-4 h-[200px] md:h-[280px] relative flex items-center justify-center">
        {/* Fallback Banner Content (Mimicking the screenshot's banner) */}
        <div className="absolute inset-0 flex items-center justify-between px-12 opacity-90">
          <div className="flex -space-x-4">
            <div className="w-32 h-40 bg-white shadow-xl rounded-xl border border-pink-50 flex items-center justify-center p-2 transform -rotate-6 z-10">
              <Image
                src="https://raw.githubusercontent.com/regencode/mamabear-backend/main/assets/images/AlmonMix/AlmonMix-01.jpg"
                alt="Almond Mix"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <div className="w-32 h-40 bg-white shadow-xl rounded-xl border border-pink-50 flex items-center justify-center p-2 transform rotate-3 z-20">
              <Image
                src="https://raw.githubusercontent.com/regencode/mamabear-backend/main/assets/images/AsiBooster/AsiBooster-01.jpg"
                alt="ASI Booster"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md text-[10px] font-bold text-blue-500 text-center p-2">
                BADAN POM
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md text-[10px] font-bold text-yellow-500 text-center p-2">
                BRAND
                <br />
                CHOICE
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md text-[10px] font-bold text-purple-600 text-center p-2">
                HALAL
                <br />
                INDONESIA
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * -------------------------------------------------------------------------
 * SUB-COMPONENT: ProductSidebarFilter
 * Location: src/features/products/components/listing/ProductSidebarFilter.tsx
 * -------------------------------------------------------------------------
 */
function ProductSidebarFilter({
  activeCategory,
  setActiveCategory,
  isOpen,
  onClose,
}) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-[280px] bg-white p-6 overflow-y-auto transition-transform duration-300
        lg:static lg:translate-x-0 lg:p-0 lg:pr-8 lg:border-r lg:border-stone-100 lg:z-auto lg:block shrink-0
        ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-stone-100 mb-6 mt-4 lg:mt-0">
          <h2 className="text-2xl font-black text-[#8B5E3C]">Filter</h2>
          <div className="flex items-center gap-4">
            <button className="flex flex-col items-center text-stone-400 hover:text-stone-600 transition-colors">
              <Trash2 className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-bold">Hapus</span>
            </button>
            <button
              className="lg:hidden p-2 text-stone-400 hover:bg-stone-100 rounded-full transition-colors"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Kategori */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-stone-800 mb-4">Kategori</h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const isSale = cat === "SALE";

              let btnClass =
                "px-4 py-1.5 rounded-full text-xs font-bold transition-all ";
              if (isActive) {
                btnClass += "bg-[#D65D7A] text-white shadow-md shadow-pink-200";
              } else if (isSale) {
                btnClass += "bg-pink-50 text-red-500 hover:bg-pink-100";
              } else {
                btnClass += "bg-pink-50 text-pink-400 hover:bg-pink-100";
              }

              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    // Optional: Close sidebar on mobile after selecting a category
                    // onClose();
                  }}
                  className={btnClass}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Harga */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-stone-800 mb-4">Harga</h3>
          <div className="px-2">
            <div className="h-1 w-full bg-stone-200 rounded-full relative mb-4">
              <div className="absolute left-0 right-1/4 h-full bg-[#D65D7A] rounded-full"></div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#D65D7A] rounded-full shadow-sm cursor-pointer"></div>
              <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#D65D7A] rounded-full shadow-sm cursor-pointer translate-x-1/2"></div>
            </div>
            <div className="flex justify-between text-xs font-bold text-stone-500">
              <span>Rp 0</span>
              <span>Rp 999.999</span>
            </div>
          </div>
        </div>

        {/* Stok */}
        <div>
          <h3 className="text-lg font-bold text-stone-800 mb-4">Stok</h3>
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#D65D7A] text-white shadow-md shadow-pink-200">
              Tersedia
            </button>
            <button className="px-4 py-1.5 rounded-full text-xs font-bold bg-pink-50 text-pink-400 hover:bg-pink-100 transition-all">
              Pre-Order
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

/**
 * -------------------------------------------------------------------------
 * SUB-COMPONENT: ProductSortBar
 * Location: src/features/products/components/listing/ProductSortBar.tsx
 * -------------------------------------------------------------------------
 */
function ProductSortBar({ onOpenFilter }) {
  return (
    <div className="flex justify-between items-center mb-6 border-b border-stone-100 pb-4 lg:border-none lg:pb-0 lg:justify-end">
      <button
        onClick={onOpenFilter}
        className="lg:hidden px-4 py-2 bg-stone-50 rounded-full text-xs font-bold text-stone-600 active:bg-stone-100 transition-colors"
      >
        Tampilkan Filter
      </button>
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-stone-600">Urutkan</span>
        <button className="flex items-center gap-2 px-4 py-2 border border-stone-200 rounded-full text-sm font-semibold text-stone-700 hover:border-pink-300 transition-colors bg-white">
          Harga rendah ke tinggi{" "}
          <ChevronDown className="w-4 h-4 text-stone-400" />
        </button>
      </div>
    </div>
  );
}

/**
 * -------------------------------------------------------------------------
 * SUB-COMPONENT: ProductListingCard
 * Location: src/features/products/components/listing/ProductListingCard.tsx
 * -------------------------------------------------------------------------
 */
function ProductListingCard({ product }) {
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className="group flex flex-col bg-white rounded-3xl p-4 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-pink-50 cursor-pointer relative">
      {/* Badges */}
      <div className="absolute top-6 left-6 z-10 flex gap-1">
        {product.badges.map((badge, idx) => (
          <span
            key={idx}
            className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${badge.color}`}
          >
            {badge.text}
          </span>
        ))}
      </div>

      {/* Image Area */}
      <div className="aspect-square bg-pink-50/30 rounded-2xl mb-4 relative overflow-hidden flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-stone-800 line-clamp-2 mb-2 leading-tight group-hover:text-pink-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-1.5 mb-3">
          <Star className="w-3.5 h-3.5 fill-[#D65D7A] text-[#D65D7A]" />
          <span className="text-xs font-bold text-stone-600">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-[10px] font-medium text-stone-400 ml-1">
            {product.sold} Terjual
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-black text-red-500 tracking-tight">
            {formattedPrice}
          </span>
          <button className="w-10 h-10 rounded-full bg-[#D65D7A] text-white flex items-center justify-center shadow-md shadow-pink-200 hover:bg-pink-600 hover:scale-110 active:scale-95 transition-all">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * -------------------------------------------------------------------------
 * MAIN PAGE: ProductListingPage
 * Location: src/app/(shop)/products/page.tsx
 * -------------------------------------------------------------------------
 */
export default function ProductListingPage() {
  const [activeCategory, setActiveCategory] = useState("Semua Produk");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Top Banner */}
      <ProductListingBanner />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Sidebar: Filters */}
          <ProductSidebarFilter
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            isOpen={isMobileFilterOpen}
            onClose={() => setIsMobileFilterOpen(false)}
          />

          {/* Right Content: Products */}
          <div className="flex-1">
            {/* Sort Bar (Extracted Component) */}
            <ProductSortBar onOpenFilter={() => setIsMobileFilterOpen(true)} />

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {MOCK_PRODUCTS.map((product) => (
                <ProductListingCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
