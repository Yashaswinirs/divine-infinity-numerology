import { Container, Section } from "@/components/layout";
import { FaqAccordion } from "@/components/shared";
import { Ornament } from "@/components/shared/Ornament";
import { consultationFaqContent } from "@/data/consultation";

// Figma Consultation section 7 (same FAQ design as Home 11 and Contact 5, its own measurements).
// Desktop 1440 x 953 (fixed, content centred): content 816 x 786.42 = ornament 362 x 34.42, gap 25, title 43.95/48, gap 60,
// list 619 (6 cards 816 x 74, gap 35). Padding (953 - 786.42) / 2 = 83.29 (derived, no scale value).
// Tablet 768 x 763.91: padding 40 / 60, content 648 = ornament 262 x 24.91, gap 25, title 35/40 with cap trim (25), gap 40,
// list 569 (6 cards 74, gap 25; the panel reads 24 but the 569 total means 25, as on Home).
// Phone 425 x 754.91: padding 25 / 20, content 385 = heading 105.91 (ornament, gap 25, title 30.43/35 on two lines with cap
// trim = 56), gap 30, list 569. Wrapped questions have a hanging indent (variant="indent").
// Breakpoints: md (768) and xl (1280), like the Home and Contact FAQ (FaqAccordion switches there). 600 to 767 shows the phone
// layout and 1024 to 1279 the tablet layout (no Figma frame for them).
// No background: the shared StarField and the page gradient in page.tsx keep the flow with sections 2 to 6.
// The heading is built here (not SectionHeading) because the ornament to title gap is 25 on every width (Home has 69 on desktop).
// TODO(figma): the tablet and phone question panels were not received (19.08 and 17.3 come from the H5 list); the desktop
// padding is derived from the fixed 953 height; the tablet list gap reads 24 in the panel (25 from the total).
// TODO(client): the answers are the Figma prototype placeholder (the same text on all six cards). Send the real answers.
const styles = {
  section: "py-6.25 md:py-10 xl:py-[83.29px]",
  container: "relative px-5 md:px-15",
  content: "mx-auto flex w-full max-w-204 flex-col gap-7.5 md:gap-10 xl:gap-15",
  heading: "flex flex-col items-center gap-6.25",
  title: "type-section-title font-heading text-accent text-center font-normal tracking-normal",
} as const;

export function ConsultationFaq() {
  const { title, items } = consultationFaqContent;

  return (
    <Section
      id="faq"
      container={false}
      spacing="none"
      aria-labelledby="consultation-faq-heading"
      className={styles.section}
    >
      <Container padding="page" className={styles.container}>
        <div className={styles.content}>
          <div className={styles.heading}>
            <Ornament variant="section" tone="gold" />
            <h2 id="consultation-faq-heading" className={styles.title}>
              {title}
            </h2>
          </div>
          <FaqAccordion items={items} variant="indent" />
        </div>
      </Container>
    </Section>
  );
}
