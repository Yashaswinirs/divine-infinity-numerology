"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib";

export interface MobileMenuButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onToggle"> {
  className?: string;
  onToggle?: (expanded: boolean) => void;
}

/**
 * MobileMenuButton - Hamburger menu button using /icons/three-lines-nav.svg:
 * - Width: 30px
 * - Height: 16px
 * - Gap: 8px
 * - Angle: 0 deg
 * - Opacity: 1
 */
export function MobileMenuButton({
  className,
  onToggle,
  onClick: propOnClick,
  ...props
}: MobileMenuButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    propOnClick?.(e);
    if (!e.defaultPrevented) {
      const next = !isOpen;
      setIsOpen(next);
      onToggle?.(next);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("open-mobile-menu"));
      }
    }
  };

  const isExpanded =
    props["aria-expanded"] !== undefined ? Boolean(props["aria-expanded"]) : isOpen;

  return (
    <button
      type="button"
      aria-label="Open menu"
      {...props}
      aria-expanded={isExpanded}
      onClick={handleClick}
      className={cn(
        "flex h-[50px] w-[50px] items-center justify-end rounded-full",
        "hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD8A2]",
        "transition-opacity cursor-pointer select-none",
        className
      )}
    >
      <Image
        src="/icons/three-lines-nav.svg"
        alt=""
        width={30}
        height={16}
        priority
        className="h-[16px] w-[30px] shrink-0 object-contain select-none"
        aria-hidden="true"
      />
    </button>
  );
}

export default MobileMenuButton;
