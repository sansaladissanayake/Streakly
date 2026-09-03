"use client";

import { cn, CATEGORY_LABELS } from "@/lib/utils";
import { HabitCategory } from "@/lib/types";

interface CategoryTabsProps {
  categories: HabitCategory[];
  selected: string; // "all" or a HabitCategory
  counts: Record<string, number>;
  totalCount: number;
  onSelect: (cat: string) => void;
}

export default function CategoryTabs({
  categories,
  selected,
  counts,
  totalCount,
  onSelect,
}: CategoryTabsProps) {
  const tabs = [
    { key: "all", label: "All Habits", count: totalCount },
    ...categories.map((cat) => ({
      key: cat,
      label: CATEGORY_LABELS[cat],
      count: counts[cat] ?? 0,
    })),
  ];

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-none px-5 mb-4 pb-1">
      {tabs.map(({ key, label, count }) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={cn(
            "flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap",
            selected === key
              ? "bg-gray-900 text-white shadow-sm"
              : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
          )}
        >
          {label}
          <span className={cn(
            "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
            selected === key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
          )}>
            {count}
          </span>
        </button>
      ))}
    </div>
  );
}
