import { cn } from "@/lib";

export interface ArrowCircleProps {
  className?: string;
  /** "dark" (default): Primary Dark circle (Hero). "primary": Primary circle #655373 (Contact, Figma "Frame 107"). */
  tone?: "dark" | "primary";
}

const tones = {
  dark: "bg-primary-dark",
  primary: "bg-primary",
} as const;

/** 30px circle with a 16px caret, used inside accent buttons (Figma "Frame 107"). */
export function ArrowCircle({ className, tone = "dark" }: ArrowCircleProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "text-light inline-flex size-7.5 shrink-0 items-center justify-center rounded-full",
        tones[tone],
        className
      )}
    >
      {/* TODO(figma): redraw from the exported CaretRight vector if the stroke differs. */}
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
