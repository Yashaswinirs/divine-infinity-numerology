import * as React from "react";
import { cn } from "@/lib";
import { FoundationCard } from "./FoundationCard";

export interface ExperienceCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items?: string[];
  className?: string;
}

const defaultExperienceItems: string[] = [
  "Financial Analyst",
  "Data Analyst",
  "Team Lead",
  "Corporate Trainer",
];

/**
 * ExperienceCard Component (Column 2)
 *
 * Displays professional roles with connected timeline dots and dashed separators
 * inside the shared FoundationCard shell.
 * - Fluid Responsive Dimensions:
 *   - Mobile (<768px): outer 374 x 257 (strip 16px, inner 358 x 241)
 *   - Tablet (768px): outer 374 x 257 (strip 16px, inner 358 x 241)
 *   - Desktop (1280px+): outer 374 x 265 (strip 24px, inner 350 x 241)
 * - Bullet Points: 8x8 circle (w-2 h-2), bg rgba(255, 216, 162, 1) (#FFD8A2), opacity 1
 * - Horizontal Separators: width 226px, 4px dash / 4px gap, color #FFF0DB, opacity 1
 */
export function ExperienceCard({
  items = defaultExperienceItems,
  className,
  ...props
}: ExperienceCardProps) {
  return (
    <FoundationCard
      className={cn("h-[257px] xl:h-[265px]", className)}
      innerClassName="h-[241px] flex items-center py-[24px]"
      {...props}
    >
      <ol
        role="list"
        aria-label="Professional experience timeline"
        className="relative z-10 flex w-full flex-col pl-[18px] pr-[24px]"
      >
        {/* Vertical Dashed Connector: spans from center of 1st dot to center of 4th dot */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[21.5px] top-[23px] bottom-[23px] w-px bg-[repeating-linear-gradient(to_bottom,#FFD8A2_0px,#FFD8A2_3px,transparent_3px,transparent_6px)] opacity-70"
        />

        {items.map((item, index) => {
          const isNotLast = index < items.length - 1;

          return (
            <li
              key={index}
              className="relative flex items-center gap-[16px] py-[12px]"
            >
              {/* Bullet point: 8x8 circle, bg #FFD8A2, opacity 1 */}
              <span
                aria-hidden="true"
                className="relative z-10 h-2 w-2 shrink-0 rounded-full bg-[#FFD8A2] opacity-100"
              />

              {/* Item Text */}
              <span className="font-lato font-medium text-[16px] leading-[22.2px] tracking-[0.01em] text-[#FFD8A2]">
                {item}
              </span>

              {/* 1px Dashed Horizontal Line: width 226px, 4px dash / 4px gap, color #FFF0DB, opacity 1 */}
              {isNotLast && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 left-[24px] max-w-[calc(100%-24px)] w-[226px] h-px bg-[repeating-linear-gradient(to_right,#FFF0DB_0px,#FFF0DB_4px,transparent_4px,transparent_8px)] opacity-100"
                />
              )}
            </li>
          );
        })}
      </ol>
    </FoundationCard>
  );
}
