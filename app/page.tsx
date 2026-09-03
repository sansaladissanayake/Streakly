"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Flame, ArrowRight, Zap, Target, TrendingUp, BarChart2, CheckCircle2, Sparkles } from "lucide-react";
import { seedDemoData, getHabits } from "@/lib/storage";

export default function LandingPage() {
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    setHasData(getHabits().length > 0);
  }, []);

  const handleGetStarted = () => {
    if (getHabits().length === 0) seedDemoData();
  };

  return (
    <div className="min-h-screen bg-[#F5F0EA] font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-10 bg-[#F5F0EA]/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-500 rounded-xl flex items-center justify-center shadow-sm">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-gray-900 text-lg tracking-tight">Streakly</span>
          </div>
          <Link href="/dashboard" className="btn-primary text-sm" onClick={handleGetStarted}>
            {hasData ? "Open App" : "Get Started"} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-brand-200 text-brand-700 rounded-full text-xs font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-500" />
          Free forever · No sign-up required
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-5 text-balance leading-tight">
          Build habits that{" "}
          <span className="relative">
            <span className="text-brand-500">actually stick.</span>
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
              <path d="M2 9 C50 3, 150 3, 298 9" stroke="#f97316" strokeWidth="3" strokeLinecap="round" className="opacity-40" />
            </svg>
          </span>
        </h1>

        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8 leading-relaxed">
          Streakly makes it effortless to track your daily habits, build winning streaks,
          and watch your progress grow — beautifully.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
          <Link href="/dashboard" className="btn-primary text-base px-7 py-3.5" onClick={handleGetStarted}>
            {hasData ? "Back to Dashboard" : "Start Tracking Free"}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/dashboard" className="btn-secondary text-base px-7 py-3.5" onClick={handleGetStarted}>
            View Demo
          </Link>
        </div>
        <p className="text-xs text-gray-400">No account. No credit card. Works instantly in your browser.</p>
      </section>

      {/* Phone mockup / preview card */}
      <section className="max-w-sm mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Mock top bar */}
          <div className="bg-[#F5F0EA] px-5 pt-4 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span className="font-bold text-sm text-gray-900">Streakly</span>
            </div>
            <div className="flex items-center gap-1.5 bg-orange-50 px-2 py-1 rounded-full">
              <Flame className="w-3 h-3 text-orange-500" />
              <span className="text-xs font-bold text-orange-700">12</span>
            </div>
          </div>

          <div className="px-5 pb-5 bg-[#F5F0EA]">
            <p className="text-base font-extrabold text-gray-900">Good morning, Sansala! ☀️</p>
            <p className="text-xs text-gray-500 mb-3">Ready to keep your streak going?</p>

            {/* Streak card preview */}
            <div className="bg-gradient-to-br from-[#FFF9EC] to-[#FFF0D0] border border-[#F5DFA0] rounded-2xl p-4 mb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-extrabold text-gray-900 text-base">12 Day Streak</span>
                <span className="text-[9px] font-bold bg-orange-400 text-white px-1.5 py-0.5 rounded-full">HOT 🔥</span>
              </div>
              <p className="text-[10px] text-gray-500 mb-2">You're on fire! Best streak: 21 days</p>
              <div className="flex gap-1">
                {["M","T","W","T","F","S","S"].map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[8px] text-gray-400 font-medium">{d}</span>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${i < 5 ? "bg-orange-400" : i === 5 ? "bg-gray-800" : "bg-white/60 border border-gray-200"}`}>
                      {i < 5 && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress card preview */}
            <div className="bg-white rounded-2xl p-3 mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-gray-700">Today's Progress</span>
                <span className="text-xs font-bold text-gray-900">80%</span>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-xl font-extrabold text-gray-900">4</span>
                <span className="text-xs text-gray-400">/5 habits completed</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gray-800 rounded-full" style={{ width: "80%" }} />
              </div>
            </div>

            {/* Habit previews */}
            {[
              { name: "Drink Water", icon: "💧", color: "bg-blue-100", done: true },
              { name: "Exercise",    icon: "🏃", color: "bg-orange-100", done: true },
              { name: "Read",        icon: "📚", color: "bg-purple-100", done: false },
            ].map((h) => (
              <div key={h.name} className={`bg-white rounded-2xl p-3 mb-2 flex items-center gap-3 ${h.done ? "opacity-60" : ""}`}>
                <div className={`w-8 h-8 ${h.color} rounded-xl flex items-center justify-center text-base`}>{h.icon}</div>
                <span className={`text-xs font-semibold flex-1 ${h.done ? "line-through text-gray-400" : "text-gray-800"}`}>{h.name}</span>
                {h.done ? (
                  <div className="w-7 h-7 bg-gray-800 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </div>
                ) : (
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-purple-500 rounded-full">
                    <span className="text-[10px] font-bold text-white">Start</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Everything you need. Nothing you don't.</h2>
            <p className="text-gray-500">Simple, beautiful, and completely free.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { icon: Target,      bg: "bg-brand-50",   color: "text-brand-600",  title: "Daily Tracking",     desc: "Check off habits each day and watch your progress build." },
              { icon: Flame,       bg: "bg-orange-50",  color: "text-orange-600", title: "Streak System",      desc: "Current and longest streaks tracked per habit. Stay motivated." },
              { icon: TrendingUp,  bg: "bg-accent-50",  color: "text-accent-600", title: "28-Day Heatmaps",    desc: "Visual history of your consistency over the last month." },
              { icon: BarChart2,   bg: "bg-green-50",   color: "text-green-600",  title: "Statistics",         desc: "Completion rates, leaderboards, and overall progress at a glance." },
              { icon: Zap,         bg: "bg-yellow-50",  color: "text-yellow-600", title: "No Account Needed",  desc: "Data stays in your browser. Open and start immediately." },
              { icon: CheckCircle2,bg: "bg-teal-50",    color: "text-teal-600",   title: "Clean & Fast",       desc: "Distraction-free. Works beautifully on any device." },
            ].map(({ icon: Icon, bg, color, title, desc }) => (
              <div key={title} className="bg-[#F5F0EA] rounded-2xl p-5">
                <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Start building better habits today.</h2>
        <p className="text-gray-500 mb-8 text-lg">Free forever. No sign-up. Just you and your habits.</p>
        <Link href="/dashboard" className="btn-primary text-base px-8 py-4" onClick={handleGetStarted}>
          Get Started — It's Free <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white px-6 py-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-500 rounded-lg flex items-center justify-center">
              <Flame className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-gray-800 text-sm">Streakly</span>
          </div>
          <p className="text-xs text-gray-400">
            Open source ·{" "}
            <a href="https://github.com/sansaladissanayake/Streakly" className="underline hover:text-gray-600" target="_blank" rel="noopener noreferrer">GitHub</a>
            {" "}· Built by{" "}
            <a href="https://github.com/sansaladissanayake" className="underline hover:text-gray-600" target="_blank" rel="noopener noreferrer">sansaladissanayake</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
