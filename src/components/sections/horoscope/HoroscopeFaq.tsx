import { Container, Section } from "@/components/layout";
import { FaqAccordion, Ornament } from "@/components/shared";
import { horoscopeFaqContent } from "@/data/horoscope";

const styles = {
  section: "py-10 md:py-15 xl:py-[75.79px]",
  container: "relative px-5 md:px-15",
  content: "mx-auto flex w-full max-w-204 flex-col gap-10 xl:gap-15",
  heading: "flex flex-col items-center gap-4 md:gap-5 xl:gap-6 text-center",
  ornament: "aspect-[10.517] h-auto w-65.5 xl:w-90.5",
  title: "type-section-title font-heading text-accent text-center font-normal tracking-normal",
  paragraph:
    "w-full max-w-[816px] text-center font-lato font-medium text-[#ECECEC] text-[clamp(0.9375rem,0.85rem_+_0.3vw,1.125rem)] leading-[clamp(1.35rem,1.2rem_+_0.4vw,1.6rem)] tracking-normal",
  list: "max-xl:[&>ul]:gap-3",
} as const;

export function HoroscopeFaq() {
  const { title, subtitle, items } = horoscopeFaqContent;

  return (
    <Section
      id="faq"
      container={false}
      spacing="none"
      aria-labelledby="horoscope-faq-heading"
      className={styles.section}
    >
      <Container padding="page" className={styles.container}>
        <div className={styles.content}>
          <div className={styles.heading}>
            <Ornament variant="section" tone="gold" className={styles.ornament} />
            <h2 id="horoscope-faq-heading" className={styles.title}>
              {title}
            </h2>
            {subtitle && <p className={styles.paragraph}>{subtitle}</p>}
          </div>
          <div className={styles.list}>
            <FaqAccordion items={items} variant="indent" />
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default HoroscopeFaq;
