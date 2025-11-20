import { useCallback, useEffect, useState } from "react";
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
  const page = Number(params.get("page")) || 1;
  const currentPageFromUrl = page < 1 ? 1 : page;
  const limit = 10; // can expose a dropdown to change this

  const jobs = useJobStore(selectJobs);
  const isLoading = useJobStore(selectIsLoading);
  const error = useJobStore(selectError);
  const {
    total,
    totalPages,
    currentPage,
    limit: storeLimit,
  } = useJobStore(selectPagination);
  const fetchJobs = useJobStore((s) => s.fetchJobs);
  const clearError = useJobStore((s) => s.clearError);
  const [searchParamsState, setSearchParamsState] = useState<{
    search: string;
    sort: "newest" | "oldest";
  }>({
    search: "",
    sort: "newest",
  });

  useEffect(() => {
    clearError();
    fetchJobs(
      currentPageFromUrl,
      storeLimit || limit,
      searchParamsState.search,
      searchParamsState.sort
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentPageFromUrl,
    limit,
    searchParamsState.search,
    searchParamsState.sort,
  ]);

  const handleSearch = useCallback(
    (search: string, sortValue?: string) => {
      setSearchParamsState((prev) => ({
        search,
        sort: (sortValue as "newest" | "oldest") || prev.sort,
      }));
      // reset to first page whenever search/sort changes
      setParams({ page: "1" });
    },
    [setParams]
  );

  const jobSortOptions = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
  ];

  const goTo = (page: number) => {
    if (page < 1 || (totalPages && page > totalPages)) return;
    setParams({ page: String(page) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasSearch = searchParamsState.search.trim().length > 0;

  if (isLoading && jobs.length === 0) {
    return (
      <>
        <section className="pt-28 pb-16 px-4 min-h-[70vh]">
          <div className="mx-auto max-w-7xl flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent" />
              <p className="mt-4 text-zinc-600 font-medium">
                Loading amazing opportunities...
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <section className="flex-1 pt-28 pb-16 px-4">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-4">
              <h2 className="text-lg font-semibold text-red-800">
                Something went wrong
              </h2>
              <p className="mt-2 text-red-700">{error}</p>
              <button
                onClick={() => {
                  clearError();
                  fetchJobs(
                    currentPageFromUrl,
                    storeLimit || limit,
                    searchParamsState.search,
                    searchParamsState.sort
                  );
                }}
                className="mt-4 inline-flex items-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Try again
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex-1 pt-28 pb-16 px-4">
        <div className="mx-auto max-w-7xl">
          {/* Header + search */}
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
              Available Positions
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-zinc-600 mb-6">
              Showing page {currentPage || currentPageFromUrl} of{" "}
              {totalPages || 1} • {total || jobs.length} total jobs
            </motion.p>

            <motion.div variants={fadeUp}>
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search jobs by title, company, or location..."
                filterOptions={jobSortOptions}
                initialSearch={searchParamsState.search}
                initialFilter={searchParamsState.sort}
                className="mb-4"
              />
            </motion.div>
          </motion.div>

          {/* Jobs list */}
          {isLoading && jobs.length === 0 ? (
            // Initial load with no data yet
            <div className="mx-auto max-w-7xl flex items-center justify-center min-h-[30vh]">
              <div className="text-center">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent" />
                <p className="mt-4 text-zinc-600 font-medium">
                  Loading amazing opportunities...
                </p>
              </div>
            </div>
          ) : jobs.length === 0 ? (
            // No results (after search / filters)
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-12 text-center">
              <p className="text-zinc-600">
                {hasSearch
                  ? `No jobs found matching "${searchParamsState.search}". Try a different search or sort.`
                  : "No jobs found at the moment. Please check back later."}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {jobs.map((job) => (
                <motion.div
                  key={job.id}
                  variants={fadeUp}
                  className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold text-zinc-900 group-hover:text-indigo-600 transition-colors">
                        {job.title}
                      </h2>
                      <p className="mt-1 text-sm font-medium text-zinc-700">
                        {job.company}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
                        <span className="inline-flex items-center gap-1">
                          <img
                            src={LocationIcon}
                            alt="Location"
                            className="h-4 w-4 opacity-80"
                          />
                          {job.location}
                        </span>
                        {job.employmentType && (
                          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                            {job.employmentType}
                          </span>
                        )}
                        {job.salaryRange && (
                          <span className="text-xs text-zinc-500">
                            {job.salaryRange}
                          </span>
                        )}
                      </div>
                    </div>
                    {job.deadline && (
                      <span className="rounded-lg bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                        Apply by {new Date(job.deadline).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  {job.shortDescription && (
                    <p className="mt-4 text-sm text-zinc-600 line-clamp-3">
                      {job.shortDescription}
                    </p>
                  )}

                  <div className="mt-6 flex items-center justify-between">
                    {job.hiringStatus && (
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          job.hiringStatus === "Open"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-zinc-100 text-zinc-600"
                        }`}
                      >
                        {job.hiringStatus}
                      </span>
                    )}
                    <Link
                      to={`/jobs/${job.id}`}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      View details →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-3">
              <button
                className="rounded-lg border px-3 py-2 text-sm disabled:opacity-50"
                disabled={currentPageFromUrl <= 1}
                onClick={() => goTo(currentPageFromUrl - 1)}
              >
                ← Previous
              </button>

              {/* Simple numeric page buttons */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, idx) => {
                  const page = idx + 1;
                  const isActive = page === currentPageFromUrl;
                  return (
                    <button
                      key={page}
                      onClick={() => goTo(page)}
                      className={`rounded-lg px-3 py-2 text-sm ${
                        isActive
                          ? "bg-indigo-600 text-white"
                          : "border bg-white text-zinc-700 hover:bg-zinc-50"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                className="rounded-lg border px-3 py-2 text-sm disabled:opacity-50"
                disabled={currentPageFromUrl >= totalPages}
                onClick={() => goTo(currentPageFromUrl + 1)}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
