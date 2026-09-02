"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import Toast from "@/components/ui/Toast";
import { getSettings, saveSettings, clearAllData, getHabits } from "@/lib/storage";
import { UserSettings } from "@/lib/types";
import { User, Trash2, Github, ExternalLink } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({ displayName: "Friend", joinedAt: new Date().toISOString() });
  const [draft, setDraft] = useState("");
  const [habitCount, setHabitCount] = useState(0);
  const [clearConfirm, setClearConfirm] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const s = getSettings();
    setSettings(s);
    setDraft(s.displayName);
    setHabitCount(getHabits().length);
  }, []);

  const handleSave = () => {
    if (!draft.trim()) return;
    const updated = { ...settings, displayName: draft.trim() };
    saveSettings(updated);
    setSettings(updated);
    setToast({ msg: "✅ Settings saved!", type: "success" });
  };

  const handleClearData = () => {
    if (clearConfirm) {
      clearAllData();
      setHabitCount(0);
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
    <AppShell title="Settings">
      <div className="max-w-2xl mx-auto animate-fade-in space-y-6">

        {/* Profile */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-100 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-brand-600" />
            </div>
            <h2 className="section-title">Profile</h2>
          </div>

          <div className="space-y-4">
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
              <p className="text-xs text-gray-400 mt-1">This is shown in your dashboard greeting.</p>
            </div>

            <div className="pt-1 flex gap-3">
              <button
                id="save-settings-btn"
                onClick={handleSave}
                className="btn-primary"
                disabled={!draft.trim() || draft.trim() === settings.displayName}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="card p-6">
          <h2 className="section-title mb-4">App Info</h2>
          <div className="space-y-3 text-sm">
            {[
              { label: "Version",        value: "0.1.0" },
              { label: "Member since",   value: joinedDate },
              { label: "Habits tracked", value: `${habitCount} habit${habitCount === 1 ? "" : "s"}` },
              { label: "Storage",        value: "Local browser storage (no account needed)" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span className="text-gray-500">{label}</span>
                <span className="font-medium text-gray-800">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="card p-6">
          <h2 className="section-title mb-4">Links</h2>
          <div className="space-y-2">
            <a
              href="https://github.com/sansaladissanayake/Streakly"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <Github className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700 flex-1">GitHub Repository</span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600" />
            </a>
          </div>
        </div>

        {/* Danger zone */}
        <div className="card p-6 border-red-100">
          <h2 className="text-base font-semibold text-red-600 mb-1">Danger Zone</h2>
          <p className="text-sm text-gray-500 mb-4">
            These actions are permanent and cannot be undone.
          </p>

          {clearConfirm && (
            <div className="mb-3 p-3 bg-red-50 rounded-xl text-sm text-red-700 animate-fade-in">
              ⚠️ This will delete all your habits and completion history. Click again to confirm.
            </div>
          )}

          <button
            id="clear-data-btn"
            onClick={handleClearData}
            className={clearConfirm ? "btn-danger" : "btn-secondary text-red-500 border-red-200 hover:bg-red-50"}
          >
            <Trash2 className="w-4 h-4" />
            {clearConfirm ? "Confirm — Delete Everything" : "Clear All Data"}
          </button>
        </div>
      </div>

      {toast && (
        <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />
      )}
    </AppShell>
  );
}
