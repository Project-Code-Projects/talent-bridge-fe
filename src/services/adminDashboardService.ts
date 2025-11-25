import { adminService } from "./adminService";

// Fetch Dashboard Stats + Recent Applicants together
export const fetchDashboardData = async () => {
  const [stats, recentApplicants] = await Promise.all([
    adminService.getDashboardStats(),
    adminService.getRecentApplicants(10),
  ]);
  return { stats, recentApplicants };
};
