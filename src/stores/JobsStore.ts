import { AxiosError } from "axios";
import { create } from "zustand";
import type { JobsState } from "../types/job.types";
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
      pagination: { total: 0, totalPages: 0, currentPage: 1, limit: 10 },

      // Fetch all jobs
      fetchJobs: async (page = 1, limit = 10) => {
        if (get().isLoading) return;
        set({ isLoading: true, error: null }, false, "jobs/fetch/start");
        try {
          const res = await JobService.getAllJobs(page, limit);
          console.log("JobsService response:", res);
          set(
            {
              jobs: res.jobs,
              pagination: {
                total: res.total,
                totalPages: res.totalPages,
                currentPage: res.currentPage,
                limit,
              },
              isLoading: false,
              error: null,
            },
            false,
            "jobs/fetch/success"
          );
        } catch (error) {
          set(
            { jobs: [], isLoading: false, error: handleServiceError(error) },
            false,
            "jobs/fetch/error"
          );
        }
      },

      // Fetch job by ID
      fetchJobById: async (id: number) => {
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
    }
  )
);

// Selectors
export const selectJobs = (state: JobsState) => state.jobs;
export const selectSelectedJob = (state: JobsState) => state.selectedJob;
export const selectIsLoading = (state: JobsState) => state.isLoading;
export const selectError = (state: JobsState) => state.error;
export const selectPagination = (state: JobsState) => state.pagination;

//selectors to get job by ID from cache/searching through the already-loaded jobs array in the Zustand store
export const selectJobById = (id: number) => (state: JobsState) =>
  state.jobs.find((job) => job.id === id);
