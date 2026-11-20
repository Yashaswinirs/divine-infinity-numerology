import type { ReactNode } from "react";
import Image from "next/image";
import { Text } from "@/components/ui";
import { cn } from "@/lib";

export interface TestimonialCardProps {
  title: string;
  quote: string;
  name: string;
  role: string;
  image: { src: string; alt: string };
  /** Pinned to the bottom of the card. The carousel reserves 40px here for its controls. */
  footer?: ReactNode;
  /**
   * Figma author block: a fixed 112 wide column (Frame 203), so the quote starts at the same x on every slide
   * (248 on desktop and tablet, 158 on phone). Default false (Home): the column is as wide as the name and role.
   */
  fixedAuthor?: boolean;
  className?: string;
}

// Figma "Frame 275" card (desktop, measured): 740 x 314, radius 24, gradient "Card color", no border or shadow.
// Padding 16 (top 15.84, bottom 23). Header: photo 211 x 116 radius 16, gap 16, title Lato 800 22/100% Secondary, centred on the photo.
// Body: author 112 wide (name Lato 700 18/100%, role Body Extra Small 14/18.8, gap 6) then the quote at x = 248 (gap 120),
// Lato 600 italic 16/22.2 1%, 451 wide, Light. Header to body 16. Controls sit 40 tall, 23 from the bottom.
// Tablet (measured from the canvas, 648 wide, about 327 tall): same layout, title 19.08, gaps 25.
// Phone (385 wide, 345 tall, Courses Mobile panel): photo 118 x 65, title 17.3, author 112 wide, quote at x = 158 (gap 30) and 211 wide, gaps 25.
// With `fixedAuthor` the author column is 112 (7rem) at every width, like Figma. Below 375 it goes back to auto, because a 112 column
// would leave only about 106px for the quote at 320 (no Figma frame below 425). With `fixedAuthor` the role wraps below md (768), so a
// long role can never run into the quote; from md it stays on one line and may overflow the 112 into the gap, as in Figma.
// TODO(figma): tablet and phone panels were not received. Lato 600 italic and 800 are not loaded, so the browser draws 700 oblique / 700.
const styles = {
  card: "bg-card-gradient flex h-full w-full flex-col gap-6.5 rounded-3xl p-4 xl:h-78.5 xl:gap-4 xl:pb-5.75",
  header: "flex items-center gap-4",
  photo: "relative h-16.25 w-29.5 shrink-0 overflow-hidden rounded-2xl md:h-29 md:w-52.75",
  title: "type-testimonial-title text-secondary min-w-0 font-extrabold",
  body: "grid gap-x-7.5 md:gap-x-30",
  bodyAuto: "grid-cols-[auto_1fr]",
  bodyFixed: "grid-cols-[7rem_1fr] max-[374px]:grid-cols-[auto_1fr]",
  author: "flex flex-col gap-1.5",
  authorAuto: "min-[600px]:whitespace-nowrap",
  authorFixed: "md:whitespace-nowrap",
  name: "text-secondary text-lg leading-[1.2] font-bold",
  role: "text-secondary",
  quote: "type-body-small text-light font-semibold italic xl:max-w-112.75",
  footer: "mt-auto",
} as const;

export function TestimonialCard({
  title,
  quote,
  name,
  role,
  image,
  footer,
  fixedAuthor = false,
  className,
}: TestimonialCardProps) {
  return (
    <article className={cn(styles.card, className)}>
      <div className={styles.header}>
        <div className={styles.photo}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 211px, 118px"
            className="object-cover"
          />
        </div>
        <h3 className={styles.title}>{title}</h3>
      </div>

      <div className={cn(styles.body, fixedAuthor ? styles.bodyFixed : styles.bodyAuto)}>
        <div className={cn(styles.author, fixedAuthor ? styles.authorFixed : styles.authorAuto)}>
          <p className={styles.name}>{name}</p>
          <Text weight="medium" variant="body-sm" className={styles.role}>
            {role}
          </Text>
        </div>
        <blockquote className={styles.quote}>
          <p>{quote}</p>
        </blockquote>
      </div>

      {footer && <div className={styles.footer}>{footer}</div>}
    </article>
  );
}
