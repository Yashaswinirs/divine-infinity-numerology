import type { Course, CourseModule } from '@divine/types';
import { db } from '../../config/db.config';

export class CoursesModel {
  static getAll(): Course[] {
    return Array.from(db.courses.values());
  }

  static getById(id: string): Course | undefined {
    return db.courses.get(id);
  }

  static getBySlug(slug: string): Course | undefined {
    for (const course of db.courses.values()) {
      if (course.slug === slug) return course;
    }
    return undefined;
  }

  static getModulesWithLessons(courseId: string): CourseModule[] {
    const modules: CourseModule[] = [];
    for (const mod of db.modules.values()) {
      if (mod.courseId === courseId) {
        // Collect lessons
        const lessons = Array.from(db.lessons.values())
          .filter((l) => l.moduleId === mod.id)
          .sort((a, b) => a.order - b.order);
        modules.push({ ...mod, lessons });
      }
    }
    return modules.sort((a, b) => a.order - b.order);
  }

  static create(course: Course): Course {
    db.courses.set(course.id, course);
    return course;
  }

  static update(id: string, updates: Partial<Course>): Course | undefined {
    const course = db.courses.get(id);
    if (!course) return undefined;
    const updated = { ...course, ...updates, updatedAt: new Date().toISOString() };
    db.courses.set(id, updated);
    return updated;
  }

  static delete(id: string): boolean {
    return db.courses.delete(id);
  }
}
