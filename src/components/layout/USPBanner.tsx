import { HeartHandshake, Leaf, Medal, ShieldCheck } from "lucide-react";

export function USPBanner() {
  return (
    <div className="bg-secondary border-b border-pink-100 py-2 hidden md:block">
      <div className="container mx-auto px-4 flex justify-between items-center text-xs font-medium text-stone-600">
        <div className="flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-primary" /> 24/7 FREE
          KONSULTING
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-400" /> BRAND CHOICE
          2022-2024
        </div>
        <div className="flex items-center gap-2">
          <Leaf className="w-4 h-4 text-green-500" /> NATURAL 100% Bahan Alami
        </div>
        <div className="flex items-center gap-2">
          <Medal className="w-4 h-4 text-orange-400" /> DIPERCAYA Jutaan Ibu
        </div>
      </div>
    </div>
  );
}
