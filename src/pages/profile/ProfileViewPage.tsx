import { useEffect } from "react";
import { motion } from "framer-motion";
import { useProfileStore } from "../../stores/profileStore";
import { fadeUp } from "../../utils/animation";
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
      <div className="min-h-screen pt-28 flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen pt-28 text-center">
        <p className="text-zinc-600 mb-6">You have no profile yet.</p>
        <Link
          to="/profile/setup"
          className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          Create Profile
        </Link>
      </div>
    );
  }

  const handleDelete = async () => {
    if (!confirm("Delete your profile? This cannot be undone.")) return;
    await deleteProfile();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen pt-28 px-4 pb-16 bg-gray-50">
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="max-w-3xl mx-auto bg-white p-8 border border-zinc-200 rounded-2xl shadow-sm"
      >
        <ProfileSummary profile={profile} />

        <div className="flex gap-4 mt-6">
          <Link
            to="/profile/edit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Edit Profile
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
          >
            Delete Profile
          </button>
        </div>
      </motion.div>
    </div>
  );
}
