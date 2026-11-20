import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowCircle } from "@/components/shared/ArrowCircle";
import { Container, Section } from "@/components/layout";
import {
  freeCalculatorHeroData,
  type FreeCalculatorHeroData,
} from "@/data/free-calculator";
import { cn } from "@/lib";

export interface HeroViewportControl {
  /** Horizontal position % or keyword (e.g. 70, "70%", "center", "left", "right"). Default: mobile/tablet 70, desktop 50 */
  x?: number | string;
  /** Vertical position % or keyword (e.g. "bottom", "center", "top", 100, "50%"). Default: mobile/tablet "bottom", desktop "center" */
  y?: number | string;
  /** Zoom scale (e.g. 1.25 for 125%, 1 for 100%). Default: mobile 1.25, tablet 1.35, desktop 1 */
  scale?: number | string;
  /** Vertical shift of the whole content block (heading, paragraph, buttons) in px */
  contentShiftY?: number | string;
  /** Vertical shift of buttons alone in px */
  buttonsShiftY?: number | string;
  /** Vertical shift of the cropped person (wheel-tight.webp) in px */
  personShiftY?: number | string;
  /** Horizontal shift of the cropped person (wheel-tight.webp) in px */
  personShiftX?: number | string;
}

export interface FreeCalculatorHeroProps
  extends React.HTMLAttributes<HTMLElement> {
  data?: Partial<FreeCalculatorHeroData>;
  bgImage?: string;
  /** Cropped person image on tablet & mobile (default: "/images/calculator/wheel-tight.webp") */
  personImage?: string;
  /** Mobile cropped person vertical shift (px) */
  personShiftYMobile?: number | string;
  /** Tablet cropped person vertical shift (px) */
  personShiftYTablet?: number | string;
  /** Mobile cropped person horizontal shift (px) */
  personShiftXMobile?: number | string;
  /** Tablet cropped person horizontal shift (px) */
  personShiftXTablet?: number | string;

  /** General / desktop fallback vertical content shift (heading, paragraph, buttons) */
  contentShiftY?: number | string;
  /** Mobile content vertical shift (heading, paragraph, buttons) */
  contentShiftYMobile?: number | string;
  /** Tablet content vertical shift (heading, paragraph, buttons) */
  contentShiftYTablet?: number | string;
  /** Desktop content vertical shift (heading, paragraph, buttons) */
  contentShiftYDesktop?: number | string;

  /** General / desktop fallback buttons row vertical shift */
  buttonsShiftY?: number | string;
  /** Mobile buttons row vertical shift */
  buttonsShiftYMobile?: number | string;
  /** Tablet buttons row vertical shift */
  buttonsShiftYTablet?: number | string;
  /** Desktop buttons row vertical shift */
  buttonsShiftYDesktop?: number | string;

  /** Unified controls for mobile screens (< 768px): { x, y, scale, contentShiftY, buttonsShiftY } */
  mobile?: HeroViewportControl;
  /** Unified controls for tablet screens (768px - 1023px): { x, y, scale, contentShiftY, buttonsShiftY } */
  tablet?: HeroViewportControl;
  /** Unified controls for desktop screens (>= 1024px): { x, y, scale, contentShiftY, buttonsShiftY } */
  desktop?: HeroViewportControl;

  // Optional individual prop overrides
  zoomMobile?: number | string;
  zoomTablet?: number | string;
  zoomDesktop?: number | string;
  imagePositionXMobile?: number | string;
  imagePositionXTablet?: number | string;
  imagePositionXDesktop?: number | string;
  imagePositionYMobile?: number | string;
  imagePositionYTablet?: number | string;
  imagePositionYDesktop?: number | string;
  className?: string;
}

/**
 * FreeCalculatorHero Component
 *
 * Master specifications from Figma:
 * - Master Section: 1440 x 574, overlay rgba(0, 0, 0, 0.3)
 * - Content Box: width 760, height 293, gap 21px
 *   - Text Group: width 760, height 205, gap 19px
 *     - Heading: Lovelace Text 400, 54.93px / 70.4px, #FFD8A2 (height 141)
 *     - Paragraph: Lato 500, 16px / 22.2px, tracking 1%, #ECECEC (width 684, height 45)
 *   - Buttons Row: width 434, height 48, gap 16px
 *     - Button 1 ("Explore Calculators"): Transparent, border 1px #FFD8A2, text #FFD8A2 + circular chevron badge (bg #FFD8A2, chevron #655373)
 *     - Button 2 ("Book a Consultation"): bg #FFD8A2, text #655373 + circular chevron badge (bg #655373, chevron #FFD8A2)
 *
 * ALL-IN-ONE CONTROLS:
 * - imagePositionXMobile: 70 (0 = left, 50 = center, 70 = woman/wheel, 100 = right)
 * - imagePositionYMobile: 100 (0 = top, 50 = center, 100 = bottom)
 * - zoomMobile: 1.25
 * - imagePositionXTablet: 70
 * - imagePositionYTablet: 100
 * - zoomTablet: 1.35
 * - imagePositionXDesktop: 50
 * - imagePositionYDesktop: 50
 * - zoomDesktop: 1
 * - contentShiftY: 32 (moves heading and paragraph vertically)
 * - buttonsShiftY: 16 (moves buttons row alone vertically)
 */
export function FreeCalculatorHero({
  data: propData,
  bgImage = "/images/calculator/calculator-hero.webp",
  personImage = "/images/calculator/wheel-tight.webp",
  personShiftYMobile,
  personShiftYTablet,
  personShiftXMobile,
  personShiftXTablet,
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
  className,
  ...props
}: FreeCalculatorHeroProps) {
  const data: FreeCalculatorHeroData = {
    ...freeCalculatorHeroData,
    ...propData,
    exploreBtn: {
      ...freeCalculatorHeroData.exploreBtn,
      ...propData?.exploreBtn,
    },
    consultationBtn: {
      ...freeCalculatorHeroData.consultationBtn,
      ...propData?.consultationBtn,
    },
  };

  // Grouped controls with fallback to individual props and defaults (both X and Y support numbers 0-100)
  const mobileCtrl: HeroViewportControl = {
    x: propMobile?.x ?? imagePositionXMobile ?? 70,
    y: propMobile?.y ?? imagePositionYMobile ?? 100,
    scale: propMobile?.scale ?? zoomMobile ?? 1.25,
    contentShiftY: propMobile?.contentShiftY ?? contentShiftYMobile,
    buttonsShiftY: propMobile?.buttonsShiftY ?? buttonsShiftYMobile,
    personShiftY: propMobile?.personShiftY ?? personShiftYMobile,
    personShiftX: propMobile?.personShiftX ?? personShiftXMobile,
  };

  const tabletCtrl: HeroViewportControl = {
    x: propTablet?.x ?? imagePositionXTablet ?? 70,
    y: propTablet?.y ?? imagePositionYTablet ?? 100,
    scale: propTablet?.scale ?? zoomTablet ?? 1.2,
    contentShiftY: propTablet?.contentShiftY ?? contentShiftYTablet,
    buttonsShiftY: propTablet?.buttonsShiftY ?? buttonsShiftYTablet,
    personShiftY: propTablet?.personShiftY ?? personShiftYTablet,
    personShiftX: propTablet?.personShiftX ?? personShiftXTablet,
  };

  const desktopCtrl: HeroViewportControl = {
    x: propDesktop?.x ?? imagePositionXDesktop ?? 50,
    y: propDesktop?.y ?? imagePositionYDesktop ?? 50,
    scale: propDesktop?.scale ?? zoomDesktop ?? 1,
    contentShiftY: propDesktop?.contentShiftY ?? contentShiftYDesktop ?? contentShiftY,
    buttonsShiftY: propDesktop?.buttonsShiftY ?? buttonsShiftYDesktop ?? buttonsShiftY,
  };

  // Helper to format px/string shift values
  const formatShift = (val: number | string | undefined, defaultVal: number | string = 0) => {
    const v = val ?? defaultVal;
    return typeof v === "number" ? `${v}px` : String(v);
  };

  // Cropped person shifts (wheel-tight.webp centered at bottom-0)
  const pShiftYMob = mobileCtrl.personShiftY ?? 0;
  const pShiftYTab = tabletCtrl.personShiftY ?? 0;
  const pShiftXMob = mobileCtrl.personShiftX ?? 0;
  const pShiftXTab = tabletCtrl.personShiftX ?? 0;

  const formattedPersonShiftYMobile = formatShift(pShiftYMob, 0);
  const formattedPersonShiftYTablet = formatShift(pShiftYTab, 0);
  const formattedPersonShiftXMobile = formatShift(pShiftXMob, 0);
  const formattedPersonShiftXTablet = formatShift(pShiftXTab, 0);

  // Content block vertical shift (moves heading, paragraph, and buttons together as a whole unit)
  const shiftYMob = mobileCtrl.contentShiftY ?? 0;
  const shiftYTab = tabletCtrl.contentShiftY ?? 0;
  const shiftYDesk = desktopCtrl.contentShiftY ?? 32;

  const formattedContentShiftYMobile = formatShift(shiftYMob, 0);
  const formattedContentShiftYTablet = formatShift(shiftYTab, 0);
  const formattedContentShiftYDesktop = formatShift(shiftYDesk, 32);

  // Buttons row vertical shift (optional fine-tuning of buttons row alone)
  const btnShiftYMob = mobileCtrl.buttonsShiftY ?? 0;
  const btnShiftYTab = tabletCtrl.buttonsShiftY ?? 0;
  const btnShiftYDesk = desktopCtrl.buttonsShiftY ?? 16;

  const formattedButtonsShiftYMobile = formatShift(btnShiftYMob, 0);
  const formattedButtonsShiftYTablet = formatShift(btnShiftYTab, 0);
  const formattedButtonsShiftYDesktop = formatShift(btnShiftYDesk, 16);

  // Format zoom scale value
  const formatScale = (val: number | string | undefined, fallback: number | string) => {
    const v = val ?? fallback;
    return typeof v === "number" ? `${v}` : v;
  };

  const formattedZoomMobile = formatScale(mobileCtrl.scale, 1.25);
  const formattedZoomTablet = formatScale(tabletCtrl.scale, 1.35);
  const formattedZoomDesktop = formatScale(desktopCtrl.scale, 1);

  // Format object-position (X% Y) ensuring full-bleed coverage with zero empty gaps or cropping
  const formatCoord = (coord: number | string | undefined, defaultVal: number | string) => {
    const c = coord ?? defaultVal;
    if (typeof c === "number") return `${c}%`;
    const s = String(c).trim();
    return s.endsWith("%") || s.endsWith("px") || s === "center" || s === "left" || s === "right" || s === "top" || s === "bottom"
      ? s
      : `${s}%`;
  };

  const formattedObjPosMobile = `${formatCoord(mobileCtrl.x, 70)} ${formatCoord(mobileCtrl.y, 100)}`;
  const formattedObjPosTablet = `${formatCoord(tabletCtrl.x, 70)} ${formatCoord(tabletCtrl.y, 100)}`;
  const formattedObjPosDesktop = `${formatCoord(desktopCtrl.x, 50)} ${formatCoord(desktopCtrl.y, 50)}`;

  // Helper to parse numeric values for active vertical panning
  const parseNum = (val: number | string | undefined, fallback: number): number => {
    if (typeof val === "number") return val;
    if (typeof val === "string") {
      const parsed = parseFloat(val);
      if (!isNaN(parsed)) return parsed;
    }
    return fallback;
  };

  const scaleMob = parseNum(mobileCtrl.scale, 1.25);
  const scaleTab = parseNum(tabletCtrl.scale, 1.35);
  const scaleDesk = parseNum(desktopCtrl.scale, 1);

  const yMob = parseNum(mobileCtrl.y, 100);
  const yTab = parseNum(tabletCtrl.y, 100);
  const yDesk = parseNum(desktopCtrl.y, 50);

  // Dynamic vertical translate: when zoomed or panning Y (0 = top, 50 = center, 100 = bottom)
  // At y=100 (bottom), offset is 0. At y=0 (top), offset moves image down so top is visible.
  const transYMob = `${((100 - yMob) / 100) * (scaleMob > 1 ? scaleMob - 1 : 0.4) * 100}%`;
  const transYTab = `${((100 - yTab) / 100) * (scaleTab > 1 ? scaleTab - 1 : 0.4) * 100}%`;
  const transYDesk = `${((50 - yDesk) / 100) * (scaleDesk > 1 ? scaleDesk - 1 : 0.3) * 100}%`;

  return (
    <Section
      {...props}
      container={false}
      spacing="none"
      aria-label="Free Numerology Calculators Hero"
      className={cn(
        "relative w-full flex",
        "h-screen h-[100dvh] min-h-[100dvh] lg:h-[574px] lg:min-h-[574px] items-start lg:items-center",
        className
      )}
    >
      {/* Full-bleed background + 30% black overlay (rgba(0, 0, 0, 0.3)) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#090d22] overflow-hidden pointer-events-none"
      >
        {/* Full-bleed background wrapper with object-position panning (zero empty gaps, zero accidental cropping) */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full overflow-hidden pointer-events-none",
            "lg:[--hero-mask:none] lg:[mask-image:none!important] lg:[-webkit-mask-image:none!important]"
          )}
          style={
            {
              maskImage:
                "var(--hero-mask, linear-gradient(to bottom, transparent, black 35%))",
              WebkitMaskImage:
                "var(--hero-mask, linear-gradient(to bottom, transparent, black 35%))",
            } as React.CSSProperties
          }
        >
          <Image
            src={bgImage}
            alt=""
            fill
            priority
            sizes="100vw"
            style={
              {
                "--obj-pos-mob": formattedObjPosMobile,
                "--obj-pos-tab": formattedObjPosTablet,
                "--obj-pos-desk": formattedObjPosDesktop,
                "--zoom-mob": formattedZoomMobile,
                "--zoom-tab": formattedZoomTablet,
                "--zoom-desk": formattedZoomDesktop,
                "--trans-y-mob": transYMob,
                "--trans-y-tab": transYTab,
                "--trans-y-desk": transYDesk,
              } as React.CSSProperties
            }
            className={cn(
              "object-cover select-none origin-bottom lg:origin-center transition-[object-position,transform] duration-300 ease-out",
              "[object-position:var(--obj-pos-mob)] md:[object-position:var(--obj-pos-tab)] lg:[object-position:var(--obj-pos-desk)]",
              "[transform:scale(var(--zoom-mob))_translateY(var(--trans-y-mob))] md:[transform:scale(var(--zoom-tab))_translateY(var(--trans-y-tab))] lg:[transform:scale(var(--zoom-desk))_translateY(var(--trans-y-desk))]"
            )}
          />
        </div>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Cropped Person (wheel-tight.webp) - Tablet 768 (393x468) & Mobile 425 (329x365) Centered, Fluid Responsive Clamps (Hidden on Desktop) */}
      <div
        aria-hidden="true"
        style={
          {
            "--person-shift-x-mob": formattedPersonShiftXMobile,
            "--person-shift-x-tab": formattedPersonShiftXTablet,
            "--person-shift-y-mob": formattedPersonShiftYMobile,
            "--person-shift-y-tab": formattedPersonShiftYTablet,
          } as React.CSSProperties
        }
        className={cn(
          "pointer-events-none absolute bottom-0 left-1/2 z-[5] lg:hidden select-none",
          "w-[clamp(280px,calc(249.7px_+_18.66vw),393px)]",
          "h-[clamp(310px,calc(237.38px_+_30.03vw),468px)]",
          "opacity-100 rotate-0",
          "[transform:translateX(calc(-50%_+_var(--person-shift-x-mob)))_translateY(var(--person-shift-y-mob))] md:[transform:translateX(calc(-50%_+_var(--person-shift-x-tab)))_translateY(var(--person-shift-y-tab))]"
        )}
      >
        <Image
          src={personImage}
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 329px, 393px"
          className="object-contain object-bottom"
        />
      </div>

      {/* 1440px Master Frame Container */}
      <Container
        padding="page"
        className="relative z-10 flex h-full w-full items-start pt-[90px] pb-10 lg:items-center lg:py-0"
      >
        {/* Content Block: Mobile (385 x 333, gap 40px), Tablet (648 x 230, gap 21px), Desktop (760 x 293, gap 21px) */}
        <div
          style={
            {
              "--content-shift-mob": formattedContentShiftYMobile,
              "--content-shift-tab": formattedContentShiftYTablet,
              "--content-shift-desk": formattedContentShiftYDesktop,
            } as React.CSSProperties
          }
          className="flex w-full max-w-[385px] md:max-w-[648px] lg:max-w-[760px] flex-col gap-[40px] md:gap-[21px] justify-start lg:justify-center items-start text-left [transform:translateY(var(--content-shift-mob))] md:[transform:translateY(var(--content-shift-tab))] lg:[transform:translateY(var(--content-shift-desk))] transition-transform duration-200"
        >
          {/* Text Group: Mobile (max-w 385), Tablet (max-w 648), Desktop (max-w 760) */}
          <div className="flex w-full max-w-[385px] md:max-w-[648px] lg:max-w-[760px] flex-col gap-[19px] items-start">
            {/* Heading: Lovelace Text 400, 54.93px / 70.4px, #FFD8A2 */}
            <h1
              className={cn(
                "w-full max-w-[385px] md:max-w-[648px] lg:max-w-[760px] font-heading font-normal text-[#FFD8A2] tracking-normal",
                "text-[clamp(2.125rem,1.57rem_+_2.368vw,3.433rem)]",
                "leading-[clamp(2.75rem,2.02rem_+_3.111vw,4.4rem)]",
                "lg:text-[54.93px] lg:leading-[70.4px]"
              )}
            >
              {data.heading}
            </h1>

            {/* Paragraph: Lato 500, 16px / 22.2px, tracking 1%, #ECECEC */}
            <p
              className={cn(
                "w-full max-w-[385px] md:max-w-[648px] lg:max-w-[684px] font-lato font-medium text-[#ECECEC] tracking-[0.01em]",
                "text-[14px] leading-[20px] md:text-[16px] md:leading-[22.2px]"
              )}
            >
              {data.paragraph}
            </p>
          </div>

          {/* Buttons Row: content-width and left-aligned, stacked below 768px, side by side above */}
          <div
            style={
              {
                "--btn-shift-mob": formattedButtonsShiftYMobile,
                "--btn-shift-tab": formattedButtonsShiftYTablet,
                "--btn-shift-desk": formattedButtonsShiftYDesktop,
              } as React.CSSProperties
            }
            className="flex w-full flex-col items-start gap-[12px] md:w-auto md:flex-row md:items-center md:gap-[16px] [transform:translateY(var(--btn-shift-mob))] md:[transform:translateY(var(--btn-shift-tab))] lg:[transform:translateY(var(--btn-shift-desk))] transition-transform duration-200"
          >
            {/* Button 1: Explore Calculators (Transparent, 1px #FFD8A2 border, #FFD8A2 text + circular badge) */}
            <Link
              href={data.exploreBtn.href}
              className={cn(
                "inline-flex h-[48px] w-auto self-start items-center justify-center rounded-[50px] border border-[#FFD8A2] bg-transparent pl-[22px] pr-[10px] gap-[10px]",
                "font-lato font-bold text-[16px] leading-none tracking-normal text-[#FFD8A2]",
                "hover:bg-[#FFD8A2]/10 active:scale-[0.98]",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD8A2]",
                "transition-all duration-150 cursor-pointer text-center whitespace-nowrap"
              )}
            >
              <span>{data.exploreBtn.label}</span>
              <ArrowCircle tone="accent" size={28} />
            </Link>

            {/* Button 2: Book a Consultation (bg #FFD8A2, text #655373 + round badge) */}
            <Link
              href={data.consultationBtn.href}
              className={cn(
                "inline-flex h-[48px] w-auto self-start items-center justify-center rounded-[50px] bg-[#FFD8A2] pl-[22px] pr-[10px] gap-[10px]",
                "font-lato font-bold text-[16px] leading-none tracking-normal text-[#655373]",
                "hover:brightness-105 active:scale-[0.98]",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD8A2]",
                "transition-all duration-150 cursor-pointer text-center whitespace-nowrap"
              )}
            >
              <span>{data.consultationBtn.label}</span>
              <ArrowCircle tone="primary" size={28} />
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default FreeCalculatorHero;
