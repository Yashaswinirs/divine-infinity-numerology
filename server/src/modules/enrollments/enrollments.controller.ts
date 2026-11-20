import type { Request, Response } from 'express';
import { EnrollmentsService } from './enrollments.service';

export class EnrollmentsController {
  static async getMyEnrollments(req: Request, res: Response): Promise<void> {
    try {
      const studentId = req.user!.id;
      const data = EnrollmentsService.getStudentEnrollments(studentId);
      res.status(200).json({ success: true, data });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async listAll(_req: Request, res: Response): Promise<void> {
    try {
      const data = EnrollmentsService.getAllEnrollments();
      res.status(200).json({ success: true, data });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async enroll(req: Request, res: Response): Promise<void> {
    try {
      const studentId = req.user!.id;
      const { courseId } = req.body;
      const enrollment = EnrollmentsService.enrollStudent(studentId, courseId);
      res.status(201).json({ success: true, data: enrollment });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
}
