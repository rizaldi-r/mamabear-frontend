// Use a generic <T> to pass in specific data shapes (like User, or Product[])
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  error_code?: number;
  data: T;
}

export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

// Type for the login response specifically:
export type LoginResponse = ApiResponse<User>;
