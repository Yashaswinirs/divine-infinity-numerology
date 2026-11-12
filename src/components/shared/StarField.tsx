import Image from "next/image";
import { cn } from "@/lib";

export interface StarFieldProps {
  /** Star image. Default is the shared background used by About and Milestones. */
  src?: string;
  /** How many star copies are stacked down the wrapper (each is 995px tall at scale 1). Default 2. */
  copies?: number;
  className?: string;
}

// The star group is 1962 x 995 (Figma 1961.9 x 995.16). One copy covers only the top ~880px of a taller
// wrapper, so copies are stacked down it. Every second copy is flipped upside down so the joins line up
// instead of showing a visible repeat. Pass a higher `copies` if the lower part of a tall wrapper runs out of stars.
// Size and position follow the CSS variable --star-scale (default 1). A wrapper can set it per breakpoint, for
// example "[--star-scale:0.5] tab:[--star-scale:1]", to pack more stars into a narrow phone (Figma phone group is 425 wide).
const STAR_WIDTH = 1962;
const STAR_HEIGHT = 995;
const FIRST_COPY_TOP = -116; // 42 - 158 in Figma
const DEFAULT_COPIES = 2;
const DEFAULT_SRC = "/images/shared/stars-bg.svg";

export function StarField({
  src = DEFAULT_SRC,
  copies = DEFAULT_COPIES,
  className,
}: StarFieldProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {Array.from({ length: copies }, (_, index) => (
        <Image
          key={index}
          src={src}
          alt=""
          width={STAR_WIDTH}
          height={STAR_HEIGHT}
          className={cn(
            "absolute left-1/2 max-w-none -translate-x-1/2",
            index % 2 === 1 && "-scale-y-100"
          )}
          style={{
            top: `calc(${FIRST_COPY_TOP + index * STAR_HEIGHT}px * var(--star-scale, 1))`,
            width: `calc(${STAR_WIDTH}px * var(--star-scale, 1))`,
            height: `calc(${STAR_HEIGHT}px * var(--star-scale, 1))`,
          }}
        />
      ))}
    </div>
  );
}
