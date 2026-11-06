import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib";

const headingVariants = cva("tracking-tight transition-colors", {
  variants: {
    size: {
      h1: "text-h1 font-bold",
      h2: "text-h2 font-bold",
      h3: "text-h3 font-semibold",
      h4: "text-h4 font-medium",
      h5: "text-h5 font-medium",
      // Hero H1: Lovelace Text 400, 54.93/70.4 desktop, 35/40 tablet, 30.43/35 mobile.
      // -0.01em tracking keeps the stand-in font at Lovelace's measured line widths.
      hero: "type-hero-h1 font-normal tracking-[-0.01em]",
      // About title: same sizes as hero, but the tablet size starts at 600px.
      feature: "type-feature-title font-normal tracking-[-0.01em]",
      // Section title (Figma H2 / H2 T / H2 M): Lovelace Text 400, letter spacing 0.
      section: "type-section-title font-normal tracking-normal",
      // Section title with the tablet size starting at 600px (Milestones).
      sectionTab: "type-section-title-tab font-normal tracking-normal",
      // Section title using H2 T (35/40) on mobile as well (Awards).
      sectionT: "type-section-title-t font-normal tracking-normal",
      // Award card title (Figma H5 / H5 T).
      cardTitle: "type-card-title font-normal tracking-normal",
    },
    color: {
      default: "text-inherit",
      primary: "text-[#675275]",
      secondary: "text-[#faeed4]",
      accent: "text-[#ffd795]",
      gold: "text-gold",
      light: "text-white",
      muted: "text-[#8c8c8c]",
      dark: "text-[#1e1633]",
    },
    // TODO(figma): Verify heading font family bindings (sans vs lato vs serif) against Figma
    font: {
      sans: "font-sans",
      lato: "font-lato",
      heading: "font-heading",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    size: "h2",
    color: "default",
    font: "sans",
    align: "left",
  },
});

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";

export interface HeadingProps
  extends
    Omit<React.HTMLAttributes<HTMLHeadingElement>, "color">,
    VariantProps<typeof headingVariants> {
  as?: HeadingLevel;
}

export const Heading: React.FC<HeadingProps> = ({
  as,
  size,
  color,
  font,
  align,
  className,
  children,
  ...props
}) => {
  const Component = (as ||
    (size && ["h1", "h2", "h3", "h4", "h5"].includes(size) ? size : "h2")) as React.ElementType;
  const resolvedSize =
    size ||
    (as && ["h1", "h2", "h3", "h4", "h5"].includes(as)
      ? (as as "h1" | "h2" | "h3" | "h4" | "h5")
      : "h2");

  return (
    <Component
      className={cn(headingVariants({ size: resolvedSize, color, font, align, className }))}
      {...props}
    >
      {children}
    </Component>
  );
};

Heading.displayName = "Heading";
