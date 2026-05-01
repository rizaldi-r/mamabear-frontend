import MOCK_DATA from "@/data/mock.json";
import { ApiResponse } from "@/types/api";

// Utility to simulate network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getHomeData() {
  // 1. Simulate network delay (remove this when using real API)
  await delay(800);

  /**
   * 2. DATA FETCHING LOGIC
   * * * REAL API PATTERN (Native Fetch):
   * const res = await fetch('https://api.mamabear.co.id/v1/home', { 
   * next: { revalidate: 3600 } // Cache for 1 hour
   * });
   * const response: ApiResponse = await res.json();
   * * * CURRENT MOCK PATTERN:
   */
  const response = MOCK_DATA as ApiResponse;

  // 3. ENVELOPE VALIDATION
  // We check the 'success' flag from your ApiResponse structure
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch homepage data");
  }

  // 4. DATA EXTRACTION
  // We return only the 'data' payload so components stay "dumb"
  return response.data;
}