import type { Quiz, QuizAttempt } from '@divine/types';
import { db } from '../../config/db.config';

const attempts = new Map<string, QuizAttempt>();

export class AssessmentsModel {
  static getQuizById(id: string): Quiz | undefined {
    return db.quizzes.get(id);
  }

  static getQuizByLessonId(lessonId: string): Quiz | undefined {
    for (const q of db.quizzes.values()) {
      if (q.lessonId === lessonId) return q;
    }
    return undefined;
  }

  static saveAttempt(attempt: QuizAttempt): QuizAttempt {
    attempts.set(attempt.id, attempt);
    return attempt;
  }

  static getAttempts(studentId: string, quizId: string): QuizAttempt[] {
    return Array.from(attempts.values()).filter(
      (a) => a.studentId === studentId && a.quizId === quizId
    );
  }
}
