import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib";
import type { FooterContactData } from "@/data/footer";

export interface FooterContactColumnProps {
  data: FooterContactData;
  className?: string;
}

/**
 * FooterContactColumn Component
 *
 * FIGMA ANCHORS (angle 0deg, opacity 1):
 * - Container: 231 x 215, starts at left 468, gap 20 (gap-5) between heading and list.
 * - Heading "Contact": Lovelace Text 400, 22.5px / 30.7px (1.3644), tracking-normal, color #FFD8A2.
 *   - 425px: 20px (ASSUMED)
 *   - 1440px: 22.5px
 * - 3 Contact Items (gap 20 between items):
 *   1. Phone: 176 x 24, gap 10, telephone icon (24x24) + number (Lato 700, 16px / 22.2px, #FFF0DB).
 *   2. Email: 176 x 24, gap 10, paper plane icon (24x24) + email (Lato 700, 16px / 22.2px, #FFF0DB).
 *   3. Address: 231 x 67, gap 10, map pin icon (24x24) + address (Lato 700, 16px / 22.2px, #FFF0DB).
 *
 * FLUID FORMULAS:
 * - Heading font: clamp(1.25rem, 1.1846rem + 0.246vw, 1.40625rem) (20px @425 -> 22.5px @1440)
 * - Text font: clamp(0.9375rem, 0.9113rem + 0.0985vw, 1rem) (15px @425 -> 16px @1440)
 */
export function FooterContactColumn({
  data,
  className,
}: FooterContactColumnProps) {
  const id = React.useId();

  return (
    <nav
      aria-labelledby={id}
      className={cn("flex w-[14.4375rem] shrink-0 flex-col gap-5", className)}
    >
      <h2
        id={id}
        className="font-heading font-normal text-[#FFD8A2] tracking-normal text-balance text-[clamp(1.083rem,0.948rem_+_0.509vw,1.40625rem)] leading-[clamp(1.456rem,1.206rem_+_0.521vw,1.91875rem)]"
      >
        {data.title}
      </h2>

      <ul role="list" className="flex flex-col gap-5">
        {/* 1. Telephone */}
        {data.phone && (
          <li className="flex items-center gap-2.5">
            <Image
              src={data.phone.icon}
              alt=""
              width={24}
              height={24}
              aria-hidden="true"
              className="w-[clamp(1.172rem,0.803rem_+_0.781vw,1.5rem)] h-[clamp(1.172rem,0.803rem_+_0.781vw,1.5rem)] shrink-0 select-none"
            />
            <a
              href={data.phone.href}
              className="font-lato font-bold text-[#FFF0DB] tracking-[0.01em] leading-[1.3875] text-[clamp(0.9375rem,0.9113rem_+_0.0985vw,1rem)] transition-colors hover:text-[#FFD8A2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD8A2]"
            >
              {data.phone.label}
            </a>
          </li>
        )}

        {/* 2. Email */}
        {data.email && (
          <li className="flex items-center gap-2.5">
            <Image
              src={data.email.icon}
              alt=""
              width={24}
              height={24}
              aria-hidden="true"
              className="w-[clamp(1.172rem,0.803rem_+_0.781vw,1.5rem)] h-[clamp(1.172rem,0.803rem_+_0.781vw,1.5rem)] shrink-0 select-none"
            />
            <a
              href={data.email.href}
              className="font-lato font-bold text-[#FFF0DB] tracking-[0.01em] leading-[1.3875] text-[clamp(0.9375rem,0.9113rem_+_0.0985vw,1rem)] transition-colors hover:text-[#FFD8A2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD8A2]"
            >
              {data.email.label}
            </a>
          </li>
        )}

        {/* 3. Address */}
        {data.address && (
          <li className="flex items-start gap-2.5">
            <Image
              src={data.address.icon}
              alt=""
              width={24}
              height={24}
              aria-hidden="true"
              className="mt-0.5 w-[clamp(1.172rem,0.803rem_+_0.781vw,1.5rem)] h-[clamp(1.172rem,0.803rem_+_0.781vw,1.5rem)] shrink-0 select-none"
            />
            <address className="not-italic font-lato font-bold text-[#FFF0DB] tracking-[0.01em] leading-[1.3875] text-[clamp(0.9375rem,0.9113rem_+_0.0985vw,1rem)]">
              <span>{data.address.line1}</span>
              <br />
              <span>{data.address.line2}</span>
            </address>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default FooterContactColumn;

