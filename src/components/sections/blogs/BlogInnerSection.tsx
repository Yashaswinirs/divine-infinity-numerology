import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib";
import { manifestationArticleContent } from "@/data/blogs";

export interface BlogInnerSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  imageSrc?: string;
  imageAlt?: string;
  author?: string;
  date?: string;
  paragraphs?: string[];
  children?: React.ReactNode;
  className?: string;
}

/**
 * BlogInnerSection Component
 *
 * Master Figma Specs:
 * - Section Container:
 *   - width: 1440px
 *   - top: 117px (below navbar)
 *   - padding: pt-[60px] pr-[80px] pb-[60px] pl-[80px]
 *   - gap: 40px
 *   - opacity: 1, angle: 0deg
 *   - background: /images/blogs/blogs-inner-page/blog-inner-card-stars.svg
 *
 * - Heading:
 *   - width: 1280px
 *   - height: 48px
 *   - font-family: Lovelace Text, weight: 400
 *   - font-size: 43.95px, line-height: 48px, letter-spacing: 0%
 *   - color: #FFD8A2 (rgba(255, 216, 162, 1))
 *
 * - Below Heading Container:
 *   - width: 1280px
 *   - gap: 110px
 *   - opacity: 1, angle: 0deg
 *
 * - Bordered Sub-block:
 *   - width: 1280px
 *   - gap: 60px
 *   - padding-bottom: 40px
 *   - border-bottom: 1px solid rgba(255, 216, 162, 1) (#FFD8A2)
 *
 * - Inner Featured Image Box (NO border radius at any size):
 *   - Desktop (1440): 1280 × 507
 *   - Tablet (768):   648 × 386
 *   - Mobile (425):   385 × 229
 *   - background: rgba(255, 240, 219, 1) (#FFF0DB)
 *   - image: /images/blogs/blogs-inner-page/blog-slug-image.webp
 *
 * - Paragraphs Layout:
 *   - width: 1280px
 *   - gap: 34px
 *   - Mobile (425):   Lato 500, 14px / 18.8px, letter-spacing: 0%, #FFFFFF
 *   - Tablet (768):   Lato 500, 16px / 22.2px, letter-spacing: 1%, #FFFFFF
 *   - Desktop (1440): Lato 500, 16px / 22.2px, letter-spacing: 1%, #FFFFFF
 *
 * - Meta Row (Author & Date):
 *   - width: 1280px, height: 19px
 *   - justify-content: space-between
 *   - typography: Lato 700 (Bold), 14px / 18.8px, letter-spacing: 0%, color: #FFD8A2
 */
export function BlogInnerSection({
  title = "Manifestation: Turning Intentions into Action",
  imageSrc = "/images/blogs/blogs-inner-page/blog-slug-image.webp",
  imageAlt,
  author = "Teejaswinni Karthikk",
  date = "June 22, 2026",
  paragraphs = manifestationArticleContent,
  children,
  className,
  ...props
}: BlogInnerSectionProps) {
  return (
    <section
      {...props}
      className={cn(
        "relative w-full max-w-[1440px] mx-auto overflow-hidden",
        "flex flex-col gap-[40px]",
        "pt-[42px] lg:pt-[60px] pb-[60px] px-[clamp(20px,5.556vw,80px)]",
        className
      )}
    >
      {/* Background Stars (blog-inner-card-stars.svg) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
      >
        <Image
          src="/images/blogs/blogs-inner-page/blog-inner-card-stars.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      {/* Foreground Content Container (width 1280, gap 40) */}
      <div className="relative z-10 mx-auto w-full max-w-[1280px] flex flex-col gap-[40px]">
        {/* Heading: Lovelace Text 400, 43.95px / 48px, #FFD8A2 */}
        <h1 className="w-full max-w-[1280px] font-heading font-normal text-[#FFD8A2] tracking-normal text-[clamp(1.9rem,1.5rem_+_1.5vw,2.747rem)] leading-[clamp(2.2rem,1.8rem_+_1.5vw,3rem)] lg:text-[43.95px] lg:leading-[48px] lg:min-h-[48px]">
          {title}
        </h1>

        {/* Container below heading: width 1280, gap 110px */}
        <div className="w-full max-w-[1280px] flex flex-col gap-[clamp(40px,7.639vw,110px)]">
          {/* Sub-block: width 1280, gap 60px on desktop, pb 40px on desktop (20px on tablet/mobile), border-b 1px solid #FFD8A2 */}
          <div className="w-full max-w-[1280px] flex flex-col gap-0 lg:gap-[60px] pb-[20px] lg:pb-[40px] border-b border-[#FFD8A2]">
            {/* Featured Image Box (NO border-radius at any screen size)
                Mobile 425: 385 x 229
                Tablet 768: 648 x 386
                Desktop 1440: 1280 x 507 */}
            <div className="relative w-full max-w-[1280px] h-[clamp(14.3125rem,min(2.154rem_+_45.773vw,15.482rem_+_18.006vw),31.6875rem)] overflow-hidden rounded-none bg-[#FFF0DB]">
              <Image
                src={imageSrc}
                alt={imageAlt || title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1440px) 90vw, 1280px"
                className="object-cover object-center"
              />
            </div>

            {/* Paragraphs Layout:
                - Tablet/Mobile: 51px gap from image above (1.5X the 34px paragraph gap)
                - Desktop: lg:mt-0 (gap controlled by lg:gap-[60px] of sub-block) */}
            <div className="w-full max-w-[1280px] flex flex-col gap-[clamp(20px,2.361vw,34px)] mt-[51px] lg:mt-0">
              {paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="w-full max-w-[1280px] font-lato font-medium text-[clamp(0.875rem,0.72rem_+_0.583vw,1rem)] leading-[clamp(1.175rem,0.912rem_+_0.991vw,1.3875rem)] tracking-normal md:tracking-[0.01em] text-white"
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Meta Row: Author & Date (moved 50% closer to the bottom border line on mobile/tablet: pb-[20px]) */}
            <div className="flex w-full max-w-[1280px] h-[19px] items-center justify-between mt-[34px] lg:mt-0">
              <span className="font-lato font-bold text-[14px] leading-[18.8px] text-[#FFD8A2] tracking-normal">
                {author}
              </span>
              <span className="font-lato font-bold text-[14px] leading-[18.8px] text-[#FFD8A2] tracking-normal">
                {date}
              </span>
            </div>

            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogInnerSection;
