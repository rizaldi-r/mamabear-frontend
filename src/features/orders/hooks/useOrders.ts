import { useState, useEffect } from 'react';
import { fetchUserOrders } from '../services/orderService';

export function useOrders(activeTab: string) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getOrders() {
            setLoading(true);
            setError(null);
            try {
                const result = await fetchUserOrders(activeTab);
            
                if (result.success) {
                    setOrders(result.data);
                } else {
                    throw new Error(result.message || "Terjadi kesalahan saat memproses data");
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        getOrders();
    }, [activeTab]);

    return { orders, loading, error };
}

