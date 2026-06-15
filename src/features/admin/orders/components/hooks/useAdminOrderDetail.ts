import { useState, useEffect, useCallback } from "react";
import { OrderDetail, OrderStatus } from "../types/adminOrder.types"; // Adjusted based on your new path
import {
  fetchAdminOrderById,
  updateAdminOrderStatus,
} from "../service/adminOrderService";

export function useAdminOrderDetail(orderId: string) {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const fetchOrder = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchAdminOrderById(orderId);
      setOrder(data);
    } catch (err) {
      // Safely narrow the unknown error type
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengambil detail pesanan.";
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
      // Refetch to get the updated history and status from the source of truth
      await fetchOrder();
    } catch (err) {
      console.error("[useAdminOrderDetail] Failed to update status:", err);
      // Safely narrow the unknown error type
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Gagal memperbarui status pesanan.";
      alert(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    order,
    isLoading,
    error,
    isUpdating,
    updateStatus,
    refetch: fetchOrder,
  };
}
