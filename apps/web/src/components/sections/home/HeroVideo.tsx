"use client";

import Image from "next/image";
import { usePrefersReducedMotion } from "@/hooks";

export interface HeroVideoProps {
  src: string;
  poster: string;
}

/**
 * Full-bleed looping background. Desktop video is 1480 x 795 in a 1440 x 750 frame,
 * so it bleeds 40px right and 45px down and is clipped by the wrapper.
 * Figma crops the video from the centre (Fill), so object-center. Reduced motion: poster only.
 * Mobile gets the Figma 60% black overlay.
 */
export function HeroVideo({ src, poster }: HeroVideoProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {reducedMotion ? (
        <Image
          src={poster}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          className="absolute top-0 left-0 h-full w-full max-w-none object-cover object-center xl:h-[calc(100%+2.8125rem)] xl:w-[calc(100%+2.5rem)]"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-black/60 md:hidden" />
    </div>
  );
}
