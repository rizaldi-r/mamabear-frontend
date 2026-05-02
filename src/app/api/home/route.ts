import { NextResponse } from "next/server";
import MOCK_DATA from "@/data/mock.json";

export async function GET() {
  // Simulate network latency (500ms)
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({
    success: true,
    message: "Homepage data retrieved successfully",
    data: MOCK_DATA.homepage,
  });
}
