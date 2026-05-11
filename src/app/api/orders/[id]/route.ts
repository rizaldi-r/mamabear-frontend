import { NextResponse } from "next/server";
import { MOCK_ORDERS } from "../route";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const order = MOCK_ORDERS.find((o) => o.id === params.id);

  if (!order) {
    return NextResponse.json(
      { success: false, message: "Pesanan tidak ditemukan" },
      { status: 404 },
    );
  }

  return NextResponse.json({
    success: true,
    data: order,
  });
}
