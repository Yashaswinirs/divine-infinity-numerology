import { EnrollmentsModel } from './enrollments.model';
import { db } from '../../config/db.config';
import type { Enrollment } from '@divine/types';

export class EnrollmentsService {
  static getStudentEnrollments(studentId: string) {
    const enrollments = EnrollmentsModel.getByStudentId(studentId);
    return enrollments.map((enr) => {
      const course = db.courses.get(enr.courseId);
      return {
        ...enr,
        course,
      };
    });
  }

  static getAllEnrollments() {
    const enrollments = EnrollmentsModel.getAll();
    return enrollments.map((enr) => {
      const student = db.users.get(enr.studentId);
      const course = db.courses.get(enr.courseId);
      const { passwordHash: _, ...safeStudent } = student || {};
      return {
        ...enr,
        student: safeStudent,
        course,
      };
    });
  }

  static enrollStudent(studentId: string, courseId: string): Enrollment {
    const existing = EnrollmentsModel.findStudentCourse(studentId, courseId);
    if (existing) {
      if (existing.status === 'active') return existing;
      const updated = EnrollmentsModel.update(existing.id, { status: 'active' });
      return updated!;
    }

    const course = db.courses.get(courseId);
    if (!course) throw new Error('Course not found');

    const newEnr: Enrollment = {
      id: `enr-${Date.now()}`,
      studentId,
      courseId,
      status: 'active',
      enrolledAt: new Date().toISOString(),
      completionPercentage: 0,
      lastAccessedAt: new Date().toISOString(),
    };

    return EnrollmentsModel.create(newEnr);
  }
}
