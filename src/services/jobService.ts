import type { Job, JobsResponse } from "../types/job.types";
import axiosInstance from "./api";

export const JobService = {
  // Fetch all jobs
  getAllJobs: async (page = 1, limit = 10): Promise<JobsResponse> => {
    const { data } = await axiosInstance.get<JobsResponse>("/jobs", {
      params: { page, limit },
    });
    return data;
  },

  // Fetch job by ID
  getJobById: async (id: number): Promise<Job> => {
    const { data } = await axiosInstance.get<Job>(`/jobs/${id}`);
    return data;
  },
};
