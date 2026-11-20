import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib";

export interface SectionOrnamentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  imageClassName?: string;
}

/**
 * Section Ornament Component
 *
 * Decorative gold flourish used across section headers.
 * Fluid responsive dimensions measured from Figma:
 * - Mobile (425px): 161.999px × 15.404px (~162px)
 * - Tablet (768px): 261.999px × 24.913px (~262px)
 * - Desktop (1280px+): 361.999px × 34.422px (~362px)
 * - Color: rgba(255, 216, 162, 1) (#FFD8A2 / text-accent)
 */
export function SectionOrnament({
  className,
  imageClassName,
  ...props
}: SectionOrnamentProps) {
  return (
    <div
      className={cn(
        "flex w-[clamp(131px,calc(38.1px+29.15vw),262px)] max-w-full items-center justify-start md:w-[clamp(262px,calc(112px+19.53vw),362px)]",
        className
      )}
      {...props}
    >
      <Image
        src="/images/ornament.svg"
        alt=""
        width={362}
        height={34}
        aria-hidden="true"
        className={cn(
          "h-auto w-[clamp(131px,calc(38.1px+29.15vw),262px)] max-w-full text-accent md:w-[clamp(262px,calc(112px+19.53vw),362px)]",
          imageClassName
        )}
      />
    </div>
  );
}

