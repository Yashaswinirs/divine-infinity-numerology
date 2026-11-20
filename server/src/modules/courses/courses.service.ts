import { CoursesModel } from './courses.model';
import type { Course, CourseModule } from '@divine/types';

export class CoursesService {
  static listPublishedCourses(): Course[] {
    return CoursesModel.getAll().filter((c) => c.status === 'published');
  }

  static listAllCourses(): Course[] {
    return CoursesModel.getAll();
  }

  static getCourseDetails(idOrSlug: string): { course: Course; modules: CourseModule[] } {
    let course = CoursesModel.getById(idOrSlug);
    if (!course) {
      course = CoursesModel.getBySlug(idOrSlug);
    }
    if (!course) throw new Error('Course not found');

    const modules = CoursesModel.getModulesWithLessons(course.id);
    return { course, modules };
  }

  static createCourse(input: Partial<Course>, instructorId: string, instructorName: string): Course {
    const id = `course-${Date.now()}`;
    const slug = input.title
      ? input.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      : id;

    const newCourse: Course = {
      id,
      slug,
      title: input.title || 'Untitled Course',
      summary: input.summary || '',
      description: input.description || '',
      thumbnailUrl: input.thumbnailUrl || '/images/courses/courses-hero.webp',
      level: input.level || 'all-levels',
      durationHours: input.durationHours || 10,
      price: input.price || 0,
      originalPrice: input.originalPrice,
      currency: input.currency || 'INR',
      status: input.status || 'draft',
      instructorId,
      instructorName,
      tags: input.tags || [],
      modulesCount: 0,
      lessonsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return CoursesModel.create(newCourse);
  }

  static updateCourse(id: string, updates: Partial<Course>): Course {
    const updated = CoursesModel.update(id, updates);
    if (!updated) throw new Error('Course not found');
    return updated;
  }

  static deleteCourse(id: string): boolean {
    return CoursesModel.delete(id);
  }
}
