"use client";

import { BottomNav } from "@/components/layout/navigation/BottomNavbar";
import { SidebarMenu } from "@/components/layout/navigation/SidebarMenu";
import { TopNavbar } from "@/components/layout/navigation/TopNavbar";
import { useSession } from "next-auth/react";

export function Navbar() {
  const { data: session, status } = useSession();
  const isLoggedIn =
    status === "authenticated" && session?.error !== "RefreshAccessTokenError";

  return (
    <>
      <TopNavbar isLoggedIn={isLoggedIn} user={session?.user} />
      <SidebarMenu />
      <BottomNav isLoggedIn={isLoggedIn} user={session?.user} />
    </>
  );
}
