import { NextResponse } from "next/server";
import MOCK_DATA from "@/data/mock.json";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Find user in mock database
  const user = MOCK_DATA.users.find(
    (u) => u.email === email && u.password === password,
  );

  if (user) {
    return NextResponse.json({
      success: true,
      message: "Login Berhasil",
      data: user.profile,
    });
  }

  // Return error for any other credentials
  return NextResponse.json(
    {
      success: false,
      message:
        "Email atau kata sandi salah. Gunakan mama@mamabear.co.id / password123",
    },
    { status: 401 },
  );
}
