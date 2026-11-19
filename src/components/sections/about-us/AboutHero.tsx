import * as React from "react";
import Image from "next/image";
import { aboutHeroContent } from "@/data/about";
import { cn } from "@/lib";

export interface AboutHeroProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

/**
 * AboutHero Component
 *
 * FLUID RESPONSIVE SPECIFICATION (Compliant with FLUID_RESPONSIVE_README.md):
 *
 * 1. FIGMA TRUTH ANCHORS:
 *    - Mobile (425px):
 *      Frame: 425 x 572, top padding: 112px, side padding: 20px, bottom padding: 55px
 *      Inner layout: 385 x 405 (stacked vertically: text 385x177 + compass 268x228)
 *      Eyebrow: Lovelace 400, 17.33px / 25px, #FFF0DB
 *      Title: Lovelace 400, 36.72px / 46px, #FFD8A2
 *      Description: Lato 500, 16px / 22.2px, tracking 1%, #ECECEC
 *      Compass image: 268 x 228, scale(1.68), shiftX: 0px, shiftY: 0px
 *    - Tablet (768px):
 *      Frame: 768 x 383, top padding: 110px, side padding: 60px, bottom padding: 45px
 *      Inner layout: 648 x 228 (side-by-side: text 395x184 + compass 268x228)
 *      Eyebrow: Lovelace 400, 19.08px / 23.3px, #FFF0DB
 *      Title: Lovelace 400, 42.87px / 48px, #FFD8A2
 *      Description: Lato 500, 16px / 22.2px, tracking 1%, #ECECEC
 *      Compass image: 268 x 228, scale(1.34), shiftX: 0px, shiftY: 0px
 *    - Desktop Master (1440px):
 *      Frame: 1440 x 574, top padding: 180.5px (centered), side padding: 80px
 *      Inner layout: 1280 max-width (side-by-side: text 652x213 + compass 671x572)
 *      Eyebrow: Lovelace 400, 22.5px / 30.7px, #FFF0DB
 *      Title: Lovelace 400, 54.93px / 70.4px, #FFD8A2
 *      Description: Lato 500, 16px / 22.2px, tracking 1%, #ECECEC
 *      Compass image: 671 x 572, scale(1.0), shiftX: 0px, shiftY: 0px
 *
 * 2. MATHEMATICAL FORMULAS (425 -> 768 -> 1440):
 *    - Section Height (V-shape): 572px -> 383px -> 574px
 *      Formula: clamp(23.938rem,max(50.387rem_-_55.102vw,10.295rem_+_28.423vw),35.875rem)
 *    - Top Padding: 112px -> 110px -> 180.5px
 *      Formula: clamp(6.875rem,max(7.155rem_-_0.583vw,1.839rem_+_10.491vw),11.281rem)
 *    - Side Padding: 20px -> 60px -> 80px
 *      Formula: clamp(1.25rem,min(-1.848rem_+_11.662vw,2.321rem_+_2.976vw),5rem)
 *    - Bottom Padding: 55px -> 45px -> 60px
 *      Formula: clamp(2.813rem,max(3.438rem_-_0.6vw,1.25rem_+_1.6vw),3.75rem)
 *    - Eyebrow Font Size: 17.33px -> 19.08px -> 22.5px (slope ~0.00509)
 *      Formula: clamp(1.083rem,0.948rem_+_0.509vw,1.406rem)
 *    - Eyebrow Line Height: 25px -> 23.3px -> 30.7px
 *      Formula: clamp(1.456rem,max(1.694rem_-_0.496vw,0.928rem_+_1.101vw),1.919rem)
 *    - Heading Font Size: 36.72px -> 42.87px -> 54.93px (slope ~0.01794)
 *      Formula: clamp(2rem,1.818rem_+_1.794vw,3.433rem)
 *    - Heading Line Height: 46px -> 48px -> 70.4px
 *      Formula: clamp(2.875rem,max(2.72rem_+_0.583vw,1.4rem_+_3.333vw),4.4rem)
 *    - Content Block Max Width: 385px -> 395px -> 652px
 *      Formula: clamp(24.063rem,max(23.288rem_+_2.915vw,6.33rem_+_38.244vw),40.75rem)
 *    - Compass Image Width: 268px -> 268px -> 671px
 *      Formula: clamp(16.75rem,max(16.75rem,-12.036rem_+_59.97vw),41.938rem)
 *    - Compass Image Height: 228px -> 228px -> 572px
 *      Formula: clamp(14.25rem,max(14.25rem,-10.321rem_+_51.19vw),35.75rem)
 */
export function AboutHero({ className, ...props }: AboutHeroProps) {
  const { bgImage, heroImage, eyebrow, title, description } = aboutHeroContent;

  return (
    <section
      {...props}
      aria-label="About Us Hero"
      className={cn(
        // Outer section: Master fluid container mapping 425px (572px) -> 768px (383px) -> 1440px (574px)
        "relative w-full overflow-hidden bg-[#090d22] select-none",
        "min-h-[clamp(23.938rem,max(50.387rem_-_55.102vw,10.295rem_+_28.423vw),35.875rem)]",
        "pt-[clamp(6.875rem,max(7.155rem_-_0.583vw,1.839rem_+_10.491vw),11.281rem)]",
        "pb-[clamp(2.813rem,max(3.438rem_-_0.6vw,1.25rem_+_1.6vw),3.75rem)]",
        "px-[clamp(1.25rem,min(-1.848rem_+_11.662vw,2.321rem_+_2.976vw),5rem)]",
        "flex flex-col items-center justify-center",
        className
      )}
    >
      {/* 1. Full-bleed background image with 30% black overlay */}
      <div aria-hidden="true" className="absolute inset-0 bg-[#090d22] overflow-hidden">
        <Image
          src={bgImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>

      {/* 2. Main Foreground Layout (Text Block + Compass Image) */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
        {/* Left Side Content: width 385 @425 -> 395 @768 -> 652 @1440 */}
        <div
          className={cn(
            "relative z-10 flex w-full flex-col text-left",
            "max-w-[clamp(24.063rem,max(23.288rem_+_2.915vw,6.33rem_+_38.244vw),40.75rem)]",
            "gap-[clamp(1.188rem,1.3rem_-_0.15vw,1.5rem)]",
            "justify-center"
          )}
        >
          {/* Eyebrow: Meet Teejaswinni K Lokesh */}
          <p
            className={cn(
              "font-heading font-normal text-[#FFF0DB] tracking-normal m-0",
              "text-[clamp(1.083rem,0.948rem_+_0.509vw,1.406rem)]",
              "leading-[clamp(1.456rem,max(1.694rem_-_0.496vw,0.928rem_+_1.101vw),1.919rem)]"
            )}
          >
            {eyebrow}
          </p>

          {/* Title: The Mind Behind the Guidance. */}
          <h1
            className={cn(
              "font-heading font-normal text-[#FFD8A2] tracking-normal m-0",
              "text-[clamp(2rem,1.818rem_+_1.794vw,3.433rem)]",
              "leading-[clamp(2.875rem,max(2.72rem_+_0.583vw,1.4rem_+_3.333vw),4.4rem)]"
            )}
          >
            {title}
          </h1>

          {/* Subtitle / Description: Helping people find clarity through knowledge, experience, and wisdom. */}
          <p className="font-sans text-[16px] font-medium leading-[22.2px] tracking-[0.01em] text-[#ECECEC] m-0">
            {description}
          </p>
        </div>

        {/* Right Side: Compass Image with verified scales (1.68 @mobile, 1.34 @tablet, 1.0 @desktop) */}
        <div
          className={cn(
            "relative flex items-center justify-center shrink-0 will-change-transform origin-center",
            "scale-[1.68]",
            "md:scale-[1.34]",
            "lg:scale-100"
          )}
        >
          <div
            className={cn(
              "relative flex items-center justify-center",
              "w-[clamp(16.75rem,max(16.75rem,-12.036rem_+_59.97vw),41.938rem)]",
              "h-[clamp(14.25rem,max(14.25rem,-10.321rem_+_51.19vw),35.75rem)]"
            )}
          >
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              width={671}
              height={572}
              priority
              sizes="(max-width: 768px) 268px, (max-width: 1024px) 350px, 671px"
              className="h-full w-full object-contain pointer-events-none select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
