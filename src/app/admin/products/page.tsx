import React from "react";
import { Plus } from "lucide-react";
import { fetchCategories } from "@/features/categories/services/categoryService";
import AdminProductListingClient from "@/features/admin/products/components/AdminProductListingClient";

// ==========================================
// MAIN PAGE COMPONENT (SERVER COMPONENT)
// ==========================================
export default async function AdminProductsPage() {
  const categories = await fetchCategories();

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-font-5 font-bold text-[var(--mama-brown)]">
            Produk
          </h1>
          <p className="text-[var(--color-gray)] text-font-2 mt-1">
            Kelola katalog produk Anda
          </p>
        </div>
        <button className="bg-[var(--mama-hot-pink)] hover:opacity-90 text-white px-6 py-2.5 rounded-md font-semibold flex items-center gap-2 transition-opacity shadow-sm">
          <Plus className="w-5 h-5" />
          Tambah Produk
        </button>
      </div>

      {/* Client-side Component handling the interactive table & API fetching */}
      <AdminProductListingClient initialCategories={categories} />
    </>
  );
}