"use client";

import { Pencil, Trash2, Flame } from "lucide-react";
import { HabitWithStats } from "@/lib/types";
import { CATEGORY_LABELS, COLOR_MAP } from "@/lib/utils";
import WeeklyGrid from "@/components/dashboard/WeeklyGrid";

interface HabitCardProps {
  habit: HabitWithStats;
  onEdit: (habit: HabitWithStats) => void;
  onDelete: (habitId: string) => void;
}

export default function HabitCard({ habit, onEdit, onDelete }: HabitCardProps) {
  const colors = COLOR_MAP[habit.color];

  return (
    <div className="card-hover p-4 group">
      <div className="flex items-start justify-between gap-3">
        {/* Icon + Info */}
        <div className="flex items-start gap-3 min-w-0">
          <div className={`w-10 h-10 ${colors.light} rounded-xl flex items-center justify-center text-xl flex-shrink-0`}>
            {habit.icon}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{habit.name}</h3>
            {habit.description && (
              <p className="text-xs text-gray-500 truncate mt-0.5">{habit.description}</p>
            )}
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className={`badge ${colors.light} ${colors.text}`}>
                {CATEGORY_LABELS[habit.category]}
              </span>
              {habit.currentStreak > 0 && (
                <span className="streak-badge">
                  <Flame className="w-3 h-3 text-orange-500" />
                  {habit.currentStreak} day streak
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            onClick={() => onEdit(habit)}
            className="btn-ghost px-2 py-1.5"
            aria-label={`Edit ${habit.name}`}
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(habit.id)}
            className="btn-ghost px-2 py-1.5 text-red-400 hover:text-red-600 hover:bg-red-50"
            aria-label={`Delete ${habit.name}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
        <WeeklyGrid weeklyStatus={habit.weeklyStatus} color={habit.color} />
        <div className="text-right flex-shrink-0 ml-2">
          <div className="text-lg font-bold text-gray-900">{habit.completionRate}%</div>
          <div className="text-[10px] text-gray-400">30-day rate</div>
        </div>
      </div>
    </div>
  );
}
