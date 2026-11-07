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
  className?: string;
}

// Figma "Frame 275" card (desktop, measured): 740 x 314, radius 24, gradient "Card color", no border or shadow.
// Padding 16 (top 15.84, bottom 23). Header: photo 211 x 116 radius 16, gap 16, title Lato 800 22/100% Secondary, centred on the photo.
// Body: author 112 wide (name Lato 700 18/100%, role Body Extra Small 14/18.8, gap 6) then the quote at x = 248 (gap 120),
// Lato 600 italic 16/22.2 1%, 451 wide, Light. Header to body 16. Controls sit 40 tall, 23 from the bottom.
// Tablet (measured from the canvas, 648 wide, about 327 tall): same layout, title 19.08, gaps 25.
// Phone (385 wide, about 343 tall, estimated): photo 118 x 65, title 17.3, quote starts at x = 156 (author gap 28), gaps 25.
// TODO(figma): tablet and phone panels were not received. Lato 600 italic and 800 are not loaded, so the browser draws 700 oblique / 700.
const styles = {
  card: "bg-card-gradient flex h-full w-full flex-col gap-6.5 rounded-3xl p-4 xl:h-78.5 xl:gap-4 xl:pb-5.75",
  header: "flex items-center gap-4",
  photo: "relative h-16.25 w-29.5 shrink-0 overflow-hidden rounded-2xl md:h-29 md:w-52.75",
  title: "type-testimonial-title text-secondary min-w-0 font-extrabold",
  body: "grid grid-cols-[auto_1fr] gap-x-7.5 md:gap-x-30",
  author: "flex flex-col gap-1.5 min-[600px]:whitespace-nowrap",
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

      <div className={styles.body}>
        <div className={styles.author}>
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
