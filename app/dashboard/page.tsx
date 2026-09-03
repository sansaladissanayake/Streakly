"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import MobileTopBar from "@/components/layout/MobileTopBar";
import BottomNav from "@/components/layout/BottomNav";
import StreakCard from "@/components/dashboard/StreakCard";
import QuoteCard from "@/components/dashboard/QuoteCard";
import CategoryTabs from "@/components/dashboard/CategoryTabs";
import HabitItem from "@/components/dashboard/HabitItem";
import HabitModal from "@/components/habits/HabitModal";
import Toast from "@/components/ui/Toast";
import {
  getAllHabitsWithStats,
  toggleCompletion,
  addHabit,
  getSettings,
  getWeeklyStatus,
} from "@/lib/storage";
import { HabitWithStats, Habit, HabitCategory } from "@/lib/types";
import { getGreeting } from "@/lib/utils";

export default function DashboardPage() {
  const [habits, setHabits] = useState<HabitWithStats[]>([]);
  const [userName, setUserName] = useState("Friend");
  const [greeting, setGreeting] = useState("Good morning");
  const [selectedCat, setSelectedCat] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [mounted, setMounted] = useState(false);
  const [dateStr, setDateStr] = useState("");

  const reload = useCallback(() => {
    setHabits(getAllHabitsWithStats());
  }, []);

  useEffect(() => {
    setMounted(true);
    reload();
    const s = getSettings();
    setUserName(s.displayName);
    setGreeting(getGreeting());
    setDateStr(new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }));
  }, [reload]);

  const handleToggle = (habitId: string, habitName: string) => {
    const nowDone = toggleCompletion(habitId);
    reload();
    setToast({
      msg: nowDone ? `✅ "${habitName}" done!` : `↩️ "${habitName}" unmarked`,
      type: "success",
    });
  };

  const handleAddHabit = (habit: Habit) => {
    addHabit(habit);
    reload();
    setToast({ msg: `🎉 "${habit.name}" added!`, type: "success" });
    setModalOpen(false);
  };

  if (!mounted) return null;

  // ── Computed values ─────────────────────────────────────────────────────────
  const completed = habits.filter((h) => h.isCompletedToday);
  const total = habits.length;
  const percentage = total > 0 ? Math.round((completed.length / total) * 100) : 0;

  // Best current streak across all habits
  const bestStreak = Math.max(0, ...habits.map((h) => h.currentStreak));
  const bestLongest = Math.max(0, ...habits.map((h) => h.longestStreak));

  // Weekly status: OR across all habits (did user complete ANY habit each day?)
  const overallWeekly = Array.from({ length: 7 }, (_, i) =>
    habits.some((h) => h.weeklyStatus[i])
  );

  // Category counts and unique categories
  const categoryCounts: Record<string, number> = {};
  for (const h of habits) {
    categoryCounts[h.category] = (categoryCounts[h.category] ?? 0) + 1;
  }
  const uniqueCategories = [...new Set(habits.map((h) => h.category))] as HabitCategory[];

  // Filtered habits
  const filtered = selectedCat === "all"
    ? habits
    : habits.filter((h) => h.category === selectedCat);

  // Emoji for greeting
  const hour = new Date().getHours();
  const greetEmoji = hour < 12 ? "☀️" : hour < 17 ? "🌤️" : "🌙";

  return (
    <div className="min-h-screen bg-[#F5F0EA] flex flex-col max-w-lg mx-auto">
      {/* Top bar */}
      <MobileTopBar totalStreak={bestStreak} userName={userName} />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-28 scrollbar-none">

        {/* Greeting */}
        <div className="px-5 mb-4">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            {greeting}, {userName}! {greetEmoji}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {total === 0
              ? "Create your first habit to get started 🌱"
              : completed.length === total && total > 0
              ? "All habits done! You're crushing it 🔥"
              : "Ready to keep your streak going? 🌙"}
          </p>
        </div>

        {/* Streak card */}
        <StreakCard
          currentStreak={bestStreak}
          longestStreak={bestLongest}
          weeklyStatus={overallWeekly}
        />

        {/* Today's Progress */}
        {total > 0 && (
          <div className="mx-5 mb-4 rounded-2xl bg-white border border-gray-100 shadow-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Today's Progress</span>
              <span className="text-sm font-bold text-gray-900">{percentage}%</span>
            </div>
            <div className="flex items-end gap-1 mb-3">
              <span className="text-3xl font-extrabold text-gray-900">{completed.length}</span>
              <span className="text-base text-gray-400 font-medium mb-1">/{total} habits completed</span>
            </div>
            {/* Dark progress bar */}
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-800 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Quote */}
        <QuoteCard />

        {/* Category tabs */}
        {habits.length > 0 && (
          <CategoryTabs
            categories={uniqueCategories}
            selected={selectedCat}
            counts={categoryCounts}
            totalCount={total}
            onSelect={setSelectedCat}
          />
        )}

        {/* Today's habits header */}
        <div className="flex items-center justify-between px-5 mb-3">
          <h2 className="text-base font-bold text-gray-900">Today's Habits</h2>
          <span className="text-xs text-gray-400 font-medium">{dateStr}</span>
        </div>

        {/* Habit list */}
        {habits.length === 0 ? (
          <div className="mx-5 rounded-2xl bg-white border border-dashed border-gray-200 p-8 text-center">
            <div className="text-4xl mb-3">🌱</div>
            <p className="text-sm font-semibold text-gray-700 mb-1">No habits yet</p>
            <p className="text-xs text-gray-400 mb-4">Tap the button below to create your first habit</p>
            <button
              onClick={() => setModalOpen(true)}
              className="btn-primary mx-auto"
            >
              <Plus className="w-4 h-4" /> Create Habit
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="mx-5 text-center py-8 text-sm text-gray-400">
            No habits in this category
          </div>
        ) : (
          <>
            {/* Pending first, then completed */}
            {[...filtered.filter(h => !h.isCompletedToday), ...filtered.filter(h => h.isCompletedToday)].map((habit) => (
              <HabitItem
                key={habit.id}
                habit={habit}
                onToggle={() => handleToggle(habit.id, habit.name)}
              />
            ))}
          </>
        )}

        {/* Add new habit button */}
        {habits.length > 0 && (
          <div className="mx-5 mt-1 mb-4">
            <button
              onClick={() => setModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-white border border-dashed border-gray-200 text-sm font-semibold text-gray-500 hover:border-brand-300 hover:text-brand-600 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add New Habit
              <span className="text-base">✨</span>
            </button>
            <p className="text-center text-xs text-gray-400 mt-2">Tap any habit above to mark done for today</p>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <BottomNav />

      {/* Create habit modal */}
      <HabitModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAddHabit}
        existing={null}
      />

      {toast && (
        <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
