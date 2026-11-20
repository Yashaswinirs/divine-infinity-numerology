import * as React from "react";
import { cn } from "@/lib";
import { FoundationCard } from "./FoundationCard";

export interface ContinuingEducationCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  lead?: string;
  institution?: string;
  className?: string;
}

const defaultLead = "Currently pursuing Astrology at";
const defaultInstitution = "The Astrology Academy of India, Delhi";

/**
 * ContinuingEducationCard Component (Column 3)
 *
 * Displays ongoing education and institution inside the shared FoundationCard shell.
 * - Fluid Responsive Dimensions:
 *   - Mobile (<768px): outer 374 x 218 (strip 16px, inner 358 x 202)
 *   - Tablet (768px): outer 374 x 296 (strip 16px, inner 358 x 280)
 *   - Desktop (1280px+): outer 374 x 353 (strip 24px, inner 350 x 329)
 * - Fluid clamp ensures smooth scaling between mobile and tablet, transitioning to desktop height.
 * - Content: Vertically centered, left-aligned, max-w-[250px] wrapping onto 2 lines.
 */
export function ContinuingEducationCard({
  lead = defaultLead,
  institution = defaultInstitution,
  className,
  ...props
}: ContinuingEducationCardProps) {
  return (
    <FoundationCard
      className={cn(
        "h-[clamp(218px,calc(143.6px+19.85vw),296px)] xl:h-[353px]",
        className
      )}
      innerClassName="h-[clamp(202px,calc(127.6px+19.85vw),280px)] xl:h-[329px] flex items-center px-6 md:px-[50px] py-[24px]"
      {...props}
    >
      <div className="relative z-10 flex w-full max-w-[250px] flex-col gap-[6px] text-left">
        <p className="font-lato font-medium text-[16px] leading-[22.2px] tracking-[0.01em] text-[#FFF0DB]">
          {lead}
        </p>
        <p className="font-lato font-bold text-[18px] leading-[22.6px] tracking-normal text-[#FFD8A2]">
          {institution}
        </p>
      </div>
    </FoundationCard>
  );
}
