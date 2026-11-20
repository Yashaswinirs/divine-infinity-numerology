"use client";

import * as React from "react";
import { cn } from "@/lib";
import type { BlogCategoryItem } from "@/data/blogs";

export interface CategoryFilterPillsProps {
  categories: BlogCategoryItem[];
  selectedId?: string;
  defaultSelected?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

/**
 * CategoryFilterPills Component
 *
 * Dev Mode Specs:
 * - Height: 51px
 * - Border-radius: 30px
 * - Active: bg: rgba(101, 83, 115, 1) (#655373), border: 1px solid rgba(255, 216, 162, 1) (#FFD8A2)
 * - Inactive: border: 1px solid rgba(255, 216, 162, 1) (#FFD8A2)
 * - Text: Lato 400 22.5px / 30.7px (#FFD8A2)
 * - Count: Lato 500 14px / 18.8px (#FFD8A2), aligned on baseline
 * - Gap: 20px
 */
export function CategoryFilterPills({
  categories,
  selectedId: controlledSelectedId,
  defaultSelected = "all",
  onSelect,
  className,
}: CategoryFilterPillsProps) {
  const [internalSelectedId, setInternalSelectedId] =
    React.useState(defaultSelected);

  const activeId =
    controlledSelectedId !== undefined
      ? controlledSelectedId
      : internalSelectedId;

  const handleSelect = (id: string) => {
    if (controlledSelectedId === undefined) {
      setInternalSelectedId(id);
    }
    onSelect?.(id);
  };

  return (
    <div
      role="tablist"
      aria-label="Blog Categories"
      className={cn(
        "flex w-full items-center gap-[clamp(0.938rem,0.593rem_+_0.744vw,1.25rem)] overflow-x-auto pb-2 scrollbar-none",
        className
      )}
    >
      {categories.map((cat) => {
        const isActive = cat.id === activeId;
        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => handleSelect(cat.id)}
            className={cn(
              "inline-flex h-[clamp(2.625rem,1.982rem_+_1.339vw,3.188rem)] shrink-0 items-center justify-center rounded-[30px] border px-[18px] sm:px-5 py-0",
              "transition-all duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD8A2]",
              isActive
                ? "bg-[#655373] border-[#FFD8A2] shadow-sm"
                : "bg-transparent border-[#FFD8A2] hover:bg-[#655373]/30"
            )}
          >
            <span className="inline-flex items-baseline gap-[6px] text-center">
              <span className="font-lato font-normal text-[clamp(1.083rem,0.948rem_+_0.51vw,1.406rem)] leading-none text-[#FFD8A2] tracking-normal whitespace-nowrap text-center">
                {cat.name}
              </span>
              <span className="font-lato font-normal text-[12px] leading-none text-[#FFD8A2] tracking-normal align-bottom text-center">
                ({cat.count})
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default CategoryFilterPills;
