import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib";

const buttonVariants = cva(
  // TODO(figma): Verify rounded-full button border-radius against Figma button components
  "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#8061a5] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        // TODO(figma): Verify hover/active states (#574463, #4a3a54) against Figma interactions
        primary:
          "bg-[#675275] text-white hover:bg-[#574463] active:bg-[#4a3a54] shadow-xs hover:shadow-md",
        // TODO(figma): Verify secondary hover/active states (#f3dfb8, #ebd09d) against Figma
        secondary: "bg-[#faeed4] text-[#1e1633] hover:bg-[#f3dfb8] active:bg-[#ebd09d] shadow-xs",
        // TODO(figma): Verify accent hover/active states (#fcc875, #f6bb57) against Figma
        accent: "bg-[#ffd795] text-[#1e1633] hover:bg-[#fcc875] active:bg-[#f6bb57] shadow-xs",
        // TODO(figma): Verify outline border color #e5dff0 against Figma
        outline:
          "border border-[#e5dff0] bg-transparent text-inherit hover:bg-[#675275]/10 hover:border-[#675275]/30 active:bg-[#675275]/20",
        ghost:
          "bg-transparent text-inherit hover:bg-neutral-100 dark:hover:bg-white/10 active:bg-neutral-200",
        // TODO(figma): Verify dark variant hover/active states (#2b1f47, #161026) against Figma
        dark: "bg-[#1e1633] text-white hover:bg-[#2b1f47] active:bg-[#161026] shadow-xs",
      },
      size: {
        // TODO(figma): Verify button size sm (h-9, 13px, px-4) against Figma specs
        sm: "h-9 px-4 text-[13px] gap-1.5",
        // TODO(figma): Verify button size md (h-11, 15px, px-6) against Figma specs
        md: "h-11 px-6 text-[15px] gap-2",
        // TODO(figma): Verify button size lg (h-13, 16px, px-8) against Figma specs
        lg: "h-13 px-8 text-[16px] gap-2.5",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  href?: string;
  target?: string;
  rel?: string;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      disabled,
      loading = false,
      iconLeft,
      iconRight,
      href,
      target,
      rel,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const content = (
      <>
        {loading && (
          <svg
            className="mr-2 -ml-1 h-4 w-4 animate-spin text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && iconLeft && <span className="inline-flex shrink-0">{iconLeft}</span>}
        <span>{children}</span>
        {!loading && iconRight && <span className="inline-flex shrink-0">{iconRight}</span>}
      </>
    );

    // Link mode
    if (href && !isDisabled) {
      return (
        <Link
          href={href}
          target={target}
          rel={rel}
          className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
