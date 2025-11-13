import axiosInstance from "./api";
import type {
  TApplicationCreateInput,
  TApplication,
  TAdminApplicationResponse,
  TApplicationFilterBy,
  TApplicationStatus,
} from "../types/application.types";

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unknown error occurred";
};

export const ApplicationService = {
  apply: async (data: TApplicationCreateInput): Promise<TApplication> => {
    const res = await axiosInstance.post<
      { message?: string; application?: TApplication } | TApplication
    >("/applications", data);

    const body = res.data as any;
    if (body.application) return body.application as TApplication;
    return body as TApplication;
  },

  getMyApplications: async (): Promise<TApplication[]> => {
    const res = await axiosInstance.get<TApplication[]>("/applications/me");
    return res.data;
  },

  getAdminApplications: async (
    page = 1,
    limit = 10,
    search?: string,
    filterBy?: TApplicationFilterBy
  ): Promise<TAdminApplicationResponse> => {
    const { data } = await axiosInstance.get<TAdminApplicationResponse>(
      "/applications",
      { params: { page, limit, search, filterBy } }
    );
    return data;
  },

  updateStatus: async (
    applicationId: number,
    status: TApplicationStatus
  ): Promise<{ message: string; application: TApplication }> => {
    const { data } = await axiosInstance.put(`/applications/${applicationId}`, {
      status,
    });
    return data;
  },
  getErrorMessage,
};
