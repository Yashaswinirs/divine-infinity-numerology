import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib";
import { siteConfig } from "@/data/site";

// Figma logo layer (a cropped, padded PNG): slot 52 x 48 on desktop (derived from the 1280 bar), 60 x 60 on tablet,
// 50 x 50 on phone. logo.png is a tight crop (180 x 180, about 5% padding), so the image is sized to reproduce the
// artwork seen in Figma: text width about 65 (desktop), 51 (tablet), 42 (phone).
// max-w-none: Tailwind's base `img { max-width: 100% }` would cap the image to the slot and squash it.
// TODO(figma): the artwork sizes and offsets are read from the canvas (+-2px), not from a panel.
const styles = {
  link: "relative block size-12.5 shrink-0 tab:size-15 lg:h-12 lg:w-13",
  image:
    "absolute top-0.5 left-0.5 size-11.5 max-w-none object-contain tab:top-px tab:left-px tab:size-14 lg:-top-2.25 lg:left-0 lg:size-18",
} as const;

export interface LogoProps {
  className?: string;
  onClick?: () => void;
}

export function Logo({ className, onClick }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      onClick={onClick}
      className={cn(styles.link, className)}
    >
      <Image
        src={siteConfig.logo.src}
        alt={siteConfig.logo.alt}
        width={180}
        height={180}
        sizes="72px"
        priority
        className={styles.image}
        style={{ width: "auto", height: "auto" }}
      />
    </Link>
  );
}
