import { LoginPayload, RegisterPayload } from "@/features/auth/types/auth";
import {API_BASE_URL} from "@/lib/config";
import { ApiResponse, LoginResponse } from "@/types/api";

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const response = await res.json();

  // If the HTTP status is not 2xx, OR if your custom success flag is false
  if (!res.ok || !response.success) {
    throw new Error(response.message || "Terjadi kesalahan saat login.");
  }

  return response;
}

/**
 * Registers a new user account.
 */
export async function registerUser(
  payload: RegisterPayload,
): Promise<ApiResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const response = await res.json();

  if (!res.ok || !response.success) {
    throw new Error(response.message || "Gagal mendaftarkan akun.");
  }

  return response;
}

/**
 * Sends a password reset email.
 */
export async function requestPasswordReset(
  email: string,
): Promise<ApiResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const response = await res.json();

  if (!res.ok || !response.success) {
    throw new Error(response.message || "Gagal mengirim tautan reset.");
  }

  return response;
}
