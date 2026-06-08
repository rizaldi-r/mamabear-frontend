import { Truck } from "lucide-react";

interface OrderStatusBarProps {
    status: string;
    estimate?: string;
}

export default function OrderStatusBar({ status, estimate }: OrderStatusBarProps) {
    return (
        <div className="bg-pink-50/50 border border-pink-100 rounded-3xl p-6 flex flex-col md:flex-row gap-6 items-center text-center md:text-left">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-pink-500">
                <Truck className="w-8 h-8" />
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-bold text-stone-800">Pesanan Mama sedang {status.toLowerCase()}</h3>
                <p className="text-sm text-stone-500">Estimasi tiba pada <span className="font-bold text-pink-600">{estimate || '-'}</span></p>
            </div>
        </div>
    );
}
        