import { AxiosError } from "axios";
import axiosInstance from "./api";
import type {
  Application,
  ApplicationsResponse,
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
  fetchAllApplications: async (page?: number, limit?: number) => {
    const response = await axiosInstance.get<ApplicationsResponse>(
      "/applications",
      {
        params: { page, limit },
      }
    );
    return response;
  },

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
