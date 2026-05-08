"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginPayload } from "@/features/auth/types/auth";

/**
 * useLogin Hook (NextAuth)
 * Uses next-auth/react to handle the session.
 */
export function useLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleLogin = async (payload: LoginPayload) => {
    setLoading(true);
    setServerError(null);

    // NextAuth automatically set the session cookies
    const result = await signIn("credentials", {
      redirect: false, // We handle redirection manually
      email: payload.email,
      password: payload.password,
    });

    if (result?.error) {
      setServerError("Email atau password salah.");
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return { loading, serverError, handleLogin };
}
