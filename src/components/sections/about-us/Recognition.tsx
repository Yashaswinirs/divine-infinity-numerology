import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib";
import { SectionOrnament } from "@/components/shared";
import { RecognitionCard } from "./RecognitionCard";
import {
  defaultRecognition,
  type RecognitionData,
} from "@/data/recognition";

export interface RecognitionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "content"> {
  data?: RecognitionData;
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
 * Recognition Section Component ("Recognition Along the Journey")
 *
 * Measured from Figma specs:
 * - Outer Layout: 768px wide x 510.91px tall (min-h-[511px], py-[50px] px-4 md:px-[60px])
 * - Inner Wrapper: 648px wide x 410.91px tall, gap 38px (max-w-[648px] gap-[38px])
 * - Header Block: Centered ornament, Lovelace heading, Lato paragraph (with name highlighted)
 * - Card Shell: 648px x 238px, rounded 24px, linear-gradient background
 * - Background: Starry sky overlay (/images/about-us/building-strong-foundation/strong-foundation-stars.svg)
 */
export function Recognition({
  data = defaultRecognition,
  content,
  children,
  className,
  ...props
}: RecognitionProps) {
  const { name, heading, description, card = defaultRecognition.card } = data;
  const contentSlot = children ?? content;

  return (
    <section
      aria-labelledby="recognition-heading"
      className={cn(
        "relative w-full overflow-hidden bg-transparent py-[50px] px-4 md:px-[60px] min-h-[511px]",
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

      {/* Inner Layout: max 939px desktop, 648px tablet (via px-[60px]), fluid mobile */}
      <div className="relative z-10 mx-auto flex w-full max-w-[58.6875rem] flex-col items-center gap-[38px]">
        {/* 1. Header Block: Center-aligned */}
        <div className="mx-auto flex w-full max-w-[800px] flex-col items-center gap-6 md:gap-[30px] text-center">
          {/* Centered Section Ornament */}
          <SectionOrnament className="mx-auto justify-center" />

          {/* Heading + Paragraph Group */}
          <div className="flex w-full flex-col items-center gap-[20px]">
            {/* Main Heading */}
            <h2
              id="recognition-heading"
              className="font-heading font-normal text-accent text-3xl leading-tight md:text-4xl lg:text-[43.95px] lg:leading-[48px] tracking-normal text-center"
            >
              {heading}
            </h2>

            {/* Paragraph: with {name} highlighted at 18px #FFD8A2 */}
            <p className="font-lato font-medium text-[16px] leading-[22.2px] tracking-[0.01em] text-white/90 text-center w-full max-w-[720px]">
              {renderTextWithName(description, name)}
            </p>
          </div>
        </div>

        {/* 2. Recognition Card (648px x 238px tablet -> 939px x 360px desktop) */}
        {contentSlot ?? <RecognitionCard card={card} />}
      </div>
    </section>
  );
}
