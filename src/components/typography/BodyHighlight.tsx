import * as React from "react";
import { cn } from "@/lib";

export interface BodyHighlightProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  children?: React.ReactNode;
}

export function BodyHighlight({ className, children, ...props }: BodyHighlightProps) {
  return (
    <span
      className={cn(
        "font-lato font-medium type-body-18 text-accent",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

