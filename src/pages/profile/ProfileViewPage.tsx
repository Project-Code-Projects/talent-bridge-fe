import { useEffect } from "react";
import { motion } from "framer-motion";
import { useProfileStore } from "../../stores/profileStore";
import { fadeUp, stagger } from "../../utils/animation";
import ProfileSummary from "../../components/profile/ProfileSummary";
import { Link, useNavigate } from "react-router-dom";

export default function ProfileViewPage() {
  const { profile, fetchMyProfile, deleteProfile, loading } = useProfileStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyProfile();
  }, [fetchMyProfile]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <section className="flex-1 pt-28 pb-16 px-4">
          <div className="mx-auto max-w-7xl flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent" />
              <p className="mt-4 text-zinc-600 font-medium">
                Loading your profile...
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <section className="flex-1 pt-28 pb-16 px-4">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-lg text-zinc-600 mb-6">
                You have no profile yet.
              </p>
              <Link
                to="/profile/setup"
                className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-white text-sm font-semibold shadow hover:bg-blue-700 transition"
              >
                Create Profile
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const handleDelete = async () => {
    if (!confirm("Delete your profile? This cannot be undone.")) return;
    await deleteProfile();
    navigate("/dashboard");
  };

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
              Your Profile
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-zinc-600">
              Manage your personal information and profile settings
            </motion.p>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-zinc-200">
              <h2 className="text-xl font-bold text-zinc-900">
                Profile Information
              </h2>
              <p className="text-sm text-zinc-600 mt-1">
                Your personal details and professional information
              </p>
            </div>

            <div className="p-6">
              <ProfileSummary profile={profile} />

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-zinc-100">
                <Link
                  to="/profile/edit"
                  className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-white text-sm font-semibold shadow hover:bg-blue-700 transition"
                >
                  Edit Profile
                </Link>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center rounded-xl bg-red-600 px-6 py-3 text-white text-sm font-semibold shadow hover:bg-red-700 transition"
                >
                  Delete Profile
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
