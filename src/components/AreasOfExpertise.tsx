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
 * - Section Padding & Spacing (Fluid Clamps):
 *   - px-[clamp(1rem,5.6vw,5rem)]: side padding scales from 16px (1rem) on mobile to 80px (5rem) at 1440px
 *   - py-[clamp(2.5rem,5vw,3.75rem)]: vertical padding scales from 40px (2.5rem) on mobile to 60px (3.75rem) at 1440px
 *   - gap-[clamp(2rem,4.2vw,3.75rem)]: header-to-grid gap scales from 32px (2rem) on mobile to 60px (3.75rem) at 1440px
 * - Header Block:
 *   - gap-[clamp(1.5rem,2.8vw,2.5rem)]: ornament-to-text gap scales from 24px (1.5rem) on mobile to 40px (2.5rem) at 1440px
 *   - Ornament: w-[clamp(13.75rem,25vw,22.625rem)] scales from 220px (13.75rem) on mobile to 362px (22.625rem) at 1440px
 *   - Heading + Paragraph Gap: gap-[clamp(1rem,1.75vw,1.5625rem)] scales from 16px (1rem) on mobile to 25px (1.5625rem) at 1440px
 *   - Heading <h2>: Lovelace Text 400, #FFD8A2, text-[clamp(1.75rem,0.6rem_+_3.4vw,2.747rem)] (28px mobile -> 43.95px desktop), leading-[1.09] (48px desktop)
 *   - Paragraph <p>: Lato 500, text-white/90, text-[clamp(0.875rem,0.8rem_+_0.3vw,1.125rem)], leading-[clamp(1.25rem,1.1rem_+_0.4vw,1.4125rem)], tracking-[0.01em]
 * - Expertise Grid:
 *   - Wrapping flex container (no breakpoint jumps) automatically determines columns:
 *     - 1440px Desktop: 5 columns x 3 rows (Grid width at 1440px: 1280px = 5 x 248 + 4 x 10)
 *     - 768px Tablet: 3 columns x 5 rows
 *     - 425px Mobile: 2 columns (7 rows of 2 + 1 centered at bottom)
 *   - Gap: 10px, stored in --gap
 *   - [--box-w:clamp(11.25rem,max(9.701rem_+_5.831vw,9.0714rem_+_7.143vw),15.5rem)]:
 *     Box width: 180px @425, 200px @768, 248px @1440 using max(lineSlow, lineFast)
 *   - max-w-[calc(5*var(--box-w)+4*var(--gap))]: caps row at exactly 5 boxes (1280px desktop)
 *   - Each box: w-[var(--box-w)], min-h-[3.4375rem] (55px), rounded-[8px], p-[10px], gap-[10px], bg-[#FFF0DB]
 *   - Icon: 32x32 Image, aria-hidden="true"
 *   - Label: Lato 700 bold, text-[#655373], flex-1 wraps to 2 lines:
 *     - text-[clamp(1rem,0.771rem_+_0.476vw,1.2rem)] leading-[clamp(1.3875rem,1.07rem_+_0.661vw,1.665rem)]
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
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center px-[clamp(1rem,5.6vw,5rem)] py-[clamp(2.5rem,5vw,3.75rem)] gap-[clamp(2rem,4.2vw,3.75rem)]">
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

        {/* Expertise Grid: wrapping flex container auto-flowing 5 (desktop) -> 3 (tablet) -> 2 (mobile) */}
        <ul
          role="list"
          className="[--gap:10px] [--box-w:clamp(11.25rem,max(9.701rem_+_5.831vw,9.0714rem_+_7.143vw),15.5rem)] mx-auto flex w-full max-w-[calc(5*var(--box-w)+4*var(--gap))] flex-wrap justify-center gap-[var(--gap)]"
        >
          {items.map((item, index) => (
            <li
              key={index}
              className="flex min-h-[3.4375rem] w-[var(--box-w)] shrink-0 items-center justify-center gap-[10px] rounded-[8px] bg-[#FFF0DB] p-[10px]"
            >
              <Image
                src={item.icon}
                alt=""
                width={32}
                height={32}
                aria-hidden="true"
                className="h-8 w-8 shrink-0 object-contain"
              />
              <span className="flex-1 min-w-0 text-left font-lato font-bold text-[clamp(1rem,0.771rem_+_0.476vw,1.2rem)] leading-[clamp(1.3875rem,1.07rem_+_0.661vw,1.665rem)] tracking-[0.01em] text-[#655373] break-words">
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

