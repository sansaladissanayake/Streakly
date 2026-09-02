import { getDateString, getWeekdayLabel, getDayNumber } from "@/lib/utils";

interface WeeklyGridProps {
  weeklyStatus: boolean[];
  color: string;
}

const DOT_COLORS: Record<string, string> = {
  orange: "bg-orange-400",
  purple: "bg-purple-400",
  blue:   "bg-blue-400",
  green:  "bg-green-400",
  pink:   "bg-pink-400",
  yellow: "bg-yellow-400",
  red:    "bg-red-400",
  teal:   "bg-teal-400",
};

export default function WeeklyGrid({ weeklyStatus, color }: WeeklyGridProps) {
  const days = Array.from({ length: 7 }, (_, i) => ({
    date: getDateString(6 - i),
    completed: weeklyStatus[i],
    isToday: i === 6,
  }));

  const dotColor = DOT_COLORS[color] ?? "bg-gray-400";

  return (
    <div className="flex gap-1.5">
      {days.map(({ date, completed, isToday }) => (
        <div key={date} className="flex flex-col items-center gap-1">
          <span className={`text-[10px] font-medium ${isToday ? "text-brand-600" : "text-gray-400"}`}>
            {getWeekdayLabel(date).charAt(0)}
          </span>
          <div
            className={`w-5 h-5 rounded-md transition-all ${
              completed
                ? `${dotColor} shadow-sm`
                : isToday
                ? "bg-gray-200 ring-2 ring-brand-300 ring-offset-1"
                : "bg-gray-100"
            }`}
            title={`${date}: ${completed ? "Done" : "Missed"}`}
          />
          <span className={`text-[9px] ${isToday ? "text-brand-600 font-semibold" : "text-gray-300"}`}>
            {getDayNumber(date)}
          </span>
        </div>
      ))}
    </div>
  );
}
