import type { Metadata } from "next";
import {
  HoroscopeHero,
  ChooseYourZodiacSign,
  WhatYouWillFind,
  WhyFollowYourHoroscope,
  HoroscopeFaq,
} from "@/components/sections/horoscope";
import { CtaBanner, WhatsAppButton } from "@/components/shared";
import { horoscopeCtaBanner } from "@/data/horoscope";

export const metadata: Metadata = {
  title: "Horoscopes | Divine Infinity Numerology",
  description:
    "Daily guidance for every zodiac sign. Stay connected with daily, weekly, monthly, and yearly horoscope updates to understand the opportunities and challenges ahead.",
};

export default function HoroscopePage() {
  return (
    <main className="relative flex min-h-[calc(100vh+1px)] flex-col overflow-x-clip">
      {/* Hero Section: All position, size, scale, and shift controls in one place */}
      <HoroscopeHero
        className="relative z-0"

        // ==========================================
        // HOROSCOPE WHEEL CONTROLS (Desktop 1440px Master)
        // ==========================================
        wheelSizeDesktop={400}         // Diameter in px @1440px (Figma master: 427)
        wheelTopDesktop={117}          // Distance from top in px @1440px (Figma master: 117)
        wheelRightDesktop={60}         // Distance from right edge in px @1440px (default: 60)
        wheelShiftXDesktop={-160}      // Horizontal fine-tuning offset in px (+ moves right, - moves left)
        wheelShiftYDesktop={0}         // Vertical fine-tuning offset in px (+ moves down, - moves up)
        wheelScaleDesktop={1}          // Zoom/scale factor (1 = 100%)
        wheelRotationDesktop={0}       // Rotation angle in degrees
        wheelOpacityDesktop={1}        // Opacity (0 to 1)

        // ==========================================
        // HOROSCOPE WHEEL CONTROLS (Small Desktop 1024px)
        // Fluidly scales from 1024px to 1440px
        // ==========================================
        wheelSizeDesktop1024={290}     // Diameter in px @1024px (keeps image balanced & avoids crowding)
        wheelTopDesktop1024={174}      // Distance from top in px @1024px (vertically aligns wheel with left layout)
        wheelRightDesktop1024={30}     // Distance from right edge in px @1024px
        wheelShiftXDesktop1024={0}     // Horizontal fine-tuning offset in px @1024px
        wheelShiftYDesktop1024={0}     // Vertical fine-tuning offset in px @1024px

        // ==========================================
        // HOROSCOPE WHEEL CONTROLS (Tablet 768px - 1023px)
        // Fluid interpolation from 425px to 768px, stays 465x463 @768-1023px
        // ==========================================
        wheelSizeTablet={465}          // Diameter in px @768px (Figma: 465)
        wheelShiftXTablet={0}          // Horizontal fine-tuning offset in px
        wheelShiftYTablet={30}          // Vertical fine-tuning offset in px
        wheelScaleTablet={1}           // Scale factor
        wheelRotationTablet={0}        // Rotation in degrees

        // ==========================================
        // HOROSCOPE WHEEL CONTROLS (Mobile < 768px)
        // Fluid interpolation down to 317x322 @425px (stays 317x322 below 425px)
        // ==========================================
        wheelSizeMobile={317}          // Diameter in px @425px (Figma: 317)
        wheelShiftXMobile={0}          // Horizontal fine-tuning offset in px
        wheelShiftYMobile={0}          // Vertical fine-tuning offset in px
        wheelScaleMobile={1}           // Scale factor
        wheelRotationMobile={0}        // Rotation in degrees

        // ==========================================
        // CONTENT SHIFT CONTROLS (Heading, Paragraph, Buttons)
        // ==========================================
        contentShiftYMobile={0}        // Mobile content vertical shift (px)
        contentShiftYTablet={0}        // Tablet content vertical shift (px)
        contentShiftYDesktop={32}      // Desktop content vertical shift (px)
        buttonsShiftYDesktop={16}      // Buttons row vertical shift (px)

        // ==========================================
        // BACKGROUND IMAGE FOCAL POSITION & ZOOM
        // Fluid continuous interpolation between mobile, tablet, and desktop
        // ==========================================
        imagePositionXDesktop={50}     // 0 = left, 50 = center, 100 = right
        imagePositionYDesktop={50}     // 0 = top, 50 = center, 100 = bottom
        zoomDesktop={1}                // Zoom scale

        imagePositionXTablet={42}
        imagePositionYTablet={48}
        zoomTablet={1.4}

        imagePositionXMobile={68}      // Mobile background sits further left (62% shifts crop right)
        imagePositionYMobile={60}
        zoomMobile={1}
      />

      {/* Page Body Container: Master Background Gradient spans continuously down through CtaBanner */}
      <div
        style={{
          background:
            "linear-gradient(168.57deg, #090D22 31.77%, #2A1845 50.13%, #1A1440 65.43%, #0B1333 80.72%, #040817 92.96%)",
        }}
        className="relative z-10 w-full overflow-x-clip"
      >
        {/* Blurry rectangle transition spanning across Hero bg image and the page gradient */}
        <div
          aria-hidden="true"
          className="bg-page-gradient blur-hero-fade pointer-events-none absolute inset-x-0 -top-[38px] z-0 h-23.75 w-full select-none"
        />

        {/* Foreground Content Sections: z-10 ensures all text, cards, and buttons sit strictly above the blurry rectangle */}
        <div className="relative z-10 flex flex-col">
          {/* Choose Your Zodiac Sign Section (1440px desktop design) */}
          <ChooseYourZodiacSign />

          {/* What You Will Find Section (1440x835 desktop master) */}
          <WhatYouWillFind />

          {/* Why Follow Your Horoscope Section (1440x418 desktop master) */}
          <WhyFollowYourHoroscope
            // Adjust vertical position inside frame: 0 = top, 50 = center, 100 = bottom (lower moves up)
            imagePositionY={75}
            // Direct pixel offset fine-tuning (+ moves down, - moves up)
            imageShiftY={0}
          />

          {/* Frequently Asked Questions Section */}
          <HoroscopeFaq />

          {/* Pre-footer Call to Action Section (seamlessly concludes the gradient, blended with page) */}
          <CtaBanner data={horoscopeCtaBanner} />
        </div>
      </div>
      <WhatsAppButton />
    </main>
  );
}
