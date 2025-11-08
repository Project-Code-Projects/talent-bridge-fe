import { AxiosError } from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axiosInstance from "../services/api";
import type { AdminJobState } from "../types/adminJob.types";
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

export const useAdminJobStore = create<AdminJobState>()(
  devtools(
    (set, get) => ({
      jobs: [],
      selectedJob: null,
      isLoading: false,
      error: null,

      // Fetch all jobs (admin view)
      fetchAllJobs: async () => {
        if (get().isLoading) return;

        set(
          { isLoading: true, error: null },
          false,
          "adminJobs/fetchAll/start"
        );

        try {
          const response = await axiosInstance.get<Job[]>("/jobs");

          set(
            {
              jobs: response.data,
              isLoading: false,
              error: null,
            },
            false,
            "adminJobs/fetchAll/success"
          );
        } catch (error) {
          const errorMessage = handleAxiosError(error);

          set(
            {
              jobs: [],
              isLoading: false,
              error: errorMessage,
            },
            false,
            "adminJobs/fetchAll/error"
          );

          console.error("Failed to fetch jobs:", error);
        }
      },

      // Fetch job by ID
      fetchJobById: async (id: number) => {
        if (get().isLoading) return;

        set(
          { isLoading: true, error: null },
          false,
          "adminJobs/fetchById/start"
        );

        try {
          const response = await axiosInstance.get<Job>(`/jobs/${id}`);

          set(
            {
              selectedJob: response.data,
              isLoading: false,
              error: null,
            },
            false,
            "adminJobs/fetchById/success"
          );
        } catch (error) {
          const errorMessage = handleAxiosError(error);

          set(
            {
              selectedJob: null,
              isLoading: false,
              error: errorMessage,
            },
            false,
            "adminJobs/fetchById/error"
          );

          console.error(`Failed to fetch job with ID ${id}:`, error);
        }
      },

      // Update job
      updateJob: async (id: number, data: Partial<Job>) => {
        if (get().isLoading) return;

        set({ isLoading: true, error: null }, false, "adminJobs/update/start");

        try {
          const response = await axiosInstance.put(`/jobs/${id}`, data);

          // Update the job in the list
          const updatedJobs = get().jobs.map((job) =>
            job.id === id ? { ...job, ...data } : job
          );

          set(
            {
              jobs: updatedJobs,
              selectedJob: response.data.updated || null,
              isLoading: false,
              error: null,
            },
            false,
            "adminJobs/update/success"
          );
        } catch (error) {
          const errorMessage = handleAxiosError(error);

          set(
            {
              isLoading: false,
              error: errorMessage,
            },
            false,
            "adminJobs/update/error"
          );

          console.error(`Failed to update job with ID ${id}:`, error);
          throw error;
        }
      },

      // Delete job
      deleteJob: async (id: number) => {
        if (get().isLoading) return;

        set({ isLoading: true, error: null }, false, "adminJobs/delete/start");

        try {
          await axiosInstance.delete(`/jobs/${id}`);

          // Remove the job from the list
          const filteredJobs = get().jobs.filter((job) => job.id !== id);

          set(
            {
              jobs: filteredJobs,
              isLoading: false,
              error: null,
            },
            false,
            "adminJobs/delete/success"
          );
        } catch (error) {
          const errorMessage = handleAxiosError(error);

          set(
            {
              isLoading: false,
              error: errorMessage,
            },
            false,
            "adminJobs/delete/error"
          );

          console.error(`Failed to delete job with ID ${id}:`, error);
          throw error;
        }
      },

      // Clear error state
      clearError: () => {
        set({ error: null }, false, "adminJobs/clearError");
      },

      // Clear selected job
      clearSelectedJob: () => {
        set({ selectedJob: null }, false, "adminJobs/clearSelectedJob");
      },
    }),
    {
      name: "AdminJobStore",
      enabled: import.meta.env.DEV,
    }
  )
);
