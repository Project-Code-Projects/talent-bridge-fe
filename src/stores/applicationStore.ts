// src/stores/applicationStore.ts
import { create } from "zustand";
import type {
  TAdminApplicationResponse,
  TApplication,
  TApplicationCreateInput,
  TApplicationFilterBy,
  TApplicationStatus,
} from "../types/application.types";
import { ApplicationService } from "../services/applicationService";
import { devtools } from "zustand/middleware";

interface ApplicationState {
  //user
  myApplications: TApplication[];
  applyingJobs: Record<number, boolean>;
  isLoading: boolean;
  error: string | null;

  //admin
  adminApplications: TApplication[];
  adminPagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
  adminIsLoading: boolean;
  adminError: string | null;

  //user actions
  fetchMyApplications: () => Promise<void>;
  applyToJob: (data: TApplicationCreateInput) => Promise<TApplication | void>;
  setApplyingJob: (jobId: number, status: boolean) => void;
  clearError: () => void;

  //admin actions
  fetchAdminApplications: (
    page?: number,
    limit?: number,
    search?: string,
    filterBy?: TApplicationFilterBy
  ) => Promise<void>;
  updateApplicationStatus: (
    id: number,
    status: TApplicationStatus
  ) => Promise<void>;
}

export const useApplicationStore = create<ApplicationState>()(
  devtools(
    (set, get) => ({
      // Existing user-side state
      myApplications: [],
      applyingJobs: {},
      isLoading: false,
      error: null,

      // Admin-side state
      adminApplications: [],
      adminPagination: {
        total: 0,
        totalPages: 0,
        currentPage: 1,
        limit: 10,
      },
      adminIsLoading: false,
      adminError: null,

      // Existing user-side actions
      setApplyingJob: (jobId, status) => {
        set((state) => ({
          applyingJobs: { ...state.applyingJobs, [jobId]: status },
        }));
      },

      fetchMyApplications: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await ApplicationService.getMyApplications();
          set({ myApplications: res, isLoading: false });
        } catch (error) {
          const errorMessage = ApplicationService.getErrorMessage(error);
          set({
            error: errorMessage,
            isLoading: false,
          });
        }
      },

      applyToJob: async (data) => {
        get().setApplyingJob(data.jobId, true);
        set({ error: null });
        try {
          const application = await ApplicationService.apply(data);
          if (application) {
            set((state) => ({
              myApplications: [...state.myApplications, application],
            }));
          }
          return application;
        } catch (error) {
          const errorMessage = ApplicationService.getErrorMessage(error);

          set({
            error: errorMessage,
          });
        } finally {
          get().setApplyingJob(data.jobId, false);
        }
      },

      clearError: () => set({ error: null }),

      // Admin-side actions
      fetchAdminApplications: async (
        page = 1,
        limit = 10,
        search?: string,
        filterBy?: TApplicationFilterBy
      ) => {
        if (get().adminIsLoading) return;

        set({
          adminIsLoading: true,
          adminError: null,
        });

        try {
          const res: TAdminApplicationResponse =
            await ApplicationService.getAdminApplications(
              page,
              limit,
              search,
              filterBy
            );

          set({
            adminApplications: res.applications,
            adminPagination: {
              total: res.total,
              totalPages: res.totalPages,
              currentPage: res.currentPage,
              limit,
            },
            adminIsLoading: false,
            adminError: null,
          });
        } catch (error) {
          const errorMessage = ApplicationService.getErrorMessage(error);
          set({
            adminApplications: [],
            adminIsLoading: false,
            adminError: errorMessage,
          });
        }
      },

      updateApplicationStatus: async (
        id: number,
        status: TApplicationStatus
      ) => {
        const prevApplications = get().adminApplications;

        try {
          // Optimistic update
          set({
            adminApplications: prevApplications.map((app) =>
              app.id === id ? { ...app, status } : app
            ),
          });

          await ApplicationService.updateStatus(id, status);
        } catch (error) {
          const errorMessage = ApplicationService.getErrorMessage(error);
          // Rollback on error
          set({ adminApplications: prevApplications });
          throw new Error(errorMessage);
        }
      },
    }),
    {
      name: "ApplicationStore",
      enabled: import.meta.env.DEV,
    }
  )
);
