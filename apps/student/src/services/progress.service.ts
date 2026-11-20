import { apiFetch } from './api';
import type { CourseProgressDetail } from '@divine/types';

export class ProgressService {
  static async getCourseProgress(courseId: string): Promise<CourseProgressDetail> {
    return apiFetch<CourseProgressDetail>(`/progress/course/${courseId}`);
  }

  static async markLessonComplete(courseId: string, lessonId: string, isCompleted = true): Promise<CourseProgressDetail> {
    return apiFetch<CourseProgressDetail>('/progress/update', {
      method: 'POST',
      body: JSON.stringify({ courseId, lessonId, isCompleted }),
    });
  }
}
