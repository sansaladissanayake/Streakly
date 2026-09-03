"use client";

import { Check, Share2 } from "lucide-react";
import { getDateString, getWeekdayLabel } from "@/lib/utils";

interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
  weeklyStatus: boolean[]; // 7 days, index 0 = 6 days ago, index 6 = today
}

export default function StreakCard({ currentStreak, longestStreak, weeklyStatus }: StreakCardProps) {
  const isHot = currentStreak >= 7;

  const days = Array.from({ length: 7 }, (_, i) => ({
    label: getWeekdayLabel(getDateString(6 - i)).slice(0, 1),
    completed: weeklyStatus[i],
    isToday: i === 6,
  }));

  return (
    <div className="mx-5 mb-4 rounded-3xl bg-gradient-to-br from-[#FFF9EC] to-[#FFF0D0] border border-[#F5DFA0] p-5 shadow-sm">
      {/* Top row */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-2xl font-extrabold text-gray-900">{currentStreak} Day Streak</span>
            {isHot && (
              <span className="text-[10px] font-bold bg-orange-400 text-white px-2 py-0.5 rounded-full tracking-wide">
                HOT 🔥
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500">
            {currentStreak > 0
              ? `You're on fire! Best streak: ${longestStreak} days`
              : `Start today! Best streak: ${longestStreak} days`}
          </p>
        </div>
        <button className="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center shadow-sm">
          <Share2 className="w-3.5 h-3.5 text-gray-500" />
        </button>
      </div>

      {/* Weekly grid */}
      <div className="flex items-center gap-1.5 mt-4">
        {days.map(({ label, completed, isToday }, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
            <span className="text-[10px] font-semibold text-gray-500">{label}</span>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                completed
                  ? "bg-orange-400 shadow-sm"
                  : isToday
                  ? "bg-gray-800"
                  : "bg-white/60 border border-gray-200"
              }`}
            >
              {completed ? (
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              ) : isToday ? (
                <span className="text-[10px] text-white font-bold">·</span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
