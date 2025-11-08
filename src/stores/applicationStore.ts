// src/stores/applicationStore.ts
import { create } from "zustand";
import type {
  TApplication,
  TApplicationCreateInput,
} from "../types/application.types";
import { ApplicationService } from "../services/applicationService";

interface ApplicationState {
  myApplications: TApplication[];
  applyingJobs: Record<number, boolean>;
  isLoading: boolean;
  error: string | null;

  fetchMyApplications: () => Promise<void>;
  applyToJob: (data: TApplicationCreateInput) => Promise<TApplication | void>;
  setApplyingJob: (jobId: number, status: boolean) => void;
  clearError: () => void;
}

export const useApplicationStore = create<ApplicationState>((set, get) => ({
  myApplications: [],
  applyingJobs: {},
  isLoading: false,
  error: null,

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
    } catch (err: any) {
      set({
        error:
          err?.response?.data?.message ||
          err.message ||
          "Failed to fetch applications",
        isLoading: false,
      });
    }
  },

  applyToJob: async (data) => {
    // set applying flag
    get().setApplyingJob(data.jobId, true);
    set({ error: null });
    try {
      // use service which returns the saved application (backend returns application with job included)
      const application = await ApplicationService.apply(data);
      if (application) {
        set((state) => ({
          myApplications: [...state.myApplications, application],
        }));
      }
      return application;
    } catch (err: any) {
      set({
        error:
          err?.response?.data?.message || err.message || "Application failed",
      });
    } finally {
      get().setApplyingJob(data.jobId, false);
    }
  },

  clearError: () => set({ error: null }),
}));
