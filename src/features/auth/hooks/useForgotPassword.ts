import { useState } from "react";
import { useForm } from "react-hook-form";
import { ResetPasswordPayload } from "../types/auth.type";
import { requestPasswordReset } from "@/features/auth/services/authService";

export function useForgotPassword() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm<ResetPasswordPayload>();

  const onSubmit = async (data: ResetPasswordPayload) => {
    setLoading(true);
    setApiError(null);

    try {
      await requestPasswordReset(data.email);
      setSubmitted(true);
    } catch (error: any) {
      console.error("[Forgot Password Error]:", error);
      setApiError(
        error.message || "Koneksi ke server gagal. Silakan coba lagi nanti.",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    submitted,
    setSubmitted,
    loading,
    apiError,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
