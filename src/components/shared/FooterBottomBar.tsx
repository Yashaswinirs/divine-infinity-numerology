import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib";
import type { FooterBottomSubStripData } from "@/data/footer";

export interface FooterBottomBarProps {
  data: FooterBottomSubStripData;
  className?: string;
}

/**
 * FooterBottomBar Component (Bottom sub-strip of footer)
 *
 * FIGMA ANCHORS (angle 0deg, opacity 1):
 * - Container: 1280 x 20, justify-between across the 1280 master width.
 * - 3 Items:
 *   1. Copyright (228 x 19):
 *      - Text: "© Diviine Infinity Numerologgy 2026"
 *      - Lato 500 medium, 14px / 18.8px (1.3428), tracking 0%, color #FFF1D6 (rgba(255, 241, 214, 1)).
 *   2. Credits (282 x 19):
 *      - Text: "🪐The planets planned it. Cojective made it ❤"
 *      - Lato 500 medium, 14px / 18.8px (1.3428), tracking 0%, color #FFF1D6.
 *   3. Legal Links (259 x 19, gap 24px):
 *      - "Terms & Conditions" (121 x 19): Lato 500 medium, 14px / 18.8px, #FFF1D6.
 *      - "|" (5 x 10): Satoshi 400 regular, 14px, line-height 100%, #FFF1D6.
 *      - "Privacy Policy" (85 x 19): Lato 500 medium, 14px / 18.8px, #FFF1D6.
 *
 * RESPONSIVE BEHAVIOR:
 * - Desktop (>=1024px): single horizontal row, space-between (left, center, right).
 * - Tablet/Mobile (<1024px): flex-wrap with centered items and clean gap spacing.
 */
export function FooterBottomBar({
  data,
  className,
}: FooterBottomBarProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-wrap items-center justify-between gap-y-3 gap-x-6 text-[0.875rem]",
        className
      )}
    >
      {/* 1. Copyright */}
      <p className="font-lato font-medium text-[#FFF1D6] tracking-normal leading-[1.3428] text-[0.875rem] whitespace-nowrap">
        {data.copyright}
      </p>

      {/* 2. Credits */}
      <p className="font-lato font-medium text-[#FFF1D6] tracking-normal leading-[1.3428] text-[0.875rem] text-center whitespace-nowrap">
        {data.credits.includes("❤") ? (
          <>
            {data.credits.replace("❤", "").trimEnd()}{" "}
            <span className="text-[#FF2E2E] inline-block font-sans">❤</span>
          </>
        ) : (
          data.credits
        )}
      </p>

      {/* 3. Legal Links (259 x 19, gap 24px) */}
      <nav aria-label="Legal Links" className="flex items-center gap-6 shrink-0">
        {data.legalLinks.map((link, index) => (
          <React.Fragment key={link.href}>
            {index > 0 && (
              <span
                aria-hidden="true"
                className="select-none font-sans font-normal text-[#FFF1D6] leading-none"
              >
                |
              </span>
            )}
            <Link
              href={link.href}
              className="font-lato font-medium text-[#FFF1D6] tracking-normal leading-[1.3428] text-[0.875rem] whitespace-nowrap transition-colors hover:text-[#FFD8A2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD8A2]"
            >
              {link.label}
            </Link>
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}

export default FooterBottomBar;

