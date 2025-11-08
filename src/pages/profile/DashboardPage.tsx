import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useProfileStore } from "../../stores/profileStore";
import { fadeUp } from "../../utils/animation";
import { useEffect } from "react";
import { useApplicationStore } from "../../stores/applicationStore";

export default function DashboardPage() {
  const { profile, fetchMyProfile } = useProfileStore();
  const { myApplications, fetchMyApplications } = useApplicationStore();

  useEffect(() => {
    fetchMyProfile();
    fetchMyApplications();
  }, []);

  return (
    <div className="min-h-screen pt-28 px-4 pb-16 bg-gray-50">
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="max-w-4xl mx-auto bg-white border border-zinc-200 rounded-2xl p-10 shadow-sm"
      >
        <h1 className="text-3xl font-bold mb-3">Dashboard</h1>

        <p className="text-zinc-600 mb-6">
          {profile
            ? `Welcome, ${profile.fullName}!`
            : "Manage your profile and job applications."}
        </p>

        {/* Profile Buttons */}
        <div className="flex gap-4 mb-4">
          {profile ? (
            <>
              <Link
                to="/profile"
                className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-white text-sm font-medium hover:bg-blue-700 transition"
              >
                View Profile
              </Link>
              <Link
                to="/profile/edit"
                className="inline-flex items-center rounded-xl bg-gray-600 px-6 py-3 text-white text-sm font-medium hover:bg-gray-700 transition"
              >
                Edit Profile
              </Link>
            </>
          ) : (
            <Link
              to="/profile/setup"
              className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-white text-sm font-medium hover:bg-blue-700 transition"
            >
              Set up your profile
            </Link>
          )}
        </div>

        {/* ✅ List of Applied Jobs */}
        <h2 className="text-xl font-bold mb-4">Your Applications</h2>

        {myApplications.length === 0 ? (
          <p className="text-zinc-600">You haven't applied to any jobs yet.</p>
        ) : (
          <ul className="space-y-4">
            {myApplications.map((app) => (
              <li
                key={app.id}
                className="p-4 border border-zinc-200 rounded-xl bg-zinc-50"
              >
                {/* Job Info */}
                <p className="font-semibold text-zinc-900">
                  {app.job?.title || "Job Title Unavailable"}
                </p>

                {app.job?.company && (
                  <p className="text-sm text-zinc-600">{app.job.company}</p>
                )}

                {app.job?.location && (
                  <p className="text-xs text-zinc-500">📍 {app.job.location}</p>
                )}

                {app.job?.salaryRange && (
                  <p className="text-xs text-zinc-500">
                    💰 Salary: {app.job.salaryRange}
                  </p>
                )}

                {/* Application Info */}
                {app.resumeUrl && (
                  <p className="text-xs text-zinc-500">
                    📝 Resume: {app.resumeUrl}
                  </p>
                )}

                {app.coverLetter && (
                  <p className="text-xs text-zinc-500">
                    ✉️ Cover Letter: {app.coverLetter}
                  </p>
                )}

                <p className="text-sm text-zinc-800 mt-2 capitalize">
                  Status: <span className="font-medium">{app.status}</span>
                </p>

                <p className="text-xs text-zinc-500">
                  Applied on: {new Date(app.appliedAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
}
