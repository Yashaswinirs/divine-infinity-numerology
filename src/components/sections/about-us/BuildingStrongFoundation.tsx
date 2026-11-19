import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib";
import { SectionOrnament } from "@/components/shared";
import { FoundationColumnHeader } from "./FoundationColumnHeader";
import { QualificationCard } from "./QualificationCard";
import { ExperienceCard } from "./ExperienceCard";
import { ContinuingEducationCard } from "./ContinuingEducationCard";
import {
  defaultBuildingFoundation,
  type BuildingFoundationData,
} from "@/data/building-foundation";

export interface BuildingStrongFoundationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "content"> {
  data?: BuildingFoundationData;
  content?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Helper to split text by {name} placeholder and highlight occurrences
 * Words are 16px, while {name} is highlighted at 18px with color #FFD8A2
 */
function renderTextWithName(text: string, name: string) {
  if (!text.includes("{name}")) return text;
  const parts = text.split("{name}");
  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && (
            <span className="text-[18px] text-[#FFD8A2]">{name}</span>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

/**
 * BuildingStrongFoundation Section Component
 *
 * Fluid Responsive Specifications:
 * - Inner Card Gradient Width:
 *   - Mobile (<768px) & Tablet (768px): exactly 358px (outer strip width = 16px total, 8px on each side)
 *   - Desktop (1280px+ / 1440px): exactly 350px (outer strip width = 24px total, 12px on each side)
 * - Outer Card: 374px wide (bg #FFF0DB, rounded-[24px])
 *   - Card 1: 374 x 188 mobile/tablet (inner 358 x 172) -> 374 x 196 desktop (inner 350 x 172)
 *   - Card 2: 374 x 257 mobile/tablet (inner 358 x 241) -> 374 x 265 desktop (inner 350 x 241)
 *   - Card 3: 374 x 218 mobile (inner 358 x 202) -> 374 x 296 tablet (inner 358 x 280) -> 374 x 353 desktop (inner 350 x 329)
 * - Layout:
 *   - Mobile & Tablet: Stacked one below the other (flex-col, gap-8 to gap-10)
 *   - Desktop: 3 columns side-by-side, bottom aligned (xl:grid-cols-[374px_374px_374px] xl:gap-[60px] xl:items-end)
 */
export function BuildingStrongFoundation({
  data = defaultBuildingFoundation,
  content,
  children,
  className,
  ...props
}: BuildingStrongFoundationProps) {
  const {
    name,
    heading,
    description,
    columns = defaultBuildingFoundation.columns ?? [],
  } = data;

  const contentSlot = children ?? content;

  return (
    <section
      aria-labelledby="building-foundation-heading"
      className={cn(
        "relative w-full overflow-hidden bg-transparent py-10 lg:min-h-[881px] lg:py-[60px]",
        className
      )}
      {...props}
    >
      {/* Background Stars Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none"
      >
        <Image
          src="/images/about-us/building-strong-foundation/strong-foundation-stars.svg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Inner wrapper: 1242px wide, fluid gap */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1242px] flex-col gap-10 md:gap-[40px] xl:gap-[60px] px-0 sm:px-4 md:px-8 xl:px-0">

        {/* 1. HEADER BLOCK: max-w-[898px] on tablet/base, lg:max-w-[936px] on desktop */}
        <div className="mx-auto flex w-full max-w-[898px] lg:max-w-[936px] flex-col items-center gap-6 md:gap-[40px] text-center px-4 sm:px-0">

          {/* Reusable Section Ornament (centered) */}
          <SectionOrnament className="mx-auto justify-center" />

          {/* Heading + Paragraph Group (gap 25px) */}
          <div className="flex w-full flex-col items-center gap-[25px]">
            {/* Heading */}
            <h2
              id="building-foundation-heading"
              className="font-heading font-normal text-accent text-3xl leading-tight md:text-4xl lg:text-[43.95px] lg:leading-[48px] tracking-normal text-center lg:max-w-[661px]"
            >
              {heading}
            </h2>

            {/* Paragraph: all words in 16px, with {name} highlighted in 18px #FFD8A2 */}
            <p className="font-lato font-medium text-[16px] leading-[22.2px] tracking-[0.01em] text-white/90 text-center w-full max-w-[898px] md:max-w-[720px] lg:max-w-[936px]">
              {renderTextWithName(description, name)}
            </p>
          </div>
        </div>

        {/* 2. CONTENT BLOCK: Stacked one below the other on mobile/tablet, 3-col on desktop */}
        {contentSlot ?? (
          <div className="flex w-full flex-col items-center gap-8 md:gap-10 xl:grid xl:grid-cols-[374px_374px_374px] xl:gap-[60px] xl:items-end mx-auto max-w-[1242px] px-2 sm:px-0">
            {columns.map((col, index) => (
              <div
                key={index}
                className="flex w-full max-w-[374px] mx-auto flex-col items-center gap-[16px] md:gap-[20px] xl:w-[374px]"
              >
                {/* Column Header Group (icon + <h3> heading) */}
                <FoundationColumnHeader
                  icon={col.icon}
                  title={col.title}
                />

                {/* Card Content based on Column Type */}
                {col.type === "academic" && (
                  <QualificationCard
                    qualification={col.qualification}
                    qualifications={col.qualifications}
                  />
                )}

                {col.type === "experience" && (
                  <ExperienceCard items={col.items} />
                )}

                {col.type === "education" && (
                  <ContinuingEducationCard
                    lead={col.lead}
                    institution={col.institution}
                  />
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
