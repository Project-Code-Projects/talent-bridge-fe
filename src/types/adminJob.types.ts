import type { Job } from "./job.types";

export interface AdminJobState {
  jobs: Job[];
  selectedJob: Job | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchAllJobs: () => Promise<void>;
  fetchJobById: (id: number) => Promise<void>;
  updateJob: (id: number, data: Partial<Job>) => Promise<void>;
  deleteJob: (id: number) => Promise<void>;
  clearError: () => void;
  clearSelectedJob: () => void;
}
