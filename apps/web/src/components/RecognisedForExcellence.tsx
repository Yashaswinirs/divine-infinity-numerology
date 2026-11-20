import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib";
import { SectionOrnament } from "@/components/shared";
import {
  defaultRecognisedForExcellence,
  type RecognisedForExcellenceData,
} from "@/data/recognised-for-excellence";

export interface RecognisedForExcellenceProps
  extends React.HTMLAttributes<HTMLElement> {
  data?: RecognisedForExcellenceData;
  className?: string;
}

/**
 * Shared Image Style Constants:
 * - Mobile (<544px / <34rem): All 5 images share identical aspect-[385/356], rounded-[8px], 1 per row
 * - Tablet (544px - 895px) & Desktop (896px+): Responsive aspect ratio overrides
 */
const IMAGE_BASE =
  "relative w-full overflow-hidden rounded-[8px] aspect-[385/356]";
const BIG_IMAGE =
  "min-[34rem]:aspect-[648/600] min-[56rem]:aspect-[628/582]";
const SMALL_IMAGE =
  "min-[34rem]:aspect-[314/329] min-[56rem]:aspect-[296/276]";

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
 * RecognisedForExcellence Section Component
 *
 * FIGMA ANCHORS (angle 0deg, opacity 1, image radius 8px at all sizes):
 * - Desktop (1440px / 90rem): Frame 1440 x 910, gallery 1280 x 582, gap 30px (--g)
 *   - Left featured image: 628 x 582 (aspect 628/582)
 *   - Right 2x2 grid: 622 x 582, gap 30px, 4 images of 296 x 276 (aspect 296/276)
 * - Tablet  (768px / 48rem): Content width 648px, gap 20px (--g)
 *   - Big image full width on top: 648 x 600 (aspect 648/600)
 *   - 4 small images below: 2 per row (314 x 2 + 20 = 648px), each 314 x 329 (aspect 314/329)
 * - Mobile  (425px / 26.5625rem): Content width 385px, gap 16px (--g)
 *   - All 5 images uniform aspect (385/356), 1 per row (385 x 356px), gap 16px
 *
 * STRUCTURE RANGES (discrete breakpoints only for layout switching):
 * - Below 544px (<34rem): 1-column grid, smalls container uses display:contents so all 5 images are identical 1 per row (aspect 385/356)
 * - 544px to 895px (min-[34rem] to <56rem): 1 column, big image top (648/600), smalls 2-column grid below (314/329)
 * - 896px and up (min-[56rem]): 2 columns [628fr_622fr] items-stretch, left 628/582, right 2x2 (296/276), heights equal 582px
 *
 * FLUID FORMULAS (Zero breakpoint jumps for sizes/padding/gap):
 * - Side padding: px-[clamp(1.25rem,min(-1.8475rem_+_11.662vw,2.3214rem_+_2.976vw),5rem)]
 *   Joined with min(lineFast, lineSlow): 20px @425px -> 60px @768px -> 80px @1440px.
 * - Vertical padding: py-[clamp(2.5rem,1.977rem_+_1.97vw,3.75rem)]
 *   Interpolates vertical section padding: 40px @425px -> 60px @1440px.
 * - Gallery gap (--g): clamp(1rem,max(0.6903rem_+_1.1662vw,0.5357rem_+_1.4881vw),1.875rem)
 *   Joined with max(lineSlow, lineFast): 16px @425px -> 20px @768px -> 30px @1440px.
 * - Header gap: gap-[clamp(1.5rem,2.8vw,2.5rem)] (24px @425px -> 40px @1440px)
 * - Ornament width: w-[clamp(13.75rem,25vw,22.625rem)] (220px @425px -> 362px @1440px)
 * - Heading font: text-[clamp(1.75rem,0.6rem_+_3.4vw,2.747rem)] leading-[1.09] (28px -> 43.95px / 48px)
 * - Paragraph font: text-[clamp(0.875rem,0.8rem_+_0.3vw,1.125rem)] leading-[clamp(1.25rem,1.1rem_+_0.4vw,1.4125rem)]
 */
export function RecognisedForExcellence({
  data = defaultRecognisedForExcellence,
  className,
  ...props
}: RecognisedForExcellenceProps) {
  const { name, heading, description, images } = data;
  const bigImage = images[0];
  const smallImages = images.slice(1, 5);

  return (
    <section
      aria-labelledby="recognised-excellence-heading"
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

      {/* Inner wrapper: max-w-[90rem], fluid padding and gap */}
      <div className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-col items-center px-[clamp(1.25rem,min(-1.8475rem_+_11.662vw,2.3214rem_+_2.976vw),5rem)] py-[clamp(2.5rem,1.977rem_+_1.97vw,3.75rem)] gap-[clamp(2rem,4.2vw,3.75rem)]">
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
              id="recognised-excellence-heading"
              className="font-heading font-normal text-[#FFD8A2] text-center tracking-normal text-balance text-[clamp(1.75rem,0.6rem_+_3.4vw,2.747rem)] leading-[1.09]"
            >
              {heading}
            </h2>

            <p className="w-full max-w-[898px] text-center font-lato font-medium text-white/90 tracking-[0.01em] text-[clamp(0.875rem,0.8rem_+_0.3vw,1.125rem)] leading-[clamp(1.25rem,1.1rem_+_0.4vw,1.4125rem)]">
              {renderDescriptionWithName(description, name)}
            </p>
          </div>
        </div>

        {/* Gallery Container: max-w-[80rem], fluid gap --g */}
        <div className="w-full max-w-[80rem] [--g:clamp(1rem,max(0.6903rem_+_1.1662vw,0.5357rem_+_1.4881vw),1.875rem)]">
          <div
            role="list"
            className="grid w-full gap-[var(--g)] grid-cols-1 min-[56rem]:grid-cols-[628fr_622fr] min-[56rem]:items-stretch"
          >
            {/* Featured Big Image (Left on desktop, Top on tablet, Row 1 on mobile) */}
            {bigImage && (
              <figure
                role="listitem"
                className={cn(IMAGE_BASE, BIG_IMAGE)}
              >
                <Image
                  src={bigImage.src}
                  alt={bigImage.alt}
                  fill
                  priority={false}
                  sizes="(min-width: 90rem) 628px, (min-width: 56rem) 49vw, (min-width: 34rem) 100vw, 50vw"
                  className="object-cover"
                />
              </figure>
            )}

            {/* 4 Small Images Group: contents on mobile (<34rem), 2-col grid on tablet/desktop */}
            <div className="contents min-[34rem]:grid min-[34rem]:grid-cols-2 min-[34rem]:gap-[var(--g)]">
              {smallImages.map((img, index) => (
                <figure
                  key={index}
                  role="listitem"
                  className={cn(IMAGE_BASE, SMALL_IMAGE)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 90rem) 296px, (min-width: 56rem) 24vw, (min-width: 34rem) 50vw, 50vw"
                    className="object-cover"
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecognisedForExcellence;
