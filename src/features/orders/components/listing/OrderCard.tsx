import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { formatIDR } from "@/lib/currency";
import StatusBadge from "./StatusBadge";
import type { Order } from "@/lib/order";

interface OrderCardProps {
    order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
    const displayImage = order.image || (order.items?.[0]?.image);
    const displayName = order.items?.[0]?.name || "Produk MamaBear";

    return (
        <Link
            href={`/account/orders/${order.id}`}
            className="bg-white border border-stone-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col group"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-tight">{order.date}</p>
                    <p className="text-sm font-bold text-stone-800">{order.id}</p>
                </div>
                <StatusBadge status={order.status} />
            </div>

            <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-stone-50 rounded-xl overflow-hidden shrink-0 border border-stone-100">
                    <img
                        src={displayImage}
                        alt="Product"
                        className="w-full h-full object-contain p-1"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-stone-700 truncate">{displayName}</p>
                    <p className="text-xs text-stone-400">
                    {order.itemsCount > 1
                        ? `+${order.itemsCount - 1} produk lainnya`
                        : "1 Produk"}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-50">
                <div className="space-y-0.5">
                    <p className="text-[10px] text-stone-400 font-bold uppercase">Total Belanja</p>
                    <p className="text-sm font-black text-pink-600">{formatIDR(order.totalAmount)}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-stone-400 group-hover:text-pink-500 transition-colors">
                    Lihat Pesanan <ChevronRight className="w-4 h-4" />
                </div>
            </div>
        </Link>
    );
}   