"use client";

import * as React from "react";
import { cn } from "@/lib";
import type { BlogCategoryItem, BlogPostItem } from "@/data/blogs";
import { CategoryFilterPills } from "./CategoryFilterPills";
import { BlogCard } from "./BlogCard";

export interface BlogGridWithFilterProps {
  categories: BlogCategoryItem[];
  posts: BlogPostItem[];
  categoriesHeading?: string;
  className?: string;
}

/**
 * BlogGridWithFilter Component
 *
 * Handles category filtering and responsive 3-column card grid display.
 * Server component compliant: encapsulates "use client" solely for filter state.
 */
export function BlogGridWithFilter({
  categories,
  posts,
  categoriesHeading = "Find by Categories",
  className,
}: BlogGridWithFilterProps) {
  const [selectedCategoryId, setSelectedCategoryId] =
    React.useState<string>("all");

  const filteredPosts = React.useMemo(() => {
    if (selectedCategoryId === "all") {
      return posts;
    }
    return posts.filter(
      (post) =>
        post.categoryId.toLowerCase() === selectedCategoryId.toLowerCase() ||
        post.category.toLowerCase() === selectedCategoryId.toLowerCase()
    );
  }, [posts, selectedCategoryId]);

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-[36px] sm:gap-[48px] lg:gap-[66px]",
        className
      )}
    >
      {/* Categories Header & Filter Pills Group */}
      <div className="flex w-full flex-col gap-[20px] lg:gap-[28px]">
        {/* Title Row: Lovelace Text 400 - Mobile 20.91px/100%, Tablet 23.35px/100%, Desktop 28.13px/100% */}
        <div className="flex w-full items-center justify-between pr-5 sm:pr-10 lg:pr-0">
          <h3 className="font-heading font-normal text-[#FFF0DB] tracking-normal text-[clamp(1.307rem,1.118rem_+_0.711vw,1.758rem)] leading-[clamp(1.307rem,1.118rem_+_0.711vw,1.758rem)]">
            {categoriesHeading}
          </h3>
        </div>

        {/* Category Filter Pills (Occupies full screen to the right on mobile/tablet) */}
        <CategoryFilterPills
          categories={categories}
          selectedId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
        />
      </div>

      {/* Blog Cards Grid (3 cards per row on desktop, 412x445) */}
      <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] lg:gap-y-[38px] lg:gap-x-[20px] justify-items-center pr-5 sm:pr-10 lg:pr-0">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <p className="font-lato text-base text-[#FFF0DB]/70">
              No articles found in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogGridWithFilter;

