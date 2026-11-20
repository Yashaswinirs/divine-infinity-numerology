import { LessonsModel } from './lessons.model';
import { db } from '../../config/db.config';
import type { Lesson } from '@divine/types';

export class LessonsService {
  static getLessonForStudent(lessonId: string, studentId?: string, isAdmin = false): Lesson {
    const lesson = LessonsModel.getById(lessonId);
    if (!lesson) throw new Error('Lesson not found');

    if (isAdmin || lesson.isFreePreview) {
      return lesson;
    }

    if (!studentId) {
      throw new Error('Please log in to access this lesson');
    }

    // Check enrollment
    const isEnrolled = Array.from(db.enrollments.values()).some(
      (e) => e.studentId === studentId && e.courseId === lesson.courseId && e.status === 'active'
    );

    if (!isEnrolled) {
      throw new Error('Enrollment required to access this lesson');
    }

    return lesson;
  }

  static createLesson(input: Partial<Lesson>): Lesson {
    const id = `les-${Date.now()}`;
    const newLesson: Lesson = {
      id,
      moduleId: input.moduleId || '',
      courseId: input.courseId || '',
      title: input.title || 'New Lesson',
      description: input.description,
      type: input.type || 'video',
      durationMinutes: input.durationMinutes || 10,
      order: input.order || 1,
      isFreePreview: !!input.isFreePreview,
      videoUrl: input.videoUrl,
      pdfUrl: input.pdfUrl,
      textContent: input.textContent,
      quizId: input.quizId,
    };

    return LessonsModel.create(newLesson);
  }

  static updateLesson(id: string, updates: Partial<Lesson>): Lesson {
    const updated = LessonsModel.update(id, updates);
    if (!updated) throw new Error('Lesson not found');
    return updated;
  }

  static deleteLesson(id: string): boolean {
    return LessonsModel.delete(id);
  }
}
