import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFoundData, type NotFoundData } from "@/data/not-found";
import { cn } from "@/lib";

export interface NotFoundSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  data?: Partial<NotFoundData>;
  className?: string;
}

/**
 * Caret Right Chevron Icon
 */
function CaretRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-3.5 w-3.5 shrink-0", className)}
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

/**
 * NotFoundSection Component
 *
 * FLUID RESPONSIVE SPECIFICATION (Compliant with FLUID_RESPONSIVE_README.md):
 *
 * 1. FIGMA TRUTH ANCHORS:
 *    - Mobile (425px):
 *      Frame 425 x 674, top padding: 110px (-30% gap below navbar)
 *      Heading: 385 x 138, Lovelace 400, 36.72px / 46px, text-align: center, #FFD8A2
 *      Background 404 Image: 385 x 214 (aspect ratio 1.8:1), transform: translateY(20px) scale(1.2)
 *      Spacer to bottom block: 269px
 *      Bottom block: 385 x 190
 *        Subtitle: 385 x 42, Lato 400, 17.33px / 100%, text-align: center, #ECECEC
 *        Buttons (stacked): 326 x 104, gap: 20px, button height: 42px
 *    - Tablet (768px):
 *      Frame 768 x 750, top padding: 120px (-30% gap below navbar)
 *      Heading: 574 x 110, Lovelace 400, 42.87px / 55px, text-align: center, #FFD8A2
 *      Background 404 Image: 648 x 360 (aspect ratio 1.8:1), transform: translateY(60px) scale(1.1)
 *      Spacer to bottom block: 392px
 *      Bottom block: 587 x 111
 *        Subtitle: 587 x 23, Lato 400, 19.08px / 100%, #ECECEC
 *        Buttons (side-by-side): 409 x 44, gap: 16px, button height: 44px
 *    - Desktop Master (1440px):
 *      Frame 1440 x 954.46, top padding: 176px (11rem)
 *      Heading: 1090 x 71, top: 176px, left: 175px, Lovelace 400, 54.93px / 70.4px, #FFD8A2
 *      Background 404 Image: 742 x 465, transform: translateY(42px) scale(1.0)
 *      Spacer to bottom block: 456px
 *      Bottom block: 692 x 133, top: 703px, left: 355px, gap: 54px
 *        Subtitle: 692 x 31, Lato 400, 22.5px / 30.7px, #ECECEC
 *        Buttons (side-by-side): 409 x 48, gap: 16px, button height: 48px
 *
 * 2. MATHEMATICAL FORMULAS (425 -> 768 -> 1440):
 *    - Padding Top (-30% gap on Mobile & Tablet): 110px -> 120px -> 176px
 *      Slow -> Fast: clamp(6.875rem,max(6.101rem_+_2.915vw,3.5rem_+_8.333vw),11rem)
 *    - Padding Bottom: 37px -> 69px -> 118.5px
 *      Fast -> Slow: clamp(2.313rem,min(-0.166rem_+_9.33vw,0.775rem_+_7.37vw),7.406rem)
 *    - Side Padding: 20px -> 60px -> 175px
 *      Slow -> Fast: clamp(1.25rem,max(-1.848rem_+_11.662vw,-4.464rem_+_17.113vw),10.938rem)
 *    - Heading Font Size: 36.72px -> 42.87px -> 54.93px (slope ~0.01794)
 *      Single Line: clamp(2rem,1.818rem_+_1.794vw,3.433rem)
 *    - Heading Line Height: 46px -> 55px -> 70.4px
 *      Fast -> Slow: clamp(2.5rem,min(2.178rem_+_2.624vw,2.338rem_+_2.292vw),4.4rem)
 *    - Heading Box Max Width: 385px -> 574px -> 1090px
 *      Slow -> Fast: clamp(24.063rem,max(9.426rem_+_55.102vw,-0.982rem_+_76.786vw),68.125rem)
 *    - Visual Spacer Height: 269px -> 392px -> 456px
 *      Fast -> Slow: clamp(12rem,min(7.288rem_+_35.86vw,19.93rem_+_9.52vw),28.5rem)
 *    - Background 404 Image Base Width: 385px -> 648px -> 742px
 *      Fast -> Slow: clamp(18rem,min(3.695rem_+_76.676vw,33.786rem_+_13.988vw),46.375rem)
 *    - Subtitle Font Size: 17.33px -> 19.08px -> 22.5px (slope ~0.00509)
 *      Single Line: clamp(1.05rem,0.948rem_+_0.509vw,1.406rem)
 *    - Subtitle Line Height: 21px -> 23px -> 30.7px
 *      Slow -> Fast: clamp(1.313rem,max(1.158rem_+_0.583vw,0.888rem_+_1.146vw),1.919rem)
 *    - Subtitle Box Max Width: 385px -> 587px -> 692px
 *      Fast -> Slow: clamp(24.063rem,min(8.419rem_+_58.892vw,29.188rem_+_15.625vw),43.25rem)
 *    - Subtitle to Buttons Gap: 44px -> 44px -> 54px
 *      Slow -> Fast: clamp(2.75rem,max(2.75rem,2.036rem_+_1.488vw),3.375rem)
 *    - Button Height: 42px -> 44px -> 48px (slope ~0.0059)
 *      Single Line: clamp(2.625rem,2.468rem_+_0.591vw,3rem)
 */
export function NotFoundSection({
  data: propData,
  className,
  ...props
}: NotFoundSectionProps) {
  const data: NotFoundData = {
    ...notFoundData,
    ...propData,
    image: {
      ...notFoundData.image,
      ...propData?.image,
    },
    coursesButton: {
      ...notFoundData.coursesButton,
      ...propData?.coursesButton,
    },
    consultationButton: {
      ...notFoundData.consultationButton,
      ...propData?.consultationButton,
    },
  };

  return (
    <section
      {...props}
      aria-label="404 Page Not Found"
      className={cn(
        // Outer section: Master fluid container mapping 425px (674px) -> 768px (750px) -> 1440px (954.5px)
        // Background gradient tilted anticlockwise by 45deg (180deg - 45deg = 135deg) exclusively for 404 page
        "relative w-full overflow-hidden bg-[linear-gradient(135deg,var(--color-gradient-stop-1),var(--color-gradient-stop-2),var(--color-gradient-stop-3),var(--color-gradient-stop-4),var(--color-gradient-stop-5))] select-none",
        "min-h-[clamp(42.125rem,max(36.239rem_+_22.157vw,32.271rem_+_30.426vw),59.654rem)]",
        // Reduced gap below navbar by 30% on Tablet and Mobile
        "pt-[clamp(6.875rem,max(6.101rem_+_2.915vw,3.5rem_+_8.333vw),11rem)]",
        "pb-[clamp(2.313rem,min(-0.166rem_+_9.33vw,0.775rem_+_7.37vw),7.406rem)]",
        "px-[clamp(1.25rem,max(-1.848rem_+_11.662vw,-4.464rem_+_17.113vw),10.938rem)]",
        "flex flex-col items-center justify-between text-center",
        className
      )}
    >
      {/* 1. Background Starry Sky (consistent with Blogs and Horoscope pages) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
      >
        <Image
          src="/images/blogs/blogs-stars.svg"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-top opacity-70"
        />
      </div>

      {/* 2. Background 404 Artwork Layer (Independent of text flow, GPU-transformed) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden select-none"
      >
        <div
          className={cn(
            "relative flex items-center justify-center will-change-transform origin-center",
            // Verified transform coordinates across viewports:
            // Mobile: translateY(20px) scale(1.2)
            // Tablet: translateY(60px) scale(1.1)
            // Desktop: translateY(42px) scale(1.0)
            "translate-y-[20px] scale-[1.2]",
            "md:translate-y-[60px] md:scale-[1.1]",
            "lg:translate-y-[42px] lg:scale-100"
          )}
        >
          <Image
            src={data.image.src}
            alt=""
            width={742}
            height={465}
            priority
            sizes="(max-width: 640px) 385px, (max-width: 1024px) 648px, 742px"
            style={{ height: "auto" }}
            className={cn(
              "h-auto object-contain select-none pointer-events-none",
              // Fluid base width matching Figma anchors:
              // 385px @425 -> 648px @768 -> 742px @1440
              "w-[clamp(18rem,min(3.695rem_+_76.676vw,33.786rem_+_13.988vw),46.375rem)]"
            )}
          />
        </div>
      </div>

      {/* 3. Main Foreground Content Flow: Heading -> Spacer -> Subtitle & Buttons */}
      <div className="relative z-10 mx-auto flex w-full flex-col items-center">
        {/* Main Heading: 385x138 @425 -> 574x110 @768 -> 1090x71 @1440 */}
        <h1
          className={cn(
            "w-full max-w-[clamp(24.063rem,max(9.426rem_+_55.102vw,-0.982rem_+_76.786vw),68.125rem)]",
            "font-heading font-normal text-[#FFD8A2] tracking-normal text-center m-0",
            "text-[clamp(2rem,1.818rem_+_1.794vw,3.433rem)]",
            "leading-[clamp(2.5rem,min(2.178rem_+_2.624vw,2.338rem_+_2.292vw),4.4rem)]"
          )}
        >
          {data.heading}
        </h1>

        {/* Visual spacer corresponding to background 404 artwork placement */}
        <div
          aria-hidden="true"
          className="w-full pointer-events-none select-none h-[clamp(12rem,min(7.288rem_+_35.86vw,19.93rem_+_9.52vw),28.5rem)]"
        />

        {/* Bottom Content Block: Subtitle + Action Buttons (385x190 @425 -> 587x111 @768 -> 692x133 @1440) */}
        <div
          className={cn(
            "relative z-20 w-full flex flex-col items-center text-center",
            "max-w-[clamp(24.063rem,min(8.419rem_+_58.892vw,29.188rem_+_15.625vw),43.25rem)]",
            "gap-[clamp(2.75rem,max(2.75rem,2.036rem_+_1.488vw),3.375rem)]"
          )}
        >
          {/* Subtitle: 385x42 @425 -> 587x23 @768 -> 692x31 @1440 */}
          <p
            className={cn(
              "w-full max-w-[clamp(24.063rem,min(8.419rem_+_58.892vw,29.188rem_+_15.625vw),43.25rem)]",
              "font-sans font-normal text-[#ECECEC] tracking-normal text-center m-0",
              "text-[clamp(1.05rem,0.948rem_+_0.509vw,1.406rem)]",
              "leading-[clamp(1.313rem,max(1.158rem_+_0.583vw,0.888rem_+_1.146vw),1.919rem)]"
            )}
          >
            {data.subtitle}
          </p>

          {/* Action Buttons: Stacked 326x104 (gap 20px) on mobile -> Side-by-side 409x44/48 (gap 16px) on tablet/desktop */}
          <div className="flex w-full max-w-[326px] md:max-w-[409px] flex-col md:flex-row items-center justify-center gap-[20px] md:gap-[16px]">
            {/* Button 1: Explore Courses (transparent outline + circular badge) */}
            <Link
              href={data.coursesButton.href}
              className={cn(
                "inline-flex w-full md:w-auto items-center justify-center rounded-[50px]",
                "h-[clamp(2.625rem,2.468rem_+_0.591vw,3rem)]",
                "border border-[#FFD8A2] bg-transparent pl-[22px] pr-[10px] gap-[10px]",
                "font-lato font-bold text-[15px] md:text-[16px] leading-none tracking-normal text-[#FFD8A2]",
                "hover:bg-[#FFD8A2]/10 active:scale-[0.98]",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD8A2]",
                "transition-[background-color,border-color,transform] duration-150 cursor-pointer text-center whitespace-nowrap shrink-0"
              )}
            >
              <span>{data.coursesButton.label}</span>
              <span
                aria-hidden="true"
                className="flex h-[28px] w-[28px] md:h-[30px] md:w-[30px] shrink-0 items-center justify-center rounded-full bg-[#FFD8A2] text-[#655373]"
              >
                <CaretRightIcon className="text-[#655373]" />
              </span>
            </Link>

            {/* Button 2: Book a Consultation (filled #FFD8A2 + circular badge) */}
            <Link
              href={data.consultationButton.href}
              className={cn(
                "inline-flex w-full md:w-auto items-center justify-center rounded-[50px]",
                "h-[clamp(2.625rem,2.468rem_+_0.591vw,3rem)]",
                "bg-[#FFD8A2] pl-[22px] pr-[10px] gap-[10px]",
                "font-lato font-bold text-[15px] md:text-[16px] leading-none tracking-normal text-[#655373]",
                "hover:brightness-105 active:scale-[0.98]",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD8A2]",
                "transition-[filter,transform] duration-150 cursor-pointer text-center whitespace-nowrap shrink-0"
              )}
            >
              <span>{data.consultationButton.label}</span>
              <span
                aria-hidden="true"
                className="flex h-[28px] w-[28px] md:h-[30px] md:w-[30px] shrink-0 items-center justify-center rounded-full bg-[#655373] text-[#FFD8A2]"
              >
                <CaretRightIcon className="text-[#FFD8A2]" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFoundSection;
