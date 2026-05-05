import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialLogins } from "@/features/auth/components/SocialLogins";
import { Lock, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RegisterPayload } from "../types/auth";
import { SubmitHandler } from "react-hook-form";

export function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<RegisterPayload>();

  const password = watch("password");

  const onSubmit: SubmitHandler<RegisterPayload> = (data) => {
    setLoading(true);
    console.log("Register Data:", data); // Ready to be sent to your API
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="space-y-6">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">

         {/* ------------------- NAMA LENGKAP ------------------- */}
          <Label
            htmlFor="fullname"
            className="text-xs font-bold text-[var(--mama-brown)] ml-1"
          >
            Nama Lengkap
          </Label>
          <div className="relative group">
            <User
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${errors.fullname ? "text-destructive" : "text-stone-400 group-focus-within:text-primary"}`}
            />
            <Input
              id="fullname"
              placeholder="Nama Mama"
              {...register("fullname", {
                required: "Nama lengkap wajib diisi",
              })}
              className={`pl-10 bg-white border-0 border-b border-gray-300 [&::placeholder]:text-[0.6rem] [&::placeholder]:text-stone-400 [&::placeholder]:font-semibold ${errors.fullname ? "" : "focus-visible:ring-primary/20"}`}
            />
          </div>
          {errors.fullname && (
            <p className="text-xs text-destructive ml-1">
              {errors.fullname.message}
            </p>
          )}
        </div>

         {/* ------------------- EMAIL ------------------- */}
        <div className="space-y-2">
          <Label
            htmlFor="reg-email"
            className="text-xs font-bold text-[var(--mama-brown)] ml-1"
          >
            Email
          </Label>
          <div className="relative group">
            <Mail
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${errors.email ? "text-destructive" : "text-stone-400 group-focus-within:text-primary"}`}
            />
            <Input
              id="reg-email"
              type="email"
              placeholder="mama@contoh.com"
              {...register("email", {
                required: "Email wajib diisi",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Format email tidak valid",
                },
              })}
              className={`pl-10 bg-white border-0 border-b border-gray-300 [&::placeholder]:text-[0.6rem] [&::placeholder]:text-stone-400 [&::placeholder]:font-semibold ${errors.email ? "border-destructive focus-visible:ring-destructive/20" : "border-stone-200 focus-visible:ring-primary/20"}`}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-destructive ml-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
         <Label
            htmlFor="phone"
            className="text-xs font-bold text-stone-600 ml-1"
         >
            Nomor Handphone
         </Label>

         <div className="relative group">
            {/* Icon */}
            <Phone
               className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
               errors.phone
                  ? "text-destructive"
                  : "text-stone-400 group-focus-within:text-primary"
               }`}
            />

            {/* Input +62 */}
            <div className="flex items-center pl-10 border-0 border-b">
               <span className="text-sm text-stone-500 mr-2 font-semibold text-[var(--mama-brown)]">+62</span>

               <Input
               id="phone"
               type="text"
               placeholder="81234567890"
               {...register("phone", {
                  required: "Nomor handphone wajib diisi",
                  pattern: {
                     value: /^[0-9]+$/,
                     message: "Hanya boleh angka",
                  },
                  minLength: {
                     value: 9,
                     message: "Nomor terlalu pendek",
                  },
               })}
               className={`pl-10 bg-white border-0 border-b border-gray-300 [&::placeholder]:text-[0.6rem] [&::placeholder]:text-stone-400 [&::placeholder]:font-semibold ${
                  errors.phone
                     ? "border-destructive focus-visible:ring-destructive/20"
                     : "border-stone-200 focus-visible:ring-primary/20"
               }`}
               />
            </div>
         </div>

         {errors.phone && (
            <p className="text-xs text-destructive ml-1">
               {errors.phone.message}
            </p>
         )}
         </div>

         {/* ------------------- PASSWORD ------------------- */}
        <div className="space-y-2">
          <Label
            htmlFor="reg-pass"
            className="text-xs font-bold text-[var(--mama-brown)] ml-1"
          >
            Password
          </Label>
          <div className="relative group">
            <Lock
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${errors.password ? "text-destructive" : "text-stone-400 group-focus-within:text-primary"}`}
            />
            <Input
              id="reg-pass"
              type="password"
              placeholder="Minimal 8 karakter"
              {...register("password", {
                required: "Kata sandi wajib diisi",
                minLength: { value: 8, message: "Minimal 8 karakter" },
              })}
              className={`pl-10 bg-white border-0 border-b border-gray-300 [&::placeholder]:text-[0.6rem] [&::placeholder]:text-stone-400 [&::placeholder]:font-semibold ${errors.password ? "border-destructive focus-visible:ring-destructive/20" : "border-stone-200 focus-visible:ring-primary/20"}`}
            />
          </div>
          {errors.password && (
            <p className="text-xs text-destructive ml-1">
              {errors.password.message}
            </p>
          )}
        </div>

         {/* ------------------- CONFIRM PASSWORD ------------------- */}
        <div className="space-y-2">
         <Label
            htmlFor="reg-confirm-pass"
            className="text-xs font-bold text-[var(--mama-brown)] ml-1"
         >
            Ulangi Password
         </Label>

         <div className="relative group">
            <Lock
               className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
               errors.confirmPassword
                  ? "text-destructive"
                  : "text-stone-400 group-focus-within:text-primary"
               }`}
            />

            <Input
               id="reg-confirm-pass"
               type="password"
               placeholder="Ulangi kata sandi"
               {...register("confirmPassword", {
               required: "Harap ulangi kata sandi",
               validate: (value) =>
                  value === password || "Password tidak sama",
               })}
               className={`pl-10 bg-white border-0 border-b [&::placeholder]:text-[0.6rem] [&::placeholder]:text-stone-400 [&::placeholder]:font-semibold ${
               errors.confirmPassword
                  ? "border-destructive focus-visible:ring-destructive/20"
                  : "border-stone-200 focus-visible:ring-primary/20"
               }`}
            />
         </div>

         {errors.confirmPassword && (
            <p className="text-xs text-destructive ml-1">
               {errors.confirmPassword.message}
            </p>
         )}
         </div>

         {/* ------------------- TERMS & CONDITIONS ------------------- */}
        <div className="flex flex-col space-y-1 pt-2 px-1">
          <div className="flex items-start space-x-2">
            <Controller
              name="terms"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Checkbox
                  id="terms"
                  className={`mt-0.5 ${errors.terms ? "border-destructive" : "border-stone-300"} data-[state=checked]:bg-primary data-[state=checked]:border-primary`}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label
              htmlFor="terms"
              className="flex flex-wrap items-center text-xs text-stone-500 leading-relaxed font-medium"
            >
              Saya setuju dengan{" "} 
                  <Link href="/" className="text-primary font-bold text-xs">
              Syarat & Ketentuan
                  </Link>

              serta{" "}

                  <Link href="/" className="text-primary font-bold text-xs">
              Kebijakan Privasi
                  </Link>
              {/* <Button
                variant="link"
                className="p-0 h-auto text-primary font-bold text-xs"
                type="button"
              >
                Syarat & Ketentuan
              </Button>{" "}
              serta{" "}
              <Button
                variant="link"
                className="p-0 h-auto text-primary font-bold text-xs"
                type="button"
              >
                Kebijakan Privasi
              </Button> */}
            </Label>
            
          </div>
          {errors.terms && (
            <p className="text-xs text-destructive">
              Anda harus menyetujui syarat & ketentuan
            </p>
          )}
        </div>

        {/* ------------------- SUBMIT BUTTON ------------------- */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white h-8 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-[0.98] transition-all"
        >
          {loading ? "Mendaftar..." : "Buat Akun"}
        </Button>
      </form>

      <SocialLogins />

      <p className="text-center text-xs text-stone-500 pt-2">
        Sudah punya akun?{" "}
        <Button
          variant="link"
          asChild
          className="font-bold text-primary p-0 h-auto text-xs"
        >
          <Link href="/login">Masuk di sini</Link>
        </Button>
      </p>
    </div>
  );
}
