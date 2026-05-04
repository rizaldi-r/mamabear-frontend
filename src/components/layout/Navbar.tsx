"use client";

import { SidebarMenu } from "@/components/layout/SidebarMenu";
import { UserDropdown } from "@/components/layout/UserDropdown";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useUIStore } from "@/store/use-ui-store";
import { Menu, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  const isLoggedIn = false;
  const { toggleSidebar } = useUIStore();

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-[var(--mama-pink)] shadow-sm py-3">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Hamburger & Logo */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={toggleSidebar}
              className="text-[var(--mama-brown)] hover:bg-[color-mix(in_srgb,var(--mama-brown),transparent_90%)] p-2 rounded-md transition-all"
              aria-label="Toggle Menu"
            >
              <Menu className="w-8 h-8" />
            </button>

            <Link href="/">
              <Image
                src="/images/layout/logo.png"
                alt="Mamabear Logo"
                width={70}
                height={70}
                priority
              />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl relative">
            <Search
              className="text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2 z-10"
              width="20"
              height="20"
              stroke-width="3"
            />
            <Input
              type="text"
              placeholder="Cari produk di MamaBear"
              className="w-full bg-white border-pink-100 pl-14 focus-visible:ring-primary rounded-lg py-5"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 text-white">
            <UserDropdown isLoggedIn={isLoggedIn} />

            {/* Vertical Separator */}
            <div className="w-px h-8 bg-[var(--mama-brown)] mx-1" />

            <button
              type="button"
              className="text-[var(--mama-brown)] hover:bg-[color-mix(in_srgb,var(--mama-brown),transparent_90%)] p-2 rounded-md transition-all relative"
            >
              <ShoppingCart className="w-7 h-7" color="var(--mama-brown)" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-destructive hover:bg-destructive text-destructive-foreground">
                2
              </Badge>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER MENU */}
      <SidebarMenu />
    </>
  );
}
