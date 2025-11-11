import axiosInstance from "./api";

import type {
  DashboardStats,
  RecentApplicant,
  Application,
  Job,
  PaginationParams,
} from "../types/admin.types";
import type { User } from "../types/user.types";

export const adminService = {
  // Dashboard Stats
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await axiosInstance.get<DashboardStats>("/admin/stats");
    return response.data;
  },

  // Recent Applicants
  getRecentApplicants: async (limit = 10): Promise<RecentApplicant[]> => {
    const response = await axiosInstance.get<RecentApplicant[]>(
      "/admin/applications/recent",
      {
        params: { limit },
      }
    );
    return response.data;
  },

  // Applications Management
  getApplications: async (
    params: PaginationParams
  ): Promise<{ applications: Application[]; total: number }> => {
    const response = await axiosInstance.get("/admin/applications", { params });
    return response.data;
  },

  getApplicationById: async (id: number): Promise<Application> => {
    const response = await axiosInstance.get<Application>(
      `/admin/applications/${id}`
    );
    return response.data;
  },

  updateApplicationStatus: async (
    id: number,
    status: string,
    comment?: string
  ): Promise<Application> => {
    const response = await axiosInstance.patch<Application>(
      `/admin/applications/${id}/status`,
      {
        status,
        comment,
      }
    );
    return response.data;
  },

  deleteApplication: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/admin/applications/${id}`);
  },

  // Jobs Management (Placeholder for future)
  getJobs: async (
    params: PaginationParams
  ): Promise<{ jobs: Job[]; total: number }> => {
    const response = await axiosInstance.get("/admin/jobs", { params });
    return response.data;
  },

  getJobById: async (id: number): Promise<Job> => {
    const response = await axiosInstance.get<Job>(`/admin/jobs/${id}`);
    return response.data;
  },

  createJob: async (jobData: Partial<Job>): Promise<Job> => {
    const response = await axiosInstance.post<Job>("/admin/jobs", jobData);
    return response.data;
  },

  updateJob: async (id: number, jobData: Partial<Job>): Promise<Job> => {
    const response = await axiosInstance.put<Job>(`/admin/jobs/${id}`, jobData);
    return response.data;
  },

  deleteJob: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/admin/jobs/${id}`);
  },

  // Users Management (Placeholder for future)
  getUsers: async (
    params: PaginationParams
  ): Promise<{ users: User[]; total: number }> => {
    const response = await axiosInstance.get("/admin/users", { params });
    return response.data;
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await axiosInstance.get<User>(`/admin/users/${id}`);
    return response.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/admin/users/${id}`);
  },
};
