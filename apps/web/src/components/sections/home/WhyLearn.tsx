import { Container, Section } from "@/components/layout";
import { FeatureTile, SectionHeading } from "@/components/shared";
import { whyLearnContent } from "@/data/home";

// Figma desktop (measured): section padding 60 / 60, content frame 1005 wide (xl:max-w-251.25), gap 60 between
// the heading block and the grid. Heading block: ornament 362 x 34.42, gap 25, title 43.95/48, gap 15,
// subtitle Lato 500 16/22.2 white on 2 lines. Grid: 3 columns, column gap 48, row gap 54, tiles 303 x 118.
// Tablet (768, estimated from the canvas): grid 654 wide = 2 x 303 + 48 (side padding 57), row gap 48,
// heading to grid about 40, ornament 262, subtitle on 2 lines. Top padding 73 so the ornament sits 126 below
// the Awards cards as in Figma (Awards bottom padding is 53 at md).
// Phone (425, estimated): 1 column, tiles 303 centred, gap 20, ornament 162, title on 2 lines, subtitle on 3 lines,
// title to subtitle gap about 40. Tablet starts at md and desktop at xl, like Awards.
// TODO(figma): tablet and phone section padding, heading gaps and the phone title-to-subtitle gap are estimated.
// The star field is shared with Courses: one StarField in the wrapper in src/app/(public)/page.tsx.
const styles = {
  section: "pt-15 pb-3.5 tab:pt-18.25 tab:pb-16.75 lg:pt-15 lg:pb-15",
  // 20px side padding from 768 up; the content block below is capped and centred, so the grid is 654 / 1005 wide.
  container: "relative md:px-5 lg:px-5",
  content: "mx-auto flex w-full flex-col gap-10 tab:max-w-163.5 lg:max-w-251.25 lg:gap-15",
  // Figma ornament to title gap is 25; SectionHeading gives 15, so +10. At xl the Figma ornament frame
  // (34.42) is 1.66 taller than the exported SVG (32.76): 10 + 1.66 = 11.66 (no scale value exists).
  ornament: "mb-2.5 w-40.5 tab:w-65.5 xl:mb-[11.66px] xl:w-90.5",
  // Subtitle is white (not text-light). md:max-w-127.5 (510) reproduces the Figma line break after "and"
  // (line 1 is about 479 wide, adding "helping" needs about 535). Phone wraps naturally in 385.
  subtitle: "mt-6.25 text-white tab:mt-0 tab:max-w-127.5",
  grid: "grid w-full grid-cols-1 gap-5 tab:grid-cols-2 tab:gap-12 lg:grid-cols-3 lg:gap-y-13.5",
} as const;

export function WhyLearn() {
  const { title, subtitle, tiles } = whyLearnContent;

  return (
    <Section
      container={false}
      spacing="none"
      aria-labelledby="why-learn-heading"
      className={styles.section}
    >
      <Container padding="page" className={styles.container}>
        <div className={styles.content}>
          <SectionHeading
            titleId="why-learn-heading"
            title={title}
            subtitle={subtitle}
            titleSize="sectionTab"
            ornamentClassName={styles.ornament}
            subtitleClassName={styles.subtitle}
          />

          <ul className={styles.grid}>
            {tiles.map((tile) => (
              <FeatureTile key={tile} as="li" label={tile} />
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
