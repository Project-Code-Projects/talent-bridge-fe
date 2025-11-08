// stores/authStore.ts

import { create } from 'zustand';
import { authService } from '../services/authService';
import type { ApiError, AuthState } from '../types/auth.types';

export const useAuthStore = create<AuthState>(set => ({
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

      // After signup, automatically log them in
      const loginResponse = await authService.login(email, password);

      // Store token and user in localStorage
      localStorage.setItem('token', loginResponse.token);
      localStorage.setItem('user', JSON.stringify(loginResponse.user));

      set({
        user: loginResponse.user,
        token: loginResponse.token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      return loginResponse.user;
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage = apiError.response?.data?.message || 'Signup failed. Please try again.';
      set({
        error: errorMessage,
        isLoading: false
      });
      throw error;
    }
  },

  // Login action
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(email, password);

      // Store token and user in localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      return response.user;
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage = apiError.response?.data?.message || 'Login failed. Please try again.';
      set({
        error: errorMessage,
        isLoading: false
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
      error: null
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

    if (token && user) {
      set({
        user,
        token,
        isAuthenticated: true
      });
    }
  }
}));
