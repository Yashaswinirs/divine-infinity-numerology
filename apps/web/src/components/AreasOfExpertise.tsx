import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib";
import { SectionOrnament } from "@/components/shared";
import {
  defaultAreasOfExpertise,
  type AreasOfExpertiseData,
} from "@/data/areas-of-expertise";

export interface AreasOfExpertiseProps
  extends React.HTMLAttributes<HTMLElement> {
  data?: AreasOfExpertiseData;
  className?: string;
}

/**
 * Helper to split text by {name} placeholder and highlight occurrences
 * Words are normal text, while {name} is highlighted with color #FFD8A2
 */
function renderDescriptionWithName(text: string, name: string) {
  if (!text.includes("{name}")) return text;
  const parts = text.split("{name}");
  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && (
            <span className="text-[#FFD8A2]">{name}</span>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

/**
 * AreasOfExpertise Section Component
 *
 * Measured from Figma specs:
 * - Master Desktop Frame: 1440px x 567px, angle 0deg, opacity 1
 * - Layout Responsive Rules:
 *   - 1440px Desktop: 5 columns x 3 rows (Grid width at 1440px: 1280px = 5 x 248 + 4 x 10)
 *   - 768px Tablet: 3 columns x 5 rows
 *   - 375px - 425px Mobile: exactly 2 cards per row
 *   - Below 375px (<375px): 1 card per row with the same box width (180px) and height (55px)
 */
export function AreasOfExpertise({
  data = defaultAreasOfExpertise,
  className,
  ...props
}: AreasOfExpertiseProps) {
  const { name, heading, description, items } = data;

  return (
    <section
      aria-labelledby="areas-of-expertise-heading"
      className={cn("relative w-full overflow-hidden", className)}
      {...props}
    >
      {/* Background Starry Sky Overlay */}
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

      {/* Inner wrapper: max-w-[1440px], fluid padding and gap */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center px-[clamp(0.875rem,5.6vw,5rem)] py-[clamp(2.5rem,5vw,3.75rem)] gap-[clamp(2rem,4.2vw,3.75rem)]">
        {/* Header Block: max-w-[898px] */}
        <div className="mx-auto flex w-full max-w-[898px] flex-col items-center text-center gap-[clamp(1.5rem,2.8vw,2.5rem)]">
          {/* Reusable Section Ornament */}
          <SectionOrnament
            aria-hidden="true"
            className="mx-auto flex w-[clamp(13.75rem,25vw,22.625rem)] max-w-full justify-center"
            imageClassName="w-full h-auto"
          />

          {/* Heading + Paragraph Group */}
          <div className="flex w-full flex-col items-center gap-[clamp(1rem,1.75vw,1.5625rem)]">
            <h2
              id="areas-of-expertise-heading"
              className="font-heading font-normal text-[#FFD8A2] text-center tracking-normal text-balance text-[clamp(1.75rem,0.6rem_+_3.4vw,2.747rem)] leading-[1.09]"
            >
              {heading}
            </h2>

            <p className="w-full max-w-[898px] text-center font-lato font-medium text-white/90 text-[clamp(0.875rem,0.8rem_+_0.3vw,1.125rem)] leading-[clamp(1.25rem,1.1rem_+_0.4vw,1.4125rem)] tracking-[0.01em]">
              {renderDescriptionWithName(description, name)}
            </p>
          </div>
        </div>

        {/* Expertise Grid: 5 (desktop) -> 3 (tablet) -> 2 (till 375 mobile) -> 1 (below 375) */}
        <ul
          role="list"
          className="[--gap:10px] [--box-w:clamp(11.25rem,max(9.701rem_+_5.831vw,9.0714rem_+_7.143vw),15.5rem)] mx-auto flex w-full max-w-[calc(5*var(--box-w)+4*var(--gap))] flex-wrap justify-center gap-[var(--gap)]"
        >
          {items.map((item, index) => (
            <li
              key={index}
              className={cn(
                "flex min-h-[3.4375rem] items-center justify-start gap-[8px] rounded-[8px] bg-[#FFF0DB] p-[8px] min-[375px]:p-[10px] min-[375px]:gap-[10px]",
                // Below 375px (<375px): 1 card per row with the current box width and height
                "max-[374px]:w-[var(--box-w)] max-[374px]:max-w-[280px]",
                // From 375px to 599px: exactly 2 cards per row
                "min-[375px]:max-[599px]:w-[calc((100%-var(--gap))/2)] min-[375px]:max-[599px]:max-w-[190px]",
                // Tablet and desktop (600px+): standard fluid box-w
                "min-[600px]:w-[var(--box-w)]",
                "shrink-0"
              )}
            >
              <Image
                src={item.icon}
                alt=""
                width={32}
                height={32}
                aria-hidden="true"
                className="h-8 w-8 shrink-0 object-contain"
              />
              <span className="flex-1 min-w-0 text-left font-lato font-bold text-[clamp(0.85rem,0.771rem_+_0.476vw,1.2rem)] leading-[clamp(1.15rem,1.07rem_+_0.661vw,1.665rem)] tracking-[0.01em] text-[#655373] break-words">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
export default AreasOfExpertise;
