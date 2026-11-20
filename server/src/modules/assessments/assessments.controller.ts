import type { Request, Response } from 'express';
import { AssessmentsService } from './assessments.service';

export class AssessmentsController {
  static async getQuiz(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const quiz = AssessmentsService.getQuizForStudent(id as string);
      res.status(200).json({ success: true, data: quiz });
    } catch (err: any) {
      res.status(404).json({ success: false, error: err.message });
    }
  }

  static async submit(req: Request, res: Response): Promise<void> {
    try {
      const studentId = req.user!.id;
      const { quizId, answers } = req.body;
      const result = AssessmentsService.submitQuiz(studentId, quizId, answers);
      res.status(200).json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
}
