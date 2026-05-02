import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function ResetPasswordForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    console.log("Reset Email:", data); // Ready to be sent to your API
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="text-center space-y-4 animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-stone-800 tracking-tight">
          Cek Email Anda
        </h3>
        <p className="text-sm text-stone-600 leading-relaxed">
          Kami telah mengirimkan tautan pemulihan ke email terdaftar. Silakan
          cek folder inbox atau spam Anda.
        </p>
        <Button
          variant="link"
          onClick={() => setSubmitted(false)}
          className="text-xs font-bold text-primary"
        >
          Tidak menerima email? Kirim ulang
        </Button>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label
          htmlFor="reset-email"
          className="text-xs font-bold text-stone-600 uppercase ml-1"
        >
          Alamat Email Terdaftar
        </Label>
        <div className="relative group">
          <Mail
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${errors.email ? "text-destructive" : "text-stone-400 group-focus-within:text-primary"}`}
          />
          <Input
            id="reset-email"
            type="email"
            placeholder="mama@contoh.com"
            {...register("email", {
              required: "Email wajib diisi",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Format email tidak valid",
              },
            })}
            className={`pl-10 bg-stone-50 rounded-2xl ${errors.email ? "border-destructive focus-visible:ring-destructive/20" : "border-stone-200 focus-visible:ring-primary/20"}`}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-destructive ml-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white h-12 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90"
      >
        {loading ? "Mengirim..." : "Kirim Tautan Pemulihan"}
      </Button>
    </form>
  );
}
