import { useEffect, useState } from "react";
import { useAdminApplicationStore } from "../../stores/addminApplicationStore";
import {
  APPLICATION_STATUSES,
  type Application,
} from "../../types/adminApplication.types";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "../../utils/animation";

export default function AdminApplicationsPage() {
  const {
    applications,
    pagination,
    isLoading,
    error,
    fetchAllApplications,
    updateApplicationStatus,
    clearError,
  } = useAdminApplicationStore();

  const [statusModal, setStatusModal] = useState<{
    application: Application;
    newStatus: string;
  } | null>(null);

  const [coverLetterModal, setCoverLetterModal] = useState<{
    application: Application;
  } | null>(null);

  useEffect(() => {
    clearError();
    fetchAllApplications(1, 10);
  }, [fetchAllApplications, clearError]);

  const handlePageChange = (newPage: number) => {
    fetchAllApplications(newPage, pagination.limit);
  };

  const handleStatusUpdate = async () => {
    if (!statusModal) return;

    try {
      await updateApplicationStatus(
        statusModal.application.id,
        statusModal.newStatus
      );
      setStatusModal(null);
      // Refresh current page
      fetchAllApplications(pagination.currentPage, pagination.limit);
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-700",
      reviewing: "bg-blue-100 text-blue-700",
      accepted: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-zinc-100 text-zinc-700";
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateCoverLetter = (
    text: string | null | undefined,
    maxLength: number = 80
  ) => {
    if (!text) return "No cover letter";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (isLoading && applications.length === 0) {
    return (
      <div className="min-h-screen pt-10 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-zinc-600 font-medium">
            Loading applications...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="pt-10 pb-16">
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={fadeUp}>
          <h1 className="text-3xl font-bold text-zinc-900">Job Applications</h1>
          <p className="mt-2 text-zinc-600">
            Showing {applications.length} of {pagination.total} applications
          </p>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <motion.div
            variants={fadeUp}
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span>⚠️ {error}</span>
              <button
                onClick={clearError}
                className="text-red-600 hover:text-red-800"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}

        {/* Applications Table */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden"
        >
          {applications.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">
                No applications found
              </h3>
              <p className="text-zinc-600">
                Applications will appear here once users start applying
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-zinc-50 border-b border-zinc-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                        Applicant
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                        Job Title
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                        Applied Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                        Resume
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                        Cover Letter
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {applications.map((app) => (
                      <tr
                        key={app.id}
                        className="hover:bg-zinc-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <span className="text-sm font-semibold text-indigo-700">
                                {app.User?.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <p className="font-medium text-zinc-900">
                              {app.User?.Profile?.fullName ||
                                app.User?.name ||
                                "N/A"}
                            </p>
                          </div>
                        </td>
                        <td className="text-sm text-zinc-500">
                          {app.User?.email || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm text-zinc-700">
                          {app.Job?.title || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm text-zinc-700">
                          {app.Job?.company || "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusColor(
                              app.status
                            )}`}
                          >
                            {app.status.replace(/_/g, " ")}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-zinc-700">
                          {formatDate(app.appliedAt)}
                        </td>
                        <td className="px-6 py-4">
                          {app.resumeUrl || app.User?.Profile?.resumeUrl ? (
                            <a
                              href={
                                app.resumeUrl ||
                                app.User?.Profile?.resumeUrl ||
                                "#"
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-indigo-600 hover:text-indigo-800 underline"
                            >
                              View Resume
                            </a>
                          ) : (
                            <span className="text-sm text-zinc-400">
                              No resume
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() =>
                              setCoverLetterModal({ application: app })
                            }
                            className="text-sm text-zinc-600 hover:text-zinc-800 text-left"
                            title={app.coverLetter || "No cover letter"}
                          >
                            {truncateCoverLetter(app.coverLetter)}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() =>
                                setStatusModal({
                                  application: app,
                                  newStatus: app.status,
                                })
                              }
                              className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100 transition-colors"
                            >
                              Update Status
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="border-t border-zinc-200 px-6 py-4 flex items-center justify-between">
                  <div className="text-sm text-zinc-600">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handlePageChange(pagination.currentPage - 1)
                      }
                      disabled={pagination.currentPage === 1 || isLoading}
                      className="px-4 py-2 rounded-lg border border-zinc-300 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        handlePageChange(pagination.currentPage + 1)
                      }
                      disabled={
                        pagination.currentPage === pagination.totalPages ||
                        isLoading
                      }
                      className="px-4 py-2 rounded-lg bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Status Update Modal */}
      {statusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md"
          >
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">
              Update Application Status
            </h3>

            <div className="mb-4">
              <p className="text-sm text-zinc-600 mb-4">
                Update status for{" "}
                <span className="font-medium">
                  {statusModal.application.User?.Profile?.fullName ||
                    statusModal.application.User?.name ||
                    "Applicant"}
                </span>
                's application for{" "}
                <span className="font-medium">
                  {statusModal.application.Job?.title || "the job"}
                </span>
              </p>

              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Status
              </label>
              <select
                value={statusModal.newStatus}
                onChange={(e) =>
                  setStatusModal({
                    ...statusModal,
                    newStatus: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                {APPLICATION_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setStatusModal(null)}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-zinc-700 hover:text-zinc-900 disabled:opacity-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                disabled={
                  isLoading ||
                  statusModal.newStatus === statusModal.application.status
                }
                className="px-4 py-2 rounded-lg bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Updating..." : "Update Status"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Cover Letter Modal */}
      {coverLetterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[80vh] flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-zinc-900">
                Cover Letter
              </h3>
              <button
                onClick={() => setCoverLetterModal(null)}
                className="text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-zinc-600">
                From{" "}
                <span className="font-medium">
                  {coverLetterModal.application.User?.Profile?.fullName ||
                    coverLetterModal.application.User?.name ||
                    "Applicant"}
                </span>{" "}
                for{" "}
                <span className="font-medium">
                  {coverLetterModal.application.Job?.title || "the job"}
                </span>{" "}
                at{" "}
                <span className="font-medium">
                  {coverLetterModal.application.Job?.company || "the company"}
                </span>
              </p>
            </div>

            <div className="flex-1 overflow-y-auto">
              {coverLetterModal.application.coverLetter ? (
                <div className="bg-zinc-50 rounded-lg p-4 border border-zinc-200">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-zinc-700 leading-relaxed">
                    {coverLetterModal.application.coverLetter}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-8 text-zinc-500">
                  <svg
                    className="w-12 h-12 mx-auto mb-3 text-zinc-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p>No cover letter provided</p>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-4 pt-4 border-t border-zinc-200">
              <button
                onClick={() => setCoverLetterModal(null)}
                className="px-4 py-2 rounded-lg bg-zinc-600 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
