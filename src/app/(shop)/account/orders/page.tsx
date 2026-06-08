'use client';
import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import type { Order } from "@/lib/order";
import OrderCard from "@/features/orders/components/listing/OrderCard";
import OrderFilterHeader from "@/features/orders/components/listing/OrderFilterHeader";
import OrderEmptyState from "@/features/orders/components/listing/OrderEmptyState";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { Navbar } from "@/components/layout/Navbar";
import UserMenu from "@/features/orders/components/listing/UserMenu";

export default function OrdersPage() {
    const [activeTab, setActiveTab] = useState("Semua");
    const tabs = ["Semua", "Belum dibayar", "Dikonfirmasi", "Diproses", "Dikirim", "Dibatalkan", "Selesai"];

    const { orders, loading, error } = useOrders(activeTab) as { 
        orders: Order[];      
        loading: boolean; 
        error: string | null 
    };

    return (
        <>
        <div>
            <Navbar />
            <div className="mx-auto max-w-5xl px-4 py-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-[280px_1fr]">
                    <aside className="hidden md:block">
                        <UserMenu />
                    </aside>
                    <section>
                        <OrderFilterHeader
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            tabs={tabs}
                        />

                        <div className="space-y-4">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20">
                                    <Loader2 className="w-8 h-8 text-pink-500 animate-spin mb-2" />
                                    <p className="text-stone-400 text-sm font-medium">Memuat pesanan Mama...</p>
                                </div>
                            ) : error ? (
                                <div className="flex flex-col items-center justify-center py-20 text-destructive bg-destructive/5 rounded-3xl border border-destructive/10">
                                    <AlertCircle className="w-8 h-8 mb-2" />
                                    <p className="text-sm font-bold">{error}</p>
                                </div>
                            ) : orders.length > 0 ? (
                                orders.map(order => (
                                    <OrderCard key={order.id} order={order} />
                                ))
                            ) : (
                                <OrderEmptyState />
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
        </>
    );
}