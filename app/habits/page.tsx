"use client";

import { useEffect, useState, useCallback } from "react";
import PageLayout from "@/components/layout/PageLayout";
import HabitCard from "@/components/habits/HabitCard";
import HabitModal from "@/components/habits/HabitModal";
import Toast from "@/components/ui/Toast";
import { getAllHabitsWithStats, addHabit, updateHabit, deleteHabit } from "@/lib/storage";
import { Habit, HabitWithStats } from "@/lib/types";
import { Plus, Search } from "lucide-react";

export default function HabitsPage() {
  const [habits, setHabits] = useState<HabitWithStats[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<HabitWithStats | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");

  const reload = useCallback(() => setHabits(getAllHabitsWithStats()), []);

  useEffect(() => {
    setMounted(true);
    reload();
  }, [reload]);

  const handleSave = (habit: Habit) => {
    if (editing) {
      updateHabit(habit);
      setToast({ msg: `✏️ "${habit.name}" updated!`, type: "success" });
    } else {
      addHabit(habit);
      setToast({ msg: `🎉 "${habit.name}" created!`, type: "success" });
    }
    setEditing(null);
    reload();
  };

  const handleEdit = (habit: HabitWithStats) => {
    setEditing(habit);
    setModalOpen(true);
  };

  const handleDelete = (habitId: string) => {
    if (deleteConfirm === habitId) {
      const name = habits.find((h) => h.id === habitId)?.name ?? "Habit";
      deleteHabit(habitId);
      setDeleteConfirm(null);
      setToast({ msg: `🗑️ "${name}" deleted.`, type: "success" });
      reload();
    } else {
      setDeleteConfirm(habitId);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const filtered = habits.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!mounted) return null;

  const AddButton = (
    <button
      id="create-habit-btn"
      onClick={() => { setEditing(null); setModalOpen(true); }}
      className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center shadow-sm"
      aria-label="Add new habit"
    >
      <Plus className="w-4 h-4 text-white" strokeWidth={2.5} />
    </button>
  );

  return (
    <PageLayout title="My Habits" action={AddButton}>
      <div className="px-5 pb-4 space-y-4">

        {/* Search bar */}
        {habits.length > 0 && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
              placeholder="Search habits..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}

        {/* Stats summary row */}
        {habits.length > 0 && (
          <div className="flex gap-3">
            {[
              { label: "Total", value: habits.length },
              { label: "Active Streaks", value: habits.filter((h) => h.currentStreak > 0).length },
              { label: "Done Today", value: habits.filter((h) => h.isCompletedToday).length },
            ].map(({ label, value }) => (
              <div key={label} className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-card p-3 text-center">
                <div className="text-xl font-extrabold text-gray-900">{value}</div>
                <div className="text-[10px] text-gray-400 font-medium mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Delete warning */}
        {deleteConfirm && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center justify-between animate-fade-in">
            <span>⚠️ Tap delete again to confirm. History will be erased.</span>
            <button onClick={() => setDeleteConfirm(null)} className="font-semibold ml-2">Cancel</button>
          </div>
        )}

        {/* Empty state */}
        {habits.length === 0 && (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-10 text-center mt-4">
            <div className="text-5xl mb-4">✨</div>
            <p className="text-base font-bold text-gray-800 mb-1">No habits yet</p>
            <p className="text-sm text-gray-400 mb-5">Build your routine one habit at a time</p>
            <button
              onClick={() => { setEditing(null); setModalOpen(true); }}
              className="btn-primary mx-auto"
            >
              <Plus className="w-4 h-4" /> Create Your First Habit
            </button>
          </div>
        )}

        {/* No search results */}
        {habits.length > 0 && filtered.length === 0 && (
          <div className="text-center py-8 text-sm text-gray-400">
            No habits matching "{search}"
          </div>
        )}

        {/* Habit grid */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-1 gap-3">
            {filtered.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Add more button */}
        {habits.length > 0 && (
          <button
            onClick={() => { setEditing(null); setModalOpen(true); }}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-white border border-dashed border-gray-200 text-sm font-semibold text-gray-500 hover:border-brand-300 hover:text-brand-600 transition-all"
          >
            <Plus className="w-4 h-4" /> Add New Habit
          </button>
        )}
      </div>

      <HabitModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSave={handleSave}
        existing={editing}
      />

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </PageLayout>
  );
}
