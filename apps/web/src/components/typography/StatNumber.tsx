"use client";

import * as React from "react";
import { cn } from "@/lib";

export interface StatNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: "span" | "div" | "p" | "h3";
  className?: string;
  duration?: number;
  children?: React.ReactNode;
}

/**
 * StatNumber Component
 *
 * Renders the milestone/counting numbers:
 * - Font: font-heading (Lovelace Text, 400 normal weight, tracking-normal - matches Recognition title)
 * - Size: type-stat-number (fluid responsive clamp across mobile, tablet, and desktop)
 * - Smooth viewport-triggered count-up animation
 */
export function StatNumber({
  as: Component = "span",
  className,
  duration = 2000,
  children,
  ...props
}: StatNumberProps) {
  const containerRef = React.useRef<HTMLElement | null>(null);
  const [count, setCount] = React.useState<number>(0);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  const textContent = React.useMemo(() => {
    if (typeof children === "string" || typeof children === "number") {
      return String(children);
    }
    return "";
  }, [children]);

  const parsed = React.useMemo(() => {
    const match = textContent.match(/^(\d+)(.*)$/);
    if (match && match[1]) {
      return { target: parseInt(match[1], 10), suffix: match[2] ?? "" };
    }
    return null;
  }, [textContent]);

  React.useEffect(() => {
    if (!parsed) return;
    const el = containerRef.current;
    if (!el) return;

    const startAnimation = () => {
      if (hasAnimated) return;
      setHasAnimated(true);

      let startTime: number | null = null;
      let frameId: number;

      const step = (now: number) => {
        if (!startTime) startTime = now;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Smooth ease-out cubic curve
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(ease * parsed.target);

        setCount(current);

        if (progress < 1) {
          frameId = requestAnimationFrame(step);
        } else {
          setCount(parsed.target);
        }
      };

      frameId = requestAnimationFrame(step);
      return () => cancelAnimationFrame(frameId);
    };

    if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startAnimation();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.15 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      startAnimation();
    }
  }, [parsed, duration, hasAnimated]);

  if (!parsed) {
    return (
      <Component
        className={cn(
          "font-heading font-normal type-stat-number tracking-normal text-secondary",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      ref={(node: HTMLElement | null) => {
        containerRef.current = node;
      }}
      className={cn(
        "inline-flex items-baseline font-heading font-normal type-stat-number tracking-normal text-secondary",
        className
      )}
      {...props}
    >
      <span>{hasAnimated ? count : parsed.target}</span>
      {parsed.suffix && (
        <span className="font-heading font-normal text-[0.7em] align-top relative -top-[0.08em] ml-0.5">
          {parsed.suffix}
        </span>
      )}
    </Component>
  );
}
