import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib";
import { ArrowCircle } from "@/components/shared/ArrowCircle";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FFD8A2] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-[#675275] text-white hover:bg-[#574463] active:bg-[#4a3a54] shadow-xs hover:shadow-md",
        secondary:
          "bg-[#806398] text-[#FFD8A2] hover:brightness-105 active:scale-[0.98] shadow-xs",
        accent:
          "bg-[#FFD8A2] text-[#655373] hover:brightness-105 active:scale-[0.98] font-lato font-bold shadow-xs",
        outline:
          "border border-[#FFD8A2] bg-transparent text-[#FFD8A2] hover:bg-[#FFD8A2]/10 active:bg-[#FFD8A2]/20 font-lato font-bold",
        "outline-accent":
          "border border-[#FFD8A2] bg-transparent text-[#FFD8A2] hover:bg-[#FFD8A2]/10 active:bg-[#FFD8A2]/20 font-lato font-bold",
        ghost:
          "bg-transparent text-inherit hover:bg-neutral-100 dark:hover:bg-white/10 active:bg-neutral-200",
        dark: "bg-[#1e1633] text-white hover:bg-[#2b1f47] active:bg-[#161026] shadow-xs",
        footer:
          "bg-[#FFF1D6] text-[#5A2A5D] hover:bg-[#FFD8A2] active:bg-[#FFCF87] font-['Satoshi',sans-serif] font-bold shadow-xs",
        cream:
          "bg-[#FFF1D6] text-[#5A2A5D] hover:bg-[#FFD8A2] active:bg-[#FFCF87] font-['Satoshi',sans-serif] font-bold shadow-xs",
        zodiac:
          "bg-[#FFD8A2] text-[#655373] hover:brightness-105 active:scale-[0.98] font-lato font-bold text-[16px] leading-none tracking-normal shadow-xs focus-visible:ring-[#FFD8A2]",
      },
      size: {
        sm: "h-9 px-4 text-[13px] gap-1.5",
        md: "h-11 px-6 text-[15px] gap-2",
        lg: "h-13 px-8 text-[16px] gap-2.5",
        pill: "h-[48px] px-6 gap-[10px] rounded-[50px] text-[16px] leading-none whitespace-nowrap",
        footer:
          "h-[35px] w-[145px] max-w-full px-4 text-[14px] leading-none gap-2.5 rounded-[50px]",
        zodiac:
          "h-[38px] w-[172px] max-w-full px-[10px] py-[10px] gap-[10px] rounded-[10px] text-[16px] leading-none",
        hero: "h-10 gap-2.5 px-2.5 type-btn-large font-bold whitespace-nowrap xl:h-12",
        nav: "h-10 min-w-22 gap-2.5 px-6 type-body-small font-bold md:min-w-28.25 lg:h-[clamp(34.13px,3.333vw,48px)] lg:min-w-[clamp(97.41px,9.514vw,137px)] lg:px-[clamp(17.06px,1.667vw,24px)] lg:text-[clamp(12px,1.111vw,16px)]",
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
  arrow?: boolean | "dark" | "primary" | "accent" | "purple-white" | "gold-purple";
  arrowSize?: 24 | 28 | 30;
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
      arrow,
      arrowSize,
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

    // Resolve right icon: if arrow is requested, choose the right tone automatically
    let renderedIconRight = iconRight;
    if (!renderedIconRight && arrow) {
      let tone: "dark" | "primary" | "accent" | "purple-white" | "gold-purple" = "primary";
      if (typeof arrow === "string") {
        tone = arrow;
      } else if (variant === "accent" || variant === "zodiac") {
        // Gold button with purple text -> circle is purple, chevron is WHITE!
        tone = "primary";
      } else if (variant === "outline-accent" || variant === "outline" || variant === "secondary") {
        // Outline button or secondary -> circle is gold, chevron is PURPLE!
        tone = "accent";
      }
      renderedIconRight = <ArrowCircle tone={tone} size={arrowSize} />;
    }

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
        {!loading && renderedIconRight && (
          <span className="inline-flex shrink-0">{renderedIconRight}</span>
        )}
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
export default Button;
