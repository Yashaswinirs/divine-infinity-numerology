import React, { useState } from 'react';
import type { Course, CourseLevel, CourseStatus } from '@divine/types';
import { X } from 'lucide-react';

interface CourseFormProps {
  initialCourse?: Course | null;
  onClose: () => void;
  onSubmit: (data: Partial<Course>) => Promise<void>;
}

export const CourseForm: React.FC<CourseFormProps> = ({ initialCourse, onClose, onSubmit }) => {
  const [title, setTitle] = useState(initialCourse?.title || '');
  const [summary, setSummary] = useState(initialCourse?.summary || '');
  const [description, setDescription] = useState(initialCourse?.description || '');
  const [price, setPrice] = useState(initialCourse?.price || 9999);
  const [level, setLevel] = useState<CourseLevel>(initialCourse?.level || 'all-levels');
  const [status, setStatus] = useState<CourseStatus>(initialCourse?.status || 'draft');
  const [durationHours, setDurationHours] = useState(initialCourse?.durationHours || 20);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        title,
        summary,
        description,
        price: Number(price),
        level,
        status,
        durationHours: Number(durationHours),
      });
      onClose();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#140e2b] border border-[#ffd8a2]/25 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#ffd8a2]/60 hover:text-[#ffd8a2] transition-colors"
        >
          <X className="size-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-6">
          {initialCourse ? 'Edit Course' : 'Create New Course'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#ffd8a2]/80 font-medium mb-1">Course Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:border-[#ffd8a2] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#ffd8a2]/80 font-medium mb-1">Summary (Short Intro)</label>
            <input
              type="text"
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:border-[#ffd8a2] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#ffd8a2]/80 font-medium mb-1">Full Description</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:border-[#ffd8a2] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#ffd8a2]/80 font-medium mb-1">Price (INR)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#ffd8a2] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#ffd8a2]/80 font-medium mb-1">Duration (Hours)</label>
              <input
                type="number"
                required
                value={durationHours}
                onChange={(e) => setDurationHours(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#ffd8a2] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#ffd8a2]/80 font-medium mb-1">Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as CourseLevel)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#120b22] border border-white/10 text-white text-sm focus:border-[#ffd8a2] focus:outline-none"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="all-levels">All Levels</option>
              </select>
            </div>

            <div>
              <label className="block text-[#ffd8a2]/80 font-medium mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as CourseStatus)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#120b22] border border-white/10 text-white text-sm focus:border-[#ffd8a2] focus:outline-none"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-white/15 text-white hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-gradient-to-r from-[#ffd8a2] to-[#c99e64] text-[#0e081e] font-bold rounded-xl shadow-lg hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Saving...' : initialCourse ? 'Update Course' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
