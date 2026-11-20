import type { Request, Response } from 'express';
import { LessonsService } from './lessons.service';

export class LessonsController {
  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const studentId = req.user?.id;
      const isAdmin = req.user?.role === 'admin';
      const lesson = LessonsService.getLessonForStudent(id as string, studentId, isAdmin);
      res.status(200).json({ success: true, data: lesson });
    } catch (err: any) {
      res.status(403).json({ success: false, error: err.message });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const lesson = LessonsService.createLesson(req.body);
      res.status(201).json({ success: true, data: lesson });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updated = LessonsService.updateLesson(id as string, req.body);
      res.status(200).json({ success: true, data: updated });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      LessonsService.deleteLesson(id as string);
      res.status(200).json({ success: true, message: 'Lesson deleted' });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
}
