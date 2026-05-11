import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  return NextResponse.json({
    success: true,
    data: {
      orderId: params.id,
      invoiceUrl: `https://api.mamabear.co.id/storage/invoices/INV-${params.id}.pdf`,
      generatedAt: new Date().toISOString(),
    },
  });
}
