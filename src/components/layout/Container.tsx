import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib";

const containerVariants = cva("w-full mx-auto", {
  variants: {
    size: {
      default: "max-w-[1440px]",
      // TODO(figma): Verify narrow (max-w-4xl / 896px) and wide (max-w-[1600px]) container widths against Figma layouts
      narrow: "max-w-4xl",
      wide: "max-w-[1600px]",
      full: "max-w-full",
    },
    // TODO(figma): Verify horizontal responsive padding steps against Figma layout grid
    padding: {
      normal: "px-4 sm:px-6 md:px-8 lg:px-12",
      spacious: "px-6 sm:px-10 md:px-16",
      none: "px-0",
      // Matches the Navbar side padding (Figma: 20 mobile / 60 tablet / 80 desktop).
      page: "px-5 md:px-15 xl:px-20",
    },
  },
  defaultVariants: {
    size: "default",
    padding: "normal",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {
  as?: "div" | "main" | "section" | "article" | "nav" | "header" | "footer";
}

export const Container: React.FC<ContainerProps> = ({
  as: Component = "div",
  size,
  padding,
  className,
  children,
  ...props
}) => {
  return (
    <Component className={cn(containerVariants({ size, padding, className }))} {...props}>
      {children}
    </Component>
  );
};

Container.displayName = "Container";
