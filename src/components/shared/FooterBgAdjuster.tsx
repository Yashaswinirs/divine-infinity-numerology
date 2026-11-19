"use client";

import * as React from "react";
import Image from "next/image";

export interface FooterBgSettings {
  zoom: number;
  shiftX: number;
  shiftY: number;
}

/**
 * Continuous piecewise linear interpolation between verified Figma breakpoints:
 * - w <= 425: Mobile Anchor (zoom: 6.30, shiftX: -160px, shiftY: -306px)
 * - 425 < w < 768: Smooth fluid transition from Mobile to Tablet
 * - w = 768: Tablet Anchor (zoom: 3.75, shiftX: -21px, shiftY: 13px)
 * - 768 < w < 1440: Smooth fluid transition from Tablet to Desktop (includes 786, 1024, 1280)
 * - w >= 1440: Desktop Anchor (zoom: 1.38, shiftX: 200px, shiftY: 15px)
 */
export function getFluidFooterBgSettings(w: number): FooterBgSettings {
  if (w <= 425) {
    return { zoom: 6.3, shiftX: -160, shiftY: -306 };
  }
  if (w < 768) {
    const t = (w - 425) / (768 - 425);
    return {
      zoom: +(6.3 + t * (3.75 - 6.3)).toFixed(3),
      shiftX: +(-160 + t * (-21 - -160)).toFixed(1),
      shiftY: +(-306 + t * (13 - -306)).toFixed(1),
    };
  }
  if (w < 1440) {
    const t = (w - 768) / (1440 - 768);
    return {
      zoom: +(3.75 + t * (1.38 - 3.75)).toFixed(3),
      shiftX: +(-21 + t * (200 - -21)).toFixed(1),
      shiftY: +(13 + t * (15 - 13)).toFixed(1),
    };
  }
  return { zoom: 1.38, shiftX: 200, shiftY: 15 };
}

export interface FooterBgAdjusterProps {
  imageSrc?: string;
}

/**
 * FooterBgAdjuster Component
 * Unified, fluid background image layer for the Footer across all viewports.
 * Uses GPU-accelerated translate3d and scale transforms with zero-jump continuity.
 */
export function FooterBgAdjuster({
  imageSrc = "/images/footer/footer-bg.webp",
}: FooterBgAdjusterProps) {
  const bgRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let rafId: number | null = null;

    const updatePosition = () => {
      const w = window.innerWidth;
      const settings = getFluidFooterBgSettings(w);
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(${settings.shiftX}px, ${settings.shiftY}px, 0) scale(${settings.zoom})`;
        bgRef.current.style.transformOrigin = "bottom center";
      }
    };

    const handleResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updatePosition);
    };

    updatePosition();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!imageSrc) return null;

  return (
    <>
      <style>{`
        .footer-fluid-bg-container {
          transform: translate3d(200px, 15px, 0) scale(1.38);
          transform-origin: bottom center;
        }
        @media (max-width: 1023px) {
          .footer-fluid-bg-container {
            transform: translate3d(-21px, 13px, 0) scale(3.75);
          }
        }
        @media (max-width: 767px) {
          .footer-fluid-bg-container {
            transform: translate3d(-160px, -306px, 0) scale(6.30);
          }
        }
      `}</style>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div
          ref={bgRef}
          className="footer-fluid-bg-container absolute inset-x-0 bottom-0 flex justify-center w-full will-change-transform origin-bottom"
        >
          <Image
            src={imageSrc}
            alt=""
            aria-hidden="true"
            width={2466}
            height={763}
            sizes="100vw"
            className="h-auto w-full min-w-full max-w-none select-none"
            priority={false}
          />
        </div>
      </div>
    </>
  );
}

export default FooterBgAdjuster;
