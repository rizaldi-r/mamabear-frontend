import { NextResponse } from "next/server";
import { MOCK_ORDERS } from "../../route";

/**
 * POST /api/orders/:id/cancel
 * Logic: Updates the status of the order in the shared MOCK_ORDERS array.
 */
export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const orderIndex = MOCK_ORDERS.findIndex((o) => o.id === params.id);

  if (orderIndex === -1) {
    return NextResponse.json(
      { success: false, message: "Pesanan tidak ditemukan" },
      { status: 404 },
    );
  }

  // Update the status in memory
  MOCK_ORDERS[orderIndex].status = "DIBATALKAN";

  return NextResponse.json({
    success: true,
    message: "Pesanan berhasil dibatalkan",
    data: MOCK_ORDERS[orderIndex],
  });
}
