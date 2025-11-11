import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fadeUp } from "../../utils/animation";
import { useAdminUserStore } from "../../stores/adminUserStore";

export default function AdminUserProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    selectedUser,
    isLoading,
    error,
    fetchUserById,
    deleteUser,
    clearSelectedUser,
    clearError,
  } = useAdminUserStore();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const userId = id ? Number(id) : undefined;

  useEffect(() => {
    if (userId) {
      clearError();
      fetchUserById(userId);
    }

    return () => {
      clearSelectedUser();
    };
  }, [userId, clearError, clearSelectedUser, fetchUserById]);

  const handleDelete = async () => {
    if (!userId) return;

    setIsDeleting(true);
    try {
      await deleteUser(userId);
      navigate("/admin/users");
    } catch (error) {
      console.error("Delete failed:", error);
      setIsDeleting(false);
    }
  };

  if (isLoading && !selectedUser) {
    return (
      <div className="min-h-screen pt-10 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-zinc-600 font-medium">
            Loading user profile...
          </p>
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

  const profile = selectedUser.Profile;

  return (
    <section className="pt-10 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/admin/users"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 mb-4"
          >
            ← Back to Users
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900">User Profile</h1>
              <p className="mt-2 text-zinc-600">
                View and manage user information
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to={`/admin/users/${userId}/edit`}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700 transition-colors"
              >
                ✏️ Edit Profile
              </Link>
              <button
                onClick={() => setDeleteConfirm(true)}
                disabled={selectedUser.roleId === 1}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title={
                  selectedUser.roleId === 1
                    ? "Cannot delete admin users"
                    : "Delete user"
                }
              >
                🗑️ Delete User
              </button>
            </div>
          </div>
        </div>

        {/* User Account Info */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm mb-6"
        >
          <h2 className="text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
            👤 Account Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-600 mb-1">
                User ID
              </label>
              <p className="text-zinc-900">{selectedUser.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-600 mb-1">
                Name
              </label>
              <p className="text-zinc-900">{selectedUser.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-600 mb-1">
                Email
              </label>
              <p className="text-zinc-900">{selectedUser.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-600 mb-1">
                Role
              </label>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                  selectedUser.roleId === 1
                    ? "bg-purple-100 text-purple-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {selectedUser.roleId === 1 ? "Admin" : "Client"}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-600 mb-1">
                Joined
              </label>
              <p className="text-zinc-900">
                {new Date(selectedUser.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-600 mb-1">
                Last Updated
              </label>
              <p className="text-zinc-900">
                {selectedUser.updatedAt
                  ? new Date(selectedUser.updatedAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : "-"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Profile Information */}
        {profile ? (
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
              📝 Profile Details
            </h2>

            {/* Basic Info */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-1">
                    Full Name
                  </label>
                  <p className="text-zinc-900">{profile.fullName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-1">
                    Phone
                  </label>
                  <p className="text-zinc-900">
                    {profile.phone || "Not provided"}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-600 mb-1">
                  Address
                </label>
                <p className="text-zinc-900">
                  {profile.address || "Not provided"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-600 mb-1">
                  Summary
                </label>
                <p className="text-zinc-900 whitespace-pre-line">
                  {profile.summary || "No summary provided"}
                </p>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-zinc-600 mb-2">
                  Skills
                </label>
                {profile.skills && profile.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-zinc-500">No skills listed</p>
                )}
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-zinc-600 mb-3">
                  Work Experience
                </label>
                {profile.experiences && profile.experiences.length > 0 ? (
                  <div className="space-y-4">
                    {profile.experiences.map((exp, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-indigo-500 pl-4 py-2 bg-indigo-50 rounded-r-lg"
                      >
                        <h4 className="font-semibold text-zinc-900">
                          {exp.role}
                        </h4>
                        <p className="text-sm text-zinc-700">{exp.company}</p>
                        <p className="text-xs text-zinc-500 mt-1">
                          {exp.startDate} - {exp.endDate || "Present"}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-zinc-500">No work experience listed</p>
                )}
              </div>

              {/* Resume */}
              {profile.resumeUrl && (
                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">
                    Resume
                  </label>

                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-200 transition-colors"
                  >
                    📄 View Resume
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-yellow-200 bg-yellow-50 p-8 text-center"
          >
            <div className="text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-zinc-900 mb-2">
              No Profile Created
            </h3>
            <p className="text-zinc-600">
              This user hasn't completed their profile yet.
            </p>
          </motion.div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl"
            >
              <h3 className="text-xl font-bold text-zinc-900 mb-2">
                Delete User?
              </h3>
              <p className="text-zinc-600 mb-6">
                Are you sure you want to delete{" "}
                <strong>{selectedUser.name}</strong>? This action cannot be
                undone and will permanently delete:
              </p>
              <ul className="list-disc list-inside text-sm text-zinc-600 mb-6 space-y-1">
                <li>User account</li>
                <li>Profile information</li>
                <li>All applications</li>
                <li>All associated data</li>
              </ul>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteConfirm(false)}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-xl border border-zinc-300 text-zinc-700 hover:bg-zinc-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? "Deleting..." : "Delete Permanently"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
