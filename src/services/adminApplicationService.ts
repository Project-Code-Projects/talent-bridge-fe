import { AxiosError } from "axios";
import axiosInstance from "./api";
import type {
  Application,
  UpdateApplicationStatusRequest,
} from "../types/adminApplication.types";

const handleAxiosError = (error: unknown): string => {
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

export const adminApplicationService = {
  fetchAllApplications: (
    page?: number,
    limit?: number,
    search?: string,
    sort?: string
  ) =>
    axiosInstance.get<{
      applications: Application[];
      total: number;
      totalPages: number;
      currentPage: number;
    }>("/applications", {
      params: { page, limit, search, sort },
    }),

  //update application
  updateApplicationStatus: async (id: number, status: string) => {
    const data: UpdateApplicationStatusRequest = { status };
    const response = await axiosInstance.put<{
      message: string;
      updated: Application;
    }>(`/applications/${id}`, data);
    return response;
  },

  handleAxiosError,
};
