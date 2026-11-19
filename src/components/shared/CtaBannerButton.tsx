"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib";

export interface CtaBannerButtonProps {
  href: string;
  label: string;
  variant: "primary" | "secondary";
  className?: string;
}

export function CtaBannerButton({
  href,
  label,
  variant,
  className,
}: CtaBannerButtonProps) {
  const isHash = href.startsWith("#");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHash) {
      e.preventDefault();
      const targetId = href.slice(1);
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({
            behavior: "instant",
            block: "start",
          });
        }
      }
    }
  };

  const isPrimary = variant === "primary";

  const buttonClasses = cn(
    "inline-flex items-center justify-center gap-[13px] rounded-[50px] min-h-[clamp(2.625rem,2.16rem_+_1.75vw,3rem)] px-4 min-[34rem]:pl-4 min-[34rem]:pr-[9px] py-[9px]",
    "font-lato font-bold text-[1rem] leading-[1.3875] tracking-[0.01em]",
    "hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD8A2]",
    "transition-[filter] select-none cursor-pointer",
    isPrimary
      ? "bg-[#FFD8A2] text-[#655373]"
      : "bg-[#806398] text-[#FFD8A2]",
    className
  );

  const circleClasses = cn(
    "flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[15px] p-[7px]",
    isPrimary ? "bg-[#655373]" : "bg-[#FFD8A2]"
  );

  const caretClasses = cn(
    "h-4 w-4",
    isPrimary ? "text-[#FFD8A2]" : "text-[#655373]"
  );

  const content = (
    <>
      <span>{label}</span>
      <span aria-hidden="true" className={circleClasses}>
        <svg
          className={caretClasses}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </span>
    </>
  );

  if (isHash) {
    return (
      <a href={href} onClick={handleClick} className={buttonClasses}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={buttonClasses}>
      {content}
    </Link>
  );
}

export default CtaBannerButton;

