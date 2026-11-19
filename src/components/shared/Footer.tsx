import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib";
import { Button } from "@/components/ui/Button";
import { defaultFooter, type FooterData } from "@/data/footer";
import { FooterLinkColumn } from "./FooterLinkColumn";
import { FooterContactColumn } from "./FooterContactColumn";
import { FooterCourseColumn } from "./FooterCourseColumn";
import { FooterSocialSection } from "./FooterSocialSection";
import { FooterBottomBar } from "./FooterBottomBar";
import { FooterBgAdjuster } from "./FooterBgAdjuster";

/**
 * ============================================================================
 * FOOTER BACKGROUND IMAGE CONTROLS (EDIT VALUES HERE)
 * ============================================================================
 * Change these values to alter the zoom (scale) and position of the footer
 * background image. You can cross-check and edit the numbers below:
 *
 * 1. scale:
 *    - "scale-100"      -> Normal / 100% (no zoom)
 *    - "scale-[1.10]"   -> 110% zoom
 *    - "scale-[1.15]"   -> 115% zoom (currently applied)
 *    - "scale-[1.25]"   -> 125% zoom
 *
 * 2. shiftX (Horizontal Shift):
 *    - "translate-x-0"        -> Center / no shift
 *    - "translate-x-[30px]"   -> 30px to the right
 *    - "translate-x-[50px]"   -> 50px to the right (currently applied)
 *    - "translate-x-[80px]"   -> 80px to the right
 *    - "-translate-x-[30px]"  -> Shift to the left
 *
 * 3. shiftY (Vertical Shift):
 *    - "translate-y-0"        -> Anchored to bottom edge (currently applied)
 *    - "-translate-y-[20px]"  -> Shift up by 20px
 *    - "translate-y-[20px]"   -> Shift down by 20px
 *
 * 4. origin (Anchor point for zoom):
 *    - "origin-bottom"        -> Keeps bottom edge anchored while scaling up
 *    - "origin-bottom-center" -> Same as origin-bottom
 *    - "origin-center"        -> Scales out from center
 * ============================================================================
 */
export const FOOTER_BG_CONTROLS = {
  scaleX: "scale-x-[1.38]",     // <-- EDIT HORIZONTAL STRETCH HERE (e.g. scale-x-[1.2], scale-x-[1.4], scale-x-[1.5])
  scaleY: "scale-y-[1.38]",     // <-- EDIT VERTICAL ZOOM HERE (e.g. scale-y-[1.0], scale-y-[1.15], scale-y-[1.25])
  shiftX: "translate-x-[200px]", // <-- EDIT HORIZONTAL SHIFT HERE (e.g. translate-x-[150px], translate-x-[250px])
  shiftY: "translate-y-[15px]",  // <-- EDIT VERTICAL SHIFT HERE (e.g. translate-y-[20px], translate-y-0)
  origin: "origin-bottom",      // <-- EDIT TRANSFORM ORIGIN HERE
  gradientOverlay: "opacity-85", // <-- EDIT GRADIENT OVERLAY ON TOP OF IMAGE (e.g. opacity-75, opacity-85, opacity-90, opacity-100)
};

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  data?: Partial<FooterData>;
  topRowRight?: React.ReactNode;
  column2?: React.ReactNode;
  column3?: React.ReactNode;
  column4?: React.ReactNode;
  bottomStrip?: React.ReactNode;
  bottomStripLeft?: React.ReactNode;
  bottomStripRight?: React.ReactNode;
  bottomStripBottom?: React.ReactNode;
  bgScaleX?: string;
  bgScaleY?: string;
  bgShiftX?: string;
  bgShiftY?: string;
  bgOrigin?: string;
  bgGradientOverlay?: string;
  className?: string;
}

/**
 * Footer Component (Shared pre-footer / footer shell, brand block, and links block)
 *
 * FIGMA ANCHORS (angle 0deg, opacity 1):
 * - Footer frame: 1440 x 658, padding-top 40, gap 10.
 *   - Background: linear-gradient(142.94deg, rgba(29, 27, 77, 1) 0%, rgba(81, 43, 88, 1) 120.7%) (#1D1B4D -> #512B58).
 *   - Background image aligned to the bottom.
 * - Inner layout: 1280 x 582, 80px from each side, gap 75 between its two blocks.
 *   The inner layout ends 40px above the footer bottom (DERIVED), so padding-bottom 40.
 * - Block 1 (1280 x 352, gap 50): the top row (1280 x 76) + the links block (1280 x 226).
 * - Block 2 (1280 x 120, gap 30): bottom strip.
 *   - Row 1: 1280 x 60, justify-between.
 *     - Left group (570 x 60, gap 26): 60x60 logo2.webp (rounded-full border border-[#FFD8A2]) + "DIVIINE INFINITY NUMEROLOGY" (Lovelace Text 400, 22.5px / 30.7px, #FFF1D6).
 *     - Right group (356 x 36, gap 64): "Follow Us" (97 x 31) + vertical divider (31.5px) + 4 social icons (177 x 36, gap 11).
 *   - Divider: 1280 x 0px, border 0.5px solid rgba(255, 240, 219, 1) (#FFF0DB).
 *   - Row 2: 1280 x 20, justify-between.
 *     - Copyright (228 x 19): "© Diviine Infinity Numerologgy 2026" (Lato 500, 14px / 18.8px, #FFF1D6).
 *     - Credits (282 x 19): "🪐The planets planned it. Cojective made it ❤" (Lato 500, 14px / 18.8px, #FFF1D6).
 *     - Legal links (259 x 19, gap 24): "Terms & Conditions" | "Privacy Policy" (Lato 500, 14px / 18.8px, #FFF1D6).
 * - Top row: brand block on the left (479 x 76), another group on the right (about 478 wide,
 *   DERIVED = 1280 - 479 - 323). The 323px "gap" is free space from justify-between.
 * - Brand block (479 x 76, gap 18): heading + tagline.
 *   - Heading "Explore. Learn. Transform": Lovelace Text 400, 35.16px, line-height 100%,
 *     letter-spacing 0, color #FFD8A2.
 *   - Tagline "Your journey of numbers and stars begin now": Lato 500, 18px / 22.6px (1.2556),
 *     letter-spacing 0, color #FFFCF5 (rgba(255,252,245,1)).
 * - Links block (1280 x 226): 4 columns, left to right:
 *   - Col 1 (Quick Links): 176 x 226, gap 20 to list, gap 15 between links (DERIVED).
 *     - Heading: Lovelace Text 400, 22.5px / 30.7px, color #FFD8A2.
 *     - 5 links: Lato 700, 16px / 22.2px, color #FFF1D6.
 *   - Col 2: 176 x 109, starts at left 234, top 48.
 *     - 3 links: Lato 700, 16px / 22.2px, color #FFF1D6, gap 20 between links: Free Calculators, Blogs, Contact Us.
 *   - Col 3 (Contact): 231 x 215, starts at left 468, gap 20 between heading and items.
 *     - Heading "Contact": Lovelace Text 400, 22.5px / 30.7px, color #FFD8A2.
 *     - 3 contact items (gap 20): Phone, Email, Address (Lato 700, 16px / 22.2px, color #FFF0DB).
 *   - Col 4 (Course CTA): 476 x 173, starts at left 804, top 2, pushed to right edge.
 *     - Heading: Lovelace Text 400, 22.5px / 30.7px, color #FFD8A2.
 *     - Description: Lato 500, 16px / 22.2px, color #FFFCF5.
 *     - Button "Explore Courses": 145 x 35, Satoshi 700 bold 14px, #FFF1D6 fill, #5A2A5D text.
 *   - Inter-column gaps at 1440px: 58px between cols 1-2 and 2-3 (DERIVED), 105px free space between cols 3-4 (DERIVED).
 * - ASSUMED at 425px:
 *   - Brand heading 24px, tagline 15px, side padding 20px, top padding 30px, bottom padding 30px.
 *   - Gap between the two blocks 40px, gap inside block 1 30px.
 *   - Col 1 heading 20px, link text 15px, gap between columns 32px.
 * - 768px: derived from continuous fluid linear formulas.
 *
 * SLOTS (empty by default, takes no space until filled):
 * - "top-row-right": top-row right slot (about 478px wide on desktop, DERIVED)
 * - "bottom-strip": bottom strip (1280 x 120, gap 30)
 *
 * FLUID FORMULAS (one line per formula, zero breakpoint jumps):
 * - Footer side padding: clamp(1.25rem, -0.32rem + 5.911vw, 5rem) (20px @425 -> 80px @1440)
 * - Footer top padding: clamp(1.875rem, 1.613rem + 0.985vw, 2.5rem) (30px @425 -> 40px @1440)
 * - Footer bottom padding: clamp(0.625rem, 0.468rem + 0.591vw, 1rem) (10px @425 -> 16px @1440)
 * - Inner layout gap (Block 1 to Block 2): clamp(2.5rem, 1.584rem + 3.448vw, 4.6875rem) (40px @425 -> 75px @1440)
 * - Block 1 gap (Top row to Links block): clamp(1.875rem, 1.352rem + 1.97vw, 3.125rem) (30px @425 -> 50px @1440)
 * - Top row gap-x: clamp(1.5rem, 0.5rem + 2vw, 3rem) (24px @425 -> 48px @1440)
 * - Top row gap-y: clamp(1.5rem, 1.2rem + 1vw, 2rem) (24px @425 -> 32px @1440)
 * - Brand block heading font: clamp(1.5rem, 1.208rem + 1.1vw, 2.1975rem) (24px @425 -> 35.16px @1440)
 * - Brand block tagline font: clamp(0.9375rem, 0.859rem + 0.296vw, 1.125rem) (15px @425 -> 18px @1440)
 * - Links column gap-x: clamp(2rem, 1.319rem + 2.562vw, 3.625rem) (32px @425 -> 58px @1440)
 * - Col 1 heading font: clamp(1.25rem, 1.1846rem + 0.246vw, 1.40625rem) (20px @425 -> 22.5px @1440)
 * - Col 1 link font: clamp(0.9375rem, 0.9113rem + 0.0985vw, 1rem) (15px @425 -> 16px @1440)
 */
export function Footer({
  data: propData,
  topRowRight = null,
  column2 = null,
  column3 = null,
  column4 = null,
  bottomStrip = null,
  bottomStripLeft = null,
  bottomStripRight = null,
  bottomStripBottom = null,
  bgScaleX = FOOTER_BG_CONTROLS.scaleX,
  bgScaleY = FOOTER_BG_CONTROLS.scaleY,
  bgShiftX = FOOTER_BG_CONTROLS.shiftX,
  bgShiftY = FOOTER_BG_CONTROLS.shiftY,
  bgOrigin = FOOTER_BG_CONTROLS.origin,
  bgGradientOverlay = FOOTER_BG_CONTROLS.gradientOverlay,
  className,
  ...props
}: FooterProps) {
  const data: FooterData = {
    ...defaultFooter,
    ...propData,
    ...(propData?.image
      ? { image: { ...defaultFooter.image, ...propData.image } }
      : {}),
    ...(propData?.quickLinks
      ? { quickLinks: { ...defaultFooter.quickLinks, ...propData.quickLinks } }
      : {}),
    ...(propData?.column2
      ? { column2: { ...defaultFooter.column2, ...propData.column2 } }
      : {}),
    ...(propData?.contact
      ? { contact: { ...defaultFooter.contact, ...propData.contact } }
      : {}),
    ...(propData?.courseCta
      ? { courseCta: { ...defaultFooter.courseCta, ...propData.courseCta } }
      : {}),
    ...(propData?.brand
      ? { brand: { ...defaultFooter.brand, ...propData.brand } }
      : {}),
    ...(propData?.social
      ? { social: { ...defaultFooter.social, ...propData.social } }
      : {}),
    ...(propData?.bottomBar
      ? { bottomBar: { ...defaultFooter.bottomBar, ...propData.bottomBar } }
      : {}),
  };

  return (
    <footer
      {...props}
      className={cn(
        "relative w-full overflow-hidden bg-[#1D1B4D]",
        // Mobile (425px): 20px, Tablet (768px): 60px, Desktop (1440px): 80px (scales down to 16px at 320px)
        "px-[clamp(1rem,-1.848rem_+_11.662vw,3.75rem)] lg:px-[clamp(1.25rem,-0.32rem_+_5.911vw,5rem)]",
        // Fluid top padding: 30px @425 -> 40px @768 & 1440
        "pt-[clamp(1.875rem,1.101rem_+_2.915vw,2.5rem)]",
        // Fluid bottom padding: 20px @425 & 768 -> 16px @1440
        "pb-5 lg:pb-[clamp(0.625rem,0.468rem_+_0.591vw,1rem)]",
        // Fluid min-height: 1120.5px @425 -> 842.5px @768 -> auto on desktop
        "min-h-[clamp(52.656rem,91.802rem_-_81.05vw,70.031rem)] lg:min-h-0",
        className
      )}
    >
      {/* Fluid Background Image Layer (Active continuously across all viewports from 320px to 1440px+) */}
      {data.image?.src && (
        <FooterBgAdjuster imageSrc={data.image.src} />
      )}

      {/* 3. Gradient Overlay (on top of background image, behind content) */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(142.94deg,#1D1B4D_0%,#512B58_120.7%)]",
          bgGradientOverlay
        )}
      />

      {/* Inner Layout: max 1280px (80rem) on desktop, 648px on tablet & mobile */}
      <div className="relative z-10 mx-auto w-full">
        {/* ================================================================= */}
        {/* 1. DESKTOP FOOTER CONTENT (>= 1024px) - STRICTLY FROZEN & IDENTICAL */}
        {/* ================================================================= */}
        <div className="hidden lg:flex lg:flex-col lg:gap-[clamp(2.5rem,1.584rem_+_3.448vw,4.6875rem)] w-full max-w-[80rem] mx-auto">
          {/* BLOCK 1: Top row + links block (gap 30 @425 -> 50 @1440) */}
        <div className="flex flex-col gap-[clamp(1.875rem,1.352rem_+_1.97vw,3.125rem)]">
          {/* a. TOP ROW: Brand block on left, top-row-right slot on right */}
          <div className="flex flex-wrap items-start justify-between gap-x-[clamp(1.5rem,0.5rem_+_2vw,3rem)] gap-y-[clamp(1.5rem,1.2rem_+_1vw,2rem)]">
            {/* LEFT: Brand Block (479 x 76, gap 18) */}
            <div className="flex w-full max-w-[29.9375rem] flex-col gap-[18px]">
              <p className="font-heading font-normal text-[#FFD8A2] tracking-normal leading-none whitespace-nowrap text-[clamp(1.25rem,1.208rem_+_1.1vw,2.1975rem)]">
                {data.heading}
              </p>
              <p className="font-lato font-medium text-[#FFFCF5] tracking-normal leading-[1.2556] text-[clamp(0.9375rem,0.859rem_+_0.296vw,1.125rem)]">
                {data.tagline}
              </p>
            </div>

            {/* RIGHT: SLOT "top-row-right" (about 478px wide on desktop) */}
            {/* TODO: top-row-right (about 478px wide on desktop) */}
            {topRowRight ? (
              <div className="empty:hidden">{topRowRight}</div>
            ) : null}
          </div>

          {/* b. LINKS BLOCK (replaces the "links" slot) */}
          <div className="flex w-full flex-wrap items-start justify-between gap-x-[clamp(2rem,1.319rem_+_2.562vw,3.625rem)] gap-y-8">
            <div className="flex flex-wrap items-start gap-x-[clamp(2rem,1.319rem_+_2.562vw,3.625rem)] gap-y-8">
              <FooterLinkColumn
                title={data.quickLinks.title}
                links={data.quickLinks.links}
              />
              {/* Column 2 (176 x 112, gap 20, starts at left 234, top 48, center aligned with Quick Links) */}
              {column2 ??
                (data.column2?.links?.length ? (
                  <FooterLinkColumn
                    links={data.column2.links}
                    gap="gap-5"
                    className="self-center"
                    aria-label="Additional Links"
                  />
                ) : null)}
              {/* Column 3: Contact (231 x 215, starts at left 468) */}
              {column3 ??
                (data.contact ? (
                  <FooterContactColumn data={data.contact} />
                ) : null)}
            </div>
            {/* Column 4: Course CTA (476 x 173, starts at left 804, top 2, pushed to right edge) */}
            {column4 ??
              (data.courseCta ? (
                <FooterCourseColumn data={data.courseCta} />
              ) : null)}
          </div>
        </div>

        {/* BLOCK 2: Bottom strip (1280 x 120, gap 30) */}
        {bottomStrip ?? (
          <div className="flex w-full flex-col gap-[clamp(1.25rem,0.989rem_+_0.985vw,1.875rem)]">
            {/* Row 1: 1280 x 60, justify-between */}
            <div className="flex w-full flex-wrap items-center justify-between gap-y-4">
              {/* Left group: Brand logo + name (570 x 60, gap 26) */}
              {bottomStripLeft ??
                (data.brand ? (
                  <div className="flex items-center gap-[clamp(1rem,0.738rem_+_0.985vw,1.625rem)]">
                    <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-full border border-[#FFD8A2]">
                      <Image
                        src={data.brand.logo.src}
                        alt={data.brand.logo.alt}
                        width={60}
                        height={60}
                        className="h-full w-full object-cover select-none"
                      />
                    </div>
                    <p className="font-heading font-normal text-[#FFF1D6] tracking-normal leading-[1.3644] whitespace-nowrap text-[clamp(1.25rem,1.1846rem_+_0.246vw,1.40625rem)]">
                      {data.brand.name}
                    </p>
                  </div>
                ) : null)}

              {/* Right group: 356 x 36, gap 64 (Follow Us + Divider + Social Icons) */}
              {bottomStripRight ??
                (data.social ? (
                  <FooterSocialSection data={data.social} />
                ) : null)}
            </div>

            {/* Divider line: 1280 x 0px, border 0.5px solid rgba(255, 240, 219, 1) */}
            <hr
              aria-hidden="true"
              className="w-full border-0 border-t border-[0.5px] border-[#FFF0DB]"
            />

            {/* Row 2: Bottom sub-strip (1280 x 20, justify-between) */}
            {bottomStripBottom ??
              (data.bottomBar ? (
                <FooterBottomBar data={data.bottomBar} />
              ) : null)}
          </div>
        )}
      </div>

      {/* ================================================================= */}
      {/* 2. TABLET & MOBILE FOOTER CONTENT (< 1024px) - FIGMA 768px & 425px */}
      {/* ================================================================= */}
      <div className="flex lg:hidden flex-col gap-[60px] w-full max-w-[648px] mx-auto">
        {/* BLOCK 1: Upper section (width: 648, height: 500, gap: 40px on tablet) */}
        <div className="flex flex-col gap-[clamp(1.875rem,1.352rem_+_1.97vw,2.5rem)] w-full">
          {/* Group 1: Brand Header (648 x 61, gap: 18px) */}
          <div className="flex flex-col gap-[18px] w-full">
            <p className="font-heading font-normal text-[#FFD8A2] tracking-normal leading-none text-[clamp(1.5rem,1.145rem_+_1.335vw,1.78625rem)]">
              {data.heading}
            </p>
            <p className="font-lato font-medium text-[#FFFCF5] tracking-normal leading-[22.6px] text-[clamp(0.9375rem,0.705rem_+_0.875vw,1.125rem)]">
              {data.tagline}
            </p>
          </div>

          {/* Group 2: Links & Contact Row (648 x 208, gap: 30px on tablet) */}
          <div className="flex w-full flex-wrap items-start justify-between md:justify-start gap-x-0 md:gap-x-[30px] gap-y-8">
            {/* Mobile: 2-column row for Quick Links & Secondary Links (side-by-side on all mobile screens >=320px) */}
            <div className="flex w-full md:w-auto items-start justify-between gap-x-4 sm:gap-x-6 md:gap-x-[30px] md:contents">
              {/* Col 1: Quick Links (176 x 208, gap: 20px) */}
              <FooterLinkColumn
                title={data.quickLinks.title}
                links={data.quickLinks.links}
                className="w-auto min-w-0 max-w-[176px] flex-1 md:w-[176px] md:flex-initial shrink-0 md:shrink-0"
              />

              {/* Col 2: Secondary Links (176 x 208, pt: 33px on tablet, gap: 15px) */}
              {data.column2?.links?.length ? (
                <FooterLinkColumn
                  links={data.column2.links}
                  gap="gap-[15px]"
                  className="w-auto min-w-0 max-w-[176px] flex-1 md:w-[176px] md:flex-initial shrink-0 md:shrink-0 pt-0 md:pt-[33px]"
                  aria-label="Additional Links"
                />
              ) : null}
            </div>

            {/* Col 3: Contact (231 x 208, gap: 20px) */}
            {data.contact ? (
              <FooterContactColumn
                data={data.contact}
                className="w-full sm:w-[231px] shrink-0"
              />
            ) : null}
          </div>

          {/* Group 3: Course CTA block (648 x 151, gap: 20px - stacked below Group 2) */}
          {column4 ??
            (data.courseCta ? (
              <div className="flex w-full flex-col gap-5">
                <div className="flex flex-col gap-4">
                  <h2 className="font-heading font-normal text-[#FFD8A2] tracking-normal text-[clamp(1.083rem,0.948rem_+_0.51vw,1.193rem)] leading-[clamp(1.456rem,1.694rem_-_0.496vw,1.563rem)]">
                    {data.courseCta.title}
                  </h2>
                  <p className="font-lato font-medium text-[#FFFCF5] tracking-[0.01em] text-[16px] leading-[22.2px] w-full max-w-[385px] md:max-w-none">
                    {data.courseCta.description}
                  </p>
                </div>
                <div className="pt-1">
                  <Button
                    variant="footer"
                    size="footer"
                    href={data.courseCta.buttonHref}
                  >
                    {data.courseCta.buttonText}
                  </Button>
                </div>
              </div>
            ) : null)}
        </div>

        {/* BLOCK 2: Lower section (width: 648, height: 222.5, gap: 24px on tablet) */}
        <div className="flex flex-col gap-6 w-full">
          {/* Sub-layout 1: 648 x 112.5, pb: 20px, gap: 16px, border ONLY at bottom (no top/left/right lines) */}
          <div className="flex flex-col items-center text-center gap-4 pb-5 border-b-[0.5px] border-[#FFD8A2] border-t-0 border-x-0 w-full">
            {/* Row 1: Logo & Name (402 x 40, gap: 12px, center-aligned, scales down cleanly on <=320px) */}
            {data.brand && (
              <div className="flex items-center justify-center gap-2 sm:gap-3 w-full max-w-full">
                <div className="relative h-[clamp(2rem,0.476rem_+_7.62vw,2.5rem)] w-[clamp(2rem,0.476rem_+_7.62vw,2.5rem)] shrink-0 overflow-hidden rounded-full border border-[#FFD8A2]">
                  <Image
                    src={data.brand.logo.src}
                    alt={data.brand.logo.alt}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover select-none"
                  />
                </div>
                <p className="font-heading font-normal text-[#FFF1D6] tracking-normal leading-[23.3px] whitespace-nowrap text-[clamp(0.75rem,-0.009rem_+_4.11vw,1.083rem)] md:text-[clamp(1.083rem,0.948rem_+_0.509vw,1.193rem)]">
                  {data.brand.name}
                </p>
              </div>
            )}

            {/* Row 2: Follow Us (283 x 36, gap: 12px, center-aligned, scales down on <=320px) */}
            {data.social && (
              <div className="flex items-center justify-center gap-2 sm:gap-3 w-full max-w-full">
                <span className="font-lato font-normal text-[#FFFCF5] tracking-normal leading-none whitespace-nowrap text-[clamp(0.8125rem,-0.009rem_+_4.11vw,1.083rem)] md:text-[clamp(1.083rem,0.948rem_+_0.509vw,1.40625rem)]">
                  {data.social.title}
                </span>
                <div
                  aria-hidden="true"
                  className="h-[28px] sm:h-[31.5px] w-0 border-r border-[#FFF1D6] rounded-[3px]"
                />
                <div className="flex items-center gap-2 sm:gap-[11px] shrink-0">
                  {data.social.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-label={item.ariaLabel}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-[40px] transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD8A2]"
                    >
                      <Image
                        src={item.icon}
                        alt=""
                        width={36}
                        height={36}
                        aria-hidden="true"
                        className="h-8 w-8 sm:h-9 sm:w-9 select-none transition-opacity group-hover:opacity-85"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sub-layout 2: 648 x 86, gap: 24px */}
          {data.bottomBar && (
            <div className="flex flex-col gap-6 w-full">
              {/* Row 1: Credits (282 x 19) with RED heart - center-aligned */}
              <p className="font-lato font-medium text-[#FFF1D6] tracking-normal leading-[18.8px] text-[clamp(0.75rem,0.56rem_+_0.94vw,0.875rem)] text-center w-full">
                {data.bottomBar.credits.includes("❤") ? (
                  <>
                    {data.bottomBar.credits.replace("❤", "").trimEnd()}{" "}
                    <span className="text-[#FF2E2E] inline-block font-sans">
                      ❤
                    </span>
                  </>
                ) : (
                  data.bottomBar.credits
                )}
              </p>

              {/* Separator: 637px separator, border 0.5px solid rgba(255, 216, 162, 0.5), centered */}
              <hr
                aria-hidden="true"
                className="w-full max-w-[637px] mx-auto border-t-[0.5px] border-b-0 border-x-0 border-[#FFD8A2] opacity-50"
              />

              {/* Row 2: 385 x 54 on Mobile (gap: 16px, stacked), 648 x 19 on Tablet (side-by-side, justify-between) */}
              <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-0 w-full text-[14px]">
                <p className="font-lato font-medium text-[#FFF1D6] opacity-75 tracking-normal leading-[18.8px] text-center md:text-left whitespace-nowrap">
                  {data.bottomBar.copyright}
                </p>

                <nav
                  aria-label="Legal Links"
                  className="flex items-center justify-center gap-4 shrink-0"
                >
                  {data.bottomBar.legalLinks.map((link, index) => (
                    <React.Fragment key={link.href}>
                      {index > 0 && (
                        <span
                          aria-hidden="true"
                          className="select-none font-['Satoshi',sans-serif] font-normal text-[#FFF1D6] text-[14px] leading-none"
                        >
                          |
                        </span>
                      )}
                      <Link
                        href={link.href}
                        className="font-lato font-medium text-[#FFF1D6] tracking-normal leading-[18.8px] text-center whitespace-nowrap transition-colors hover:text-[#FFD8A2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD8A2]"
                      >
                        {link.label}
                      </Link>
                    </React.Fragment>
                  ))}
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </footer>
  );
}

export default Footer;
