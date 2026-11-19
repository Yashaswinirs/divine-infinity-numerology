import Image from "next/image";
import { InfoCard, MapCard } from "@/components/shared";
import { Heading } from "@/components/ui";
import { contactOfficeContent } from "@/data/contact";

const ornamentSrc = "/icons/section-ornament-gold.svg";

// Figma Contact section 4. Desktop 1440 x 764: padding 60 top and bottom (derived: 764 - 643.42), ornament 362 x 34.42,
// gap 69, row min 540 high with 1250 of content centered: left 410 | gap 84 | divider 32 | gap 84 | right 640 (measured).
// Left column: title 35.16 (H3), gap 20, intro 403 wide, gap 40, card. Right column: the title block is 89 high
// (title 35 + 54), then the map, gap 36, the button.
// Tablet 768 and phone 425: one column, content 648 / 385 wide. Each column gets its own ornament (212 x 20.16, measured),
// gap 25, title (28.8 / 25.2). Column gap 50 tablet / 56 phone, between the two parts: a horizontal star divider
// (438 / 378 long). Title to card 28, title to map 36 tablet / 24 phone (title to map on tablet is estimated).
// Padding: top 50, bottom 54 tablet / 92 phone (both derived from the frame heights 1107 / 953).
// From 600 (tab) the tablet layout, from 1024 (lg) the two columns. Between 1024 and 1439 the three columns keep the
// 410 : 640 ratio (fr units) and the side padding is 60, then 80 from xl.
// No background here: the shared StarField and the page gradient behind it keep the flow with section 3.
const styles = {
  section: "relative",
  // Soft purple glow behind the card, fading to navy at both ends (Figma desktop, tablet and phone). Transparent
  // at the top and bottom so no seam shows with section 3. Sized in %, so it follows the section height.
  glow: "pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_0%,rgb(42_24_69/0.7)_22%,rgb(42_24_69/0.55)_48%,transparent_85%)]",
  inner:
    "flex flex-col items-center px-5 pt-12.5 pb-23 tab:px-15 tab:pb-13.5 lg:gap-17.25 lg:py-15 xl:px-20",
  desktopOrnament: "hidden h-auto w-90.5 max-w-full lg:block",
  row: "flex w-full flex-col items-center gap-14 tab:gap-12.5 lg:mx-auto lg:grid lg:min-h-135 lg:max-w-312.5 lg:grid-cols-[minmax(0,410fr)_2rem_minmax(0,640fr)] lg:items-start lg:gap-x-10 xl:gap-x-21",
  office: "flex w-full flex-col items-center gap-7 lg:items-start lg:gap-10",
  heading: "flex w-full flex-col items-center gap-6.25 lg:max-w-100.75 lg:items-start lg:gap-5",
  tabletOrnament: "h-auto w-53 max-w-full lg:hidden",
  title: "text-accent text-center lg:text-left",
  intro: "type-body-small text-light hidden font-medium lg:block",
  divider:
    "flex w-full max-w-94.5 items-center gap-2.5 tab:max-w-109.5 lg:h-127.25 lg:w-8 lg:max-w-none lg:flex-col lg:gap-3 lg:justify-self-center",
  line: "bg-accent h-px flex-1 lg:h-auto lg:w-px",
  star: "size-8 shrink-0 bg-[url('/icons/contact-divider-star.svg')] bg-[length:32px_448px] bg-center bg-no-repeat",
  find: "flex w-full max-w-162 flex-col items-center gap-6 tab:gap-9 lg:max-w-none lg:gap-13.5",
  findHeading: "flex flex-col items-center gap-6.25",
} as const;

export function ContactOffice() {
  const { title, compactTitle, intro, hours, findUsTitle, map } = contactOfficeContent;

  return (
    <section aria-labelledby="contact-office-title" className={styles.section}>
      <div aria-hidden="true" className={styles.glow} />
      <div className={styles.inner}>
        <Image
          src={ornamentSrc}
          alt=""
          width={362}
          height={34}
          aria-hidden="true"
          className={styles.desktopOrnament}
        />

        <div className={styles.row}>
          <div className={styles.office}>
            <div className={styles.heading}>
              <Image
                src={ornamentSrc}
                alt=""
                width={362}
                height={34}
                aria-hidden="true"
                className={styles.tabletOrnament}
              />
              <Heading
                as="h2"
                id="contact-office-title"
                size="contactTitle"
                font="heading"
                className={styles.title}
              >
                <span className="lg:hidden">{compactTitle}</span>
                <span className="hidden lg:inline">{title}</span>
              </Heading>
              <p className={styles.intro}>{intro}</p>
            </div>
            <InfoCard rows={hours} />
          </div>

          <div aria-hidden="true" className={styles.divider}>
            <span className={styles.line} />
            <span className={styles.star} />
            <span className={styles.line} />
          </div>

          <div className={styles.find}>
            <div className={styles.findHeading}>
              <Image
                src={ornamentSrc}
                alt=""
                width={362}
                height={34}
                aria-hidden="true"
                className={styles.tabletOrnament}
              />
              <Heading
                as="h2"
                id="contact-map-title"
                size="contactTitle"
                font="heading"
                className={styles.title}
              >
                {findUsTitle}
              </Heading>
            </div>
            <MapCard
              embedUrl={map.embedUrl}
              mapsUrl={map.mapsUrl}
              mapTitle={map.mapTitle}
              linkLabel={map.linkLabel}
              buttonLabel={map.buttonLabel}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
