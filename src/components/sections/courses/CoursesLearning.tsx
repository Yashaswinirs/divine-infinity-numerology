import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { TestimonialsCarousel } from "@/components/sections/home/TestimonialsCarousel";
import { Ornament } from "@/components/shared";
import { Heading } from "@/components/ui";
import { coursesLearningContent } from "@/data/courses";

// Figma Courses Section 4, "Learning That Makes a Difference" (desktop Frame 276, "Courses Tab" Frame 397, "Courses Mobile" Frame 397).
// The carousel is the Home TestimonialsCarousel (Figma "Frame 275" is the same 740 x 314 card, dots 98 x 24, arrows 40 x 40) with two
// opt-in props that Home does not use: fitActiveSlide (the card is as tall as the visible slide: phone Figma card 385 x 345 shows slide 1
// at its own height) and fixedAuthor (author column 112 wide, so the quote starts at x = 248 on desktop and tablet and x = 158 on phone).
// Breakpoints (same as Courses 2 and 3): phone below 600, tablet from tab (600), laptop from lg (1024), Figma desktop sizes from xl (1280).
// Desktop (1440 x 616 FIXED, measured): padding 60 top and 10 sides, content 959 centred, gap 74. Heading block 959 x 122.42:
//   ornament 362 x 34.42 (gold), gap 40, title H2 43.95/48 on one line, centred, Accent. Card 740 x 314.
//   60 + 122.42 + 74 + 314 = 570.42, so about 45.58 is left below the content in the fixed 616 (derived): xl has no bottom padding.
// Tablet (768 x 612.91, measured): padding 40 / 60, content 648. Heading block 648 x 129.91: ornament 261.97 x 24.91, gap 40 (derived
//   from 129.91 - 24.91 - 65), title H2 T 35/40 (cap trim) on two lines. Gap 74 to the card (read from the canvas, about 73.6).
// Phone (425 x 545.91, measured): padding 25 / 20, content 385. Ornament 261.97 x 24.91 (measured), title H2 M 30.43/35 on two lines.
//   Heading gap 40 and heading to card 30 are ESTIMATED (derived from the frame height with a card of about 345).
// The title breaks after "That" below lg (Figma tablet and phone) and is one line from lg (Figma desktop).
// Side padding eases from 20 at 600 to 60 at 768 (same formula as Courses 2 and 3). From lg it is 60, from xl 10.
// The card follows the Home TestimonialsCarousel / TestimonialCard breakpoints (md 768, xl 1280), so from 600 to 767 it keeps the phone card layout.
// No background: the page gradient and the shared StarField (courses/page.tsx) run under this section.
// TODO(figma): 600 to 767 and 1024 to 1279 have no frame (derived); the tablet and phone title panels and the phone gaps were not received.
const styles = {
  section: "relative xl:min-h-154",
  container:
    "mx-auto w-full px-5 py-6.25 tab:px-[min(3.75rem,calc(1.25rem_+(100vw-37.5rem)*_0.238))] tab:py-10 lg:px-15 lg:py-15 xl:px-2.5 xl:pb-0",
  content: "mx-auto flex w-full max-w-239.75 flex-col items-center gap-7.5 tab:gap-18.5",
  heading: "flex w-full flex-col items-center gap-10",
  ornament: "aspect-[10.517] h-auto w-65.5 xl:w-90.5",
  title: "text-accent text-center",
  // Below lg the first line is a block, so the title breaks after "That" like the Figma tablet and phone frames.
  firstLine: "max-lg:block",
} as const;

export function CoursesLearning() {
  const { titleLines, labels, items } = coursesLearningContent;

  return (
    <Section
      container={false}
      spacing="none"
      id="learning"
      aria-labelledby="courses-learning-heading"
      className={styles.section}
    >
      <Container padding="none" className={styles.container}>
        <div className={styles.content}>
          <div className={styles.heading}>
            <Ornament variant="section" tone="gold" className={styles.ornament} />
            <Heading
              as="h2"
              id="courses-learning-heading"
              size="sectionTab"
              font="heading"
              align="center"
              className={styles.title}
            >
              <span className={styles.firstLine}>{titleLines[0]}</span> <span>{titleLines[1]}</span>
            </Heading>
          </div>

          <TestimonialsCarousel items={items} labels={labels} fitActiveSlide fixedAuthor />
        </div>
      </Container>
    </Section>
  );
}
