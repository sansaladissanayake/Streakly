"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import RingChart from "@/components/stats/RingChart";
import HeatmapGrid from "@/components/stats/HeatmapGrid";
import EmptyState from "@/components/ui/EmptyState";
import { getAllHabitsWithStats, getOverallStats } from "@/lib/storage";
import { HabitWithStats, OverallStats } from "@/lib/types";
import { Flame, Trophy, TrendingUp, Target, Plus } from "lucide-react";
import Link from "next/link";

export default function StatsPage() {
  const [habits, setHabits] = useState<HabitWithStats[]>([]);
  const [stats, setStats] = useState<OverallStats | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHabits(getAllHabitsWithStats());
    setStats(getOverallStats());
  }, []);

  if (!mounted) return null;

  const sortedByStreak = [...habits].sort((a, b) => b.currentStreak - a.currentStreak);
  const sortedByRate = [...habits].sort((a, b) => b.completionRate - a.completionRate);

  return (
    <AppShell title="Statistics">
      <div className="max-w-4xl mx-auto animate-fade-in space-y-6">

        {habits.length === 0 ? (
          <div className="card">
            <EmptyState
              icon="📊"
              title="No data yet"
              description="Create some habits and start tracking to see your statistics here."
              action={
                <Link href="/habits" className="btn-primary">
                  <Plus className="w-4 h-4" /> Create a Habit
                </Link>
              }
            />
          </div>
        ) : (
          <>
            {/* Overall stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Habits",     value: stats?.totalHabits ?? 0,          icon: Target,    color: "text-brand-600", bg: "bg-brand-50" },
                { label: "Total Completions",value: stats?.totalCompletions ?? 0,      icon: TrendingUp,color: "text-accent-600",bg: "bg-accent-50" },
                { label: "Active Streaks",   value: stats?.currentActiveStreaks ?? 0,  icon: Flame,     color: "text-orange-600",bg: "bg-orange-50" },
                { label: "Best Streak Ever", value: `${stats?.longestStreakEver ?? 0}d`, icon: Trophy,  color: "text-yellow-600",bg: "bg-yellow-50" },
              ].map(({ label, value, icon: Icon, color, bg }) => (
                <div key={label} className="card p-4">
                  <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Completion rate rings */}
            <div className="card p-6">
              <h2 className="section-title mb-6">Completion Rates</h2>
              <div className="flex flex-wrap gap-8 justify-around">
                <RingChart
                  percentage={stats?.last30DaysRate ?? 0}
                  color="#f97316"
                  label="Last 30 Days"
                  sublabel="Across all habits"
                />
                <RingChart
                  percentage={stats?.overallCompletionRate ?? 0}
                  color="#8b5cf6"
                  label="All Time"
                  sublabel="Overall completion"
                />
                <RingChart
                  percentage={
                    habits.length > 0
                      ? Math.round((stats?.habitsCompletedToday ?? 0) / habits.length * 100)
                      : 0
                  }
                  color="#22c55e"
                  label="Today"
                  sublabel={`${stats?.habitsCompletedToday ?? 0} / ${habits.length} done`}
                />
              </div>
            </div>

            {/* Per-habit streaks */}
            <div className="card p-5">
              <h2 className="section-title mb-4">Streak Leaderboard</h2>
              <div className="space-y-3">
                {sortedByStreak.map((habit, idx) => (
                  <div key={habit.id} className="flex items-center gap-3">
                    <span className={`text-sm font-bold w-5 text-center ${
                      idx === 0 ? "text-yellow-500" : idx === 1 ? "text-gray-400" : idx === 2 ? "text-orange-700" : "text-gray-300"
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="text-lg">{habit.icon}</span>
                    <span className="flex-1 text-sm font-medium text-gray-700 truncate">{habit.name}</span>
                    <div className="flex items-center gap-3 text-sm flex-shrink-0">
                      <div className="text-center">
                        <div className="font-bold text-gray-900 flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-orange-500" />
                          {habit.currentStreak}
                        </div>
                        <div className="text-[10px] text-gray-400">current</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-gray-900">{habit.longestStreak}</div>
                        <div className="text-[10px] text-gray-400">longest</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-gray-900">{habit.completionRate}%</div>
                        <div className="text-[10px] text-gray-400">30-day</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 28-day heatmaps */}
            <div className="card p-5">
              <h2 className="section-title mb-1">28-Day Heatmap</h2>
              <p className="text-sm text-gray-500 mb-5">Last 4 weeks of completions per habit</p>
              <div className="space-y-6">
                {habits.map((habit) => (
                  <div key={habit.id}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base">{habit.icon}</span>
                      <span className="text-sm font-semibold text-gray-700">{habit.name}</span>
                      <span className="text-xs text-gray-400 ml-auto">{habit.totalCompletions} total completions</span>
                    </div>
                    <HeatmapGrid habitId={habit.id} color={habit.color} />
                  </div>
                ))}
              </div>
            </div>

            {/* Top performing habits */}
            <div className="card p-5">
              <h2 className="section-title mb-4">Top Performing (30-day rate)</h2>
              <div className="space-y-2.5">
                {sortedByRate.map((habit) => (
                  <div key={habit.id} className="flex items-center gap-3">
                    <span className="text-base">{habit.icon}</span>
                    <span className="flex-1 text-sm font-medium text-gray-700 truncate">{habit.name}</span>
                    <div className="flex items-center gap-3 w-48">
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full bg-brand-500 rounded-full transition-all duration-700"
                          style={{ width: `${habit.completionRate}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-900 w-10 text-right">{habit.completionRate}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
