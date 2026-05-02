import { NextResponse } from "next/server";
import MOCK_DATA from "@/data/mock.json";

export async function POST(request: Request) {
  const body = await request.json();

  // Simulate checking if user already exists in our mock database
  const userExists = MOCK_DATA.users.some((u) => u.email === body.email);

  if (userExists) {
    return NextResponse.json(
      {
        success: false,
        message: "Email sudah terdaftar. Silakan gunakan email lain.",
      },
      { status: 400 },
    );
  }

  return NextResponse.json({
    success: true,
    message: "Registration successful",
    data: {
      id: Math.random().toString(36).substring(7),
      ...body,
    },
  });
}
