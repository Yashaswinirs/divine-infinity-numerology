import * as React from "react";
import Image from "next/image";
import {
  leoZodiacDetailData,
  type ZodiacDetailData,
  type ZodiacAttribute,
  type LuckyInfoItem,
} from "@/data/horoscope";
import { ZodiacHoroscopeContent } from "./ZodiacHoroscopeContent";
import { cn } from "@/lib";

export interface ZodiacDetailPanelProps
  extends React.HTMLAttributes<HTMLElement> {
  data?: Partial<ZodiacDetailData>;
  /** Custom content for the Right Content Area (Zone 3) */
  children?: React.ReactNode;
  /** Custom content to override the Footer Strip (Zone 4) */
  footerContent?: React.ReactNode;
  className?: string;
}

/**
 * Fallback Attribute Icons (single-stroke SVGs matching the zodiac icon style)
 */
function FlameIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function HashIcon({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="4" y1="15" x2="20" y2="15" />
      <line x1="10" y1="3" x2="8" y2="21" />
      <line x1="16" y1="3" x2="14" y2="21" />
    </svg>
  );
}

/**
 * Render attribute icon: uses custom SVG from public/images/horoscope/zodiac-detail-panel/ (scales 28px @320 -> 32px @425 / 36px tablet & desktop)
 */
function renderAttributeIcon(attr: ZodiacAttribute) {
  const iconSrc =
    attr.icon ||
    (attr.iconType
      ? `/images/horoscope/zodiac-detail-panel/${attr.iconType}.svg`
      : undefined);

  if (iconSrc) {
    return (
      <div
        className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] md:w-[36px] md:h-[36px] flex items-center justify-center shrink-0"
        aria-hidden="true"
      >
        <Image
          src={iconSrc}
          alt=""
          width={36}
          height={36}
          unoptimized
          className="w-full h-full object-contain select-none pointer-events-none"
        />
      </div>
    );
  }

  return (
    <div
      className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] md:w-[36px] md:h-[36px] rounded-[30px] border border-[var(--zodiac-border-gold)] flex items-center justify-center shrink-0"
      aria-hidden="true"
    >
      <FlameIcon className="w-[18px] h-[18px] text-[#FFD8A2]" />
    </div>
  );
}

/**
 * Render lucky info icon: uses custom SVG from public/images/horoscope/zodiac-detail-panel/ (scales 28px @320 -> 32px @375 -> 36px @425 / 48px tablet & desktop)
 */
function renderLuckyIcon(item: LuckyInfoItem) {
  const iconSrc =
    item.icon ||
    (item.iconType
      ? `/images/horoscope/zodiac-detail-panel/${item.iconType}.svg`
      : undefined);

  if (iconSrc) {
    return (
      <div
        className="w-[clamp(1.75rem,0.226rem_+_7.62vw,2.25rem)] h-[clamp(1.75rem,0.226rem_+_7.62vw,2.25rem)] md:w-[48px] md:h-[48px] flex items-center justify-center shrink-0"
        aria-hidden="true"
      >
        <Image
          src={iconSrc}
          alt=""
          width={48}
          height={48}
          unoptimized
          className="w-full h-full object-contain select-none pointer-events-none"
        />
      </div>
    );
  }

  return (
    <div
      className="w-[clamp(1.75rem,0.226rem_+_7.62vw,2.25rem)] h-[clamp(1.75rem,0.226rem_+_7.62vw,2.25rem)] md:w-[48px] md:h-[48px] rounded-[30px] border border-[var(--zodiac-border-gold)] flex items-center justify-center shrink-0"
      aria-hidden="true"
    >
      <HashIcon className="w-[18px] h-[18px] md:w-[22px] md:h-[22px] text-[#FFD8A2]" />
    </div>
  );
}

/**
 * ZodiacDetailPanel (Fluid Responsive Specification)
 *
 * FIGMA ANCHORS:
 * - Mobile (425px):
 *   - Outer Box: 388 x 885, padding 20px top/bottom, 10px left/right, gap 25px, radius 24px
 *   - Inner top section: 366 x 553 (Sign identity 70x85, Attributes 274x126 in 2 columns)
 *   - Horizontal Separator: width 0, height 366, angle -90 deg, opacity 0.2, 1px solid rgba(255, 240, 219, 1)
 *   - Lower Section: 366 x 182, 2 rows of 2 boxes (175x68 each), icon 36x36, NO separators between boxes
 * - Tablet (768px):
 *   - Outer Box: 648 x 800, padding 20px all around, gap 25px, radius 24px
 *   - Left column: 178 x 424, gap 51px
 *   - Vertical Separator: width 0, height 543, opacity 0.2, 1px solid rgba(255, 240, 219, 1)
 *   - Right area: 404 x 534, gap 40px
 *   - Lower Section: 606 x 190, 2 rows of 2 boxes (278x72 each), icon 48x48, with 72px vertical separators between boxes
 * - Desktop (1440px):
 *   - Outer Box: 1116 x 609, radius 18px, border 1px solid #655373
 *   - Vertical Separator: width 0, height 440.5, top 31px, left 234.5px, opacity 0.2, 1px solid rgba(255, 240, 219, 1)
 *   - Lower Section: 1041 x 93, 1 row of 4 boxes (228x72 each), icon 48x48
 */
export function ZodiacDetailPanel({
  data: propData,
  children,
  footerContent,
  className,
  ...props
}: ZodiacDetailPanelProps) {
  const data: ZodiacDetailData = {
    ...leoZodiacDetailData,
    ...propData,
    attributes: propData?.attributes ?? leoZodiacDetailData.attributes,
    luckyInfo: propData?.luckyInfo ?? leoZodiacDetailData.luckyInfo,
    horoscopes: propData?.horoscopes ?? leoZodiacDetailData.horoscopes,
  };

  const iconSrc =
    data.icon || `/images/horoscope/zodiac-sign-icons/${data.slug}.svg`;

  // Group lucky items into 2 pairs for the 2x2 tablet/mobile layout
  const luckyPair1 = data.luckyInfo.slice(0, 2);
  const luckyPair2 = data.luckyInfo.slice(2, 4);

  return (
    <section
      id="zodiac-detail-panel"
      aria-labelledby="zodiac-detail-sign-name"
      data-property-1="Frame 264"
      className={cn(
        // PANEL CONTAINER: 388px mobile -> 648px tablet -> 1116px desktop
        "relative flex w-full max-w-[388px] md:max-w-[648px] xl:max-w-[1116px] min-h-0 md:min-h-[800px] xl:min-h-[609px] flex-col justify-between",
        "rounded-[24px] xl:rounded-[18px] border border-[#655373] bg-zodiac-panel",
        "py-[20px] px-[10px] md:p-[20px] xl:pt-[28px] xl:pb-[37px] xl:pl-[30px] xl:pr-[45px]",
        "gap-[25px] xl:gap-[32px]",
        "opacity-100 rotate-0 select-none text-white",
        className
      )}
      {...props}
    >
      {/* ========================================================
          TOP LAYOUT: Left Column + Divider + Right Content Area
          ======================================================== */}
      <div className="flex flex-col md:flex-row md:items-start w-full min-h-0">
        {/* 1. LEFT COLUMN / MOBILE TOP SECTION: Sign Identity + Attributes */}
        <div className="w-full md:w-[178px] xl:w-[176px] flex flex-col md:items-center md:gap-[51px] xl:gap-[23px] shrink-0">
          {/* MOBILE LAYOUT (< md): Horizontal row with Sign Identity (left) + Attributes (right) */}
          <div className="flex md:hidden flex-row items-center justify-between w-full gap-[10px] sm:gap-[18px]">
            {/* Sign identity (Mobile: 70 x 85) */}
            <div className="flex flex-col items-center justify-center shrink-0 w-[64px] sm:w-[70px] h-[85px]">
              <div className="w-[54px] h-[54px] sm:w-[60px] sm:h-[60px] flex items-center justify-center">
                <Image
                  src={iconSrc}
                  alt=""
                  width={60}
                  height={60}
                  unoptimized
                  className="w-full h-full object-contain select-none pointer-events-none"
                />
              </div>
              <h3 className="font-heading font-normal text-[15px] sm:text-[16px] leading-tight text-[#FFF0DB] text-center mt-1">
                {data.name}
              </h3>
            </div>

            {/* Attributes list (Mobile: 274 x 126 in 2-column grid: Box 1 left, Box 2 right, Box 3 full width) */}
            <dl className="grid grid-cols-2 gap-x-[6px] sm:gap-x-[10px] gap-y-0 w-full flex-1 max-w-[274px] m-0 p-0">
              {data.attributes.map((attr: ZodiacAttribute, index: number) => {
                const isThird = index === 2;
                return (
                  <div
                    key={attr.label}
                    className={cn(
                      "flex items-center gap-[4px] sm:gap-[6px] py-[6px] border-b border-[#655373]/20",
                      isThird ? "col-span-2" : "col-span-1"
                    )}
                  >
                    {renderAttributeIcon(attr)}
                    <div className="flex flex-col justify-center min-w-0">
                      <dt className="font-sans font-bold text-[12.5px] sm:text-[14px] leading-tight text-[#FFF0DB] whitespace-nowrap">
                        {attr.label}
                      </dt>
                      <dd className="font-sans font-medium text-[12px] sm:text-[14px] leading-[18.8px] text-[#ECECEC] m-0 whitespace-nowrap">
                        {attr.value}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </div>

          {/* TABLET & DESKTOP LAYOUT (>= md): Vertical Column */}
          <div className="hidden md:flex flex-col items-center w-full">
            {/* Block A: sign identity (width 166, height 166, relative container) */}
            <div className="relative w-[166px] h-[166px] shrink-0">
              <div className="absolute top-0 left-0 w-[166px] h-[123px] flex items-center justify-center">
                <Image
                  src={iconSrc}
                  alt=""
                  width={120}
                  height={120}
                  unoptimized
                  className="w-[120px] h-[120px] object-contain select-none pointer-events-none"
                />
              </div>
              <h3
                id="zodiac-detail-sign-name"
                className="absolute bottom-0 left-0 w-[166px] h-[43px] flex items-center justify-center font-heading font-normal text-[28.13px] leading-[42.4px] tracking-normal text-center text-[#FFF0DB]"
              >
                {data.name}
              </h3>
            </div>

            {/* Block B: attributes list (3 rows of 178px on tablet / 176px on desktop) */}
            <dl className="w-full flex flex-col gap-[8px] m-0 p-0 mt-[23px]">
              {data.attributes.map((attr: ZodiacAttribute) => (
                <div
                  key={attr.label}
                  className="flex w-full h-[67px] items-center gap-[14px] px-[10px] pt-[10px] pb-[7px] border-b border-[#655373]/20"
                >
                  {renderAttributeIcon(attr)}
                  <div className="flex flex-col justify-center gap-[3px] h-[49px] min-w-[66px] whitespace-nowrap">
                    <dt className="h-[23px] flex items-center font-sans font-bold text-[18px] leading-[22.6px] tracking-normal text-[#FFF0DB]">
                      {attr.label}
                    </dt>
                    <dd className="h-[23px] flex items-center font-sans font-medium text-[16px] leading-[22.2px] tracking-[0.01em] text-[#ECECEC] m-0">
                      {attr.value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* 2. SEPARATORS */}
        {/* Mobile: Horizontal Divider between Left Section and Today's Horoscope (width: 0, height: 366, angle: -90 deg, 1px solid rgba(255, 240, 219, 0.2)) */}
        <div
          className="w-full h-0 border-b border-[rgba(255,240,219,0.2)] my-[14px] md:hidden"
          aria-hidden="true"
        />

        {/* Tablet: Vertical Separator between Left Section and Today's Horoscope (width: 0, height: 543, 1px solid rgba(255, 240, 219, 0.2)) */}
        <div
          className="hidden md:block xl:hidden shrink-0 mx-[14px] w-0 h-[543px] border-r border-[rgba(255,240,219,0.2)]"
          aria-hidden="true"
        />

        {/* Desktop: Vertical Separator between Left Section and Today's Horoscope (width: 0, height: 440.5, top: 31px, left: 234.5px, 1px solid rgba(255, 240, 219, 0.2)) */}
        <div
          className="hidden xl:block shrink-0 ml-[28.5px] mr-[45.5px] pt-[31px]"
          aria-hidden="true"
        >
          <div className="w-0 h-[440.5px] border-r border-[rgba(255,240,219,0.2)]" />
        </div>

        {/* 3. RIGHT CONTENT AREA: Tabs + Horoscope Content (404px tablet, 790px desktop) */}
        <div
          className="w-full md:w-[404px] xl:w-[790px] min-h-0 pt-0 xl:pt-[44px] flex flex-col shrink-0"
          data-zone="right-content"
        >
          {children ?? (
            <ZodiacHoroscopeContent horoscopes={data.horoscopes} />
          )}
        </div>
      </div>

      {/* ========================================================
          4. FOOTER STRIP:
             Mobile: 2x2 layout, NO separators between boxes
             Tablet: 2x2 layout, with 72px vertical separators between boxes
             Desktop: 1x4 layout, all 4 boxes side by side
          ======================================================== */}
      <footer
        className="w-full min-h-0 pt-[20px] border-t border-[var(--zodiac-border-gold)] opacity-100 rotate-0 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-[10px] md:gap-[25px] xl:gap-[30px]"
        data-zone="footer-strip"
      >
        {footerContent ?? (
          <>
            {/* ROW 1: Lucky Number + Lucky Color */}
            <div className="flex flex-row items-center justify-between w-full md:gap-[25px] xl:contents">
              {luckyPair1.map((item: LuckyInfoItem, idx: number) => (
                <React.Fragment key={item.label}>
                  <div className="flex items-center flex-1 min-w-0 max-w-[175px] md:max-w-[278px] xl:max-w-[228px] h-[68px] md:h-[72px] py-[10px] px-0 md:px-[10px] gap-[clamp(0.375rem,-0.196rem_+_2.857vw,0.625rem)] md:gap-[18px]">
                    {/* Lucky Info SVG Icon (scales 28px @320 -> 32px @375 -> 36px @425 / 48px tablet & desktop) */}
                    {renderLuckyIcon(item)}

                    {/* Text group (flex-1 allows full width for long strings like 11.30 am - 1.00 pm) */}
                    <div className="flex flex-col justify-center flex-1 min-w-0 gap-[2px] md:gap-[6px]">
                      {/* Label: fluidly scales down on <425px so it never truncates, 18px on >=425px */}
                      <dt className="h-auto min-h-[20px] md:h-[23px] flex items-center font-sans font-bold text-[clamp(0.8125rem,-0.26rem_+_5.2vw,1.125rem)] leading-tight text-[#FFF0DB] truncate">
                        {item.label}
                      </dt>
                      {/* Value: Lato 700 12-14px @mobile / Lato 500 16px @tablet/desktop */}
                      <dd className="flex items-center font-sans font-bold md:font-medium text-[clamp(0.75rem,0.57rem_+_0.75vw,1rem)] leading-[18.8px] md:leading-[22.2px] text-[#ECECEC] m-0 whitespace-nowrap truncate">
                        {item.value}
                      </dd>
                    </div>
                  </div>

                  {/* Vertical Separator between Box 1 and Box 2 on Tablet and Mobile (width: 0, height: 56/68/72, 1px solid rgba(255, 240, 219, 0.2)) */}
                  {idx === 0 && (
                    <div
                      className="w-0 h-[56px] sm:h-[68px] md:h-[72px] border-r border-[rgba(255,240,219,0.2)] shrink-0 xl:hidden"
                      aria-hidden="true"
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* ROW 2: Lucky Direction + Lucky Time */}
            <div className="flex flex-row items-center justify-between w-full md:gap-[25px] xl:contents">
              {luckyPair2.map((item: LuckyInfoItem, idx: number) => (
                <React.Fragment key={item.label}>
                  <div className="flex items-center flex-1 min-w-0 max-w-[175px] md:max-w-[278px] xl:max-w-[228px] h-[68px] md:h-[72px] py-[10px] px-0 md:px-[10px] gap-[clamp(0.375rem,-0.196rem_+_2.857vw,0.625rem)] md:gap-[18px]">
                    {/* Lucky Info SVG Icon (scales 28px @320 -> 32px @375 -> 36px @425 / 48px tablet & desktop) */}
                    {renderLuckyIcon(item)}

                    {/* Text group (flex-1 allows full width for long strings like 11.30 am - 1.00 pm) */}
                    <div className="flex flex-col justify-center flex-1 min-w-0 gap-[2px] md:gap-[6px]">
                      {/* Label: fluidly scales down on <425px so it never truncates, 18px on >=425px */}
                      <dt className="h-auto min-h-[20px] md:h-[23px] flex items-center font-sans font-bold text-[clamp(0.8125rem,-0.26rem_+_5.2vw,1.125rem)] leading-tight text-[#FFF0DB] truncate">
                        {item.label}
                      </dt>
                      {/* Value: Lato 700 12-14px @mobile / Lato 500 16px @tablet/desktop */}
                      <dd className="flex items-center font-sans font-bold md:font-medium text-[clamp(0.75rem,0.57rem_+_0.75vw,1rem)] leading-[18.8px] md:leading-[22.2px] text-[#ECECEC] m-0 whitespace-nowrap truncate">
                        {item.value}
                      </dd>
                    </div>
                  </div>

                  {/* Vertical Separator between Box 3 and Box 4 on Tablet and Mobile */}
                  {idx === 0 && (
                    <div
                      className="w-0 h-[56px] sm:h-[68px] md:h-[72px] border-r border-[rgba(255,240,219,0.2)] shrink-0 xl:hidden"
                      aria-hidden="true"
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </>
        )}
      </footer>
    </section>
  );
}

export default ZodiacDetailPanel;
