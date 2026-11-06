import { CountUp } from "./CountUp";
import { Text } from "@/components/ui";
import { cn } from "@/lib";

export interface StatCardItem {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface StatCardProps extends StatCardItem {
  /** Use "li" when the card sits in a list. */
  as?: "div" | "li";
  className?: string;
}

// Figma stat card: radius 12, 1px inner Accent border, padding 12, gap 8, no fill.
// Desktop 263 wide and hug (103 tall). Tablet 202 x 96 (measured). Phone 245 x 96 (estimated).
// Tablet size starts at 600px (tab) so it matches the Milestones layout.
export function StatCard({
  as: Component = "div",
  value,
  prefix,
  suffix,
  label,
  className,
}: StatCardProps) {
  return (
    <Component
      className={cn(
        "border-accent flex h-24 w-61.25 max-w-full flex-col items-center justify-center gap-2 rounded-xl border p-3 text-center",
        "tab:w-50.5 xl:h-auto xl:w-65.75",
        className
      )}
    >
      <p className="type-stat-number text-accent">
        <CountUp value={value} prefix={prefix} suffix={suffix} />
      </p>
      <Text
        weight="medium"
        align="center"
        className="type-body-small text-light xl:whitespace-nowrap"
      >
        {label}
      </Text>
    </Component>
  );
}
