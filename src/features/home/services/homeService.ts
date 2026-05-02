import { ApiResponse } from "@/types/api";
import { API_BASE_URL } from "@/lib/config";

export async function getHomeData() {
  const res = await fetch(`${API_BASE_URL}/home`, {
    cache: "no-store",
  });

  const response: ApiResponse = await res.json();

  if (!response.success) {
    throw new Error(response.message);
  }

  return response.data;
}
