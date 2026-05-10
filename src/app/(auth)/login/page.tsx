import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="h-svh flex flex-col justify-between">
      <Navbar />
      <AuthLayout
        title="Selamat Datang Kembali"
        subtitle="Masuk ke akun MamaBear Anda"
        backToHref="/"
        backToLabel="Kembali ke Beranda"
      >
        <LoginForm />
      </AuthLayout>
      <Footer />
    </div>
  );
}
