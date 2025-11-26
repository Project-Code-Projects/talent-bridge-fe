import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { fadeUp, stagger } from "../../utils/animation";
import { useProfileStore } from "../../stores/profileStore";
import { useApplicationStore } from "../../stores/applicationStore";
import type { TApplication } from "../../types/application.types";

export default function DashboardPage() {
  const { profile, fetchMyProfile } = useProfileStore();
  const { myApplications, fetchMyApplications } = useApplicationStore();

  useEffect(() => {
    fetchMyProfile();
    fetchMyApplications();
  }, [fetchMyProfile, fetchMyApplications]);

  return (
    <div className="min-h-screen flex flex-col">
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
              Dashboard
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-zinc-600 mb-6">
              {profile
                ? `Welcome, ${profile.fullName}!`
                : "Manage your profile and job applications."}
            </motion.p>
          </motion.div>

          {/* Profile Buttons */}
          <motion.div variants={fadeUp} className="flex gap-4 mb-12">
            {profile ? (
              <>
                <Link
                  to="/profile"
                  className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-white text-sm font-semibold shadow hover:bg-blue-700 transition"
                >
                  View Profile
                </Link>
                <Link
                  to="/profile/edit"
                  className="inline-flex items-center rounded-xl bg-gray-600 px-6 py-3 text-white text-sm font-semibold shadow hover:bg-gray-700 transition"
                >
                  Edit Profile
                </Link>
              </>
            ) : (
              <Link
                to="/profile/setup"
                className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-white text-sm font-semibold shadow hover:bg-blue-700 transition"
              >
                Set up your profile
              </Link>
            )}
          </motion.div>

          {/* Applications Section */}
          <motion.div variants={fadeUp}>
            <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-zinc-200">
                <h2 className="text-xl font-bold text-zinc-900">
                  Your Applications
                </h2>
                <p className="text-sm text-zinc-600 mt-1">
                  You have applied to {myApplications.length} jobs
                </p>
              </div>

              {/* Empty State */}
              {myApplications.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="text-5xl mb-3">📄</div>
                  <h3 className="text-xl font-semibold mb-1">
                    No applications yet
                  </h3>
                  <p className="text-zinc-600">
                    Start applying to jobs to see them listed here.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 p-6">
                  {(myApplications as TApplication[]).map((app) => (
                    <motion.div
                      key={app.id}
                      variants={fadeUp}
                      className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex-1">
                          <h2 className="text-xl font-semibold text-zinc-900 group-hover:text-indigo-600 transition-colors">
                            {app.job?.title || "Job Title Unavailable"}
                          </h2>
                          {app.job?.company && (
                            <p className="mt-1 text-sm font-medium text-zinc-700">
                              {app.job.company}
                            </p>
                          )}

                          {/* Location */}
                          {app.job?.location && (
                            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
                              <span className="inline-flex items-center gap-1">
                                📍 {app.job.location}
                              </span>
                              {app.job?.salaryRange && (
                                <span className="text-xs text-zinc-500">
                                  💰 {app.job.salaryRange}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Status Badge */}
                        <span
                          className={`rounded-lg px-3 py-1 text-xs font-medium ${
                            app.status === "accepted"
                              ? "bg-emerald-50 text-emerald-700"
                              : app.status === "rejected"
                              ? "bg-red-50 text-red-700"
                              : app.status === "reviewing"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {app.status.charAt(0).toUpperCase() +
                            app.status.slice(1)}
                        </span>
                      </div>

                      {/* Application Details */}
                      <div className="space-y-3">
                        {/* Resume */}
                        {app.resumeUrl && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-zinc-700">
                              Resume:
                            </span>
                            <span className="text-xs text-zinc-500">
                              {app.resumeUrl.split("/").pop() || app.resumeUrl}
                            </span>
                          </div>
                        )}

                        {/* Cover Letter */}
                        {app.coverLetter && (
                          <div>
                            <span className="text-xs font-medium text-zinc-700">
                              Cover Letter:
                            </span>
                            <p className="text-xs text-zinc-500 mt-1">
                              {app.coverLetter.length > 100
                                ? `${app.coverLetter.substring(0, 100)}...`
                                : app.coverLetter}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <p className="text-xs text-zinc-500">
                          Applied on:{" "}
                          {new Date(app.appliedAt).toLocaleDateString()}
                        </p>
                        <Link
                          to={`/jobs/${app.jobId}`}
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                        >
                          View job →
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
