import * as React from "react";
import { cn } from "@/lib";

export interface BlogsHeroTransitionProps {
  className?: string;
}

/**
 * BlogsHeroTransition
 *
 * Transition layout between BlogsHero and FeaturedTopicsSection:
 * - Fluid responsive height across Figma anchor frames:
 *   - Mobile (425px): 80px (5rem)
 *   - Tablet (768px): 79px (4.9375rem)
 *   - Desktop (1440px): 95px (5.9375rem)
 * - Curve shape: V-shape (80px -> 79px -> 95px)
 *   - Line 1 (425 -> 768): 5.077rem - 0.292vw, capped at 5rem (80px) on mobile
 *   - Line 2 (768 -> 1440): 3.795rem + 2.381vw
 *   - Fluid formula: clamp(4.9375rem, max(min(5rem, 5.077rem - 0.292vw), 3.795rem + 2.381vw), 5.9375rem)
 * - Margins: -mt and -mb at 50% height so the transition is centered on the seam
 *   without introducing extra vertical space into the document flow.
 * - Layering: z-10 sitting over background layers, while foreground elements
 *   (WhatsApp button, SectionOrnament, and headings) sit at z-20+ in the foreground.
 */
export function BlogsHeroTransition({ className }: BlogsHeroTransitionProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-page-gradient blur-hero-fade pointer-events-none relative z-10 w-full",
        "[--transition-h:clamp(4.9375rem,max(min(5rem,5.077rem_-_0.292vw),3.795rem_+_2.381vw),5.9375rem)]",
        "h-[var(--transition-h)] mt-[calc(var(--transition-h)*-0.5)] mb-[calc(var(--transition-h)*-0.5)]",
        className
      )}
      style={{
        height: "var(--transition-h)",
        marginTop: "calc(var(--transition-h) * -0.5)",
        marginBottom: "calc(var(--transition-h) * -0.5)",
      }}
    />
  );
}

export default BlogsHeroTransition;
