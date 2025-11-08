// services/authService.ts

// import api from './api';
import type {
  SignupRequest,
  LoginRequest,
  AuthResponse,
  SignupResponse,
} from "../types/auth.types";
import axiosInstance from "./axiosInstance";

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

    const response = await axiosInstance.post<SignupResponse>(
      "/auth/register",
      payload
    );
    return response.data;
  },

  // Login existing user
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const payload: LoginRequest = {
      email,
      password,
    };

    const response = await axiosInstance.post<AuthResponse>(
      "/auth/login",
      payload
    );
    return response.data;
  },

  // Logout (client-side only)
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("token");
  },

  // Get stored token
  getToken: (): string | null => {
    return localStorage.getItem("token");
  },

  // Get stored user
  getUser: () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },
};
