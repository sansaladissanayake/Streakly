"use client";

import Link from "next/link";
import { Flame, Sparkles } from "lucide-react";

interface MobileTopBarProps {
  totalStreak: number;
  userName: string;
}

export default function MobileTopBar({ totalStreak, userName }: MobileTopBarProps) {
  const initials = userName.slice(0, 2).toUpperCase();

  return (
    <div className="flex items-center justify-between px-5 pt-5 pb-3">
      {/* Logo */}
      <div className="flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-brand-500" />
        <span className="font-bold text-gray-900 text-base tracking-tight">Streakly</span>
      </div>

      {/* Right: streak + avatar */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 bg-orange-50 px-2.5 py-1.5 rounded-full">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-bold text-orange-700">{totalStreak}</span>
        </div>
        <Link href="/settings">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            {initials}
          </div>
        </Link>
      </div>
    </div>
  );
}
