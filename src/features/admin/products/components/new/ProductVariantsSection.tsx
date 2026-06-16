import React from "react";
import { Plus } from "lucide-react";

/**
 * ProductVariantsSection
 * Sub-component placeholder providing standard inputs and control templates for product variations.
 */
export default function ProductVariantsSection() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-font-3 font-bold text-[var(--mama-brown)]">
          Varian Produk
        </h2>
        <button
          type="button"
          className="flex items-center gap-2 border border-gray-300 px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-gray-50 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Varian
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Nama varian (contoh: Ukuran)"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[var(--mama-hot-pink)] bg-gray-50"
          disabled
        />
        <input
          type="text"
          placeholder="Nilai (contoh: S, M, L, XL)"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[var(--mama-hot-pink)] bg-gray-50"
          disabled
        />
      </div>
    </div>
  );
}