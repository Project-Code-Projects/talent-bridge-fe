import type { Job } from "./job.types";
import type { PaginationMeta } from "./paginationMeta.types";

export interface AdminJobState {
  jobs: Job[];
  selectedJob: Job | null;
  isLoading: boolean;
  error: string | null;
  pagination: PaginationMeta;

  // Actions
  fetchAllJobs: (
    page?: number,
    limit?: number,
    search?: string,
    sort?: "newest" | "oldest"
  ) => Promise<void>;
  fetchJobById: (id: number) => Promise<void>;
  updateJob: (id: number, data: Partial<Job>) => Promise<void>;
  deleteJob: (id: number) => Promise<void>;
  clearError: () => void;
  clearSelectedJob: () => void;
}
