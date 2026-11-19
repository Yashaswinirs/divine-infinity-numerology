import { Container, Section } from "@/components/layout";
import { SectionHeading, StarField } from "@/components/shared";
import { testimonialsContent } from "@/data/home";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

// Figma desktop (measured): frame 1440 x 653.42, padding 60 top and bottom. Content 959 wide. Heading block 959 x 145.42:
// ornament 362 x 34.42, gap 25 to the title (43.95/48 Accent), gap 15, subtitle Body Large 18/22.6 in Light. Heading to card 74.
// Card 740 x 314 centred (see TestimonialCard). 60 + 145.42 + 74 + 314 + 60 = 653.42.
// Tablet (frame 768 x 571.91, padding 40 / 60): card 648 wide, subtitle 16. Phone (frame 425 x 524.4, padding 25 / 20): card 385 wide.
// Heading to card on tablet (50) and phone (30) is read from the canvas.
// Ornament to title gap is 25 everywhere: SectionHeading gives 15, so +10 (at xl +11.66 because the Figma ornament frame is 1.66 taller).
// TODO(figma): tablet and phone panels (section padding, heading gaps) were not received; the subtitle reads "Voices Of Transformation"
// on the tablet and phone frames, the desktop copy is used.
const styles = {
  section: "py-6.25 md:py-10 xl:py-15",
  container: "relative",
  content: "mx-auto flex w-full flex-col gap-7.5 md:gap-12.5 xl:max-w-239.75 xl:gap-18.5",
  ornament: "mb-2.5 w-40.5 md:w-65.5 xl:mb-[11.66px] xl:w-90.5",
  subtitle: "xl:text-lg xl:leading-[22.6px] xl:tracking-normal",
} as const;

export function Testimonials() {
  const { title, subtitle, labels, items } = testimonialsContent;

  return (
    <Section
      container={false}
      spacing="none"
      aria-labelledby="testimonials-heading"
      className={styles.section}
    >
      <StarField />

      <Container padding="page" className={styles.container}>
        <div className={styles.content}>
          <SectionHeading
            titleId="testimonials-heading"
            title={title}
            subtitle={subtitle}
            titleSize="sectionTab"
            ornamentClassName={styles.ornament}
            subtitleClassName={styles.subtitle}
          />
          <TestimonialsCarousel items={items} labels={labels} />
        </div>
      </Container>
    </Section>
  );
}
