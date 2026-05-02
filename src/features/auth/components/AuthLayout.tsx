import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function AuthLayout({
  children,
  title,
  subtitle,
  backToHref,
  backToLabel,
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-primary/20">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">{/* {BRAND.logo} */}</div>
        <h2 className="text-center text-3xl font-extrabold text-foreground tracking-tight">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground font-medium">
          {subtitle}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="border-pink-100 shadow-xl sm:rounded-3xl relative overflow-hidden">
          {/* Decorative branding elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -mr-16 -mt-16 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-500/5 -ml-16 -mb-16 rounded-full blur-3xl" />

          <CardContent className="relative z-10 pt-8 space-y-6">
            {children}
          </CardContent>
        </Card>

        {backToHref && (
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
  );
}
