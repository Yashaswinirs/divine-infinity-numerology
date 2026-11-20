import * as React from "react";
import Image from "next/image";
import { Section } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import {
  chooseYourZodiacSignData,
  type ChooseYourZodiacSignData,
} from "@/data/horoscope";
import { ZodiacDetailPanel } from "./ZodiacDetailPanel";
import { cn } from "@/lib";

export interface ChooseYourZodiacSignProps
  extends React.HTMLAttributes<HTMLElement> {
  data?: Partial<ChooseYourZodiacSignData>;
  showStars?: boolean;
  /** Optional custom content to render inside the outlined section (Frame 264) */
  children?: React.ReactNode;
  frameClassName?: string;
  className?: string;
}

/**
 * ChooseYourZodiacSign Section
 *
 * FLUID RESPONSIVE SPECIFICATION (FLUID_RESPONSIVE_README.md compliant):
 *
 * FIGMA ANCHORS:
 * - Mobile (425px):
 *   - Grid: 2 columns x 6 rows (2 cards per row)
 *   - Card: 186.5px width, 174px min-height, padding 10px 8px 10px 8px, gap 10px, radius 16px, border 0.5px solid #806398
 *   - Icon: 88px x 88px
 *   - Heading (Sign Name): Lovelace Text 400, 17.33px, line-height 25px, text-align center, color #FFF0DB
 *   - Button: 169.5px width (~100% inner content), 32px height, padding 10px, radius 10px, Lato 700, 16px, line-height 100%
 * - Tablet (768px):
 *   - Grid: 4 columns x 3 rows (4 cards per row)
 *   - Card: 153px width, 181px min-height, padding 10px 8px 10px 8px, gap 10px, radius 16px, border 0.5px solid #806398
 *   - Icon: 88px x 88px
 *   - Heading (Sign Name): Lovelace Text 400, 19.08px, line-height 23.3px, text-align center, color #FFF0DB
 *   - Button: 136px width (~100% inner content), 38px height, padding 10px, radius 10px, Lato 700, 16px, line-height 100%
 * - Desktop Master (1440px):
 *   - Grid: 6 columns x 2 rows (6 cards per row)
 *   - Card: 200px width, 220px min-height, padding 21px 14px 21px 14px, gap 14px, radius 16px, border 0.5px solid #806398
 *   - Icon: 88px x 88px
 *   - Heading (Sign Name): Lovelace Text 400, 22.5px, line-height 30.7px, text-align center, color #FFF0DB
 *   - Button: 172px width (100% inner content), 38px height, padding 10px, radius 10px, Lato 700, 16px, line-height 100%
 *
 * FLUID FORMULAS (Zero layout jumps, continuous rem + vw clamping):
 * 1. Card Width (186.5 -> 153 -> 200px, V shape):
 *    w-full max-w-[clamp(9.5625rem,max(14.251rem_-_9.767vw,6.205rem_+_6.994vw),12.5rem)]
 * 2. Card Height (174 -> 181 -> 220px, slow -> fast growth):
 *    min-h-[clamp(10.875rem,max(10.333rem_+_2.041vw,8.527rem_+_5.804vw),13.75rem)]
 * 3. Card Padding Y (10 -> 10 -> 21px, flat then ramp):
 *    py-[clamp(0.625rem,-0.161rem_+_1.637vw,1.3125rem)]
 * 4. Card Padding X (8 -> 8 -> 14px, flat then ramp):
 *    px-[clamp(0.5rem,0.071rem_+_0.893vw,0.875rem)]
 * 5. Sign Name Font Size (17.33 -> 19.08 -> 22.5px, single straight line):
 *    text-[clamp(1.083rem,0.948rem_+_0.509vw,1.406rem)]
 * 6. Sign Name Line Height (25 -> 23.3 -> 30.7px, V shape):
 *    leading-[clamp(1.456rem,max(1.694rem_-_0.496vw,0.928rem_+_1.101vw),1.919rem)]
 * 7. Button Height (32 -> 38 -> 38px, ramp then flat):
 *    h-[clamp(2rem,1.535rem_+_1.749vw,2.375rem)]
 * 8. Grid Gap X (12 -> 16 -> 16px, ramp then flat):
 *    gap-x-[clamp(0.75rem,0.44rem_+_1.166vw,1rem)]
 * 9. Grid Gap Y (16 -> 18.7 -> 24px, single straight line):
 *    gap-y-[clamp(1rem,0.791rem_+_0.788vw,1.5rem)]
 * 10. Section Padding X (16 -> 37.6 -> 80px, single straight line):
 *    px-[clamp(1rem,-0.675rem_+_6.305vw,5rem)]
 * 11. Section Padding Y (40 -> 46.8 -> 60px, single straight line):
 *    py-[clamp(2.5rem,1.977rem_+_1.97vw,3.75rem)]
 * 12. Button Typography & Spacing (single-line guarantee across all viewports):
 *    whitespace-nowrap, text-[clamp(0.875rem,0.824rem_+_0.197vw,1rem)], px-[clamp(0.25rem,0.019rem_+_0.48vw,0.625rem)]
 * 13. Section Main Heading Typography (30.43px / 35px @425 to 44px / 52.8px @1440, single straight line):
 *    text-[clamp(1.902rem,1.547rem_+_1.337vw,2.75rem)] leading-[clamp(2.1875rem,1.722rem_+_1.754vw,3.3rem)]
 * 12. Button Typography & Spacing (single-line guarantee across all viewports):
 *    whitespace-nowrap, text-[clamp(0.875rem,0.824rem_+_0.197vw,1rem)], px-[clamp(0.25rem,0.019rem_+_0.48vw,0.625rem)]
 * 13. Section Main Heading Typography (30.43px / 35px @425 to 44px / 52.8px @1440, single straight line):
 *    text-[clamp(1.902rem,1.547rem_+_1.337vw,2.75rem)] leading-[clamp(2.1875rem,1.722rem_+_1.754vw,3.3rem)]
 */
export function ChooseYourZodiacSign({
  data: propData,
  showStars = true,
  children,
  frameClassName,
  className,
  ...props
}: ChooseYourZodiacSignProps) {
  const data: ChooseYourZodiacSignData = {
    ...chooseYourZodiacSignData,
    ...propData,
    cards: propData?.cards ?? chooseYourZodiacSignData.cards,
  };

  return (
    <Section
      id="zodiac-signs"
      as="section"
      container={false}
      spacing="none"
      aria-labelledby="choose-zodiac-heading"
      className={cn(
        // SECTION WRAPPER: Fluid padding and width across viewports
        "relative w-full max-w-[1440px] mx-auto min-h-0 xl:min-h-[1504px]",
        "py-[clamp(2.5rem,1.977rem_+_1.97vw,3.75rem)] px-[clamp(1rem,-0.675rem_+_6.305vw,5rem)]",
        "flex flex-col items-center gap-[10px]",
        "opacity-100 rotate-0 text-white overflow-visible select-none",
        className
      )}
      {...props}
    >
      {/* Background Stars (consistent with Free Calculator and Horoscope sections) */}
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
            className="object-cover object-top"
          />
        </div>
      )}

      {/* INNER CONTENT WRAPPER: Fluid gap between Child 1 and Child 2 */}
      <div className="relative z-10 flex w-full max-w-[1280px] flex-col items-center gap-[clamp(3rem,1.273rem_+_6.503vw,7.125rem)] min-h-0 xl:min-h-[1384px] opacity-100 rotate-0">
        {/* CHILD 1: "Choose your zodiac sign" Content Stack */}
        <div className="relative flex w-full max-w-[1280px] flex-col items-center gap-[clamp(1.5rem,0.924rem_+_2.168vw,2.875rem)] min-h-0 xl:min-h-[661px]">
          {/* HEADER BLOCK: Ornament + Heading + Paragraph */}
          <header className="flex w-full max-w-[816px] min-h-0 flex-col items-center justify-center gap-[clamp(0.625rem,0.472rem_+_0.576vw,0.9375rem)] text-center">
            {/* Ornament */}
            <div className="mx-auto flex items-center justify-center">
              <Image
                src="/images/ornament.svg"
                alt=""
                width={362}
                height={34}
                aria-hidden="true"
                className="h-auto w-[clamp(16.25rem,13.57rem_+_10.05vw,22.625rem)] max-w-full text-accent"
              />
            </div>

            {/* Heading: Lovelace Text 400, #FFD8A2, text-center, fluid 30.43px / 35px @425 to 44px / 52.8px @1440 */}
            <h2
              id="choose-zodiac-heading"
              className="font-heading font-normal text-[#FFD8A2] tracking-normal text-center text-balance text-[clamp(1.902rem,1.547rem_+_1.337vw,2.75rem)] leading-[clamp(2.1875rem,1.722rem_+_1.754vw,3.3rem)] px-4 md:px-0"
            >
              {data.heading}
            </h2>

            {/* Paragraph */}
            <p className="font-lato font-medium text-[#ECECEC] tracking-normal text-[clamp(1rem,0.948rem_+_0.197vw,1.125rem)] leading-[1.4] max-w-[816px]">
              {data.paragraph}
            </p>
          </header>

          {/* ZODIAC GRID: 2 cols mobile, 4 cols tablet, 6 cols desktop; fluid gaps */}
          <ul
            aria-label="Zodiac signs list"
            className="grid w-full max-w-[1280px] grid-cols-2 md:grid-cols-4 xl:grid-cols-6 justify-center gap-x-[clamp(0.75rem,0.44rem_+_1.166vw,1rem)] gap-y-[clamp(1rem,0.791rem_+_0.788vw,1.5rem)] p-0 m-0 list-none"
          >
            {data.cards.map((card) => (
              <li
                key={card.id}
                className="w-full flex justify-center list-none shrink-0"
              >
                {/* CARD: Fluid width, height, padding, and smooth hover transition */}
                <article
                  style={{
                    background:
                      "linear-gradient(142.94deg, #1D1B4D 0%, #512B58 120.7%)",
                  }}
                  className={cn(
                    "flex w-full max-w-[clamp(9.5625rem,max(14.251rem_-_9.767vw,6.205rem_+_6.994vw),12.5rem)]",
                    "min-h-[clamp(10.875rem,max(10.333rem_+_2.041vw,8.527rem_+_5.804vw),13.75rem)] flex-col items-center justify-between",
                    "rounded-[16px] border-[0.5px] border-[#806398]",
                    "py-[clamp(0.625rem,-0.161rem_+_1.637vw,1.3125rem)] px-[clamp(0.5rem,0.071rem_+_0.893vw,0.875rem)]",
                    "transition-[border-color,box-shadow] duration-200 hover:border-[#FFD8A2]/50 hover:shadow-[0_8px_24px_rgba(42,24,69,0.5)]"
                  )}
                >
                  {/* Inner layout */}
                  <div className="flex w-full h-full flex-col items-center justify-between gap-[clamp(0.5rem,0.339rem_+_0.595vw,0.875rem)]">
                    {/* Top group: Icon + Sign name */}
                    <div className="flex w-full flex-col items-center justify-center gap-[clamp(0.25rem,0.133rem_+_0.44vw,0.4375rem)]">
                      {/* Zodiac SVG Icon (88 x 88 across all viewports) */}
                      <div className="flex w-[88px] h-[88px] items-center justify-center shrink-0">
                        <Image
                          src={`/images/horoscope/zodiac-sign-icons/${card.slug}.svg`}
                          alt=""
                          width={88}
                          height={88}
                          unoptimized
                          className="w-[88px] h-[88px] object-contain select-none pointer-events-none"
                        />
                      </div>

                      {/* Sign name: Lovelace Text 400, fluid text size and line height */}
                      <h3 className="w-full flex items-center justify-center font-heading font-normal text-center text-[#FFF0DB] tracking-normal text-[clamp(1.083rem,0.948rem_+_0.509vw,1.406rem)] leading-[clamp(1.456rem,max(1.694rem_-_0.496vw,0.928rem_+_1.101vw),1.919rem)]">
                        {card.name}
                      </h3>
                    </div>

                    {/* Button: fluid height, width, padding, and single-line text */}
                    <Button
                      variant="zodiac"
                      size="zodiac"
                      href={`/horoscope/${card.slug}`}
                      aria-label={`View ${card.name} horoscope`}
                      className="w-full max-w-[172px] h-[clamp(2rem,1.535rem_+_1.749vw,2.375rem)] rounded-[10px] px-[clamp(0.25rem,0.019rem_+_0.48vw,0.625rem)] text-[clamp(0.875rem,0.824rem_+_0.197vw,1rem)] font-bold leading-none whitespace-nowrap cursor-pointer"
                    >
                      View Horoscope
                    </Button>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>

        {/* CHILD 2: THE OUTLINED SECTION / ZODIAC DETAIL PANEL (Property 1="Frame 264") */}
        <ZodiacDetailPanel className={frameClassName}>
          {children}
        </ZodiacDetailPanel>
      </div>
    </Section>
  );
}

export default ChooseYourZodiacSign;
