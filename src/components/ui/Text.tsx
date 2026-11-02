import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib";

const textVariants = cva("transition-colors", {
  variants: {
    variant: {
      "body-lg": "text-[18px] leading-[22.6px]",
      "body-base": "text-[16px] leading-[22.2px]",
      "body-sm": "text-[14px] leading-[18.8px]",
      "body-xs": "text-[12px] leading-normal",
      caption: "text-[11px] leading-normal uppercase tracking-wider",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    color: {
      default: "text-inherit",
      dark: "text-[#1e1633]",
      muted: "text-[#8c8c8c]",
      primary: "text-[#675275]",
      secondary: "text-[#faeed4]",
      accent: "text-[#ffd795]",
      light: "text-white",
    },
    font: {
      sans: "font-sans",
      lato: "font-lato",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
  },
  defaultVariants: {
    variant: "body-base",
    weight: "normal",
    color: "default",
    font: "sans",
    align: "left",
  },
});

export type TextElement = "p" | "span" | "div" | "label";

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">, VariantProps<typeof textVariants> {
  as?: TextElement;
}

export const Text: React.FC<TextProps> = ({
  as: Component = "p",
  variant,
  weight,
  color,
  font,
  align,
  className,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn(textVariants({ variant, weight, color, font, align, className }))}
      {...props}
    >
      {children}
    </Component>
  );
};

Text.displayName = "Text";
