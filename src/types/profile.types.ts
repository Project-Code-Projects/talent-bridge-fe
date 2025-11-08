export interface TExperience {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
}

export interface TProfile {
  id: number;
  userId: number;
  fullName: string;
  phone?: string;
  address?: string;
  summary?: string;
  experiences: TExperience[];
  skills: string[];
  resumeUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TProfileCreateInput {
  fullName: string;
  phone?: string;
  address?: string;
  summary?: string;
  experiences?: TExperience[];
  skills?: string[];
  resumeUrl?: string;
}

export interface TProfileUpdateInput extends Partial<TProfileCreateInput> {}
