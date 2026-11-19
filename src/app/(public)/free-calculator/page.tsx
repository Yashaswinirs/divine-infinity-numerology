import type { Metadata } from "next";
import Image from "next/image";
import {
  FreeCalculatorHero,
  ChooseYourCalculator,
  FreeCalculatorDeeperMeaning,
} from "@/components/sections/free-calculator";
import { CtaBanner } from "@/components/shared";
import { freeCalculatorCtaBanner } from "@/data/free-calculator";

export const metadata: Metadata = {
  title: "Free Calculator | Divine Infinity Numerology",
  description:
    "Explore our free numerology and astrology calculators for insights into your life path, destiny, and cosmic alignments.",
};

export default function FreeCalculatorPage() {
  return (
    <main className="relative flex min-h-[calc(100vh+1px)] flex-col overflow-x-clip">
      {/* Hero Section: All position (X & Y as numbers 0-100) and scale controls in one place */}
      <FreeCalculatorHero
        className="relative z-0"
        // Horizontal focal position (0 = left, 50 = center, 70 = woman/wheel, 100 = right)
        imagePositionXMobile={10}
        imagePositionXTablet={10}
        imagePositionXDesktop={50}

        // Vertical focal position (0 = top, 50 = center, 100 = bottom)
        imagePositionYMobile={50}      // Now actively shifted down into view!
        imagePositionYTablet={65}
        imagePositionYDesktop={50}

        // Zoom controls
        zoomMobile={1.4}
        zoomTablet={1.4}
        zoomDesktop={1}

        // Vertical shift controls to bring down the whole section (heading, paragraph, buttons)
        contentShiftYMobile={70}       // Control to bring down whole section for Mobile (increase to bring down)
        contentShiftYTablet={220}       // Control to bring down whole section for Tablet (increase to bring down)
        contentShiftYDesktop={32}     // Desktop content vertical shift (Figma aligned)

        // Buttons row vertical shift (fine-tuning buttons alone)
        buttonsShiftY={16}

        // Cropped Person (wheel-tight.webp) centered controls for Mobile & Tablet
        personImage="/images/calculator/wheel-tight.webp"
        personShiftYMobile={0}        // Vertical offset (px) for cropped person on mobile
        personShiftYTablet={0}        // Vertical offset (px) for cropped person on tablet
        personShiftXMobile={0}        // Horizontal offset (px) for cropped person on mobile
        personShiftXTablet={0}        // Horizontal offset (px) for cropped person on tablet
      />

      {/* Page Body Container: Master Background Gradient spans continuously from ChooseYourCalculator down through CtaBanner */}
      <div
        style={{
          background:
            "linear-gradient(168.57deg, #090D22 31.77%, #2A1845 50.13%, #1A1440 65.43%, #0B1333 80.72%, #040817 92.96%)",
        }}
        className="relative z-10 w-full overflow-x-clip"
      >
        {/* Blurry rectangle transition spanning across both sections:
            - Height: 95px (h-23.75).
            - Position: -top-[38px] so 40% (38px) sits over the Hero bg image, and 60% (57px) sits over the page gradient.
            - Layering: z-0 places it directly over the bg image and gradient, but behind all text and cards (z-10).
        */}
        <div
          aria-hidden="true"
          className="bg-page-gradient blur-hero-fade pointer-events-none absolute inset-x-0 -top-[38px] z-0 h-23.75 w-full select-none"
        />

        {/* Foreground Content Sections: z-10 ensures all text, cards, and buttons sit strictly above the blurry rectangle */}
        <div className="relative z-10 flex flex-col">
          {/* Continuous Starry Sky wrapper: ONLY covers ChooseYourCalculator and FreeCalculatorDeeperMeaning */}
          <div className="relative w-full">
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

            <div className="relative z-10 flex flex-col">
              {/* Choose Your Calculator Section */}
              <ChooseYourCalculator showStars={false} />

              {/* Every Number Has a Deeper Meaning Section */}
              <FreeCalculatorDeeperMeaning showStars={false} />
            </div>
          </div>

          {/* Pre-footer Call to Action Section (seamlessly concludes the gradient, no stars, with native CTA bg image) */}
          <CtaBanner data={freeCalculatorCtaBanner} />
        </div>
      </div>
    </main>
  );
}

