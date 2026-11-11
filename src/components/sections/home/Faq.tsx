import { Container, Section } from "@/components/layout";
import { FaqAccordion, SectionHeading } from "@/components/shared";
import { faqContent } from "@/data/home";

// Figma desktop (measured): frame 1440 x 841.42, padding 60 top and bottom. Content 816 wide: ornament 362 x 34.42, 69 to the
// title (43.95/48 Accent), 60 to the list. List 510 tall: 5 cards 816 x 74, gap 35. 60 + 34.42 + 69 + 48 + 60 + 510 + 60 = 841.42.
// Tablet (frame 768 x 678, padding 40 / 60): content 648, list 470 (5 cards x 74, gap 25), title 35/40. Phone (frame 425 x 655.91,
// padding 25 / 20): content 385, title 30.43/35 on two lines, heading block 105.91, 30 to the list, list 470 (gap 25).
// The ornament is 262 wide on tablet and phone (read from the canvas, it fits the 105.91 heading block) and 25 above the title
// (SectionHeading gives 15, so +10); on desktop the gap is 69 (SectionHeading 15 + 55.66, which includes the 1.66 by which the
// Figma ornament frame is taller than the SVG). Title to list: 30 phone (measured), 54 tablet (derived: 598 - 470 - ornament -
// 25 - title), 60 desktop (measured).
// Shares the star field with Blogs (one StarField in the wrapper in page.tsx).
// TODO(figma): the gap of the tablet list reads 24 in the panel but the 470 total means 25; the tablet title to list gap is derived.
// TODO(client): the answers of questions 2 to 5 are the Figma placeholder text; send the real answers.
const styles = {
  section: "py-6.25 md:py-10 xl:py-15",
  container: "relative px-5 md:px-15",
  content: "mx-auto flex w-full max-w-204 flex-col gap-7.5 md:gap-13.5 xl:gap-15",
  ornament: "w-65.5 xl:mb-[54px] xl:w-90.5",
} as const;

export function Faq() {
  const { title, items } = faqContent;

  return (
    <Section
      container={false}
      spacing="none"
      aria-labelledby="faq-heading"
      className={styles.section}
    >
      <Container padding="page" className={styles.container}>
        <div className={styles.content}>
          <SectionHeading
            titleId="faq-heading"
            title={title}
            titleSize="section"
            ornamentTone="gold"
            ornamentClassName={styles.ornament}
          />
          <FaqAccordion items={items} />
        </div>
      </Container>
    </Section>
  );
}
