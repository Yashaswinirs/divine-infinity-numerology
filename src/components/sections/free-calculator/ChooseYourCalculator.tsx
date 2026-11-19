"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/layout";
import {
  chooseCalculatorData,
  type ChooseCalculatorData,
} from "@/data/free-calculator";
import { CalculatorDetailsModal } from "./CalculatorDetailsModal";
import { cn } from "@/lib";

export interface ChooseYourCalculatorProps
  extends React.HTMLAttributes<HTMLElement> {
  data?: Partial<ChooseCalculatorData>;
  showStars?: boolean;
  children?: React.ReactNode;
  className?: string;
}

/**
 * ChooseYourCalculator Section
 *
 * SPECIFICATIONS ACROSS VIEWPORTS:
 *
 * 0. STARS BACKGROUND (from blogs section: /images/blogs/blogs-stars.svg):
 *    - Desktop (>= 1024px): Stars come over this card (lg:z-20) with pointer-events-none,
 *      creating an ethereal celestial overlay across the card and space.
 *    - Mobile & Tablet (< 1024px): Stars stay in the background (z-0) behind the card,
 *      keeping the mobile/tablet card content clean and high-contrast.
 *
 * 1. SECTION ORNAMENT (Fluid Responsive):
 *    - Mobile (425px):  width: 261.967px, height: 24.91px, angle: 0deg, opacity: 1
 *    - Desktop (1440px): width: 361.999px, height: 34.422px, angle: 0deg, opacity: 1
 *    - Fluid Clamp: clamp(261.97px, calc(220.08px + 9.86vw), 362px)
 *
 * 2. MASTER SECTION:
 *    - Desktop (1440px): width: 1440px, min-h: 681.42px, pt: 60px, pb: 60px, px: 80px
 *    - Tablet (768px):   px: 60px, py: 48px
 *    - Mobile (385px):   px: 20px, py: 36px
 *
 * 3. CARD CONTAINER:
 *    - Mobile:  width: 385px,  min-h: 538px, gap: 34px, border-radius: 24px, padding: 20px
 *    - Tablet:  width: 648px,  min-h: 550px, gap: 34px, border-radius: 24px, padding: 20px
 *    - Desktop: width: 1240px, min-h: 408px, gap: 70px (fluid from 1024: 34px -> 70px), border-radius: 24px, padding: 15px 40px
 *    - Background: linear-gradient(142.94deg, #1D1B4D 0%, #512B58 120.7%)
 *
 * 4. CARD CONTENT ON MOBILE & TABLET:
 *    - Top Block (Image + Text): Mobile (345 x 414, gap 40px), Tablet (608 x 426, gap 40px)
 *    - Image: Mobile (345 x 230), Tablet (608 x 295), border-radius: 16px
 *    - Headings: LEFT-ALIGNED (never center-aligned), fluid typography
 *    - Paragraph: STRICT 18px across all viewports (Mobile, Tablet, Desktop)
 *    - Button: width: 179px, height: 50px, border-radius: 40px, padding: 10px, x-center aligned
 *
 * 5. CARD CONTENT ON DESKTOP (1024px to 1440px):
 *    - Smooth proportional image scaling: height remains strictly 295px, width scales from 420px at 1024px to 574px at 1440px
 *    - Text Block: left-aligned, width: 455px, height: 246px
 *    - Button: left-aligned (self-start)
 */
export function ChooseYourCalculator({
  data: propData,
  showStars = true,
  children,
  className,
  ...props
}: ChooseYourCalculatorProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const data: ChooseCalculatorData = {
    ...chooseCalculatorData,
    ...propData,
    featuredCard: {
      ...chooseCalculatorData.featuredCard,
      ...propData?.featuredCard,
      cta: {
        ...chooseCalculatorData.featuredCard.cta,
        ...propData?.featuredCard?.cta,
      },
    },
  };

  const card = data.featuredCard;

  return (
    <Section
      id="calculators"
      container={false}
      spacing="none"
      aria-label="Choose Your Calculator"
      className={cn(
        "relative w-full overflow-hidden bg-transparent text-white",
        "py-[clamp(36px,calc(20px+2.78vw),60px)] px-5 md:px-15 lg:px-20",
        "lg:min-h-[681.42px]",
        className
      )}
      {...props}
    >
      {/* Background Stars (from blogs section: /images/blogs/blogs-stars.svg) */}
      {showStars && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 select-none overflow-hidden",
            "z-0"
          )}
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

      {/* 1280px Inner Layout: max-w-[1280px], min-h-[561.42px], gap: 46px */}
      <Container
        padding="none"
        className="relative z-10 flex w-full max-w-[1280px] flex-col items-center gap-[clamp(28px,calc(16px+2.08vw),46px)] lg:min-h-[561.42px] justify-center mx-auto"
      >
        {/* Header Block: Section Ornament (Fluid: 261.97x24.91 mobile -> 362x34.42 desktop) + Heading */}
        <div className="relative z-20 flex flex-col items-center gap-[clamp(14px,calc(10px+0.625vw),19px)] text-center">
          <div className="mx-auto flex items-center justify-center">
            <Image
              src="/images/ornament.svg"
              alt=""
              width={362}
              height={34}
              aria-hidden="true"
              className={cn(
                "h-auto max-w-full text-accent",
                "w-[clamp(261.97px,calc(220.08px_+_9.86vw),362px)]"
              )}
            />
          </div>

          <h2 className="font-heading font-normal text-[#FFD8A2] tracking-normal text-balance text-[clamp(2rem,1.5rem_+_1.56vw,2.75rem)] leading-[1.2] lg:text-[44px]">
            {data.heading}
          </h2>
        </div>

        {/* Master Card:
            Mobile:  max-w 385px, min-h 538px, gap 34px, p 20px, rounded 24px
            Tablet:  max-w 648px, min-h 550px, gap 34px, p 20px, rounded 24px
            Desktop: max-w 1240px, min-h 408px, gap 70px (fluid from 1024: 34px -> 70px), py 15px px 40px, rounded 24px
        */}
        <div
          style={{
            background:
              "linear-gradient(142.94deg, #1D1B4D 0%, #512B58 120.7%)",
          }}
          className={cn(
            "relative z-20 flex w-full flex-col lg:flex-row items-center justify-between",
            "max-w-[clamp(345px,calc(120.6px_+_68.67vw),648px)] lg:max-w-[clamp(920px,calc(133.8px_+_76.83vw),1240px)]",
            "min-h-[clamp(538px,calc(526px_+_3.13vw),550px)] lg:min-h-[408px]",
            "gap-[34px] lg:gap-[clamp(34px,calc(-54.6px_+_8.65vw),70px)]",
            "p-[20px] lg:py-[15px] lg:px-[40px]",
            "rounded-[24px] border border-[#FFD8A2]/10",
            "shadow-[0_8px_32px_rgba(0,0,0,0.37)] transition-all duration-300"
          )}
        >
          {children ? (
            children
          ) : (
            <>
              {/* ============================================================== */}
              {/* MOBILE & TABLET LAYOUT (< 1024px)                                */}
              {/* Top Block (Image + Left-Aligned Text, gap 40px) + Centered Button */}
              {/* ============================================================== */}
              <div className="flex w-full flex-col items-center justify-between gap-[34px] lg:hidden">
                {/* Top Block: Mobile (345 x 414, gap 40px), Tablet (608 x 426, gap 40px) */}
                <div className="flex w-full flex-col items-start gap-[40px]">
                  {/* Image: Mobile (345 x 230), Tablet (608 x 295), rounded 16px */}
                  <div
                    className={cn(
                      "relative flex w-full shrink-0 items-center justify-center overflow-hidden rounded-[16px]",
                      "h-[clamp(230px,calc(164.67px_+_16.97vw),295px)]",
                      "opacity-100 rotate-0"
                    )}
                  >
                    <Image
                      src={card.image}
                      alt={card.imageAlt}
                      fill
                      priority
                      sizes="(max-width: 768px) 345px, 608px"
                      className="object-cover object-center rounded-[16px]"
                    />
                  </div>

                  {/* Text Group: strictly LEFT ALIGNED (never centered) */}
                  <div className="flex w-full flex-col items-start gap-[16px] text-left">
                    {/* Heading: Life Path Number Calculator */}
                    <h3 className="font-heading font-normal text-[#FFD8A2] tracking-normal text-left text-[clamp(1.5rem,calc(1.2rem+1.05vw),2.125rem)] leading-[1.2]">
                      {card.title}
                    </h3>

                    {/* Paragraph: STRICT 18px across all viewports */}
                    <p className="font-lato font-medium text-[18px] leading-[26px] text-[#ECECEC] text-left tracking-[0.01em]">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Button: X-CENTER ALIGNED on mobile & tablet */}
                <div className="flex w-full items-center justify-center pt-1">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className={cn(
                      "inline-flex h-[50px] w-[179px] items-center justify-center rounded-[40px] bg-[#FFD8A2] px-[10px] gap-[10px]",
                      "font-lato font-bold text-[16px] leading-none tracking-normal text-[#655373]",
                      "hover:brightness-105 active:scale-[0.98]",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD8A2]",
                      "transition-all duration-150 cursor-pointer text-center whitespace-nowrap"
                    )}
                  >
                    <span>{card.cta.label}</span>
                    <span
                      aria-hidden="true"
                      className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[#655373] text-[#FFD8A2]"
                    >
                      <svg
                        className="h-3 w-3"
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
                  </button>
                </div>
              </div>

              {/* ============================================================== */}
              {/* DESKTOP LAYOUT (>= 1024px)                                      */}
              {/* Proportional image scaling (height 295px, width 420px -> 574px) */}
              {/* Left-aligned text & button block with balanced space            */}
              {/* ============================================================== */}
              <div className="hidden lg:flex w-full items-center justify-between gap-[clamp(34px,calc(-54.6px_+_8.65vw),70px)]">
                {/* Desktop Image: Height strictly 295px, width fluidly scales 420px (at 1024) -> 574px (at 1440) */}
                <div
                  className={cn(
                    "relative flex shrink-0 items-center justify-center overflow-hidden rounded-[16px]",
                    "w-[clamp(420px,calc(40.92px_+_37.02vw),574px)] h-[295px]",
                    "opacity-100 rotate-0"
                  )}
                >
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1440px) 574px, 574px"
                    className="object-cover object-center rounded-[16px]"
                  />
                </div>

                {/* Desktop Right Block: width 455px, height 246px, gap 34px, left-aligned */}
                <div className="flex flex-1 min-w-[340px] max-w-[455px] h-[246px] flex-col items-start justify-between gap-[34px] text-left">
                  {/* Text Block: width 455px, height 162px, gap 20px */}
                  <div className="flex w-full flex-col items-start gap-[20px] text-left">
                    <h3 className="font-heading font-normal text-[#FFD8A2] tracking-normal text-[34px] leading-[1.2] text-left">
                      {card.title}
                    </h3>

                    {/* Paragraph: STRICT 18px */}
                    <p className="font-lato font-medium text-[18px] leading-[26px] text-[#ECECEC] text-left tracking-[0.01em]">
                      {card.description}
                    </p>
                  </div>

                  {/* Button: width 179px, height 50px, border-radius 40px, padding 10px */}
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className={cn(
                      "inline-flex h-[50px] w-[179px] items-center justify-center rounded-[40px] bg-[#FFD8A2] px-[10px] gap-[10px]",
                      "font-lato font-bold text-[16px] leading-none tracking-normal text-[#655373]",
                      "hover:brightness-105 active:scale-[0.98]",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD8A2]",
                      "transition-all duration-150 cursor-pointer text-center whitespace-nowrap self-start"
                    )}
                  >
                    <span>{card.cta.label}</span>
                    <span
                      aria-hidden="true"
                      className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[#655373] text-[#FFD8A2]"
                    >
                      <svg
                        className="h-3 w-3"
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
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </Container>

      {/* Interactive Popup Modal for Life Path Number Details */}
      <CalculatorDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Section>
  );
}

export default ChooseYourCalculator;
