"use client";

import { useId, useState } from "react";
import { cn } from "@/lib";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  items: readonly FaqItem[];
  className?: string;
}

// FAQ card (Figma FAQ component, desktop measured): width fill (816), height 74 when closed, radius 24, border 0.5px Secondary
// #FFF0DB, gradient "Card color" #1D1B4D to #512B58, padding 12 / 18, row 50 tall with the question left and the 50 x 50 toggle
// right. Question: Lovelace H5, Secondary, numbered "1. ...". Toggle: Accent, Lato 700 46, "+" closed and "-" open. Answer: Body
// small Lato 500 16/22.2 in Light #ECECEC, 10 below the row. Phone and tablet cards have the same box (74 tall, padding 12 / 18).
// Behavior (Figma prototype): "+" opens the answer, "-" closes it, several answers can be open at once, all closed at first.
// The answer slides down (grid rows 0fr to 1fr, 300ms) and the glyph turns while it swaps. No motion for reduced-motion users.
// TODO(figma): open-state panel (bottom padding 24, answer width 720), toggle radius 10 and glyph colour are read from the
// prototype screenshot, not from a properties panel. Hover state is not designed.
const styles = {
  list: "flex flex-col gap-6.25 xl:gap-8.75",
  card: "bg-card-gradient rounded-3xl border-[0.5px] border-secondary px-4.5 py-3 has-focus-visible:ring-2 has-focus-visible:ring-accent",
  heading: "m-0",
  trigger:
    "flex w-full cursor-pointer items-center justify-between gap-4 text-left md:gap-0 lg:gap-4 focus-visible:outline-hidden",

  question: "font-heading type-faq-question text-secondary font-normal",
  toggle:
    "bg-accent font-lato relative flex size-12.5 shrink-0 items-center justify-center rounded-[10px] text-[46px] leading-none font-bold text-[#1D1B4D]",
  glyph:
    "absolute inset-0 flex items-center justify-center transition-[opacity,rotate] duration-300 ease-in-out motion-reduce:transition-none",
  panel:
    "grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none",
  panelOpen: "grid-rows-[1fr] opacity-100",
  panelClosed: "grid-rows-[0fr] opacity-0",
  clip: "min-h-0 overflow-hidden",
  answerBox: "pt-2.5 pr-15 pb-3",
  answer: "type-body-small text-light font-medium whitespace-pre-line",
} as const;

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  const baseId = useId();
  const [openItems, setOpenItems] = useState<ReadonlySet<number>>(() => new Set());

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
    <ul className={cn(styles.list, className)}>
      {items.map((item, index) => {
        const isOpen = openItems.has(index);
        const buttonId = `${baseId}-question-${index}`;
        const panelId = `${baseId}-answer-${index}`;

        return (
          <li key={item.question} className={styles.card}>
            <h3 className={styles.heading}>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className={styles.trigger}
              >
                <span className={styles.question}>
                  {index + 1}. {item.question}
                </span>
                <span aria-hidden="true" className={styles.toggle}>
                  <span
                    className={cn(styles.glyph, isOpen ? "rotate-90 opacity-0" : "opacity-100")}
                  >
                    <span className="absolute h-[3px] w-[18px] rounded-full bg-[#1D1B4D]" />
                    <span className="absolute h-[18px] w-[3px] rounded-full bg-[#1D1B4D]" />
                  </span>
                  <span
                    className={cn(styles.glyph, isOpen ? "opacity-100" : "-rotate-90 opacity-0")}
                  >
                    <span className="absolute h-[3px] w-[18px] rounded-full bg-[#1D1B4D]" />
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
