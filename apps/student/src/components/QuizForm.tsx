import React, { useState, useEffect } from 'react';
import { QuizService } from '../services/quiz.service';
import type { Quiz, QuizAttempt } from '@divine/types';
import { CheckCircle2, XCircle, Award } from 'lucide-react';

interface QuizFormProps {
  quizId: string;
  onPassed?: () => void;
}

export const QuizForm: React.FC<QuizFormProps> = ({ quizId, onPassed }) => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizAttempt | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    QuizService.getQuiz(quizId)
      .then(setQuiz)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [quizId]);

  const handleSelect = (questionId: string, optionId: string) => {
    if (result) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await QuizService.submitQuiz(quizId, answers);
      setResult(res);
      if (res.isPassed && onPassed) {
        onPassed();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-[#ffd8a2]/60">Loading assessment questions...</div>;
  if (error) return <div className="p-8 text-center text-red-400">{error}</div>;
  if (!quiz) return null;

  return (
    <div className="bg-[#140e2b] border border-[#ffd8a2]/20 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-xl">
      <div className="border-b border-[#ffd8a2]/15 pb-4 mb-6">
        <h3 className="text-xl font-bold text-[#fff0db]">{quiz.title}</h3>
        <p className="text-xs text-[#ffd8a2]/60 mt-1">
          Passing mark: {quiz.passPercentage}% | Total Questions: {quiz.questions.length}
        </p>
      </div>

      {result ? (
        <div className="text-center py-6 space-y-4">
          {result.isPassed ? (
            <div className="size-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="size-8" />
            </div>
          ) : (
            <div className="size-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/40">
              <XCircle className="size-8" />
            </div>
          )}

          <div>
            <h4 className="text-lg font-bold text-white">
              {result.isPassed ? 'Congratulations! You Passed!' : 'Assessment Not Passed'}
            </h4>
            <p className="text-sm text-[#ffd8a2]/70 mt-1">
              Your score: {result.score} / {result.totalScore} ({result.percentage}%)
            </p>
          </div>

          {result.isPassed && (
            <div className="p-4 rounded-xl bg-[#ffd8a2]/10 border border-[#ffd8a2]/30 text-xs text-[#ffd8a2] flex items-center justify-center gap-2">
              <Award className="size-4" />
              Lesson completed and verified!
            </div>
          )}

          {!result.isPassed && (
            <button
              onClick={() => setResult(null)}
              className="px-6 py-2.5 bg-[#ffd8a2] text-[#0e081e] font-semibold text-xs rounded-xl hover:bg-[#c99e64] transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {quiz.questions.map((q, idx) => (
            <div key={q.id} className="space-y-3">
              <p className="text-sm font-semibold text-[#fff0db]">
                {idx + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt) => {
                  const isSelected = answers[q.id] === opt.id;
                  return (
                    <label
                      key={opt.id}
                      onClick={() => handleSelect(q.id, opt.id)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#ffd8a2] bg-[#ffd8a2]/15 text-[#ffd8a2]'
                          : 'border-white/10 hover:border-white/20 bg-white/5 text-[#fff0db]/80'
                      }`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        checked={isSelected}
                        onChange={() => {}}
                        className="accent-[#ffd8a2]"
                      />
                      <span>{opt.text}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={submitting || Object.keys(answers).length !== quiz.questions.length}
            className="w-full py-3 bg-gradient-to-r from-[#ffd8a2] to-[#c99e64] text-[#0e081e] font-bold text-sm rounded-xl shadow-lg hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer"
          >
            {submitting ? 'Submitting Answers...' : 'Submit Assessment'}
          </button>
        </form>
      )}
    </div>
  );
};
