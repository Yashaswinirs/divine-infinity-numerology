import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Ornament } from "@/components/shared";
import { Heading } from "@/components/ui";
import { consultationExpectationContent } from "@/data/consultation";
import { ConsultationExpectationStep } from "./ConsultationExpectationStep";

// Figma Consultation Section 4, "What to Expect" (Frame 152 desktop, Frame 294 on "Consultation Tab" and "Consultation Mobile").
// Breakpoints: phone below 600, tablet from tab (600), laptop from lg (1024), Figma desktop sizes from xl (1280).
// Desktop (1440 x 680.23, measured): padding 60 top and bottom, gap 60. Heading block 503 wide, gap 25 (107.23 + 25 + 81 = 213.23):
//   ornament 360 x 34.23 (gold file), gap 25, title 43.95/48 (one line), gap 25, paragraph Body Large 18/22.6 (503 x 46, two
//   lines), gap 12, note Body small 16/22.2 Accent (one line). Steps row 1224 x 287: four cards 228 wide, gap 104, centred.
// Tablet (768 x 914.91, measured): padding 40 / 60, gap 40, content 648. Heading 180.91 tall: ornament 261.97 x 24.91, gap 25,
//   title 35/40 with cap trim (25 tall), gap 25, paragraph 450 x 46, gap 12, note one line. Grid 648 x 614: 2 x 2, gap 40,
//   cards 304 x 287, no connectors.
// Phone (425 x 812.91, measured): padding 25 / 20, gap 30, content 385. Heading 198.91 tall: title 30.43/35 with cap trim (21),
//   paragraph 385 x 46, note on two lines (breaks after "both"). Grid 385 x 534: 2 x 2, gap 20, cards 182.5 x 257.
// The side padding eases from 20 at 600 to 60 at 768 (same formula as Sections 2 and 3). From lg it is 16 (the row of four
// cards needs the width) and from xl 28, so the 1224 row fits at 1280. At 1440 and above the row is centred.
// TODO(figma): 1024 to 1279 has no frame (one row, cards flexible, connector slot 40 wide), and 320 to 599 follows the phone frame.
const styles = {
  section: "relative",
  container:
    "mx-auto flex w-full flex-col items-center gap-7.5 px-5 py-6.25 tab:max-w-192 tab:gap-10 tab:px-[min(3.75rem,calc(1.25rem_+(100vw-37.5rem)*_0.238))] tab:py-10 lg:max-w-360 lg:gap-15 lg:px-4 lg:py-15 xl:px-7",
  heading: "flex w-full flex-col items-center gap-6.25 text-center lg:max-w-125.75",
  titleGroup: "flex flex-col items-center gap-6.25",
  ornament: "aspect-[10.517] h-auto w-65.5 xl:w-90",
  title: "text-accent",
  texts: "flex w-full flex-col items-center gap-3",
  text: "type-body-large text-light w-full font-medium tab:max-w-112.5 lg:max-w-125.75",
  note: "type-body-small text-accent w-full font-medium",
  list: "grid w-full grid-cols-2 gap-5 tab:gap-10 lg:flex lg:items-stretch lg:justify-center lg:gap-10 xl:max-w-306 xl:gap-26",
} as const;

export function ConsultationExpectation() {
  const { title, text, note, compactNote, stepLabel, connectors, steps } =
    consultationExpectationContent;

  return (
    <Section
      container={false}
      spacing="none"
      id="expectation"
      aria-labelledby="consultation-expectation-heading"
      className={styles.section}
    >
      <Container padding="none" className={styles.container}>
        <div className={styles.heading}>
          <div className={styles.titleGroup}>
            <Ornament variant="section" tone="gold" className={styles.ornament} />
            <Heading
              as="h2"
              id="consultation-expectation-heading"
              size="sectionTab"
              font="heading"
              align="center"
              className={styles.title}
            >
              {title}
            </Heading>
          </div>
          <div className={styles.texts}>
            <p className={styles.text}>{text}</p>
            <p className={styles.note}>
              <span className="tab:hidden whitespace-pre-line">{compactNote}</span>
              <span className="tab:inline hidden">{note}</span>
            </p>
          </div>
        </div>

        <ol role="list" className={styles.list}>
          {steps.map((step, index) => (
            <ConsultationExpectationStep
              key={step.id}
              number={index + 1}
              label={stepLabel}
              intro={step.intro}
              text={step.text}
              compactText={step.compactText}
              shortText={step.shortText}
              glow={step.glow}
              connector={connectors[index]}
            />
          ))}
        </ol>
      </Container>
    </Section>
  );
}
