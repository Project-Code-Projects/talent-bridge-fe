import { motion } from "framer-motion";
import DashboardStatsComponent from "./dashboardStats";
import RecentApplicants from "./recentApplicants";
import type { DashboardStats, RecentApplicant } from "../../types/admin.types";
import { fadeUp, stagger } from "../../utils/animation";
import { useState } from "react";

export default function AdminDashboard() {
  // Remove useEffect and API calls, just use static data
  const [stats] = useState<DashboardStats>({
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

  const [recentApplicants] = useState<RecentApplicant[]>([
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

          {/* Info Alert */}
          <motion.div
            variants={fadeUp}
            className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 shadow-sm"
          >
            ℹ️ Showing placeholder data. Connect backend endpoints for real-time
            stats.
          </motion.div>

          {/* Stats Section */}
          <motion.div variants={fadeUp}>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <DashboardStatsComponent stats={stats} />
            </div>
          </motion.div>

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
