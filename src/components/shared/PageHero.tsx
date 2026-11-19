import Image from "next/image";
// Direct file imports, not the layout barrel: layout/index -> Navbar -> MobileMenu -> shared/index would
// become a circular import once PageHero is exported from shared.
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui";
import { cn } from "@/lib";

export interface PageHeroProps {
  title: string;
  /** Id of the h1, used by the section's aria-labelledby. */
  titleId?: string;
  /** Text from lg (laptop and desktop), one entry per paragraph. */
  paragraphs: readonly string[];
  /** Text below lg (tablet and phone). Omit it to use `paragraphs` on every width. */
  compactParagraphs?: readonly string[];
  /** Full-bleed background photo. */
  background: { src: string };
  /** Transparent image (Figma desktop layer: 842 x 474). */
  image: { src: string; alt: string };
}

// Figma Contact hero. Breakpoints: phone below 600, tablet 600 to 1023 (tab), laptop and desktop from 1024 (lg).
// Desktop (1440 x 574, measured): text frame 724 wide at left 80 / top 184, H1 Lovelace 400 54.93/70.4 Accent, gap 19,
// Body small (Lato 500 16/22.2, 1%, Light) 684 wide, blank line 22 between the paragraphs. Wheel image 842 x 474 at
// left 459 / top 86, placed in percent of the container (31.875% / 58.4722%) so it scales below 1440.
// Tablet (768 x 383, measured): content frame 648 x 268 at top 91 / left 60, text frame 359 x 188 (55.4%), H1 42.87/55,
// gap 12, paragraph 359 x 89, centred in the row. The wheel (41.4% = 268 of 648) is read from the canvas.
// Phone (425 x 572, measured): text frame 385 x 147 at top 112 / left 20 (H1 36.7/46 + 12 + 89), the wheel follows with
// no gap (about 278 square = 425 - 147, 72.2% of 385). 572 - 112 - 425 leaves 35 below.
// Tablet and phone show the same image as a square crop of its right side (object-right): the wheel sits at about 48%
// to 99% of the image width. Background: black 30% overlay on every width.

const styles = {
  section: "overflow-hidden lg:min-h-143.5",
  background: "absolute inset-0",
  overlay: "absolute inset-0 bg-black/30",
  container:
    "relative flex flex-col px-5 pt-28 pb-8.75 tab:flex-row tab:items-center tab:justify-between tab:px-[min(3.75rem,calc(1.25rem_+_(100vw_-_37.5rem)_*_0.238))] tab:pt-22.75 tab:pb-6 lg:block lg:px-20 lg:pt-46 lg:pb-0",
  // 55.4% = 359 / 648. From lg the text is capped at 724 and also kept clear of the wheel:
  // 60% of the content width minus 8 keeps its right edge about 24px left of the wheel ring (no scale value exists).
  text: "relative z-10 flex flex-col gap-3 tab:min-h-47 tab:w-[55.4%] lg:min-h-0 lg:w-auto lg:max-w-[min(45.25rem,calc(60%-0.5rem))] lg:gap-4.75",
  paragraphs: "flex flex-col gap-5.5 lg:max-w-171",
  // 72.2% = 278 / 385 (phone, capped at 278), 41.4% = 268 / 648 (tablet), then the desktop box.
  image:
    "relative mx-auto aspect-square w-[72.2%] max-w-69.5 overflow-hidden tab:mx-0 tab:w-[41.4%] tab:max-w-none lg:pointer-events-none lg:absolute lg:top-21.5 lg:left-[31.875%] lg:aspect-842/474 lg:w-[58.4722%]",
} as const;

export function PageHero({
  title,
  titleId = "page-hero-heading",
  paragraphs,
  compactParagraphs,
  background,
  image,
}: PageHeroProps) {
  return (
    <Section container={false} spacing="none" aria-labelledby={titleId} className={styles.section}>
      <div aria-hidden="true" className={styles.background}>
        <Image
          src={background.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className={styles.overlay} />
      </div>

      <Container padding="none" className={styles.container}>
        <div className={styles.text}>
          <Heading
            as="h1"
            id={titleId}
            size="pageTitle"
            font="heading"
            className="text-accent tab:whitespace-nowrap lg:whitespace-normal"
          >
            {title}
          </Heading>
          {compactParagraphs && (
            <div className={cn(styles.paragraphs, "lg:hidden")}>
              {compactParagraphs.map((paragraph) => (
                <Text key={paragraph} weight="medium" className="type-body-small text-light">
                  {paragraph}
                </Text>
              ))}
            </div>
          )}
          <div className={cn(styles.paragraphs, compactParagraphs && "hidden lg:flex")}>
            {paragraphs.map((paragraph) => (
              <Text key={paragraph} weight="medium" className="type-body-small text-light">
                {paragraph}
              </Text>
            ))}
          </div>
        </div>

        <div className={styles.image}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(min-width: 1024px) 842px, (min-width: 600px) 268px, 278px"
            className="object-cover object-right"
          />
        </div>
      </Container>
    </Section>
  );
}
