import { useAuthStore } from "../stores/authStore";
import type {
  SignupRequest,
  LoginRequest,
  AuthResponse,
  SignupResponse,
} from "../types/auth.types";
import api from "./api";

function getJwtExpMs(token: string | null): number | null {
  if (!token) return null;
  try {
    const [, payload] = token.split(".");
    const { exp } = JSON.parse(atob(payload));
    return typeof exp === "number" ? exp * 1000 : null;
  } catch {
    return null;
  }
}

function isTokenExpired(token: string | null): boolean {
  const expMs = getJwtExpMs(token);
  return !expMs || Date.now() >= expMs;
}

// --- Axios interceptor for global 401 handling ---
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      // Force logout on token expiration or invalid token
      const { logout } = useAuthStore.getState();
      logout();
      window.location.href = "/auth"; // Redirect to auth page
    }
    return Promise.reject(error);
  }
);

// --- Auth Service ---
export const authService = {
  // Register new user
  signup: async (
    name: string,
    email: string,
    password: string
  ): Promise<SignupResponse> => {
    const payload: SignupRequest = {
      name,
      email,
      password,
      roleId: 2, // Default client role
    };

    const response = await api.post<SignupResponse>("/auth/register", payload);
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const payload: LoginRequest = { email, password };
    const response = await api.post<AuthResponse>("/auth/login", payload);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      authService.logout();
      return false;
    }
    return true;
  },

  getToken: (): string | null => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      authService.logout();
      return null;
    }
    return token;
  },

  getUser: () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },
};
