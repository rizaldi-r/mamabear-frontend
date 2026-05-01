// Use a generic <T> so you can pass in specific data shapes (like User, or Product[])
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  error_code?: number; // Optional, because success responses won't have it
  data: T;
}

// Example of how you will use this later for Auth:
export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

// Type for the login response specifically:
export type LoginResponse = ApiResponse<User>;
