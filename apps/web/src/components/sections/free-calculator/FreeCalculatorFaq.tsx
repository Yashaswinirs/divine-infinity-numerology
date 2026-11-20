import { Container, Section } from "@/components/layout";
import { FaqAccordion, Ornament } from "@/components/shared";
import { freeCalculatorFaqContent } from "@/data/free-calculator";

const styles = {
  section: "py-6.25 md:py-10 xl:py-[75.79px]",
  container: "relative px-5 md:px-15",
  content: "mx-auto flex w-full max-w-204 flex-col gap-10 xl:gap-15",
  heading: "flex flex-col items-center gap-6.25 xl:gap-10",
  ornament: "aspect-[10.517] h-auto w-65.5 xl:w-90.5",
  title: "type-section-title font-heading text-accent text-center font-normal tracking-normal",
  list: "max-xl:[&>ul]:gap-3",
} as const;

export function FreeCalculatorFaq() {
  const { title, items } = freeCalculatorFaqContent;

  return (
    <Section
      id="faq"
      container={false}
      spacing="none"
      aria-labelledby="free-calculator-faq-heading"
      className={styles.section}
    >
      <Container padding="page" className={styles.container}>
        <div className={styles.content}>
          <div className={styles.heading}>
            <Ornament variant="section" tone="gold" className={styles.ornament} />
            <h2 id="free-calculator-faq-heading" className={styles.title}>
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

export default FreeCalculatorFaq;
