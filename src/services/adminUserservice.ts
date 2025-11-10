import { AxiosError } from "axios";
import type { User } from "../types/user.types";
import axiosInstance from "./api";

export const handleAxiosError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    if (error.response) {
      return (
        error.response.data?.message ||
        error.response.statusText ||
        "An error occurred"
      );
    } else if (error.request) {
      return "No response from server. Please check your connection.";
    } else {
      return error.message || "Failed to make request";
    }
  }
  return "An unexpected error occurred";
};

export const adminUserService = {
  fetchAllUsers: (page?: number, limit?: number) =>
    axiosInstance.get<{
      users: User[];
      total: number;
      totalPages: number;
      currentPage: number;
    }>("/users", { params: { page, limit } }),

  fetchUserById: (id: number) => axiosInstance.get<User>(`/users/${id}`),

  updateUser: (id: number, data: Partial<User>) =>
    axiosInstance.put(`/users/${id}`, data),

  deleteUser: (id: number) => axiosInstance.delete(`/users/${id}`),
};
