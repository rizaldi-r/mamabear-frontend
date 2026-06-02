"use client";

import React from "react";
import Link from "next/link";
import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";
import { ProductTabs } from "./ProductTabs";
import { RelatedProducts } from "./RelatedProducts";
import { useProductDetail } from "@/features/products/hooks/useProductDetail";
import { ProductDetail } from "@/features/products/types/product.types";

interface ProductDetailClientProps {
  product: ProductDetail;
  relatedProducts: ProductDetail[];
}

export const ProductDetailClient = ({
  product,
  relatedProducts,
}: ProductDetailClientProps) => {
  const {
    selectedVariantId,
    currentVariant,
    quantity,
    activeTab,
    mainImage,
    setActiveTab,
    setMainImage,
    handleVariantSelect,
    handleQuantityChange,
  } = useProductDetail(product);

  return (
    <div className="flex flex-col">
      {/* Breadcrumb Navigation */}
      <nav className="text-font-1 text-[var(--color-gray)] mb-6">
        <Link href="/" className="hover:text-[var(--mama-hot-pink)]">
          Beranda
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/categories/${product.category?.slug}`}
          className="hover:text-[var(--mama-hot-pink)]"
        >
          {product.category?.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--mama-brown)] font-medium">
          {product.name}
        </span>
      </nav>

      {/* Main Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ProductGallery
          images={product.images}
          mainImage={mainImage}
          onImageSelect={setMainImage}
        />

        <ProductInfo
          product={product}
          variants={product.variants}
          currentVariant={currentVariant}
          selectedVariantId={selectedVariantId}
          quantity={quantity}
          onVariantSelect={handleVariantSelect}
          onQuantityChange={handleQuantityChange}
        />
      </div>

      {/* Tabs & Reviews */}
      <ProductTabs
        product={product}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Related Products Carousel/Grid */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
};
