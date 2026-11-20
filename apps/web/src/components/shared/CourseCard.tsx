import Image from "next/image";
import Link from "next/link";
import { Button, Heading, Text } from "@/components/ui";
import { cn } from "@/lib";
import { ArrowCircle } from "./ArrowCircle";

export interface CourseCardAction {
  label: string;
  href: string;
}

export interface CourseCardPath {
  /** Label of the full-width button under the text ("Enroll Now"). TODO(client): no destination yet, so it is a plain button. */
  buttonLabel: string;
  /** Coming soon card: dimmed text, text over the image, disabled and dimmed button. */
  comingSoon?: boolean;
  /** Text drawn over the image of a coming soon card ("Coming Soon"). */
  comingSoonLabel?: string;
}

export interface CourseCardProps {
  title: string;
  description: string;
  image: { src: string; alt: string };
  /** Page of the card. The title becomes a link that covers the whole card. Ignored when `action` or `path` is set. */
  href?: string;
  /** Button at the bottom of the card (Consultation: "Book a Consultation"). The title is then plain text. */
  action?: CourseCardAction;
  /** Courses page Section 2 card (Figma 374 x 460): plain title, image, text and a button right under the text. */
  path?: CourseCardPath;
  className?: string;
}

// Courses card (Figma, measured): desktop 374 x 398, radius 24, 1px border "Card border", gradient "Card color", shadow 0/4/24.
// Phone and tablet 264 x 335: padding 10 / 10 / 16 / 10, image 240 x 151, image to text 25, title to text 12.
// Consultation card (action): phone 385 x 351, tablet 264 x 399, desktop 374 x 399. Padding 10 / 10 / 20 / 10, image to text 16,
// title to text 12. Image 363 x 154 on phone, 242 x 154 on tablet, 332 x 186 on desktop. Button 40 tall (48 on desktop), pinned
// to the bottom (mt-auto). The 1px border is inside the CSS box, so the CSS padding of 10 plus the border gives the Figma insets.
// Titles: Courses H4 T 23.35/33.6; Consultation H4 M 20.91/29.1 on phone, H4 T 23.35/33.6 on tablet; H4 28.13/35 on desktop.
// Description: Body Extra Small, Lato 500 14/18.8, Secondary.
// Courses page card (path, Courses Section 2, measured): the border is inside the box, so Figma padding 14 = CSS padding 13 + 1 border
// (tablet and phone) and 21 = 20 + 1 (desktop). Desktop 374 x 460 FIXED (min-h-115 here, so a longer text can still grow it),
// image 332 x 186 radius 16, image to text 16, title to text 12, text block to button 50, button 48 tall. Tablet card 312 x 414 hug,
// phone 385 x 374 hug: image 284 / 357 x 187 radius 12, text block to button 50 (tablet) / 30 (phone). The button sits directly under
// the text (no mt-auto): Figma shows it higher on the Vaastu card (one line title). Button: radius 50, padding 10 / 10 / 10 / 50,
// gap 25, Accent fill, label Lato 700 16 in Primary, arrow circle 30 (ArrowCircle tone="primary" = Figma Frame 107, Primary).
// Titles: phone H4 M 20.91/29.1 (cap trim), tablet H4 T 23.35/33.6 (cap trim), desktop H4 28.13/35. The phone size has no token on this
// card (type-course-title starts at 23.35), so it is set with max-tab arbitrary values (measured, Figma "H4 M").
// TODO(figma): hover state is not designed; the button text size below xl (14) and the arrow circle size are not confirmed.
// Coming Soon (Figma, measured): image layer opacity 75% + black 30% fill; label Lovelace H4 (28.13 desktop, 23.35 tablet,
// 20.91 phone, cap trim below xl), Accent, centred; title and text block (Frame 187) opacity 75%.
// Coming Soon button (Figma Frame 6, measured): the whole button at opacity 30% (label and circle included).
// TODO(figma): the desktop Coming Soon image layer panel (opacity 75% and black 30% are from tablet and phone) was not received.
// card title style (Secondary), title and text at 60% opacity, button at 30% opacity.
const styles = {
  card: "bg-card-gradient border-card-border shadow-card relative flex flex-col rounded-3xl border",
  cardCourse: "min-h-83.75 gap-6.25 px-2.75 pt-2.5 pb-4 xl:h-99.5 xl:min-h-0 xl:gap-4 xl:p-5",
  cardConsult: "min-h-87.75 gap-4 px-2.5 pt-2.5 pb-5 tab:min-h-99.75 xl:p-5",
  cardPath: "p-3.25 xl:min-h-115 xl:p-5",
  cardLinked: "has-focus-visible:ring-accent has-focus-visible:ring-2",
  image: "relative w-full shrink-0 overflow-hidden rounded-2xl",
  imageCourse: "aspect-240/151 xl:aspect-332/186",
  imageConsult: "h-38.5 xl:h-46.5",
  imagePath: "h-46.75 rounded-xl lg:h-auto lg:aspect-332/186 xl:rounded-2xl",
  body: "flex flex-col gap-3",
  title: "text-accent",
  titlePath: "max-tab:text-[1.3069rem] max-tab:leading-[1.81875rem]",
  // Stretched link: the title link covers the whole card.
  link: "after:absolute after:inset-0 focus-visible:outline-hidden",
  description: "text-secondary",
  button: "mt-auto h-10 py-0 text-sm shadow-none xl:h-12 xl:text-base",
  pathStack: "flex flex-col gap-7.5 tab:gap-12.5",
  pathMedia: "flex flex-col gap-4",
  dim: "opacity-75",
  soonShade: "absolute inset-0 bg-black/30",
  soon: "type-course-title font-heading text-accent absolute inset-0 flex items-center justify-center text-center max-tab:text-[1.3069rem] max-tab:leading-[1.81875rem]",
  enroll:
    "bg-accent text-primary focus-visible:outline-accent flex h-12 w-full items-center justify-center gap-6.25 rounded-full py-2.5 pr-2.5 pl-12.5 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-30",
  enrollLabel: "type-btn-large font-bold",
} as const;

export function CourseCard({
  title,
  description,
  image,
  href,
  action,
  path,
  className,
}: CourseCardProps) {
  if (path) {
    const { buttonLabel, comingSoon = false, comingSoonLabel } = path;

    return (
      <article className={cn(styles.card, styles.cardPath, className)}>
        <div className={styles.pathStack}>
          <div className={styles.pathMedia}>
            <div className={cn(styles.image, styles.imagePath)}>
              {/* Figma: the image layer is 75% with a black 30% fill; the label sits on top at full strength. */}
              <div className={cn("absolute inset-0", comingSoon && "opacity-75")}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1280px) 332px, (min-width: 1024px) 288px, (min-width: 600px) 284px, 357px"
                  className="object-cover"
                />
                {comingSoon && <div className={styles.soonShade} />}
              </div>
              {comingSoon && comingSoonLabel && (
                <span className={styles.soon}>{comingSoonLabel}</span>
              )}
            </div>

            <div className={cn(styles.body, comingSoon && styles.dim)}>
              <Heading
                as="h3"
                size="courseTitle"
                font="heading"
                className={cn(styles.title, styles.titlePath)}
              >
                {title}
              </Heading>
              <Text weight="medium" variant="body-sm" className={styles.description}>
                {description}
              </Text>
            </div>
          </div>

          {/* TODO(client): "Enroll Now" has no destination yet. A disabled button is not focusable, so Coming Soon cards are skipped by Tab. */}
          <button
            type="button"
            disabled={comingSoon}
            aria-label={
              comingSoon && comingSoonLabel
                ? `${buttonLabel}, ${comingSoonLabel.toLowerCase()}`
                : undefined
            }
            className={styles.enroll}
          >
            <span className={styles.enrollLabel}>{buttonLabel}</span>
            <ArrowCircle tone="primary" />
          </button>
        </div>
      </article>
    );
  }

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
