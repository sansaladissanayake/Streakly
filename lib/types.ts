// Core Types for Streakly

export type HabitCategory =
  | "health"
  | "fitness"
  | "mindfulness"
  | "learning"
  | "productivity"
  | "social"
  | "creativity"
  | "finance"
  | "other";

export type HabitColor =
  | "orange"
  | "purple"
  | "blue"
  | "green"
  | "pink"
  | "yellow"
  | "red"
  | "teal";

export interface Habit {
  id: string;
  name: string;
  description: string;
  category: HabitCategory;
  color: HabitColor;
  icon: string;
  createdAt: string; // ISO date string
}

export interface HabitCompletion {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD
  completedAt: string; // ISO datetime string
}

export interface HabitWithStats extends Habit {
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  completionRate: number; // 0-100
  isCompletedToday: boolean;
  weeklyStatus: boolean[]; // last 7 days, index 0 = 6 days ago, index 6 = today
}

export interface DailyStats {
  date: string;
  totalHabits: number;
  completedHabits: number;
  completionPercentage: number;
}

export interface OverallStats {
  totalHabits: number;
  totalCompletions: number;
  currentActiveStreaks: number;
  longestStreakEver: number;
  overallCompletionRate: number;
  habitsCompletedToday: number;
  last30DaysRate: number;
}

export interface UserSettings {
  displayName: string;
  joinedAt: string;
}
