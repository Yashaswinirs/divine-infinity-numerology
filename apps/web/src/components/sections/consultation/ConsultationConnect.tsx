import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Ornament } from "@/components/shared";
import { Heading } from "@/components/ui";
import { consultationConnectContent } from "@/data/consultation";

// Figma Consultation Section 5, "Connect Your Way" (Frame 168 desktop, Frame 328 on "Consultation Tab" and "Consultation Mobile").
// Breakpoints: phone below 600, tablet from tab (600), laptop and desktop from lg (1024), Figma desktop sizes from xl (1280).
// Desktop (1440 x 470 fixed, measured): padding 60 / 80, content row 1280 x 298 centred in the 470, gap 133, items centred.
//   Text block 503 wide, gap 25: ornament 362 x 34.42 (gold file), gap 25, title 43.95/48 (one line), gap 25, paragraph Body Large
//   18/22.6 (503 x 68, three lines). Image 645 x 298, radius 12, 1px Accent border (inside).
// Tablet (768 x 572.91, measured): padding 40 / 60, content 648, gap 25, stacked: heading (ornament 261.97 x 24.91, gap 25, title
//   35/40 with cap trim), image 648 x 300, paragraph 648 x 68.
// Phone (425 x 449.07, measured): padding 25 / 20, content 385, gap 30. Ornament 254.4 x 24.19, title 30.43/35 with cap trim,
//   image 385 x 177.88, paragraph 385 x 91 (four lines).
// The side padding eases from 20 at 600 to 60 at 768 (same formula as Sections 2 to 4). From lg it is 60, from xl 80.
// From lg the text column is 44% wide (laptop); from xl it is the Figma 503. The image takes the rest (max 645) and the gap is at
// least 48, so at 1440 the gap is 132 (Figma 133: the Figma row adds up to 1281 in a 1280 frame).
// Below lg the text wrapper is `display: contents` so the order is heading, image, paragraph like the Figma tablet and phone frames.
// The 1px border is an overlay above the image (Figma draws an inside stroke over the image, not around it).
// TODO(figma): 1024 to 1279, 600 to 767 and 320 to 424 have no frame (derived). Lovelace Text is not loaded (stand-in font).
const styles = {
  section: "relative lg:flex lg:min-h-117.5 lg:items-center",
  container:
    "mx-auto flex w-full flex-col gap-7.5 px-5 py-6.25 tab:max-w-192 tab:gap-6.25 tab:px-[min(3.75rem,calc(1.25rem_+(100vw-37.5rem)*_0.238))] tab:py-10 lg:max-w-360 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-15 lg:py-15 xl:px-20",
  text: "contents lg:flex lg:w-[44%] lg:shrink-0 lg:flex-col lg:gap-6.25 xl:w-125.75",
  heading: "order-1 flex flex-col gap-6.25 lg:order-none",
  ornament: "aspect-[10.517] h-auto w-[254.4px] tab:w-65.5 xl:w-90.5",
  title: "text-accent max-[374px]:text-balance",
  paragraph:
    "type-body-large text-light order-3 min-h-22.75 font-medium tab:min-h-17 lg:order-none",
  image:
    "relative order-2 aspect-[645/298] w-full overflow-hidden rounded-xl tab:aspect-[648/300] lg:order-none lg:aspect-[645/298] lg:max-w-161.25 lg:min-w-0 lg:flex-1",
  border: "pointer-events-none absolute inset-0 rounded-xl border border-accent",
} as const;

export function ConsultationConnect() {
  const { title, text, image } = consultationConnectContent;

  return (
    <Section
      container={false}
      spacing="none"
      id="connect"
      aria-labelledby="consultation-connect-heading"
      className={styles.section}
    >
      <Container padding="none" className={styles.container}>
        <div className={styles.text}>
          <div className={styles.heading}>
            <Ornament variant="section" tone="gold" className={styles.ornament} />
            <Heading
              as="h2"
              id="consultation-connect-heading"
              size="sectionTab"
              font="heading"
              className={styles.title}
            >
              {title}
            </Heading>
          </div>
          <p className={styles.paragraph}>{text}</p>
        </div>

        <div className={styles.image}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1440px) 645px, (min-width: 1024px) 50vw, (min-width: 768px) 648px, 100vw"
            className="object-cover"
          />
          <span aria-hidden="true" className={styles.border} />
        </div>
      </Container>
    </Section>
  );
}
