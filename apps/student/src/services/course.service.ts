import { apiFetch } from './api';
import type { Course, CourseModule, Enrollment } from '@divine/types';

export class CourseService {
  static async getMyEnrollments(): Promise<Array<Enrollment & { course: Course }>> {
    return apiFetch<Array<Enrollment & { course: Course }>>('/enrollments/my-courses');
  }

  static async getCourseDetails(courseId: string): Promise<{ course: Course; modules: CourseModule[] }> {
    return apiFetch<{ course: Course; modules: CourseModule[] }>(`/courses/${courseId}`);
  }
}
