"use client";

import * as React from "react";
import Image from "next/image";
import { aboutHeroContent } from "@/data/about";
import { cn } from "@/lib";

export interface AboutHeroProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  contentShiftX?: number;
  contentShiftY?: number;
  compassZoom?: number;
  compassShiftX?: number;
  compassShiftY?: number;
}

const TUNED_VALUES = {
  contentShiftX: -3,
  contentShiftY: 40,
  compassZoom: 1.0,
  compassShiftX: 61,
  compassShiftY: 47,
};

/**
 * AboutHero Component - Desktop (1440px) values tuned:
 * - contentShiftX: -3px
 * - contentShiftY: 40px
 * - compassZoom: 1.0
 * - compassShiftX: 61px
 * - compassShiftY: 47px
 * - Tablet and mobile layouts remain frozen and completely untouched.
 */
export function AboutHero({
  className,
  contentShiftX = TUNED_VALUES.contentShiftX,
  contentShiftY = TUNED_VALUES.contentShiftY,
  compassZoom = TUNED_VALUES.compassZoom,
  compassShiftX = TUNED_VALUES.compassShiftX,
  compassShiftY = TUNED_VALUES.compassShiftY,
  ...props
}: AboutHeroProps) {
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
        "lg:h-[574px] lg:min-h-[574px] lg:max-h-[574px] lg:py-0 lg:px-20",
        "flex flex-col items-center justify-center",
        className
      )}
      style={{
        ...props.style,
        ["--content-shift-x" as string]: `${contentShiftX}px`,
        ["--content-shift-y" as string]: `${contentShiftY}px`,
        ["--compass-shift-x" as string]: `${compassShiftX}px`,
        ["--compass-shift-y" as string]: `${compassShiftY}px`,
        ["--compass-zoom" as string]: `${compassZoom}`,
      }}
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
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] lg:max-w-[1360px] flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
        {/* Left Side Content: width 385 @425 -> 395 @768 -> 652 @1440 */}
        <div
          className={cn(
            "relative z-10 flex w-full flex-col text-left",
            "max-w-[clamp(24.063rem,max(23.288rem_+_2.915vw,6.33rem_+_38.244vw),40.75rem)]",
            "gap-[clamp(1.188rem,1.3rem_-_0.15vw,1.5rem)]",
            "justify-center",
            "lg:[transform:translate3d(var(--content-shift-x),var(--content-shift-y),0)]",
            "lg:will-change-transform"
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
            "lg:scale-100",
            "lg:[transform:translate3d(var(--compass-shift-x),var(--compass-shift-y),0)_scale(var(--compass-zoom))]"
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
