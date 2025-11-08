// types/auth.types.ts

export interface User {
  id: number;
  name: string;
  email: string;
  roleId: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  roleId?: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface SignupResponse {
  message: string;
  user: User;
}

export interface AuthError {
  message: string;
}

export interface ApiError {
  response?: {
    data?: AuthError; // Use your existing AuthError here
    status?: number;
    // ... potentially other properties like headers
  };
  // Fallback for network errors (error.message)
  message?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signup: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  checkAuth: () => void;
}
