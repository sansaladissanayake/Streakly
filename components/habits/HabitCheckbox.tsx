"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { HabitColor } from "@/lib/types";

const CHECKBOX_COLORS: Record<HabitColor, string> = {
  orange: "bg-orange-500 border-orange-500",
  purple: "bg-purple-500 border-purple-500",
  blue:   "bg-blue-500 border-blue-500",
  green:  "bg-green-500 border-green-500",
  pink:   "bg-pink-500 border-pink-500",
  yellow: "bg-yellow-400 border-yellow-400",
  red:    "bg-red-500 border-red-500",
  teal:   "bg-teal-500 border-teal-500",
};

interface HabitCheckboxProps {
  checked: boolean;
  onChange: () => void;
  color: HabitColor;
  label?: string;
  disabled?: boolean;
}

export default function HabitCheckbox({ checked, onChange, color, label, disabled }: HabitCheckboxProps) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      aria-label={label ? `Mark "${label}" as ${checked ? "incomplete" : "complete"}` : undefined}
      onClick={onChange}
      disabled={disabled}
      className={cn(
        "w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150",
        checked
          ? `${CHECKBOX_COLORS[color]} habit-checkbox-checked`
          : "bg-white border-gray-300 hover:border-gray-400",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {checked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
    </button>
  );
}
