import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib";

export interface WhatsAppButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  phoneNumber?: string;
  message?: string;
  className?: string;
}

export function WhatsAppButton({
  href,
  phoneNumber,
  message,
  className,
  ...props
}: WhatsAppButtonProps) {
  const whatsappUrl =
    href ??
    (phoneNumber
      ? `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}${
          message ? `?text=${encodeURIComponent(message)}` : ""
        }`
      : "https://wa.me/");

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={cn(
        "absolute z-30 flex items-center justify-center rounded-[30px] transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shadow-[0_4px_24px_rgba(71,199,86,0.5)]",
        // Fluid responsive sizing:
        // - Mobile (425px): 50x50, radius 30px, padding 10px
        // - Tablet (768px): 50x50, radius 30px, padding 10px
        // - Desktop (1440px): 60x60, radius 30px, padding 12px
        "h-[50px] w-[50px] p-[10px] md:h-[50px] md:w-[50px] md:p-[10px] xl:h-[60px] xl:w-[60px] xl:p-[12px]",
        // Fluid responsive positioning inside design container:
        // - Mobile (425px): top: 9px, left: 355px (right: 20px)
        // - Tablet (768px): top: 9px (481px artboard), left: 668px (right: 50px)
        // - Desktop (1440px): top: 85px, right: 50px (2xl: left: 1330px)
        "top-[9px] right-5 sm:top-[12px] md:top-[9px] md:right-[50px] xl:top-[85px] xl:right-[50px] 2xl:left-[1330px] 2xl:right-auto",
        className
      )}
      {...props}
    >
      <Image
        src="/icons/whatsapp.svg"
        alt="WhatsApp"
        width={60}
        height={60}
        className="h-full w-full object-contain pointer-events-none select-none rounded-[30px]"
        priority
      />
    </a>
  );
}
