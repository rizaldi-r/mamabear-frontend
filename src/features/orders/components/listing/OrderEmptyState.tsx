import { Package } from "lucide-react";

export default function OrderEmptyState() {
    return (
        <div className="text-center py-20 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200">
            <Package className="w-12 h-12 text-stone-300 mx-auto mb-3" strokeWidth={1.5} />
            <p className="text-stone-500 font-bold">Tidak ada pesanan ditemukan</p>
        </div>
    );
}   