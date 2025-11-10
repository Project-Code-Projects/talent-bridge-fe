// stores/authStore.ts

import { create } from "zustand";
import { authService } from "../services/authService";
import type { ApiError, AuthState } from "../types/auth.types";
import { persist } from "zustand/middleware";
import { isTokenExpired } from "../utils/token";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Sign up action
      signup: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          await authService.signup(name, email, password);

          const loginResponse = await authService.login(email, password);

          localStorage.setItem("token", loginResponse.token);
          localStorage.setItem("user", JSON.stringify(loginResponse.user));

          set({
            user: loginResponse.user,
            token: loginResponse.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          return loginResponse.user;
        } catch (error) {
          const apiError = error as ApiError;
          const errorMessage =
            apiError.response?.data?.message ||
            "Signup failed. Please try again.";
          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      // Login action
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(email, password);

          localStorage.setItem("token", response.token);
          localStorage.setItem("user", JSON.stringify(response.user));

          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          return response.user;
        } catch (error) {
          const apiError = error as ApiError;
          const errorMessage =
            apiError.response?.data?.message ||
            "Login failed. Please try again.";
          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      // Logout action
      logout: () => {
        authService.logout();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },

      // Check auth status on app load
      checkAuth: () => {
        const token = authService.getToken();
        const user = authService.getUser();

        if (!token || !user || isTokenExpired(token)) {
          authService.logout();
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
          });
          return;
        }

        set({
          user,
          token,
          isAuthenticated: true,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
