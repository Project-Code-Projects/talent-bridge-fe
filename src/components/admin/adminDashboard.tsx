// pages/Admin/AdminDashboard.tsx

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardStatsComponent from './dashboardStats';
import RecentApplicants from './RecentApplicants';
import { adminService } from '../../services/adminService';
import type { DashboardStats, RecentApplicant } from '../../types/admin.types';
import { fadeUp, stagger } from '../../utils/animation';

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentApplicants, setRecentApplicants] = useState<RecentApplicant[]>([]);
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
          adminService.getRecentApplicants(10)
        ]);

        setStats(statsData);
        setRecentApplicants(applicantsData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Using placeholder data for now.');

        // Placeholder data for development
        setStats({
          totalJobs: 12,
          totalUsers: 247,
          totalApplications: 89,
          applicationsByStatus: {
            received: 35,
            shortlisted: 28,
            rejected: 18,
            hired: 8
          }
        });

        setRecentApplicants([
          {
            id: 1,
            applicantName: 'John Doe',
            jobTitle: 'Senior Frontend Developer',
            currentStage: 'Shortlisted',
            appliedDate: new Date().toISOString()
          },
          {
            id: 2,
            applicantName: 'Jane Smith',
            jobTitle: 'Product Designer',
            currentStage: 'Received',
            appliedDate: new Date(Date.now() - 86400000).toISOString()
          },
          {
            id: 3,
            applicantName: 'Mike Johnson',
            jobTitle: 'Backend Engineer',
            currentStage: 'Hired',
            appliedDate: new Date(Date.now() - 172800000).toISOString()
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
          <p className="mt-4 text-sm text-zinc-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6">
      <motion.div variants={fadeUp}>
        <h1 className="text-3xl font-bold text-zinc-900">Dashboard</h1>
        <p className="mt-2 text-zinc-600">Welcome back! Here's what's happening with your hiring process.</p>
      </motion.div>

      {error && (
        <motion.div
          variants={fadeUp}
          className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800"
        >
          ⚠️ {error}
        </motion.div>
      )}

      {stats && (
        <motion.div variants={fadeUp}>
          <DashboardStatsComponent stats={stats} />
        </motion.div>
      )}

      <motion.div variants={fadeUp}>
        <RecentApplicants applicants={recentApplicants} />
      </motion.div>
    </motion.div>
  );
}
