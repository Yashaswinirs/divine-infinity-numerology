import { cn } from "@/lib";

export interface ArrowCircleProps {
  className?: string;
  /**
   * "dark" (default): Primary Dark circle (Hero). "primary": Primary circle #655373 (Contact, Figma "Frame 107").
   * "accent": Accent circle with a Primary caret (Consultation hero, "Book a Consultation" outline button).
   */
  tone?: "dark" | "primary" | "accent";
}

const tones = {
  dark: "bg-primary-dark text-light",
  primary: "bg-primary text-light",
  accent: "bg-accent text-primary",
} as const;

/** 30px circle with a 16px caret, used inside accent buttons (Figma "Frame 107"). */
export function ArrowCircle({ className, tone = "dark" }: ArrowCircleProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-7.5 shrink-0 items-center justify-center rounded-full",
        tones[tone],
        className
      )}
    >
      {/* TODO(figma): redraw from the exported CaretRight vector if the stroke differs. The caret colour on the accent circle is estimated (Primary). */}
      <svg viewBox="0 0 16 16" fill="none" className="size-4">
        <path
          d="M6 3l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
