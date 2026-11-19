import * as React from "react";
import Image from "next/image";
import {
  whyFollowYourHoroscopeData,
  type WhyFollowYourHoroscopeData,
} from "@/data/horoscope";
import { cn } from "@/lib";

export interface WhyFollowYourHoroscopeProps
  extends React.HTMLAttributes<HTMLElement> {
  data?: Partial<WhyFollowYourHoroscopeData>;
  showStars?: boolean;
  /** Vertical focal position of the image in percentage (0 = top, 50 = center, 100 = bottom). Default: 75. */
  imagePositionY?: number;
  /** Direct vertical shift in pixels (+ moves down, - moves up). E.g. 0 */
  imageShiftY?: number;
  /** Zoom scale factor (1 = 100%, 1.05 = 105%) */
  imageScale?: number;
  className?: string;
}

/**
 * WhyFollowYourHoroscope Section
 *
 * FLUID RESPONSIVE SPECIFICATION (FLUID_RESPONSIVE_README.md compliant):
 *
 * FIGMA ANCHORS:
 * - Mobile (425px):
 *   - Heading: Lovelace Text 400, 30.43px, line-height 35px, text-center
 *   - Ornament: 254.4px x 24.2px, centered
 *   - Image (under heading): 385px x 177.88px, rounded 12px, border 1px solid #FFD8A2
 *   - Subtitle: Lovelace Text 400, 17.33px, line-height 25px, text-left
 *   - Paragraph: Lato 500, 16px, line-height 22.2px, letter-spacing 1%, text-left
 * - Tablet (768px):
 *   - Heading: Lovelace Text 400, 35px, line-height 40px, text-left
 *   - Ornament: 262px x 24.9px, left-aligned
 *   - Image (under heading): 645px x 298px, rounded 12px, border 1px solid #FFD8A2
 *   - Subtitle: Lovelace Text 400, 19.08px, line-height 23.3px, text-left
 *   - Paragraph: Lato 500, 18px, line-height 22.6px, text-left
 * - Desktop Master (1440px):
 *   - Side-by-side 2-column layout (1278 x 298, gap 63px)
 *   - Left: Image 645 x 298, rounded 12px, border 1px solid #FFD8A2
 *   - Right: Text block 570 x 244.42 (Ornament 362 x 34.42, Heading 35.16px, Subtitle 22.5px / 30.7px, Paragraph 18px / 22.6px)
 *
 * FLUID CLAMP FORMULAS:
 * 1. Ornament Width (254.4 -> 262 -> 362px, slow -> fast growth):
 *    w-[clamp(15.9rem,max(15.311rem_+_2.216vw,9.232rem_+_14.881vw),22.625rem)]
 * 2. Heading Font Size (30.43 -> 35 -> 35.16px, ramp then flat):
 *    text-[clamp(1.902rem,1.548rem_+_1.332vw,2.198rem)]
 * 3. Heading Line Height (35 -> 40 -> 40px, ramp then flat):
 *    leading-[clamp(2.1875rem,1.80rem_+_1.458vw,2.5rem)]
 * 4. Image Width (385 -> 645 -> 645px, ramp then flat):
 *    w-full max-w-[clamp(24.0625rem,3.928rem_+_75.802vw,40.3125rem)]
 * 5. Image Height (177.88 -> 298 -> 298px, ramp then flat):
 *    h-[clamp(11.118rem,1.815rem_+_35.02vw,18.625rem)]
 * 6. Subtitle Font Size (17.33 -> 19.08 -> 22.5px, single straight line):
 *    text-[clamp(1.083rem,0.948rem_+_0.509vw,1.406rem)]
 * 7. Subtitle Line Height (25 -> 23.3 -> 30.7px, V shape):
 *    leading-[clamp(1.456rem,max(1.694rem_-_0.496vw,0.928rem_+_1.101vw),1.919rem)]
 * 8. Paragraph Font Size (16 -> 18 -> 18px, ramp then flat):
 *    text-[clamp(1rem,0.845rem_+_0.583vw,1.125rem)]
 * 9. Paragraph Line Height (22.2 -> 22.6 -> 22.6px, ramp then flat):
 *    leading-[clamp(1.3875rem,1.356rem_+_0.117vw,1.4125rem)]
 * 10. Section Padding X (16 -> 37.6 -> 81px, single straight line):
 *    px-[clamp(1rem,-0.675rem_+_6.305vw,5.0625rem)]
 * 11. Section Padding Y (40 -> 46.8 -> 60px, single straight line):
 *    py-[clamp(2.5rem,1.977rem_+_1.97vw,3.75rem)]
 */
export function WhyFollowYourHoroscope({
  data: propData,
  showStars = true,
  imagePositionY = 75,
  imageShiftY = 0,
  imageScale = 1,
  className,
  ...props
}: WhyFollowYourHoroscopeProps) {
  const data: WhyFollowYourHoroscopeData = {
    ...whyFollowYourHoroscopeData,
    ...propData,
    image: {
      ...whyFollowYourHoroscopeData.image,
      ...propData?.image,
    },
  };

  return (
    <section
      id="why-follow-your-horoscope"
      aria-labelledby="why-follow-your-horoscope-heading"
      className={cn(
        // Section: fluid responsive container
        "relative w-full max-w-[1440px] mx-auto min-h-0 lg:min-h-[418px]",
        "py-[clamp(2.5rem,1.977rem_+_1.97vw,3.75rem)] px-[clamp(1rem,-0.675rem_+_6.305vw,5.0625rem)]",
        "flex flex-col items-center justify-center",
        "opacity-100 rotate-0 text-white overflow-visible select-none",
        className
      )}
      {...props}
    >
      {/* Background Stars */}
      {showStars && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
        >
          <Image
            src="/images/blogs/blogs-stars.svg"
            alt=""
            fill
            priority={false}
            sizes="100vw"
            className="object-cover object-top opacity-70"
          />
        </div>
      )}

      {/* Inner Container:
          - Mobile & Tablet: Stacked column (1. Header -> 2. Image -> 3. Subtitle + Paragraph)
          - Desktop (lg:): Side-by-side (Col 1: Image, Col 2: Text)
      */}
      <div className="relative z-10 w-full max-w-[1278px] flex flex-col items-center gap-[24px] md:gap-[32px] lg:grid lg:grid-cols-[clamp(24rem,3.928rem_+_75.8vw,40.3125rem)_1fr] lg:gap-x-[clamp(2rem,1.5rem_+_2.5vw,3.9375rem)] lg:gap-y-[16px] lg:items-center">
        {/* Item 1: Header (Ornament + Heading) */}
        <header className="flex w-full max-w-[clamp(24.0625rem,3.928rem_+_75.802vw,40.3125rem)] lg:max-w-[570px] flex-col items-center md:items-start gap-[12px] md:gap-[16px] lg:gap-[25px] text-center md:text-left order-1 lg:order-2 lg:col-start-2">
          {/* Ornament: centered on mobile, left-aligned on tablet and desktop */}
          <div className="flex items-center justify-center md:justify-start w-full">
            <Image
              src={data.ornament}
              alt=""
              width={362}
              height={35}
              priority={false}
              className="w-[clamp(15.9rem,max(15.311rem_+_2.216vw,9.232rem_+_14.881vw),22.625rem)] h-auto object-contain select-none pointer-events-none"
            />
          </div>

          {/* Heading: centered on mobile, left-aligned on tablet and desktop */}
          <h2
            id="why-follow-your-horoscope-heading"
            className="w-full font-heading font-normal text-[clamp(1.902rem,1.548rem_+_1.332vw,2.198rem)] leading-[clamp(2.1875rem,1.80rem_+_1.458vw,2.5rem)] tracking-normal text-[#FFD8A2] m-0 text-center md:text-left"
          >
            {data.heading}
          </h2>
        </header>

        {/* Item 2: Image Frame */}
        <div className="relative w-full max-w-[clamp(24.0625rem,3.928rem_+_75.802vw,40.3125rem)] h-[clamp(11.118rem,1.815rem_+_35.02vw,18.625rem)] shrink-0 overflow-hidden rounded-[12px] border border-[#FFD8A2] order-2 lg:order-1 lg:col-start-1 lg:row-start-1 lg:row-span-2">
          <Image
            src={data.image.src}
            alt={data.image.alt}
            fill
            priority={false}
            sizes="(max-width: 768px) 385px, 645px"
            style={{
              objectPosition: `center ${imagePositionY}%`,
              ...(imageShiftY !== 0 || imageScale !== 1
                ? { transform: `translateY(${imageShiftY}px) scale(${imageScale})` }
                : {}),
            }}
            className="object-cover select-none"
          />
        </div>

        {/* Item 3: Subtitle + Paragraph: left-aligned on mobile, tablet, and desktop */}
        <div className="flex w-full max-w-[clamp(24.0625rem,3.928rem_+_75.802vw,40.3125rem)] lg:max-w-[570px] flex-col items-start gap-[14px] lg:gap-[26px] text-left order-3 lg:order-3 lg:col-start-2">
          {/* Subtitle: 17.33px / 25px @425, 19.08px / 23.3px @768, 22.5px / 30.7px @1440 */}
          <p className="w-full font-heading font-normal text-[clamp(1.083rem,0.948rem_+_0.509vw,1.406rem)] leading-[clamp(1.456rem,max(1.694rem_-_0.496vw,0.928rem_+_1.101vw),1.919rem)] tracking-normal text-[#FFD8A2] m-0 text-left">
            {data.subtitle}
          </p>

          {/* Paragraph: 16px / 22.2px (1% tracking) @425, 18px / 22.6px (0% tracking) @768 and @1440 */}
          <p className="w-full font-sans font-medium text-[clamp(1rem,0.845rem_+_0.583vw,1.125rem)] leading-[clamp(1.3875rem,1.356rem_+_0.117vw,1.4125rem)] tracking-[0.01em] md:tracking-normal text-[#ECECEC] m-0 text-left">
            {data.description}
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhyFollowYourHoroscope;
