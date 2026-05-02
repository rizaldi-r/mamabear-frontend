"use client";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Atur Ulang Sandi"
      subtitle="Tautan pemulihan akan dikirimkan ke email Anda"
      backToHref="/login"
      backToLabel="Kembali ke Login"
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}
