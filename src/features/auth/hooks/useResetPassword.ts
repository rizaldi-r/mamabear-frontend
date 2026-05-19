import { confirmPasswordReset } from "@/features/auth/services/authService";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface UseConfirmResetPasswordProps {
  token: string;
}

export function useConfirmResetPassword({
  token,
}: UseConfirmResetPasswordProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    setApiError(null);

    try {
      await confirmPasswordReset(token, data.password);
      setSubmitted(true);
    } catch (error: any) {
      console.error("[Confirm Reset Error]:", error);
      setApiError(
        error.message ||
          "Tautan pemulihan mungkin sudah kedaluwarsa atau tidak valid.",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    submitted,
    loading,
    apiError,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
