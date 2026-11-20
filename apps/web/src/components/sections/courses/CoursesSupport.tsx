import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Ornament } from "@/components/shared";
import { Heading } from "@/components/ui";
import { coursesSupportContent } from "@/data/courses";

// Figma Courses Section 3, "Support Beyond the Course" (desktop Frame 173, "Courses Tab" Frame 328, "Courses Mobile" Frame 328).
// Breakpoints (same as Courses 2): phone below 600, tablet from tab (600), laptop from lg (1024), Figma desktop sizes from xl (1280).
// Desktop (1440 x 495 FIXED, measured): padding 60 / 80, row 1280 x 387.42, gap 40. Image 628 x 387.42 (radius 12, 1px Accent inside
//   stroke) on the LEFT, text column 612 on the right, gap 25: ornament 362 x 34.42 (gold), gap 40, title H2 43.95/48 on two lines, gap 12,
//   paragraph Body small 16/22.2 (612 x 45, two lines), gap 25, "You'll Also Receive" Body Large 18/22.6 Accent, gap 16, three rows
//   (icon 24, gap 12, Body small 16/22.2), row gap 12 (list 135 tall). The content is 387.42 inside the fixed 495, so about 47.6 of
//   space is left below it (derived): xl has no bottom padding and a min height of 495.
// Tablet (768 x 710.91, measured): padding 40 / 60, content 648, gap 25. Order: ornament 261.97 x 24.91, gap 25, title H2 T 35/40
//   (cap trim, one line), image 648 x 300 (radius 12, 1px Accent), paragraph Body Large 18/22.6 (648 x 46, two lines), list 648 x 135.
// Phone (425 x 669.19, measured): padding 25 / 20, content 385, gap 30. Ornament 254.4 x 24.19, gap 25, title H2 M 30.43/35 (cap trim,
//   two lines: "Support Beyond / the Course"), image 385 x 177, paragraph 385 x 91 (four lines), list 385 x 156 (the last row wraps).
// Side padding eases from 20 at 600 to 60 at 768 (same formula as Courses 2). From lg it is 60, from xl 80.
// Below lg the text wrapper is `display: contents`, so the container orders heading, image, paragraph, list. From lg the container is a
// grid 628fr / 612fr (Figma 628 + 612 + gap 40 = 1280) and the image stretches to the height of the text column (Figma "Fill").
// The 1px border is an overlay above the image (Figma draws an inside stroke).
// No background: the page gradient and the shared StarField (courses/page.tsx) run under this section.
// TODO(figma): 600 to 767 and 1024 to 1279 have no frame (derived); at 1024 the columns are about 438 / 426 wide. Lovelace Text is not loaded.
// xl: the text column never drops below 600 (37.5rem), so the last list row stays on one line at 1280 (measured: that row needs about 596 with its icon). The image takes the rest (about 480 wide at 1280).
const styles = {
  section: "relative xl:min-h-123.75",
  container:
    "mx-auto flex w-full flex-col gap-7.5 px-5 py-6.25 tab:max-w-192 tab:gap-6.25 tab:px-[min(3.75rem,calc(1.25rem_+(100vw-37.5rem)*_0.238))] tab:py-10 lg:grid lg:max-w-360 lg:grid-cols-[628fr_612fr] lg:gap-10 lg:px-15 lg:py-15 xl:grid-cols-[minmax(0,628fr)_minmax(37.5rem,612fr)] xl:px-20 xl:pb-0",
  image:
    "relative order-2 aspect-[385/177] w-full overflow-hidden rounded-xl tab:aspect-[648/300] lg:order-1 lg:aspect-auto",
  border: "pointer-events-none absolute inset-0 rounded-xl border border-accent",
  text: "contents lg:order-2 lg:flex lg:flex-col lg:gap-3",
  heading: "order-1 flex flex-col gap-6.25 lg:gap-10",
  ornament: "aspect-[10.517] h-auto w-[254.4px] tab:w-65.5 xl:w-90.5",
  title: "text-accent text-balance lg:text-wrap",
  // Body Large 18 below lg, Body small 16 from lg (Figma desktop). min-h copies the Figma text boxes: 91 (four lines), 46, 45.
  paragraph:
    "type-body-large text-light order-3 min-h-22.75 font-medium tab:min-h-11.5 lg:type-body-small lg:min-h-11.25",
  // lg:mt-3.25 (13) + the wrapper gap 12 = the Figma gap 25 between the paragraph and the list; the title to paragraph gap stays 12.
  list: "order-4 flex flex-col gap-4 lg:mt-3.25",
  listTitle: "type-body-large text-accent font-medium",
  items: "flex flex-col gap-3",
  item: "flex items-start gap-3",
  itemText: "type-body-small text-light min-w-0 font-medium",
} as const;

export function CoursesSupport() {
  const { title, text, listTitle, items, icon, image } = coursesSupportContent;

  return (
    <Section
      container={false}
      spacing="none"
      id="support"
      aria-labelledby="courses-support-heading"
      className={styles.section}
    >
      <Container padding="none" className={styles.container}>
        <div className={styles.text}>
          <div className={styles.heading}>
            <Ornament variant="section" tone="gold" className={styles.ornament} />
            <Heading
              as="h2"
              id="courses-support-heading"
              size="sectionTab"
              font="heading"
              className={styles.title}
            >
              {title}
            </Heading>
          </div>

          <p className={styles.paragraph}>{text}</p>

          <div className={styles.list}>
            <h3 id="courses-support-list-heading" className={styles.listTitle}>
              {listTitle}
            </h3>
            <ul role="list" aria-labelledby="courses-support-list-heading" className={styles.items}>
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

        <div className={styles.image}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1440px) 628px, (min-width: 1024px) 50vw, (min-width: 768px) 648px, 100vw"
            className="object-cover object-center"
          />
          <span aria-hidden="true" className={styles.border} />
        </div>
      </Container>
    </Section>
  );
}
