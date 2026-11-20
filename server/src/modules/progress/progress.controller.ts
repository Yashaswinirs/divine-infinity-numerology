import type { Request, Response } from 'express';
import { ProgressService } from './progress.service';

export class ProgressController {
  static async getCourseProgress(req: Request, res: Response): Promise<void> {
    try {
      const studentId = req.user!.id;
      const { courseId } = req.params;
      const progress = ProgressService.getCourseProgressDetail(studentId, courseId as string);
      res.status(200).json({ success: true, data: progress });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async updateProgress(req: Request, res: Response): Promise<void> {
    try {
      const studentId = req.user!.id;
      const { courseId, lessonId, isCompleted, playbackPositionSeconds } = req.body;
      const result = ProgressService.markLessonComplete(
        studentId,
        courseId,
        lessonId,
        isCompleted ?? true,
        playbackPositionSeconds
      );
      res.status(200).json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
}
