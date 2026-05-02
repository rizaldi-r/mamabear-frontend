"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {LoginPayload} from "@/features/auth/types/auth";
import {loginUser} from "@/features/auth/services/login";

/**
 * Custom hook to manage the login logic, state, and API communication.
 * This separates the "business logic" from the UI components.
 */
export function useLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleLogin = async (data: LoginPayload) => {
    setLoading(true);
    setServerError(null);

    try {
      // API call to our Route Handler or Service
      const response = await loginUser(data);

      // Success logic: Log the result and navigate gracefully using Next.js Router
      console.log("Login Success:", response.data);

      // router.push('/') is faster and more "graceful" than window.location.href
      router.push("/");
      router.refresh(); // Optional: Refreshes server data for the new session
    } catch (err: any) {
      // Catch and format the error message from the service
      setServerError(err.message || "Gagal masuk. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    serverError,
    handleLogin,
  };
}
