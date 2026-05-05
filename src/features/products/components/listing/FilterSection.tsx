import { Trash2 } from "lucide-react";
import { Category } from "../../types/products.types";

export function FilterSection(): JSX.Element {
  const categories: Category[] = [
    "Semua Produk", "Asi Booster", "AlmonMix", "Teh Pelancar Asi", 
    "Kukis Series", "ZoyaMix", "Gift & Hampers", "Mama Support", "SALE"
  ];

  return (
    <aside className="w-full md:w-64 flex-shrink-0 border-r pr-6 space-y-8 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Filter</h2>
        <button className="text-gray-400 hover:text-rose-500 flex items-center gap-1 text-xs">
          <Trash2 size={14} /> Hapus
        </button>
      </div>

      {/* Kategori */}
      <div>
        <h3 className="font-bold text-gray-800 mb-4">Kategori</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat, idx) => (
            <button 
              key={cat} 
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                idx === 0 
                ? 'bg-rose-400 text-white shadow-md shadow-rose-100' 
                : cat === 'SALE' 
                  ? 'bg-rose-100 text-rose-600' 
                  : 'bg-rose-50 text-rose-400 hover:bg-rose-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Harga */}
      <div>
        <h3 className="font-bold text-gray-800 mb-4">Harga</h3>
        <div className="px-2">
          <div className="h-1 bg-gray-200 rounded-full relative mb-4">
            <div className="absolute left-0 right-1/4 h-full bg-rose-400 rounded-full" />
            <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-rose-400 rounded-full cursor-pointer shadow-sm" />
          </div>
          <div className="flex justify-between text-xs font-bold text-gray-800">
            <span>Rp 0</span>
            <span>Rp 999,999</span>
          </div>
        </div>
      </div>

      {/* Stok */}
      <div>
        <h3 className="font-bold text-gray-800 mb-4">Stok</h3>
        <div className="flex gap-2">
          <button className="flex-1 py-1.5 bg-rose-400 text-white rounded-full text-xs font-medium">Tersedia</button>
          <button className="flex-1 py-1.5 bg-rose-50 text-rose-400 rounded-full text-xs font-medium">Pre-Order</button>
        </div>
      </div>
    </aside>
  );
};
