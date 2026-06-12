import { CreditCard, FileText } from "lucide-react";

interface PaymentInfoProps {
    method: string;
}

export default function PaymentInfo({ method }: PaymentInfoProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-black text-[#8B5E3C] uppercase px-1">Metode Pembayaran</h3>
            <div className="bg-white border border-stone-100 rounded-3xl p-5 space-y-4 shadow-sm h-full">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-stone-400" />
                    </div>
                    <div>
                        <p className="text-xs font-black text-stone-800">{method}</p>
                        <p className="text-[10px] text-stone-400 font-bold mt-0.5 uppercase">Lunas</p>
                    </div>
                </div>
            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-stone-50 hover:bg-stone-100 rounded-xl text-xs font-bold text-stone-600 transition-all">
                <FileText className="w-4 h-4" /> Download Invoice
            </button>
            </div>
        </div>
    );
}
