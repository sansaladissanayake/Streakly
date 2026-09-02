"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Habit, HabitCategory, HabitColor } from "@/lib/types";
import {
  CATEGORY_LABELS,
  COLOR_SWATCHES,
  generateId,
} from "@/lib/utils";

const CATEGORY_OPTIONS: HabitCategory[] = [
  "health", "fitness", "mindfulness", "learning",
  "productivity", "social", "creativity", "finance", "other",
];

const EMOJI_OPTIONS = [
  "💧","🏃","📚","🧘","😴","💪","🍎","✍️","🎯","⚡",
  "🎨","🎵","🌱","💰","🧹","🙏","🤝","📝","🚴","🌅",
];

interface HabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (habit: Habit) => void;
  existing?: Habit | null;
}

const DEFAULTS = {
  name: "",
  description: "",
  category: "health" as HabitCategory,
  color: "orange" as HabitColor,
  icon: "💧",
};

export default function HabitModal({ isOpen, onClose, onSave, existing }: HabitModalProps) {
  const [form, setForm] = useState(DEFAULTS);
  const [errors, setErrors] = useState<{ name?: string }>({});

  useEffect(() => {
    if (existing) {
      setForm({
        name: existing.name,
        description: existing.description,
        category: existing.category,
        color: existing.color,
        icon: existing.icon,
      });
    } else {
      setForm(DEFAULTS);
    }
    setErrors({});
  }, [existing, isOpen]);

  const validate = () => {
    if (!form.name.trim()) {
      setErrors({ name: "Habit name is required" });
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validate()) return;
    const habit: Habit = {
      id: existing?.id ?? generateId(),
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category,
      color: form.color,
      icon: form.icon,
      createdAt: existing?.createdAt ?? new Date().toISOString(),
    };
    onSave(habit);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={existing ? "Edit Habit" : "Create New Habit"}
    >
      <div className="space-y-5">
        {/* Icon picker */}
        <div>
          <label className="label">Icon</label>
          <div className="flex flex-wrap gap-2">
            {EMOJI_OPTIONS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setForm((f) => ({ ...f, icon: emoji }))}
                className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all ${
                  form.icon === emoji
                    ? "bg-brand-100 ring-2 ring-brand-400"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="label" htmlFor="habit-name">Habit Name *</label>
          <input
            id="habit-name"
            className={`input ${errors.name ? "ring-2 ring-red-300" : ""}`}
            placeholder="e.g. Drink 8 glasses of water"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            maxLength={60}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="label" htmlFor="habit-desc">Description (optional)</label>
          <input
            id="habit-desc"
            className="input"
            placeholder="Short note about this habit"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            maxLength={100}
          />
        </div>

        {/* Category */}
        <div>
          <label className="label" htmlFor="habit-category">Category</label>
          <select
            id="habit-category"
            className="input"
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as HabitCategory }))}
          >
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat} value={cat}>{CATEGORY_LABELS[cat]}</option>
            ))}
          </select>
        </div>

        {/* Color */}
        <div>
          <label className="label">Color</label>
          <div className="flex gap-2 flex-wrap">
            {COLOR_SWATCHES.map(({ value, label, hex }) => (
              <button
                key={value}
                aria-label={label}
                onClick={() => setForm((f) => ({ ...f, color: value }))}
                className={`w-8 h-8 rounded-full transition-all ${
                  form.color === value ? "ring-2 ring-offset-2 ring-gray-400 scale-110" : "hover:scale-105"
                }`}
                style={{ backgroundColor: hex }}
              />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button onClick={onClose} className="btn-secondary flex-1">
            Cancel
          </button>
          <button onClick={handleSave} className="btn-primary flex-1">
            {existing ? "Save Changes" : "Create Habit"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
