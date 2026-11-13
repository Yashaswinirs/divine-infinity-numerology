"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { usePrefersReducedMotion } from "@/hooks";
import { cn } from "@/lib";

export interface ConsultationTypeTileProps {
  /** Tablet and desktop text (one line). */
  label: string;
  /** Phone text. Figma breaks every phone label in two lines by hand ("\n"). */
  compactLabel: string;
  /** Outline icon (40 x 40 SVG, decorative). */
  icon: string;
  /** In-page link. Every tile scrolls to the plans (Figma prototype: scroll to, ease out, 416.71ms). */
  href: string;
  className?: string;
}

// Figma "Component 17 ..." (tile): vertical, radius 12, 1px border Accent 25%, padding 20, gap 10, no fill in the panel.
// Size: 302 x 113 desktop (4 columns, gap 24), 314 x 113 tablet and 182.5 x 136 phone (2 columns, gap 20).
// Figma draws the border inside the padding, so CSS padding is 19 (20 - 1px border). The heights are min-heights:
// Figma rounds every text line up to 23px (one line = 113, two lines = 136), CSS lines are 22.6px.
// Hover (prototype screenshot, TODO(figma): no hover panel received): border Accent 100%, soft Accent glow, and the card
// gradient fades in behind the content (the fill is a separate layer because a gradient cannot be transitioned).
// From lg to xl (1024 to 1279, no Figma frame) the horizontal padding is 8 so "Rudraksha Consultation" (about 188px)
// stays on one line in 4 columns. Below 375 the padding is 8 as well, so the phone words fit (320: tile 130 wide).
// The click scrolls smoothly to the target (instant with prefers-reduced-motion). A plain <a> is used on purpose: it is
// an in-page anchor, and without JavaScript the browser still jumps to it.
const styles = {
  tile: "group border-accent/25 hover:border-accent hover:shadow-accent-glow focus-visible:border-accent focus-visible:shadow-accent-glow focus-visible:outline-accent relative isolate flex min-h-34 w-full flex-col items-center justify-center gap-2.5 rounded-xl border px-4.75 py-4.75 text-center transition-[border-color,box-shadow] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none max-[374px]:px-2 tab:min-h-28.25 lg:px-2 xl:px-4.75",
  fill: "bg-card-gradient pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-70 group-focus-visible:opacity-70 motion-reduce:transition-none",
  icon: "size-10 shrink-0",
  label: "type-body-large text-light font-medium",
} as const;

export function ConsultationTypeTile({
  label,
  compactLabel,
  icon,
  href,
  className,
}: ConsultationTypeTileProps) {
  const reducedMotion = usePrefersReducedMotion();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    if (!href.startsWith("#")) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  }

  return (
    <a href={href} onClick={handleClick} className={cn(styles.tile, className)}>
      <span aria-hidden="true" className={styles.fill} />
      <Image src={icon} alt="" width={40} height={40} aria-hidden="true" className={styles.icon} />
      <span className={cn(styles.label, "tab:hidden whitespace-pre-line")}>{compactLabel}</span>
      <span className={cn(styles.label, "tab:block hidden")}>{label}</span>
    </a>
  );
}
