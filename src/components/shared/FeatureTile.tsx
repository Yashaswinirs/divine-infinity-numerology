import { Heading } from "@/components/ui";
import { cn } from "@/lib";

export interface FeatureTileProps {
  /** Tile text. "\n" is a manual line break (Figma breaks some tiles by hand). */
  label: string;
  /** Use "li" when the tile sits in a list. */
  as?: "div" | "li";
  className?: string;
}

// Figma "Component 3/4/5": 303 x 118, radius 12, 1px inner border Accent at 60%, padding 12, gap 8, no fill.
// Figma draws the border inside the padding, so CSS padding is 11 (12 - 1px border) to keep the 279px text width.
// Text: H5 Lovelace Text 400, Accent, centred. 22.5/30.7 from xl, 19.08/23.3 below (type-card-title).
// min-h instead of a fixed height so a narrow phone (320) can wrap one more line without overflowing.
const styles = {
  tile: "border-accent/60 mx-auto flex min-h-29.5 w-full max-w-75.75 items-center justify-center rounded-xl border p-2.75 text-center",
  text: "text-accent whitespace-pre-line",
} as const;

export function FeatureTile({ label, as: Component = "div", className }: FeatureTileProps) {
  return (
    <Component className={cn(styles.tile, className)}>
      <Heading as="p" size="cardTitle" font="heading" align="center" className={styles.text}>
        {label}
      </Heading>
    </Component>
  );
}
