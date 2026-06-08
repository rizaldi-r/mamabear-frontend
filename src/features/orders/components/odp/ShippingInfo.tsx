import { MapPin, Truck } from "lucide-react";

interface Shipping {
    receiver: string;
    address: string;
    courier: string;
    trackingNumber: string;
}

interface ShippingInfoProps {
    shipping: Shipping;
}

export default function ShippingInfo({ shipping }: ShippingInfoProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-black text-[#8B5E3C] uppercase px-1">Informasi Pengiriman</h3>
            <div className="bg-white border border-stone-100 rounded-3xl p-5 space-y-4 shadow-sm h-full">
                <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-pink-400 mt-0.5 shrink-0" />
                    <div>
                        <p className="text-xs font-black text-stone-800">{shipping?.receiver}</p>
                        <p className="text-xs text-stone-500 leading-relaxed mt-1">{shipping?.address}</p>
                    </div>
                </div>
                <div className="pt-3 border-t border-stone-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-stone-600">
                        <Truck className="w-4 h-4" />
                        <span className="text-xs font-bold">{shipping?.courier}</span>
                    </div>
                    <span className="text-xs font-black text-pink-600">{shipping?.trackingNumber}</span>
                </div>
            </div>
        </div>
    );
}
