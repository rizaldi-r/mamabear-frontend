import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export function TestimonialSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <h2 className="text-2xl font-medium text-stone-800 mb-1">
          What Mama Says About
        </h2>
        <h3 className="text-3xl font-bold text-primary mb-10">
          MamaBear Asi Booster
        </h3>

        <Card className="rounded-3xl shadow-lg border border-pink-100 bg-card overflow-hidden">
          <CardContent className="p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 text-left">
            <div className="w-full md:w-1/3 aspect-square bg-secondary rounded-2xl flex items-center justify-center shrink-0">
              <span className="text-pink-200">Product Image</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <h4 className="font-bold text-stone-800 text-lg mb-2">Citra</h4>
              <p className="text-stone-600 italic leading-relaxed">
                &quot;Alhamdulillah cocok banget di aku. ASI jadi makin lancar and
                kental. Baby juga tidurnya jadi lebih nyenyak karena kenyang.
                Rasanya juga enak gak bikin eneg. Thank you MamaBear!&quot;
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
