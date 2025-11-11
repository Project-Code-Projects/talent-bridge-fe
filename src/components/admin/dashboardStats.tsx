// components/admin/DashboardStats.tsx

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { DashboardStats, PieChartData } from '../../types/admin.types';

interface DashboardStatsProps {
  stats: DashboardStats;
}

export default function DashboardStatsComponent({ stats }: DashboardStatsProps) {
  // Prepare data for pie chart
  const pieData: PieChartData[] = [
    { name: 'Received', value: stats.applicationsByStatus.received, color: '#3b82f6' },
    { name: 'Shortlisted', value: stats.applicationsByStatus.shortlisted, color: '#10b981' },
    { name: 'Rejected', value: stats.applicationsByStatus.rejected, color: '#ef4444' },
    { name: 'Hired', value: stats.applicationsByStatus.hired, color: '#8b5cf6' }
  ];

  const statCards = [
    { label: 'Total Jobs', value: stats.totalJobs, icon: '💼', color: 'bg-blue-50 text-blue-700' },
    { label: 'Total Users', value: stats.totalUsers, icon: '👥', color: 'bg-green-50 text-green-700' },
    {
      label: 'Total Applications',
      value: stats.totalApplications,
      icon: '📝',
      color: 'bg-indigo-50 text-indigo-700'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {statCards.map((card, i) => (
          <div key={i} className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-600">{card.label}</p>
                <p className="mt-2 text-3xl font-bold text-zinc-900">{card.value}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${card.color}`}>
                <span className="text-2xl">{card.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Applications by Status Chart */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-zinc-900">Applications by Status</h3>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Pie Chart */}
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={entry => {
                    // Cast the entry to the payload property first, then to PieChartData
                    const data = (entry as unknown as { payload: PieChartData }).payload;
                    if (!data) return '';

                    return `${data.name} ${((data.value / stats.totalApplications) * 100).toFixed(0)}%`;
                  }}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Status Cards */}
          <div className="space-y-3">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-zinc-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-medium text-zinc-700">{item.name}</span>
                </div>
                <span className="text-lg font-bold text-zinc-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
