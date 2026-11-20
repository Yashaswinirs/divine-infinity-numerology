import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib";

export interface FoundationCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  innerClassName?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * FoundationCard Component
 *
 * Shared card shell across the BuildingStrongFoundation columns:
 * - OUTER: w-full max-w-[374px] rounded-[24px] bg-[#FFF0DB] (rgba(255, 240, 219, 1))
 *   - Mobile & Tablet: p-[8px] (outer cream strip width = 16px total, 8px on each side)
 *   - Desktop (xl): xl:p-[12px] (outer cream strip width = 24px total, 12px on each side)
 * - INNER: rounded-[16px] bg-[linear-gradient(142.94deg,#1D1B4D_0%,#512B58_120.7%)]
 *   - Mobile & Tablet width: exactly 358px (max-w-[358px])
 *   - Desktop (xl) width: exactly 350px (xl:max-w-[350px])
 *   - Overlaid with starry texture inside the gradient panel.
 */
export function FoundationCard({
  innerClassName,
  className,
  children,
  ...props
}: FoundationCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[374px] rounded-[24px] p-[8px] xl:p-[12px] bg-[#FFF0DB] transition-all flex items-center justify-center",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "relative w-full max-w-[358px] xl:max-w-[350px] rounded-[16px] bg-[linear-gradient(142.94deg,#1D1B4D_0%,#512B58_120.7%)] flex overflow-hidden",
          innerClassName
        )}
      >
        {/* Stars overlay coming over the gradient color inside the card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 select-none"
        >
          <Image
            src="/images/about-us/building-strong-foundation/strong-foundation-stars.svg"
            alt=""
            fill
            sizes="374px"
            className="object-cover object-center opacity-80"
          />
        </div>

        {/* Card Content sits above the starry gradient */}
        {children}
      </div>
    </div>
  );
}
