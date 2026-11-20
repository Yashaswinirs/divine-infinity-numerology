import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Ornament } from "@/components/shared";
import { Heading } from "@/components/ui";
import { coursesFitContent } from "@/data/courses";

// Figma Courses Section 5, "Is This the Right Course for You?" (desktop Frame 174, "Courses Tab" and "Courses Mobile" Frame 295).
// It is the Consultation 6 pattern (ConsultationExpertise) mirrored, with NO paragraph and the wheel on the RIGHT from lg.
// Breakpoints (same as Courses 2 and 3): phone below 600, tablet from tab (600), laptop from lg (1024), Figma desktop sizes from xl (1280).
// Desktop (1440 x 671, measured): padding 60 / 80, row 1280 x 551, items centred, space-between (gap 138). Text block Frame 6
//   607 wide x 438.42, gap 25: heading block 607 x 170.42 (ornament 362 x 34.42, gap 40, title H2 43.95/48 in a 607 box, two lines),
//   list block 607 x 243 gap 16 ("These courses are ideal for individuals who:" Body Large 18/22.6 Accent, six rows: icon 24, gap 12,
//   Body small 16/22.2, row gap 12). Wheel 535 x 551 on the RIGHT.
// Tablet (768, measured): padding 40 / 60, content 648, gap 25. Ornament 261.97 x 24.91, title H2 T 35/40 cap trim on two lines
//   (broken after "the"), wheel 452.56 x 466.09 centred, list block Hug 446 x 243 centred (rows left aligned).
// Phone (425, measured): padding 25 / 20, content 385, gap 30. Ornament 261.97 x 24.91, title H2 M 30.43/35 cap trim, 385 x 56, two lines,
//   wheel 261 x 269, list block Fill 385 x 264 (the last row wraps, icon on the first line).
// The Tab and Mobile frames still carry the stale Consultation paragraph ("Every consultation draws..."): NOT built. So the built heights are
//   about 954 on tablet (Figma 1024) and about 749 on phone (Figma 862.91), derived by taking the paragraph out.
// The wheel is the same picture as Consultation 6 (confirmed), so the file is referenced by its Consultation path (no copy).
// The side padding eases from 20 at 600 to 60 at 768 (same formula as Courses 2 and 3). From lg it is 60, from xl 80.
// From lg the text column grows from 500 (1024) to 607 (1280): straight line 41.8vw + 4.5rem (500 at 1024, 607 at 1280, max 607).
// Below lg the text wrapper is `display: contents`: visual order heading, wheel, list. DOM order is heading, list, wheel (decorative).
// From lg the order is the DOM order: text LEFT, wheel RIGHT (do NOT add lg:order-1 to the wheel).
// No hover, no animation (confirmed). No background: the page gradient and the shared StarField (courses/page.tsx) run under it.
// TODO(figma): 600 to 767, 1024 to 1279 and 320 to 424 have no frame (derived). At 375 and 320 the title may take three lines (the stand-in
//   font is wider than Lovelace Text, which is not loaded). The Tab and Mobile paragraph is stale copy (not built).
const styles = {
  section: "relative",
  container:
    "mx-auto flex w-full flex-col items-center gap-7.5 px-5 py-6.25 tab:max-w-192 tab:gap-6.25 tab:px-[min(3.75rem,calc(1.25rem_+(100vw-37.5rem)*_0.238))] tab:py-10 lg:max-w-360 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-15 lg:py-15 xl:px-20",
  // 31.25rem = 500px at 1024, 37.9375rem = 607px at 1280 (41.8vw + 4.5rem is the straight line between them).
  text: "contents lg:flex lg:w-[clamp(31.25rem,calc(41.8vw_+_4.5rem),37.9375rem)] lg:shrink-0 lg:flex-col lg:gap-6.25",
  heading:
    "order-1 flex w-full flex-col items-center gap-6.25 text-center lg:order-none lg:items-start lg:gap-10 lg:text-left",
  ornament: "aspect-[10.517] h-auto w-65.5 xl:w-90.5",
  title:
    "text-center text-accent lg:text-left max-[424px]:tracking-[-0.01em] max-[374px]:text-balance",
  // Below lg the first line is a block, so the title breaks after "the" like the Figma tablet and phone frames.
  firstLine: "max-lg:block",
  // 261 phone, 452.56 tablet, flexible from lg (max 535). Ratio 535:551 everywhere. No lg order: it stays RIGHT.
  wheel:
    "relative order-2 aspect-[535/551] w-65.25 shrink-0 tab:w-[452.56px] lg:order-none lg:w-auto lg:max-w-133.75 lg:min-w-0 lg:flex-1",
  list: "order-3 flex w-full flex-col gap-4 tab:w-fit tab:max-w-full lg:order-none lg:w-full",
  listTitle: "type-body-large text-accent font-medium",
  items: "flex flex-col gap-3",
  item: "flex items-start gap-3",
  itemText: "type-body-small text-light min-w-0 font-medium",
} as const;

export function CoursesFit() {
  const { titleLines, listTitle, items, icon, wheel } = coursesFitContent;

  return (
    <Section
      container={false}
      spacing="none"
      id="fit"
      aria-labelledby="courses-fit-heading"
      className={styles.section}
    >
      <Container padding="none" className={styles.container}>
        <div className={styles.text}>
          <div className={styles.heading}>
            <Ornament variant="section" tone="gold" className={styles.ornament} />
            <Heading
              as="h2"
              id="courses-fit-heading"
              size="sectionTab"
              font="heading"
              className={styles.title}
            >
              <span className={styles.firstLine}>{titleLines[0]}</span> <span>{titleLines[1]}</span>
            </Heading>
          </div>

          <div className={styles.list}>
            <h3 id="courses-fit-list-heading" className={styles.listTitle}>
              {listTitle}
            </h3>
            <ul role="list" aria-labelledby="courses-fit-list-heading" className={styles.items}>
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
