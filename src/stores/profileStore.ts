import { create } from "zustand";
import type {
  TProfile,
  TProfileCreateInput,
  TProfileUpdateInput,
} from "../types/profile.types";
import { profileService } from "../services/profileService";

type ProfileState = {
  profile: TProfile | null;
  loading: boolean;
  error: string | null;
  fetchMyProfile: () => Promise<void>;
  createProfile: (data: TProfileCreateInput) => Promise<void>;
  updateProfile: (data: TProfileUpdateInput) => Promise<void>;
  deleteProfile: () => Promise<void>;
  clearProfile: () => void;
};

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  loading: false,
  error: null,

  fetchMyProfile: async () => {
    set({ loading: true, error: null });
    try {
      const profile = await profileService.getMyProfile();
      set({ profile, loading: false });
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.message ??
        "Failed to load profile";
      set({ error: msg, loading: false, profile: null });
    }
  },

  createProfile: async (data: TProfileCreateInput) => {
    set({ loading: true, error: null });
    try {
      const res = await profileService.createProfile(data);
      set({ profile: res.profile, loading: false });
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.message ??
        "Profile creation failed";
      set({ error: msg, loading: false });
      throw err;
    }
  },

  updateProfile: async (data: TProfileUpdateInput) => {
    set({ loading: true, error: null });
    try {
      const res = await profileService.updateProfile(data);
      set({ profile: res.updated, loading: false });
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ?? err?.message ?? "Profile update failed";
      set({ error: msg, loading: false });
      throw err;
    }
  },

  deleteProfile: async () => {
    set({ loading: true, error: null });
    try {
      await profileService.deleteProfile();
      set({ profile: null, loading: false });
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.message ??
        "Profile deletion failed";
      set({ error: msg, loading: false });
      throw err;
    }
  },

  clearProfile: () => set({ profile: null, error: null }),
}));
