import { AxiosError } from "axios";
import { create } from "zustand";
import type { JobsState } from "./types";
import { devtools } from "zustand/middleware";
import { JobService } from "../services/jobService";

const handleServiceError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return error.message;
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

      // Fetch all jobs
      fetchJobs: async () => {
        if (get().isLoading) return;

        set({ isLoading: true, error: null }, false, "jobs/fetchJobs/start");

        try {
          const jobs = await JobService.getAllJobs();
          set(
            { jobs, isLoading: false, error: null },
            false,
            "jobs/fetchJobs/success"
          );
        } catch (error) {
          const errorMessage = handleServiceError(error);
          set(
            { jobs: [], isLoading: false, error: errorMessage },
            false,
            "jobs/fetchJobs/error"
          );
        }
      },

      // Fetch job by ID
      fetchJobById: async (id: string) => {
        if (get().isLoading) return;

        set({ isLoading: true, error: null }, false, "jobs/fetchJobById/start");

        try {
          const selectedJob = await JobService.getJobById(id);
          set(
            { selectedJob, isLoading: false, error: null },
            false,
            "jobs/fetchJobById/success"
          );
        } catch (error) {
          const errorMessage = handleServiceError(error);
          set(
            { selectedJob: null, isLoading: false, error: errorMessage },
            false,
            "jobs/fetchJobById/error"
          );
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
      name: "JobStore",
      enabled: import.meta.env.DEV,
    }
  )
);

// Selectors (keep these the same)
export const selectJobs = (state: JobsState) => state.jobs;
export const selectSelectedJob = (state: JobsState) => state.selectedJob;
export const selectIsLoading = (state: JobsState) => state.isLoading;
export const selectError = (state: JobsState) => state.error;

//selectors to get job by ID from cache/searching through the already-loaded jobs array in the Zustand store
export const selectJobById = (id: string) => (state: JobsState) =>
  state.jobs.find((job) => job.id === id);
