import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/layout";
import {
  freeCalculatorDeeperMeaningData,
  type FreeCalculatorDeeperMeaningData,
} from "@/data/free-calculator";
import { cn } from "@/lib";

export interface FreeCalculatorDeeperMeaningProps
  extends React.HTMLAttributes<HTMLElement> {
  data?: Partial<FreeCalculatorDeeperMeaningData>;
  buttonVariant?: "filled" | "outline";
  showStars?: boolean;
  className?: string;
}

/**
 * FreeCalculatorDeeperMeaning Section
 *
 * SPECIFICATIONS ACROSS VIEWPORTS:
 *
 * 1. SECTION CONTAINER:
 *    - Full width, design size 1440x470.
 *    - Padding: px-[clamp(20px,5.56vw,80px)] py-[clamp(40px,4.17vw,60px)].
 *    - Min height: lg:min-h-[470px] with content vertically centered, no fixed height.
 *    - Background: #090d22.
 *
 * 2. INNER WRAPPER & GRID:
 *    - Max width: 1280px, centered.
 *    - Single CSS Grid:
 *      - Below lg: grid-cols-1
 *      - At lg: lg:grid-cols-[minmax(0,503fr)_minmax(0,645fr)] with lg:gap-x-[clamp(40px,9.24vw,133px)]
 *
 * 3. DOM ORDER & DUAL-VIEWPORT PLACEMENT (No DOM duplication):
 *    - (1) Heading Block (Jewel + h2): lg:col-start-1 lg:row-start-1, mb-[clamp(20px,3.5vw,32px)] lg:mb-[25px]
 *    - (2) Image: lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:self-center, mb-[clamp(20px,3.1vw,24px)] lg:mb-0
 *    - (3) Paragraph: lg:col-start-1 lg:row-start-2, mb-8 lg:mb-0
 *    - (4) Button: lg:col-start-1 lg:row-start-3, lg:mt-[48px]
 *
 * 4. TYPOGRAPHY & ELEMENTS:
 *    - Jewel: w-[clamp(240px,25.14vw,362px)] h-auto max-w-full
 *    - Heading: Lovelace Text 400, #FFD8A2, text-[clamp(1.75rem,calc(1.485rem+1.127vw),2.5rem)] leading-[1.2]
 *    - Paragraph: Lato 500, #ECECEC, text-[clamp(0.9375rem,calc(0.871rem+0.282vw),1.125rem)] leading-[1.256]
 *    - Image: aspect-[645/298], rounded-[12px], border border-[#FFD8A2] (1px solid rgba(255,216,162,1)), object-cover
 *    - Button: 48px tall, rounded-[50px], px-[10px] pl-[16px] pr-[10px], gap 10px, 28px circular badge with chevron
 */
export function FreeCalculatorDeeperMeaning({
  data: propData,
  buttonVariant = "filled",
  showStars = true,
  className,
  ...props
}: FreeCalculatorDeeperMeaningProps) {
  const data: FreeCalculatorDeeperMeaningData = {
    ...freeCalculatorDeeperMeaningData,
    ...propData,
    button: {
      ...freeCalculatorDeeperMeaningData.button,
      ...propData?.button,
    },
    image: {
      ...freeCalculatorDeeperMeaningData.image,
      ...propData?.image,
    },
  };

  return (
    <Section
      id="deeper-meaning"
      container={false}
      spacing="none"
      aria-labelledby="deeper-meaning-heading"
      className={cn(
        "relative w-full overflow-hidden bg-transparent text-white",
        "px-[clamp(20px,5.56vw,80px)] py-[clamp(40px,4.17vw,60px)]",
        "flex items-center justify-center lg:min-h-[470px]",
        className
      )}
      {...props}
    >
      {/* Background Stars (from blogs section: /images/blogs/blogs-stars.svg) */}
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

      <Container
        padding="none"
        className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col justify-center"
      >
        <div className="grid w-full grid-cols-1 lg:grid-cols-[minmax(0,503fr)_minmax(0,645fr)] lg:gap-x-[clamp(40px,9.24vw,133px)] lg:items-start">
          {/* ============================================================== */}
          {/* 1. HEADING BLOCK (Jewel + h2)                                   */}
          {/* Mobile: Order 1, mb-[clamp(20px,3.5vw,32px)]                   */}
          {/* Desktop: Col 1, Row 1, mb-[25px]                                */}
          {/* ============================================================== */}
          <div className="flex flex-col items-start gap-[clamp(16px,2.5vw,25px)] lg:gap-[25px] max-w-[648px] lg:max-w-[503px] mb-[clamp(20px,3.5vw,32px)] lg:mb-[25px] lg:col-start-1 lg:row-start-1">
            {/* Jewel Ornament */}
            <div className="flex items-center">
              <Image
                src={data.jewelSrc}
                alt=""
                width={362}
                height={34}
                aria-hidden="true"
                className="w-[clamp(240px,25.14vw,362px)] h-auto max-w-full text-accent"
              />
            </div>

            {/* Heading (h2) */}
            <h2
              id="deeper-meaning-heading"
              className="font-heading font-normal text-[#FFD8A2] tracking-normal text-left text-[clamp(1.75rem,calc(1.485rem+1.127vw),2.5rem)] leading-[1.2]"
            >
              {data.heading}
            </h2>
          </div>

          {/* ============================================================== */}
          {/* 2. SECTION IMAGE                                               */}
          {/* Mobile: Order 2 (between Heading and Paragraph)                 */}
          {/* Desktop: Col 2, Row 1-3, vertically centered (lg:self-center)   */}
          {/* ============================================================== */}
          <div className="relative w-full max-w-[648px] lg:max-w-none aspect-[645/298] overflow-hidden rounded-[12px] border border-[#FFD8A2] mb-[clamp(20px,3.1vw,24px)] lg:mb-0 lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:self-center">
            <Image
              src={data.image.src}
              alt={data.image.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-center"
            />
          </div>

          {/* ============================================================== */}
          {/* 3. PARAGRAPH                                                   */}
          {/* Mobile: Order 3, mb-8                                          */}
          {/* Desktop: Col 1, Row 2, mb-0                                     */}
          {/* ============================================================== */}
          <p className="font-lato font-medium text-[#ECECEC] tracking-[0%] text-left max-w-[648px] lg:max-w-[503px] text-[clamp(0.9375rem,calc(0.871rem+0.282vw),1.125rem)] leading-[1.256] mb-8 lg:mb-0 lg:col-start-1 lg:row-start-2">
            {data.paragraph}
          </p>

          {/* ============================================================== */}
          {/* 4. BUTTON                                                      */}
          {/* Mobile & Tablet (< 1024px): Center-aligned                     */}
          {/* Desktop (>= 1024px): Left-aligned, Col 1, Row 3, mt-[48px]      */}
          {/* ============================================================== */}
          <div className="flex w-full items-center justify-center lg:w-auto lg:items-start lg:justify-start lg:col-start-1 lg:row-start-3 lg:mt-[48px]">
            <Link
              href={data.button.href}
              className={cn(
                "inline-flex h-[48px] w-auto max-w-fit items-center justify-center rounded-[50px] pl-[16px] pr-[10px] gap-[10px]",
                "font-lato font-bold text-[16px] leading-none whitespace-nowrap self-center lg:self-start",
                "active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD8A2]",
                "transition-all duration-150 cursor-pointer",
                buttonVariant === "filled"
                  ? "bg-[#FFD8A2] text-[#655373] hover:brightness-105"
                  : "bg-transparent text-[#FFD8A2] border border-[#FFD8A2] hover:bg-[#FFD8A2]/10"
              )}
            >
              <span>{data.button.label}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full transition-colors",
                  buttonVariant === "filled"
                    ? "bg-[#655373] text-[#FFD8A2]"
                    : "bg-[#FFD8A2] text-[#655373]"
                )}
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
        </div>
      </Container>
    </Section>
  );
}

export default FreeCalculatorDeeperMeaning;

