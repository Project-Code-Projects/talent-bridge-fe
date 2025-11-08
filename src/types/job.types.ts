export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  employmentType: string;
  salaryRange: string;
  shortDescription: string;
  responsibilities: string;
  requirements: string;
  benefits: string;
  deadline: string;
  statusOptions: string[];
  hiringStatus: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface JobsState {
  jobs: Job[];
  selectedJob: Job | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchJobs: () => Promise<void>;
  fetchJobById: (id: string) => Promise<void>;
  clearError: () => void;
  clearSelectedJob: () => void;
}

//for later use
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}
