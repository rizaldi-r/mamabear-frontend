import { ApiResponse } from "@/types/api";
import { API_BASE_URL } from "@/lib/config";

export async function getHomeData() {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      next: { revalidate: 60 },
    });

    const response: ApiResponse = await res.json();

    // Check backend success flag
    if (!response.success) {
      throw new Error(response.message || "Gagal mengambil data produk");
    }

    return response.data;
  } catch (error: unknown) {
    // TODO: show readable error in page
    const errorMessage =
      error instanceof Error ? error.message : "Terjadi kesalahan sistem";
    console.error("[HomeService Error]:", errorMessage);
    throw new Error(errorMessage);
  }
}
