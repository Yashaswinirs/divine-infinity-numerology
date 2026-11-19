import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Ornament } from "@/components/shared";
import { Heading } from "@/components/ui";
import { consultationTypesContent } from "@/data/consultation";
import { ConsultationTypeTile } from "./ConsultationTypeTile";

// Figma Consultation Section 3, "Choose the Consultation That Fits Your Needs" (Frame 148 desktop, Frame 290 on
// "Consultation Tab" and "Consultation Mobile").
// Breakpoints: phone below 600, tablet from tab (600), laptop and desktop from lg (1024), Figma desktop sizes from xl (1280).
// Desktop (1440 x 793.42, measured): padding 60 / 80, content 1280, gap 60. Heading block 814 wide, gap 25: ornament 362 x
//   34.42 (gold file), gap 25, title 43.95/48 on two lines (96), gap 25, paragraph Body Large 18/22.6 (814 x 46).
//   Grid 1280 x 387: 4 columns x 3 rows, gap 24, tiles 302 x 113.
// Tablet (768 x 1105.91, measured): padding 40 / 60, content 648, gap 40. Heading 207.91 tall: ornament 261.97 x 24.91,
//   gap 25, title 35/40 with cap trim (65), gap 25, paragraph 538 x 68 (three lines). Grid 648 x 778: 2 columns x 6 rows,
//   gap 20, tiles 314 x 113.
// Phone (425 x 1217.91, measured): padding 25 / 20, content 385, gap 30. Heading 221.91 tall: ornament 24.91, gap 25,
//   title 30.43/35 with cap trim (56), gap 25, paragraph 385 x 91 (four lines). Grid 385 x 916, 2 columns, gap 20, tiles
//   182.5 x 136 (two-line labels).
// The side padding eases from 20 at 600 to 60 at 768 (same formula as Section 2). From lg it is 60, from xl 80.
// The title has fixed line breaks (Figma breaks it by hand): after "That" on tablet and desktop, after "Consultation" on
// phone. Every tile scrolls to the plans (section 2). The stars come from the page's StarField.
// TODO(figma): lg (1024 to 1279) has no frame (desktop layout, grid gap 16, tile padding 8); the hover values are estimated.
const styles = {
  section: "relative",
  container:
    "mx-auto flex w-full flex-col items-center gap-7.5 px-5 py-6.25 tab:max-w-192 tab:gap-10 tab:px-[min(3.75rem,calc(1.25rem_+(100vw-37.5rem)*_0.238))] tab:py-10 lg:max-w-360 lg:gap-15 lg:px-15 lg:py-15 xl:px-20",
  heading: "flex w-full flex-col items-center gap-6.25 text-center",
  titleGroup: "flex flex-col items-center gap-6.25",
  ornament: "aspect-[10.517] h-auto w-65.5 xl:w-90.5",
  title: "text-accent max-[374px]:text-balance",
  text: "type-body-large text-light min-h-22.75 w-full font-medium tab:min-h-17 tab:max-w-134.5 lg:min-h-11.5 lg:max-w-203.5",
  list: "grid w-full grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-4 xl:gap-6",
  item: "flex",
} as const;

export function ConsultationTypes() {
  const { title, compactTitle, text, href, types } = consultationTypesContent;

  return (
    <Section
      container={false}
      spacing="none"
      id="services"
      aria-labelledby="consultation-types-heading"
      className={styles.section}
    >
      <Container padding="none" className={styles.container}>
        <div className={styles.heading}>
          <div className={styles.titleGroup}>
            <Ornament variant="section" tone="gold" className={styles.ornament} />
            <Heading
              as="h2"
              id="consultation-types-heading"
              size="sectionTab"
              font="heading"
              align="center"
              className={styles.title}
            >
              <span className="tab:hidden whitespace-pre-line">{compactTitle}</span>
              <span className="tab:inline hidden whitespace-pre-line">{title}</span>
            </Heading>
          </div>
          <p className={styles.text}>{text}</p>
        </div>

        <ul className={styles.list}>
          {types.map(({ id, label, compactLabel, icon }) => (
            <li key={id} className={styles.item}>
              <ConsultationTypeTile
                label={label}
                compactLabel={compactLabel}
                icon={icon}
                href={href}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
