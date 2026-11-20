import * as React from "react";
import { cn } from "@/lib";

export interface StatLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: "span" | "div" | "p";
  className?: string;
  children?: React.ReactNode;
}

export function StatLabel({
  as: Component = "span",
  className,
  children,
  ...props
}: StatLabelProps) {
  return (
    <Component
      className={cn(
        "font-lato font-medium type-body-small text-accent [&_span]:font-lato [&_span]:font-medium",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
