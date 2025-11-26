import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useProfileStore } from "../../stores/profileStore";
import type {
  TExperience,
  TProfileCreateInput,
} from "../../types/profile.types";
import { useNavigate } from "react-router";
import { fadeUp, stagger } from "../../utils/animation";

export default function ProfileFormPage() {
  const {
    profile,
    fetchMyProfile,
    createProfile,
    updateProfile,
    deleteProfile,
    loading,
  } = useProfileStore();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [summary, setSummary] = useState("");
  const [experiences, setExperiences] = useState<TExperience[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchMyProfile();
  }, [fetchMyProfile]);

  useEffect(() => {
    if (!profile) return;
    setFullName(profile.fullName || "");
    setPhone(profile.phone || "");
    setAddress(profile.address || "");
    setSummary(profile.summary || "");
    setExperiences(profile.experiences || []);
    setSkills(profile.skills || []);
    setResumeUrl(profile.resumeUrl || "");
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: TProfileCreateInput = {
      fullName,
      phone,
      address,
      summary,
      experiences,
      skills,
      resumeUrl,
    };
    try {
      if (profile) {
        await updateProfile(payload);
      } else {
        await createProfile(payload);
      }
      navigate("/dashboard");
    } catch {
      alert("Failed to save profile");
    }
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    await deleteProfile();
    setShowDeleteConfirm(false);
    navigate("/dashboard");
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleClear = () => {
    setShowClearConfirm(true);
  };

  const confirmClear = () => {
    setFullName("");
    setPhone("");
    setAddress("");
    setSummary("");
    setExperiences([]);
    setSkills([]);
    setResumeUrl("");
    setSkillInput("");
    setShowClearConfirm(false);
  };

  const cancelClear = () => {
    setShowClearConfirm(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
          >
            <h3 className="text-lg font-bold text-zinc-900 mb-2">
              Clear All Fields?
            </h3>
            <p className="text-zinc-600 mb-6">
              This will remove all data from the form. This action cannot be
              undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelClear}
                className="px-4 py-2 border border-zinc-300 text-zinc-700 rounded-lg hover:bg-zinc-100 transition text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmClear}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
              >
                Clear All
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
          >
            <h3 className="text-lg font-bold text-zinc-900 mb-2">
              Delete Profile?
            </h3>
            <p className="text-zinc-600 mb-6">
              This will permanently delete your profile and all associated data.
              This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-zinc-300 text-zinc-700 rounded-lg hover:bg-zinc-100 transition text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
              >
                Delete Profile
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <section className="flex-1 pt-28 pb-16 px-4">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="mb-12"
          >
            <motion.h1
              variants={fadeUp}
              className="text-4xl font-bold tracking-tight mb-2"
            >
              {profile ? "Edit Profile" : "Create Profile"}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-zinc-600">
              {profile
                ? "Update your personal information and professional details"
                : "Set up your profile to start applying for jobs"}
            </motion.p>
          </motion.div>

          {/* Profile Form Card */}
          <motion.div variants={fadeUp}>
            <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-zinc-200">
                <h2 className="text-xl font-bold text-zinc-900">
                  Profile Information
                </h2>
                <p className="text-sm text-zinc-600 mt-1">
                  Fill in your details to complete your profile
                </p>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="font-medium text-sm text-zinc-700">
                      Full Name
                    </label>
                    <input
                      className="w-full border border-zinc-300 p-3 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Contact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-medium text-sm text-zinc-700">
                        Phone
                      </label>
                      <input
                        className="w-full border border-zinc-300 p-3 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="font-medium text-sm text-zinc-700">
                        Resume URL
                      </label>
                      <input
                        className="w-full border border-zinc-300 p-3 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={resumeUrl}
                        onChange={(e) => setResumeUrl(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="font-medium text-sm text-zinc-700">
                      Address
                    </label>
                    <input
                      className="w-full border border-zinc-300 p-3 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  {/* Summary */}
                  <div>
                    <label className="font-medium text-sm text-zinc-700">
                      Summary
                    </label>
                    <textarea
                      className="w-full border border-zinc-300 p-3 rounded-lg mt-1 min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                    />
                  </div>

                  {/* Experience */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="font-medium text-sm text-zinc-700">
                        Experience
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setExperiences([
                            ...experiences,
                            {
                              company: "",
                              role: "",
                              startDate: "",
                              endDate: "",
                            },
                          ])
                        }
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        + Add Experience
                      </button>
                    </div>

                    {experiences.map((exp, idx) => (
                      <div
                        key={idx}
                        className="p-4 border border-zinc-200 rounded-lg bg-zinc-50 space-y-3"
                      >
                        <input
                          className="w-full border border-zinc-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) =>
                            setExperiences(
                              experiences.map((ex, i) =>
                                i === idx
                                  ? { ...ex, company: e.target.value }
                                  : ex
                              )
                            )
                          }
                        />
                        <input
                          className="w-full border border-zinc-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Role"
                          value={exp.role}
                          onChange={(e) =>
                            setExperiences(
                              experiences.map((ex, i) =>
                                i === idx ? { ...ex, role: e.target.value } : ex
                              )
                            )
                          }
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <input
                            type="date"
                            className="border border-zinc-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={exp.startDate}
                            onChange={(e) =>
                              setExperiences(
                                experiences.map((ex, i) =>
                                  i === idx
                                    ? { ...ex, startDate: e.target.value }
                                    : ex
                                )
                              )
                            }
                          />
                          <input
                            type="date"
                            className="border border-zinc-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={exp.endDate || ""}
                            min={exp.startDate}
                            onChange={(e) =>
                              setExperiences(
                                experiences.map((ex, i) =>
                                  i === idx
                                    ? { ...ex, endDate: e.target.value }
                                    : ex
                                )
                              )
                            }
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setExperiences(
                              experiences.filter((_, i) => i !== idx)
                            )
                          }
                          className="text-red-600 text-sm hover:text-red-700 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Skills */}
                  <div className="space-y-3">
                    <label className="font-medium text-sm text-zinc-700">
                      Skills
                    </label>
                    <div className="flex gap-2">
                      <input
                        className="border border-zinc-300 p-3 rounded-lg flex-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Add skill"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!skillInput.trim()) return;
                          setSkills([...skills, skillInput.trim()]);
                          setSkillInput("");
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-zinc-100 rounded-full text-sm flex items-center gap-2"
                        >
                          {skill}
                          <button
                            onClick={() =>
                              setSkills(skills.filter((s) => s !== skill))
                            }
                            type="button"
                            className="text-red-600 font-bold hover:text-red-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6 border-t border-zinc-100">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-white text-sm font-semibold shadow hover:bg-blue-700 transition"
                    >
                      {loading
                        ? "Saving..."
                        : profile
                        ? "Update Profile"
                        : "Create Profile"}
                    </button>
                    <button
                      type="button"
                      onClick={handleClear}
                      className="inline-flex items-center rounded-xl bg-gray-600 px-6 py-3 text-white text-sm font-semibold shadow hover:bg-gray-700 transition"
                    >
                      Clear
                    </button>
                    {profile && (
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="inline-flex items-center rounded-xl bg-red-600 px-6 py-3 text-white text-sm font-semibold shadow hover:bg-red-700 transition"
                      >
                        Delete Profile
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
