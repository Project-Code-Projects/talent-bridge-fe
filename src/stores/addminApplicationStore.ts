import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { adminApplicationService } from "../services/adminApplicationService";
import type { AdminApplicationState } from "../types/adminApplication.types";

export const useAdminApplicationStore = create<AdminApplicationState>()(
  devtools(
    (set, get) => ({
      applications: [],
      selectedApplication: null,
      isLoading: false,
      error: null,
      pagination: {
        total: 0,
        totalPages: 0,
        currentPage: 1,
        limit: 10,
      },

      fetchAllApplications: async (
        page = 1,
        limit = 10,
        search?: string,
        sort?: string
      ) => {
        if (get().isLoading) return;

        set(
          { isLoading: true, error: null },
          false,
          "adminApplications/fetchAll/start"
        );

        try {
          const response = await adminApplicationService.fetchAllApplications(
            page,
            limit,
            search,
            sort
          );

          set(
            {
              applications: response.data.applications,
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
            "adminApplications/fetchAll/success"
          );
        } catch (error) {
          const errorMessage = adminApplicationService.handleAxiosError(error);

          set(
            {
              applications: [],
              isLoading: false,
              error: errorMessage,
            },
            false,
            "adminApplications/fetchAll/error"
          );

          console.error("Failed to fetch applications:", error);
        }
      },

      updateApplicationStatus: async (id: number, status: string) => {
        if (get().isLoading) return;

        set(
          { isLoading: true, error: null },
          false,
          "adminApplications/updateStatus/start"
        );

        try {
          const response =
            await adminApplicationService.updateApplicationStatus(id, status);
          const updated = response.data.updated;

          set(
            (state) => ({
              applications: state.applications.map((a) =>
                a.id === id ? updated : a
              ),
              isLoading: false,
              error: null,
            }),
            false,
            "adminApplications/updateStatus/success"
          );
        } catch (error) {
          const errorMessage = adminApplicationService.handleAxiosError(error);

          set(
            {
              isLoading: false,
              error: errorMessage,
            },
            false,
            "adminApplications/updateStatus/error"
          );

          console.error(`Failed to update application ${id}:`, error);
          throw error;
        }
      },

      clearError: () => {
        set({ error: null }, false, "adminApplications/clearError");
      },

      clearSelectedApplication: () => {
        set(
          { selectedApplication: null },
          false,
          "adminApplications/clearSelectedApplication"
        );
      },
    }),
    {
      name: "AdminApplicationStore",
    }
  )
);
