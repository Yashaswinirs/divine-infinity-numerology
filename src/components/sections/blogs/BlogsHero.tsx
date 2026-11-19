import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { blogsHeroData, type BlogsHeroData } from "@/data/blogs";
import { cn } from "@/lib";
import { MobileMenuButton } from "./MobileMenuButton";

/**
 * ============================================================================
 * NAMED CONSTANTS (Per Task Specification Requirements)
 * ============================================================================
 * A. HERO_LEFT_DESKTOP: Desktop left padding wired to --hero-pad-x (80px at 1440).
 * B. HEADER_DESKTOP_CUTOFF_CLASS: Breakpoint cutoff where global navbar takes over (lg = 1024).
 * C. LOGO_BORDER_COLOR: Solid 1px #FFD8A2 border for Logo 2.
 * D. SHOW_TABLET_HAMBURGER: Show hamburger from mobile up to tablet (hidden at lg).
 * ============================================================================
 */
export const HERO_LEFT_DESKTOP = "var(--hero-pad-x)";
export const HEADER_DESKTOP_CUTOFF_CLASS = "lg:hidden";
export const HEADER_DESKTOP_CUTOFF_PX = 1024;
export const LOGO_BORDER_COLOR = "border border-[#FFD8A2]";
export const SHOW_TABLET_HAMBURGER = true;

/**
 * Default fine-tuning background controls (defaults restored to 1 / 0 / 0)
 */
export const DEFAULT_BG_CONTROLS = {
  scale: 1,
  shiftX: 0,
  shiftY: 0,
  objectPosition: "object-[right_40%]",
  overlayOpacity: "bg-black/20",
};

export interface BlogsHeroProps extends React.HTMLAttributes<HTMLElement> {
  data?: Partial<BlogsHeroData>;
  bgScale?: number | string;
  bgShiftX?: number | string;
  bgShiftY?: number | string;
  bgObjectPosition?: string;
  bgOverlayOpacity?: string;
  className?: string;
}

/**
 * BlogsHero - Server Component
 *
 * Implements fluid responsive layout across Figma truth anchor frames:
 * - Mobile:  425 x 534 (supports down to 375 and 320)
 * - Tablet:  768 x 472
 * - Desktop: 1440 x 576
 *
 * Uses CSS variables defined under .blogs-hero in globals.css.
 * Content sits in normal document flow so the hero grows if text wraps.
 */
export function BlogsHero({
  data: propData,
  bgScale = DEFAULT_BG_CONTROLS.scale,
  bgShiftX = DEFAULT_BG_CONTROLS.shiftX,
  bgShiftY = DEFAULT_BG_CONTROLS.shiftY,
  bgObjectPosition = DEFAULT_BG_CONTROLS.objectPosition,
  bgOverlayOpacity = DEFAULT_BG_CONTROLS.overlayOpacity,
  className,
  ...props
}: BlogsHeroProps) {
  const data: BlogsHeroData = {
    ...blogsHeroData,
    ...propData,
    cta: {
      ...blogsHeroData.cta,
      ...propData?.cta,
    },
    logo: {
      ...blogsHeroData.logo,
      ...propData?.logo,
    },
    bg: {
      ...blogsHeroData.bg,
      ...propData?.bg,
    },
  };

  const formattedShiftX =
    typeof bgShiftX === "number" ? `${bgShiftX}px` : bgShiftX;
  const formattedShiftY =
    typeof bgShiftY === "number" ? `${bgShiftY}px` : bgShiftY;
  const formattedScale =
    typeof bgScale === "number" ? `${bgScale}` : bgScale;

  return (
    <section
      {...props}
      aria-label="Blogs Hero"
      className={cn(
        "blogs-hero relative w-full overflow-hidden",
        "min-h-[var(--hero-h)] pt-[var(--hero-content-top)] pb-12 pl-[var(--hero-pad-x)]",
        className
      )}
      style={{
        backgroundColor: data.bg.fallbackColor,
        ...props.style,
      }}
    >
      {/* Background Artwork Layer + 20% Black Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute top-0 bottom-0 h-full"
          style={{
            right: "calc(var(--bg-effective-right, max(var(--bg-right), calc(var(--bg-offset-x, 0px) * -1))) * -1)",
            aspectRatio: "var(--bg-aspect, 1440 / 576)",
            minWidth: "calc(100% + var(--bg-effective-right, max(var(--bg-right), calc(var(--bg-offset-x, 0px) * -1))) - var(--bg-offset-x, 0px))",
            transform: `translateX(calc(var(--bg-offset-x, 0px) + ${formattedShiftX})) translateY(${formattedShiftY}) scale(calc(var(--bg-scale, 1) * ${formattedScale}))`,
            transformOrigin: "right center",
            willChange: "transform",
          }}
        >
          <Image
            src={data.bg.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className={cn("object-cover", bgObjectPosition)}
          />
        </div>
        <div className={cn("absolute inset-0 pointer-events-none", bgOverlayOpacity)} />
      </div>

      {/* Header Row: Tablet + Mobile only (visible below 1024px, Section C) */}
      <div
        className={cn(
          "absolute z-20 flex items-center justify-between",
          "top-[var(--hero-header-top)] left-[var(--hero-header-x)] right-[var(--hero-header-x)]",
          "h-[50px]",
          HEADER_DESKTOP_CUTOFF_CLASS
        )}
      >
        {/* Logo-2: 50x50 round with 1px border (#FFD8A2) */}
        <Link
          href="/"
          className={cn(
            "relative flex h-[50px] w-[50px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#FFD8A2]",
            "hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD8A2]",
            "transition-opacity"
          )}
          aria-label="Divine Infinity Numerology Home"
        >
          <Image
            src={data.logo.src}
            alt={data.logo.alt}
            width={50}
            height={50}
            className="h-full w-full object-cover"
          />
        </Link>

        {/* 3-line Accessible Hamburger Button */}
        {SHOW_TABLET_HAMBURGER && <MobileMenuButton />}
      </div>

      {/* Content Container (Normal flow, allows hero to grow if text wraps, Bug 3) */}
      <div
        className={cn(
          "relative z-10 flex flex-col items-start text-left",
          "w-[var(--hero-content-w)] gap-[var(--hero-gap)]"
        )}
      >
        {/* Text Group: Heading + Gap (14px) + Paragraph */}
        <div className="flex w-full flex-col items-start gap-[14px]">
          {/* Heading: Lovelace Text 400, #FFD8A2 (LOCKED PER OVERRIDE 1) */}
          <h1
            className={cn(
              "w-full max-w-[min(var(--hero-heading-w),100%)] font-heading font-normal text-[#FFD8A2] tracking-normal",
              "text-[clamp(2.295rem,calc(1.819rem_+_1.794vw),3.433rem)]",
              "leading-[clamp(2.875rem,calc(2.236rem_+_2.404vw),4.4rem)]"
            )}
          >
            {data.heading}
          </h1>

          {/* Paragraph: Lato 500 18px / 22.6px, #ECECEC (LOCKED PER OVERRIDE 1) */}
          <p
            className={cn(
              "w-full max-w-full font-lato font-medium text-[#ECECEC] tracking-normal",
              "text-[18px] leading-[22.6px]"
            )}
          >
            {data.paragraph}
          </p>
        </div>

        {/* CTA Button: Explore Blogs (Pill, rounded-[50px], bg #FFD8A2, text #655373) */}
        <Link
          href={data.cta.href}
          className={cn(
            "inline-flex items-center justify-center rounded-[50px] bg-[#FFD8A2] text-[#655373]",
            "w-[var(--btn-w)] h-[var(--btn-h)] min-h-[var(--btn-h)]",
            "p-[10px] gap-[10px]",
            "font-lato font-medium text-[18px] leading-[22.6px] tracking-normal",
            "hover:brightness-105 active:scale-[0.99]",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD8A2]",
            "transition-all duration-150 cursor-pointer"
          )}
        >
          <span>{data.cta.label}</span>
          <span
            aria-hidden="true"
            className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#655373] text-[#FFD8A2]"
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}

export default BlogsHero;
