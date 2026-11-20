import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { CourseService } from '../services/course.service';
import { ProgressBar } from '../components/ProgressBar';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import type { Course, Enrollment } from '@divine/types';

export const MyCourses: React.FC = () => {
  const [enrollments, setEnrollments] = useState<Array<Enrollment & { course: Course }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CourseService.getMyEnrollments()
      .then(setEnrollments)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex bg-[#0e081e]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="My Courses" />

        <main className="flex-1 p-8 space-y-6 max-w-6xl w-full">
          <div>
            <h3 className="text-xl font-bold text-white">Enrolled Programs</h3>
            <p className="text-xs text-[#ffd8a2]/70 mt-1">Access all your registered courses, video lessons, and curriculum.</p>
          </div>

          {loading ? (
            <div className="p-8 text-center text-[#ffd8a2]/50">Loading courses...</div>
          ) : enrollments.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-white/10 bg-white/5 space-y-3">
              <BookOpen className="size-8 mx-auto text-[#ffd8a2]/50" />
              <p className="text-sm text-[#ffd8a2]">You are not enrolled in any courses yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enr) => (
                <div
                  key={enr.id}
                  className="bg-[#140e2b] border border-[#ffd8a2]/20 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#ffd8a2]/40 transition-all shadow-xl"
                >
                  <div className="h-44 bg-gradient-to-tr from-[#1d1b4d] to-[#512b58] relative p-4 flex flex-col justify-between">
                    <span className="self-start text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#0e081e]/80 text-[#ffd8a2] border border-[#ffd8a2]/20">
                      {enr.course.level}
                    </span>
                    <span className="text-xs font-semibold text-white/90">{enr.course.instructorName}</span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="text-base font-bold text-white line-clamp-1">{enr.course.title}</h4>
                      <p className="text-xs text-[#fff0db]/70 mt-1.5 line-clamp-2">{enr.course.summary}</p>
                    </div>

                    <div className="pt-4 border-t border-white/10 space-y-3">
                      <ProgressBar percentage={enr.completionPercentage} />
                      <Link
                        to={`/learn/${enr.courseId}`}
                        className="w-full py-2.5 bg-gradient-to-r from-[#ffd8a2] to-[#c99e64] text-[#0e081e] rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                      >
                        Enter Course Room <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
