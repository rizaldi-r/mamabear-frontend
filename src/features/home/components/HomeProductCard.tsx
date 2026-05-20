"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/features/home/types/home.types";
import { Badge, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";

export function HomeProductCard({ product }: { product: Product }) {
  const mainImage = product.images.length > 0 ? product.images[0] : null;
  const imageSrc = mainImage
    ? mainImage.imageUrl
    : "/images/home/catalog-asibooster.webp";
  const imageAlt = mainImage ? mainImage.altText : product.name;

  /**
   * Formats the price string into IDR currency format.
   */
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(parseInt(product.price_idr, 10));

  return (
    <div className="rounded-2xl overflow-hidden bg-white group transition-all hover:shadow-md cursor-pointer flex flex-col p-0 relative">
      {/* Image & Badges Container */}
      <div className="relative aspect-square bg-stone-50 overflow-hidden">
        {/* Discount Badge */}
        {product.discount && (
          <Badge className="absolute top-2 left-2 z-10 bg-destructive hover:bg-destructive text-white rounded-sm font-bold text-[10px] px-1.5 py-0.5 border-none shadow-sm">
            {product.discount}
          </Badge>
        )}

        {/* Custom Tag Badge (e.g., NEW, BEST SELLER) */}
        {product.badge && (
          <Badge className="absolute top-2 right-2 z-10 bg-[var(--mama-pink)] text-[var(--mama-brown)] rounded-sm font-semibold text-[10px] px-1.5 py-0.5 border-none shadow-sm">
            {product.badge}
          </Badge>
        )}

        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>

      {/* Product Details Section */}
      <div className="flex-1 flex flex-col py-2 px-4">
        <h3 className="text-sm font-semibold text-stone-800 line-clamp-2 group-hover:text-pink-600 transition-colors leading-tight">
          {product.name}
        </h3>

        {/* Rating & Sales Social Proof */}
        <div className="flex items-center gap-3 mt-1">
          <div className="flex gap-1 items-center">
            <Star className="w-3 h-3 fill-[--mama-hot-pink] text-[--mama-hot-pink]" />
            <span className="text-xs text-stone-600 font-bold">
              {(product.rating || 5.0).toFixed(1)}
            </span>
          </div>
          <span className="text-[10px] text-stone-400 font-medium">
            {product.sold || "0"} Terjual
          </span>
        </div>

        {/* Pricing and Action Button */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-pink-600 font-extrabold text-base md:text-lg tracking-tight">
              {formattedPrice}
            </span>
          </div>

          <Button
            size="icon"
            variant="secondary"
            className="h-9 w-9 rounded-full bg-[--mama-hot-pink] text-white hover:bg-pink-600 hover:scale-110 active:scale-95 transition-all shadow-md shadow-pink-100"
            onClick={function handleAddToCart(e) {
              e.stopPropagation();
              // TODO: Add to cart logic
            }}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
