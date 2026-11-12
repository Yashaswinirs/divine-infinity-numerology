import Image from "next/image";
import { cn } from "@/lib";

export interface InfoCardRow {
  id: string;
  /** Path of the icon in public/icons (Figma 60 x 60 on desktop). */
  icon: string;
  title: string;
  text: string;
}

export interface InfoCardProps {
  rows: readonly InfoCardRow[];
  className?: string;
}

// Figma Contact "Frame 114" (Office Hours card). Desktop 410 x 299, tablet 478 x 228, phone 385 x 194 (all measured).
// Radius 15 (no scale value, so rounded-[15px]), border 1 Accent, Card color gradient.
// Desktop: padding left/right 20, rows 100 high (icon 60), gap 24, content centered in the fixed 299 (derived).
// Tablet: padding 30 / 20, gap 28. Phone: padding 10 / 20, gap 34. Rows are 70 high below lg (derived: 228 - 60 - 28 = 140), 100 from lg.
// From 1280 (xl) the Figma sizes apply (icon 60, gap 24, label 22.5, value 18). From 1024 to 1279 the card is narrower,
// so it keeps the tablet text sizes, icon 40 and gap 16 and the text does not wrap.
// TODO(figma): the icon size below xl (40), the icon-to-text gap below lg (24) and from lg to xl (16), and the value text sizes below xl are estimated.
const styles = {
  card: "bg-card-gradient border-accent flex w-full max-w-119.5 flex-col gap-8.5 rounded-[15px] border px-5 py-2.5 tab:gap-7 tab:py-7.5 lg:h-74.75 lg:max-w-102.5 lg:justify-center lg:gap-6 lg:py-0",
  row: "flex min-h-17.5 items-center gap-6 lg:min-h-25 lg:gap-4 xl:gap-6",
  icon: "size-10 shrink-0 xl:size-15",
  text: "flex min-w-0 flex-col gap-1",
  label: "type-info-label text-secondary font-bold",
  value: "type-info-value text-light font-medium",
} as const;

export function InfoCard({ rows, className }: InfoCardProps) {
  return (
    <ul className={cn(styles.card, className)}>
      {rows.map((row) => (
        <li key={row.id} className={styles.row}>
          <Image src={row.icon} alt="" width={60} height={60} className={styles.icon} />
          <div className={styles.text}>
            <span className={styles.label}>{row.title}</span>
            <span className={styles.value}>{row.text}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
