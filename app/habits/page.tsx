"use client";

import { useEffect, useState, useCallback } from "react";
import AppShell from "@/components/layout/AppShell";
import HabitCard from "@/components/habits/HabitCard";
import HabitModal from "@/components/habits/HabitModal";
import EmptyState from "@/components/ui/EmptyState";
import Toast from "@/components/ui/Toast";
import { getAllHabitsWithStats, addHabit, updateHabit, deleteHabit } from "@/lib/storage";
import { Habit, HabitWithStats } from "@/lib/types";
import { Plus } from "lucide-react";

export default function HabitsPage() {
  const [habits, setHabits] = useState<HabitWithStats[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<HabitWithStats | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [mounted, setMounted] = useState(false);

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

  const handleOpenCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  if (!mounted) return null;

  return (
    <AppShell title="My Habits">
      <div className="max-w-4xl mx-auto animate-fade-in">
        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-500 mt-0.5">
              {habits.length === 0
                ? "Create your first habit to get started."
                : `${habits.length} habit${habits.length === 1 ? "" : "s"} · ${habits.filter((h) => h.currentStreak > 0).length} active streaks`}
            </p>
          </div>
          <button
            id="create-habit-btn"
            onClick={handleOpenCreate}
            className="btn-primary"
          >
            <Plus className="w-4 h-4" />
            New Habit
          </button>
        </div>

        {habits.length === 0 ? (
          <div className="card">
            <EmptyState
              icon="✨"
              title="No habits yet"
              description="Start building your routine by creating your first habit. Track it daily and watch your streaks grow!"
              action={
                <button onClick={handleOpenCreate} className="btn-primary">
                  <Plus className="w-4 h-4" /> Create Your First Habit
                </button>
              }
            />
          </div>
        ) : (
          <>
            {/* Delete warning banner */}
            {deleteConfirm && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 animate-fade-in flex items-center justify-between">
                <span>⚠️ Click delete again to confirm. This will also remove all completion history.</span>
                <button onClick={() => setDeleteConfirm(null)} className="text-red-500 hover:text-red-700 font-medium">Cancel</button>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <HabitModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSave={handleSave}
        existing={editing}
      />

      {toast && (
        <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />
      )}
    </AppShell>
  );
}
