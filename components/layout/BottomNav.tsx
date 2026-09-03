"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ListChecks, BarChart2, CalendarDays, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Home",    icon: Home },
  { href: "/habits",    label: "Habits",  icon: ListChecks },
  { href: "/stats",     label: "Stats",   icon: BarChart2 },
  { href: "/settings",  label: "Calendar",icon: CalendarDays },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 px-2 pb-safe">
      <div className="max-w-lg mx-auto flex items-center justify-around">
        {NAV_ITEMS.map(({ href, label, icon: Icon }, idx) => {
          // Insert the center + button between index 1 and 2
          const isActive = pathname === href || pathname.startsWith(href + "/");
          const item = (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 py-3 px-4 min-w-[56px] transition-all duration-150",
                isActive ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5]")} />
              <span className={cn("text-[10px] font-medium", isActive ? "text-gray-900" : "text-gray-400")}>
                {label}
              </span>
            </Link>
          );

          if (idx === 1) {
            return (
              <>
                {item}
                {/* Center add button */}
                <Link
                  key="add"
                  href="/habits"
                  className="flex flex-col items-center justify-center -mt-5"
                >
                  <div className="w-13 h-13 bg-gray-900 rounded-full flex items-center justify-center shadow-lg w-[52px] h-[52px]">
                    <Plus className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                </Link>
              </>
            );
          }
          return item;
        })}
      </div>
    </nav>
  );
}
