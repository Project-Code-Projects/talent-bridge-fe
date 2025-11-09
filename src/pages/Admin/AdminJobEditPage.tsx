import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAdminJobStore } from "../../stores/adminJobStore";
import { useEffect, useState } from "react";
import type { Job } from "../../types/job.types";
import { fadeUp } from "../../utils/animation";

export default function AdminJobEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    selectedJob,
    isLoading,
    error,
    fetchJobById,
    updateJob,
    clearError,
    clearSelectedJob,
  } = useAdminJobStore();

  const [formData, setFormData] = useState<Partial<Job>>({
    title: "",
    company: "",
    location: "",
    employmentType: "",
    salaryRange: "",
    shortDescription: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
    deadline: "",
    hiringStatus: "hiring",
    isActive: true,
  });

  useEffect(() => {
    if (id) {
      clearError();
      fetchJobById(Number(id));
    }

    return () => {
      clearSelectedJob();
    };
  }, [id, clearError, clearSelectedJob, fetchJobById]);

  useEffect(() => {
    if (selectedJob) {
      setFormData({
        title: selectedJob.title || "",
        company: selectedJob.company || "",
        location: selectedJob.location || "",
        employmentType: selectedJob.employmentType || "",
        salaryRange: selectedJob.salaryRange || "",
        shortDescription: selectedJob.shortDescription || "",
        responsibilities: selectedJob.responsibilities || "",
        requirements: selectedJob.requirements || "",
        benefits: selectedJob.benefits || "",
        deadline: selectedJob.deadline || "",
        hiringStatus: selectedJob.hiringStatus || "hiring",
        isActive: selectedJob.isActive ?? true,
      });
    }
  }, [selectedJob]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    try {
      await updateJob(Number(id), formData);
      navigate("/admin/jobs");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (isLoading && !selectedJob) {
    return (
      <div className="min-h-screen pt-10 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-zinc-600 font-medium">
            Loading job details...
          </p>
        </div>
      </div>
    );
  }

  if (error && !selectedJob) {
    return (
      <div className="min-h-screen pt-10 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">❌</div>
          <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>
          <p className="text-zinc-600 mb-6">{error}</p>
          <Link
            to="/admin/jobs"
            className="inline-flex items-center rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-zinc-800"
          >
            ← Back to Jobs
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
            to="/admin/jobs"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 mb-4"
          >
            ← Back to Jobs
          </Link>
          <h1 className="text-3xl font-bold text-zinc-900">Edit Job Posting</h1>
          <p className="mt-2 text-zinc-600">
            Update job details and requirements
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            variants={fadeUp}
            className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          >
            ⚠️ {error}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-zinc-900 border-b pb-2">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-zinc-700 mb-1"
                  >
                    Job Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="e.g., Senior Frontend Developer"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-zinc-700 mb-1"
                  >
                    Company *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="e.g., Tech Corp"
                  />
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-zinc-700 mb-1"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="e.g., Dhaka, Bangladesh"
                  />
                </div>

                <div>
                  <label
                    htmlFor="employmentType"
                    className="block text-sm font-medium text-zinc-700 mb-1"
                  >
                    Employment Type
                  </label>
                  <select
                    id="employmentType"
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value="">Select type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="salaryRange"
                    className="block text-sm font-medium text-zinc-700 mb-1"
                  >
                    Salary Range
                  </label>
                  <input
                    type="text"
                    id="salaryRange"
                    name="salaryRange"
                    value={formData.salaryRange}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="e.g., 80,000 - 120,000 BDT"
                  />
                </div>

                <div>
                  <label
                    htmlFor="deadline"
                    className="block text-sm font-medium text-zinc-700 mb-1"
                  >
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="shortDescription"
                  className="block text-sm font-medium text-zinc-700 mb-1"
                >
                  Short Description
                </label>
                <textarea
                  id="shortDescription"
                  name="shortDescription"
                  rows={3}
                  value={formData.shortDescription}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Brief overview of the position..."
                />
              </div>
            </div>

            {/* Job Details */}
            <div className="space-y-4 mt-6">
              <h2 className="text-lg font-semibold text-zinc-900 border-b pb-2">
                Job Details
              </h2>

              <div>
                <label
                  htmlFor="responsibilities"
                  className="block text-sm font-medium text-zinc-700 mb-1"
                >
                  Responsibilities
                </label>
                <textarea
                  id="responsibilities"
                  name="responsibilities"
                  rows={5}
                  value={formData.responsibilities}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="List key responsibilities..."
                />
              </div>

              <div>
                <label
                  htmlFor="requirements"
                  className="block text-sm font-medium text-zinc-700 mb-1"
                >
                  Requirements
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  rows={5}
                  value={formData.requirements}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="List required skills and qualifications..."
                />
              </div>

              <div>
                <label
                  htmlFor="benefits"
                  className="block text-sm font-medium text-zinc-700 mb-1"
                >
                  Benefits
                </label>
                <textarea
                  id="benefits"
                  name="benefits"
                  rows={4}
                  value={formData.benefits}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="List benefits and perks..."
                />
              </div>
            </div>

            {/* Status */}
            <div className="space-y-4 mt-6">
              <h2 className="text-lg font-semibold text-zinc-900 border-b pb-2">
                Status
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="hiringStatus"
                    className="block text-sm font-medium text-zinc-700 mb-1"
                  >
                    Hiring Status
                  </label>
                  <select
                    id="hiringStatus"
                    name="hiringStatus"
                    value={formData.hiringStatus}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value="hiring">Hiring</option>
                    <option value="applied">Applied</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="hired">Hired</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                      className="w-4 h-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-zinc-700">
                      Active Job Posting
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Link
              to="/admin/jobs"
              className="px-6 py-2.5 rounded-xl border border-zinc-300 text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
