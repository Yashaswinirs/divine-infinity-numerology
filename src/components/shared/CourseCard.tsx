import Image from "next/image";
import Link from "next/link";
import { Button, Heading, Text } from "@/components/ui";
import { cn } from "@/lib";
import { ArrowCircle } from "./ArrowCircle";

export interface CourseCardAction {
  label: string;
  href: string;
}

export interface CourseCardProps {
  title: string;
  description: string;
  image: { src: string; alt: string };
  /** Page of the card. The title becomes a link that covers the whole card. Ignored when `action` is set. */
  href?: string;
  /** Button at the bottom of the card (Consultation: "Book a Consultation"). The title is then plain text. */
  action?: CourseCardAction;
  className?: string;
}

// Courses card (Figma, measured): desktop 374 x 398, radius 24, 1px border "Card border", gradient "Card color", shadow 0/4/24.
// Phone and tablet 264 x 335: padding 10 / 10 / 16 / 10, image 240 x 151, image to text 25, title to text 12.
// Consultation card (action): phone 385 x 351, tablet 264 x 399, desktop 374 x 399. Padding 10 / 10 / 20 / 10, image to text 16,
// title to text 12. Image 363 x 154 on phone, 242 x 154 on tablet, 332 x 186 on desktop. Button 40 tall (48 on desktop), pinned
// to the bottom (mt-auto). The 1px border is inside the CSS box, so the CSS padding of 10 plus the border gives the Figma insets.
// Titles: Courses H4 T 23.35/33.6; Consultation H4 M 20.91/29.1 on phone, H4 T 23.35/33.6 on tablet; H4 28.13/35 on desktop.
// Description: Body Extra Small, Lato 500 14/18.8, Secondary.
// TODO(figma): hover state is not designed; the button text size below xl (14) and the arrow circle size are not confirmed.
const styles = {
  card: "bg-card-gradient border-card-border shadow-card relative flex flex-col rounded-3xl border",
  cardCourse: "min-h-83.75 gap-6.25 px-2.75 pt-2.5 pb-4 xl:h-99.5 xl:min-h-0 xl:gap-4 xl:p-5",
  cardConsult: "min-h-87.75 gap-4 px-2.5 pt-2.5 pb-5 tab:min-h-99.75 xl:p-5",
  cardLinked: "has-focus-visible:ring-accent has-focus-visible:ring-2",
  image: "relative w-full shrink-0 overflow-hidden rounded-2xl",
  imageCourse: "aspect-240/151 xl:aspect-332/186",
  imageConsult: "h-38.5 xl:h-46.5",
  body: "flex flex-col gap-3",
  title: "text-accent",
  // Stretched link: the title link covers the whole card.
  link: "after:absolute after:inset-0 focus-visible:outline-hidden",
  description: "text-secondary",
  button: "mt-auto h-10 py-0 text-sm shadow-none xl:h-12 xl:text-base",
} as const;

export function CourseCard({
  title,
  description,
  image,
  href,
  action,
  className,
}: CourseCardProps) {
  const titleHref = action ? undefined : href;

  return (
    <article
      className={cn(
        styles.card,
        action ? styles.cardConsult : styles.cardCourse,
        titleHref && styles.cardLinked,
        className
      )}
    >
      <div className={cn(styles.image, action ? styles.imageConsult : styles.imageCourse)}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={
            action
              ? "(min-width: 1280px) 332px, (min-width: 600px) 242px, 363px"
              : "(min-width: 1280px) 332px, (min-width: 1024px) 288px, 240px"
          }
          className="object-cover"
        />
      </div>

      <div className={styles.body}>
        <Heading
          as="h3"
          size={action ? "consultTitle" : "courseTitle"}
          font="heading"
          className={styles.title}
        >
          {titleHref ? (
            <Link href={titleHref} className={styles.link}>
              {title}
            </Link>
          ) : (
            title
          )}
        </Heading>
        <Text weight="medium" variant="body-sm" className={styles.description}>
          {description}
        </Text>
      </div>

      {action && (
        <Button
          href={action.href}
          variant="accent"
          size="hero"
          fullWidth
          iconRight={<ArrowCircle />}
          className={styles.button}
        >
          {action.label}
        </Button>
      )}
    </article>
  );
}
