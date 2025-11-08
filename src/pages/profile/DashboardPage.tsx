import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useProfileStore } from "../../stores/profileStore";
import { fadeUp } from "../../utils/animation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { profile, fetchMyProfile } = useProfileStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyProfile();
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
        <p className="text-zinc-600 mb-4">
          {profile
            ? `Welcome, ${profile.fullName}! Manage your profile and job applications.`
            : "Manage your profile and job applications."}
        </p>

        <div className="flex gap-4">
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
      </motion.div>
    </div>
  );
}
