"use client";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="h-svh flex flex-col justify-between">
      <Navbar />
      <AuthLayout
        title="Reset Password"
        subtitle="Tautan pemulihan akan dikirimkan ke email Anda"
        backToHref="/login"
        backToLabel="Kembali ke Login"
        showImage={false}
      >
        <ResetPasswordForm />
      </AuthLayout>
      <Footer />
    </div>
  );
}
