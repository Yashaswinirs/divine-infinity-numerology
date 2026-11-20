import * as React from "react";
import { cn } from "@/lib";

export interface SectionSubheadingProps extends React.HTMLAttributes<HTMLElement> {
  as?: "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  children?: React.ReactNode;
}

export function SectionSubheading({
  as: Component = "p",
  className,
  children,
  ...props
}: SectionSubheadingProps) {
  return (
    <Component
      className={cn(
        "type-h5 text-secondary text-left",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
