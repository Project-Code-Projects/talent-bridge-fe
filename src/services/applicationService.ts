import axiosInstance from "./api";
import type {
  TApplicationCreateInput,
  TApplication,
} from "../types/application.types";

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
};
