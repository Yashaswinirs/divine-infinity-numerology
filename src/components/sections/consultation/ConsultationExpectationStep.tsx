"use client";

import { useState } from "react";
import Image from "next/image";

export interface ConsultationExpectationStepProps {
  number: number;
  /** "Step" (Figma Body Large). */
  label: string;
  /** Optional first line of the copy (step 2: "Share the following details"). */
  intro?: string;
  /** Copy with the Figma hand line breaks ("\n"), shown from tab (600). */
  text: string;
  /** Same copy for phone, wrapped by the card width. Shown in full when "Read more" is open. */
  compactText: string;
  /** Phone-only collapsed copy (step 2: Figma cuts the details with an ellipsis). Adds a "Read more" toggle on phone. */
  shortText?: string;
  /** Zig-zag connector drawn in the gap after this card (lg and up). Omit on the last card. */
  connector?: string;
  /** Faint blurred Accent dot (Figma Ellipse 8: 11 x 12, 15%, blur 4) inside the card, from lg. Card 4 only. */
  glow?: boolean;
}

// Figma Consultation Section 4 step card.
// Desktop (measured): 228 x 287, radius 10, padding 10, "Card color" gradient, no border. Content is centred vertically:
//   number (Lovelace 54.93/70.4, Accent) + gap 25 + text block (gap 8: "Step" Body Large Accent, copy Body small Light).
// Tablet (measured): 304 x 287 (2 x 2 grid, gap 40). Number 42.87/48 with cap trim. Content is pinned to the top on every card
//   so the numbers and "Step" labels line up across a row (gap 40; card 2 would otherwise sit higher).
// Phone (measured): 182.5 x 257, padding 16, content width 150.5. Number 36.72/46 with cap trim, gap 40. Step 2 shows
//   "Full Name," / "Date of Birth…" like Figma, plus a "Read more" toggle (not in Figma, TODO(client)) that opens the full copy.
// The connector (Figma Group 4: 84.17 x 23.79, 1px Accent stroke) starts 8 after the card edge, 91.92 from the top of the row.
//   It is hidden below lg (the tablet and phone frames have none).
// From lg the card is 287 tall and flexible; from xl it is 228 wide. Radius 10 has no scale value, so it is arbitrary.
const readMoreLabel = "Read more";
const readLessLabel = "Show less";

const styles = {
  card: "bg-card-gradient relative flex min-h-64.25 flex-col items-center justify-start rounded-[10px] px-4 pt-6.5 pb-4 text-center max-[374px]:px-3 tab:min-h-71.75 tab:px-2 tab:pt-12 tab:pb-2.5 lg:h-71.75 lg:min-w-0 lg:flex-1 lg:justify-center lg:px-1.5 lg:py-2.5 xl:w-57 xl:flex-none",
  gapDefault: "gap-10 xl:gap-6.25",
  gapTight: "gap-10 xl:gap-6.25",
  number: "type-step-number text-accent",
  body: "flex w-full flex-col items-center gap-2",
  label: "type-body-large text-accent font-medium",
  text: "type-body-small text-light font-medium",
  more: "type-body-small text-accent cursor-pointer font-medium underline underline-offset-2 tab:hidden",
  connector:
    "pointer-events-none absolute top-23 left-full ml-0.5 hidden aspect-[84.17/23.79] w-9 lg:block xl:ml-2 xl:w-21",
  glow: "pointer-events-none absolute top-[99.6px] left-[31.34%] hidden h-3 w-2.75 rounded-full bg-accent/15 blur-[2px] lg:block",
} as const;

export function ConsultationExpectationStep({
  number,
  label,
  intro,
  text,
  compactText,
  shortText,
  connector,
  glow,
}: ConsultationExpectationStepProps) {
  const [open, setOpen] = useState(false);
  const gap = intro ? styles.gapTight : styles.gapDefault;

  return (
    <li className={`${styles.card} ${gap}`}>
      <p className={styles.number}>{number}</p>
      <div className={styles.body}>
        <p className={styles.label}>{label}</p>
        {intro ? <p className={styles.text}>{intro}</p> : null}
        <p className={styles.text}>
          {shortText ? (
            open ? (
              <span className="tab:hidden whitespace-pre-line">{compactText}</span>
            ) : (
              <>
                <span aria-hidden="true" className="tab:hidden whitespace-pre-line">
                  {shortText}
                </span>
                <span className="tab:hidden sr-only">{compactText}</span>
              </>
            )
          ) : (
            <span className="tab:hidden whitespace-pre-line">{compactText}</span>
          )}
          <span className="tab:inline hidden whitespace-pre-line">{text}</span>
        </p>
        {shortText ? (
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className={styles.more}
          >
            {open ? readLessLabel : readMoreLabel}
          </button>
        ) : null}
      </div>
      {glow ? <span aria-hidden="true" className={styles.glow} /> : null}
      {connector ? (
        <span aria-hidden="true" className={styles.connector}>
          <Image src={connector} alt="" fill sizes="84px" className="object-contain" />
        </span>
      ) : null}
    </li>
  );
}
