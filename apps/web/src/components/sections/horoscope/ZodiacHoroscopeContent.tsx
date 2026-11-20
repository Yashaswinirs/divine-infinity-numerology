"use client";

import * as React from "react";
import {
  leoZodiacDetailData,
  type HoroscopePeriod,
  type HoroscopePeriodMap,
} from "@/data/horoscope";
import { cn } from "@/lib";

export interface ZodiacHoroscopeContentProps {
  horoscopes?: HoroscopePeriodMap;
  defaultPeriod?: HoroscopePeriod;
  className?: string;
}

interface PeriodTabItem {
  id: HoroscopePeriod;
  label: string;
}

const PERIOD_TABS: PeriodTabItem[] = [
  { id: "daily", label: "Daily" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
  { id: "yearly", label: "Yearly" },
];

/**
 * ZodiacHoroscopeContent (Fluid Responsive Specification)
 *
 * FIGMA ANCHORS:
 * - Mobile (425px):
 *   - Tabs container: 320 x 32, 4 tabs (80 x 32 each), rounded 8px
 *   - Tab font: Lato 700, 14-16px, line-height 100%, centered
 *   - Horoscope block: 366 x 367, gap 16px
 *   - Heading: Lovelace Text 400, 17.33px / 25px, #FFD8A2
 *   - Body: Lato 500, 14px / 18.8px, #ECECEC
 * - Tablet (768px):
 *   - Right layout: 404 x 534, gap 40px
 *   - Tabs container: 396 x 43, 4 tabs (99 x 43 each), rounded 8px, padding 10px, divider border-r 1px #655373
 *   - Content block: 404 x 451, gap 16px
 *   - Heading: Lovelace Text 400, 19.08px / 23.3px, #FFD8A2
 *   - Body: Lato 500, 16px / 22.2px, letter-spacing 1%, #ECECEC (overflow-safe, fits within 534px)
 * - Desktop (1440px):
 *   - Right layout: 790 x 387, gap 32px
 *   - Tabs container: 433 x 43, 4 tabs (103 x 43 each)
 *   - Heading: Lovelace Text 400, 22.5px / 30.7px, #FFD8A2
 *   - Body: min-h-[267px], Lato 500, 16px / 22.2px, #ECECEC
 */
export function ZodiacHoroscopeContent({
  horoscopes = leoZodiacDetailData.horoscopes,
  defaultPeriod = "daily",
  className,
}: ZodiacHoroscopeContentProps) {
  const [activeTab, setActiveTab] = React.useState<HoroscopePeriod>(defaultPeriod);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const currentContent = horoscopes[activeTab] || horoscopes.daily;

  // Arrow key navigation between tabs (WAI-ARIA pattern)
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    if (e.key === "ArrowRight") {
      newIndex = (index + 1) % PERIOD_TABS.length;
    } else if (e.key === "ArrowLeft") {
      newIndex = (index - 1 + PERIOD_TABS.length) % PERIOD_TABS.length;
    } else if (e.key === "Home") {
      newIndex = 0;
    } else if (e.key === "End") {
      newIndex = PERIOD_TABS.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    const targetTab = PERIOD_TABS[newIndex];
    if (targetTab) {
      setActiveTab(targetTab.id);
      tabRefs.current[newIndex]?.focus();
    }
  };

  return (
    <div
      className={cn(
        // INNER RIGHT COLUMN: 404px on tablet, 707px on desktop, gap 16px mobile -> 40px tablet -> 42px desktop
        "flex w-full max-w-[404px] xl:max-w-[707px] min-h-0 flex-col gap-[16px] md:gap-[40px] xl:gap-[42px] select-none",
        className
      )}
    >
      {/* ========================================================
          1. PERIOD TABS: 4 tabs (Daily, Weekly, Monthly, Yearly)
             Mobile: 320x32 (80x32 each)
             Tablet: 396x43 (99x43 each)
             Desktop: 433x43 (103x43 each)
          ======================================================== */}
      <div
        role="tablist"
        aria-label="Horoscope period"
        className="flex w-full max-w-[320px] md:max-w-[396px] xl:max-w-[433px] h-[32px] md:h-[43px] items-center rounded-[8px] bg-[rgba(128,99,152,0.3)] p-0"
      >
        {PERIOD_TABS.map((tab, index) => {
          const isActive = activeTab === tab.id;
          const hasDivider = index < 3;

          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                // Tab Button: 1/4 width (80px mobile / 99px tablet / 103px desktop)
                "flex-1 h-full flex items-center justify-center p-[6px] md:p-[10px] rounded-[8px]",
                "font-sans font-bold text-[14px] md:text-[18px] leading-none tracking-normal text-center align-middle whitespace-nowrap",
                "transition-[background-color,color] duration-150 cursor-pointer box-border",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD8A2] focus-visible:ring-offset-1 focus-visible:ring-offset-[#1D1B4D]",
                isActive
                  ? "bg-[#655373] text-[#FFF0DB]"
                  : "bg-transparent text-[var(--zodiac-tab-inactive)] hover:text-[#FFF0DB] hover:bg-[#655373]/30",
                hasDivider && "border-r border-[#655373]"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ========================================================
          2. HOROSCOPE CONTENT BLOCK: Heading + Body
             Gap between heading and body: 16px (matches Figma)
             Overflow-safe: fits cleanly within inner layout
          ======================================================== */}
      <div className="flex w-full min-h-0 flex-col gap-[16px]">
        {/* a) Heading: Lovelace Text 400, fluid 17.33px @mobile, 19.08px @tablet, 22.5px @desktop */}
        <h4
          id={`horoscope-heading-${activeTab}`}
          className="flex min-h-[25px] md:min-h-[23.3px] xl:min-h-[30.7px] items-center font-heading font-normal text-[clamp(1.083rem,0.948rem_+_0.509vw,1.406rem)] leading-[clamp(1.456rem,max(1.694rem_-_0.496vw,0.928rem_+_1.101vw),1.919rem)] tracking-normal text-[#FFD8A2]"
        >
          {currentContent.heading}
        </h4>

        {/* b) Body: Lato 500, fluid 14px/18.8px @mobile to 16px/22.2px @tablet/desktop */}
        <div
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className="flex w-full min-h-0 flex-col gap-[10px] md:gap-[12px] font-sans font-medium text-[14px] md:text-[16px] leading-[18.8px] md:leading-[22.2px] tracking-[0.01em] text-[#ECECEC] align-middle overflow-visible break-words"
        >
          {/* Paragraph 1: Intro */}
          <p className="m-0">{currentContent.intro}</p>

          {/* Paragraphs 2-4: Sections with inline semibold label */}
          {currentContent.sections.map((section) => (
            <p key={section.label} className="m-0">
              <span className="font-semibold text-[#ECECEC]">
                {section.label}:{" "}
              </span>
              {section.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ZodiacHoroscopeContent;
