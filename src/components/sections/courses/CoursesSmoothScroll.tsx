"use client";

import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks";

/**
 * Smooth in-page scrolling for the Courses page only ("Explore Courses" goes to #courses).
 * The old value is restored when the page unmounts, so other pages are not affected.
 * Nothing is rendered. With prefers-reduced-motion the browser jumps instead of scrolling.
 */
export function CoursesSmoothScroll() {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "smooth";
    return () => {
      root.style.scrollBehavior = previous;
    };
  }, [reducedMotion]);

  return null;
}
