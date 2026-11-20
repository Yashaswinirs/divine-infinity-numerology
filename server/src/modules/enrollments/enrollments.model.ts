import type { Enrollment } from '@divine/types';
import { db } from '../../config/db.config';

export class EnrollmentsModel {
  static getById(id: string): Enrollment | undefined {
    return db.enrollments.get(id);
  }

  static getByStudentId(studentId: string): Enrollment[] {
    return Array.from(db.enrollments.values()).filter((e) => e.studentId === studentId);
  }

  static getAll(): Enrollment[] {
    return Array.from(db.enrollments.values());
  }

  static findStudentCourse(studentId: string, courseId: string): Enrollment | undefined {
    for (const e of db.enrollments.values()) {
      if (e.studentId === studentId && e.courseId === courseId) {
        return e;
      }
    }
    return undefined;
  }

  static create(enrollment: Enrollment): Enrollment {
    db.enrollments.set(enrollment.id, enrollment);
    return enrollment;
  }

  static update(id: string, updates: Partial<Enrollment>): Enrollment | undefined {
    const enr = db.enrollments.get(id);
    if (!enr) return undefined;
    const updated = { ...enr, ...updates, lastAccessedAt: new Date().toISOString() };
    db.enrollments.set(id, updated);
    return updated;
  }
}
