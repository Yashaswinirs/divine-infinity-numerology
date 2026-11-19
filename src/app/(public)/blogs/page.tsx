import type { Metadata } from "next";
import Image from "next/image";
import {
  BlogsHero,
  BlogsHeroTransition,
  FeaturedTopicsSection,
  FeaturedReadsSection,
} from "@/components/sections/blogs";
import { CtaBanner } from "@/components/shared";
import { blogsCtaBanner } from "@/data/cta-banner";

export const metadata: Metadata = {
  title: "Blogs | Divine Infinity Numerology",
  description:
    "Explore articles on Numerology, Astrology, Bhrigu Nandi Nadi Astrology, Manifestation, and more.",
};

export default function BlogsPage() {
  return (
    <main className="relative flex min-h-[calc(100vh+1px)] flex-col overflow-x-clip">
      <BlogsHero />
      {/* Fluid blurry transition strip (80px mobile -> 79px tablet -> 95px desktop) bridging BlogsHero into the page gradient */}
      <BlogsHeroTransition />

      {/* Unified page layout with continuous single starry background and seamless gradient */}
      <div className="relative w-full overflow-hidden">
        {/* Continuous Starry Sky spanning across both sections */}
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

        {/* Foreground content sections flow continuously in the single page flow (z-20 above transition) */}
        <div className="relative z-20 flex flex-col">
          <FeaturedTopicsSection />
          <FeaturedReadsSection />
        </div>
      </div>

      {/* Pre-footer Call to Action Section (clean background, no stars) */}
      <CtaBanner data={blogsCtaBanner} />
    </main>
  );
}
