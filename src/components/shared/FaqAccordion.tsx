"use client";

import { useId, useState } from "react";
import { cn } from "@/lib";

export interface FaqItem {
  question: string;
  /** Wording used below xl (tablet and phone) when the Figma frames word the question differently. Omit it to use `question` everywhere. */
  compactQuestion?: string;
  answer: string;
}

export interface FaqAccordionProps {
  items: readonly FaqItem[];
  /**
   * "default" (Home FAQ): card 74 tall on every width, gap 25 below xl and 35 from xl.
   * "compact" (Contact FAQ): below xl the card is 60 tall (radius 12, toggle 42, gap 35, hanging indent for wrapped
   * questions); from xl it is the same as "default".
   * "indent" (Consultation FAQ): the same card as "default" (74 tall, toggle 50) plus a hanging indent of 24 for wrapped
   * questions below md (Figma Consultation Mobile).
   */
  variant?: "default" | "compact" | "indent";
  className?: string;
}

// FAQ card (Figma FAQ component, desktop measured): width fill (816), height 74 when closed, radius 24, border 0.5px Secondary
// #FFF0DB, gradient "Card color" #1D1B4D to #512B58, padding 12 / 18, row 50 tall with the question left and the 50 x 50 toggle
// right (radius 15, measured on the Contact frame). Question: Lovelace H5, Secondary, numbered "1. ...". Toggle: Accent, the
// "+" and "-" glyphs are drawn as bars sized in % of the toggle (36% x 6%, so they scale with the toggle). Answer: Body small
// Lato 500 16/22.2 in Light #ECECEC, 10 below the row.
// Compact variant (Figma Contact tablet and phone, measured): card 60 tall = padding 9 + row 42, radius 12, padding 12 / 18
// in Figma with the row centred, toggle 42, gap between cards 35. A two-line question (phone) is 50 tall, so it gets -my-1 and
// stays inside the 60 card like in Figma. Wrapped lines are indented 24 (phone prototype render).
// Behavior (Figma prototype): "+" opens the answer, "-" closes it, several answers can be open at once, all closed at first.
// The answer slides down (grid rows 0fr to 1fr, 300ms) and the glyph turns while it swaps. No motion for reduced-motion users.
// TODO(figma): open-state panel (bottom padding 24, answer width 720) is read from the desktop prototype screenshot. The compact
// toggle radius (12), its open-state padding and the 24 indent are estimated. Hover state is not designed.
const styles = {
  card: "bg-card-gradient border-[0.5px] border-secondary px-4.5 has-focus-visible:ring-2 has-focus-visible:ring-accent",
  list: "flex flex-col",
  heading: "m-0",
  trigger:
    "flex w-full cursor-pointer items-center justify-between text-left focus-visible:outline-hidden",
  question: "font-heading type-faq-question text-secondary font-normal",
  toggle:
    "bg-accent font-lato relative flex shrink-0 items-center justify-center text-[46px] leading-none font-bold text-[#1D1B4D]",
  glyph:
    "absolute inset-0 flex items-center justify-center transition-[opacity,rotate] duration-300 ease-in-out motion-reduce:transition-none",
  barHorizontal: "absolute h-[6%] w-[36%] rounded-full bg-[#1D1B4D]",
  barVertical: "absolute h-[36%] w-[6%] rounded-full bg-[#1D1B4D]",
  panel:
    "grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none",
  panelOpen: "grid-rows-[1fr] opacity-100",
  panelClosed: "grid-rows-[0fr] opacity-0",
  clip: "min-h-0 overflow-hidden",
  answerBox: "pt-2.5 pr-15 pb-3",
  answer: "type-body-small text-light font-medium whitespace-pre-line",
} as const;

const variantStyles = {
  default: {
    list: "gap-6.25 xl:gap-8.75",
    card: "rounded-3xl py-3",
    trigger: "gap-4 md:gap-0 lg:gap-4",
    question: "",
    toggle: "size-12.5 rounded-[15px]",
  },
  compact: {
    list: "gap-8.75",
    card: "rounded-xl py-2.25 xl:rounded-3xl xl:py-3",
    trigger: "gap-1.5 xl:gap-4",
    question: "-my-1 pl-6 -indent-6 xl:my-0 xl:pl-0 xl:indent-0",
    toggle: "size-10.5 rounded-xl xl:size-12.5 xl:rounded-[15px]",
  },
  indent: {
    list: "gap-6.25 xl:gap-8.75",
    card: "rounded-3xl py-3",
    trigger: "gap-4 md:gap-0 lg:gap-4",
    question: "pl-6 -indent-6 md:pl-0 md:indent-0",
    toggle: "size-12.5 rounded-[15px]",
  },
} as const;

export function FaqAccordion({ items, variant = "default", className }: FaqAccordionProps) {
  const baseId = useId();
  const [openItems, setOpenItems] = useState<ReadonlySet<number>>(() => new Set());
  const variantClasses = variantStyles[variant];

  function toggle(index: number) {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <ul className={cn(styles.list, variantClasses.list, className)}>
      {items.map((item, index) => {
        const isOpen = openItems.has(index);
        const buttonId = `${baseId}-question-${index}`;
        const panelId = `${baseId}-answer-${index}`;

        return (
          <li key={item.question} className={cn(styles.card, variantClasses.card)}>
            <h3 className={styles.heading}>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className={cn(styles.trigger, variantClasses.trigger)}
              >
                <span className={cn(styles.question, variantClasses.question)}>
                  {index + 1}.{" "}
                  {item.compactQuestion ? (
                    <>
                      <span className="xl:hidden">{item.compactQuestion}</span>
                      <span className="hidden xl:inline">{item.question}</span>
                    </>
                  ) : (
                    item.question
                  )}
                </span>
                <span aria-hidden="true" className={cn(styles.toggle, variantClasses.toggle)}>
                  <span
                    className={cn(styles.glyph, isOpen ? "rotate-90 opacity-0" : "opacity-100")}
                  >
                    <span className={styles.barHorizontal} />
                    <span className={styles.barVertical} />
                  </span>
                  <span
                    className={cn(styles.glyph, isOpen ? "opacity-100" : "-rotate-90 opacity-0")}
                  >
                    <span className={styles.barHorizontal} />
                  </span>
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={cn(styles.panel, isOpen ? styles.panelOpen : styles.panelClosed)}
            >
              <div className={styles.clip}>
                <div className={styles.answerBox}>
                  <p className={styles.answer}>{item.answer}</p>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
