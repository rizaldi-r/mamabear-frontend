'use client';

import { Navbar } from "@/components/layout/Navbar";
import { FilterSection } from "@/features/products/components/listing/FilterSection";
import { PromoBanner } from "@/features/products/components/listing/PromoBanner";
import { Toolbar } from "@/features/products/components/listing/Toolbar";
import { ProductCard } from "@/features/products/components/shared/ProductCard";
import { Product, ViewMode } from "@/features/products/types/products.types";
import { useState } from "react";

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "MamaBear ASI Booster Teh Pelancar ASI Herbal Alami",
    price: 65073,
    discountPercent: 50,
    category: "Teh Pelancar Asi",
    image: "https://placehold.co/400x500?text=Teh+MamaBear",
    rating: 5.0,
    soldCount: "10RB+",
    isNew: true,
    description: "Suplemen nutrisi terbaik untuk meningkatkan kualitas dan kuantitas ASI Mama. Mengandung bahan herbal pilihan yang aman dikonsumsi."
  },
  {
    id: 2,
    name: "AlmonMix Rasa Cokelat 6 Sachet",
    price: 45000,
    category: "AlmonMix",
    image: "https://placehold.co/400x500?text=AlmonMix",
    rating: 4.9,
    soldCount: "5RB+",
    isNew: false,
    description: "Minuman serbuk kedelai dan almond yang lezat untuk menunjang nutrisi harian ibu menyusui."
  }
];

export default function App(): JSX.Element {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-rose-100 antialiased">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pb-20">
        <PromoBanner />

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filter */}
          <FilterSection />

          {/* Product Grid Area */}
          <div className="flex-1 py-4">
            <Toolbar viewMode={viewMode} setViewMode={setViewMode} />

            <div className={viewMode === 'grid' 
              ? "grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" 
              : "flex flex-col gap-4"
            }>
              {MOCK_PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
              {/* Duplikasi data untuk mengisi grid */}
              {[...Array(4)].map((_, i) => (
                <ProductCard 
                  key={`extra-${i}`} 
                  product={{...MOCK_PRODUCTS[0], id: `extra-${i}`}} 
                  viewMode={viewMode} 
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
