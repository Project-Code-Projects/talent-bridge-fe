// src/components/admin/dashboardStats.tsx
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Link } from "react-router-dom";
import type { DashboardStats, PieChartData } from "../../types/admin.types";

interface DashboardStatsProps {
  stats?: DashboardStats;
  isLoading?: boolean;
}

export default function DashboardStatsComponent({
  stats,
  isLoading,
}: DashboardStatsProps) {
  if (isLoading || !stats) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-28 rounded-xl bg-zinc-100 animate-pulse"
            />
          ))}
        </div>
        <div className="h-64 rounded-xl bg-zinc-100 animate-pulse" />
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    pending: "#3b82f6",
    reviewing: "#f59e0b",
    accepted: "#10b981",
    rejected: "#ef4444",
    hiring: "#8b5cf6",
    applied: "#6366f1",
    interviewing: "#f97316",
    hired: "#22c55e",
  };

  const pieData: PieChartData[] = Object.entries(
    stats.applicationsByStatus
  ).map(([status, value]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: value || 0,
    color: statusColors[status] || "#9ca3af",
  }));

  // Map cards to corresponding admin routes
  const statCards = [
    {
      label: "Total Jobs",
      value: stats.totalJobs,
      icon: "💼",
      color: "bg-blue-50 text-blue-700",
      link: "/admin/jobs",
    },
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: "👥",
      color: "bg-green-50 text-green-700",
      link: "/admin/users",
    },
    {
      label: "Total Applications",
      value: stats.totalApplications,
      icon: "📝",
      color: "bg-indigo-50 text-indigo-700",
      link: "/admin/applications",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {statCards.map((card, i) => (
          <Link to={card.link} key={i}>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-600">{card.label}</p>
                  <p className="mt-2 text-3xl font-bold text-zinc-900">
                    {card.value}
                  </p>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg ${card.color}`}
                >
                  <span className="text-2xl">{card.icon}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Applications by Status Pie Chart */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-zinc-900">
          Applications by Status
        </h3>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Pie Chart */}
          <div className="flex items-center justify-center h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  labelLine={false}
                  label={(entry) => {
                    const data = entry.payload as PieChartData;
                    const total = stats.totalApplications || 1;
                    const percentage = ((data.value / total) * 100).toFixed(0);
                    return `${data.name} ${percentage}%`;
                  }}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Status Summary Cards */}
          <div className="space-y-3">
            {pieData.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-zinc-200 p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium text-zinc-700">
                    {item.name}
                  </span>
                </div>
                <span className="text-lg font-bold text-zinc-900">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
