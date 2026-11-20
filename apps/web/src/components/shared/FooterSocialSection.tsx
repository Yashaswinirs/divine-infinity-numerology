import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib";
import type { FooterSocialSectionData } from "@/data/footer";

export interface FooterSocialSectionProps {
  data: FooterSocialSectionData;
  className?: string;
}

/**
 * FooterSocialSection Component (Follow Us + Divider + 4 Social Icons)
 *
 * FIGMA ANCHORS (angle 0deg, opacity 1):
 * - Container: 356 x 36, gap 64px between [Follow Us + Divider] and [Icons].
 * - Follow Us group:
 *   - "Follow Us": 97 x 31, Lato 400 regular, 22.5px / 30.7px (1.3644), tracking 0%, color #FFFCF5.
 *   - Divider: width 0px (1px line), height 31.5px, border-radius 3px, border 1px solid rgba(255, 241, 214, 1) (#FFF1D6).
 *   - Gap: 17px between text and divider.
 * - Social icons group:
 *   - 177 x 36, gap 11px.
 *   - 4 icons (36 x 36, border-radius 40px, border 1px solid rgba(255, 241, 214, 0.4)):
 *     1. Instagram
 *     2. YouTube
 *     3. Facebook
 *     4. WhatsApp
 *
 * FLUID FORMULAS:
 * - Text font: clamp(1.125rem, 1.059rem + 0.246vw, 1.40625rem) (18px @425 -> 22.5px @1440)
 * - Text to divider gap: clamp(0.75rem, 0.59rem + 0.59vw, 1.0625rem) (12px @425 -> 17px @1440)
 * - Group gap: clamp(1.25rem, 0.462rem + 2.956vw, 4rem) (20px @425 -> 64px @1440)
 */
export function FooterSocialSection({
  data,
  className,
}: FooterSocialSectionProps) {
  return (
    <div
      className={cn(
        "flex w-full max-w-[22.25rem] items-center justify-between sm:justify-end gap-[clamp(1.25rem,0.462rem_+_2.956vw,4rem)]",
        className
      )}
    >
      {/* Left: Follow Us text + vertical divider */}
      <div className="flex items-center gap-[clamp(0.75rem,0.59rem_+_0.59vw,1.0625rem)]">
        <span className="font-lato font-normal text-[#FFFCF5] tracking-normal leading-[1.3644] whitespace-nowrap text-[clamp(1.125rem,1.059rem_+_0.246vw,1.40625rem)]">
          {data.title}
        </span>
        <div
          aria-hidden="true"
          className="h-[31.5px] w-0 border-r border-[#FFF1D6] rounded-[3px] translate-x-4"
        />
      </div>

      {/* Right: 4 Social Icons (177 x 36, gap 11) */}
      <div className="flex items-center gap-[11px] shrink-0">
        {data.items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            aria-label={item.ariaLabel}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-9 w-9 shrink-0 items-center justify-center rounded-[40px] transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD8A2]"
          >
            <Image
              src={item.icon}
              alt=""
              width={36}
              height={36}
              aria-hidden="true"
              className="h-9 w-9 select-none transition-opacity group-hover:opacity-85"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FooterSocialSection;

