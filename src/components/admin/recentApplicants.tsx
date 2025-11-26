// Updated RecentApplicants component
import { Link } from "react-router";
import type { RecentApplicant } from "../../types/admin.types";

interface RecentApplicantsProps {
  applicants: RecentApplicant[];
  isLoading?: boolean;
}

export default function RecentApplicants({
  applicants,
  isLoading,
}: RecentApplicantsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Received":
        return "bg-blue-100 text-blue-700";
      case "Shortlisted":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Hired":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-zinc-100 text-zinc-700";
    }
  };

  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 rounded-xl bg-zinc-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (applicants.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-zinc-500">
        No recent applications
      </div>
    );
  }

  return (
    <div className="divide-y divide-zinc-100">
      {applicants.map((applicant) => (
        <Link
          key={applicant.id}
          to={`/admin/applications/${applicant.id}`}
          className="block p-4 transition-colors duration-150 hover:bg-zinc-100 dark:hover:bg-zinc-700"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 font-semibold text-zinc-700">
                  {applicant.applicantName?.charAt(0).toUpperCase() ?? "U"}
                </div>
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">
                    {applicant.applicantName ?? "Unknown"}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    {applicant.jobTitle ?? "Unknown"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {formatDate(applicant.appliedDate)}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                  applicant.currentStage
                )}`}
              >
                {applicant.currentStage}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
