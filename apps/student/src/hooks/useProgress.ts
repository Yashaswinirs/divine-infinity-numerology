import { useState, useEffect, useCallback } from 'react';
import { ProgressService } from '../services/progress.service';
import type { CourseProgressDetail } from '@divine/types';

export function useProgress(courseId?: string) {
  const [progress, setProgress] = useState<CourseProgressDetail | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProgress = useCallback(async () => {
    if (!courseId) return;
    setLoading(true);
    try {
      const data = await ProgressService.getCourseProgress(courseId);
      setProgress(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const markComplete = async (lessonId: string, isCompleted = true) => {
    if (!courseId) return;
    const updated = await ProgressService.markLessonComplete(courseId, lessonId, isCompleted);
    setProgress(updated);
    return updated;
  };

  return { progress, loading, refresh: fetchProgress, markComplete };
}
