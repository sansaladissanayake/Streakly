import { Flame } from "lucide-react";

interface StreakBadgeProps {
  streak: number;
  size?: "sm" | "md";
}

export default function StreakBadge({ streak, size = "sm" }: StreakBadgeProps) {
  if (streak === 0) return null;

  const isHot = streak >= 7;

  if (size === "md") {
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold ${
        isHot ? "bg-orange-50 text-orange-600" : "bg-gray-100 text-gray-600"
      }`}>
        <Flame className={`w-4 h-4 ${isHot ? "text-orange-500" : "text-gray-400"}`} />
        <span>{streak} day streak</span>
      </div>
    );
  }

  return (
    <span className={`streak-badge ${isHot ? "" : "bg-gray-100 text-gray-500"}`}>
      <Flame className={`w-3 h-3 ${isHot ? "text-orange-500" : "text-gray-400"}`} />
      {streak}
    </span>
  );
}
