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
  // Fetch all jobs (admin view)
  fetchAllJobs: async (): Promise<Job[]> => {
    try {
      const response = await axiosInstance.get<Job[]>("/jobs");
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      console.error("Failed to fetch jobs:", error);
      throw new Error(errorMessage);
    }
  },

  // Fetch job by ID
  fetchJobById: async (id: number): Promise<Job> => {
    try {
      const response = await axiosInstance.get<Job>(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      console.error(`Failed to fetch job with ID ${id}:`, error);
      throw new Error(errorMessage);
    }
  },

  // Update job
  updateJob: async (id: number, data: Partial<Job>): Promise<Job> => {
    try {
      const response = await axiosInstance.put<{ updated: Job }>(
        `/jobs/${id}`,
        data
      );
      return response.data.updated;
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      console.error(`Failed to update job with ID ${id}:`, error);
      throw new Error(errorMessage);
    }
  },

  // Delete job
  deleteJob: async (id: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/jobs/${id}`);
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      console.error(`Failed to delete job with ID ${id}:`, error);
      throw new Error(errorMessage);
    }
  },
};
