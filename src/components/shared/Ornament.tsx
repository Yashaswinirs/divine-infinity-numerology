import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib";
import { siteConfig } from "@/data/site";

const ornamentVariants = cva("h-auto", {
  variants: {
    // divider: swirl in the mobile menu (120 x 11.41).
    // section: lines + swirl above section titles (Figma 362 x 32.76 desktop, 262 x 23.71 tablet and mobile).
    variant: {
      divider: "w-30",
      section: "w-65.5 xl:w-90.5",
    },
  },
  defaultVariants: {
    variant: "divider",
  },
});

export interface OrnamentProps extends VariantProps<typeof ornamentVariants> {
  className?: string;
}

export function Ornament({ variant, className }: OrnamentProps) {
  const { src, width, height } =
    siteConfig.decor[variant === "section" ? "sectionOrnament" : "ornament"];

  return (
    <Image
      src={src}
      alt=""
      width={width}
      height={height}
      aria-hidden="true"
      className={cn(ornamentVariants({ variant, className }))}
    />
  );
}
