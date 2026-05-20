import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import {ForgotPasswordForm} from "@/features/auth/components/ForgotPasswordForm";

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
        <ForgotPasswordForm />
      </AuthLayout>
      <Footer />
    </div>
  );
}
