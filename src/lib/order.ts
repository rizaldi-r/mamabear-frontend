export interface OrderItem {
    id: string;
    image?: string;
    name: string;
}

export interface Order {
    id: string;
    date: string;
    status: string;
    image?: string;
    items?: OrderItem[];
    itemsCount: number;
    totalAmount: number;
}

export async function getOrderById(id: string) {
    try {
      // In local dev, we use the relative URL for internal route handlers
      // In production, this would use the absolute API_BASE_URL
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
        const res = await fetch(`${baseUrl}/orders/${id}`, {
            cache: 'no-store' // Ensure we get the latest status (e.g., after a cancellation)
        });

        if (!res.ok) return null;

        const result = await res.json();
        return result.success ? result.data : null;
    } catch (error) {
        console.error("Failed to fetch order:", error);
        return null;
    }
}   