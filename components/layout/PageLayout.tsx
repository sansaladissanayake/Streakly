"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import { Sparkles } from "lucide-react";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  showBack?: boolean;
  backHref?: string;
  action?: ReactNode;
}

export default function PageLayout({ children, title, showBack, backHref = "/dashboard", action }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5F0EA] flex flex-col max-w-lg mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3 bg-[#F5F0EA] sticky top-0 z-20">
        <div className="flex items-center gap-3">
          {showBack ? (
            <Link href={backHref} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </Link>
          ) : (
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-500" />
              <span className="font-bold text-gray-900 text-base tracking-tight">Streakly</span>
            </div>
          )}
          <h1 className="text-lg font-bold text-gray-900">{title}</h1>
        </div>
        {action && <div>{action}</div>}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-28 scrollbar-none">
        {children}
      </div>

      {/* Bottom nav */}
      <BottomNav />
    </div>
  );
}
