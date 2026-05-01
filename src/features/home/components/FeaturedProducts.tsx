import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";

export function FeaturedProducts({ products }) {
  return (
    <section className="py-12 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="rounded-2xl overflow-hidden border border-pink-100 bg-card group transition-all hover:shadow-md"
            >
              <CardContent className="p-3 flex flex-col h-full">
                <div className="relative aspect-square bg-muted rounded-xl mb-3 flex items-center justify-center">
                  <Badge className="absolute top-2 left-2 bg-destructive hover:bg-destructive text-destructive-foreground rounded-sm font-bold">
                    {product.discount}
                  </Badge>
                  <span className="text-muted-foreground/30 font-medium">
                    Image
                  </span>
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="text-sm font-semibold text-stone-800 line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-stone-500 font-medium">
                      5.0
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({product.sold})
                    </span>
                  </div>
                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <span className="text-[10px] text-muted-foreground line-through block leading-none">
                        {product.originalPrice}
                      </span>
                      <span className="text-destructive font-bold text-sm md:text-base">
                        {product.price}
                      </span>
                    </div>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors"
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
