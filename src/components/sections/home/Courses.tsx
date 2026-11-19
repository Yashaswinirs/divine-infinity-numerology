import { Container, Section } from "@/components/layout";
import { ArrowCircle, CourseCard, SectionHeading } from "@/components/shared";
import { Button } from "@/components/ui";
import { coursesContent } from "@/data/home";

// Figma desktop (measured): frame 1440 x 897. Content 1340 wide (container padding 50 at 1440).
// Heading block 880 wide x 167.42: ornament 362 (gap 25 to the title), title 43.95/48, gap 15, subtitle Lato 500 16/22.2
// in Light, 2 lines. Cards frame 1340 x 610: scroller 1340 x 522 (cards 374 x 398, 40 at the sides, 62 above and below,
// gap 70), gap 40, button 196 x 48. Vertical sum: 50 + 167.42 + 30 + 610 + 40 = 897.42. The 897 total and the 167.42 /
// 522 / 610 frames are measured; the 50 / 30 / 40 split is read from the canvas.
// The Figma frame is annotated SCROLLS: below xl the cards sit in a horizontal scroll row that runs to the screen edge
// (the next card peeks out). Tablet and phone sizes (card 264 / 290 wide, gap 38 / 20, ornament 262 / 162) are estimated.
// TODO(figma): tablet and phone panels (section padding, heading gaps, card, button) were not received.
const styles = {
  // Seam above: 64 on phone (14 from Why Learn + 50), 115 on tablet (67 + 48). Seam below (Figma): 63 on phone,
  // 84 on tablet, counting Consultation's 60 top padding (estimated there, re-check in Section 8).
  section: "pt-12.5 pb-0.75 tab:pt-12 tab:pb-6 xl:pt-12.5 xl:pb-10",
  container: "relative px-5 tab:px-15 lg:px-10 xl:px-10 2xl:px-12.5",
  content: "flex w-full flex-col gap-7.5",
  heading: "mx-auto max-w-220",
  // Figma ornament to title is 25; SectionHeading gives 15, so +10. At xl the Figma ornament frame is 1.66 taller.
  ornament: "mb-2.5 w-40.5 tab:w-65.5 xl:mb-[11.66px] xl:w-90.5",
  // Title to paragraph is 30 on phone and tablet (SectionHeading gives 15), 15 on desktop.
  subtitle: "mt-3.75 xl:mt-0",
  cards: "flex flex-col gap-10",
  // Phone and tablet: scroll row, first card 18px (phone) / 78px (tablet) from the page edge, gap 37, 36 above and 27
  // below the card for the shadow. From lg (1024) three flexible cards, gap 40; from xl gap 70 as Figma desktop.
  rail: "-mx-5 flex snap-x snap-mandatory scroll-px-4.5 gap-9.25 overflow-x-auto px-4.5 pt-10 pb-6.75 [scrollbar-width:thin] [scrollbar-color:var(--color-card-border)_transparent] pointer-coarse:[scrollbar-width:none] tab:-mx-15 tab:scroll-px-19.5 tab:px-19.5 tab:pt-9 lg:mx-0 lg:snap-none lg:gap-10 lg:overflow-visible lg:px-0 xl:gap-17.5 xl:px-10 xl:pt-15.5 xl:pb-15.5",
  item: "flex w-66 shrink-0 snap-start lg:w-auto lg:max-w-93.5 lg:min-w-0 lg:flex-1 lg:basis-0",
  cta: "flex justify-center",
  // Figma button: 40 tall, full width (385) on phone, about 196 wide on tablet, 14px text. Desktop 48 tall, 16px text.
  button: "h-10 w-full min-w-49 py-0 text-sm shadow-none tab:w-auto xl:h-12 xl:text-base",
} as const;

export function Courses() {
  const { title, subtitle, cta, courses } = coursesContent;

  return (
    <Section
      container={false}
      spacing="none"
      aria-labelledby="courses-heading"
      className={styles.section}
    >
      <Container padding="page" className={styles.container}>
        <div className={styles.content}>
          <SectionHeading
            titleId="courses-heading"
            title={title}
            subtitle={subtitle}
            titleSize="sectionTab"
            ornamentClassName={styles.ornament}
            subtitleClassName={styles.subtitle}
            className={styles.heading}
          />

          <div className={styles.cards}>
            <ul className={styles.rail}>
              {courses.map((course) => (
                <li key={course.href} className={styles.item}>
                  <CourseCard {...course} className="w-full" />
                </li>
              ))}
            </ul>

            <div className={styles.cta}>
              <Button
                href={cta.href}
                variant="accent"
                size="hero"
                iconRight={<ArrowCircle />}
                className={styles.button}
              >
                {cta.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
