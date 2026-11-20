import Image from "next/image";
import { Container, Section } from "@/components/layout";
import { FaqAccordion } from "@/components/shared";
import { contactFaqContent } from "@/data/contact";

const ornamentSrc = "/icons/section-ornament-gold.svg";

// Figma Contact section 5 (same FAQ design as Home 11, but its own measurements).
// Desktop 1440 x 796 (fixed, content centred): content 816 x 612.42 = ornament 362 x 34.42, gap 69, title 43.95/48, gap 60,
// list 401 (4 cards 816 x 74, gap 35). Padding (796 - 612.42) / 2 = 91.79 (derived; no scale value).
// Tablet 768 x 585.16: padding 50 / 60, content 648 = ornament 212 x 20.16, gap 20, title 35/40, gap 60, list 345
// (4 cards 60 tall, gap 35). Phone 425 x 606.16: padding 40 / 20, content 385 = ornament 212 x 20.16, gap 25, title 30.43/38 on
// two lines (76), gap 60, list 345.
// Breakpoints: md (768) and xl (1280), like the Home FAQ. Contact sections 3 and 4 switch at tab (600), so between 600 and 767 this
// section still shows the phone layout.
// No background: the shared StarField and the page gradient in page.tsx keep the flow with sections 3 and 4.
// The heading is built here (not SectionHeading) because the ornament width, the three gaps and the uncut title differ from Home.
// TODO(figma): the desktop padding is derived from the fixed 796 height; the tablet title panel was not received.
const styles = {
  section: "py-10 md:py-12.5 xl:py-[91.79px]",
  container: "relative px-5 md:px-15",
  content: "mx-auto flex w-full max-w-204 flex-col gap-15",
  heading: "flex flex-col items-center gap-6.25 md:gap-5 xl:gap-17.25",
  ornament: "h-auto w-53 xl:w-90.5",
  title: "type-faq-title font-heading text-accent text-center font-normal tracking-normal",
} as const;

export function ContactFaq() {
  const { title, items } = contactFaqContent;

  return (
    <Section
      container={false}
      spacing="none"
      aria-labelledby="contact-faq-title"
      className={styles.section}
    >
      <Container padding="page" className={styles.container}>
        <div className={styles.content}>
          <div className={styles.heading}>
            <Image
              src={ornamentSrc}
              alt=""
              width={362}
              height={34}
              aria-hidden="true"
              className={styles.ornament}
            />
            <h2 id="contact-faq-title" className={styles.title}>
              {title}
            </h2>
          </div>
          <FaqAccordion items={items} variant="compact" />
        </div>
      </Container>
    </Section>
  );
}
