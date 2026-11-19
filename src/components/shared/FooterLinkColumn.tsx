import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib";

export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface FooterLinkColumnProps {
  title?: string;
  links: FooterLinkItem[];
  gap?: string;
  "aria-label"?: string;
  className?: string;
}

/**
 * FooterLinkColumn Component
 *
 * FIGMA ANCHORS (angle 0deg, opacity 1):
 * - Column 1 container: 176 x 226, max-w-[11rem] (176px cap), gap 20 (gap-5) between heading and list.
 * - Column 2 container: 176 x 109, max-w-[11rem], gap 20 (gap-5) between links, starts at top 48.
 * - Heading: Lovelace Text 400, #FFD8A2, leading-[1.3644] (30.7px / 22.5px), tracking-normal, text-balance.
 *   - 425px: 20px (ASSUMED)
 *   - 1440px: 22.5px
 * - Links list: 176 x 23 per link.
 *   - Column 1: 5 links, gap 15 (gap-[15px]) between list items (DERIVED).
 *   - Column 2: 3 links, gap 20 (gap-5) between list items (FIGMA).
 * - Link text: Lato 700 bold, #FFF1D6, tracking-[0.01em], leading-[1.3875] (22.2px / 16px).
 *   - 425px: 15px (ASSUMED)
 *   - 1440px: 16px
 * - Interactive: hover:text-[#FFD8A2] (color only, never size), focus-visible outline with #FFD8A2.
 *
 * FLUID FORMULAS:
 * - Heading font: clamp(1.25rem, 1.1846rem + 0.246vw, 1.40625rem) (20px @425 -> 22.5px @1440)
 * - Link font: clamp(0.9375rem, 0.9113rem + 0.0985vw, 1rem) (15px @425 -> 16px @1440)
 */
export function FooterLinkColumn({
  title,
  links,
  gap = "gap-[15px]",
  "aria-label": ariaLabel,
  className,
}: FooterLinkColumnProps) {
  const id = React.useId();

  return (
    <nav
      aria-labelledby={title ? id : undefined}
      aria-label={!title ? (ariaLabel ?? "Additional Links") : undefined}
      className={cn("flex w-[11rem] shrink-0 flex-col gap-5", className)}
    >
      {title ? (
        <h2
          id={id}
          className="font-heading font-normal text-[#FFD8A2] tracking-normal text-balance text-[clamp(1.083rem,0.948rem_+_0.509vw,1.40625rem)] leading-[clamp(1.456rem,1.206rem_+_0.521vw,1.91875rem)]"
        >
          {title}
        </h2>
      ) : null}
      <ul role="list" className={cn("flex flex-col", gap)}>
        {links.map((link, index) => (
          <li key={`${link.href}-${index}`}>
            <Link
              href={link.href}
              className="font-lato font-bold text-[#FFF1D6] tracking-[0.01em] leading-[1.3875] text-[clamp(0.9375rem,0.9113rem_+_0.0985vw,1rem)] transition-colors hover:text-[#FFD8A2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD8A2] whitespace-nowrap"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default FooterLinkColumn;

