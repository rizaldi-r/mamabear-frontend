import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="page-max-width">
        <AuthLayout
          title="Selamat Datang Kembali"
          subtitle="Masuk ke akun MamaBear Anda"
          backToHref="/"
          backToLabel="Kembali ke Beranda"
        >
          <LoginForm />
        </AuthLayout>
      </main>
      <Footer />
    </>
  );
}
