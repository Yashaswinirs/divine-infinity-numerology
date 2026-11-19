import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib";

const ornamentVariants = cva("h-auto max-w-full select-none", {
  variants: {
    // divider: swirl in the mobile menu (120 x 11.41).
    // section: fluid responsive gold flourish:
    //   - Mobile (425px): ~162px (height: 15.4px)
    //   - Tablet (768px): ~262px (height: 24.9px)
    //   - Desktop (1280px+): 362px (height: 34.4px)
    //   - Color: rgba(255, 216, 162, 1) (#FFD8A2 / text-accent)
    variant: {
      divider: "w-[120px]",
      section:
        "w-[clamp(131px,calc(38.1px+29.15vw),262px)] md:w-[clamp(262px,calc(112px+19.53vw),362px)]",
    },
  },
  defaultVariants: {
    variant: "section",
  },
});

export interface OrnamentProps extends VariantProps<typeof ornamentVariants> {
  className?: string;
}

export function Ornament({ variant = "section", className }: OrnamentProps) {
  const isDivider = variant === "divider";
  const src = isDivider ? "/icons/ornament.svg" : "/images/ornament.svg";
  const width = isDivider ? 120 : 362;
  const height = isDivider ? 11.41 : 34;

  return (
    <Image
      src={src}
      alt=""
      width={width}
      height={height}
      aria-hidden="true"
      className={cn(ornamentVariants({ variant, className }), "text-accent")}
    />
  );
}
