"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks";
import { cn } from "@/lib";

export interface CountUpProps {
  /** Final number. */
  value: number;
  /** Static text before the number, e.g. "Top ". */
  prefix?: string;
  /** Static text after the number, e.g. "+". */
  suffix?: string;
  /** Count duration in ms. TODO(figma): not in the design; 2000 with ease-out is assumed. */
  durationMs?: number;
  className?: string;
}

const VISIBLE_RATIO = 0.5;

const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);

/**
 * Counts from 0 to `value` every time it scrolls into view (it resets when it leaves, so each visit
 * to the section plays it again). The server renders the final number, so no-JS and search engines
 * see the real value. Reduced motion: always the final number. The width of the final number is
 * reserved so the layout never jumps while counting. Screen readers read the final number once.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  durationMs = 2000,
  className,
}: CountUpProps) {
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    const root = rootRef.current;
    if (reducedMotion || !root) return;

    let frame = 0;
    const stop = () => cancelAnimationFrame(frame);

    const play = () => {
      const startedAt = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / durationMs, 1);
        setCurrent(Math.round(value * easeOutCubic(progress)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        stop();
        setCurrent(0);
        if (entry?.isIntersecting) play();
      },
      { threshold: VISIBLE_RATIO }
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      stop();
    };
  }, [value, durationMs, reducedMotion]);

  const shown = reducedMotion ? value : current;
  const finalText = `${prefix}${value}${suffix}`;

  return (
    <span ref={rootRef} className={cn("inline-grid justify-items-center", className)}>
      <span className="sr-only">{finalText}</span>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {finalText}
      </span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        {`${prefix}${shown}${suffix}`}
      </span>
    </span>
  );
}
