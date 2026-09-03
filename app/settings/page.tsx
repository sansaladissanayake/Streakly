"use client";

import { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import Toast from "@/components/ui/Toast";
import { getSettings, saveSettings, clearAllData, getHabits, getCompletions } from "@/lib/storage";
import { UserSettings } from "@/lib/types";
import { User, Trash2, Github, ExternalLink, Database, Calendar } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({ displayName: "Friend", joinedAt: new Date().toISOString() });
  const [draft, setDraft] = useState("");
  const [habitCount, setHabitCount] = useState(0);
  const [completionCount, setCompletionCount] = useState(0);
  const [clearConfirm, setClearConfirm] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const s = getSettings();
    setSettings(s);
    setDraft(s.displayName);
    setHabitCount(getHabits().length);
    setCompletionCount(getCompletions().length);
  }, []);

  const handleSave = () => {
    if (!draft.trim()) return;
    const updated = { ...settings, displayName: draft.trim() };
    saveSettings(updated);
    setSettings(updated);
    setToast({ msg: "✅ Name saved!", type: "success" });
  };

  const handleClearData = () => {
    if (clearConfirm) {
      clearAllData();
      setHabitCount(0);
      setCompletionCount(0);
      setClearConfirm(false);
      setToast({ msg: "🗑️ All data cleared.", type: "success" });
    } else {
      setClearConfirm(true);
      setTimeout(() => setClearConfirm(false), 4000);
    }
  };

  if (!mounted) return null;

  const joinedDate = new Date(settings.joinedAt).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });

  return (
    <PageLayout title="Settings">
      <div className="px-5 space-y-4 pb-4">

        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center text-white text-lg font-bold shadow-sm">
              {settings.displayName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-gray-900">{settings.displayName}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                <Calendar className="w-3 h-3" /> Member since {joinedDate}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="label" htmlFor="display-name">Display Name</label>
              <input
                id="display-name"
                className="input"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Your name"
                maxLength={40}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
              />
            </div>
            <button
              id="save-settings-btn"
              onClick={handleSave}
              className="btn-primary w-full justify-center"
              disabled={!draft.trim() || draft.trim() === settings.displayName}
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Data summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-4">
          <h2 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Database className="w-4 h-4 text-accent-500" /> Your Data
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-2xl font-extrabold text-gray-900">{habitCount}</div>
              <div className="text-xs text-gray-400 mt-0.5">Habits tracked</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-2xl font-extrabold text-gray-900">{completionCount}</div>
              <div className="text-xs text-gray-400 mt-0.5">Total check-ins</div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">
            💾 Data stored locally in your browser. No account needed.
          </p>
        </div>

        {/* App info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-4">
          <h2 className="text-sm font-bold text-gray-800 mb-3">About Streakly</h2>
          <div className="space-y-2 text-sm">
            {[
              { label: "Version", value: "0.1.0" },
              { label: "Stack",   value: "Next.js 14 + TypeScript + Tailwind v3" },
              { label: "Storage", value: "localStorage (no server)" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span className="text-gray-400">{label}</span>
                <span className="font-medium text-gray-700 text-right max-w-[180px] truncate">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-4">
          <a
            href="https://github.com/sansaladissanayake/Streakly"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 py-1 group"
          >
            <div className="w-9 h-9 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
              <Github className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">GitHub Repository</p>
              <p className="text-xs text-gray-400">sansaladissanayake/Streakly</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
          </a>
        </div>

        {/* Danger zone */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-card p-4">
          <h2 className="text-sm font-bold text-red-600 mb-1">Danger Zone</h2>
          <p className="text-xs text-gray-400 mb-3">This will permanently delete all your habits and history.</p>
          {clearConfirm && (
            <div className="mb-3 p-3 bg-red-50 rounded-xl text-xs text-red-700 animate-fade-in">
              ⚠️ This cannot be undone. Tap again to confirm.
            </div>
          )}
          <button
            id="clear-data-btn"
            onClick={handleClearData}
            className={`w-full justify-center ${clearConfirm ? "btn-danger" : "btn-secondary text-red-500 border-red-100 hover:bg-red-50"}`}
          >
            <Trash2 className="w-4 h-4" />
            {clearConfirm ? "Confirm — Delete Everything" : "Clear All Data"}
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 pb-2">
          Made with ❤️ by{" "}
          <a href="https://github.com/sansaladissanayake" className="underline hover:text-gray-600" target="_blank" rel="noopener noreferrer">
            sansaladissanayake
          </a>
        </p>
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </PageLayout>
  );
}
