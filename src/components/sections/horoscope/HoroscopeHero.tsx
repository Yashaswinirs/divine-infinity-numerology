import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowCircle } from "@/components/shared/ArrowCircle";
import { Container, Section } from "@/components/layout";
import {
  horoscopeHeroData,
  type HoroscopeHeroData,
} from "@/data/horoscope";
import { cn } from "@/lib";

export interface HeroViewportControl {
  /** Horizontal object-position % or keyword. Default: 50 */
  x?: number | string;
  /** Vertical object-position % or keyword. Default: 50 */
  y?: number | string;
  /** Background zoom (e.g. 1.25 = 125%). Numbers only. Default: mobile 1.25, tablet 1.2, desktop 1 */
  scale?: number | string;
  /**
   * Horizontal shift of the background image in px (negative = moves image LEFT).
   * Smoothly interpolated between screen sizes. Default: mobile -32, tablet -12, desktop 0.
   * Automatically capped so the image edge never shows.
   */
  shiftX?: number | string;
  /** Vertical shift of the whole content block (heading, paragraph, buttons) in px */
  contentShiftY?: number | string;
  /** Vertical shift of buttons alone in px */
  buttonsShiftY?: number | string;
}

export interface HoroscopeHeroProps
  extends React.HTMLAttributes<HTMLElement> {
  data?: Partial<HoroscopeHeroData>;
  bgImage?: string;
  wheelImage?: string;

  // ==========================================
  // HOROSCOPE WHEEL CONTROLS (Desktop 1024px+)
  // ==========================================
  wheelSizeDesktop?: number | string;
  wheelTopDesktop?: number | string;
  wheelRightDesktop?: number | string;
  wheelLeftDesktop?: number | string;
  wheelShiftXDesktop?: number | string;
  wheelShiftYDesktop?: number | string;
  wheelScaleDesktop?: number | string;
  wheelRotationDesktop?: number;
  wheelOpacityDesktop?: number;

  // Small Desktop @1024px (interpolates smoothly to 1440px desktop controls)
  wheelSizeDesktop1024?: number | string;
  wheelTopDesktop1024?: number | string;
  wheelRightDesktop1024?: number | string;
  wheelLeftDesktop1024?: number | string;
  wheelShiftXDesktop1024?: number | string;
  wheelShiftYDesktop1024?: number | string;

  // ==========================================
  // HOROSCOPE WHEEL CONTROLS (Tablet 768px-1023px)
  // Figma (768 frame): 465 x 463, top 479, left 152
  // ==========================================
  /** MAX wheel width in px on tablet (Figma: 465). Shrinks with the screen below 768px. */
  wheelSizeTablet?: number;
  /** Top offset in px (Figma: 479) */
  wheelTopTablet?: number | string;
  /** Optional fixed left offset in px. Default: horizontally centred (= 152px on a 768 frame) */
  wheelLeftTablet?: number | string;
  wheelShiftXTablet?: number | string;
  wheelShiftYTablet?: number | string;
  wheelScaleTablet?: number | string;
  wheelRotationTablet?: number;

  // ==========================================
  // HOROSCOPE WHEEL CONTROLS (Mobile < 768px)
  // ==========================================
  /** MIN wheel width in px on mobile. Between this and the tablet size it scales with screen width. */
  wheelSizeMobile?: number;
  wheelShiftXMobile?: number | string;
  wheelShiftYMobile?: number | string;
  wheelScaleMobile?: number | string;
  wheelRotationMobile?: number;

  // ==========================================
  // CONTENT SHIFT CONTROLS (Heading, Paragraph, Buttons)
  // ==========================================
  contentShiftY?: number | string;
  contentShiftYMobile?: number | string;
  contentShiftYTablet?: number | string;
  contentShiftYDesktop?: number | string;

  buttonsShiftY?: number | string;
  buttonsShiftYMobile?: number | string;
  buttonsShiftYTablet?: number | string;
  buttonsShiftYDesktop?: number | string;

  mobile?: HeroViewportControl;
  tablet?: HeroViewportControl;
  desktop?: HeroViewportControl;

  // Background image zoom & pan prop overrides
  zoomMobile?: number | string;
  zoomTablet?: number | string;
  zoomDesktop?: number | string;
  imagePositionXMobile?: number | string;
  imagePositionXTablet?: number | string;
  imagePositionXDesktop?: number | string;
  imagePositionYMobile?: number | string;
  imagePositionYTablet?: number | string;
  imagePositionYDesktop?: number | string;
  imageShiftXMobile?: number | string;
  imageShiftXTablet?: number | string;
  imageShiftXDesktop?: number | string;
  className?: string;
}

// Screen widths the design values are anchored to (desktop master at 1440px)
const BP = { mobile: 375, tablet: 768, desktop: 1440 } as const;

const toNum = (v: number | string | undefined, fallback: number) => {
  if (v === undefined) return fallback;
  const n = typeof v === "number" ? v : parseFloat(String(v));
  return Number.isFinite(n) ? n : fallback;
};

const round = (n: number) => Math.round(n * 1000) / 1000;

/**
 * Linear interpolation of a px value between two screen widths, written as pure CSS
 * (clamp + vw) so it changes continuously while resizing — no jumps.
 */
function lerpPx(v1: number, w1: number, v2: number, w2: number) {
  if (v1 === v2) return `${round(v1)}px`;
  const slope = (v2 - v1) / (w2 - w1);
  const base = v1 - slope * w1;
  const lo = Math.min(v1, v2);
  const hi = Math.max(v1, v2);
  return `clamp(${round(lo)}px, calc(${round(base)}px + ${round(slope * 100)}vw), ${round(hi)}px)`;
}

/** Extra px of image bleed on each side needed to reproduce a zoom factor at a screen width */
const overscan = (scale: number, width: number) =>
  Math.max(0, ((scale - 1) / 2) * width);

/**
 * HoroscopeHero Component
 *
 * Master specifications from Figma:
 * - Master Section: 1440 x 574, overlay rgba(0, 0, 0, 0.3)
 * - Desktop wheel: 427x427, top 117px
 * - Tablet wheel (768 frame): 465x463, top 479px, left 152px (centred); shrinks with the screen
 */
export function HoroscopeHero({
  data: propData,
  bgImage = "/images/horoscope/horoscope-hero.webp",
  wheelImage = "/images/horoscope/horoscope-hero-wheel.webp",

  // Wheel Desktop (1440px master)
  wheelSizeDesktop = 427,
  wheelTopDesktop = 117,
  wheelRightDesktop = 60,
  wheelLeftDesktop,
  wheelShiftXDesktop = 0,
  wheelShiftYDesktop = 0,
  wheelScaleDesktop = 1,
  wheelRotationDesktop = 0,
  wheelOpacityDesktop = 1,

  // Wheel Desktop (1024px small desktop)
  wheelSizeDesktop1024,
  wheelTopDesktop1024,
  wheelRightDesktop1024,
  wheelLeftDesktop1024,
  wheelShiftXDesktop1024,
  wheelShiftYDesktop1024,

  // Wheel Tablet (Figma: 465 x 463, top 479, left 152)
  wheelSizeTablet = 465,
  wheelTopTablet = 479,
  wheelLeftTablet,
  wheelShiftXTablet = 0,
  wheelShiftYTablet = 0,
  wheelScaleTablet = 1,
  wheelRotationTablet = 0,

  // Wheel Mobile (size = minimum)
  wheelSizeMobile = 240,
  wheelShiftXMobile = 0,
  wheelShiftYMobile = 0,
  wheelScaleMobile = 1,
  wheelRotationMobile = 0,

  // Content shifts
  contentShiftY = 32,
  contentShiftYMobile,
  contentShiftYTablet,
  contentShiftYDesktop,
  buttonsShiftY = 16,
  buttonsShiftYMobile,
  buttonsShiftYTablet,
  buttonsShiftYDesktop,
  mobile: propMobile,
  tablet: propTablet,
  desktop: propDesktop,
  zoomMobile,
  zoomTablet,
  zoomDesktop,
  imagePositionXMobile,
  imagePositionXTablet,
  imagePositionXDesktop,
  imagePositionYMobile,
  imagePositionYTablet,
  imagePositionYDesktop,
  imageShiftXMobile,
  imageShiftXTablet,
  imageShiftXDesktop,
  className,
  ...props
}: HoroscopeHeroProps) {
  const data: HoroscopeHeroData = {
    ...horoscopeHeroData,
    ...propData,
    exploreBtn: {
      ...horoscopeHeroData.exploreBtn,
      ...propData?.exploreBtn,
    },
    todayBtn: {
      ...horoscopeHeroData.todayBtn,
      ...propData?.todayBtn,
    },
  };

  const mobileCtrl: HeroViewportControl = {
    x: propMobile?.x ?? imagePositionXMobile ?? 50,
    y: propMobile?.y ?? imagePositionYMobile ?? 50,
    scale: propMobile?.scale ?? zoomMobile ?? 1.25,
    shiftX: propMobile?.shiftX ?? imageShiftXMobile ?? -32, // mobile bg moves left
    contentShiftY: propMobile?.contentShiftY ?? contentShiftYMobile,
    buttonsShiftY: propMobile?.buttonsShiftY ?? buttonsShiftYMobile,
  };

  const tabletCtrl: HeroViewportControl = {
    x: propTablet?.x ?? imagePositionXTablet ?? 50,
    y: propTablet?.y ?? imagePositionYTablet ?? 50,
    scale: propTablet?.scale ?? zoomTablet ?? 1.2,
    shiftX: propTablet?.shiftX ?? imageShiftXTablet ?? -12,
    contentShiftY: propTablet?.contentShiftY ?? contentShiftYTablet,
    buttonsShiftY: propTablet?.buttonsShiftY ?? buttonsShiftYTablet,
  };

  const desktopCtrl: HeroViewportControl = {
    x: propDesktop?.x ?? imagePositionXDesktop ?? 50,
    y: propDesktop?.y ?? imagePositionYDesktop ?? 50,
    scale: propDesktop?.scale ?? zoomDesktop ?? 1,
    shiftX: propDesktop?.shiftX ?? imageShiftXDesktop ?? 0,
    contentShiftY: propDesktop?.contentShiftY ?? contentShiftYDesktop ?? contentShiftY,
    buttonsShiftY: propDesktop?.buttonsShiftY ?? buttonsShiftYDesktop ?? buttonsShiftY,
  };

  const formatShift = (val: number | string | undefined, defaultVal: number | string = 0) => {
    const v = val ?? defaultVal;
    return typeof v === "number" ? `${v}px` : String(v);
  };

  const formatScale = (val: number | string | undefined, fallback: number | string = 1) => {
    const v = val ?? fallback;
    return typeof v === "number" ? `${v}` : v;
  };

  // Content block vertical shift
  const formattedContentShiftYMobile = formatShift(mobileCtrl.contentShiftY ?? 0, 0);
  const formattedContentShiftYTablet = formatShift(tabletCtrl.contentShiftY ?? 0, 0);
  const formattedContentShiftYDesktop = formatShift(desktopCtrl.contentShiftY ?? 32, 32);

  // Buttons row vertical shift
  const formattedButtonsShiftYMobile = formatShift(mobileCtrl.buttonsShiftY ?? 0, 0);
  const formattedButtonsShiftYTablet = formatShift(tabletCtrl.buttonsShiftY ?? 0, 0);
  const formattedButtonsShiftYDesktop = formatShift(desktopCtrl.buttonsShiftY ?? 16, 16);

  // Background object-position (static per breakpoint; defaults are identical so there is no jump)
  const formatCoord = (coord: number | string | undefined, defaultVal: number | string) => {
    const c = coord ?? defaultVal;
    if (typeof c === "number") return `${c}%`;
    const s = String(c).trim();
    return s.endsWith("%") || s.endsWith("px") || s === "center" || s === "left" || s === "right" || s === "top" || s === "bottom"
      ? s
      : `${s}%`;
  };

  const formattedObjPosMobile = `${formatCoord(mobileCtrl.x, 50)} ${formatCoord(mobileCtrl.y, 50)}`;
  const formattedObjPosTablet = `${formatCoord(tabletCtrl.x, 50)} ${formatCoord(tabletCtrl.y, 50)}`;
  const formattedObjPosDesktop = `${formatCoord(desktopCtrl.x, 50)} ${formatCoord(desktopCtrl.y, 50)}`;

  // ---------- FLUID BACKGROUND (zoom + horizontal shift) ----------
  // Zoom is done by letting the image bleed past the frame by `inset` px on each side,
  // and the pan by translating it. Both are interpolated continuously across screen widths.
  const eMob = overscan(toNum(mobileCtrl.scale, 1.25), BP.mobile);
  const eTab = overscan(toNum(tabletCtrl.scale, 1.2), BP.tablet);
  const eDesk = overscan(toNum(desktopCtrl.scale, 1), BP.desktop);

  const cap = (s: number, e: number) => Math.max(-e, Math.min(e, s)); // never reveal image edges
  const sMob = cap(toNum(mobileCtrl.shiftX, -32), eMob);
  const sTab = cap(toNum(tabletCtrl.shiftX, -12), eTab);
  const sDesk = cap(toNum(desktopCtrl.shiftX, 0), eDesk);

  const fluidBgCss = `
.hh-bg{--hh-inset:${lerpPx(eMob, BP.mobile, eTab, BP.tablet)};--hh-shift:${lerpPx(sMob, BP.mobile, sTab, BP.tablet)};}
@media (min-width:${BP.tablet}px){.hh-bg{--hh-inset:${lerpPx(eTab, BP.tablet, eDesk, BP.desktop)};--hh-shift:${lerpPx(sTab, BP.tablet, sDesk, BP.desktop)};}}
@media (min-width:${BP.desktop}px){.hh-bg{--hh-inset:${round(eDesk)}px;--hh-shift:${round(sDesk)}px;}}
`;

  // ---------- WHEEL DESKTOP (fluid interpolation between 1024px and 1440px) ----------
  const deskSize1440 = toNum(wheelSizeDesktop, 427);
  const deskSize1024 = toNum(
    wheelSizeDesktop1024,
    Math.round(deskSize1440 * (290 / 427))
  );
  const formattedWheelSizeDesktop = lerpPx(deskSize1024, 1024, deskSize1440, 1440);

  const deskTop1440 = toNum(wheelTopDesktop, 117);
  const defaultDeskTop1024 = Math.round(
    574 / 2 - deskSize1024 / 2 + toNum(desktopCtrl.contentShiftY, 32)
  );
  const deskTop1024 = toNum(wheelTopDesktop1024, defaultDeskTop1024);
  const formattedWheelTopDesktop = lerpPx(deskTop1024, 1024, deskTop1440, 1440);

  const deskRight1440 = toNum(wheelRightDesktop, 60);
  const deskRight1024 = toNum(wheelRightDesktop1024, 30);
  const formattedWheelRightDesktop =
    wheelLeftDesktop !== undefined || wheelLeftDesktop1024 !== undefined
      ? "auto"
      : lerpPx(deskRight1024, 1024, deskRight1440, 1440);

  const deskLeft1440 = wheelLeftDesktop !== undefined ? toNum(wheelLeftDesktop, 0) : undefined;
  const deskLeft1024 = wheelLeftDesktop1024 !== undefined ? toNum(wheelLeftDesktop1024, 0) : undefined;
  const formattedWheelLeftDesktop =
    deskLeft1440 !== undefined || deskLeft1024 !== undefined
      ? lerpPx(deskLeft1024 ?? 0, 1024, deskLeft1440 ?? 0, 1440)
      : "auto";

  const deskShiftX1440 = toNum(wheelShiftXDesktop, 0);
  const deskShiftX1024 = toNum(wheelShiftXDesktop1024, 0);
  const formattedWheelShiftXDesktop = lerpPx(deskShiftX1024, 1024, deskShiftX1440, 1440);

  const deskShiftY1440 = toNum(wheelShiftYDesktop, 0);
  const deskShiftY1024 = toNum(wheelShiftYDesktop1024, 0);
  const formattedWheelShiftYDesktop = lerpPx(deskShiftY1024, 1024, deskShiftY1440, 1440);

  const formattedWheelScaleDesktop = formatScale(wheelScaleDesktop, 1);

  // Tablet: 465px at a 768px screen, then shrinks proportionally (60.55vw) as the screen gets narrower.
  const tabletVw = round((wheelSizeTablet / BP.tablet) * 100);
  const formattedWheelSizeTablet = `min(${wheelSizeTablet}px, ${tabletVw}vw)`;
  const formattedWheelTopTablet = formatShift(wheelTopTablet, 479);
  // Centred by default: on a 768px screen this equals Figma's left: 152px
  const formattedWheelLeftTablet =
    wheelLeftTablet !== undefined
      ? formatShift(wheelLeftTablet, 0)
      : "calc(50% - var(--wheel-size-tab) / 2)";
  const formattedWheelShiftXTablet = formatShift(wheelShiftXTablet, 0);
  const formattedWheelShiftYTablet = formatShift(wheelShiftYTablet, 0);
  const formattedWheelScaleTablet = formatScale(wheelScaleTablet, 1);

  // Mobile: same proportional scaling as tablet, with a minimum size so it never gets tiny
  const formattedWheelSizeMobile = `clamp(${wheelSizeMobile}px, ${tabletVw}vw, ${wheelSizeTablet}px)`;
  const formattedWheelShiftXMobile = formatShift(wheelShiftXMobile, 0);
  const formattedWheelShiftYMobile = formatShift(wheelShiftYMobile, 0);
  const formattedWheelScaleMobile = formatScale(wheelScaleMobile, 1);

  return (
    <Section
      {...props}
      container={false}
      spacing="none"
      aria-label="Horoscope Hero"
      className={cn(
        "relative w-full flex overflow-hidden",
        "min-h-[clamp(920px,calc(775.1px+27.99vw),990px)] lg:h-[574px] lg:min-h-[574px] items-start lg:items-center",
        className
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: fluidBgCss }} />

      {/* Full-bleed background + 30% black overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#090d22] overflow-hidden pointer-events-none"
      >
        {/* Fluid zoom (inset bleed) + fluid horizontal shift, both driven by .hh-bg CSS vars */}
        <div
          className="hh-bg absolute pointer-events-none will-change-transform"
          style={{
            inset: "calc(var(--hh-inset) * -1)",
            transform: "translateX(var(--hh-shift))",
          }}
        >
          <Image
            src={bgImage}
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            style={
              {
                "--obj-pos-mob": formattedObjPosMobile,
                "--obj-pos-tab": formattedObjPosTablet,
                "--obj-pos-desk": formattedObjPosDesktop,
              } as React.CSSProperties
            }
            className={cn(
              "object-cover select-none",
              "[object-position:var(--obj-pos-mob)] md:[object-position:var(--obj-pos-tab)] lg:[object-position:var(--obj-pos-desk)]"
            )}
          />
        </div>
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>

      {/* 1440px Master Frame Container for Content & Wheel */}
      <Container
        padding="page"
        className="relative z-10 flex h-full w-full flex-col lg:flex-row items-start lg:items-center justify-between pt-[160px] md:pt-[190px] pb-12 lg:py-0"
      >
        {/* Left Column: Content Block */}
        <div
          style={
            {
              "--content-shift-mob": formattedContentShiftYMobile,
              "--content-shift-tab": formattedContentShiftYTablet,
              "--content-shift-desk": formattedContentShiftYDesktop,
            } as React.CSSProperties
          }
          className={cn(
            "flex w-full flex-col justify-start lg:justify-center items-start text-left transition-transform duration-200 rotate-0 opacity-100",
            // Mobile @425px: width: 385, height: 295, top: 160px (via pt-[160px]), left: 20px (via px-5), gap: 40px
            "max-w-[385px] min-h-[295px] gap-[40px]",
            // Tablet @768px: width: 648, height: 230, top: 190px (via md:pt-[190px]), left: 60px (via md:px-15), gap: 32.6px (increased by 35%)
            "md:w-[648px] md:max-w-[648px] md:min-h-[230px] md:gap-[32.6px]",
            // Desktop: width: 590, gap: 21px
            "lg:w-[590px] lg:max-w-[590px] lg:min-h-0 lg:gap-[21px]",
            "[transform:translateY(var(--content-shift-mob))] md:[transform:translateY(var(--content-shift-tab))] lg:[transform:translateY(var(--content-shift-desk))]"
          )}
        >
          <div className="flex w-full max-w-[385px] md:w-[648px] md:max-w-[648px] lg:w-[590px] lg:max-w-[590px] flex-col gap-[19px] items-start">
            <h1
              className={cn(
                "w-full max-w-[385px] md:w-[648px] md:max-w-[648px] lg:w-[590px] lg:max-w-[590px] lg:min-h-[133px] font-heading font-normal text-[#FFD8A2] tracking-normal rotate-0 opacity-100",
                "text-[clamp(2.125rem,1.57rem_+_2.368vw,3.433rem)]",
                "leading-[clamp(2.75rem,2.02rem_+_3.111vw,4.4rem)]",
                "lg:text-[54.93px] lg:leading-[66.5px]"
              )}
            >
              {data.heading}
            </h1>

            <p
              className={cn(
                "w-full max-w-[385px] md:w-[648px] md:max-w-[648px] lg:w-[590px] lg:max-w-[590px] lg:min-h-[45px] font-lato font-medium text-[#ECECEC] tracking-[0.01em] rotate-0 opacity-100",
                "text-[14px] leading-[20px] md:text-[16px] md:leading-[22.5px] lg:text-[16px] lg:leading-[22.5px]"
              )}
            >
              {data.paragraph}
            </p>
          </div>

          <div
            style={
              {
                "--btn-shift-mob": formattedButtonsShiftYMobile,
                "--btn-shift-tab": formattedButtonsShiftYTablet,
                "--btn-shift-desk": formattedButtonsShiftYDesktop,
              } as React.CSSProperties
            }
            className="flex w-full flex-col items-start gap-[12px] md:w-auto md:flex-row md:items-center md:gap-[16px] lg:w-[496px] lg:max-w-[496px] lg:h-[48px] lg:gap-[16px] rotate-0 opacity-100 [transform:translateY(var(--btn-shift-mob))] md:[transform:translateY(var(--btn-shift-tab))] lg:[transform:translateY(var(--btn-shift-desk))] transition-transform duration-200"
          >
            <Link
              href={data.exploreBtn.href}
              className={cn(
                "inline-flex h-[48px] w-auto self-start items-center justify-center rounded-[50px] border border-[#FFD8A2] bg-transparent px-[24px]",
                "font-lato font-bold text-[16px] leading-none tracking-normal text-[#FFD8A2]",
                "hover:bg-[#FFD8A2]/10 active:scale-[0.98]",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD8A2]",
                "transition-all duration-150 cursor-pointer text-center whitespace-nowrap"
              )}
            >
              <span>{data.exploreBtn.label}</span>
            </Link>

            <Link
              href={data.todayBtn.href}
              className={cn(
                "inline-flex h-[48px] w-auto self-start items-center justify-center rounded-[50px] bg-[#FFD8A2] pl-[22px] pr-[10px] gap-[10px]",
                "font-lato font-bold text-[16px] leading-none tracking-normal text-[#655373]",
                "hover:brightness-105 active:scale-[0.98]",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD8A2]",
                "transition-all duration-150 cursor-pointer text-center whitespace-nowrap"
              )}
            >
              <span>{data.todayBtn.label}</span>
              <ArrowCircle tone="primary" size={28} />
            </Link>
          </div>
        </div>

        {/* Zodiac Wheel */}
        <div
          style={
            {
              "--wheel-size-desk": formattedWheelSizeDesktop,
              "--wheel-top-desk": formattedWheelTopDesktop,
              "--wheel-right-desk": formattedWheelRightDesktop,
              "--wheel-left-desk": formattedWheelLeftDesktop,
              "--wheel-shift-x-desk": formattedWheelShiftXDesktop,
              "--wheel-shift-y-desk": formattedWheelShiftYDesktop,
              "--wheel-scale-desk": formattedWheelScaleDesktop,
              "--wheel-rot-desk": `${wheelRotationDesktop}deg`,
              "--wheel-op-desk": `${wheelOpacityDesktop}`,

              "--wheel-size-tab": formattedWheelSizeTablet,
              "--wheel-top-tab": formattedWheelTopTablet,
              "--wheel-left-tab": formattedWheelLeftTablet,
              "--wheel-shift-x-tab": formattedWheelShiftXTablet,
              "--wheel-shift-y-tab": formattedWheelShiftYTablet,
              "--wheel-scale-tab": formattedWheelScaleTablet,
              "--wheel-rot-tab": `${wheelRotationTablet}deg`,

              "--wheel-size-mob": formattedWheelSizeMobile,
              "--wheel-shift-x-mob": formattedWheelShiftXMobile,
              "--wheel-shift-y-mob": formattedWheelShiftYMobile,
              "--wheel-scale-mob": formattedWheelScaleMobile,
              "--wheel-rot-mob": `${wheelRotationMobile}deg`,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none select-none z-[5] shrink-0 block",

            // Mobile: centred below the text, fluid size
            "mx-auto mt-8 w-[var(--wheel-size-mob)] h-[var(--wheel-size-mob)]",
            "[transform:translate(var(--wheel-shift-x-mob),var(--wheel-shift-y-mob))_scale(var(--wheel-scale-mob))_rotate(var(--wheel-rot-mob))]",

            // Tablet (< 1024px, >= 768px): absolute, top 479px, horizontally centred (left 152px @768), size shrinks with screen
            "md:absolute md:mx-0 md:mt-0 md:top-[var(--wheel-top-tab)] md:left-[var(--wheel-left-tab)] md:right-auto",
            "md:w-[var(--wheel-size-tab)] md:h-[var(--wheel-size-tab)]",
            "md:[transform:translate(var(--wheel-shift-x-tab),var(--wheel-shift-y-tab))_scale(var(--wheel-scale-tab))_rotate(var(--wheel-rot-tab))]",

            // Desktop (>= 1024px): absolute, fluid width and position from 1024px to 1440px
            "lg:absolute lg:mx-0 lg:mt-0 lg:top-[var(--wheel-top-desk)] lg:right-[var(--wheel-right-desk)] lg:left-[var(--wheel-left-desk)] lg:w-[var(--wheel-size-desk)] lg:h-[var(--wheel-size-desk)]",
            "lg:[transform:translate(var(--wheel-shift-x-desk),var(--wheel-shift-y-desk))_scale(var(--wheel-scale-desk))_rotate(var(--wheel-rot-desk))]",
            "lg:[opacity:var(--wheel-op-desk)]"
          )}
        >
          <div className="relative w-full h-full">
            <Image
              src={wheelImage}
              alt="Horoscope Zodiac Wheel"
              fill
              priority
              unoptimized
              sizes="(max-width: 768px) 60vw, (max-width: 1024px) 465px, 427px"
              className="object-contain pointer-events-none select-none drop-shadow-[0_0_40px_rgba(255,216,162,0.35)]"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default HoroscopeHero;
