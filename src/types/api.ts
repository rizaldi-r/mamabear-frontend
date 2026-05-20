/**
 * Global API Response Wrapper
 * Matches the backend contract: { success, statusCode, message, data, timestamp }
 */
export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

/**
 * User Profile Shape
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
  phone?: string;
}

/**
 * Authentication Data
 */
export interface AuthData {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export type LoginResponse = ApiResponse<AuthData>;
export type RegisterResponse = ApiResponse<{
  message: string;
  verificationToken: string;
}>;
