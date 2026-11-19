import * as React from "react";
import { cn } from "@/lib";
import { Button } from "@/components/ui/Button";
import type { FooterCourseCtaData } from "@/data/footer";

export interface FooterCourseColumnProps {
  data: FooterCourseCtaData;
  className?: string;
}

/**
 * FooterCourseColumn Component (Column 4: Course CTA block)
 *
 * FIGMA ANCHORS (angle 0deg, opacity 1):
 * - Container: 476 x 173, top 2, starts at left 804 (ends at 1280 right edge).
 *   - Gap: 20px (gap-5) between elements.
 * - Heading "Study the meaning Behind the Numbers":
 *   - 476 x 31, Lovelace Text 400, 22.5px / 30.7px (1.3644), tracking 0%, color #FFD8A2.
 * - Description:
 *   - 476 x 67, Lato 500 medium, 16px / 22.2px (1.3875), tracking 1%, color #FFFCF5.
 * - Button "Explore Courses":
 *   - 145 x 35, padding 16px, gap 10px, radius 50px, background #FFF1D6 (cream).
 *   - Label: 107 x 10, Satoshi 700 bold, 14px, line-height 100%, color #5A2A5D (plum).
 *   - Implemented via Button component variant="footer" size="footer".
 *
 * FLUID FORMULAS:
 * - Heading font: clamp(1.25rem, 1.1846rem + 0.246vw, 1.40625rem) (20px @425 -> 22.5px @1440)
 * - Description font: clamp(0.9375rem, 0.9113rem + 0.0985vw, 1rem) (15px @425 -> 16px @1440)
 */
export function FooterCourseColumn({
  data,
  className,
}: FooterCourseColumnProps) {
  return (
    <div
      className={cn(
        "flex w-full max-w-[29.75rem] flex-col gap-5 mt-[2px]",
        className
      )}
    >
      <h2 className="font-heading font-normal text-[#FFD8A2] tracking-normal leading-[1.3644] text-[clamp(1.25rem,1.1846rem_+_0.246vw,1.40625rem)]">
        {data.title}
      </h2>

      <p className="font-lato font-medium text-[#FFFCF5] tracking-[0.01em] leading-[1.3875] text-[clamp(0.9375rem,0.9113rem_+_0.0985vw,1rem)]">
        {data.description}
      </p>

      <div className="pt-1">
        <Button variant="footer" size="footer" href={data.buttonHref}>
          {data.buttonText}
        </Button>
      </div>
    </div>
  );
}

export default FooterCourseColumn;

