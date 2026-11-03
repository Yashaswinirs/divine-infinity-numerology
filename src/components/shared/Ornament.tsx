import Image from "next/image";
import { cn } from "@/lib";
import { siteConfig } from "@/data/site";

export interface OrnamentProps {
  className?: string;
}

/** Swirl divider exported from Figma (120 x 11.41). */
export function Ornament({ className }: OrnamentProps) {
  const { src, width, height } = siteConfig.decor.ornament;

  return (
    <Image
      src={src}
      alt=""
      width={width}
      height={height}
      aria-hidden="true"
      className={cn("h-auto w-30", className)}
    />
  );
}
