import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib";

const badgeVariants = cva(
  // TODO(figma): Verify rounded-full radius against Figma badge designs
  "inline-flex items-center font-medium rounded-full transition-colors select-none",
  {
    variants: {
      variant: {
        primary: "bg-[#675275]/15 text-[#675275] border border-[#675275]/25",
        secondary: "bg-[#faeed4] text-[#1e1633] border border-[#faeed4]",
        // TODO(figma): Verify #734c00 text color against Figma (used for accent contrast)
        accent: "bg-[#ffd795]/25 text-[#734c00] border border-[#ffd795]/50",
        dark: "bg-white/10 text-white border border-white/20",
        outline: "bg-transparent text-inherit border border-current/25",
      },
      size: {
        // TODO(figma): Verify 11px font size & padding for sm badge against Figma
        sm: "px-2.5 py-0.5 text-[11px] gap-1",
        // TODO(figma): Verify 12px font size & padding for md badge against Figma
        md: "px-3.5 py-1 text-xs gap-1.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant,
  size,
  icon,
  children,
  ...props
}) => {
  return (
    <span className={cn(badgeVariants({ variant, size, className }))} {...props}>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

Badge.displayName = "Badge";
