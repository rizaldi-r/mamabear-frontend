import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, ShoppingCart, User } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Mobile Menu & Logo */}
        <div className="flex items-center gap-4 lg:w-1/4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gray-600 hover:text-primary"
          >
            <Menu className="w-6 h-6" />
          </Button>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center text-white font-bold text-xs">
              MB
            </div>
          </div>
        </div>

        {/* Search Bar - Using Shadcn Input */}
        <div className="hidden md:flex flex-1 max-w-2xl relative">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 z-10" />
            <Input
              type="text"
              placeholder="Cari produk di MamaBear"
              className="w-full bg-pink-50/50 border-pink-100 rounded-full pl-10 focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* Actions - Using Shadcn Button & Badge */}
        <div className="flex items-center justify-end gap-2 lg:w-1/4">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-primary"
          >
            <User className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-primary relative"
          >
            <ShoppingCart className="w-6 h-6" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-destructive hover:bg-destructive text-destructive-foreground">
              2
            </Badge>
          </Button>
        </div>
      </div>
    </header>
  );
}
