import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";

const mockProducts = [
  {
    id: 1,
    name: "MamaBear ASI Booster",
    discount: "-50%",
    badge: "NEW",
    price: "Rp 65.073",
    sold: "10RB+",
    rating: 5.0,
    image: "/images/home/catalog-asibooster.webp",
  },
  {
    id: 2,
    name: "MamaBear AlmondMix",
    discount: "-50%",
    badge: "NEW",
    price: "Rp 65.073",
    sold: "10RB+",
    rating: 5.0,
    image: "/images/home/catalog-almondmix.webp",
  },
  {
    id: 3,
    name: "MamaBear Kookie Bites",
    discount: "-50%",
    badge: "NEW",
    price: "Rp 65.073",
    sold: "10RB+",
    rating: 5.0,
    image: "/images/home/catalog-cookies.webp",
  },
  {
    id: 4,
    name: "MamaBear ZoyaMix Serbuk Kedelai",
    discount: "-50%",
    badge: "NEW",
    price: "Rp 65.073",
    sold: "10RB+",
    rating: 5.0,
    image: "/images/home/catalog-zoya.webp",
  },
];

export function FeaturedProducts({ products = mockProducts}) {
  return (
    <section className="py-12 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[var(--mama-brown)] mb-4">
            MamaBear High Light
          </h2>
          <div className="flex justify-center gap-2">
            <Button
              variant="default"
              className="bg-primary hover:bg-primary/90 rounded-full h-8 px-4 text-xs"
            >
              Best Seller
            </Button>
            <Button
              variant="outline"
              className="text-primary border-primary rounded-full h-8 px-4 text-xs hover:bg-primary hover:text-white"
            >
              Mama's Pick
            </Button>
            <Button
              variant="outline"
              className="text-primary border-primary rounded-full h-8 px-4 text-xs hover:bg-primary hover:text-white"
            >
              Exclusive
            </Button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockProducts.map((product) => (
            <Card
              key={product.id}
              className="rounded-2xl overflow-hidden border border-pink-100 bg-card group transition-all hover:shadow-md cursor-pointer"
            >
              <CardContent className="p-3 flex flex-col h-full">
                {/* Image */}
                <div className="relative aspect-square bg-muted rounded-xl mb-3 overflow-hidden">
                  <Badge className="absolute top-2 left-2 z-10 bg-destructive hover:bg-destructive text-destructive-foreground rounded-sm font-bold text-[10px] px-1.5 py-0.5">
                    {product.discount}
                  </Badge>
                  <Badge className="absolute top-2 right-2 z-10 bg-blue-500 hover:bg-blue-500 text-white rounded-sm font-semibold text-font-2 px-1.5 py-0.5">
                    {product.badge}
                  </Badge>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info */}
                <div className="mt-3 flex-1 flex flex-col">
                  <h3 className="text-font-2 font-semibold text-stone-800 line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 fill-[var(--mama-hot-pink)] text-[var(--mama-hot-pink)]" />
                    <span className="text-xs text-stone-500 font-medium">
                      {product.rating}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {product.sold} Terjual
                    </span>
                  </div>
                  <div className="mt-1 flex items-end justify-between">
                    <div>
                      <span className="text-destructive font-bold text-font-3 md:text-font-4">
                        {product.price}
                      </span>
                    </div>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 rounded-full bg-[var(--mama-hot-pink)] text-white hover:bg-[var(--mama-pink)] hover:text-white hover:bg-pink-600 hover:scale-110"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}