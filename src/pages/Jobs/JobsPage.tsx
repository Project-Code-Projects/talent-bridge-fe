import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "../../utils/animation";
import Footer from "../../components/landing-page/Footer";
import { Link, useSearchParams } from "react-router-dom";
import {
  selectError,
  selectIsLoading,
  selectJobs,
  selectPagination,
  useJobStore,
} from "../../stores/JobsStore";
import LocationIcon from "../../assets/LocationIcon.png";
import SearchBar from "../../components/layout/SearchBar";

export default function JobsPage() {
  const [params, setParams] = useSearchParams();
  const pageParam = Math.max(1, Number(params.get("page") || 1));
  const limit = 10; // you can expose a dropdown to change this

  const jobs = useJobStore(selectJobs);
  const isLoading = useJobStore(selectIsLoading);
  const error = useJobStore(selectError);
  const { total, totalPages, currentPage } = useJobStore(selectPagination);
  const fetchJobs = useJobStore((s) => s.fetchJobs);
  const clearError = useJobStore((s) => s.clearError);
  const [searchParams, setSearchParams] = useState({
    search: "",
    filterBy: "",
  });

  useEffect(() => {
    clearError();
    fetchJobs(pageParam, limit, searchParams.search, searchParams.filterBy);
  }, [
    pageParam,
    limit,
    clearError,
    searchParams.search,
    searchParams.filterBy,
    fetchJobs,
  ]);

  const handleSearch = (search: string, filterBy?: string) => {
    setSearchParams({ search, filterBy: filterBy || "" });
    setParams({ page: "1" }); // Reset to first page when searching
    fetchJobs(1, limit, search, filterBy);
  };

  const jobFilterOptions = [
    { value: "title", label: "By Title" },
    { value: "company", label: "By Company" },
    { value: "location", label: "By Location" },
  ];

  const goTo = (p: number) => setParams({ page: String(p) });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-zinc-600 font-medium">
            Loading amazing opportunities...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-zinc-600 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => fetchJobs(pageParam, limit)}
              className="inline-flex items-center rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-zinc-800 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={clearError}
              className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="pt-28 pb-16 px-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              Available Positions
            </h1>
            <p className="text-lg text-zinc-600 mb-6">
              Showing page {currentPage} of {totalPages} • {total} total jobs
            </p>

            <SearchBar
              onSearch={handleSearch}
              placeholder="Search jobs by title, company, or location..."
              filterOptions={jobFilterOptions}
              initialSearch={searchParams.search}
              initialFilter={searchParams.filterBy}
              className="mb-8"
            />
          </motion.div>

          {jobs.length === 0 ? (
            <div className="text-center py-16 bg-zinc-50 rounded-2xl">
              <div className="text-6xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-2">
                No jobs available right now
              </h3>
              <p className="text-zinc-600">
                Check back soon for new opportunities!
              </p>
            </div>
          ) : (
            <motion.div
              variants={stagger}
              initial="initial"
              animate="animate"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {jobs.map((job) => (
                <motion.div key={job.id} variants={fadeUp}>
                  <Link
                    to={`/jobs/${job.id}`}
                    className="block h-full rounded-xl border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-zinc-900 line-clamp-2">
                        {job.title}
                      </h3>
                      <span className="ml-2 inline-flex shrink-0 items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 capitalize">
                        {job.hiringStatus}
                      </span>
                    </div>

                    <p className="text-sm font-medium text-zinc-600 mb-4">
                      {job.company}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-zinc-500 mb-4">
                      <img
                        src={LocationIcon}
                        alt="location"
                        className="w-5 h-5"
                      />
                      {job.location}
                      <span>•</span>
                      <span>{job.employmentType}</span>
                    </div>

                    <div className="pt-4 border-t border-zinc-100">
                      <p className="text-base font-semibold text-blue-600">
                        {job.salaryRange}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-3">
              <button
                className="rounded-lg border px-3 py-2 disabled:opacity-50"
                disabled={currentPage <= 1}
                onClick={() => goTo(currentPage - 1)}
              >
                ← Prev
              </button>
              <span className="text-sm text-zinc-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="rounded-lg border px-3 py-2 disabled:opacity-50"
                disabled={currentPage >= totalPages}
                onClick={() => goTo(currentPage + 1)}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
