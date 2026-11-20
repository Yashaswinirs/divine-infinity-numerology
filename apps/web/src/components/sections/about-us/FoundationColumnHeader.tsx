import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib";

export interface FoundationColumnHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon: string;
  title: string;
  className?: string;
}

/**
 * FoundationColumnHeader Component
 *
 * Header group for columns in the BuildingStrongFoundation section.
 * - Alignment: centered (icon centered above heading, centered over card)
 * - Icon: 40 x 40 next/image
 * - Heading: Lovelace Text 400, #FFF0DB, 22.5px / 30.7px desktop, text-xl leading-7 mobile
 */
export function FoundationColumnHeader({
  icon,
  title,
  className,
  ...props
}: FoundationColumnHeaderProps) {
  // Graceful fallback for placeholder icon path so next/image doesn't crash on missing file
  const iconSrc =
    !icon || icon.includes("[ICON")
      ? "/images/foundation-icons/academic.svg"
      : icon;

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-[16px] text-center",
        className
      )}
      {...props}
    >
      {/* a. ICON (40 x 40) */}
      <Image
        src={iconSrc}
        alt=""
        width={40}
        height={40}
        aria-hidden="true"
        className="h-10 w-10 shrink-0 object-contain"
      />

      {/* b. HEADING (374 x 29) */}
      <h3 className="w-full lg:w-[374px] whitespace-normal text-center font-heading font-normal text-xl leading-7 text-[#FFF0DB] tracking-normal lg:text-[22.5px] lg:leading-[30.7px]">
        {title}
      </h3>
    </div>
  );
}
