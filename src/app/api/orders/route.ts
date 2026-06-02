import { NextResponse } from 'next/server';

/**
 * MOCK DB: Orders List
 * We use 'let' and 'export' so other routes can modify this array in memory.
 */
export const MOCK_ORDERS = [
  {
    id: "MB-20260510-001",
    date: "10 Mei 2026, 14:20",
    status: "DIKIRIM",
    totalAmount: 145073,
    itemsCount: 2,
    image: "https://raw.githubusercontent.com/regencode/mamabear-backend/main/assets/images/AsiBooster/AsiBooster-01.jpg",
    paymentMethod: "BCA Virtual Account",
    shipping: {
      courier: "J&T Express",
      trackingNumber: "JT1234567890",
      receiver: "Mama Bear",
      address: "Jl. Melati No. 123, Wonokromo, Surabaya, Jawa Timur, 60243",
      estimate: "12 Mei 2026"
    }
  },
  {
    id: "MB-20260508-099",
    date: "08 Mei 2026, 09:00",
    status: "SELESAI",
    totalAmount: 65073,
    itemsCount: 1,
    image: "https://raw.githubusercontent.com/regencode/mamabear-backend/main/assets/images/AsiBooster/AsiBooster-01.jpg",
    paymentMethod: "GoPay",
    shipping: {
      courier: "J&T Express",
      trackingNumber: "JT1234567890",
      receiver: "Mama Bear",
      address: "Jl. Melati No. 123, Wonokromo, Surabaya, Jawa Timur, 60243",
      estimate: "12 Mei 2026"
    }
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const status = searchParams.get('status');

  let filtered = [...MOCK_ORDERS];
  if (status && status !== 'SEMUA') {
    filtered = MOCK_ORDERS.filter(o => o.status === status);
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const data = filtered.slice(startIndex, endIndex);

  return NextResponse.json({
    success: true,
    data: data,
    pagination: {
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit)
    }
  });
}
