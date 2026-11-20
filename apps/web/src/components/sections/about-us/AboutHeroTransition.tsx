import * as React from "react";
import { cn } from "@/lib";

export interface AboutHeroTransitionProps {
  className?: string;
}

/**
 * Transition Layout between AboutHero and AboutTejaswini
 *
 * Matching the exact fade strip from Blogs and Homepage:
 * - Background: bg-page-gradient
 * - Blur: blur-hero-fade (softly feathering into adjacent sections)
 * - Fluid height: 80px (mobile) -> 79px (tablet) -> 95px (desktop)
 * - Centered on the seam between AboutHero and AboutTejaswini with -mt and -mb
 */
export function AboutHeroTransition({ className }: AboutHeroTransitionProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-page-gradient blur-hero-fade pointer-events-none relative z-10 w-full",
        "[--transition-h:clamp(4.938rem,max(min(5rem,5.077rem_-_0.292vw),3.795rem_+_2.381vw),5.938rem)]",
        "h-[var(--transition-h)] mt-[calc(var(--transition-h)*-0.5)] mb-[calc(var(--transition-h)*-0.5)]",
        className
      )}
    />
  );
}

export default AboutHeroTransition;
