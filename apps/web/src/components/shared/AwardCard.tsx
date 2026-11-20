import Image from "next/image";
import { Heading } from "@/components/ui";
import { cn } from "@/lib";
import { siteConfig } from "@/data/site";
import { StarRating } from "./StarRating";

export interface AwardCardProps {
  title: string;
  image: { src: string; alt: string };
  /** Stars under the title (Figma: 5). */
  rating?: number;
  className?: string;
}

const { laurelLeft, laurelRight } = siteConfig.decor;

// Figma card: desktop 374 x 315, tablet 320 x 287 (radius 24, 1px border outside, gradient "Card color", shadow 0/4/24).
// Border is inside the CSS box, so padding = Figma padding (tablet 20, desktop 21 sides) and the 1px border adds the rest.
// Desktop is absolutely positioned in Figma: image top 20.84, title row top 209.31 (gap 29.47), stars top 282.84 (gap 21.25), bottom 20.16.
// TODO(figma): mobile card values (padding 20, image height 181, gaps) are estimated from the canvas.
const styles = {
  card: "bg-card-gradient border-card-border shadow-card flex flex-col rounded-3xl border p-5 xl:px-5.25 xl:pt-5.25 xl:pb-5",
  image:
    "relative aspect-[343/181] w-full shrink-0 overflow-hidden rounded-2xl sm:aspect-auto sm:h-39.75",
  body: "mt-5 flex flex-1 flex-col gap-2.5 xl:mt-[29.47px] xl:gap-[21.25px]",
  titleRow:
    "mx-auto flex w-full max-w-69.5 min-h-11.5 flex-1 items-center justify-between gap-2 sm:max-w-none xl:min-h-[52.28px] min-[90rem]:gap-4",
  laurel: "h-11.5 w-auto shrink-0 xl:h-[52.28px]",
} as const;

export function AwardCard({ title, image, rating = 5, className }: AwardCardProps) {
  return (
    <article className={cn(styles.card, className)}>
      <div className={styles.image}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1280px) 332px, (min-width: 768px) 280px, 345px"
          className="object-cover"
        />
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <Image
            src={laurelLeft.src}
            alt=""
            width={laurelLeft.width}
            height={laurelLeft.height}
            aria-hidden="true"
            className={styles.laurel}
          />
          <Heading
            as="h3"
            size="cardTitle"
            font="heading"
            align="center"
            className="text-secondary min-w-0 flex-1"
          >
            {title}
          </Heading>
          <Image
            src={laurelRight.src}
            alt=""
            width={laurelRight.width}
            height={laurelRight.height}
            aria-hidden="true"
            className={styles.laurel}
          />
        </div>
        <StarRating rating={rating} />
      </div>
    </article>
  );
}
