import type { ComponentProps } from "react";
import { Icon } from "@/components/ui";
import { cn } from "@/lib";

export type MenuToggleButtonProps = Omit<ComponentProps<"button">, "children"> & {
  icon: "menu" | "close";
};

export function MenuToggleButton({
  icon,
  className,
  type = "button",
  ...props
}: MenuToggleButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "text-accent inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full",
        "focus-visible:ring-accent focus-visible:ring-2 focus-visible:outline-hidden",
        className
      )}
      {...props}
    >
      {icon === "menu" ? (
        <Icon size="xl">
          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5.33 8h21.33M5.33 16h21.33M5.33 24h21.33" />
          </svg>
        </Icon>
      ) : (
        <Icon size="md">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M2 2l16 16M18 2L2 18" />
          </svg>
        </Icon>
      )}
    </button>
  );
}
