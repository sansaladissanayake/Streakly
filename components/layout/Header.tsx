"use client";

import { Menu, Flame } from "lucide-react";
import { getGreeting } from "@/lib/utils";
import { getSettings } from "@/lib/storage";
import { useEffect, useState } from "react";

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export default function Header({ onMenuClick, title }: HeaderProps) {
  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("Friend");
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    setGreeting(getGreeting());
    setName(getSettings().displayName);
    setDateStr(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  return (
    <header className="bg-white border-b border-gray-100 px-4 lg:px-6 py-4 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          {title ? (
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          ) : (
            <>
              <h1 className="text-lg font-semibold text-gray-900">
                {greeting}, {name} 👋
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">{dateStr}</p>
            </>
          )}
        </div>
      </div>

      {/* Mobile logo */}
      <div className="lg:hidden flex items-center gap-1.5">
        <div className="w-7 h-7 bg-brand-500 rounded-lg flex items-center justify-center">
          <Flame className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="font-bold text-gray-900 text-base">Streakly</span>
      </div>
    </header>
  );
}
