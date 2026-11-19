import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib";
import { SectionOrnament } from "@/components/shared";
import { CertificateCard } from "./CertificateCard";
import {
  defaultCertificates,
  type CertificatesData,
} from "@/data/certificates";

export interface CertificatesProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "content"> {
  data?: CertificatesData;
  content?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Helper to split text by {name} placeholder and highlight occurrences
 * Words are 16px, while {name} is highlighted at 1.125em (18px) with color #FFD8A2
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
            <span className="text-[1.125em] text-[#FFD8A2]">{name}</span>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

/**
 * Certificates Section Component ("A Commitment to Continuous Learning")
 *
 * FIGMA ANCHORS (angle 0deg, opacity 1):
 * - Mobile  (425px):  Section padding: 16px (1rem) / 40px (2.5rem) | Header gap: 24px (1.5rem) | Heading: 30px (1.875rem) / 1.1 | Cards: 1 column
 * - Tablet  (768px):  Section padding: ~15.36px / ~47.6px | Header gap: ~30.6px | Heading: 36px (2.25rem) / 1.1 | Cards: 2 columns (gap 20px / 24px)
 * - Desktop (1440px): Section padding: 32px (2rem) / 60px (3.75rem) | Header gap: 40px (2.5rem) | Heading: 43.95px (2.747rem) / 1.1 (~48px) | Cards: 2x2 grid (1231px total, gap 60px / 40px)
 *
 * FLUID FORMULAS (Zero breakpoint jumps, seamlessly scales 320px -> 1920px):
 * - Section px: clamp(1rem, 2vw, 2rem)
 *   Scales horizontal padding: 16px (mobile) -> 32px (1440px desktop).
 * - Section py: clamp(2.5rem, 1.977rem + 1.97vw, 3.75rem)
 *   Scales vertical padding: 40px @425px -> 60px @1440px desktop. Cards decide content height naturally (no min-h).
 * - Inner wrapper gap: clamp(1.5rem, 1rem + 1.8vw, 2.6875rem)
 *   Scales spacing between header and cards container from 24px to 43px. Max-width is 76.9375rem (1231px = 2 * 585.5px + 60px).
 * - Header block gap: clamp(1.5rem, 1.0814rem + 1.576vw, 2.5rem)
 *   Scales gap between SectionOrnament and text group from 24px (mobile) to 40px (desktop).
 * - Heading <h2>: text-[clamp(1.875rem,min(1.4103rem_+_1.7493vw,1.6822rem_+_1.183vw),2.746875rem)] leading-[1.1]
 *   Scales title smoothly: 30px @425px -> 36px @768px -> 43.95px @1440px (leading 1.1 = ~48px desktop).
 * - Paragraph <p>: text-[16px] leading-[1.3875] tracking-[0.01em] text-white/90 max-w-[62rem]
 *   Fixed 16px base with 1.3875 (22.2px) line height; {name} highlighted at text-[1.125em] (18px) text-[#FFD8A2].
 * - Cards container: flex flex-wrap justify-center items-stretch gap-x-[clamp(1.25rem,-1.607rem_+_5.952vw,3.75rem)] gap-y-[clamp(1.5rem,0.357rem_+_2.381vw,2.5rem)]
 *   Self-wrapping flex container: gap-x: 20px @768px -> 60px @1440px; gap-y: 24px @768px -> 40px @1440px.
 */
export function Certificates({
  data = defaultCertificates,
  content,
  children,
  className,
  ...props
}: CertificatesProps) {
  const {
    name,
    heading,
    description,
    cards = defaultCertificates.cards,
  } = data;

  const contentSlot = children ?? content;

  return (
    <section
      aria-labelledby="certificates-heading"
      className={cn(
        "relative w-full overflow-hidden bg-transparent px-[clamp(1rem,2vw,2rem)] py-[clamp(2.5rem,1.977rem_+_1.97vw,3.75rem)]",
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

      {/* Inner wrapper: max-w-[76.9375rem] (1231px), fluid gap */}
      <div className="relative z-10 mx-auto flex w-full max-w-[76.9375rem] flex-col items-center gap-[clamp(1.5rem,1rem_+_1.8vw,2.6875rem)]">
        {/* 1. Header Block: Center-aligned */}
        <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center gap-[clamp(1.5rem,1.0814rem_+_1.576vw,2.5rem)] text-center">
          {/* Centered Section Ornament */}
          <SectionOrnament className="mx-auto justify-center" />

          {/* Heading + Paragraph Group */}
          <div className="flex w-full flex-col items-center gap-[25px]">
            {/* Main Heading */}
            <h2
              id="certificates-heading"
              className="font-heading font-normal text-accent text-center tracking-normal text-balance text-[clamp(1.875rem,min(1.4103rem_+_1.7493vw,1.6822rem_+_1.183vw),2.746875rem)] leading-[1.1]"
            >
              {heading}
            </h2>

            {/* Paragraph: 16px font, leading 1.3875 (22.2px), {name} 1.125em (18px) text-[#FFD8A2] */}
            <p className="w-full max-w-[62rem] text-center font-lato font-medium text-[16px] leading-[1.3875] tracking-[0.01em] text-white/90">
              {renderTextWithName(description, name)}
            </p>
          </div>
        </div>

        {/* 2. Cards Container: Self-wrapping flex container (1 per row mobile, 2 per row tablet/desktop) */}
        {contentSlot ?? (
          <div className="flex w-full flex-wrap items-stretch justify-center gap-x-[clamp(1.25rem,-1.607rem_+_5.952vw,3.75rem)] gap-y-[clamp(1.5rem,0.357rem_+_2.381vw,2.5rem)]">
            {cards.slice(0, 4).map((cardItem, index) => (
              <CertificateCard
                key={cardItem.id || index}
                item={cardItem}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
