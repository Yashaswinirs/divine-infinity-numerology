import { AssessmentsModel } from './assessments.model';
import type { Quiz, QuizAttempt } from '@divine/types';

export class AssessmentsService {
  static getQuizForStudent(quizId: string): Omit<Quiz, 'questions'> & { questions: any[] } {
    const quiz = AssessmentsModel.getQuizById(quizId);
    if (!quiz) throw new Error('Quiz not found');

    // Strip out correct answers for security
    const sanitizedQuestions = quiz.questions.map(({ correctOptionId: _, ...rest }) => rest);
    return {
      ...quiz,
      questions: sanitizedQuestions,
    };
  }

  static submitQuiz(studentId: string, quizId: string, answers: Record<string, string>): QuizAttempt {
    const quiz = AssessmentsModel.getQuizById(quizId);
    if (!quiz) throw new Error('Quiz not found');

    let correctCount = 0;
    const total = quiz.questions.length;

    for (const q of quiz.questions) {
      if (answers[q.id] === q.correctOptionId) {
        correctCount++;
      }
    }

    const percentage = Math.round((correctCount / total) * 100);
    const isPassed = percentage >= quiz.passPercentage;

    const attempt: QuizAttempt = {
      id: `att-${Date.now()}`,
      quizId,
      studentId,
      score: correctCount,
      totalScore: total,
      percentage,
      isPassed,
      submittedAt: new Date().toISOString(),
    };

    return AssessmentsModel.saveAttempt(attempt);
  }
}
