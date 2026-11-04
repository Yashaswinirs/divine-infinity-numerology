import type { CSSProperties } from "react";
import Image from "next/image";
import { cn } from "@/lib";

export interface LogoMarqueeItem {
  src: string;
  alt: string;
  /** Figma desktop frame size in px. Tablet and mobile show it at 0.6x. */
  width: number;
  height: number;
  /** Turn a coloured logo white, as in Figma. */
  invert?: boolean;
}

export interface LogoMarqueeProps {
  logos: readonly LogoMarqueeItem[];
  /** Accessible name of the logo list. */
  label: string;
  className?: string;
}

// Figma cells: 200 x 85 desktop, 120 x 64 tablet and mobile. Gap between cells: 30 desktop, 10 tablet/mobile.
// Gap between the two sets: 40 desktop (second set starts at 1850), none on tablet/mobile (starts at 1030).
// Viewport: 1372 wide on desktop, full container width below (648 tablet, 385 mobile), 85 / 68 tall.
// Each logo has its own Figma frame size (width/height in the data). Tablet and mobile use 0.6x (cell 120 / 200).
// TODO(figma): speed estimated by eye, about 115px per second (set width 1030 -> 9s, 1850 -> 15.5s).
// Read the exact duration from the Figma prototype interaction and set it here.
const styles = {
  viewport:
    "mx-auto flex h-17 w-full items-center overflow-hidden xl:h-21.25 xl:max-w-343 motion-reduce:overflow-x-auto",
  track:
    "flex w-max shrink-0 animate-marquee [--marquee-duration:9s] xl:[--marquee-duration:15.5s] motion-reduce:animate-none",
  set: "flex shrink-0 items-center gap-2.5 xl:gap-7.5 xl:pr-10",
  cell: "flex h-16 w-30 shrink-0 items-center justify-center xl:h-21.25 xl:w-50",
  image: "h-auto max-w-none w-[calc(var(--logo-w)*0.6)] xl:w-(--logo-w)",
} as const;

/** Endless right-to-left logo strip. Two identical sets; the copy is hidden from assistive tech. Reduced motion: no animation, strip scrolls by hand. */
export function LogoMarquee({ logos, label, className }: LogoMarqueeProps) {
  return (
    <div className={cn(styles.viewport, className)}>
      <div className={styles.track}>
        {[false, true].map((isCopy) => (
          <ul
            key={isCopy ? "copy" : "original"}
            aria-label={isCopy ? undefined : label}
            aria-hidden={isCopy || undefined}
            className={cn(styles.set, isCopy && "motion-reduce:hidden")}
          >
            {logos.map((logo) => (
              <li key={logo.src} className={styles.cell}>
                <Image
                  src={logo.src}
                  alt={isCopy ? "" : logo.alt}
                  width={logo.width}
                  height={logo.height}
                  sizes={`${logo.width}px`}
                  style={{ "--logo-w": `${logo.width}px` } as CSSProperties}
                  className={cn(styles.image, logo.invert && "brightness-0 invert")}
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
