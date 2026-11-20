import { ProgressModel } from './progress.model';
import { db } from '../../config/db.config';
import { EnrollmentsModel } from '../enrollments/enrollments.model';
import type { CourseProgressDetail, LessonProgress } from '@divine/types';

export class ProgressService {
  static getCourseProgressDetail(studentId: string, courseId: string): CourseProgressDetail {
    const courseLessons = Array.from(db.lessons.values()).filter((l) => l.courseId === courseId);
    const studentProgress = ProgressModel.getCourseProgress(studentId, courseId);

    const lessonProgressMap: Record<string, boolean> = {};
    let completedCount = 0;
    let lastLessonId: string | undefined;

    for (const lesson of courseLessons) {
      const p = studentProgress.find((prog) => prog.lessonId === lesson.id);
      const isCompleted = p?.isCompleted || false;
      lessonProgressMap[lesson.id] = isCompleted;
      if (isCompleted) {
        completedCount++;
        lastLessonId = lesson.id;
      }
    }

    const total = courseLessons.length || 1;
    const percentage = Math.round((completedCount / total) * 100);

    return {
      courseId,
      studentId,
      totalLessons: courseLessons.length,
      completedLessons: completedCount,
      completionPercentage: percentage,
      isCourseCompleted: percentage === 100,
      lastLessonId,
      lessonProgressMap,
    };
  }

  static markLessonComplete(
    studentId: string,
    courseId: string,
    lessonId: string,
    isCompleted: boolean,
    playbackSeconds?: number
  ): CourseProgressDetail {
    const existing = ProgressModel.getProgress(studentId, lessonId);
    const progress: LessonProgress = {
      id: existing?.id || `prg-${Date.now()}`,
      studentId,
      courseId,
      lessonId,
      isCompleted,
      completedAt: isCompleted ? new Date().toISOString() : undefined,
      playbackPositionSeconds: playbackSeconds,
    };

    ProgressModel.saveProgress(progress);

    // Update enrollment percentage
    const summary = this.getCourseProgressDetail(studentId, courseId);
    const enrollment = EnrollmentsModel.findStudentCourse(studentId, courseId);
    if (enrollment) {
      EnrollmentsModel.update(enrollment.id, {
        completionPercentage: summary.completionPercentage,
        status: summary.isCourseCompleted ? 'completed' : 'active',
        completedAt: summary.isCourseCompleted ? new Date().toISOString() : undefined,
      });
    }

    return summary;
  }
}
