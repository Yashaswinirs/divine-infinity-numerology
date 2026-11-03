import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib";
import { siteConfig } from "@/data/site";

const variants = {
  // Desktop: 120px logo overhangs the 48px bar (Figma: left 55, top 2 vs bar left 80, top 30).
  // TODO(figma): tablet and mobile nav logo sizes are assumed (60 / 50), same as the menu logo.
  nav: {
    link: "relative block size-12.5 shrink-0 md:size-15 xl:h-12 xl:w-30",
    image: "size-full object-contain xl:absolute xl:-top-nav-logo-y xl:-left-nav-logo-x xl:size-30",
  },
  menu: {
    link: "block size-12.5 shrink-0 md:size-15",
    image: "size-full object-contain",
  },
} as const;

export interface LogoProps {
  variant?: keyof typeof variants;
  className?: string;
  onClick?: () => void;
}

export function Logo({ variant = "nav", className, onClick }: LogoProps) {
  const styles = variants[variant];

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
      />
    </Link>
  );
}
