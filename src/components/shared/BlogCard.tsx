import Image from "next/image";
import { Button, Heading, Text } from "@/components/ui";
import { cn } from "@/lib";
import { ArrowCircle } from "./ArrowCircle";

export interface BlogCardProps {
  title: string;
  excerpt: string;
  image: { src: string; alt: string };
  /** Page of the post (/blog/[slug]). Only the button links, as in Figma. */
  href: string;
  /** Button label. Figma: "Read More". */
  readMoreLabel?: string;
  className?: string;
}

// Blog card (Figma Blogs, desktop measured): 374 x 425, radius 24, 1px border "Card border" #5F1BB7, gradient "Card color"
// #1D1B4D to #512B58, shadow "shadow-card". Padding 20 plus the 1px border (inset 21). Image 332 x 186, radius 16, crop. Image to
// text 16, title to text 12. Title Lovelace H5 22.5/30.7 Accent (2 lines), text Body Extra Small Lato 500 14/18.8 Secondary
// (2 lines). Button 332 x 48 pinned to the bottom, radius 50, padding 10, gap 13, Accent, "Read More" Lato 700 16 + 30px arrow circle.
// Phone and tablet have no Figma frame: below xl the card follows the Courses card (padding 10 / 10 / 16 / 10, image 240 x 151,
// image to text 25, button 40 tall, 14px text). Cards share one row height (the row stretches, the button sits at the bottom).
// TODO(figma): tablet and phone frames, the hover state and the shadow panel of the blog card were not received.
const styles = {
  card: "bg-card-gradient border-card-border shadow-card relative flex flex-col gap-6.25 rounded-3xl border px-2.75 pt-2.5 pb-4 xl:min-h-106.25 xl:gap-4 xl:p-5",
  image: "relative aspect-240/151 w-full shrink-0 overflow-hidden rounded-2xl xl:aspect-332/186",
  body: "flex flex-col gap-3",
  title: "text-accent",
  excerpt: "text-secondary",
  button: "mt-auto h-10 py-0 text-sm shadow-none xl:h-12 xl:gap-3.25 xl:text-base",
} as const;

export function BlogCard({
  title,
  excerpt,
  image,
  href,
  readMoreLabel = "Read More",
  className,
}: BlogCardProps) {
  return (
    <article className={cn(styles.card, className)}>
      <div className={styles.image}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1280px) 332px, (min-width: 1024px) 288px, 240px"
          className="object-cover"
        />
      </div>

      <div className={styles.body}>
        <Heading as="h3" size="cardTitle" font="heading" className={styles.title}>
          {title}
        </Heading>
        <Text weight="medium" variant="body-sm" className={styles.excerpt}>
          {excerpt}
        </Text>
      </div>

      <Button
        href={href}
        variant="accent"
        size="hero"
        fullWidth
        iconRight={<ArrowCircle />}
        className={styles.button}
      >
        {readMoreLabel}
        <span className="sr-only">: {title}</span>
      </Button>
    </article>
  );
}
