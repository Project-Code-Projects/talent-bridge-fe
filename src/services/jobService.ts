import type { Job } from "../types/job.types";
import axiosInstance from "./api";

export const JobService = {
  // Fetch all jobs
  getAllJobs: async (): Promise<Job[]> => {
    const response = await axiosInstance.get<Job[]>("/jobs");
    return response.data;
  },

  // Fetch job by ID
  getJobById: async (id: number): Promise<Job> => {
    const response = await axiosInstance.get<Job>(`/jobs/${id}`);
    return response.data;
  },
};
