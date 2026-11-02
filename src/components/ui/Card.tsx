import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib";

const cardVariants = cva("rounded-2xl transition-all duration-200 overflow-hidden", {
  variants: {
    variant: {
      default: "bg-white text-[#1e1633] border border-[#e5dff0] shadow-xs",
      solid: "bg-[#3c2657] text-white border border-[#482857] shadow-sm",
      gradient: "bg-card-gradient text-white border border-white/10 shadow-md",
      outline: "bg-transparent text-inherit border border-[#e5dff0]",
      glass: "bg-white/80 backdrop-blur-md text-[#1e1633] border border-white/20 shadow-lg",
    },
    padding: {
      none: "p-0",
      sm: "p-4 sm:p-5",
      md: "p-6 sm:p-8",
      lg: "p-8 sm:p-10 lg:p-12",
    },
    hover: {
      true: "hover:-translate-y-1 hover:shadow-xl hover:border-[#8061a5]/50",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
    hover: false,
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hover, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, hover, className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 pb-4", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl leading-tight font-bold tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm leading-relaxed opacity-75", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-4", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center pt-4", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";
