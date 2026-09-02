import { Habit, HabitCompletion, HabitWithStats, OverallStats, UserSettings } from "./types";
import { getTodayString, getDateString, daysBetween } from "./utils";

const KEYS = {
  HABITS: "streakly_habits",
  COMPLETIONS: "streakly_completions",
  SETTINGS: "streakly_settings",
};

// ─── Habits ──────────────────────────────────────────────────────────────────

export function getHabits(): Habit[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEYS.HABITS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveHabits(habits: Habit[]): void {
  localStorage.setItem(KEYS.HABITS, JSON.stringify(habits));
}

export function addHabit(habit: Habit): void {
  const habits = getHabits();
  habits.unshift(habit);
  saveHabits(habits);
}

export function updateHabit(updated: Habit): void {
  const habits = getHabits();
  const idx = habits.findIndex((h) => h.id === updated.id);
  if (idx !== -1) {
    habits[idx] = updated;
    saveHabits(habits);
  }
}

export function deleteHabit(habitId: string): void {
  const habits = getHabits().filter((h) => h.id !== habitId);
  saveHabits(habits);
  // Also remove all completions for this habit
  const completions = getCompletions().filter((c) => c.habitId !== habitId);
  saveCompletions(completions);
}

// ─── Completions ─────────────────────────────────────────────────────────────

export function getCompletions(): HabitCompletion[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEYS.COMPLETIONS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCompletions(completions: HabitCompletion[]): void {
  localStorage.setItem(KEYS.COMPLETIONS, JSON.stringify(completions));
}

export function isHabitCompletedOnDate(habitId: string, date: string): boolean {
  return getCompletions().some((c) => c.habitId === habitId && c.date === date);
}

export function toggleCompletion(habitId: string): boolean {
  const today = getTodayString();
  const completions = getCompletions();
  const existingIdx = completions.findIndex(
    (c) => c.habitId === habitId && c.date === today
  );

  if (existingIdx !== -1) {
    // Un-complete
    completions.splice(existingIdx, 1);
    saveCompletions(completions);
    return false;
  } else {
    // Complete
    const newCompletion: HabitCompletion = {
      id: `${habitId}_${today}_${Date.now()}`,
      habitId,
      date: today,
      completedAt: new Date().toISOString(),
    };
    completions.push(newCompletion);
    saveCompletions(completions);
    return true;
  }
}

export function getCompletionsByDate(date: string): HabitCompletion[] {
  return getCompletions().filter((c) => c.date === date);
}

// ─── Streak Calculation ───────────────────────────────────────────────────────

export function calculateCurrentStreak(habitId: string): number {
  const completions = getCompletions()
    .filter((c) => c.habitId === habitId)
    .map((c) => c.date)
    .sort()
    .reverse();

  if (completions.length === 0) return 0;

  const today = getTodayString();
  const yesterday = getDateString(1);

  // Must have completed today or yesterday to have an active streak
  if (completions[0] !== today && completions[0] !== yesterday) return 0;

  let streak = 0;
  let checkDate = completions[0] === today ? today : yesterday;

  for (const date of completions) {
    if (date === checkDate) {
      streak++;
      // Move to previous day
      const d = new Date(checkDate);
      d.setDate(d.getDate() - 1);
      checkDate = d.toISOString().split("T")[0];
    } else {
      break;
    }
  }

  return streak;
}

export function calculateLongestStreak(habitId: string): number {
  const dates = getCompletions()
    .filter((c) => c.habitId === habitId)
    .map((c) => c.date)
    .sort();

  if (dates.length === 0) return 0;

  let longest = 1;
  let current = 1;

  for (let i = 1; i < dates.length; i++) {
    const diff = daysBetween(dates[i - 1], dates[i]);
    if (diff === 1) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }

  return longest;
}

export function getWeeklyStatus(habitId: string): boolean[] {
  // Returns array of 7 booleans: [6 days ago, 5 days ago, ..., today]
  return Array.from({ length: 7 }, (_, i) => {
    const date = getDateString(6 - i);
    return isHabitCompletedOnDate(habitId, date);
  });
}

export function getLast28DaysStatus(habitId: string): { date: string; completed: boolean }[] {
  return Array.from({ length: 28 }, (_, i) => {
    const date = getDateString(27 - i);
    return { date, completed: isHabitCompletedOnDate(habitId, date) };
  });
}

// ─── Enriched Habit Stats ─────────────────────────────────────────────────────

export function getHabitWithStats(habit: Habit): HabitWithStats {
  const today = getTodayString();
  const completions = getCompletions().filter((c) => c.habitId === habit.id);

  // Completion rate: completions in last 30 days / 30
  const thirtyDaysAgo = getDateString(30);
  const recentCompletions = completions.filter((c) => c.date >= thirtyDaysAgo);
  const completionRate = Math.round((recentCompletions.length / 30) * 100);

  return {
    ...habit,
    currentStreak: calculateCurrentStreak(habit.id),
    longestStreak: calculateLongestStreak(habit.id),
    totalCompletions: completions.length,
    completionRate,
    isCompletedToday: isHabitCompletedOnDate(habit.id, today),
    weeklyStatus: getWeeklyStatus(habit.id),
  };
}

export function getAllHabitsWithStats(): HabitWithStats[] {
  return getHabits().map(getHabitWithStats);
}

// ─── Overall Stats ────────────────────────────────────────────────────────────

export function getOverallStats(): OverallStats {
  const habits = getHabits();
  const completions = getCompletions();
  const today = getTodayString();
  const thirtyDaysAgo = getDateString(30);

  const habitsCompletedToday = completions.filter((c) => c.date === today).length;

  let longestStreakEver = 0;
  let currentActiveStreaks = 0;

  for (const habit of habits) {
    const longest = calculateLongestStreak(habit.id);
    const current = calculateCurrentStreak(habit.id);
    longestStreakEver = Math.max(longestStreakEver, longest);
    if (current > 0) currentActiveStreaks++;
  }

  const recentCompletions = completions.filter((c) => c.date >= thirtyDaysAgo);
  const maxPossible = habits.length * 30;
  const last30DaysRate = maxPossible > 0
    ? Math.round((recentCompletions.length / maxPossible) * 100)
    : 0;

  const totalDays = habits.length > 0
    ? Math.max(...habits.map((h) => {
        const created = new Date(h.createdAt);
        const now = new Date();
        return Math.ceil((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      }))
    : 1;

  const maxTotalPossible = habits.length * totalDays;
  const overallCompletionRate = maxTotalPossible > 0
    ? Math.round((completions.length / maxTotalPossible) * 100)
    : 0;

  return {
    totalHabits: habits.length,
    totalCompletions: completions.length,
    currentActiveStreaks,
    longestStreakEver,
    overallCompletionRate,
    habitsCompletedToday,
    last30DaysRate,
  };
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export function getSettings(): UserSettings {
  if (typeof window === "undefined") return { displayName: "Friend", joinedAt: new Date().toISOString() };
  try {
    const raw = localStorage.getItem(KEYS.SETTINGS);
    if (raw) return JSON.parse(raw);
    const defaults: UserSettings = { displayName: "Friend", joinedAt: new Date().toISOString() };
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(defaults));
    return defaults;
  } catch {
    return { displayName: "Friend", joinedAt: new Date().toISOString() };
  }
}

export function saveSettings(settings: UserSettings): void {
  localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
}

export function clearAllData(): void {
  localStorage.removeItem(KEYS.HABITS);
  localStorage.removeItem(KEYS.COMPLETIONS);
  localStorage.removeItem(KEYS.SETTINGS);
}

// ─── Seed Demo Data ───────────────────────────────────────────────────────────

export function seedDemoData(): void {
  const habits: Habit[] = [
    { id: "demo-1", name: "Drink Water", description: "8 glasses a day", category: "health", color: "blue", icon: "💧", createdAt: getDateString(14) },
    { id: "demo-2", name: "Exercise", description: "30 min workout", category: "fitness", color: "orange", icon: "🏃", createdAt: getDateString(14) },
    { id: "demo-3", name: "Read", description: "20 pages minimum", category: "learning", color: "purple", icon: "📚", createdAt: getDateString(14) },
    { id: "demo-4", name: "Meditate", description: "10 min mindfulness", category: "mindfulness", color: "green", icon: "🧘", createdAt: getDateString(14) },
    { id: "demo-5", name: "Sleep Early", description: "In bed by 11pm", category: "health", color: "teal", icon: "😴", createdAt: getDateString(14) },
  ];
  saveHabits(habits);

  // Seed some realistic completions
  const completions: HabitCompletion[] = [];
  const patterns: Record<string, number[]> = {
    "demo-1": [0,1,2,3,4,5,6,7,8,9,10,11,12,13],
    "demo-2": [0,1,3,4,6,7,8,10,11,13],
    "demo-3": [0,1,2,4,5,6,7,9,10,12,13],
    "demo-4": [1,2,3,5,7,8,9,11,12],
    "demo-5": [0,2,4,5,8,10,11,13],
  };

  for (const [habitId, daysAgo] of Object.entries(patterns)) {
    for (const days of daysAgo) {
      const date = getDateString(days);
      completions.push({
        id: `${habitId}_${date}`,
        habitId,
        date,
        completedAt: new Date().toISOString(),
      });
    }
  }
  saveCompletions(completions);
}
