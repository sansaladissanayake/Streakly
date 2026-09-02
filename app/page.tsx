"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Flame, BarChart2, CheckCircle2, ArrowRight, Zap, Target, TrendingUp } from "lucide-react";
import { seedDemoData, getHabits } from "@/lib/storage";

export default function LandingPage() {
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    setHasData(getHabits().length > 0);
  }, []);

  const handleGetStarted = () => {
    if (getHabits().length === 0) {
      seedDemoData();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-brand-500 rounded-xl flex items-center justify-center shadow-sm">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">Streakly</span>
          </div>
          <Link href="/dashboard" className="btn-primary text-sm" onClick={handleGetStarted}>
            {hasData ? "Go to Dashboard" : "Get Started"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-50 text-brand-700 rounded-full text-sm font-medium mb-6">
          <Flame className="w-4 h-4 text-brand-500" />
          Build habits. Track progress. Stay consistent.
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 text-balance">
          Your habits,{" "}
          <span className="text-brand-500">simplified.</span>
        </h1>

        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Streakly helps you build and maintain positive habits with a clean,
          distraction-free daily tracker. No accounts needed — just open and start.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard"
            className="btn-primary text-base px-6 py-3"
            onClick={handleGetStarted}
          >
            {hasData ? "Open Dashboard" : "Start Tracking — It's Free"}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/dashboard" className="btn-secondary text-base px-6 py-3" onClick={handleGetStarted}>
            View Demo
          </Link>
        </div>

        <p className="text-sm text-gray-400 mt-4">No sign-up. No credit card. Works instantly.</p>
      </section>

      {/* Demo preview */}
      <section className="max-w-3xl mx-auto px-6 mb-20">
        <div className="card p-6 shadow-soft">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-semibold text-gray-900">Today's Progress</h2>
              <p className="text-sm text-gray-500 mt-0.5">Tuesday, September 2</p>
            </div>
            <span className="text-2xl font-bold text-gray-900">80%</span>
          </div>

          {/* Progress bar */}
          <div className="progress-track h-3 mb-5">
            <div className="h-full bg-brand-500 rounded-full" style={{ width: "80%" }} />
          </div>

          {/* Habit list preview */}
          <div className="space-y-3">
            {[
              { name: "Drink Water", icon: "💧", done: true, color: "bg-blue-500", streak: 14 },
              { name: "Exercise",    icon: "🏃", done: true, color: "bg-orange-500", streak: 7 },
              { name: "Read",        icon: "📚", done: true, color: "bg-purple-500", streak: 5 },
              { name: "Meditate",    icon: "🧘", done: true, color: "bg-green-500", streak: 3 },
              { name: "Sleep Early", icon: "😴", done: false, color: "bg-teal-500", streak: 0 },
            ].map((habit) => (
              <div key={habit.name} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    habit.done ? habit.color : "bg-white border-2 border-gray-200"
                  }`}
                >
                  {habit.done && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  )}
                </div>
                <span className="text-lg">{habit.icon}</span>
                <span className={`text-sm font-medium flex-1 ${habit.done ? "text-gray-500 line-through" : "text-gray-900"}`}>
                  {habit.name}
                </span>
                {habit.streak > 0 && (
                  <span className="streak-badge">
                    <Flame className="w-3 h-3 text-orange-500" />
                    {habit.streak}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Everything you need. Nothing you don't.</h2>
            <p className="text-gray-500 text-lg">Designed to be simple, beautiful, and effective.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                color: "bg-brand-50 text-brand-600",
                title: "Track Daily Habits",
                desc: "Create custom habits, mark them done each day, and build your routine one day at a time.",
              },
              {
                icon: Flame,
                color: "bg-orange-50 text-orange-600",
                title: "Build Streaks",
                desc: "Watch your streaks grow. Current and longest streaks tracked per habit to keep you motivated.",
              },
              {
                icon: TrendingUp,
                color: "bg-accent-50 text-accent-600",
                title: "Visualize Progress",
                desc: "Weekly grids, 28-day heatmaps, and completion charts show you how far you've come.",
              },
              {
                icon: Zap,
                color: "bg-yellow-50 text-yellow-600",
                title: "No Account Needed",
                desc: "Your data stays in your browser. No sign-up, no email, no passwords. Just you and your habits.",
              },
              {
                icon: BarChart2,
                color: "bg-green-50 text-green-600",
                title: "Statistics Dashboard",
                desc: "Overall completion rates, streak leaderboards, and 30-day analytics at a glance.",
              },
              {
                icon: CheckCircle2,
                color: "bg-teal-50 text-teal-600",
                title: "Clean & Fast",
                desc: "A beautiful, distraction-free interface built for focus. Works great on any device.",
              },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="card p-5">
                <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1.5">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to build better habits?</h2>
        <p className="text-gray-500 text-lg mb-8">
          Join thousands of people using Streakly to stay consistent every day.
        </p>
        <Link
          href="/dashboard"
          className="btn-primary text-base px-8 py-3.5"
          onClick={handleGetStarted}
        >
          Start for free
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-500 rounded-lg flex items-center justify-center">
              <Flame className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-gray-700 text-sm">Streakly</span>
          </div>
          <p className="text-xs text-gray-400">
            Built with ❤️ by{" "}
            <a href="https://github.com/sansaladissanayake" className="hover:text-gray-600 underline" target="_blank" rel="noopener noreferrer">
              sansaladissanayake
            </a>
            {" "}· Open source on{" "}
            <a href="https://github.com/sansaladissanayake/Streakly" className="hover:text-gray-600 underline" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
