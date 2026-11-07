import { Container, Section } from "@/components/layout";
import { CourseCard, SectionHeading, StarField } from "@/components/shared";
import { consultationContent } from "@/data/home";

// Figma desktop (measured): content 1280 wide (container padding 80 at 1440). Heading block 956 wide x 145.42: ornament 362 x 34.42,
// gap 25 to the title (43.95/48 Accent), gap 15, subtitle Lato 500 18/22.6 (Body Large) in Light, one line.
// Cards 374 x 399, gap 68 both ways: row 1 has 3 cards, row 2 has 2 cards centred. Section padding 60 / 60, heading to cards 55.
// Tablet (768, measured): ornament 262, title 35/40, subtitle Body small 16/22.2. Cards 264 x 399 in a horizontal scroll row
// (Figma frame 680 x 437: 16 above and 22 below the cards for the shadow), first card 60 from the edge, gap about 30 (read from the
// canvas, +-3). Section padding 40 top and bottom, heading to scroll frame 40. Courses to the ornament 80.
// Phone (425, measured): no scroll, 5 cards stacked, 385 x 351 (20px sides), gap 40, ornament 162, title 30.43/35, heading to
// cards 40. Courses frame to this section 64 (Courses keeps 3 below its button, so 61 here).
// The tablet layout starts at 600 (tab), like About and Milestones. 1024 to 1279 keeps the scroll row (no Figma frame there).
// TODO(figma): phone bottom padding (next to Testimonials), the tablet card gap and the 1024 layout are not confirmed.
const styles = {
  section: "pt-15.25 pb-15 tab:pt-14 tab:pb-10 xl:py-15",
  container: "relative px-5 tab:px-15 xl:px-20",
  content: "flex w-full flex-col gap-10 xl:gap-13.75",
  heading: "mx-auto max-w-239",
  // Figma ornament to title gap is 25; SectionHeading gives 15, so +10. At xl the Figma ornament frame (34.42) is
  // 1.66 taller than the exported SVG (32.76): 10 + 1.66 = 11.66 (no scale value exists).
  ornament: "mb-2.5 w-40.5 tab:w-65.5 xl:mb-[11.66px] xl:w-90.5",
  // Body Large 18/22.6 from xl; below xl the Body small 16 of SectionHeading stays.
  subtitle: "xl:text-lg xl:leading-[22.6px] xl:tracking-normal",
  // Phone: vertical stack. From 600: scroll row that runs to the screen edge (thin themed scrollbar for mouse users, hidden on
  // touch). From xl: wrapping flex, 3 + 2 centred cards, gap 68.
  rail: "flex flex-col gap-10 tab:-mx-15 tab:flex-row tab:snap-x tab:snap-mandatory tab:gap-7.5 tab:overflow-x-auto tab:scroll-px-15 tab:px-15 tab:pt-4 tab:pb-5.5 [scrollbar-width:thin] [scrollbar-color:var(--color-card-border)_transparent] pointer-coarse:[scrollbar-width:none] lg:mx-0 lg:snap-none lg:flex-wrap lg:justify-center lg:gap-6 lg:overflow-visible lg:p-0 xl:gap-8 2xl:gap-17",
  // xl width: 374 max (23.375rem), or a third of the row minus two gaps of 68 (8.5rem) when the row is narrower
  // (1280 to 1439). 0.5px keeps the third card from wrapping on rounding. No scale value exists for this calc.
  item: "flex w-full tab:w-66 tab:shrink-0 tab:snap-start lg:w-[min(23.375rem,calc((100%-3rem)/3-0.5px))] xl:w-[min(23.375rem,calc((100%-4rem)/3-0.5px))] 2xl:w-[min(23.375rem,calc((100%-8.5rem)/3-0.5px))]",
  card: "w-full",
} as const;

export function ConsultationServices() {
  const { title, subtitle, services } = consultationContent;

  return (
    <Section
      container={false}
      spacing="none"
      aria-labelledby="consultation-heading"
      className={styles.section}
    >
      <StarField />

      <Container padding="page" className={styles.container}>
        <div className={styles.content}>
          <SectionHeading
            titleId="consultation-heading"
            title={title}
            subtitle={subtitle}
            titleSize="sectionTab"
            ornamentClassName={styles.ornament}
            subtitleClassName={styles.subtitle}
            className={styles.heading}
          />

          <ul className={styles.rail}>
            {services.map((service) => (
              <li key={service.title} className={styles.item}>
                <CourseCard {...service} className={styles.card} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
