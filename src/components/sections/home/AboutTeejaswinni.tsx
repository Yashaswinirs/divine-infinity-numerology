import { Section } from "@/components/layout";
import { ArchPortrait, ArrowCircle, SectionHeading } from "@/components/shared";
import { Button, Text } from "@/components/ui";
import { aboutContent } from "@/data/home";

// Layouts: phone (below 600): one centered column. Tablet (600-1023): grid, portrait right, gap 40 at every
// width. From 900px the second paragraph moves up beside the portrait (no empty gap). Laptop (1024+): text column
// left (heading, subtitle, both paragraphs, button), portrait right, like the 1440 Figma frame. The exact Figma
// sizes (row 506, column 810, portrait 402) apply from 1440 (2xl); between 1024 and 1439 the text column flexes.
// One DOM order; `contents` wrappers vanish below lg so grid placement can rearrange the pieces.
const styles = {
  section: "pt-7.5 pb-7.5 tab:py-10 lg:pb-11",
  layout:
    "relative grid grid-cols-1 tab:grid-cols-[minmax(0,1fr)_clamp(13rem,45vw,21.6875rem)] tab:grid-rows-[auto_1fr_auto_auto] tab:gap-x-10 lg:flex lg:items-center lg:justify-between lg:gap-10 xl:min-h-126.5",
  textColumn:
    "contents lg:flex lg:min-w-0 lg:flex-1 lg:flex-col lg:gap-11.25 2xl:w-202.5 2xl:flex-none",
  textFrame: "contents lg:flex lg:flex-col lg:gap-10 2xl:w-200.5",
  paragraphs: "contents lg:flex lg:flex-col lg:gap-3 2xl:max-w-195",
  heading: "tab:col-start-1 tab:row-start-1",
  paragraph: "text-light type-body-small text-center tab:text-left",
  intro: "mt-7.5 tab:col-start-1 tab:row-start-2 tab:mt-10 lg:mt-0",
  approach:
    "mt-3 tab:col-span-2 tab:row-start-3 tab:mt-7.5 min-[900px]:col-span-1 min-[900px]:col-start-1 lg:mt-0",
  button:
    "order-last mt-11.25 w-full pl-4 gap-3.25 shadow-none tab:order-none tab:col-span-2 tab:row-start-4 tab:mt-10 tab:w-auto tab:justify-self-start min-[900px]:col-span-1 lg:mt-0 lg:w-fit lg:self-start",
  portrait:
    "mx-auto mt-11.25 w-85 max-w-full tab:col-start-2 tab:row-span-2 tab:row-start-1 tab:mx-0 tab:mt-0 tab:w-full min-[900px]:row-span-3 lg:w-[clamp(20rem,32vw,25.125rem)] lg:shrink-0",
} as const;

export function AboutTeejaswinni() {
  const { title, subtitle, introParagraph, approachParagraph, cta, portrait } = aboutContent;

  return (
    <Section
      spacing="none"
      containerPadding="page"
      aria-labelledby="about-heading"
      className={styles.section}
    >
      <div className={styles.layout}>
        <div className={styles.textColumn}>
          <div className={styles.textFrame}>
            <SectionHeading
              variant="feature"
              titleId="about-heading"
              title={title}
              subtitle={subtitle}
              // Figma ornament frame is 34.42 tall, the exported SVG 32.76.
              ornamentClassName="xl:mb-[1.66px]"
              className={styles.heading}
            />
            <div className={styles.paragraphs}>
              <Text weight="medium" className={`${styles.paragraph} ${styles.intro}`}>
                {introParagraph}
              </Text>
              <Text weight="medium" className={`${styles.paragraph} ${styles.approach}`}>
                {approachParagraph}
              </Text>
            </div>
          </div>

          <Button
            href={cta.href}
            variant="accent"
            size="hero"
            className={styles.button}
            iconRight={<ArrowCircle />}
          >
            {cta.label}
          </Button>
        </div>

        <ArchPortrait
          src={portrait.src}
          alt={portrait.alt}
          sizes="(min-width: 1024px) 402px, (min-width: 600px) 312px, 306px"
          className={styles.portrait}
        />
      </div>
    </Section>
  );
}
