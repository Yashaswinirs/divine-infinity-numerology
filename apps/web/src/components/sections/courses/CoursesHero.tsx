import Image from "next/image";
// Direct file imports, like ConsultationHero (the layout barrel would become a circular import through the Navbar).
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ArrowCircle } from "@/components/shared";
import { Button } from "@/components/ui";
import { coursesHeroContent } from "@/data/courses";

// Figma Courses hero. Breakpoints: phone below 600, tablet 600 to 1023 (tab), laptop and desktop from 1024 (lg).
// Built like ConsultationHero (same background, same buttons, same title style), with the Courses numbers.
// Desktop (1440 x 574, measured): content frame 1280 at left 80; text block top 184 (derived: 34 + nav row 50 + gap 100),
// 760 wide: H1 54.93/70.4 (two lines, 141 tall, no fixed box), gap 19, paragraph 684 x 45, gap 40, buttons 48 tall, gap 16
// (Explore Courses 182, Book a Consultation 211). Wheel box 782 x 440 at left 678 / top 105, placed in percent of the container
// (47.0833% / 54.3056%) so it scales below 1440 (its right edge overflows the 1440 frame by 20, the section clips it).
// From lg the text width is min(760, 61.75vw - 129) so the text stays clear of the wheel circle (the circle starts at about
// 61.7% of the width), and the H1 size follows the width (type-consult-hero-title), so "Learn with Confidence." fits one line.
// Tablet (768 x 1024, frame measured): text 590 wide at left 60 / top 190, H1 42.87/48 (cap trim), gap 24, paragraph, gap 40,
// buttons side by side (gap 16). Phone (425 x 900, frame measured): text 385 wide at top 160, H1 36.72/46 on three lines,
// buttons stacked (gap 12).
// ESTIMATED (no panel received): tablet and phone wheel boxes, their gaps and bottom space. They come from the circle size read on
// the Figma prototype (tablet circle about 465, phone about 301) and the desktop ratio (circle about 82% of the image height):
// tablet box 648 x 568, gap 32 above it; phone box 385 x 368, overlapping the buttons row by 9; hero min height 1024 / 900.
// Buttons: 48 tall on every width. The 1px outline border is inside the 48 in Figma, so the outline padding here is 1 less per
// side (15 left, 9 right). The filled button has no border here, so it keeps the Figma 16 left / 10 right.
// Background: black 30% overlay on every width. No fade of its own: the page-level HeroSeam strip blends it into the page.
// Title: Figma letter spacing is 0% for Lovelace; -0.01em compensates for the wider Libre Baskerville stand-in.
// TODO(figma): tablet and phone panels (text frame, H1, paragraph, buttons, wheel layer) were not received.
const styles = {
  section: "overflow-hidden min-h-225 tab:min-h-256 lg:min-h-143.5",
  background: "absolute inset-0",
  overlay: "absolute inset-0 bg-black/30",

  container:
    "relative flex flex-col px-5 pt-40 pb-2.5 tab:mx-auto tab:max-w-192 tab:gap-8 tab:px-[min(3.75rem,calc(1.25rem_+_(100vw_-_37.5rem)_*_0.238))] tab:pt-47.5 tab:pb-1.25 lg:max-w-360 lg:gap-0 lg:px-20 lg:pt-46 lg:pb-0",
  text: "relative z-10 flex flex-col gap-10 tab:max-w-150 lg:w-[min(47.5rem,calc(61.75vw_-_8.0625rem))] lg:max-w-none",
  copy: "flex flex-col gap-6 tab:gap-4.75",
  title: "type-consult-hero-title font-heading tracking-[-0.01em] whitespace-pre-line text-accent",
  paragraph: "type-body-small text-light font-medium lg:max-w-171",
  actions: "flex flex-col items-start gap-3 tab:flex-row tab:gap-4",
  explore: "h-12 pr-2.25 pl-3.75",
  book: "h-12 pl-4",
  wheel:
    "relative mx-auto -mt-2.25 aspect-385/368 w-full max-w-96.25 tab:mt-0 tab:aspect-648/568 tab:max-w-162 lg:pointer-events-none lg:absolute lg:top-26.25 lg:left-[47.0833%] lg:mx-0 lg:aspect-782/440 lg:w-[54.3056%] lg:max-w-none",
} as const;

export function CoursesHero() {
  const { title, text, explore, book, background, wheel } = coursesHeroContent;

  return (
    <Section
      container={false}
      spacing="none"
      aria-labelledby="courses-hero-heading"
      className={styles.section}
    >
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
          <div className={styles.copy}>
            <h1 id="courses-hero-heading" className={styles.title}>
              {title}
            </h1>
            <p className={styles.paragraph}>{text}</p>
          </div>
          <div className={styles.actions}>
            <Button
              href={explore.href}
              variant="outline-accent"
              size="hero"
              className={styles.explore}
              iconRight={<ArrowCircle tone="accent" />}
            >
              {explore.label}
            </Button>
            <Button
              href={book.href}
              variant="accent"
              size="hero"
              className={styles.book}
              iconRight={<ArrowCircle tone="primary" />}
            >
              {book.label}
            </Button>
          </div>
        </div>

        <div className={styles.wheel}>
          <Image
            src={wheel.src}
            alt={wheel.alt}
            fill
            priority
            sizes="(min-width: 1024px) 782px, (min-width: 600px) 648px, 385px"
            className="object-cover object-center"
          />
        </div>
      </Container>
    </Section>
  );
}
