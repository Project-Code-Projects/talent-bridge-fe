export interface DashboardStats {
  totalJobs: number;
  totalUsers: number;
  totalApplications: number;
  applicationsByStatus: Record<string, number>; // dynamic statuses
}

export interface PieChartData {
  name: string;
  value: number;
  color: string;
  [key: string]: unknown;
}

export interface RecentApplicant {
  id: number;
  applicantName: string;
  jobTitle: string;
  currentStage: string; // dynamic statuses
  appliedDate: string;
}

export interface Application {
  id: number;
  userId: number;
  jobId: number;
  status: string; // dynamic statuses
  coverLetter?: string;
  resumeUrl?: string;
  appliedDate: string;
  updatedDate: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  job: {
    id: number;
    title: string;
    company: string;
  };
  comments?: ApplicationComment[];
}

export interface ApplicationComment {
  id: number;
  comment: string;
  createdAt: string;
  createdBy: string;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  salary?: string;
  status: "Active" | "Closed";
  createdAt: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  status?: string;
}
