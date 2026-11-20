import type { LessonProgress } from '@divine/types';
import { db } from '../../config/db.config';

export class ProgressModel {
  static getProgress(studentId: string, lessonId: string): LessonProgress | undefined {
    return db.progress.get(`${studentId}_${lessonId}`);
  }

  static getCourseProgress(studentId: string, courseId: string): LessonProgress[] {
    return Array.from(db.progress.values()).filter(
      (p) => p.studentId === studentId && p.courseId === courseId
    );
  }

  static saveProgress(progress: LessonProgress): LessonProgress {
    db.progress.set(`${progress.studentId}_${progress.lessonId}`, progress);
    return progress;
  }
}
