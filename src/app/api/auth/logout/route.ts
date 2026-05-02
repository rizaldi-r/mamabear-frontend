import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  // Clear the authentication cookie to log the user out
  cookies().delete("auth_token");

  return NextResponse.json({
    success: true,
    message: "Berhasil keluar dari akun.",
  });
}
