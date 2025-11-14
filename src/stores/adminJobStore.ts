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
      pagination: {
        total: 0,
        totalPages: 0,
        currentPage: 1,
        limit: 10,
      },

      // fetch jobs with pagination here
      fetchAllJobs: async (page = 1, limit = 10) => {
        if (get().isLoading) return;

        set(
          { isLoading: true, error: null },
          false,
          "adminJobs/fetchAll/start"
        );

        try {
          const response = await adminJobService.fetchAllJobs(page, limit);

          set(
            {
              jobs: response.data.jobs,
              pagination: {
                total: response.data.total,
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage,
                limit,
              },
              isLoading: false,
              error: null,
            },
            false,
            "adminJobs/fetchAll/success"
          );
        } catch (error) {
          const errorMessage = adminJobService.handleAxiosError(error);

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
          const response = await adminJobService.fetchJobById(id);

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
          const errorMessage = adminJobService.handleAxiosError(error);

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
          const response = await adminJobService.updateJob(id, data);

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
          const errorMessage = adminJobService.handleAxiosError(error);

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
          await adminJobService.deleteJob(id);

          // Remove the job from the list
          const filteredJobs = get().jobs.filter((job) => job.id !== id);

          set(
            {
              jobs: filteredJobs,
              pagination: {
                ...get().pagination,
                total: get().pagination.total - 1,
              },
              isLoading: false,
              error: null,
            },
            false,
            "adminJobs/delete/success"
          );
        } catch (error) {
          const errorMessage = adminJobService.handleAxiosError(error);

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

      clearError: () => {
        set({ error: null }, false, "adminJobs/clearError");
      },

      clearSelectedJob: () => {
        set({ selectedJob: null }, false, "adminJobs/clearSelectedJob");
      },
    }),
    {
      name: "AdminJobStore",
    }
  )
);
