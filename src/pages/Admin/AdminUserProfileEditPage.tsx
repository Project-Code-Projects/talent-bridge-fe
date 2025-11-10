import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAdminUserStore } from "../../stores/adminUserStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Experience } from "../../types/user.types";
import axiosInstance from "../../services/api";
import { fadeUp } from "../../utils/animation";
import axios from "axios";

export default function AdminUserProfileEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    selectedUser,
    isLoading,
    error,
    fetchUserById,
    clearSelectedUser,
    clearError,
  } = useAdminUserStore();

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const userId = id ? Number(id) : undefined;

  // User form data
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    roleId: 2,
  });

  // Profile form data
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    summary: "",
    skills: [] as string[],
    experiences: [] as Experience[],
    resumeUrl: "",
  });

  const [newSkill, setNewSkill] = useState("");
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    if (userId) {
      clearError();
      fetchUserById(userId);
    }

    return () => {
      clearSelectedUser();
    };
  }, [userId, clearError, clearSelectedUser, fetchUserById]);

  useEffect(() => {
    if (selectedUser) {
      setUserForm({
        name: selectedUser.name,
        email: selectedUser.email,
        roleId: selectedUser.roleId,
      });

      if (selectedUser.Profile) {
        setHasProfile(true);
        setProfileForm({
          fullName: selectedUser.Profile.fullName || "",
          phone: selectedUser.Profile.phone || "",
          address: selectedUser.Profile.address || "",
          summary: selectedUser.Profile.summary || "",
          skills: selectedUser.Profile.skills || [],
          experiences: selectedUser.Profile.experiences || [],
          resumeUrl: selectedUser.Profile.resumeUrl || "",
        });
      }
    }
  }, [selectedUser]);

  const handleUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({
      ...prev,
      [name]: name === "roleId" ? Number(value) : value,
    }));
  };

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profileForm.skills.includes(newSkill.trim())) {
      setProfileForm((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfileForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleAddExperience = () => {
    setProfileForm((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { company: "", role: "", startDate: "", endDate: "" },
      ],
    }));
  };

  const handleExperienceChange = (
    index: number,
    field: keyof Experience,
    value: string
  ) => {
    setProfileForm((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const handleRemoveExperience = (index: number) => {
    setProfileForm((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      // Update user account info
      await axiosInstance.put(`/users/${userId}`, {
        name: userForm.name,
        email: userForm.email,
        roleId: userForm.roleId,
      });

      // Update or create profile if profile data exists
      if (hasProfile) {
        // Update existing profile
        await axiosInstance.put(`/profiles/${userId}`, profileForm);
      } else if (profileForm.fullName) {
        // Create new profile if user entered data
        await axiosInstance.post("/profiles", {
          ...profileForm,
          userId,
        });
      }

      navigate(`/admin/users/${userId}`);
    } catch (err: unknown) {
      const fallback = "Failed to save changes";
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message ?? fallback
        : fallback;
      setSaveError(message);
      setIsSaving(false);
    }
  };

  if (isLoading && !selectedUser) {
    return (
      <div className="min-h-screen pt-10 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-zinc-600 font-medium">Loading user...</p>
        </div>
      </div>
    );
  }

  if (error || !selectedUser) {
    return (
      <div className="min-h-screen pt-10 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">❌</div>
          <h2 className="text-2xl font-bold mb-2">User Not Found</h2>
          <p className="text-zinc-600 mb-6">
            {error || "This user does not exist"}
          </p>
          <Link
            to="/admin/users"
            className="inline-flex items-center rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-zinc-800"
          >
            ← Back to Users
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="pt-10 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="mb-6">
          <Link
            to={`/admin/users/${userId}`}
            className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 mb-4"
          >
            ← Back to Profile
          </Link>
          <h1 className="text-3xl font-bold text-zinc-900">
            Edit User Profile
          </h1>
          <p className="mt-2 text-zinc-600">
            Update user account and profile information
          </p>
        </div>

        {/* Error Alert */}
        {saveError && (
          <motion.div
            variants={fadeUp}
            className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          >
            <div className="flex items-center justify-between">
              <span>⚠️ {saveError}</span>
              <button
                onClick={() => setSaveError(null)}
                className="text-red-600 hover:text-red-800"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Account Information */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900 border-b pb-2 mb-4">
              Account Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-zinc-700 mb-1"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={userForm.name}
                  onChange={handleUserChange}
                  className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-zinc-700 mb-1"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={userForm.email}
                  onChange={handleUserChange}
                  className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label
                  htmlFor="roleId"
                  className="block text-sm font-medium text-zinc-700 mb-1"
                >
                  Role *
                </label>
                <select
                  id="roleId"
                  name="roleId"
                  value={userForm.roleId}
                  onChange={handleUserChange}
                  className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value={2}>Client</option>
                  <option value={1}>Admin</option>
                </select>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900 border-b pb-2 mb-4">
              Profile Information
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-zinc-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={profileForm.fullName}
                    onChange={handleProfileChange}
                    className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-zinc-700 mb-1"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileForm.phone}
                    onChange={handleProfileChange}
                    className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-zinc-700 mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={profileForm.address}
                  onChange={handleProfileChange}
                  className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label
                  htmlFor="summary"
                  className="block text-sm font-medium text-zinc-700 mb-1"
                >
                  Summary
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  rows={4}
                  value={profileForm.summary}
                  onChange={handleProfileChange}
                  className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Brief professional summary..."
                />
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Skills
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), handleAddSkill())
                    }
                    className="flex-1 rounded-xl border border-zinc-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="Add a skill..."
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                {profileForm.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {profileForm.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="hover:text-indigo-900"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Experience */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-zinc-700">
                    Work Experience
                  </label>
                  <button
                    type="button"
                    onClick={handleAddExperience}
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    + Add Experience
                  </button>
                </div>
                <div className="space-y-4">
                  {profileForm.experiences.map((exp, index) => (
                    <div
                      key={index}
                      className="p-4 border border-zinc-200 rounded-xl bg-zinc-50"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "role",
                              e.target.value
                            )
                          }
                          placeholder="Role/Position"
                          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "company",
                              e.target.value
                            )
                          }
                          placeholder="Company"
                          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "startDate",
                              e.target.value
                            )
                          }
                          placeholder="Start Date (e.g., Jan 2020)"
                          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                        <input
                          type="text"
                          value={exp.endDate || ""}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "endDate",
                              e.target.value
                            )
                          }
                          placeholder="End Date (or leave empty)"
                          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveExperience(index)}
                        className="mt-3 text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resume URL */}
              <div>
                <label
                  htmlFor="resumeUrl"
                  className="block text-sm font-medium text-zinc-700 mb-1"
                >
                  Resume URL
                </label>
                <input
                  type="url"
                  id="resumeUrl"
                  name="resumeUrl"
                  value={profileForm.resumeUrl}
                  onChange={handleProfileChange}
                  className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="https://example.com/resume.pdf"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Link
              to={`/admin/users/${userId}`}
              className="px-6 py-2.5 rounded-xl border border-zinc-300 text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
