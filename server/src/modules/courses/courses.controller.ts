import type { Request, Response } from 'express';
import { CoursesService } from './courses.service';

export class CoursesController {
  static async list(req: Request, res: Response): Promise<void> {
    try {
      const isAdmin = req.user?.role === 'admin';
      const courses = isAdmin ? CoursesService.listAllCourses() : CoursesService.listPublishedCourses();
      res.status(200).json({ success: true, data: courses });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const details = CoursesService.getCourseDetails(id as string);
      res.status(200).json({ success: true, data: details });
    } catch (err: any) {
      res.status(404).json({ success: false, error: err.message });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const instructorId = req.user?.id || 'admin';
      const instructorName = 'Tejasswini';
      const course = CoursesService.createCourse(req.body, instructorId, instructorName);
      res.status(201).json({ success: true, data: course });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updated = CoursesService.updateCourse(id as string, req.body);
      res.status(200).json({ success: true, data: updated });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      CoursesService.deleteCourse(id as string);
      res.status(200).json({ success: true, message: 'Course deleted successfully' });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
}
