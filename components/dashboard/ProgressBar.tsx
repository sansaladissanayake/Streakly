"use client";

import { useEffect, useState } from "react";

interface ProgressBarProps {
  completed: number;
  total: number;
}

export default function ProgressBar({ completed, total }: ProgressBarProps) {
  const [width, setWidth] = useState(0);
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  useEffect(() => {
    const timer = setTimeout(() => setWidth(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const getColor = () => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 50) return "bg-brand-500";
    return "bg-accent-400";
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">
          {completed} of {total} habits done
        </span>
        <span className="text-2xl font-bold text-gray-900">{percentage}%</span>
      </div>
      <div className="progress-track h-3">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${getColor()}`}
          style={{ width: `${width}%` }}
        />
      </div>
      {percentage === 100 && total > 0 && (
        <p className="text-xs text-green-600 font-medium animate-fade-in">
          🎉 All habits completed today!
        </p>
      )}
    </div>
  );
}
