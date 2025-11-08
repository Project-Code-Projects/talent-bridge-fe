import axiosInstance from "./axiosInstance";
import type {
  TProfile,
  TProfileCreateInput,
  TProfileUpdateInput,
} from "../types/profile.types";

const BASE = "/profiles";

export const profileService = {
  getMyProfile: async (): Promise<TProfile | null> => {
    const res = await axiosInstance.get<TProfile>(`${BASE}/me`);
    return res.data;
  },

  createProfile: async (
    payload: TProfileCreateInput
  ): Promise<{ message: string; profile: TProfile }> => {
    const res = await axiosInstance.post<{
      message: string;
      profile: TProfile;
    }>(`${BASE}`, payload);
    return res.data;
  },

  updateProfile: async (
    payload: TProfileUpdateInput
  ): Promise<{ message: string; updated: TProfile }> => {
    const res = await axiosInstance.put<{ message: string; updated: TProfile }>(
      `${BASE}/me`,
      payload
    );
    return res.data;
  },

  deleteProfile: async (): Promise<{ message?: string } | void> => {
    const res = await axiosInstance.delete<{ message?: string }>(`${BASE}/me`);
    return res.data;
  },
};
