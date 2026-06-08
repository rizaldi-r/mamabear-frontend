import { ApiResponse } from "@/types/api";

export async function fetchUserOrders(status?: string): Promise<ApiResponse> {
    const query = status && status !== "SEMUA" ? `?status=${status}` : "";
    
    // Menggunakan path relatif untuk Route Handlers internal
    const res = await fetch(`/api/orders${query}`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error("Gagal mengambil data pesanan dari server");
    }

    const result: ApiResponse = await res.json();
    return result;
}
