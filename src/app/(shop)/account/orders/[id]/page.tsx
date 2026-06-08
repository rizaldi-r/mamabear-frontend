import React from "react";
import { redirect } from "next/navigation";
import { getOrderById } from '@/lib/order';
import OrderDetailHeader from "@/features/orders/components/odp/OrderDetailHeader";
import OrderStatusBar from "@/features/orders/components/odp/OrderStatusBar";
import OrderItemList from "@/features/orders/components/odp/OrderItemList";
import ShippingInfo from "@/features/orders/components/odp/ShippingInfo";
import PaymentInfo from "@/features/orders/components/odp/PaymentInfo";
import OrderTimeline from "@/features/orders/components/odp/OrderTimeline";

export default async function OrderDetailsPage({ params }: { params: { id: string } }) {
    const { id } = params;
    
    // Fetch order data from the API
    const order = await getOrderById(id);

    // If order is not found, redirect Mama back to the order list
    if (!order) {
        redirect('/account/orders');
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 pb-20">
            <OrderDetailHeader orderId={order.id} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Info */}
                <div className="lg:col-span-8 space-y-8">
                    <OrderStatusBar status={order.status} estimate={order.shipping?.estimate} />
                    
                    <OrderItemList items={order.items} />

                    {/* Shipping and Payment Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ShippingInfo shipping={order.shipping} />
                    <PaymentInfo method={order.paymentMethod} />
                </div>
            </div>

            {/* Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <OrderTimeline timeline={order.timeline} />
                </div>
            </div>
        </div>
    );
}