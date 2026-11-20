import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib";
import { SectionOrnament } from "@/components/shared/SectionOrnament";
import { featuredReadsData, type FeaturedReadsData } from "@/data/blogs";
import { BlogCard } from "./BlogCard";

export interface FeaturedReadsSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  data?: Partial<FeaturedReadsData>;
  showStars?: boolean;
  className?: string;
}

/**
 * FeaturedReadsSection
 *
 * Master Section specs:
 * - Outer Frame: 1440px wide, 771px high, padding: 60px 80px (fluid px-5 sm:px-10 lg:px-20 py-10 lg:py-[60px])
 * - Inner Layout: 1280px wide, 651px high, gap: 57px
 * - Header: SectionOrnament + H2 Lovelace 43.95px ("Featured Reads" / "You May Also Like") + Subtitle Lato 18px
 * - Cards: 3 cards row (1280px × 445px shell), first 3 cards from blogs
 */
export function FeaturedReadsSection({
  data: propData,
  showStars = false,
  className,
  ...props
}: FeaturedReadsSectionProps) {
  const data: FeaturedReadsData = {
    ...featuredReadsData,
    ...propData,
    posts: propData?.posts ?? featuredReadsData.posts,
  };

  return (
    <section
      {...props}
      id="featured-reads"
      aria-labelledby="featured-reads-title"
      className={cn(
        "relative w-full overflow-hidden",
        "px-5 sm:px-10 md:px-[60px] lg:px-20 py-10 lg:py-[60px]",
        className
      )}
    >
      {/* Background Stars (blogs-stars.svg) */}
      {showStars && (
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
            className="object-cover object-top"
          />
        </div>
      )}

      {/* Main Inner Container (1280px × 651px, gap 57px) */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col gap-[40px] sm:gap-[48px] lg:gap-[57px]">
        {/* Header Block (956px max, gap 15px) */}
        <div className="mx-auto flex w-full max-w-[956px] flex-col items-center text-center gap-[15px]">
          {/* Gold Flourish Ornament (363px × 29.63px across mobile/tablet/desktop, fluid on small mobile) */}
          <SectionOrnament
            className="justify-center w-[min(363px,calc(100vw-40px))] max-w-[363px] md:w-[363px]"
            imageClassName="w-[min(363px,calc(100vw-40px))] max-w-[363px] md:w-[363px] h-[clamp(24px,calc((100vw-40px)*(29.63/363)),29.63px)]"
          />

          {/* Heading: Lovelace Text 400 - Mobile 30.43px/38px, Tablet 35px/35px (100%), Desktop 43.95px/48px */}
          <h2
            id="featured-reads-title"
            className={cn(
              "font-heading font-normal text-[#FFD8A2] tracking-normal",
              "text-[clamp(1.902rem,1.548rem_+_1.332vw,2.747rem)]",
              "leading-[clamp(2.188rem,max(min(2.375rem,2.607rem_-_0.875vw),1.259rem_+_1.935vw),3rem)]"
            )}
          >
            {data.heading}
          </h2>

          {/* Subtitle: Lato 500 - Mobile 16px/22.2px (385px max), Tablet/Desktop 18px/22.6px (648px -> 956px max) */}
          <p
            className={cn(
              "font-lato font-medium text-[#ECECEC] text-center",
              "w-full max-w-[clamp(24.063rem,min(3.695rem_+_76.68vw,18.5rem_+_45.83vw),59.75rem)]",
              "text-[clamp(1rem,0.845rem_+_0.583vw,1.125rem)]",
              "leading-[clamp(1.3875rem,1.357rem_+_0.117vw,1.4125rem)]",
              "tracking-[clamp(0em,calc(0.0223em_-_0.0029vw),0.01em)]"
            )}
          >
            {data.subtitle}
          </p>
        </div>

        {/* 3 Cards Carousel / Grid:
            - Desktop (>= 1024px): 3 static cards grid in 1280px shell (412px each)
            - Tablet (768px - 1023px): Horizontal carousel (starts with 60px margin, scrolls edge-to-edge)
            - Mobile (< 768px): Horizontal carousel (starts with 20px margin, scrolls edge-to-edge)
        */}
        <div
          role="region"
          aria-label="Featured reads carousel"
          tabIndex={0}
          className={cn(
            "blog-carousel flex w-auto overflow-x-auto scroll-smooth snap-x snap-proximity scrollbar-none touch-pan-x",
            "-mx-5 sm:-mx-10 md:-mx-[60px] lg:mx-0",
            "px-0",
            "gap-[16px] md:gap-[20px] pb-4 pt-1",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFD8A2]/40",
            "lg:grid lg:w-full lg:grid-cols-3 lg:gap-y-[38px] lg:gap-x-[20px] lg:overflow-visible lg:p-0 lg:justify-items-center"
          )}
        >
          {data.posts.map((post, idx) => (
            <BlogCard
              key={post.id}
              post={post}
              className={cn(
                "shrink-0 snap-start lg:shrink lg:snap-align-none",
                idx === 0 &&
                  "ml-5 sm:ml-10 md:ml-[60px] lg:ml-0 scroll-ml-5 sm:scroll-ml-10 md:scroll-ml-[60px] lg:scroll-ml-0",
                idx === data.posts.length - 1 &&
                  "mr-5 sm:mr-10 md:mr-[60px] lg:mr-0"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedReadsSection;
