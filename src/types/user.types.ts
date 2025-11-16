import type { PaginationMeta } from "./paginationMeta.types";

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

export interface AdminUserState {
  users: User[];
  selectedUser: User | null;
  isLoading: boolean;
  error: string | null;
  pagination: PaginationMeta;

  // Actions
  fetchAllUsers: (
    page?: number,
    limit?: number,
    search?: string,
    sort?: string
  ) => Promise<void>;
  fetchUserById: (id: number) => Promise<void>;
  updateUser: (id: number, data: Partial<User>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  clearError: () => void;
  clearSelectedUser: () => void;
}
