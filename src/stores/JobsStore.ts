import { AxiosError } from "axios";
import { create } from "zustand";
import type { Job, JobsState } from "./types";
import axiosInstance from "../services/axiosInstance";
import { devtools } from "zustand/middleware";

const handleAxiosError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    if (error.response) {
      // Server responded with error
      return (
        error.response.data?.message ||
        error.response.statusText ||
        "An error occurred"
      );
    } else if (error.request) {
      // Request made but no response
      return "No response from server. Please check your connection.";
    } else {
      // Error in request setup
      return error.message || "Failed to make request";
    }
  }
  return "An unexpected error occurred";
};

export const useJobStore = create<JobsState>()(
  devtools(
    (set, get) => ({
      jobs: [],
      selectedJob: null,
      isLoading: false,
      error: null,

      // Fetch all jobs (public access)
      fetchJobs: async () => {
        // Prevent multiple simultaneous requests
        if (get().isLoading) return;

        set({ isLoading: true, error: null }, false, "jobs/fetchJobs/start");

        try {
          const response = await axiosInstance.get<Job[]>("/jobs");

          set(
            {
              jobs: response.data,
              isLoading: false,
              error: null,
            },
            false,
            "jobs/fetchJobs/success"
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
            "jobs/fetchJobs/error"
          );

          console.error("Failed to fetch jobs:", error);
        }
      },

      // Fetch job by ID (public access)
      fetchJobById: async (id: string) => {
        // Prevent multiple simultaneous requests
        if (get().isLoading) return;

        set({ isLoading: true, error: null }, false, "jobs/fetchJobById/start");

        try {
          const response = await axiosInstance.get<Job>(`/jobs/${id}`);

          set(
            {
              selectedJob: response.data,
              isLoading: false,
              error: null,
            },
            false,
            "jobs/fetchJobById/success"
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
            "jobs/fetchJobById/error"
          );

          console.error(`Failed to fetch job with ID ${id}:`, error);
        }
      },

      // Clear error state
      clearError: () => {
        set({ error: null }, false, "jobs/clearError");
      },

      // Clear selected job
      clearSelectedJob: () => {
        set({ selectedJob: null }, false, "jobs/clearSelectedJob");
      },
    }),
    {
      name: "JobStore", // Name for Redux DevTools
      enabled: import.meta.env.DEV, // Only enable in development
    }
  )
);

//selectors
export const selectJobs = (state: JobsState) => state.jobs;
export const selectSelectedJob = (state: JobsState) => state.selectedJob;
export const selectIsLoading = (state: JobsState) => state.isLoading;
export const selectError = (state: JobsState) => state.error;

//selectors to get job by ID from cache/searching through the already-loaded jobs array in the Zustand store
export const selectJobById = (id: string) => (state: JobsState) =>
  state.jobs.find((job) => job.id === id);
