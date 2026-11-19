"use client";

import * as React from "react";
import { cn } from "@/lib";

export interface MobileMenuButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onToggle"> {
  className?: string;
  onToggle?: (expanded: boolean) => void;
}

/**
 * MobileMenuButton - 3-line stepped hamburger button matching Figma specs:
 * - Frame: width 30px, height 16px, gap 8px
 * - Line 1: width 30px, height 0px, border: 2.5px solid rgba(255, 240, 219, 1) (#FFF0DB)
 * - Line 2: width 23px, height 0px, border: 2.5px solid rgba(255, 240, 219, 1) (#FFF0DB)
 * - Line 3: width 18px, height 0px, border: 2.5px solid rgba(255, 240, 219, 1) (#FFF0DB)
 */
export function MobileMenuButton({
  className,
  onToggle,
  ...props
}: MobileMenuButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(e);
    if (!e.defaultPrevented) {
      const next = !isOpen;
      setIsOpen(next);
      onToggle?.(next);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("open-mobile-menu"));
      }
    }
  };

  return (
    <button
      type="button"
      aria-label="Open menu"
      aria-expanded={isOpen}
      onClick={handleClick}
      className={cn(
        "flex h-[50px] w-[50px] items-center justify-end rounded-full",
        "hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD8A2]",
        "transition-opacity cursor-pointer select-none",
        className
      )}
      {...props}
    >
      <div
        className="flex w-[30px] flex-col items-end gap-[8px]"
        aria-hidden="true"
      >
        <span className="block w-[30px] h-0 border-t-[2.5px] border-[#FFF0DB]" />
        <span className="block w-[23px] h-0 border-t-[2.5px] border-[#FFF0DB]" />
        <span className="block w-[18px] h-0 border-t-[2.5px] border-[#FFF0DB]" />
      </div>
    </button>
  );
}

export default MobileMenuButton;
