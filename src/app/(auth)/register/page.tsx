import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="h-svh flex flex-col justify-between">
      <Navbar />
      <AuthLayout
        title="Buat Akun Baru"
        subtitle="Bergabunglah dengan jutaan mama lainnya"
        backToHref="/"
        backToLabel="Kembali ke Beranda"
      >
        <RegisterForm />
      </AuthLayout>
      <Footer />
    </div>
  );
}
