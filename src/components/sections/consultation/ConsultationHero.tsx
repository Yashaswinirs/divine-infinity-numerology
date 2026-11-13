import Image from "next/image";
// Direct file imports, like PageHero (the layout barrel would become a circular import through the Navbar).
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ArrowCircle } from "@/components/shared";
import { Button } from "@/components/ui";
import { consultationHeroContent } from "@/data/consultation";

// Figma Consultation hero. Breakpoints: phone below 600, tablet 600 to 1023 (tab), laptop and desktop from 1024 (lg).
// Desktop (1440 x 561, measured): text frame 590 wide at left 80 / top 169 (pt 169), H1 54.93/70.4 in a FIXED 133 tall
// box (h 2.4213em = 133 at 1440; the second line overflows it, as in Figma), gap 12, paragraph 590 x 67, gap 34,
// buttons 48 tall with gap 16. Wheel 817 x 446 at left 638 / top 91, placed in percent of the container
// (44.3056% / 56.7361%) so it scales below 1440 (its right edge overflows the 1440 frame by 15, the section clips it).
// From lg the text width is min(590, 41vw) and the H1 size follows the width, so the text stays clear of the wheel.
// Tablet (768 x 1024, measured): text 590 wide at left 60 / top 190, H1 42.87/48 (cap trim) + gap 24 (derived from
// 257 = 169 + 40 + 48) + paragraph 67, gap 40 to the buttons; wheel box 648 x 440 follows after a gap of 63; 74 below it.
// Phone (425, measured): text 385 wide at top 160 (H1 36.72/46, cap trim, 72 tall + gap 24 + paragraph 89), gap 40,
// buttons stacked with gap 12 (108 tall); wheel box 371 x 252 (96.364% of 385, centred) after a gap of 74.
// Buttons: 48 tall on every width. Outline "Book" pads 24 (desktop) / 16 left and 10 right; the 1px border is inside the
// 48 in Figma, so the padding here is 1 less per side (23 / 15 / 9). Filled "View" is 262 wide on desktop (content
// centred), hug with 14 left / 10 right below lg.
// Background: black 30% overlay on every width. No fade of its own: the page-level HeroSeam strip (Figma Rectangle 1) blends it into the page.
// The wheel is one file (consultation-hero-wheel.png, 1408 x 768). Figma uses the same image on all three frames and
// crops it (Scale: Crop) to 817 x 446 desktop / 648 x 440 tablet / 371 x 252 phone, so it fills its box (object-cover,
// centred). The crop offset inside the image is assumed centred: check the numbers 1 and 9 against Figma.
// Title: Figma letter spacing is 0% for Lovelace; -0.01em compensates for the wider Libre Baskerville stand-in (same as
// the Home hero) so "Important Decisions" stays on one line at 425 (content 385).
// Phone buttons are measured: Book 211 x 48 (padding 10 / 10 / 10 / 16), View 238 x 48 (left 14), gap 12.
// TODO(figma): phone bottom padding (74 copied from tablet; the tablet 74 is measured) and the tablet button gap (16)
// are estimated.
const styles = {
  section: "overflow-hidden lg:min-h-140.25",
  background: "absolute inset-0",
  overlay: "absolute inset-0 bg-black/30",

  container:
    "relative flex flex-col gap-18.5 px-5 pt-40 pb-18.5 tab:mx-auto tab:max-w-192 tab:gap-15.75 tab:px-[min(3.75rem,calc(1.25rem_+_(100vw_-_37.5rem)_*_0.238))] tab:pt-47.5 lg:max-w-360 lg:gap-0 lg:px-20 lg:pt-42.25 lg:pb-0",
  text: "relative z-10 flex flex-col gap-10 tab:max-w-147.5 lg:w-[min(36.875rem,41vw)] lg:max-w-none lg:gap-8.5",
  copy: "flex flex-col gap-6 lg:gap-3",
  title: "type-consult-hero-title font-heading tracking-[-0.01em] text-accent lg:h-[2.4213em]",
  paragraph: "type-body-small text-light font-medium",
  actions: "flex flex-col items-start gap-3 tab:flex-row tab:gap-4",
  book: "h-12 pr-2.25 pl-3.75 lg:pl-5.75",
  plans: "h-12 pl-3.5 lg:w-65.5 lg:pl-2.5",
  wheel:
    "relative mx-auto aspect-371/252 w-[96.364%] max-w-92.75 tab:aspect-648/440 tab:w-full tab:max-w-162 lg:pointer-events-none lg:absolute lg:top-22.75 lg:left-[44.3056%] lg:mx-0 lg:aspect-817/446 lg:w-[56.7361%] lg:max-w-none",
} as const;

export function ConsultationHero() {
  const { title, text, book, plans, background, wheel } = consultationHeroContent;

  return (
    <Section
      container={false}
      spacing="none"
      aria-labelledby="consultation-hero-heading"
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
            <h1 id="consultation-hero-heading" className={styles.title}>
              {title}
            </h1>
            <p className={styles.paragraph}>{text}</p>
          </div>
          <div className={styles.actions}>
            <Button
              href={book.href}
              variant="outline-accent"
              size="hero"
              className={styles.book}
              iconRight={<ArrowCircle tone="accent" />}
            >
              {book.label}
            </Button>
            <Button
              href={plans.href}
              variant="accent"
              size="hero"
              className={styles.plans}
              iconRight={<ArrowCircle tone="primary" />}
            >
              {plans.label}
            </Button>
          </div>
        </div>

        <div className={styles.wheel}>
          <Image
            src={wheel.src}
            alt={wheel.alt}
            fill
            priority
            sizes="(min-width: 1024px) 817px, (min-width: 600px) 648px, 371px"
            className="object-cover object-center"
          />
        </div>
      </Container>
    </Section>
  );
}
