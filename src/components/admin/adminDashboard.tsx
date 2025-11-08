import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DashboardStatsComponent from "./dashboardStats";
import RecentApplicants from "./recentApplicants";
import { adminService } from "../../services/adminService";
import type { DashboardStats, RecentApplicant } from "../../types/admin.types";
import { fadeUp, stagger } from "../../utils/animation";

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentApplicants, setRecentApplicants] = useState<RecentApplicant[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch dashboard stats and recent applicants
        const [statsData, applicantsData] = await Promise.all([
          adminService.getDashboardStats(),
          adminService.getRecentApplicants(10),
        ]);

        setStats(statsData);
        setRecentApplicants(applicantsData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(
          "Failed to load dashboard data. Using placeholder data for now."
        );

        // Placeholder data for development
        setStats({
          totalJobs: 12,
          totalUsers: 247,
          totalApplications: 89,
          applicationsByStatus: {
            received: 35,
            shortlisted: 28,
            rejected: 18,
            hired: 8,
          },
        });

        setRecentApplicants([
          {
            id: 1,
            applicantName: "John Doe",
            jobTitle: "Senior Frontend Developer",
            currentStage: "Shortlisted",
            appliedDate: new Date().toISOString(),
          },
          {
            id: 2,
            applicantName: "Jane Smith",
            jobTitle: "Product Designer",
            currentStage: "Received",
            appliedDate: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            id: 3,
            applicantName: "Mike Johnson",
            jobTitle: "Backend Engineer",
            currentStage: "Hired",
            appliedDate: new Date(Date.now() - 172800000).toISOString(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-zinc-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="pt-10 pb-16 px-4">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          {/* Header Section */}
          <motion.div variants={fadeUp} className="text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-600 shadow">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              Admin Dashboard
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Hiring Overview
            </h1>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 md:text-lg">
              Welcome back! Here's what's happening with your hiring process.
            </p>
          </motion.div>

          {/* Error Alert */}
          {error && (
            <motion.div
              variants={fadeUp}
              className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800 shadow-sm"
            >
              ⚠️ {error}
            </motion.div>
          )}

          {/* Stats Section */}
          {stats && (
            <motion.div variants={fadeUp}>
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <DashboardStatsComponent stats={stats} />
              </div>
            </motion.div>
          )}

          {/* Recent Applicants Section */}
          <motion.div variants={fadeUp}>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <RecentApplicants applicants={recentApplicants} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
