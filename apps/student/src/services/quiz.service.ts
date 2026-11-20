import { apiFetch } from './api';
import type { Quiz, QuizAttempt } from '@divine/types';

export class QuizService {
  static async getQuiz(quizId: string): Promise<Quiz> {
    return apiFetch<Quiz>(`/assessments/${quizId}`);
  }

  static async submitQuiz(quizId: string, answers: Record<string, string>): Promise<QuizAttempt> {
    return apiFetch<QuizAttempt>('/assessments/submit', {
      method: 'POST',
      body: JSON.stringify({ quizId, answers }),
    });
  }
}
