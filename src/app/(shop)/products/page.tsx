import React from "react";
import ProductListingBanner from "@/features/products/components/listing/ProductListingBanner";
import ProductCatalogClient from "@/features/products/components/listing/ProductCatalogClient";
import { fetchCategories } from "@/features/products/services/categoryService";

/**
 * -------------------------------------------------------------------------
 * MAIN PAGE: ProductListingPage (SERVER COMPONENT)
 * This page runs on the server, fetches initial category data, and passes
 * it down to the Client Component for interactivity.
 * -------------------------------------------------------------------------
 */
export default async function ProductListingPage() {
  let categories = [];
  const response = await fetchCategories();
  categories = [{ name: "Semua Produk", slug: "all" }, ...(response || [])];

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* 1. Static/Dumb Banner */}
      <ProductListingBanner />

      {/* 2. Interactive Client Component */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <ProductCatalogClient initialCategories={categories} />
      </div>
    </div>
  );
}
