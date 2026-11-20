import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CourseService } from '../services/course.service';
import { useProgress } from '../hooks/useProgress';
import { VideoPlayer } from '../components/VideoPlayer';
import { QuizForm } from '../components/QuizForm';
import { ProgressBar } from '../components/ProgressBar';
import {
  ChevronLeft,
  CheckCircle,
  PlayCircle,
  FileText,
  HelpCircle,
  Check,
  Award,
} from 'lucide-react';
import type { Course, CourseModule, Lesson } from '@divine/types';

export const Learn: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  const { progress, markComplete } = useProgress(courseId);

  useEffect(() => {
    if (!courseId) return;
    CourseService.getCourseDetails(courseId)
      .then((data) => {
        setCourse(data.course);
        setModules(data.modules);
        if (data.modules.length > 0 && data.modules[0]?.lessons.length) {
          setCurrentLesson(data.modules[0].lessons[0] || null);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [courseId]);

  const handleLessonComplete = async () => {
    if (!currentLesson) return;
    await markComplete(currentLesson.id, true);
  };

  if (loading) return <div className="min-h-screen bg-[#0e081e] flex items-center justify-center text-[#ffd8a2]">Loading course room...</div>;
  if (!course) return <div className="min-h-screen bg-[#0e081e] flex items-center justify-center text-white">Course not found.</div>;

  const isCurrentLessonCompleted = currentLesson ? !!progress?.lessonProgressMap[currentLesson.id] : false;

  return (
    <div className="min-h-screen flex flex-col bg-[#0e081e]">
      {/* Top Bar */}
      <header className="h-16 border-b border-[#ffd8a2]/15 px-6 flex items-center justify-between bg-[#140e2b] sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Link
            to="/my-courses"
            className="flex items-center gap-1.5 text-xs text-[#ffd8a2]/70 hover:text-[#ffd8a2] transition-colors"
          >
            <ChevronLeft className="size-4" />
            Back to Courses
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <h2 className="text-sm font-bold text-white line-clamp-1">{course.title}</h2>
        </div>

        <div className="w-48 hidden sm:block">
          <ProgressBar percentage={progress?.completionPercentage || 0} />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* Lesson View Area */}
        <div className="flex-1 p-6 lg:p-8 overflow-y-auto space-y-6">
          {currentLesson ? (
            <div className="max-w-4xl mx-auto space-y-6">
              {currentLesson.type === 'video' && (
                <VideoPlayer
                  url={currentLesson.videoUrl}
                  title={currentLesson.title}
                  onEnded={handleLessonComplete}
                />
              )}

              {currentLesson.type === 'quiz' && currentLesson.quizId && (
                <QuizForm
                  quizId={currentLesson.quizId}
                  onPassed={handleLessonComplete}
                />
              )}

              {currentLesson.type === 'pdf' && (
                <div className="p-8 bg-[#140e2b] border border-[#ffd8a2]/20 rounded-2xl text-center space-y-4">
                  <FileText className="size-12 mx-auto text-[#ffd8a2]" />
                  <h3 className="text-lg font-bold text-white">{currentLesson.title}</h3>
                  <p className="text-xs text-[#ffd8a2]/70 max-w-md mx-auto">{currentLesson.description}</p>
                  <a
                    href={currentLesson.pdfUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2.5 bg-[#ffd8a2] text-[#0e081e] text-xs font-bold rounded-xl shadow-lg hover:bg-[#c99e64] transition-colors"
                  >
                    Open Document Guide
                  </a>
                </div>
              )}

              {/* Lesson details header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#140e2b] border border-[#ffd8a2]/15">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#ffd8a2]/60">
                    Lesson {currentLesson.order}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{currentLesson.title}</h3>
                  {currentLesson.description && (
                    <p className="text-xs text-[#fff0db]/70 mt-1">{currentLesson.description}</p>
                  )}
                </div>

                <button
                  onClick={handleLessonComplete}
                  disabled={isCurrentLessonCompleted}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 ${
                    isCurrentLessonCompleted
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default'
                      : 'bg-gradient-to-r from-[#ffd8a2] to-[#c99e64] text-[#0e081e] hover:opacity-90 shadow-md cursor-pointer'
                  }`}
                >
                  {isCurrentLessonCompleted ? (
                    <>
                      <Check className="size-4" /> Completed
                    </>
                  ) : (
                    <>
                      <CheckCircle className="size-4" /> Mark as Done
                    </>
                  )}
                </button>
              </div>

              {/* Course Complete CTA */}
              {progress?.isCourseCompleted && (
                <div className="p-6 rounded-2xl bg-gradient-to-r from-[#ffd8a2]/20 via-[#512b58]/30 to-[#1d1b4d]/40 border border-[#ffd8a2]/30 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <Award className="size-5 text-[#ffd8a2]" /> Congratulations! You completed this course.
                    </h4>
                    <p className="text-xs text-[#ffd8a2]/80 mt-1">
                      Your certificate of completion has been issued and is available in your certificates dashboard.
                    </p>
                  </div>
                  <Link
                    to="/certificates"
                    className="px-5 py-2 bg-[#ffd8a2] text-[#0e081e] text-xs font-bold rounded-xl shadow hover:bg-[#c99e64] transition-colors shrink-0"
                  >
                    View Certificate
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center text-[#ffd8a2]/50">Select a lesson to begin.</div>
          )}
        </div>

        {/* Course Curriculum Sidebar */}
        <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-[#ffd8a2]/15 bg-[#140e2b] flex flex-col shrink-0">
          <div className="p-5 border-b border-[#ffd8a2]/15">
            <h4 className="text-sm font-bold text-white">Course Curriculum</h4>
            <p className="text-xs text-[#ffd8a2]/60 mt-0.5">
              {progress?.completedLessons || 0} of {progress?.totalLessons || 0} lessons completed
            </p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-white/5">
            {modules.map((mod) => (
              <div key={mod.id} className="p-4 space-y-2">
                <p className="text-xs font-semibold text-[#ffd8a2]/80 uppercase tracking-wider">{mod.title}</p>
                <div className="space-y-1">
                  {mod.lessons.map((les) => {
                    const isSelected = currentLesson?.id === les.id;
                    const isDone = !!progress?.lessonProgressMap[les.id];

                    return (
                      <button
                        key={les.id}
                        onClick={() => setCurrentLesson(les)}
                        className={`w-full text-left p-3 rounded-xl text-xs flex items-center justify-between gap-3 transition-colors ${
                          isSelected
                            ? 'bg-[#ffd8a2]/15 border border-[#ffd8a2]/30 text-[#ffd8a2]'
                            : 'hover:bg-white/5 text-[#fff0db]/80'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {les.type === 'video' && <PlayCircle className="size-3.5 shrink-0 text-[#ffd8a2]/70" />}
                          {les.type === 'quiz' && <HelpCircle className="size-3.5 shrink-0 text-[#ffd8a2]/70" />}
                          {les.type === 'pdf' && <FileText className="size-3.5 shrink-0 text-[#ffd8a2]/70" />}
                          <span className="truncate">{les.title}</span>
                        </div>

                        {isDone && <CheckCircle className="size-3.5 text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};
