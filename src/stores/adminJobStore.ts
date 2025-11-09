import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { AdminJobState } from "../types/adminJob.types";
import type { Job } from "../types/job.types";
import { adminJobService } from "../services/adminJobService";

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
          const jobs = await adminJobService.fetchAllJobs();

          set(
            {
              jobs,
              isLoading: false,
              error: null,
            },
            false,
            "adminJobs/fetchAll/success"
          );
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An unexpected error occurred";

          set(
            {
              jobs: [],
              isLoading: false,
              error: errorMessage,
            },
            false,
            "adminJobs/fetchAll/error"
          );
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
          const selectedJob = await adminJobService.fetchJobById(id);

          set(
            {
              selectedJob,
              isLoading: false,
              error: null,
            },
            false,
            "adminJobs/fetchById/success"
          );
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An unexpected error occurred";

          set(
            {
              selectedJob: null,
              isLoading: false,
              error: errorMessage,
            },
            false,
            "adminJobs/fetchById/error"
          );
        }
      },

      // Update job
      updateJob: async (id: number, data: Partial<Job>) => {
        if (get().isLoading) return;

        set({ isLoading: true, error: null }, false, "adminJobs/update/start");

        try {
          const updatedJob = await adminJobService.updateJob(id, data);

          // Update the job in the list
          const updatedJobs = get().jobs.map((job) =>
            job.id === id ? { ...job, ...data } : job
          );

          set(
            {
              jobs: updatedJobs,
              selectedJob: updatedJob,
              isLoading: false,
              error: null,
            },
            false,
            "adminJobs/update/success"
          );
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An unexpected error occurred";

          set(
            {
              isLoading: false,
              error: errorMessage,
            },
            false,
            "adminJobs/update/error"
          );
          throw error;
        }
      },

      // Delete job
      deleteJob: async (id: number) => {
        if (get().isLoading) return;

        set({ isLoading: true, error: null }, false, "adminJobs/delete/start");

        try {
          await adminJobService.deleteJob(id);

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
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An unexpected error occurred";

          set(
            {
              isLoading: false,
              error: errorMessage,
            },
            false,
            "adminJobs/delete/error"
          );
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
