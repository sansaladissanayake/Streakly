"use client";

import { Check, Play, Flame } from "lucide-react";
import { HabitWithStats } from "@/lib/types";
import { COLOR_MAP, CATEGORY_LABELS } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface HabitItemProps {
  habit: HabitWithStats;
  onToggle: () => void;
}

export default function HabitItem({ habit, onToggle }: HabitItemProps) {
  const colors = COLOR_MAP[habit.color];
  const done = habit.isCompletedToday;

  return (
    <div
      className={cn(
        "mx-5 mb-3 rounded-2xl bg-white border shadow-card p-4 transition-all duration-200",
        done ? "border-green-100 opacity-80" : "border-gray-100 hover:border-gray-200 hover:shadow-card-hover"
      )}
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className={cn(
          "w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0",
          colors.light,
          done && "opacity-60"
        )}>
          {habit.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn(
              "text-sm font-semibold truncate",
              done ? "text-gray-400 line-through" : "text-gray-900"
            )}>
              {habit.name}
            </span>
            <span className={cn("badge text-[10px]", colors.light, colors.text)}>
              {CATEGORY_LABELS[habit.category]}
            </span>
          </div>

          {/* Sub info */}
          <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-400 flex-wrap">
            {habit.description && (
              <span className="truncate max-w-[120px]">{habit.description}</span>
            )}
            {habit.description && habit.currentStreak > 0 && (
              <span className="text-gray-300">·</span>
            )}
            {habit.currentStreak > 0 && (
              <span className="flex items-center gap-0.5 text-orange-500 font-medium">
                <Flame className="w-3 h-3" />
                Streak: {habit.currentStreak}d
              </span>
            )}
          </div>

          {/* Weekly dots */}
          <div className="flex items-center gap-1 mt-2">
            {habit.weeklyStatus.map((completed, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 rounded-full flex-1 transition-all",
                  completed
                    ? colors.dot
                    : i === 6
                    ? "bg-gray-200"
                    : "bg-gray-100"
                )}
              />
            ))}
          </div>
        </div>

        {/* Action button */}
        <div className="flex-shrink-0 ml-1">
          {done ? (
            <button
              onClick={onToggle}
              className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center shadow-sm transition-transform active:scale-95"
              aria-label={`Undo ${habit.name}`}
            >
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </button>
          ) : (
            <button
              onClick={onToggle}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 shadow-sm",
                colors.bg, "text-white"
              )}
              aria-label={`Complete ${habit.name}`}
            >
              <Play className="w-3 h-3 fill-white" />
              Start
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
