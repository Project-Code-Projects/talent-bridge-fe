import { AxiosError } from "axios";
import axiosInstance from "./api";
import type { Job } from "../types/job.types";

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

export const adminJobService = {
  // Fetch all jobs with pagination
  fetchAllJobs: async (page?: number, limit?: number) => {
    const response = await axiosInstance.get<{
      jobs: Job[];
      total: number;
      totalPages: number;
      currentPage: number;
    }>("/jobs", {
      params: { page, limit },
    });
    return response;
  },

  // Fetch job by ID
  fetchJobById: async (id: number) => {
    const response = await axiosInstance.get<Job>(`/jobs/${id}`);
    return response;
  },

  // Update job
  updateJob: async (id: number, data: Partial<Job>) => {
    const response = await axiosInstance.put(`/jobs/${id}`, data);
    return response;
  },

  // Delete job
  deleteJob: async (id: number) => {
    const response = await axiosInstance.delete(`/jobs/${id}`);
    return response;
  },

  handleAxiosError,
};
