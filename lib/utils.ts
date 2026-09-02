import { clsx, type ClassValue } from "clsx";
import { HabitCategory, HabitColor } from "./types";

// ─── Class name helper ────────────────────────────────────────────────────────

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// ─── Date helpers ─────────────────────────────────────────────────────────────

/** Returns today as YYYY-MM-DD in local time */
export function getTodayString(): string {
  return toDateString(new Date());
}

/** Returns a date N days ago as YYYY-MM-DD */
export function getDateString(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return toDateString(d);
}

export function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Days between two YYYY-MM-DD strings (positive if b > a) */
export function daysBetween(a: string, b: string): number {
  const da = new Date(a).getTime();
  const db = new Date(b).getTime();
  return Math.round((db - da) / (1000 * 60 * 60 * 24));
}

/** Format a YYYY-MM-DD date to a readable string */
export function formatDate(dateStr: string, options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", options ?? { weekday: "short", month: "short", day: "numeric" });
}

/** Returns greeting based on current hour */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

/** Short weekday label for a date string */
export function getWeekdayLabel(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", { weekday: "short" });
}

/** Day number (1-31) for a date string */
export function getDayNumber(dateStr: string): number {
  return new Date(dateStr + "T00:00:00").getDate();
}

// ─── ID generation ─────────────────────────────────────────────────────────

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// ─── Color helpers ─────────────────────────────────────────────────────────

export const COLOR_MAP: Record<HabitColor, { bg: string; text: string; border: string; light: string; dot: string }> = {
  orange: {
    bg: "bg-orange-500",
    text: "text-orange-600",
    border: "border-orange-300",
    light: "bg-orange-50",
    dot: "bg-orange-400",
  },
  purple: {
    bg: "bg-purple-500",
    text: "text-purple-600",
    border: "border-purple-300",
    light: "bg-purple-50",
    dot: "bg-purple-400",
  },
  blue: {
    bg: "bg-blue-500",
    text: "text-blue-600",
    border: "border-blue-300",
    light: "bg-blue-50",
    dot: "bg-blue-400",
  },
  green: {
    bg: "bg-green-500",
    text: "text-green-600",
    border: "border-green-300",
    light: "bg-green-50",
    dot: "bg-green-400",
  },
  pink: {
    bg: "bg-pink-500",
    text: "text-pink-600",
    border: "border-pink-300",
    light: "bg-pink-50",
    dot: "bg-pink-400",
  },
  yellow: {
    bg: "bg-yellow-400",
    text: "text-yellow-600",
    border: "border-yellow-300",
    light: "bg-yellow-50",
    dot: "bg-yellow-400",
  },
  red: {
    bg: "bg-red-500",
    text: "text-red-600",
    border: "border-red-300",
    light: "bg-red-50",
    dot: "bg-red-400",
  },
  teal: {
    bg: "bg-teal-500",
    text: "text-teal-600",
    border: "border-teal-300",
    light: "bg-teal-50",
    dot: "bg-teal-400",
  },
};

export const CATEGORY_LABELS: Record<HabitCategory, string> = {
  health: "Health",
  fitness: "Fitness",
  mindfulness: "Mindfulness",
  learning: "Learning",
  productivity: "Productivity",
  social: "Social",
  creativity: "Creativity",
  finance: "Finance",
  other: "Other",
};

export const CATEGORY_ICONS: Record<HabitCategory, string> = {
  health: "🩺",
  fitness: "💪",
  mindfulness: "🧘",
  learning: "📚",
  productivity: "⚡",
  social: "🤝",
  creativity: "🎨",
  finance: "💰",
  other: "⭐",
};

export const COLOR_SWATCHES: { value: HabitColor; label: string; hex: string }[] = [
  { value: "orange", label: "Orange", hex: "#f97316" },
  { value: "purple", label: "Purple", hex: "#8b5cf6" },
  { value: "blue",   label: "Blue",   hex: "#3b82f6" },
  { value: "green",  label: "Green",  hex: "#22c55e" },
  { value: "pink",   label: "Pink",   hex: "#ec4899" },
  { value: "yellow", label: "Yellow", hex: "#eab308" },
  { value: "red",    label: "Red",    hex: "#ef4444" },
  { value: "teal",   label: "Teal",   hex: "#14b8a6" },
];

// ─── Misc helpers ─────────────────────────────────────────────────────────────

export function clampPercent(value: number): number {
  return Math.min(100, Math.max(0, value));
}

export function pluralize(count: number, word: string): string {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}
