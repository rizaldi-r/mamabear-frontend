import { useState, useEffect, useCallback } from 'react';
import { OrderDetail, OrderStatus } from '../types/adminOrder.types';
import { 
  fetchAdminOrderById, 
  updateAdminOrderStatus,
  updateAdminOrderTracking,
  cancelAdminOrder
} from '../service/adminOrderService';

export function useAdminOrderDetail(orderId: string) {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isCancelling, setIsCancelling] = useState<boolean>(false);

  const fetchOrder = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchAdminOrderById(orderId);
      setOrder(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan saat mengambil detail pesanan.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [fetchOrder, orderId]);

  const updateStatus = async (newStatus: OrderStatus) => {
    if (!order) return;
    setIsUpdating(true);
    try {
      await updateAdminOrderStatus(order.id, { status: newStatus });
      await fetchOrder();
    } catch (err) {
      console.error('[useAdminOrderDetail] Failed to update status:', err);
      const errorMessage = err instanceof Error ? err.message : 'Gagal memperbarui status pesanan.';
      alert(errorMessage); 
    } finally {
      setIsUpdating(false);
    }
  };

  const updateTracking = async (trackingNumber: string) => {
    if (!order) return;
    setIsUpdating(true);
    try {
      await updateAdminOrderTracking(order.id, { trackingNumber });
      await fetchOrder();
    } catch (err) {
      console.error('[useAdminOrderDetail] Failed to update tracking:', err);
      const errorMessage = err instanceof Error ? err.message : 'Gagal memperbarui nomor resi.';
      alert(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  const cancelOrder = async (notes?: string) => {
    if (!order) return;
    setIsCancelling(true);
    try {
      await cancelAdminOrder(order.id, { notes });
      await fetchOrder();
    } catch (err) {
      console.error('[useAdminOrderDetail] Failed to cancel order:', err);
      const errorMessage = err instanceof Error ? err.message : 'Gagal membatalkan pesanan.';
      alert(errorMessage);
    } finally {
      setIsCancelling(false);
    }
  };

  return {
    order,
    isLoading,
    error,
    isUpdating,
    isCancelling,
    updateStatus,
    updateTracking,
    cancelOrder,
    refetch: fetchOrder
  };
}