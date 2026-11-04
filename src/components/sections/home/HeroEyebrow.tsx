import Image from "next/image";
import { cn } from "@/lib";

export interface HeroEyebrowProps {
  text: string;
  icon: { src: string; width: number; height: number };
  className?: string;
}

/**
 * Bar + Om + tagline. Desktop row is 402 x 39: bar 3px, Om at x=10, text box at x=48.16 (354 wide,
 * text centred in it, so the text starts at about x=57). Tablet/mobile: the tagline starts right after
 * the Om (3.5px extra) and the Om animates its real width, so the tagline moves with it like the Figma prototype.
 */
export function HeroEyebrow({ text, icon, className }: HeroEyebrowProps) {
  return (
    <div className={cn("flex h-8.5 items-center gap-2.5 xl:h-9.75", className)}>
      <span aria-hidden="true" className="bg-light h-full w-0.75 shrink-0" />
      <Image
        src={icon.src}
        alt=""
        aria-hidden="true"
        width={icon.width}
        height={icon.height}
        className="animate-om-pulse-shift xl:animate-om-pulse w-7.04 -ml-0.75 h-auto shrink-0 motion-reduce:animate-none"
      />
      {/* top-[0.2em]: Mirza sits high in its line box; this centres it on the bar like Figma. */}
      <p className="type-hero-eyebrow text-gold px-0.875 relative top-[0.2em] xl:px-2.25">{text}</p>
    </div>
  );
}
