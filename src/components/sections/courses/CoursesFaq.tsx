import { Container, Section } from "@/components/layout";
import { FaqAccordion, Ornament } from "@/components/shared";
import { coursesFaqContent } from "@/data/courses";

// Figma Courses Section 6, "Frequently Asked Questions" (desktop Frame 254, "Courses Tab" and "Courses Mobile" Frame 330).
// Reuses the shared FaqAccordion with variant="indent" (the same card as Consultation 7): card 74 tall + 0.5px border, radius 24,
// toggle 50 x 50, question H5 (type-faq-question), wrapped questions indented 24 below md.
// Desktop 1440 x 959 (fixed, content centred): content 816 x 801.42 = ornament 362 x 34.42, gap 40, title 43.95/48, gap 60,
//   list 619 (6 cards, gap 35). The cards render 75 tall (74 + the 0.5px borders at 2x, the same +6 that Consultation 7 measured),
//   so the padding is (959 - 807.42) / 2 = 75.79 (derived) and the section is 959 tall.
// Tablet 768 x 703.91: padding 40 / 60, content 648 = heading 74.91 (ornament 261.97 x 24.91, title 35/40 with cap trim),
//   gap 40, list 509 (6 cards, gap 12).
// Phone 425 x 704.91: padding 25 / 20, content 385 = heading 105.91 (title on two lines), gap 40, list 509 (gap 12).
// Breakpoints: md (768) and xl (1280), like Home, Contact and Consultation (FaqAccordion switches there). 600 to 767 shows the
//   phone layout and 1024 to 1279 the tablet layout (no Figma frame for them).
// The card gap below xl is 12 here (Consultation has 25): FaqAccordion keeps its own gap, the wrapper overrides it with
//   `[&>ul]:gap-3`, which has a higher specificity than the gap class on the list, so FaqAccordion is not edited.
// No hover and no animation in Figma (confirmed). The accordion keeps its own smooth open (300ms).
// No background: the shared StarField and the page gradient in page.tsx run under it.
// TODO(client): answers 2 to 6 are the Figma prototype placeholder (see coursesFaqContent).
// TODO(figma): 600 to 767, 1024 to 1279, 375 and 320 have no frame (derived). Lovelace Text is not loaded (stand-in font).
const styles = {
  section: "py-6.25 md:py-10 xl:py-[75.79px]",
  container: "relative px-5 md:px-15",
  content: "mx-auto flex w-full max-w-204 flex-col gap-10 xl:gap-15",
  heading: "flex flex-col items-center gap-6.25 xl:gap-10",
  ornament: "aspect-[10.517] h-auto w-65.5 xl:w-90.5",
  title: "type-section-title font-heading text-accent text-center font-normal tracking-normal",
  list: "max-xl:[&>ul]:gap-3",
} as const;

export function CoursesFaq() {
  const { title, items } = coursesFaqContent;

  return (
    <Section
      id="faq"
      container={false}
      spacing="none"
      aria-labelledby="courses-faq-heading"
      className={styles.section}
    >
      <Container padding="page" className={styles.container}>
        <div className={styles.content}>
          <div className={styles.heading}>
            <Ornament variant="section" tone="gold" className={styles.ornament} />
            <h2 id="courses-faq-heading" className={styles.title}>
              {title}
            </h2>
          </div>
          <div className={styles.list}>
            <FaqAccordion items={items} variant="indent" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
