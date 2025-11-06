export default function DashboardStat({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend: "up" | "down";
}) {
  return (
    <div className="rounded-xl border border-zinc-100 p-3">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="mt-1 flex items-center gap-2">
        <div className="text-xl font-semibold">{value}</div>
        {trend === "up" ? (
          <span className="text-xs text-green-600">▲</span>
        ) : (
          <span className="text-xs text-red-600">▼</span>
        )}
      </div>
    </div>
  );
}
