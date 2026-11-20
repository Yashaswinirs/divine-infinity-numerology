import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminHeader } from '../components/AdminHeader';
import { AdminService } from '../services/admin.service';
import { Award, BookOpen, Users, TrendingUp } from 'lucide-react';

export const Reports: React.FC = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalRevenue: 0,
    completionRate: 85,
  });

  useEffect(() => {
    Promise.all([
      AdminService.getStudents(),
      AdminService.getCourses(),
      AdminService.getOrders(),
    ]).then(([students, courses, orders]) => {
      const rev = orders
        .filter((o) => o.status === 'completed')
        .reduce((sum, o) => sum + o.amount, 0);

      setStats({
        totalStudents: students.length,
        totalCourses: courses.length,
        totalRevenue: rev,
        completionRate: 85,
      });
    });
  }, []);

  return (
    <div className="min-h-screen flex bg-[#0b0717]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Reports & Analytics" />

        <main className="flex-1 p-8 space-y-8 max-w-7xl w-full">
          <div>
            <h3 className="text-xl font-bold text-white">Performance Metrics</h3>
            <p className="text-xs text-[#ffd8a2]/70 mt-1">
              Overall student engagement, certification throughput, and course metrics.
            </p>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#120b22] border border-[#ffd8a2]/15 shadow-xl">
              <div className="flex justify-between items-center text-xs text-[#ffd8a2]/70">
                <span>Active Learners</span>
                <Users className="size-4" />
              </div>
              <p className="text-2xl font-bold text-white mt-2">{stats.totalStudents}</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#120b22] border border-[#ffd8a2]/15 shadow-xl">
              <div className="flex justify-between items-center text-xs text-[#ffd8a2]/70">
                <span>Curriculum Depth</span>
                <BookOpen className="size-4" />
              </div>
              <p className="text-2xl font-bold text-white mt-2">{stats.totalCourses} Master Courses</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#120b22] border border-[#ffd8a2]/15 shadow-xl">
              <div className="flex justify-between items-center text-xs text-[#ffd8a2]/70">
                <span>Completion Rate</span>
                <Award className="size-4" />
              </div>
              <p className="text-2xl font-bold text-emerald-400 mt-2">{stats.completionRate}%</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#120b22] border border-[#ffd8a2]/15 shadow-xl">
              <div className="flex justify-between items-center text-xs text-[#ffd8a2]/70">
                <span>Net Gross</span>
                <TrendingUp className="size-4" />
              </div>
              <p className="text-2xl font-bold text-white mt-2">₹{stats.totalRevenue.toLocaleString('en-IN')}</p>
            </div>
          </div>

          {/* Chart preview representation */}
          <div className="p-8 rounded-3xl bg-[#120b22] border border-[#ffd8a2]/15 shadow-xl space-y-6">
            <h4 className="text-base font-bold text-white">Monthly Course Enrollments</h4>
            <div className="h-48 flex items-end gap-6 pt-8 pb-2 border-b border-white/10 px-4">
              {[40, 65, 30, 80, 95, 120, 150].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-gradient-to-t from-[#ffd8a2]/20 to-[#ffd8a2] rounded-t-lg transition-all"
                    style={{ height: `${(val / 150) * 100}%` }}
                  />
                  <span className="text-[10px] text-[#ffd8a2]/60">M{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
