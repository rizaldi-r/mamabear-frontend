"use client";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Selamat Datang Kembali"
      subtitle="Masuk ke akun MamaBear Anda"
    >
      <LoginForm />
    </AuthLayout>
  );
}
