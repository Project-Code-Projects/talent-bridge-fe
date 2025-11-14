import { create } from "zustand";
import type { PaginationMeta } from "../types/paginationMeta.types";
import type { User } from "../types/user.types";
import { devtools } from "zustand/middleware";
import {
  adminUserService,
  handleAxiosError,
} from "../services/adminUserservice";

interface AdminUserState {
  users: User[];
  selectedUser: User | null;
  isLoading: boolean;
  error: string | null;
  pagination: PaginationMeta;

  // Actions
  fetchAllUsers: (page?: number, limit?: number) => Promise<void>;
  fetchUserById: (id: number) => Promise<void>;
  updateUser: (id: number, data: Partial<User>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  clearError: () => void;
  clearSelectedUser: () => void;
}

export const useAdminUserStore = create<AdminUserState>()(
  devtools(
    (set, get) => ({
      users: [],
      selectedUser: null,
      isLoading: false,
      error: null,
      pagination: {
        total: 0,
        totalPages: 0,
        currentPage: 1,
        limit: 20,
      },

      fetchAllUsers: async (page = 1, limit = 20) => {
        if (get().isLoading) return;

        set(
          { isLoading: true, error: null },
          false,
          "adminUsers/fetchAll/start"
        );

        try {
          const response = await adminUserService.fetchAllUsers(page, limit);

          set(
            {
              users: response.data.users,
              pagination: {
                total: response.data.total,
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage,
                limit,
              },
              isLoading: false,
              error: null,
            },
            false,
            "adminUsers/fetchAll/success"
          );
        } catch (error) {
          const errorMessage = handleAxiosError(error);
          set(
            {
              users: [],
              isLoading: false,
              error: errorMessage,
            },
            false,
            "adminUsers/fetchAll/error"
          );
        }
      },

      fetchUserById: async (id: number) => {
        if (get().isLoading) return;

        set(
          { isLoading: true, error: null },
          false,
          "adminUsers/fetchById/start"
        );

        try {
          const response = await adminUserService.fetchUserById(id);

          set(
            {
              selectedUser: response.data,
              isLoading: false,
              error: null,
            },
            false,
            "adminUsers/fetchById/success"
          );
        } catch (error) {
          const errorMessage = handleAxiosError(error);
          set(
            {
              selectedUser: null,
              isLoading: false,
              error: errorMessage,
            },
            false,
            "adminUsers/fetchById/error"
          );
        }
      },

      updateUser: async (id: number, data: Partial<User>) => {
        if (get().isLoading) return;

        set({ isLoading: true, error: null }, false, "adminUsers/update/start");

        try {
          const response = (await adminUserService.updateUser(id, data)) as {
            data: { user: User };
          };

          const updatedUsers = get().users.map((user) =>
            user.id === id ? { ...user, ...data } : user
          );

          set(
            {
              users: updatedUsers,
              selectedUser: response.data.user || null,
              isLoading: false,
              error: null,
            },
            false,
            "adminUsers/update/success"
          );
        } catch (error) {
          const errorMessage = handleAxiosError(error);
          set(
            {
              isLoading: false,
              error: errorMessage,
            },
            false,
            "adminUsers/update/error"
          );
          throw error;
        }
      },

      deleteUser: async (id: number) => {
        if (get().isLoading) return;

        set({ isLoading: true, error: null }, false, "adminUsers/delete/start");

        try {
          await adminUserService.deleteUser(id);

          const filteredUsers = get().users.filter((user) => user.id !== id);

          set(
            {
              users: filteredUsers,
              pagination: {
                ...get().pagination,
                total: get().pagination.total - 1,
              },
              isLoading: false,
              error: null,
            },
            false,
            "adminUsers/delete/success"
          );
        } catch (error) {
          const errorMessage = handleAxiosError(error);
          set(
            {
              isLoading: false,
              error: errorMessage,
            },
            false,
            "adminUsers/delete/error"
          );
          throw error;
        }
      },

      clearError: () => {
        set({ error: null }, false, "adminUsers/clearError");
      },

      clearSelectedUser: () => {
        set({ selectedUser: null }, false, "adminUsers/clearSelectedUser");
      },
    }),
    {
      name: "AdminUserStore",
    }
  )
);
