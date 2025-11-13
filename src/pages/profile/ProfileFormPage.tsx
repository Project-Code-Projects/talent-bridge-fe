import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useProfileStore } from "../../stores/profileStore";
import type {
  TExperience,
  TProfileCreateInput,
} from "../../types/profile.types";
import { useNavigate } from "react-router";
import { fadeUp } from "../../utils/animation";

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

  const handleDelete = async () => {
    if (!confirm("Delete your profile? This cannot be undone.")) return;
    await deleteProfile();
    navigate("/dashboard");
  };

  const handleClear = () => {
    if (profile) {
      setFullName(profile.fullName || "");
      setPhone(profile.phone || "");
      setAddress(profile.address || "");
      setSummary(profile.summary || "");
      setExperiences(profile.experiences || []);
      setSkills(profile.skills || []);
      setResumeUrl(profile.resumeUrl || "");
    } else {
      setFullName("");
      setPhone("");
      setAddress("");
      setSummary("");
      setExperiences([]);
      setSkills([]);
      setResumeUrl("");
    }
    setSkillInput("");
  };

  return (
    <div className="min-h-screen pt-28 px-4 pb-16 bg-gray-50 flex justify-center">
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="w-full max-w-4xl bg-white border border-zinc-200 rounded-2xl shadow-sm p-10"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            {profile ? "Edit Profile" : "Create Profile"}
          </h1>
          {profile && (
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-800 font-medium text-sm"
            >
              Delete Profile
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Full Name */}
          <div>
            <label className="font-medium">Full Name</label>
            <input
              className="w-full border p-3 rounded-lg mt-1"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          {/* Contact */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="font-medium">Phone</label>
              <input
                className="w-full border p-3 rounded-lg mt-1"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="font-medium">Resume URL</label>
              <input
                className="w-full border p-3 rounded-lg mt-1"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="font-medium">Address</label>
            <input
              className="w-full border p-3 rounded-lg mt-1"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Summary */}
          <div>
            <label className="font-medium">Summary</label>
            <textarea
              className="w-full border p-3 rounded-lg mt-1 min-h-[120px]"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-medium text-lg">Experience</label>
              <button
                type="button"
                onClick={() =>
                  setExperiences([
                    ...experiences,
                    { company: "", role: "", startDate: "", endDate: "" },
                  ])
                }
                className="text-blue-600 hover:underline text-sm"
              >
                + Add Experience
              </button>
            </div>

            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="p-4 border rounded-lg bg-zinc-50 space-y-2"
              >
                <input
                  className="w-full border p-2 rounded"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) =>
                    setExperiences(
                      experiences.map((ex, i) =>
                        i === idx ? { ...ex, company: e.target.value } : ex
                      )
                    )
                  }
                />
                <input
                  className="w-full border p-2 rounded"
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
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    className="border p-2 rounded"
                    value={exp.startDate}
                    onChange={(e) =>
                      setExperiences(
                        experiences.map((ex, i) =>
                          i === idx ? { ...ex, startDate: e.target.value } : ex
                        )
                      )
                    }
                  />
                  <input
                    type="date"
                    className="border p-2 rounded"
                    value={exp.endDate || ""}
                    onChange={(e) =>
                      setExperiences(
                        experiences.map((ex, i) =>
                          i === idx ? { ...ex, endDate: e.target.value } : ex
                        )
                      )
                    }
                  />
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setExperiences(experiences.filter((_, i) => i !== idx))
                  }
                  className="text-red-600 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <label className="font-medium text-lg">Skills</label>
            <div className="flex gap-2">
              <input
                className="border p-3 rounded-lg flex-1"
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
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-200 rounded-full flex items-center gap-2"
                >
                  {skill}
                  <button
                    onClick={() => setSkills(skills.filter((s) => s !== skill))}
                    type="button"
                    className="text-red-600 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              {profile ? "Update Profile" : "Create Profile"}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="bg-gray-300 text-black px-6 py-3 rounded-xl hover:bg-gray-400 transition"
            >
              Clear
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
