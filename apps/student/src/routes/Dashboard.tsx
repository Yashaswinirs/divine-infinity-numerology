import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { CourseService } from '../services/course.service';
import { useAuth } from '../hooks/useAuth';
import { ProgressBar } from '../components/ProgressBar';
import { Link } from 'react-router-dom';
import { BookOpen, Award, CheckCircle, ArrowRight } from 'lucide-react';
import type { Course, Enrollment } from '@divine/types';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Array<Enrollment & { course: Course }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CourseService.getMyEnrollments()
      .then(setEnrollments)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const completedCount = enrollments.filter((e) => e.status === 'completed').length;
  const inProgressCount = enrollments.filter((e) => e.status === 'active').length;

  return (
    <div className="min-h-screen flex bg-[#0e081e]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Student Learning Dashboard" />

        <main className="flex-1 p-8 space-y-8 max-w-6xl w-full">
          {/* Welcome banner */}
          <div className="relative rounded-3xl bg-gradient-to-r from-[#1d1b4d] to-[#512b58] p-8 border border-[#ffd8a2]/25 overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-xl">
              <span className="text-xs uppercase font-bold tracking-wider text-[#ffd8a2]">Welcome Back</span>
              <h2 className="text-2xl font-bold text-white mt-1">Hello, {user?.fullName || 'Student'}!</h2>
              <p className="text-sm text-[#fff0db]/80 mt-2">
                Continue decoding your cosmic destiny. Resume your master modules in Vedic & Pythagorean Numerology.
              </p>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#140e2b] border border-[#ffd8a2]/15 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#ffd8a2]/70 font-medium">Enrolled Courses</span>
                <BookOpen className="size-5 text-[#ffd8a2]" />
              </div>
              <p className="text-3xl font-bold text-white mt-3">{enrollments.length}</p>
            </div>

            <div className="bg-[#140e2b] border border-[#ffd8a2]/15 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#ffd8a2]/70 font-medium">In Progress</span>
                <CheckCircle className="size-5 text-[#ffd8a2]" />
              </div>
              <p className="text-3xl font-bold text-white mt-3">{inProgressCount}</p>
            </div>

            <div className="bg-[#140e2b] border border-[#ffd8a2]/15 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#ffd8a2]/70 font-medium">Completed</span>
                <Award className="size-5 text-[#ffd8a2]" />
              </div>
              <p className="text-3xl font-bold text-white mt-3">{completedCount}</p>
            </div>
          </div>

          {/* Current Courses */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#fff0db]">Your Active Learning</h3>
              <Link to="/my-courses" className="text-xs text-[#ffd8a2] hover:underline flex items-center gap-1">
                View all <ArrowRight className="size-3" />
              </Link>
            </div>

            {loading ? (
              <div className="p-8 text-center text-[#ffd8a2]/50">Loading enrollments...</div>
            ) : enrollments.length === 0 ? (
              <div className="p-8 text-center rounded-2xl border border-white/10 bg-white/5">
                <p className="text-sm text-[#ffd8a2]/70">No active course enrollments yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrollments.map((enr) => (
                  <div
                    key={enr.id}
                    className="bg-[#140e2b] border border-[#ffd8a2]/20 rounded-2xl p-6 flex flex-col justify-between hover:border-[#ffd8a2]/40 transition-all shadow-lg"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#ffd8a2]/70 mb-2">
                        <span className="capitalize px-2.5 py-0.5 rounded-full bg-[#ffd8a2]/10 border border-[#ffd8a2]/20 text-[#ffd8a2]">
                          {enr.course.level}
                        </span>
                        <span>{enr.course.durationHours}h total</span>
                      </div>
                      <h4 className="text-base font-bold text-white line-clamp-1">{enr.course.title}</h4>
                      <p className="text-xs text-[#fff0db]/70 mt-1 line-clamp-2">{enr.course.summary}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
                      <ProgressBar percentage={enr.completionPercentage} />
                      <Link
                        to={`/learn/${enr.courseId}`}
                        className="w-full py-2.5 bg-[#ffd8a2]/15 text-[#ffd8a2] border border-[#ffd8a2]/30 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#ffd8a2] hover:text-[#0e081e] transition-all"
                      >
                        Continue Learning <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
