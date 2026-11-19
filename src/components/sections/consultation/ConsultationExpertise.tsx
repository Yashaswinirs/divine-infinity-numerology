import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Ornament } from "@/components/shared";
import { Heading } from "@/components/ui";
import { consultationExpertiseContent } from "@/data/consultation";

// Figma Consultation Section 6, "The Expertise Behind Every Session" (Frame 171 desktop, Frame 295 on "Consultation Tab"
// and "Consultation Mobile"). No hover, no animation (confirmed).
// Breakpoints: phone below 600, tablet from tab (600), laptop and desktop from lg (1024), Figma desktop sizes from xl (1280).
// Desktop (1440 x 671, measured): padding 60 / 80, row 1280 x 551, items centred, space-between (gap 102). Wheel 535 x 551 on the
//   LEFT, text block 643 wide on the right, gap 25: heading block (ornament 362 x 34.42, gap 25, title 43.95/48 in a 633 wide
//   box, gap 12, paragraph Body small 16/22.2 643 x 45), then "Why People Choose Teejaswinni" (Body Large 18/22.6, Accent),
//   gap 16, six rows (icon 24, gap 12, Body small), row gap 12.
// Tablet (768 x 1024, measured): padding 40 / 60, content 648, gap 25. Heading block centred (ornament 261.97 x 24.91, title 35/40
//   cap trim in a 633 box, paragraph 648 x 45 centred), wheel 452.56 x 466.09 centred, list block Hug 457 centred.
// Phone (425 x 862.91, measured): padding 25 / 20, content 385, gap 30. Ornament 261.97 x 24.91, title 30.43/35 cap trim on two
//   lines, paragraph four lines, wheel 261 x 269, list Fill 385 (the long row wraps, icon on the first line).
// The wheel box keeps the Figma ratio 535:551 at every width (535 / 452.56 / 261 wide). One image file, Figma "Scale: Crop".
// The side padding eases from 20 at 600 to 60 at 768 (same formula as Sections 2 to 5). From lg it is 60, from xl 80.
// From lg the text column grows from 500 (1024) to 643 (1280) so the title keeps its Figma wrap; the wheel takes the rest
// (max 535, gap at least 48). At 1440 the free space goes to the gap, which is 102 like Figma.
// Below lg the text wrapper is `display: contents`: visual order heading, wheel, list (as the tablet and phone frames).
// DOM order is heading, list, wheel (decorative). From lg the wheel is order-1 (left) and the text order-2 (right).
// The phone paragraph is capped at 335 so it breaks like the Figma phone frame (estimated, panel not received). The title gets
// -0.01em tracking below 425 so it keeps two lines at 375 (stand-in font is wider than Lovelace).
// 452.56 and 335 are not on the Tailwind scale (multiples of 0.25), so the tablet wheel uses an arbitrary value.
// TODO(figma): 1024 to 1279, 600 to 767 and 320 to 424 have no frame (derived). The bright dot beside the list on the canvas
// is a star of the page star layer, not built. Lovelace Text is not loaded (stand-in font).
const styles = {
  section: "relative",
  container:
    "mx-auto flex w-full flex-col items-center gap-7.5 px-5 py-6.25 tab:max-w-192 tab:gap-6.25 tab:px-[min(3.75rem,calc(1.25rem_+(100vw-37.5rem)*_0.238))] tab:py-10 lg:max-w-360 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-15 lg:py-15 xl:px-20",
  // 31.25rem = 500px at 1024, 40.1875rem = 643px at 1280 (55.86vw - 4.5rem is the straight line between them).
  text: "contents lg:order-2 lg:flex lg:w-[clamp(31.25rem,calc(55.86vw_-_4.5rem),40.1875rem)] lg:shrink-0 lg:flex-col lg:gap-6.25",
  heading:
    "order-1 flex w-full flex-col items-center gap-6.25 text-center lg:order-none lg:items-start lg:text-left",
  ornament: "aspect-[10.517] h-auto w-65.5 xl:w-90.5",
  copy: "flex w-full flex-col items-center gap-6.25 lg:items-start lg:gap-3",
  // 633 = Figma title box (158.25 x 4px). It makes the title wrap after "Every" like Figma.
  title:
    "max-w-158.25 text-center text-accent lg:text-left max-[424px]:tracking-[-0.01em] max-[374px]:text-balance",
  // min-h copies the Figma text boxes: 89 (four lines) on phone, 45 (two lines) from tab. 83.75 x 4 = 335 on phone.
  paragraph:
    "type-body-small text-light min-h-22.25 w-full max-w-83.75 font-medium tab:min-h-11.25 tab:max-w-none",
  // 261 phone, 452.56 tablet, flexible from lg (max 535). Ratio 535:551 everywhere. lg:order-1 puts it LEFT on desktop.
  wheel:
    "relative order-2 aspect-[535/551] w-65.25 shrink-0 tab:w-[452.56px] lg:order-1 lg:w-auto lg:max-w-133.75 lg:min-w-0 lg:flex-1",
  list: "order-3 flex w-full flex-col gap-4 tab:w-fit tab:max-w-full lg:order-none lg:w-full",
  listTitle: "type-body-large text-accent font-medium",
  items: "flex flex-col gap-3",
  item: "flex items-start gap-3",
  itemText: "type-body-small text-light min-w-0 font-medium",
} as const;

export function ConsultationExpertise() {
  const { title, text, listTitle, items, icon, wheel } = consultationExpertiseContent;

  return (
    <Section
      container={false}
      spacing="none"
      id="expertise"
      aria-labelledby="consultation-expertise-heading"
      className={styles.section}
    >
      <Container padding="none" className={styles.container}>
        <div className={styles.text}>
          <div className={styles.heading}>
            <Ornament variant="section" tone="gold" className={styles.ornament} />
            <div className={styles.copy}>
              <Heading
                as="h2"
                id="consultation-expertise-heading"
                size="sectionTab"
                font="heading"
                className={styles.title}
              >
                {title}
              </Heading>
              <p className={styles.paragraph}>{text}</p>
            </div>
          </div>

          <div className={styles.list}>
            <h3 id="consultation-expertise-list-heading" className={styles.listTitle}>
              {listTitle}
            </h3>
            <ul
              role="list"
              aria-labelledby="consultation-expertise-list-heading"
              className={styles.items}
            >
              {items.map((item) => (
                <li key={item} className={styles.item}>
                  <Image
                    src={icon}
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden="true"
                    className="size-6 shrink-0"
                  />
                  <span className={styles.itemText}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div aria-hidden="true" className={styles.wheel}>
          <Image
            src={wheel.src}
            alt=""
            fill
            sizes="(min-width: 1440px) 535px, (min-width: 1024px) 40vw, (min-width: 600px) 453px, 261px"
            className="object-cover object-center"
          />
        </div>
      </Container>
    </Section>
  );
}
