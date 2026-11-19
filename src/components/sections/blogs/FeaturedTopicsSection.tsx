import * as React from "react";
import { cn } from "@/lib";
import { SectionOrnament } from "@/components/shared/SectionOrnament";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { featuredTopicsData, type FeaturedTopicsData } from "@/data/blogs";
import { BlogGridWithFilter } from "./BlogGridWithFilter";

export interface FeaturedTopicsSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  data?: Partial<FeaturedTopicsData>;
  className?: string;
}

/**
 * FeaturedTopicsSection
 *
 * Master Section specs:
 * - Outer Frame: 1440px wide, padding: 60px 80px (fluid px-5 sm:px-10 lg:px-20 py-10 lg:py-[60px])
 * - Inner Layout: 1280px wide, gap: 57px
 * - Header: 956px wide, gap 15px (Ornament + H2 Lovelace 43.95px + Subtitle Lato 18px)
 * - Categories: "Find by Categories" (Lovelace 28.13px) + Filter Pills (51px height, #655373 / #FFD8A2)
 * - Cards: 3 cards grid, 412px × 445px shell, radius 24px, gradient #1D1B4D -> #512B58
 */
export function FeaturedTopicsSection({
  data: propData,
  className,
  ...props
}: FeaturedTopicsSectionProps) {
  const data: FeaturedTopicsData = {
    ...featuredTopicsData,
    ...propData,
    categories: propData?.categories ?? featuredTopicsData.categories,
    posts: propData?.posts ?? featuredTopicsData.posts,
  };

  return (
    <section
      {...props}
      id="blogs-list"
      aria-labelledby="featured-topics-title"
      className={cn(
        "relative z-20 w-full",
        "pl-5 sm:pl-10 lg:pl-20 pr-0 lg:pr-20 py-10 lg:py-[60px]",
        className
      )}
    >
      {/* Floating WhatsApp Button (Foreground above transition) */}
      <WhatsAppButton className="z-30" />

      {/* Main Inner Container (1280px) */}
      <div className="relative z-20 mx-auto flex w-full max-w-[1280px] flex-col gap-[40px] sm:gap-[48px] lg:gap-[57px]">
        {/* Header Block (956px) - Padded on right to preserve center alignment */}
        <div className="relative z-20 mx-auto flex w-full max-w-[956px] flex-col items-center text-center gap-[15px] pr-5 sm:pr-10 lg:pr-0">
          {/* Gold Flourish Ornament (363px × 29.63px across mobile/tablet/desktop, fluid on small mobile) */}
          <SectionOrnament
            className="relative z-20 justify-center w-[min(363px,calc(100vw-40px))] max-w-[363px] md:w-[363px]"
            imageClassName="w-[min(363px,calc(100vw-40px))] max-w-[363px] md:w-[363px] h-[clamp(24px,calc((100vw-40px)*(29.63/363)),29.63px)]"
          />

          {/* Heading: Lovelace Text 400 - Mobile 30.43px/38px, Tablet 35px/35px (100%), Desktop 43.95px/48px */}
          <h2
            id="featured-topics-title"
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
            {data.subtitle.includes("topics that") ? (
              <>
                Find articles based on the topics that{" "}
                <br className="md:hidden" />
                interest you.
              </>
            ) : (
              data.subtitle
            )}
          </p>
        </div>

        {/* Interactive Categories Filter & Blog Cards Grid */}
        <BlogGridWithFilter
          categories={data.categories}
          posts={data.posts ?? []}
          categoriesHeading={data.categoriesHeading}
        />
      </div>
    </section>
  );
}

export default FeaturedTopicsSection;

