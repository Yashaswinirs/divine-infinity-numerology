import Image from "next/image";
import { Button } from "@/components/ui";
import { ArrowCircle } from "./ArrowCircle";

export interface InsightsCtaProps {
  title: string;
  /** Id of the h2, used by the section's aria-labelledby. */
  titleId?: string;
  text: string;
  cta: { label: string; href: string };
  image: { src: string; alt: string };
  className?: string;
}

// Figma Contact section 3 (desktop 1440 x 540, tablet 768 x 804, phone 425 x 677, all measured).
// Padding: desktop 59 / 80, tablet 50 / 60, phone top 82 (Figma 40 + 42 read from the canvas, estimated) bottom 40 /
// sides 20. Desktop row 1277 = text 503 + gap 130 + image 644.
// Tablet and phone: one centered column, gap 72 / 52, text block 545 wide on tablet, 385 on phone.
// Text block gap 25. Ornament 362 x 34.42 on every width (shrinks only if the screen is narrower than 362).
// Button: 48 / 44 / 42 high, padding 10 10 10 16, gap 12, radius 50; 216 hug on desktop, 300 on tablet, 385 on phone.
// Image: 644 x 422 desktop, 648 x 372 tablet, 385 x 221 phone; radius 12, 2px Accent border (inside).
// Tablet starts at 600 (tab), desktop layout from 1024 (lg). Between 1024 and 1439 the two columns keep the
// 503 : 644 ratio and the title scales with the width (see type-insights-title in globals.css).
// Paragraph min-height: the Figma text boxes are one line taller than their text (91 / 68 / 89 high for 3 / 2 / 3
// lines), most likely a trailing empty line. min-h copies that box height. TODO(figma): confirm.
const styles = {
  section: "relative",
  inner: "px-5 pt-20.5 pb-10 tab:px-15 tab:py-12.5 lg:py-14.75 xl:px-20",
  row: "mx-auto flex w-full max-w-319.25 flex-col items-center gap-13 tab:gap-18 lg:grid lg:grid-cols-[minmax(0,503fr)_minmax(0,644fr)] lg:items-center lg:gap-x-10 xl:gap-x-32.5",
  copy: "flex w-full max-w-136.25 flex-col items-center gap-6.25 text-center lg:max-w-none lg:items-start lg:text-left",
  ornament: "h-auto w-90.5 max-w-full",
  title: "type-insights-title font-heading font-normal text-accent",
  text: "type-body-small tab:type-body-large tab:tracking-normal text-light min-h-22.25 font-medium tab:min-h-17 lg:min-h-22.75",
  button:
    "h-10.5 w-full gap-3 py-2.5 pr-2.5 pl-4 text-base leading-[22.2px] font-bold tracking-[0.01em] shadow-none tab:h-11 tab:w-75 lg:h-12 lg:w-auto",
  media:
    "relative aspect-[648/372] w-full max-w-162 overflow-hidden rounded-xl border-2 border-accent lg:aspect-[644/422] lg:max-w-none",
} as const;

export function InsightsCta({
  title,
  titleId = "insights-cta-title",
  text,
  cta,
  image,
  className,
}: InsightsCtaProps) {
  return (
    <section
      aria-labelledby={titleId}
      className={className ? `${styles.section} ${className}` : styles.section}
    >
      <div className={styles.inner}>
        <div className={styles.row}>
          <div className={styles.copy}>
            <Image
              src="/icons/section-ornament-gold.svg"
              alt=""
              width={362}
              height={34}
              aria-hidden="true"
              className={styles.ornament}
            />
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
            <p className={styles.text}>{text}</p>
            <Button
              href={cta.href}
              variant="accent"
              className={styles.button}
              iconRight={<ArrowCircle tone="primary" />}
            >
              {cta.label}
            </Button>
          </div>

          <div className={styles.media}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 45vw, (min-width: 600px) 648px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
