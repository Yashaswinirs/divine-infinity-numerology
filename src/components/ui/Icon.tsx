import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib";

const iconVariants = cva("inline-flex shrink-0 items-center justify-center transition-colors", {
  variants: {
    // TODO(figma): Verify Icon size scale (12px, 16px, 20px, 24px, 32px) against Figma icon components
    size: {
      xs: "w-3 h-3 [&>svg]:w-3 [&>svg]:h-3",
      sm: "w-4 h-4 [&>svg]:w-4 [&>svg]:h-4",
      md: "w-5 h-5 [&>svg]:w-5 [&>svg]:h-5",
      lg: "w-6 h-6 [&>svg]:w-6 [&>svg]:h-6",
      xl: "w-8 h-8 [&>svg]:w-8 [&>svg]:h-8",
    },
    color: {
      default: "text-current",
      primary: "text-[#675275]",
      secondary: "text-[#faeed4]",
      accent: "text-[#ffd795]",
      dark: "text-[#1e1633]",
      muted: "text-[#8c8c8c]",
      light: "text-white",
    },
  },
  defaultVariants: {
    size: "md",
    color: "default",
  },
});

export interface IconProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">, VariantProps<typeof iconVariants> {
  ariaLabel?: string;
}

export const Icon: React.FC<IconProps> = ({
  className,
  size,
  color,
  ariaLabel,
  children,
  ...props
}) => {
  return (
    <span
      className={cn(iconVariants({ size, color, className }))}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
      {...props}
    >
      {children}
    </span>
  );
};

Icon.displayName = "Icon";
