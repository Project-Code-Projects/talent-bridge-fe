import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  selectError,
  selectIsLoading,
  selectJobById,
  selectSelectedJob,
  useJobStore,
} from "../../stores/JobsStore";
import { motion } from "framer-motion";
import { fadeUp } from "../../utils/animation";
import Footer from "../../components/landing-page/Footer";
import CheckIcon from "../../assets/CheckIcon.png";
import LocationIcon from "../../assets/LocationIcon.png";
import ToDoListIcon from "../../assets/ToDoListIcon.png";
import BenefitsIcon from "../../assets/BenefitsIcon.png";

export default function JobDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const selectedJob = useJobStore(selectSelectedJob);
  const isLoading = useJobStore(selectIsLoading);
  const error = useJobStore(selectError);
  const fetchJobById = useJobStore((state) => state.fetchJobById);
  const clearSelectedJob = useJobStore((state) => state.clearSelectedJob);
  const clearError = useJobStore((state) => state.clearError);

  // Parse id to number
  const jobId = id ? Number(id) : undefined;

  // Check if job exists in cache
  const cachedJob = useJobStore((state) =>
    jobId ? selectJobById(jobId)(state) : undefined
  );

  useEffect(() => {
    if (!jobId) return;

    clearError();

    // If we have cached job and no selected job, use cached data
    if (cachedJob && !selectedJob) {
      useJobStore.setState({ selectedJob: cachedJob });
      return;
    }

    // Only fetch if we don't have the job data
    if (!selectedJob || selectedJob.id !== jobId) {
      fetchJobById(jobId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  useEffect(() => {
    return () => {
      clearSelectedJob();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading && !selectedJob) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-zinc-600 font-medium">
            Loading job details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !selectedJob) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">❌</div>
          <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>
          <p className="text-zinc-600 mb-6">
            {error || "This job posting does not exist or has been removed"}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate("/jobs")}
              className="inline-flex items-center rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-zinc-800 transition-colors"
            >
              ← Back to Jobs
            </button>
            {jobId && (
              <button
                onClick={() => fetchJobById(jobId)}
                className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 transition-colors"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="pt-28 pb-16 px-4">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 mb-6 hover:gap-3 transition-all"
          >
            ← Back to all jobs
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden"
          >
            {/* Header */}
            <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-8 border-b border-zinc-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-zinc-900 mb-2">
                    {selectedJob.title}
                  </h1>
                  <p className="text-xl text-zinc-700 font-medium">
                    {selectedJob.company}
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 capitalize">
                  {selectedJob.hiringStatus}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-zinc-600">
                <span className="flex items-center gap-1">
                  <img src={LocationIcon} alt="location" className="w-5 h-5" />{" "}
                  {selectedJob.location}
                </span>
                <span>•</span>
                <span className="font-medium">
                  {selectedJob.employmentType}
                </span>
                <span>•</span>
                <span className="font-semibold text-blue-600">
                  {selectedJob.salaryRange}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Short Description */}
              <motion.div variants={fadeUp}>
                <p className="text-lg text-zinc-700 leading-relaxed">
                  {selectedJob.shortDescription}
                </p>
              </motion.div>

              {/* Responsibilities */}
              <motion.div variants={fadeUp}>
                <h2 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
                  <img
                    src={ToDoListIcon}
                    alt="responsibilites"
                    className="w-5 h-5"
                  />{" "}
                  Responsibilities
                </h2>
                <div className="prose prose-zinc max-w-none bg-zinc-50 p-6 rounded-lg">
                  <p className="text-zinc-700 leading-relaxed whitespace-pre-line">
                    {selectedJob.responsibilities}
                  </p>
                </div>
              </motion.div>

              {/* Requirements */}
              <motion.div variants={fadeUp}>
                <h2 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
                  <img src={CheckIcon} alt="check" className="w-5 h-5" />{" "}
                  Requirements
                </h2>
                <div className="prose prose-zinc max-w-none bg-zinc-50 p-6 rounded-lg">
                  <p className="text-zinc-700 leading-relaxed whitespace-pre-line">
                    {selectedJob.requirements}
                  </p>
                </div>
              </motion.div>

              {/* Benefits */}
              <motion.div variants={fadeUp}>
                <h2 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
                  <img src={BenefitsIcon} alt="benefits" className="w-5 h-5" />{" "}
                  Benefits
                </h2>
                <div className="prose prose-zinc max-w-none bg-blue-50 p-6 rounded-lg">
                  <p className="text-zinc-700 leading-relaxed whitespace-pre-line">
                    {selectedJob.benefits}
                  </p>
                </div>
              </motion.div>

              {/* Deadline & Apply */}
              <motion.div
                variants={fadeUp}
                className="pt-6 border-t border-zinc-200"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-zinc-600 mb-1">
                      Application Deadline
                    </p>
                    <p className="text-lg font-semibold text-zinc-900">
                      {new Date(selectedJob.deadline).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                  <button className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700 transition-colors">
                    Apply Now →
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
}
