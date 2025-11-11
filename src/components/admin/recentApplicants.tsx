import { Link } from 'react-router';
import type { RecentApplicant } from '../../types/admin.types';

interface RecentApplicantsProps {
  applicants: RecentApplicant[];
}

export default function RecentApplicants({ applicants }: RecentApplicantsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Received':
        return 'bg-blue-100 text-blue-700';
      case 'Shortlisted':
        return 'bg-green-100 text-green-700';
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      case 'Hired':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-zinc-100 text-zinc-700';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-200 p-6">
        <h3 className="text-lg font-semibold text-zinc-900">Recent Applications</h3>
        <Link to="/admin/applications" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
          View all →
        </Link>
      </div>

      <div className="divide-y divide-zinc-100">
        {applicants.length === 0 ? (
          <div className="p-8 text-center text-sm text-zinc-500">No recent applications</div>
        ) : (
          applicants.map(applicant => (
            <Link
              key={applicant.id}
              to={`/admin/applications/${applicant.id}`}
              className="block p-4 transition hover:bg-zinc-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 font-semibold text-zinc-700">
                      {applicant.applicantName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-zinc-900">{applicant.applicantName}</p>
                      <p className="text-sm text-zinc-600">{applicant.jobTitle}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs text-zinc-500">{formatDate(applicant.appliedDate)}</span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(applicant.currentStage)}`}
                  >
                    {applicant.currentStage}
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
