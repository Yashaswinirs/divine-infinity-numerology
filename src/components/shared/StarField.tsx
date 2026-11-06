import Image from "next/image";
import { cn } from "@/lib";

export interface StarFieldProps {
  /** Star image. Default is the shared background used by About and Milestones. */
  src?: string;
  className?: string;
}

// The star group is 1962 x 995 (Figma 1961.9 x 995.16). One copy covers only the top ~880px of a taller
// wrapper, so copies are stacked down it. Every second copy is flipped upside down so the joins line up
// instead of showing a visible repeat. Raise COPIES if the lower part of a tall wrapper (phone) runs out of stars.
const STAR_WIDTH = 1962;
const STAR_HEIGHT = 995;
const FIRST_COPY_TOP = -116; // 42 - 158 in Figma
const COPIES = 2;
const DEFAULT_SRC = "/images/shared/stars-bg.svg";

export function StarField({ src = DEFAULT_SRC, className }: StarFieldProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {Array.from({ length: COPIES }, (_, index) => (
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
            top: FIRST_COPY_TOP + index * STAR_HEIGHT,
            width: STAR_WIDTH,
            height: STAR_HEIGHT,
          }}
        />
      ))}
    </div>
  );
}
