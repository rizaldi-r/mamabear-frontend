import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function OrderDetailHeader({ orderId }: { orderId: string}) {
    return (
        <div className="flex items-center gap-4">
            <Link href="/account/orders" className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-600">
                <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="space-y-0.5">
                <h2 className="text-xl font-black text-[#8B5E3C]">Detail Pesanan</h2>
                <p className="text-xs text-stone-400 font-bold uppercase">{orderId}</p>
            </div>
        </div>
    );
}