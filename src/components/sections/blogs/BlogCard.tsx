import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib";
import { type BlogPostItem } from "@/data/blogs";

export interface BlogCardProps extends React.HTMLAttributes<HTMLElement> {
  post?: Partial<BlogPostItem>;
  className?: string;
}

/**
 * BlogCard Component
 *
 * Master specs from Figma:
 * - Card Outer: 412px × 445px, rounded-[24px]
 * - Background: linear-gradient(142.94deg, #1D1B4D 0%, #512B58 120.7%)
 * - Padding: pt-[21px] px-[20px] pb-[20px]
 * - Image Box: 373px × 186px, rounded-[16px], bg: rgba(255, 240, 219, 1) (#FFF0DB)
 * - Category Badge: 196px × 34px, rounded-[6px], bg: rgba(65, 63, 133, 1) (#413F85), top: 184px, horizontally centered
 * - Content Box: 373px × 189px, gap: 18px
 *   - Upper text block: 151px, gap: 12px
 *     - Title: Lovelace Text 400, 22.5px / 30.7px, #FFD8A2, 60px height
 *     - Description: Lato 500, 14px / 18.8px, #FFF0DB, 57px height
 *     - Meta row (opacity 0.7, #FFF0DB):
 *       - Date: Lato 400, 12px
 *       - Read Time: Lato 400, 12px
 *   - Read More row: 95px × 20px, gap: 6px
 *     - Text: Lato 700, 14px / 18.8px, #FFD8A2
 *     - Arrow: OOUI arrow-next-ltr, 17px × 13.14px, #FFD8A2
 */
export function BlogCard({ post, className, ...props }: BlogCardProps) {
  const {
    category = "Numerology",
    title = "Understanding the Fundamentals of Numerology",
    description = "Numbers are more than mathematical symbols they carry unique energies that can reveal your personality, strengths, challenges, and life path.",
    date = "May 4, 2026",
    readTime = "7 Mins to Read",
    image,
    href = "#",
  } = post ?? {};

  return (
    <article
      {...props}
      className={cn(
        "blog-card group relative flex w-full max-w-[412px] h-[445px] flex-col justify-between overflow-hidden",
        "rounded-[24px] pt-[21px] px-[20px] pb-[20px]",
        "bg-[linear-gradient(142.94deg,#1D1B4D_0%,#512B58_120.7%)]",
        "transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(29,27,77,0.5)]",
        className
      )}
    >
      {/* 1. Image Container (373px × 186px, rounded 16px, bg #FFF0DB) */}
      <div className="blog-card-img-frame relative w-full h-[186px] shrink-0 overflow-hidden rounded-[16px] bg-[#FFF0DB]">
        {image ? (
          <div className="blog-card-bitmap absolute inset-0">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 373px"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#FFF0DB]">
            <span className="font-lato text-xs font-medium text-[#1D1B4D]/40 uppercase tracking-wider">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* 2. Overlapping Category Badge (Min 196px × 34px on desktop, expands for big words with 1 letter padding on both sides) */}
      <div
        aria-hidden="true"
        className="blog-card-category absolute top-[184px] left-1/2 -translate-x-1/2 z-10 flex h-[34px] min-w-[196px] w-max max-w-[calc(100%-40px)] items-center justify-center rounded-[6px] bg-[#413F85] px-[1ch] shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
      >
        <span className="blog-card-category-text font-lato font-normal text-[22.5px] leading-[30.7px] text-[#ECECEC] tracking-normal text-center whitespace-nowrap">
          {category}
        </span>
      </div>

      {/* 3. Text & Meta Content Container (373px × 189px, gap 18px) */}
      <div className="blog-card-content flex w-full h-[189px] flex-col justify-between">
        {/* Upper text block (151px, gap 12px) */}
        <div className="blog-card-text-group flex w-full flex-col gap-[12px]">
          {/* Title & Description group (125px, gap 8px) */}
          <div className="blog-card-text-block flex w-full flex-col gap-[8px]">
            {/* Title: Lovelace Text 400, 22.5px / 30.7px, #FFD8A2 */}
            <h3
              title={title}
              className="blog-card-heading font-heading font-normal text-[22.5px] leading-[30.7px] text-[#FFD8A2] tracking-normal line-clamp-2 h-[60px]"
            >
              {title}
            </h3>

            {/* Description: Lato 500, 14px / 18.8px, #FFF0DB */}
            <p
              title={description}
              className="blog-card-desc font-lato font-medium text-[14px] leading-[18.8px] text-[#FFF0DB] tracking-normal line-clamp-3 h-[57px]"
            >
              {description}
            </p>
          </div>

          {/* Meta row: Date and Read Time (opacity 0.7, #FFF0DB) */}
          <div className="blog-card-meta flex w-full items-center justify-between text-[#FFF0DB] opacity-70">
            <span className="font-lato font-normal text-[12px] leading-none">
              {date}
            </span>
            <span className="font-lato font-normal text-[12px] leading-none">
              {readTime}
            </span>
          </div>
        </div>

        {/* 4. Action Row: Read More + OOUI arrow (width 95px, height 20px, gap 6px) */}
        <div className="blog-card-action inline-flex items-center gap-[6px] text-[#FFD8A2]">
          <span className="font-lato font-bold text-[14px] leading-[18.8px] text-[#FFD8A2]">
            Read More
          </span>
          <span className="relative flex h-[20px] w-[20px] items-center justify-center">
            {/* OOUI arrow-next-ltr SVG icon */}
            <svg
              width="17"
              height="14"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
            >
              <path
                d="M18 9.80441V11.1964L12.312 17.0794L10.876 15.6894L14.93 11.5004H1V9.50041H14.923L10.876 5.33541L12.31 3.94141L18 9.80441Z"
                fill="#FFD8A2"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Accessible card link */}
      {href && href !== "#" && (
        <Link
          href={href}
          aria-label={`Read more: ${title}`}
          className="blog-card-link absolute inset-0 z-20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD8A2] rounded-[24px]"
        >
          <span className="sr-only">Read more: {title}</span>
        </Link>
      )}
    </article>
  );
}

export default BlogCard;
