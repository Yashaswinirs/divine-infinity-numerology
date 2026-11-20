import type { Lesson } from '@divine/types';
import { db } from '../../config/db.config';

export class LessonsModel {
  static getById(id: string): Lesson | undefined {
    return db.lessons.get(id);
  }

  static getByModuleId(moduleId: string): Lesson[] {
    return Array.from(db.lessons.values())
      .filter((l) => l.moduleId === moduleId)
      .sort((a, b) => a.order - b.order);
  }

  static getByCourseId(courseId: string): Lesson[] {
    return Array.from(db.lessons.values())
      .filter((l) => l.courseId === courseId)
      .sort((a, b) => a.order - b.order);
  }

  static create(lesson: Lesson): Lesson {
    db.lessons.set(lesson.id, lesson);
    return lesson;
  }

  static update(id: string, updates: Partial<Lesson>): Lesson | undefined {
    const lesson = db.lessons.get(id);
    if (!lesson) return undefined;
    const updated = { ...lesson, ...updates };
    db.lessons.set(id, updated);
    return updated;
  }

  static delete(id: string): boolean {
    return db.lessons.delete(id);
  }
}
