import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib";
import { Container, type ContainerProps } from "./Container";

const sectionVariants = cva("relative w-full", {
  variants: {
    spacing: {
      none: "py-0",
      sm: "py-8 md:py-12",
      md: "py-12 md:py-16 lg:py-20",
      lg: "py-16 md:py-24 lg:py-28",
      xl: "py-20 md:py-28 lg:py-36",
    },
    bg: {
      default: "bg-transparent text-inherit",
      dark: "bg-[#1e1633] text-white",
      hero: "bg-hero-gradient text-white",
      card: "bg-card-gradient text-white",
      light: "bg-[#f8f6fb] text-[#1e1633]",
      muted: "bg-neutral-100 text-[#1e1633]",
    },
  },
  defaultVariants: {
    spacing: "md",
    bg: "default",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof sectionVariants> {
  as?: "section" | "div" | "article" | "aside";
  container?: boolean;
  containerSize?: ContainerProps["size"];
  containerPadding?: ContainerProps["padding"];
  containerClassName?: string;
}

export const Section: React.FC<SectionProps> = ({
  as: Component = "section",
  spacing,
  bg,
  container = true,
  containerSize = "default",
  containerPadding = "normal",
  containerClassName,
  className,
  children,
  ...props
}) => {
  const content = container ? (
    <Container size={containerSize} padding={containerPadding} className={containerClassName}>
      {children}
    </Container>
  ) : (
    children
  );

  return (
    <Component className={cn(sectionVariants({ spacing, bg, className }))} {...props}>
      {content}
    </Component>
  );
};

Section.displayName = "Section";
