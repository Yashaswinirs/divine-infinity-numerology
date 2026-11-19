import * as React from "react";
import { cn } from "@/lib";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
  className?: string;
  children?: React.ReactNode;
}

export function SectionHeading({
  as: Component = "h2",
  className,
  children,
  ...props
}: SectionHeadingProps) {
  return (
    <Component
      className={cn(
        "font-heading font-normal type-hero-h1 text-accent text-left",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
