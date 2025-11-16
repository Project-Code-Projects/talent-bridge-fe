export interface Application {
  id: number;
  jobId: number;
  userId: number;
  status: string;
  appliedAt: Date | string;
  resumeUrl?: string | null;
  coverLetter?: string | null;
  metadata?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  User?: {
    id: number;
    name: string;
    email: string;
    roleId: number;
    Profile?: {
      fullName?: string;
      resumeUrl?: string;
    };
  };
  Job?: {
    id: number;
    title: string;
    company: string;
    location?: string;
  };
}

export interface ApplicationsResponse {
  applications: Application[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface UpdateApplicationStatusRequest {
  status: string;
}

export interface AdminApplicationState {
  applications: Application[];
  selectedApplication: Application | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
  fetchAllApplications: (
    page?: number,
    limit?: number,
    search?: string,
    filterBy?: string
  ) => Promise<void>;
  updateApplicationStatus: (id: number, status: string) => Promise<void>;
  clearError: () => void;
  clearSelectedApplication: () => void;
}

export const APPLICATION_STATUSES = [
  "pending",
  "reviewing",
  "accepted",
  "rejected",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];
