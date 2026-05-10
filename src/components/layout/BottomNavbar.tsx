"use client";

import React from "react";
import Link from "next/link";
import {
  Home,
  LayoutGrid,
  ReceiptText,
  User,
  MessageCircleMore,
} from "lucide-react";
import { useUIStore } from "@/store/use-ui-store";
import { UserDropdown } from "@/components/layout/UserDropdown";

export function BottomNav() {
  const { toggleSidebar } = useUIStore();
  const isLoggedIn = false;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-100 shadow-[0_-1px_4px_rgba(214,85,126,0.5)] pb-safe">
      <div className="flex items-center justify-around h-16">
        {/* Home */}
        <Link
          href="/"
          className="flex flex-col items-center justify-center w-full h-full text-[var(--mama-brown)] hover:text-primary transition-colors"
        >
          <Home className="w-6 h-6" strokeWidth={2.5} />
          <span className="text-[10px] mt-1 font-semibold">Beranda</span>
        </Link>

        {/* Produk */}
        <Link
          href="/products"
          className="flex flex-col items-center justify-center w-full h-full text-[var(--mama-brown)] hover:text-primary transition-colors"
        >
          <LayoutGrid className="w-6 h-6" strokeWidth={2.5} />
          <span className="text-[10px] mt-1 font-semibold">Produk</span>
        </Link>

        {/* Chat */}
        <Link
          href="/chat"
          className="flex flex-col items-center justify-center w-full h-full text-[var(--mama-brown)] hover:text-primary transition-colors"
        >
          <MessageCircleMore className="w-6 h-6" strokeWidth={2.5} />
          <span className="text-[10px] mt-1 font-semibold">Chat</span>
        </Link>

        {/* Transaksi */}
        <Link
          href="/orders"
          className="flex flex-col items-center justify-center w-full h-full text-[var(--mama-brown)] hover:text-primary transition-colors"
        >
          <ReceiptText className="w-6 h-6" strokeWidth={2.5} />
          <span className="text-[10px] mt-1 font-semibold">Transaksi</span>
        </Link>

        {/* Profile */}
        <div className="w-full">
          <UserDropdown
            isLoggedIn={isLoggedIn}
            className="bottom-full right-4 mb-2"
          >
            <div className="flex flex-col items-center justify-center w-full h-full text-[var(--mama-brown)] active:text-primary transition-colors">
              <User className="w-6 h-6" strokeWidth={2.5} />
              <span className="text-[10px] mt-1 font-semibold">Profile</span>
            </div>
          </UserDropdown>
        </div>
      </div>
    </div>
  );
}
