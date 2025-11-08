// src/types/application.types.ts
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
  status: string;
  appliedAt: string;
  resumeUrl?: string;
  coverLetter?: string;
  metadata?: string;
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
