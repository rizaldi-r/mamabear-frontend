"use client";

import { BottomNav } from "@/components/layout/navigation/BottomNavbar";
import { SidebarMenu } from "@/components/layout/navigation/SidebarMenu";
import { UserDropdown } from "@/components/layout/navigation/UserDropdown";
import { Badge } from "@/components/ui/badge";
import { SearchBar } from "@/features/products/components/shared/SearchBar";
import { useUIStore } from "@/store/use-ui-store";
import { Menu, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  const { data: session, status } = useSession();
  const isLoggedIn =
    status === "authenticated" && session?.error !== "RefreshAccessTokenError";
  const { toggleSidebar } = useUIStore();

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-[var(--mama-pink)] shadow-sm py-3">
        <div className="container mx-auto flex items-center gap-3 md:gap-4 justify-between page-max-width">
          {/* Hamburger (Desktop only) & Logo */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <button
              type="button"
              onClick={toggleSidebar}
              className="hidden md:flex text-[var(--mama-brown)] hover:bg-[color-mix(in_srgb,var(--mama-brown),transparent_90%)] p-2 rounded-md transition-all"
              aria-label="Toggle Menu"
            >
              <Menu className="w-8 h-8" />
            </button>

            <Link href="/" className="shrink-0">
              <Image
                src="/images/layout/logo.png"
                alt="Mamabear Logo"
                width={50}
                height={50}
                className="md:w-[70px] md:h-[70px]"
                priority
              />
            </Link>
          </div>

          {/* Search Bar Component */}
          <SearchBar />

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            {/* Profile - Hidden on mobile, shown on desktop */}
            <div className="hidden md:flex items-center gap-3">
              <UserDropdown isLoggedIn={isLoggedIn} user={session?.user} />

              {/* Vertical Separator */}
              <div className="w-px h-8 bg-[var(--mama-brown)] mx-1" />
            </div>

            {/* Always visible */}
            <button
              type="button"
              className="text-[var(--mama-brown)] hover:bg-[color-mix(in_srgb,var(--mama-brown),transparent_90%)] p-2 rounded-md transition-all relative"
            >
              <ShoppingCart className="w-5 h-5 md:w-7 md:h-7" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive hover:bg-destructive text-destructive-foreground">
                2
              </Badge>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER MENU */}
      <SidebarMenu />
      <BottomNav isLoggedIn={isLoggedIn} user={session?.user} />
    </>
  );
}
