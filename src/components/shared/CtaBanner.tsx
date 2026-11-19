import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib";
import {
  defaultCtaBanner,
  type CtaBannerData,
} from "@/data/cta-banner";
import { CtaBannerButton } from "./CtaBannerButton";

export interface CtaBannerProps
  extends React.HTMLAttributes<HTMLElement> {
  data?: Partial<CtaBannerData>;
  className?: string;
}

/**
 * CtaBanner Component (Shared pre-footer CTA section)
 *
 * FIGMA ANCHORS (angle 0deg, opacity 1):
 * - Outer frame:
 *   - 425px:  425 x 429
 *   - 768px:  768 x 501
 *   - 1440px: 1440 x 561
 * - Inner frame:
 *   - 425px:  425 x 429 (px-5, pb 39)
 *   - 768px:  768 x 501 (px-5, pb 64, FROZEN)
 *   - 1440px: 1150 x 501 (px-5, pb 30, left 266, FROZEN)
 * - Section padding:
 *   - 425px & 768px: 0px
 *   - 1440px: 145px per side, 30px top and bottom
 * - Background image (decorative, transparent PNG/WebP, top-anchored, centered, clipped by the section):
 *   - 425px:  730 wide (+90px zoom), 14px from top
 *   - 768px:  930 wide, 65px from top
 *   - 1440px: 1280 wide, 35px from top
 * - Content block (heading + paragraph + buttons):
 *   - 425px:  heading 300 x 92, paragraph 331 x 45, button 260 x 42, gap 25
 *   - 768px:  heading 414, paragraph 533 x 45, gap 40
 *   - 1440px: 617 x 216, top 217.5, left 266, gap 40
 * - Gap heading to paragraph: 12px at all sizes
 * - Heading (Lovelace Text 400, #FFD8A2, line-height 46px @425, 71px @1440):
 *   - 425px:  36.72px (box 300 x 92)
 *   - 768px:  34px (FROZEN)
 *   - 1440px: 54.93px (box 617 x 71, FROZEN)
 * - Paragraph (Lato 500, #ECECEC, letter-spacing 1%):
 *   - 425px, 768px & 1440px: 16px, line-height 22.2px (ratio 1.3875)
 * - Button row:
 *   - 425px:  buttons 260 x 42, centered content (text + caret icon)
 *   - 1440px: 413 x 48, gap 17px
 *   - Buttons: min-h-[clamp(2.625rem,2.16rem_+_1.75vw,3rem)], radius 50px, gap 13px, circle 30px, caret 16px.
 *   - Buttons wrap automatically into centered stack on small widths (<48rem / 768px).
 *
 * FLUID FORMULAS (Zero breakpoint jumps for sizes/padding/gap):
 * - Section px: clamp(0rem, -10.355rem + 21.577vw, 9.0625rem) (0px up to 768px -> 145px @1440px)
 * - Section py: clamp(0rem, -2.143rem + 4.464vw, 1.875rem) (0px up to 768px -> 30px @1440px)
 * - Inner frame min-h: clamp(26.8125rem, 21.24rem + 20.99vw, 31.3125rem) (429px @425px -> 501px @768px & 1440px)
 * - Inner frame pb: clamp(1.875rem, min(0.501rem + 7.289vw, 6.429rem - 5.06vw), 4rem) (39px @425px -> 64px @768px -> 30px @1440px)
 * - Background image width: clamp(30rem, min(30.137rem + 58.31vw, 33.13rem + 52.08vw), 80rem) (730px @425px -> 930px @768px -> 1280px @1440px)
 * - Background image top offset: clamp(0.875rem, min(14.87vw - 3.07rem, 6.21rem - 4.464vw), 4.0625rem) (14px @425px -> 65px @768px -> 35px @1440px)
 * - Content gap (text to buttons): clamp(1.5625rem, 0.401rem + 4.373vw, 2.5rem) (25px @425px -> 40px @768px -> 40px @1440px)
 * - Heading width: clamp(18.75rem, min(9.922rem + 33.24vw, 11.375rem + 30.21vw), 38.5625rem) (300px @425 -> 414px @768 -> 617px @1440)
 * - Heading font: clamp(2.125rem, max(2.506rem - 0.793vw, 0.63rem + 3.115vw), 3.433rem) (36.72px @425 -> 34px @768 -> 54.93px @1440)
 * - Paragraph width: clamp(20.6875rem, 5.044rem + 58.892vw, 33.3125rem) (331px @425 -> 533px @768 -> 533px @1440)
 *
 * USAGE EXAMPLES:
 *   <CtaBanner />                                           // default text
 *   <CtaBanner data={{ heading: "Join the next workshop" }} /> // partial override
 *   <CtaBanner data={aboutPageCta} />                       // full custom content
 */
export function CtaBanner({
  data: propData,
  className,
  ...props
}: CtaBannerProps) {
  const data: CtaBannerData = {
    ...defaultCtaBanner,
    ...propData,
    ...(propData?.image
      ? { image: { ...defaultCtaBanner.image, ...propData.image } }
      : {}),
  };

  const headingId = React.useId();

  return (
    <section
      {...props}
      aria-labelledby={headingId}
      className={cn(
        "relative w-full overflow-hidden bg-transparent px-[clamp(0rem,-10.355rem_+_21.577vw,9.0625rem)] py-[clamp(0rem,-2.143rem_+_4.464vw,1.875rem)]",
        className
      )}
    >
      {/* Background Image (decorative, top-anchored, clipped by section) */}
      {data.image?.src && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 z-0 -translate-x-1/2 aspect-[1264/842] top-[clamp(0.875rem,min(14.87vw_-_3.07rem,6.21rem_-_4.464vw),4.0625rem)] w-[clamp(30rem,min(30.137rem_+_58.31vw,33.13rem_+_52.08vw),80rem)]"
        >
          <Image
            fill
            alt=""
            aria-hidden="true"
            src={data.image.src}
            sizes="(min-width: 90rem) 1280px, (min-width: 48rem) 125vw, 150vw"
            className="max-w-none select-none object-contain"
          />
        </div>
      )}

      {/* Inner Frame: max-w-[1150px] (71.875rem), bottom-anchored content */}
      <div className="relative mx-auto flex w-full max-w-[71.875rem] items-end justify-center px-5 pb-[clamp(1.875rem,min(0.501rem_+_7.289vw,6.429rem_-_5.06vw),4rem)] min-h-[clamp(26.8125rem,21.24rem_+_20.99vw,31.3125rem)]">
        {/* Content Wrapper: max-w-[617px] (38.5625rem), fluid gap to buttons (40px @ 1440px) */}
        <div
          className={cn(
            "relative z-10 flex w-full max-w-[38.5625rem] flex-col items-center text-center gap-[clamp(1.5625rem,0.401rem_+_4.373vw,2.5rem)]",
            data.contentMaxWidth,
            data.contentWrapperClassName
          )}
        >
          {/* Text Group: fluid width (300px @425 -> 414px @768 -> 617px @1440) */}
          <div
            className={cn(
              "flex w-full flex-col items-center gap-3 max-w-[38.5625rem]",
              data.contentMaxWidth,
              data.textGroupClassName
            )}
          >
            <h2
              id={headingId}
              className={cn(
                "w-full max-w-[clamp(18.75rem,min(9.922rem_+_33.24vw,11.375rem_+_30.21vw),38.5625rem)] font-heading font-normal text-[#FFD8A2] text-center tracking-normal text-balance leading-[1.26] text-[clamp(2.125rem,max(2.506rem_-_0.793vw,0.63rem_+_3.115vw),3.433rem)]",
                data.headingMaxWidth,
                data.headingClassName
              )}
            >
              {data.heading}
            </h2>

            <p
              className={cn(
                "w-full max-w-[clamp(20.6875rem,5.044rem_+_58.892vw,33.3125rem)] font-lato font-medium text-[#ECECEC] text-center tracking-[0.01em] leading-[1.3875] text-[1rem]",
                data.contentMaxWidth,
                data.paragraphClassName
              )}
            >
              {data.description.map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>

          {/* Button Row: max-w-[413px] on mobile (stacked 260px buttons), unconstrained single-row on tablet/desktop */}
          <div className="flex w-full max-w-[25.8125rem] min-[34rem]:max-w-none flex-wrap min-[34rem]:flex-nowrap items-center justify-center gap-[17px]">
            {data.primaryButton && (
              <CtaBannerButton
                href={data.primaryButton.href}
                label={data.primaryButton.label}
                variant={data.primaryButton.variant ?? "primary"}
                className="w-full max-w-[16.25rem] min-[34rem]:w-auto"
              />
            )}
            {data.secondaryButton && (
              <CtaBannerButton
                href={data.secondaryButton.href}
                label={data.secondaryButton.label}
                variant={data.secondaryButton.variant ?? "secondary"}
                className="w-full max-w-[16.25rem] min-[34rem]:w-auto"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaBanner;
