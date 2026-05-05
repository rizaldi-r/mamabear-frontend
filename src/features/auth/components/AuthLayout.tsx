import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AuthLayoutProps } from "../types/auth";
import Image from "next/image";

export function AuthLayout({
  children,
  title,
  subtitle,
  backToHref,
  backToLabel,
}: AuthLayoutProps) {
  return (
   <div className="min-h-screen bg-background font-sans selection:bg-primary/20 flex items-center justify-center py-10 px-14">

   <div className="w-full max-w-6xl flex justify-between gap-4 items-start">

         {/* Form */}
         <div className="w-full flex flex-[0.8] max-w-sm pr-16 flex-col justify-center font-sans selection:bg-primary/20">

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
               <h2 className="text-xl font-extrabold text-[var(--mama-brown)] tracking-tight px-4">
                  {title}
               </h2>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
               <Card className="border-none shadow-none outline-none sm:rounded-3xl relative overflow-hidden">
                  {/* Decorative branding elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -mr-16 -mt-16 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-500/5 -ml-16 -mb-16 rounded-full blur-3xl" />

                  <CardContent className="relative z-10 space-y-6">
                     {children}
                  </CardContent>
               </Card>

               {backToHref && backToLabel && (
                  <p className="mt-6 text-center">
                     <Button
                     variant="link"
                     asChild
                     className="gap-2 text-primary hover:text-primary/80"
                     >
                     <Link href={backToHref}>
                        <ArrowLeft className="w-4 h-4" />
                        {backToLabel}
                     </Link>
                     </Button>
                  </p>
               )}
            </div>
         </div> 
         {/* End Form */}

         <div>
         <Image 
            src={"/images/auth/ambasador.png"}
            alt="Mamabear Ambassador"
            width={500}
            height={500}
            className="hidden md:block w-full max-w-lg"
         />
         </div>
   </div>

   </div> 
  );
}
