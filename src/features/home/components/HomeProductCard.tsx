import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/features/home/types/home";
import { Badge, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";

export function HomeProductCard({ product }: { product: Product }) {
  // Determine image source: uses first image in array or a placeholder
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
    <Card className="rounded-2xl overflow-hidden border border-pink-100 bg-card group transition-all hover:shadow-md cursor-pointer flex flex-col">
      <CardContent className="p-3 flex flex-col h-full">
        {/* Image & Badges */}
        <div className="relative aspect-square bg-muted rounded-xl mb-3 overflow-hidden">
          {product.discount && (
            <Badge className="absolute top-2 left-2 z-10 bg-destructive hover:bg-destructive text-destructive-foreground rounded-sm font-bold text-[10px] px-1.5 py-0.5 border-none">
              {product.discount}
            </Badge>
          )}
          {product.badge && (
            <Badge className="absolute top-2 right-2 z-10 bg-[var(--mama-pink)] text-[var(--mama-brown)] rounded-sm font-semibold text-[10px] px-1.5 py-0.5 border-none">
              {product.badge}
            </Badge>
          )}
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain w-auto group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-sm font-semibold text-stone-800 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating & Sales */}
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-[var(--mama-hot-pink)] text-[var(--mama-hot-pink)]" />
            <span className="text-xs text-stone-500 font-medium">
              {(product.rating || 5.0).toFixed(1)}
            </span>
            <span className="text-[10px] text-muted-foreground ml-1">
              {product.sold || "0"} Terjual
            </span>
          </div>

          {/* Price & Cart Action */}
          <div className="mt-auto flex items-end justify-between">
            <div>
              <span className="text-destructive font-bold text-base md:text-lg">
                {formattedPrice}
              </span>
            </div>
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full bg-[var(--mama-hot-pink)] text-white hover:text-white hover:bg-pink-600 hover:scale-110 transition-all shadow-sm"
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
