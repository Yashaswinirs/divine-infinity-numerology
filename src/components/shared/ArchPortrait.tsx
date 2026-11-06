import Image from "next/image";
import { cn } from "@/lib";

export interface ArchPortraitProps {
  src: string;
  alt: string;
  /** `sizes` for the photo (the arch is 362 wide at 1440). */
  sizes?: string;
  className?: string;
}

// Figma "Group 4": 402 x 508 outline, top radii 240, 1px inner border #806398. It scales as one piece
// (tablet about 347 wide), so every inner measure is a percentage of 402 x 508.
// Dots (Ellipse 3/4, about 15px) sit centred on the outline.
// TODO(figma): inner arch inset (20), dot size (15), dot positions and the dimmer left/bottom dots are
// measured from screenshots. Ellipse 3, Ellipse 4 and Frame 32 panels were not received.
const styles = {
  root: "relative aspect-402/508 w-full",
  // 240px radius on a 402px box collapses to a half circle, so no radius token is needed.
  outline: "border-arch-border absolute inset-0 rounded-t-[240px] border",
  // 20 / 402 = 4.975%, 20 / 508 = 3.937%.
  arch: "bg-primary absolute inset-x-[4.975%] inset-y-[3.937%] overflow-hidden rounded-t-full",
  // 15 / 402 = 3.731%.
  dot: "bg-arch-border absolute aspect-square w-[3.731%] -translate-x-1/2 -translate-y-1/2 rounded-full",
} as const;

export function ArchPortrait({ src, alt, sizes = "362px", className }: ArchPortraitProps) {
  return (
    <div className={cn(styles.root, className)}>
      <div aria-hidden="true" className={styles.outline} />
      <div className={styles.arch}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-center" />
      </div>
      {/* Figma dot positions: top and bottom centred, left at 287 / 508 and right at 278 / 508. */}
      <span aria-hidden="true" className={cn(styles.dot, "top-0 left-1/2")} />
      <span aria-hidden="true" className={cn(styles.dot, "top-full left-1/2 opacity-70")} />
      <span aria-hidden="true" className={cn(styles.dot, "top-[56.5%] left-0 opacity-70")} />
      <span aria-hidden="true" className={cn(styles.dot, "top-[54.7%] left-full")} />
    </div>
  );
}
