"use client";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Daftar Akun Baru"
      subtitle="Bergabunglah dengan jutaan mama lainnya"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
