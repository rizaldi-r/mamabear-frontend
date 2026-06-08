import { formatIDR } from "@/lib/currency";

export default function OrderItemList({ items }) {
    if (!items) return null;
    
    return (
        <div className="bg-white border border-stone-100 rounded-3xl overflow-hidden shadow-sm">
            {items.map((item, idx) => (
            <div key={item.id} className={`p-4 flex gap-4 ${idx !== 0 ? 'border-t border-stone-50' : ''}`}>
                <div className="w-20 h-20 bg-stone-50 rounded-xl overflow-hidden shrink-0 border border-stone-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-stone-800 line-clamp-2">{item.name}</p>
                    <p className="text-xs text-stone-400 font-medium mt-1">{item.variant}</p>
                    <div className="justify-between items-end mt-2 flex">
                        <p className="text-xs text-stone-500 font-bold">{item.quantity}x <span className="text-pink-600 ml-1">{formatIDR(item.price)}</span></p>
                        <p className="text-sm font-black text-stone-800">{formatIDR(item.price * item.quantity)}</p>
                    </div>
                </div>
            </div>
            ))}
        </div>
    );
}
