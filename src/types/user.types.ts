export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
}

export interface Profile {
  id: number;
  userId: number;
  fullName: string;
  phone?: string;
  address?: string;
  summary?: string;
  experiences: Experience[];
  skills: string[];
  resumeUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  roleId: number;
  createdAt: string;
  updatedAt?: string;
  Profile?: Profile;
}
