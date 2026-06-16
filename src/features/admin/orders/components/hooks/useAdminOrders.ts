import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Order, OrderStatus } from "../types/adminOrder.types";
import { exportAdminOrdersCSV, fetchAdminOrders,   updateAdminOrderStatus } from "../service/adminOrderService";

export function useAdminOrders() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Local state for debouncing the search input
  const [searchInput, setSearchInput] = useState<string>(
    searchParams.get("q") || "",
  );

  // Track initial render to prevent duplicate fetching
  const isFirstRender = useRef(true);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchAdminOrders(searchParams);

      // Defensively handle both plain arrays and paginated object wrappers
      // to prevent "orders.map is not a function" when data is empty/paginated.
      if (Array.isArray(result)) {
        setOrders(result);
      } else if (result && typeof result === "object") {
        // @ts-expect-error - safely extract nested data if API returns { data: [], pagination: {...} }
        const nestedData = result.data;
        setOrders(Array.isArray(nestedData) ? nestedData : []);

        // @ts-expect-error - safely extract pagination total
        if (result.pagination?.totalPages !== undefined) {
          // @ts-expect-error - pagination type is missing from base order response
          setTotalPages(result.pagination.totalPages);
        }
      } else {
        setOrders([]);
      }
    } catch (err) {
      // Safely narrow the unknown error type
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengambil data pesanan.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  // Fetch data whenever URL searchParams change
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Handle debounced search input syncing to URL
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // Skip syncing URL on initial mount since searchParams are already valid
    }

    const handler = setTimeout(() => {
      const currentQuery = searchParams.get("q") || "";

      // Only push new URL if the input actually differs from what's in the URL
      if (searchInput !== currentQuery) {
        const params = new URLSearchParams(searchParams.toString());
        if (searchInput) {
          params.set("q", searchInput);
        } else {
          params.delete("q");
        }
        // Reset to page 1 on new search
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchInput, pathname, router, searchParams]);

  const handleStatusFilterChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (status && status !== "ALL") {
      params.set("status", status);
    } else {
      params.delete("status");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleFilterDate = (startDate:string, endDate:string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("startDate", startDate);
    params.set("endDate", endDate);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const handleErase = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("startDate")
    params.delete("endDate")
    params.delete("startDate")
    params.delete("page")
    params.delete("status");
    router.push(pathname)
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateAdminOrderStatus(orderId, { status: newStatus });
      // Refetch to ensure consistency
      await fetchOrders();
    } catch (err) {
      console.error("[useAdminOrders] Failed to update status:", err);
      // Safely narrow the unknown error type
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Gagal memperbarui status pesanan.";
      alert(errorMessage); // Basic fallback, replace with toast in real app
    }
  };

  const handleExportCSV = async () => {
    setIsExporting(true);
    try {
      const blob = await exportAdminOrdersCSV(searchParams);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Data-Pesanan-MamaBear-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("[useAdminOrders] Failed to export CSV:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Gagal mengekspor data CSV.";
      alert(errorMessage);
    } finally {
      setIsExporting(false);
    }
  };


  return {
    orders,
    isLoading,
    error,
    searchInput,
    setSearchInput,
    handleStatusFilterChange,
    handlePageChange,
    updateStatus,
    currentStatus: searchParams.get("status") || "ALL",
    currentPage: parseInt(searchParams.get("page") || "1", 10),
    totalPages,
    handleFilterDate,
    handleErase,
    handleExportCSV,
    isExporting
  };
}
