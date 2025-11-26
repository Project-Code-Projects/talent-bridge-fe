// src/types/application.types.ts

export type TApplicationStatus =
  | "pending"
  | "reviewing"
  | "accepted"
  | "rejected";

export interface TApplicationUser {
  id: number;
  name: string;
  email: string;
}

export interface TJobBrief {
  id: string | number;
  title: string;
  company?: string;
  location?: string;
  salaryRange?: string;
}

export interface TApplication {
  id: number;
  jobId: number;
  userId: number;
  status: TApplicationStatus;
  appliedAt: string;
  resumeUrl?: string;
  coverLetter?: string;
  metadata?: string;
  user?: TApplicationUser;
  job?: TJobBrief;
}

export interface TApplicationCreateInput {
  jobId: number;
  userId: number;
  resumeUrl?: string;
  coverLetter?: string;
  metadata?: string;
}

export interface TApplicationStatusUpdateInput {
  status: string;
}

export interface TAdminApplicationResponse {
  applications: TApplication[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export type TApplicationFilterBy = "users" | "company" | "job";
