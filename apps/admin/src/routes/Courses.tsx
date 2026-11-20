import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminHeader } from '../components/AdminHeader';
import { AdminService } from '../services/admin.service';
import { DataTable } from '../components/DataTable';
import { CourseForm } from '../components/CourseForm';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import type { Course } from '@divine/types';

export const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchCourses = () => {
    AdminService.getCourses()
      .then(setCourses)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreateOrUpdate = async (data: Partial<Course>) => {
    if (editingCourse) {
      await AdminService.updateCourse(editingCourse.id, data);
    } else {
      await AdminService.createCourse(data);
    }
    fetchCourses();
  };

  const handleDelete = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      await AdminService.deleteCourse(courseId);
      fetchCourses();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0b0717]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Course Management" />

        <main className="flex-1 p-8 space-y-6 max-w-7xl w-full">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Course Curriculum & Catalog</h3>
              <p className="text-xs text-[#ffd8a2]/70 mt-1">
                Create, edit, price, and publish professional astrology and numerology courses.
              </p>
            </div>

            <button
              onClick={() => {
                setEditingCourse(null);
                setIsFormOpen(true);
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-[#ffd8a2] to-[#c99e64] text-[#0b0717] font-bold text-xs rounded-xl shadow-lg hover:opacity-90 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="size-4" /> Add New Course
            </button>
          </div>

          {loading ? (
            <div className="p-8 text-center text-[#ffd8a2]/50">Loading courses...</div>
          ) : (
            <DataTable
              data={courses}
              searchPlaceholder="Search courses..."
              searchFilter={(c, q) =>
                c.title.toLowerCase().includes(q.toLowerCase()) ||
                c.summary.toLowerCase().includes(q.toLowerCase())
              }
              columns={[
                {
                  key: 'title',
                  header: 'Course Title',
                  render: (c) => (
                    <div>
                      <p className="font-semibold text-white">{c.title}</p>
                      <p className="text-[#ffd8a2]/60 text-[11px] line-clamp-1">{c.summary}</p>
                    </div>
                  ),
                },
                {
                  key: 'price',
                  header: 'Price',
                  render: (c) => `₹${c.price.toLocaleString('en-IN')}`,
                },
                {
                  key: 'level',
                  header: 'Level',
                  render: (c) => <span className="capitalize">{c.level}</span>,
                },
                {
                  key: 'durationHours',
                  header: 'Duration',
                  render: (c) => `${c.durationHours} hrs`,
                },
                {
                  key: 'status',
                  header: 'Status',
                  render: (c) => (
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border capitalize ${
                        c.status === 'published'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}
                    >
                      {c.status}
                    </span>
                  ),
                },
                {
                  key: 'actions',
                  header: 'Actions',
                  render: (c) => (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingCourse(c);
                          setIsFormOpen(true);
                        }}
                        className="p-1.5 text-[#ffd8a2]/70 hover:text-[#ffd8a2] hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                        title="Edit Course"
                      >
                        <Edit2 className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-1.5 text-rose-400/70 hover:text-rose-400 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                        title="Delete Course"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  ),
                },
              ]}
            />
          )}

          {isFormOpen && (
            <CourseForm
              initialCourse={editingCourse}
              onClose={() => setIsFormOpen(false)}
              onSubmit={handleCreateOrUpdate}
            />
          )}
        </main>
      </div>
    </div>
  );
};
