"use client";

import { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import RingChart from "@/components/stats/RingChart";
import HeatmapGrid from "@/components/stats/HeatmapGrid";
import { getAllHabitsWithStats, getOverallStats } from "@/lib/storage";
import { HabitWithStats, OverallStats } from "@/lib/types";
import { Flame, Trophy, TrendingUp, Target, Plus, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { COLOR_MAP } from "@/lib/utils";

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
    <PageLayout title="Statistics">
      <div className="px-5 space-y-4 pb-4">

        {habits.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-10 text-center mt-4">
            <div className="text-5xl mb-4">📊</div>
            <p className="text-base font-bold text-gray-800 mb-1">No data yet</p>
            <p className="text-sm text-gray-400 mb-5">Create habits and start tracking to see stats here</p>
            <Link href="/habits" className="btn-primary mx-auto">
              <Plus className="w-4 h-4" /> Create a Habit
            </Link>
          </div>
        ) : (
          <>
            {/* Stat cards grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Total Habits",      value: stats?.totalHabits ?? 0,            icon: Target,       color: "text-brand-600",  bg: "bg-brand-50" },
                { label: "Total Completions", value: stats?.totalCompletions ?? 0,        icon: CheckCircle2, color: "text-green-600",  bg: "bg-green-50" },
                { label: "Active Streaks",    value: stats?.currentActiveStreaks ?? 0,    icon: Flame,        color: "text-orange-600", bg: "bg-orange-50" },
                { label: "Best Streak",       value: `${stats?.longestStreakEver ?? 0}d`, icon: Trophy,       color: "text-yellow-600", bg: "bg-yellow-50" },
              ].map(({ label, value, icon: Icon, color, bg }) => (
                <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-card p-4">
                  <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <div className="text-2xl font-extrabold text-gray-900">{value}</div>
                  <div className="text-xs text-gray-400 mt-0.5 font-medium">{label}</div>
                </div>
              ))}
            </div>

            {/* Ring charts */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
              <h2 className="text-sm font-bold text-gray-800 mb-4">Completion Rates</h2>
              <div className="flex justify-around gap-2">
                <RingChart percentage={stats?.last30DaysRate ?? 0}         color="#f97316" label="30 Days"  sublabel="All habits" />
                <RingChart percentage={stats?.overallCompletionRate ?? 0}  color="#8b5cf6" label="All Time" sublabel="Overall" />
                <RingChart
                  percentage={habits.length > 0 ? Math.round((stats?.habitsCompletedToday ?? 0) / habits.length * 100) : 0}
                  color="#22c55e"
                  label="Today"
                  sublabel={`${stats?.habitsCompletedToday ?? 0}/${habits.length}`}
                />
              </div>
            </div>

            {/* Streak leaderboard */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-4">
              <h2 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" /> Streak Leaderboard
              </h2>
              <div className="space-y-3">
                {sortedByStreak.map((habit, idx) => (
                  <div key={habit.id} className="flex items-center gap-3">
                    <span className={`text-sm font-extrabold w-5 text-center ${
                      idx === 0 ? "text-yellow-500" : idx === 1 ? "text-gray-400" : idx === 2 ? "text-amber-700" : "text-gray-300"
                    }`}>{idx + 1}</span>
                    <span className="text-lg">{habit.icon}</span>
                    <span className="flex-1 text-sm font-medium text-gray-700 truncate">{habit.name}</span>
                    <div className="flex gap-3 text-center flex-shrink-0">
                      <div>
                        <div className="font-bold text-sm text-gray-900 flex items-center gap-0.5">
                          <Flame className="w-3 h-3 text-orange-500" />{habit.currentStreak}
                        </div>
                        <div className="text-[9px] text-gray-400">now</div>
                      </div>
                      <div>
                        <div className="font-bold text-sm text-gray-900">{habit.longestStreak}</div>
                        <div className="text-[9px] text-gray-400">best</div>
                      </div>
                      <div>
                        <div className="font-bold text-sm text-gray-900">{habit.completionRate}%</div>
                        <div className="text-[9px] text-gray-400">30d</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top performing habits bar */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-4">
              <h2 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent-500" /> Top Performing (30-day)
              </h2>
              <div className="space-y-3">
                {sortedByRate.map((habit) => {
                  const colors = COLOR_MAP[habit.color];
                  return (
                    <div key={habit.id} className="flex items-center gap-3">
                      <span className="text-base">{habit.icon}</span>
                      <span className="text-sm font-medium text-gray-700 truncate flex-1">{habit.name}</span>
                      <div className="flex items-center gap-2 w-36 flex-shrink-0">
                        <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full ${colors.dot} rounded-full transition-all duration-700`}
                            style={{ width: `${habit.completionRate}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-gray-900 w-8 text-right">{habit.completionRate}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 28-day heatmaps */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-4">
              <h2 className="text-sm font-bold text-gray-800 mb-1">28-Day Heatmap</h2>
              <p className="text-xs text-gray-400 mb-4">Last 4 weeks per habit</p>
              <div className="space-y-5">
                {habits.map((habit) => (
                  <div key={habit.id}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base">{habit.icon}</span>
                      <span className="text-sm font-semibold text-gray-700">{habit.name}</span>
                      <span className="text-xs text-gray-400 ml-auto">{habit.totalCompletions} total</span>
                    </div>
                    <HeatmapGrid habitId={habit.id} color={habit.color} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
}
