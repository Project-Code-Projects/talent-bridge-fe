import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useAdminJobStore } from "../../stores/adminJobStore";
import { fadeUp, stagger } from "../../utils/animation";
import { Link } from "react-router-dom";
import EditIcon from "../../assets/EditIcon.png";
import DeleteIcon from "../../assets/DeleteIcon.png";
import SearchBar from "../../components/layout/SearchBar";

export default function AdminJobsPage() {
  const {
    jobs,
    pagination,
    isLoading,
    error,
    fetchAllJobs,
    deleteJob,
    clearError,
  } = useAdminJobStore();
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useState({
    search: "",
    filterBy: "",
  });

  useEffect(() => {
    clearError();
    fetchAllJobs(1, 10, searchParams.search, searchParams.filterBy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.search, searchParams.filterBy]);

  const handleSearch = useCallback(
    (search: string, filterBy?: string) => {
      setSearchParams({ search, filterBy: filterBy || "" });
      fetchAllJobs(1, pagination.limit, search, filterBy);
    },
    [fetchAllJobs, pagination.limit]
  );

  const handlePageChange = (newPage: number) => {
    fetchAllJobs(
      newPage,
      pagination.limit,
      searchParams.search,
      searchParams.filterBy
    );
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteJob(id);
      setDeleteConfirm(null);
      // Reload current page after deletion
      fetchAllJobs(pagination.currentPage, pagination.limit);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (isLoading && jobs.length === 0) {
    return (
      <div className="min-h-screen pt-10 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-zinc-600 font-medium">Loading jobs...</p>
        </div>
      </div>
    );
  }

  const jobFilterOptions = [
    { value: "title", label: "By Title" },
    { value: "company", label: "By Company" },
    { value: "location", label: "By Location" },
  ];

  return (
    <section className="pt-10 pb-16">
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Job Postings</h1>
            <p className="mt-2 text-zinc-600">
              Showing {jobs.length} of {pagination.total} jobs
            </p>
          </div>
          <Link
            to="/admin/jobs/create"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-700 transition-colors"
          >
            <span>+</span> Create New Job
          </Link>
        </motion.div>

        <motion.div variants={fadeUp}>
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search jobs by title, company, or location..."
            filterOptions={jobFilterOptions}
            initialSearch={searchParams.search}
            initialFilter={searchParams.filterBy}
          />
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

        {/* Jobs Table */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden"
        >
          {jobs.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-2">No jobs posted yet</h3>
              <p className="text-zinc-600 mb-6">
                Get started by creating your first job posting
              </p>
              <Link
                to="/admin/jobs/create"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-700"
              >
                <span>+</span> Create Job
              </Link>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-zinc-50 border-b border-zinc-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                        Job Title
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                        Salary
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                        Deadline
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {jobs.map((job) => (
                      <tr
                        key={job.id}
                        className="hover:bg-zinc-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="font-medium text-zinc-900">
                                {job.title}
                              </p>
                              <p className="text-sm text-zinc-500">
                                {job.employmentType}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-zinc-700">
                          {job.company}
                        </td>
                        <td className="px-6 py-4 text-sm text-zinc-700">
                          {job.location || "Remote"}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-blue-600">
                          {job.salaryRange || "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                              job.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {job.isActive ? job.hiringStatus : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-zinc-700">
                          {job.deadline
                            ? new Date(job.deadline).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )
                            : "No deadline"}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to={`/admin/jobs/${job.id}/edit`}
                              className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors"
                            >
                              <img
                                src={EditIcon}
                                alt="edit"
                                className="w-5 h-5"
                              />{" "}
                              Edit
                            </Link>
                            <button
                              onClick={() => setDeleteConfirm(job.id!)}
                              className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 transition-colors"
                            >
                              <img
                                src={DeleteIcon}
                                alt="delete"
                                className="w-5 h-5"
                              />{" "}
                              Delete
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

        {/* Delete Confirmation Modal */}
        {deleteConfirm !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl"
            >
              <h3 className="text-xl font-bold text-zinc-900 mb-2">
                Delete Job?
              </h3>
              <p className="text-zinc-600 mb-6">
                Are you sure you want to delete this job posting? This action
                cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 rounded-xl border border-zinc-300 text-zinc-700 hover:bg-zinc-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
