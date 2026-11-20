import * as React from "react";
import { cn } from "@/lib";
import { StatNumber, StatLabel } from "@/components/typography";

export interface StatItem {
  number: string;
  label: string;
}

export interface StatsRowProps extends React.HTMLAttributes<HTMLDivElement> {
  stats?: StatItem[];
  className?: string;
}

export const defaultStats: StatItem[] = [
  { number: "3+", label: "Years of Experience" },
  { number: "500+", label: "Consultations" },
  { number: "300+", label: "Students Guided" },
  { number: "20+", label: "Workshops Conducted" },
];

/**
 * StatsRow Component
 *
 * Measured from Figma specs:
 * - Mobile (425px): 2x2 grid, gap-x 24px, gap-y 32px, stat number 25.2px, label 16px
 * - Tablet/Laptop (768px-1024px): 4 across, center aligned with preserved gap
 * - Desktop (1440px): 4 across, gap 50px, stat number 43.95px, label 16px
 *
 * Scales seamlessly with zero breakpoint jumps using CSS clamp().
 */
export function StatsRow({ stats = defaultStats, className, ...props }: StatsRowProps) {
  return (
    <div
      className={cn(
        "grid w-full max-w-[817px] grid-cols-2",
        // Mobile 2x2 gap: 24px gap-x, 32px gap-y
        "gap-x-[clamp(1.5rem,1.185rem_+_1.18vw,2rem)] gap-y-[clamp(2rem,1.685rem_+_1.18vw,2.5rem)]",
        // Tablet to Desktop 4-col gap: 16px (768px) -> 50px (1440px)
        "md:grid-cols-4 md:gap-[clamp(1rem,-1.429rem_+_5.06vw,3.125rem)]",
        // Center aligned on tablet/laptop with preserved gap
        "md:mx-auto md:justify-items-center xl:mx-0 xl:justify-items-start",
        className
      )}
      {...props}
    >
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="flex min-w-0 w-full max-w-[166px] flex-col items-start text-left md:items-center md:text-center xl:items-start xl:text-left gap-[clamp(0.25rem,0.145rem_+_0.39vw,0.5rem)]"
        >
          <StatNumber className="text-left md:text-center xl:text-left leading-none">{stat.number}</StatNumber>
          <StatLabel className="break-words text-left md:text-center xl:text-left">{stat.label}</StatLabel>
        </div>
      ))}
    </div>
  );
}

export default StatsRow;
