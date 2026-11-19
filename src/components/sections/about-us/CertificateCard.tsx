import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib";
import { type CertificateCardItem } from "@/data/certificates";

export interface CertificateCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  item?: CertificateCardItem;
  className?: string;
  children?: React.ReactNode;
}

/**
 * CertificateCard Component
 *
 * FIGMA ANCHORS (angle 0deg, opacity 1):
 * - Mobile  (425px):  Card: 385 x 434.6 | Padding X/Y: 15/20 | Radius: 12 | Image: 354 x 249.6 (aspect ~520/367) | Gap img-text: 10 | Gap title-desc: 4 | Title: 19.08/23.3 | Desc: 16/22.2
 * - Tablet  (768px):  Card: 314 x 383   | Padding X/Y: 10/20 | Radius: 12 | Image: 282 x 198   (aspect ~520/367) | Gap img-text: 16 | Gap title-desc: 6 | Title: 19.08/23.3 | Desc: 14/19.5
 * - Desktop (1440px): Card: 585.5 x 534 | Padding X/Y: 30/30 | Radius: 24 | Image: 520 x 367   (aspect ~520/367) | Gap img-text: 20 | Gap title-desc: 12 | Title: 22.5/30.7  | Desc: 16/22.2
 *
 * FLUID FORMULAS (V-shaped = max(lineDown, lineUp) with min() mobile cap; hits all 3 Figma anchors with zero breakpoint jumps):
 * - --card-w: min(36.59375rem, max(min(24.0625rem, 29.561rem - 20.7vw), 0.232rem + 40.4vw))
 *   Interpolates card width V-shape: 385px @425px -> 314px @768px -> 585.5px @1440px.
 * - --img-w: min(32.5rem, max(min(22.125rem, 27.701rem - 20.99vw), 0.625rem + 35.42vw))
 *   Interpolates image/text container width V-shape: 354px @425px -> 282px @768px -> 520px @1440px.
 * - Card min-height: min(33.375rem, max(min(27.1625rem, 31.159rem - 15.044vw), 13.152rem + 22.47vw))
 *   Interpolates minimum card height V-shape: 434.6px @425px -> 383px @768px -> 534px @1440px.
 * - Card px: min(1.875rem, max(min(0.9375rem, 1.3247rem - 1.4577vw), -0.8036rem + 2.976vw))
 *   Interpolates horizontal padding V-shape: 15px @425px -> 10px @768px -> 30px @1440px.
 * - Card py: clamp(1.25rem, 0.536rem + 1.488vw, 1.875rem)
 *   Interpolates vertical padding: 20px @425px and @768px -> 30px @1440px.
 * - Card gap (img to text): clamp(0.625rem, min(0.1604rem + 1.749vw, 0.7143rem + 0.595vw), 1.25rem)
 *   Interpolates card internal gap: 10px @425px -> 16px @768px -> 20px @1440px.
 * - Card rounded: clamp(0.75rem, -0.107rem + 1.786vw, 1.5rem)
 *   Interpolates corner radius: 12px @425px and @768px -> 24px @1440px.
 * - Text block gap (title to desc): clamp(0.25rem, max(0.0951rem + 0.583vw, -0.0536rem + 0.893vw), 0.75rem)
 *   Interpolates gap between title and description: 4px @425px -> 6px @768px -> 12px @1440px.
 * - Title size & line: text-[clamp(1.1925rem,0.948rem_+_0.509vw,1.40625rem)] leading-[clamp(1.45625rem,0.928rem_+_1.101vw,1.91875rem)]
 *   Keeps 19.08px / 23.3px up to 768px, then smoothly expands to 22.5px / 30.7px at 1440px.
 * - Description size & line: text-[clamp(0.875rem,max(1.1549rem_-_0.5831vw,0.732rem_+_0.298vw),1rem)] leading-[clamp(1.21875rem,max(1.5966rem_-_0.7872vw,1.0259rem_+_0.4018vw),1.3875rem)]
 *   Interpolates description font size & line-height V-shape: 16px/22.2px @425px -> 14px/19.5px @768px -> 16px/22.2px @1440px.
 * - Fallback watermark: circle size-[clamp(2.5rem,2.29rem_+_0.788vw,3rem)], icon size-[clamp(1.25rem,1.145rem_+_0.394vw,1.5rem)], text-[clamp(0.75rem,0.6977rem_+_0.197vw,0.875rem)]
 */
export function CertificateCard({
  item,
  className,
  children,
  ...props
}: CertificateCardProps) {
  const title = item?.title ?? "Professional Numerology Certification";
  const description =
    item?.description ??
    "Academy of Vedic Vidya, under Arviend Sud, a Numerologist and Vaastu expert with over 25 years of experience.";
  const imageSrc = item?.image;
  const imageAlt = item?.imageAlt ?? title;

  return (
    <article
      className={cn(
        "relative flex flex-col items-center justify-start text-left",
        "[--card-w:min(36.59375rem,max(min(24.0625rem,29.561rem_-_20.7vw),0.232rem_+_40.4vw))]",
        "[--img-w:min(32.5rem,max(min(22.125rem,27.701rem_-_20.99vw),0.625rem_+_35.42vw))]",
        "w-[var(--card-w)] max-w-full",
        "min-h-[min(33.375rem,max(min(27.1625rem,31.159rem_-_15.044vw),13.152rem_+_22.47vw))]",
        "px-[min(1.875rem,max(min(0.9375rem,1.3247rem_-_1.4577vw),-0.8036rem_+_2.976vw))]",
        "py-[clamp(1.25rem,0.536rem_+_1.488vw,1.875rem)]",
        "gap-[clamp(0.625rem,min(0.1604rem_+_1.749vw,0.7143rem_+_0.595vw),1.25rem)]",
        "rounded-[clamp(0.75rem,-0.107rem_+_1.786vw,1.5rem)]",
        "border-[0.5px] border-[#5F1BB7]",
        "bg-[linear-gradient(142.94deg,#1D1B4D_0%,#512B58_120.7%)]",
        "shadow-[0px_4px_24px_0px_rgba(85,81,255,0.25)]",
        "transition-[box-shadow,border-color] duration-300",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          {/* 1. Certificate Image Container (Mobile: 354x249.6px, Tablet: 282x198px, Desktop: 520x367px, Aspect: 520/367) */}
          <div
            className={cn(
              "relative mx-auto flex w-[var(--img-w)] max-w-full aspect-[520/367] h-auto shrink-0 items-center justify-center overflow-hidden rounded-[1rem] border-[4px] border-[#806398] bg-[#1D1B4D]/60"
            )}
          >
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 354px, 520px"
                className="object-cover object-center"
              />
            ) : null}

            {/* Subtle certificate watermark fallback backdrop */}
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 text-center",
                imageSrc ? "-z-10" : "z-0"
              )}
            >
              <div className="flex size-[clamp(2.5rem,2.29rem_+_0.788vw,3rem)] items-center justify-center rounded-full border border-[#FFD8A2]/30 bg-[#FFF0DB]/10 text-[#FFD8A2]">
                <svg
                  className="size-[clamp(1.25rem,1.145rem_+_0.394vw,1.5rem)] text-[#FFD8A2]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 15l-2 5l4-2l4 2l-2-5" />
                  <circle cx="12" cy="9" r="6" />
                </svg>
              </div>
              <span className="font-heading text-[clamp(0.75rem,0.6977rem_+_0.197vw,0.875rem)] text-[#FFD8A2]/80">
                {title}
              </span>
            </div>
          </div>

          {/* 2. Text Content Block (Exact same width as image, left-aligned) */}
          <div className="mx-auto flex w-[var(--img-w)] max-w-full flex-col items-start justify-start text-left gap-[clamp(0.25rem,max(0.0951rem_+_0.583vw,-0.0536rem_+_0.893vw),0.75rem)]">
            {/* Title: Lovelace Text 400, Mobile & Tablet (19.08px / 23.3px) -> Desktop (22.5px / 30.7px) */}
            <h3 className="font-heading font-normal tracking-normal text-[#FFD8A2] text-left text-[clamp(1.1925rem,0.948rem_+_0.509vw,1.40625rem)] leading-[clamp(1.45625rem,0.928rem_+_1.101vw,1.91875rem)]">
              {title}
            </h3>

            {/* Description: Lato 500, V-shaped (16px / 22.2px -> 14px / 19.5px -> 16px / 22.2px) */}
            <p className="font-lato font-medium tracking-[0.01em] text-[#ECECEC] text-left text-[clamp(0.875rem,max(1.1549rem_-_0.5831vw,0.732rem_+_0.298vw),1rem)] leading-[clamp(1.21875rem,max(1.5966rem_-_0.7872vw,1.0259rem_+_0.4018vw),1.3875rem)]">
              {description}
            </p>
          </div>
        </>
      )}
    </article>
  );
}
