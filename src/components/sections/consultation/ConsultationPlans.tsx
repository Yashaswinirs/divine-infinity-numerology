import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Ornament } from "@/components/shared";
import { Heading } from "@/components/ui";
import { consultationPlansContent } from "@/data/consultation";
import { ConsultationPlanCard } from "./ConsultationPlanCard";

// Figma Consultation Section 2, "Personalised Guidance That Puts You First" (Frame 244 desktop, Frame 287 tablet and phone).
// Breakpoints: phone below 600, tablet from tab (600), laptop and desktop from lg (1024), Figma desktop sizes from xl (1280).
// Desktop (1440 x 894.42, measured): padding 60 / 80, content 1280, gap 66 between the heading block and the cards.
//   Heading block 814 wide, gap 25: ornament 362 x 34.42 (gold file), gap 25, title 43.95/48 on two lines, then the
//   paragraph Body Large 18/22.6 (814 x 46). Cards: three 403.33 x 482 with gap 32 (code: equal columns, 405.33 at 1440).
// Tablet (768 x 1333.91, measured): padding 40 / 60, gap 40, heading 648 wide (gap 25, ornament 262), cards 314 wide
//   (two per row, gap 20) and the third centred below; row 2 card is 511 tall (derived from the 1006 total).
// Phone (425 x 1698.91, measured): padding 25 / 20, gap 30, heading 385 wide, one column of cards, gap 20, 385 x 453.
// The side padding eases from 20 at 600 to 60 at 768 (same formula as the Consultation hero). From lg it is 60, from xl 80.
// The title has a fixed line break after "Guidance" (Figma breaks it by hand on every width).
// The strip behind the top of this section is HeroSeam (page wrapper), the stars are the page's StarField.
// The phone and tablet ornament is 262 wide with gap 25 to the title (261.97 x 24.91, the same ornament as section 3).
// scroll-mt keeps the heading clear of the fixed navbar after a click on #plans (80 below lg, 60 from lg; estimated,
// TODO(figma): the navbar height was not measured). lg (1024 to 1279) follows the desktop layout with gap 24 (no frame).
const styles = {
  section: "relative scroll-mt-20 lg:scroll-mt-15",
  container:
    "mx-auto flex w-full flex-col items-center gap-7.5 px-5 py-6.25 tab:max-w-192 tab:gap-10 tab:px-[min(3.75rem,calc(1.25rem_+(100vw-37.5rem)*_0.238))] tab:py-10 lg:max-w-360 lg:gap-16.5 lg:px-15 lg:py-15 xl:px-20",
  heading: "flex w-full flex-col items-center gap-6.25 text-center lg:max-w-203.5",
  titleGroup: "flex flex-col items-center gap-6.25",
  ornament: "aspect-[10.517] h-auto w-65.5 xl:w-90.5",
  title: "text-accent whitespace-pre-line",
  text: "type-body-large text-light w-full font-medium",
  list: "flex w-full flex-col gap-5 tab:flex-row tab:flex-wrap tab:justify-center lg:flex-nowrap lg:justify-start lg:gap-6 xl:gap-8",
  item: "flex tab:w-[calc((100%-1.25rem)/2)] tab:max-lg:last:min-h-127.75 lg:w-[calc((100%-3rem)/3)] xl:w-[calc((100%-4rem)/3)]",
} as const;

export function ConsultationPlans() {
  const { title, text, feeLabel, featureIcon, plans } = consultationPlansContent;

  return (
    <Section
      container={false}
      spacing="none"
      id="plans"
      aria-labelledby="consultation-plans-heading"
      className={styles.section}
    >
      <Container padding="none" className={styles.container}>
        <div className={styles.heading}>
          <div className={styles.titleGroup}>
            <Ornament variant="section" tone="gold" className={styles.ornament} />
            <Heading
              as="h2"
              id="consultation-plans-heading"
              size="sectionTab"
              font="heading"
              align="center"
              className={styles.title}
            >
              {title}
            </Heading>
          </div>
          <p className={styles.text}>{text}</p>
        </div>

        <ul className={styles.list}>
          {plans.map(({ id, ...plan }) => (
            <li key={id} className={styles.item}>
              <ConsultationPlanCard
                id={id}
                feeLabel={feeLabel}
                featureIcon={featureIcon}
                {...plan}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
