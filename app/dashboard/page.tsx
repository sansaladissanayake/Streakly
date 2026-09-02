"use client";

import { useEffect, useState, useCallback } from "react";
import AppShell from "@/components/layout/AppShell";
import ProgressBar from "@/components/dashboard/ProgressBar";
import HabitCheckbox from "@/components/habits/HabitCheckbox";
import WeeklyGrid from "@/components/dashboard/WeeklyGrid";
import StreakBadge from "@/components/dashboard/StreakBadge";
import EmptyState from "@/components/ui/EmptyState";
import Toast from "@/components/ui/Toast";
import { getAllHabitsWithStats, toggleCompletion, getHabits } from "@/lib/storage";
import { HabitWithStats } from "@/lib/types";
import { Flame, Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [habits, setHabits] = useState<HabitWithStats[]>([]);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [mounted, setMounted] = useState(false);

  const reload = useCallback(() => {
    setHabits(getAllHabitsWithStats());
  }, []);

  useEffect(() => {
    setMounted(true);
    reload();
  }, [reload]);

  const handleToggle = (habitId: string, habitName: string) => {
    const nowDone = toggleCompletion(habitId);
    reload();
    setToast({
      msg: nowDone ? `✅ "${habitName}" marked complete!` : `↩️ "${habitName}" unmarked.`,
      type: "success",
    });
  };

  const completed = habits.filter((h) => h.isCompletedToday);
  const pending = habits.filter((h) => !h.isCompletedToday);
  const topStreaks = [...habits].sort((a, b) => b.currentStreak - a.currentStreak).slice(0, 3);

  if (!mounted) return null;

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">

        {/* Progress card */}
        <div className="card p-5">
          <h2 className="section-title mb-4">Today's Progress</h2>
          {habits.length === 0 ? (
            <div className="text-sm text-gray-500">No habits yet. <Link href="/habits" className="text-brand-600 hover:underline font-medium">Create your first habit →</Link></div>
          ) : (
            <ProgressBar completed={completed.length} total={habits.length} />
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Habits list */}
          <div className="lg:col-span-2 space-y-4">

            {habits.length === 0 ? (
              <div className="card">
                <EmptyState
                  icon="🌱"
                  title="No habits yet"
                  description="Create your first habit to start building consistency."
                  action={
                    <Link href="/habits" className="btn-primary">
                      <Plus className="w-4 h-4" /> Create Habit
                    </Link>
                  }
                />
              </div>
            ) : (
              <>
                {/* Pending habits */}
                {pending.length > 0 && (
                  <div className="card p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />
                      To Do ({pending.length})
                    </h3>
                    <div className="space-y-2">
                      {pending.map((habit) => (
                        <HabitRow
                          key={habit.id}
                          habit={habit}
                          onToggle={() => handleToggle(habit.id, habit.name)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Completed habits */}
                {completed.length > 0 && (
                  <div className="card p-4">
                    <h3 className="text-sm font-semibold text-green-700 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                      Completed ({completed.length})
                    </h3>
                    <div className="space-y-2">
                      {completed.map((habit) => (
                        <HabitRow
                          key={habit.id}
                          habit={habit}
                          onToggle={() => handleToggle(habit.id, habit.name)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar: streaks + quick stats */}
          <div className="space-y-4">
            {/* Active Streaks */}
            <div className="card p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                Active Streaks
              </h3>
              {topStreaks.filter((h) => h.currentStreak > 0).length === 0 ? (
                <p className="text-xs text-gray-400">Complete habits to build streaks!</p>
              ) : (
                <div className="space-y-2.5">
                  {topStreaks.filter((h) => h.currentStreak > 0).map((habit) => (
                    <div key={habit.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-base">{habit.icon}</span>
                        <span className="text-sm font-medium text-gray-700 truncate">{habit.name}</span>
                      </div>
                      <StreakBadge streak={habit.currentStreak} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick stats */}
            <div className="card p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Stats</h3>
              <div className="space-y-2">
                {[
                  { label: "Total Habits", value: habits.length },
                  { label: "Done Today", value: completed.length },
                  { label: "Active Streaks", value: habits.filter((h) => h.currentStreak > 0).length },
                  { label: "Best Streak", value: `${Math.max(0, ...habits.map((h) => h.longestStreak))}d` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{label}</span>
                    <span className="text-sm font-bold text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/habits" className="btn-secondary w-full justify-center">
              <Plus className="w-4 h-4" /> Add Habit
            </Link>
          </div>
        </div>

        {/* Weekly overview */}
        {habits.length > 0 && (
          <div className="card p-5">
            <h2 className="section-title mb-4">Weekly Overview</h2>
            <div className="space-y-3">
              {habits.map((habit) => (
                <div key={habit.id} className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-36 min-w-0 flex-shrink-0">
                    <span className="text-base">{habit.icon}</span>
                    <span className="text-sm font-medium text-gray-700 truncate">{habit.name}</span>
                  </div>
                  <WeeklyGrid weeklyStatus={habit.weeklyStatus} color={habit.color} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {toast && (
        <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />
      )}
    </AppShell>
  );
}

// ─── Habit Row ─────────────────────────────────────────────────────────────────
function HabitRow({ habit, onToggle }: { habit: HabitWithStats; onToggle: () => void }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
      habit.isCompletedToday ? "bg-green-50/50" : "bg-gray-50 hover:bg-gray-100"
    }`}>
      <HabitCheckbox
        checked={habit.isCompletedToday}
        onChange={onToggle}
        color={habit.color}
        label={habit.name}
      />
      <span className="text-lg flex-shrink-0">{habit.icon}</span>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${habit.isCompletedToday ? "text-gray-400 line-through" : "text-gray-800"}`}>
          {habit.name}
        </p>
        {habit.description && (
          <p className="text-xs text-gray-400 truncate">{habit.description}</p>
        )}
      </div>
      {habit.currentStreak > 0 && <StreakBadge streak={habit.currentStreak} />}
    </div>
  );
}
