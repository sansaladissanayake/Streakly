import { getLast28DaysStatus } from "@/lib/storage";
import { getWeekdayLabel, getDayNumber } from "@/lib/utils";
import { HabitColor } from "@/lib/types";

const HEAT_COLORS: Record<HabitColor, { on: string; off: string }> = {
  orange: { on: "bg-orange-400", off: "bg-orange-50" },
  purple: { on: "bg-purple-400", off: "bg-purple-50" },
  blue:   { on: "bg-blue-400",   off: "bg-blue-50" },
  green:  { on: "bg-green-400",  off: "bg-green-50" },
  pink:   { on: "bg-pink-400",   off: "bg-pink-50" },
  yellow: { on: "bg-yellow-400", off: "bg-yellow-50" },
  red:    { on: "bg-red-400",    off: "bg-red-50" },
  teal:   { on: "bg-teal-400",   off: "bg-teal-50" },
};

interface HeatmapGridProps {
  habitId: string;
  color: HabitColor;
}

export default function HeatmapGrid({ habitId, color }: HeatmapGridProps) {
  const days = getLast28DaysStatus(habitId);
  const { on, off } = HEAT_COLORS[color];

  // Group into weeks (7 columns)
  const weeks: typeof days[] = [];
  for (let i = 0; i < 28; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div>
      {/* Day labels */}
      <div className="flex gap-1 mb-1 ml-0">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <div key={i} className="w-6 text-[10px] text-gray-400 text-center font-medium">{d}</div>
        ))}
      </div>
      {/* Grid: 4 rows (weeks) × 7 cols (days) */}
      <div className="space-y-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex gap-1">
            {week.map(({ date, completed }) => (
              <div
                key={date}
                className={`w-6 h-6 rounded-md transition-colors ${
                  completed ? on : off
                }`}
                title={`${date}: ${completed ? "Completed" : "Missed"}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
