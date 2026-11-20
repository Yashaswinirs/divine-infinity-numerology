import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib";
import { SectionOrnament } from "@/components/shared";
import {
  defaultLearningPath,
  type PathOfLearningData,
  type TimelineItem,
} from "@/data/learning-path";

export interface PathOfLearningProps extends React.HTMLAttributes<HTMLElement> {
  data?: PathOfLearningData;
  className?: string;
}

/**
 * Helper to split text by {name} placeholder and highlight occurrences
 */
function renderParagraphWithName(text: string, name: string) {
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
 * Path of Learning Section Component
 *
 * Measured from Figma Desktop & Tablet specs:
 * - Desktop (lg and up):
 *   - Inner wrapper: max-w-[1280px], flex-row, items-center, gap-[76px]
 *   - LEFT column: lg:w-[802px], flex flex-col, gap-[40px]
 *   - RIGHT column: lg:w-[392px] shrink-0, flex flex-col, gap-[25px], items-start (~371px tall)
 * - Tablet (md, 768px frame):
 *   - max-w-[768px], padding md:px-[60px] md:py-[50px]
 *   - stacked flex-col, gap-[40px], both columns w-full
 * - Mobile (< 768px):
 *   - stacked flex-col, px-4 py-8, gap-[40px]
 *   - left column first, then timeline
 * - Background stars: /images/about-us/path-of-learning-stars.svg
 */
export function PathOfLearning({
  data = defaultLearningPath,
  className,
  ...props
}: PathOfLearningProps) {
  const { name, heading, subheading, paragraphs, timeline } = data;

  return (
    <section
      aria-labelledby="path-of-learning-heading"
      className={cn("relative w-full overflow-hidden bg-transparent", className)}
      {...props}
    >
      {/* Background Stars Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none"
      >
        <Image
          src="/images/about-us/path-of-learning-stars.svg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Responsive Container: uniform py-8 across all screens matching desktop 1440 gap */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col px-4 py-8 md:max-w-[768px] md:px-[60px] lg:max-w-[1280px] lg:flex-row lg:items-center lg:gap-[76px] lg:px-4">

        {/* LEFT COLUMN: lg:w-[802px] */}
        <div className="flex w-full flex-col gap-[40px] lg:w-[802px]">

          {/* Header Block: Ornament + Heading + Sub-heading */}
          <div className="flex flex-col gap-4 text-left">
            {/* 1. Ornament: fluid responsive (425px: 162px, 768px: 262px, 1280px: 362px), rgba(255, 216, 162, 1) */}
            <SectionOrnament />

            {/* 2. Heading */}
            <h2
              id="path-of-learning-heading"
              className="font-heading font-normal text-accent text-4xl md:text-5xl lg:text-[56px] leading-tight tracking-normal text-left"
            >
              {heading}
            </h2>

            {/* 3. Sub-heading */}
            {subheading && (
              <p className="font-heading font-medium text-secondary text-[18px] leading-[22.6px] tracking-normal text-left">
                {subheading}
              </p>
            )}
          </div>

          {/* Paragraphs Block */}
          <div className="flex flex-col gap-3 text-left">
            {paragraphs.map((pText, idx) => (
              <p
                key={idx}
                className="font-lato font-medium text-[16px] leading-[22.2px] tracking-[0.01em] text-white/90 text-left"
              >
                {renderParagraphWithName(pText, name)}
              </p>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Vertical Timeline */}
        <ol
          role="list"
          aria-label="Learning pathway"
          className="mt-8 flex w-full flex-col gap-[25px] items-start lg:mt-0 lg:w-[392px] lg:shrink-0"
        >
          {timeline.map((item: TimelineItem, index: number) => (
            <li
              key={index}
              className="relative flex flex-row items-center gap-[12px] p-[10px] h-[74px] w-fit max-w-full text-left"
            >
              {/* Dashed connector line between consecutive items only (3 total) */}
              {index < timeline.length - 1 && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[37px] top-[64px] h-[45px] w-px bg-[repeating-linear-gradient(to_bottom,#ECECEC_0px,#ECECEC_2px,transparent_2px,transparent_4px)]"
                />
              )}

              {/* Icon Circle: 54x54, rounded-[90px], #FFD8A2 background */}
              <div
                aria-hidden="true"
                className="relative flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-[90px] bg-[#FFD8A2] overflow-hidden"
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={54}
                  height={54}
                  aria-hidden="true"
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Label */}
              <span className="min-w-0 font-lato font-normal text-[18px] leading-[26px] md:text-[22.5px] md:leading-[30.7px] tracking-normal text-white">
                {item.title}
              </span>
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
}
