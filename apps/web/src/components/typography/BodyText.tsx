import * as React from "react";
import { cn } from "@/lib";

export interface BodyTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: "p" | "span" | "div";
  className?: string;
  children?: React.ReactNode;
}

export function BodyText({
  as: Component = "p",
  className,
  children,
  ...props
}: BodyTextProps) {
  return (
    <Component
      className={cn(
        "font-lato font-medium type-body-small text-light [&_span]:font-lato [&_span]:font-medium",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
