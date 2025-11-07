import type { Job } from "../stores/job.types";
import axiosInstance from "./axiosInstance";

export const JobService = {
  // Fetch all jobs
  getAllJobs: async (): Promise<Job[]> => {
    const response = await axiosInstance.get<Job[]>("/jobs");
    return response.data;
  },

  // Fetch job by ID
  getJobById: async (id: string): Promise<Job> => {
    const response = await axiosInstance.get<Job>(`/jobs/${id}`);
    return response.data;
  },
};
