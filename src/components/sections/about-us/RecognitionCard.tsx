import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib";
import {
  defaultRecognition,
  type RecognitionCardData,
} from "@/data/recognition";

export interface RecognitionCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  card?: RecognitionCardData;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Helper to render card description with bold target text (e.g. "Arviend Sud")
 */
function renderDescriptionWithBold(text: string, boldHighlight?: string) {
  const target = boldHighlight ?? "Arviend Sud";
  if (!target || !text.includes(target)) {
    return text;
  }
  const parts = text.split(target);
  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && (
            <strong className="font-bold">{target}</strong>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

/**
 * RecognitionCard Component
 *
 * FIGMA SPECS (angle 0deg, opacity 1, radius 24px at all sizes):
 * - Mobile  (425px):  Card 385x232 | Title 20.91px/29.1px (box 244x73) | Desc 17.33px/19.2px (box 244x96) | Leaves 45.98x106.05
 * - Tablet  (768px):  Card 648x238 | Title 23.35px/33.6px (box 462x50) | Desc 19.08px/22.8px (box 450x69) | Leaves 72x166
 * - Desktop (1440px): Card 939x360 | Title 28.13px/42.4px (box 462x85) | Desc 22.50px/30.7px (box 566x93) | Leaves 72x166
 *
 * FLUID CLAMP() EXPLANATIONS (Zero breakpoint jumps, seamlessly scales 320px -> 1920px):
 * - Card width:  clamp(24.0625rem, min(3.69rem + 76.68vw, 19.714rem + 43.3vw), 58.6875rem)
 *   Scales 385px (425px) -> 648px (768px) -> 939px (1440px) via piecewise linear interpolation.
 * - Card height: clamp(14.5rem, max(14.04rem + 1.75vw, 6.161rem + 18.15vw), 22.5rem)
 *   Scales 232px (425px) -> 238px (768px) -> 360px (1440px) matching Figma frame heights.
 * - Content gap: clamp(0.5rem, 0.148rem + 2.27vw, 2.1875rem)
 *   Scales horizontal spacing between leaves and center content from 8px to 35px.
 * - Title width: clamp(15.25rem, 63.56vw - 1.631rem, 28.875rem)
 *   Expands title container from 244px on mobile to 462px on tablet and desktop.
 * - Title size:  clamp(1.307rem, 1.118rem + 0.711vw, 1.758rem)
 *   Interpolates Lovelace font size from 20.91px (mobile) to 23.35px (tablet) to 28.13px (desktop).
 * - Title line:  clamp(1.819rem, 1.471rem + 1.31vw, 2.65rem)
 *   Interpolates Lovelace line height from 29.1px (mobile) to 33.6px (tablet) to 42.4px (desktop).
 * - Desc width:  clamp(15.25rem, min(60.06vw - 0.706rem, 17.26vw + 19.84rem), 35.375rem)
 *   Expands description box from 244px (mobile) to 450px (tablet) to 566px (desktop).
 * - Desc size:   clamp(1.083rem, 0.9475rem + 0.51vw, 1.406rem)
 *   Interpolates Lato font size from 17.33px (mobile) to 19.08px (tablet) to 22.5px (desktop).
 * - Desc line:   clamp(1.2rem, 0.899rem + 1.133vw, 1.919rem)
 *   Interpolates Lato line height from 19.2px (mobile) to 22.8px (tablet) to 30.7px (desktop).
 * - Leaf width:  clamp(2.874rem, 0.859rem + 7.586vw, 4.5rem)
 *   Scales golden laurel leaf width from 46px (mobile) to 72px (tablet and desktop).
 * - Leaf height: clamp(6.628rem, 1.98rem + 17.49vw, 10.378rem)
 *   Scales golden laurel leaf height from 106px (mobile) to 166px (tablet and desktop).
 */
export function RecognitionCard({
  card = defaultRecognition.card,
  className,
  children,
  ...props
}: RecognitionCardProps) {
  const leftLeafSrc =
    card?.leftLeafIcon ??
    defaultRecognition.card.leftLeafIcon ??
    "/images/recognition/gold-leaves-left.svg";
  const rightLeafSrc =
    card?.rightLeafIcon ??
    defaultRecognition.card.rightLeafIcon ??
    "/images/recognition/gold-leaves-right.svg";

  return (
    <article
      className={cn(
        "relative mx-auto flex flex-col items-center justify-center overflow-hidden rounded-[24px] p-0",
        // Fluid width: 385px (mobile) -> 648px (tablet) -> 939px (desktop)
        "w-full max-w-full",
        "w-[clamp(24.0625rem,min(3.69rem_+_76.68vw,19.714rem_+_43.3vw),58.6875rem)]",
        // Fluid height: 232px (mobile) -> 238px (tablet) -> 360px (desktop)
        "h-[clamp(14.5rem,max(14.04rem_+_1.75vw,6.161rem_+_18.15vw),22.5rem)]",
        "bg-[linear-gradient(142.94deg,#1D1B4D_0%,#512B58_120.7%)]",
        "border-[0.5px] border-[#5F1BB7]",
        "shadow-[0px_4px_24px_0px_rgba(85,81,255,0.25)]",
        "transition-all duration-300",
        className
      )}
      {...props}
    >
      {/* Inner Content Wrapper: centers content seamlessly with fluid gap */}
      <div className="flex h-full w-full items-center justify-center gap-[clamp(0.5rem,0.148rem_+_2.27vw,2.1875rem)]">
        {/* Left Leaf Icon: 46x106 at 425px -> 72x166 from 768px up, angle 4.39 deg */}
        <div
          aria-hidden="true"
          className={cn(
            "relative shrink-0 select-none",
            "w-[clamp(2.874rem,0.859rem_+_7.586vw,4.5rem)]",
            "h-[clamp(6.628rem,1.98rem_+_17.49vw,10.378rem)]",
            "rotate-[4.39deg]"
          )}
        >
          <Image
            src={leftLeafSrc}
            alt=""
            fill
            sizes="(max-width: 768px) 46px, 72px"
            className="object-contain"
          />
        </div>

        {/* Center Column: Title and Description */}
        <div className="flex flex-col items-center justify-center gap-[clamp(0.5rem,0.369rem_+_0.49vw,1rem)] text-center">
          {children ?? (
            <>
              {/* Title: 244x73 (mobile) -> 462x50 (tablet) -> 462x85 (desktop), Lovelace Text 400 Regular, #FFD8A2 */}
              <h3 className="w-[clamp(15.25rem,63.56vw_-_1.631rem,28.875rem)] max-w-full text-balance font-heading font-normal text-[#FFD8A2] text-center tracking-normal text-[clamp(1.307rem,1.118rem_+_0.711vw,1.758rem)] leading-[clamp(1.819rem,1.471rem_+_1.31vw,2.65rem)]">
                {card?.title}
              </h3>

              {/* Description: 244x96 (mobile) -> 450x69 (tablet) -> 566x93 (desktop), Lato 400 with "Arviend Sud" in bold, #FFF0DB */}
              <p className="w-[clamp(15.25rem,min(60.06vw_-_0.706rem,17.26vw_+_19.84rem),35.375rem)] max-w-full font-lato font-normal text-[#FFF0DB] text-center tracking-normal text-[clamp(1.083rem,0.9475rem_+_0.51vw,1.406rem)] leading-[clamp(1.2rem,0.899rem_+_1.133vw,1.919rem)]">
                {renderDescriptionWithBold(
                  card?.description ?? "",
                  card?.boldHighlight
                )}
              </p>
            </>
          )}
        </div>

        {/* Right Leaf Icon: 46x106 at 425px -> 72x166 from 768px up, angle -4.39 deg */}
        <div
          aria-hidden="true"
          className={cn(
            "relative shrink-0 select-none",
            "w-[clamp(2.874rem,0.859rem_+_7.586vw,4.5rem)]",
            "h-[clamp(6.628rem,1.98rem_+_17.49vw,10.378rem)]",
            "rotate-[-4.39deg]"
          )}
        >
          <Image
            src={rightLeafSrc}
            alt=""
            fill
            sizes="(max-width: 768px) 46px, 72px"
            className="object-contain"
          />
        </div>
      </div>
    </article>
  );
}
