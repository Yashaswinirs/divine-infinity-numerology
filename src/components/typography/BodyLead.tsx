import * as React from "react";
import { cn } from "@/lib";

export interface BodyLeadProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: "p" | "span" | "div";
  className?: string;
  children?: React.ReactNode;
}

export function BodyLead({
  as: Component = "p",
  className,
  children,
  ...props
}: BodyLeadProps) {
  return (
    <Component
      className={cn(
        "font-lato font-medium type-body-lead text-light [&_span]:font-lato [&_span]:font-medium",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
