import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib";
import { siteConfig } from "@/data/site";

// Figma: logo layer is 120 x 120 at left 55 / top 2 on desktop (bar at left 80 / top 30).
// TODO(figma): tablet (100) and mobile (80) box sizes are measured from screenshots; confirm with the layer panels.
const styles = {
  link: "relative block size-12.5 shrink-0 md:size-15 xl:h-12 xl:w-13",
  image:
    "absolute -top-2 -left-4 size-20 object-contain md:-top-3 md:-left-5.25 md:size-25 xl:-top-7 xl:-left-6.25 xl:size-30",
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
        width={120}
        height={120}
        priority
        className={styles.image}
        style={{ width: "auto", height: "auto" }}
      />
    </Link>
  );
}
