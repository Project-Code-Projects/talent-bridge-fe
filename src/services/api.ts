import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";
// change base api port for backend accordingly

import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { useAuthStore } from "../stores/authStore";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
function getJwtExpMs(token: string | null): number | null {
  if (!token) return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    const exp = payload?.exp;
    return typeof exp === "number" ? exp * 1000 : null;
  } catch {
    return null;
  }
}

function isTokenExpired(token: string | null): boolean {
  const expMs = getJwtExpMs(token);
  return !expMs || Date.now() >= expMs;
}

// Prevent multiple redirects stacking up
let didRedirectToAuth = false;
function redirectToAuthOnce() {
  if (didRedirectToAuth) return;
  didRedirectToAuth = true;
  // hard redirect so all state/UI is reset
  window.location.href = "/auth";
}

// ===== Request interceptor =====
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");

    // If there is a token but it's expired, logout and stop the request
    if (token && isTokenExpired(token)) {
      // Clear Zustand + storage
      try {
        useAuthStore.getState().logout();
      } catch {
        // fallback clear just in case
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      redirectToAuthOnce();
      // Cancel the request so callers don't see a network error
      return Promise.reject(
        new axios.Cancel("Token expired; request cancelled.")
      );
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Debug log
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error: AxiosError) => {
    console.error("[API Request Error]", error);
    return Promise.reject(error);
  }
);

// ===== Response interceptor =====
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(
      `[API Response] ${response.config.method?.toUpperCase()} ${
        response.config.url
      } - Status: ${response.status}`
    );
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      console.error(`[API Error] ${status}:`, error.response.data);

      switch (status) {
        case 401: {
          // Token invalid/expired on the server side -> force logout
          try {
            useAuthStore.getState().logout();
          } catch {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
          redirectToAuthOnce();
          break;
        }
        case 403:
          console.error("Forbidden access");
          break;
        case 404:
          console.error("Resource not found");
          break;
        case 500:
          console.error("Internal server error");
          break;
        default:
          console.error("An error occurred");
      }
    } else if (error.request) {
      console.error("[API Error] No response received:", error.request);
    } else {
      console.error("[API Error] Request setup error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
