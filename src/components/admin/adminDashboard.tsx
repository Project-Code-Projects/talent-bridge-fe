import { motion } from "framer-motion";
import DashboardStatsComponent from "./dashboardStats";
import RecentApplicants from "./recentApplicants";
import type { DashboardStats, RecentApplicant } from "../../types/admin.types";
import { fadeUp, stagger } from "../../utils/animation";
import { useState } from "react";

export default function AdminDashboard() {
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
    <section className="pt-10 pb-16">
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={fadeUp}>
          <h1 className="text-3xl font-bold text-zinc-900">Admin Dashboard</h1>
          <p className="mt-2 text-zinc-600">
            Quick overview of active jobs, applicants, and hiring progress
          </p>
        </motion.div>

        {/* Info Alert */}
        <motion.div
          variants={fadeUp}
          className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 shadow-sm"
        >
          ℹ️ Currently showing placeholder data. Connect backend for live stats.
        </motion.div>

        {/* Stats Card */}
        <motion.div variants={fadeUp}>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <DashboardStatsComponent stats={stats} />
          </div>
        </motion.div>

        {/* Recent Applicants */}
        <motion.div variants={fadeUp}>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <RecentApplicants applicants={recentApplicants} />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
