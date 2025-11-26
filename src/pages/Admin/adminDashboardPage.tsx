import { motion } from "framer-motion";
import { fadeUp, stagger } from "../../utils/animation";
import DashboardStatsComponent from "../../components/admin/dashboardStats";
import RecentApplicants from "../../components/admin/recentApplicants";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "../../services/adminDashboardService";
import type { DashboardStats, RecentApplicant } from "../../types/admin.types";

type DashboardData = {
  stats: DashboardStats;
  recentApplicants: RecentApplicant[];
};

export default function AdminDashboardPage() {
  const { data, isLoading, error, refetch } = useQuery<DashboardData>({
    queryKey: ["adminDashboardData"],
    queryFn: fetchDashboardData,
    staleTime: 1000 * 60 * 5, // 5 min cache
  });

  // Early returns to safely handle loading/error/undefined data
  if (isLoading) return <p className="p-6">Loading dashboard...</p>;
  if (error)
    return <p className="p-6 text-red-600">Failed to load dashboard.</p>;
  if (!data) return <p className="p-6">No data available</p>;

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
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-zinc-600">
              Quick overview of active jobs, applicants, and hiring progress
            </p>
          </div>

          {/* Refresh button */}
          <button
            onClick={() => refetch()}
            className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-zinc-50"
          >
            Refresh
          </button>
        </motion.div>

        {/* Info Alert */}
        <motion.div
          variants={fadeUp}
          className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 shadow-sm"
        >
          ℹ️ Dashboard data is cached. Refresh will fetch fresh data from
          backend.
        </motion.div>

        {/* Stats Card */}
        <motion.div variants={fadeUp}>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <DashboardStatsComponent stats={data.stats} isLoading={isLoading} />
          </div>
        </motion.div>

        {/* Recent Applicants */}
        <motion.div variants={fadeUp}>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <RecentApplicants
              applicants={data.recentApplicants}
              isLoading={isLoading}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
