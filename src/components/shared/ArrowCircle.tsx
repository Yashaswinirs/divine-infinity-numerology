import { cn } from "@/lib";

export interface ArrowCircleProps {
  className?: string;
  /**
   * "dark" (default): Primary Dark circle with white caret.
   * "primary" / "purple-white": Purple circle (#655373) with pure WHITE caret.
   * "accent" / "gold-purple": Gold accent circle (#FFD8A2) with purple caret (#655373).
   */
  tone?: "dark" | "primary" | "accent" | "purple-white" | "gold-purple";
  /** Optional diameter in px (defaults to 30px / size-7.5) */
  size?: 24 | 28 | 30;
}

const tones = {
  dark: "bg-[#1e1633] text-white",
  primary: "bg-[#655373] text-white",
  accent: "bg-[#FFD8A2] text-[#655373]",
  "purple-white": "bg-[#655373] text-white",
  "gold-purple": "bg-[#FFD8A2] text-[#655373]",
} as const;

const sizeClasses = {
  24: "h-[24px] w-[24px]",
  28: "h-[28px] w-[28px]",
  30: "size-7.5", // 30px
} as const;

/**
 * Standard Caret Right SVG used across the site.
 * Crisp, bold, Homepage-matching chevron.
 */
export function CaretRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn("size-4 shrink-0", className)}
    >
      <path
        d="M6 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 30px circle (or custom size) with a prominent caret, used inside action buttons. */
export function ArrowCircle({
  className,
  tone = "primary",
  size = 30,
}: ArrowCircleProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full transition-transform",
        sizeClasses[size] ?? "size-7.5",
        tones[tone] ?? tones.primary,
        className
      )}
    >
      <CaretRight
        className={size === 24 ? "size-3.5" : size === 28 ? "size-3.5" : "size-4"}
      />
    </span>
  );
}

export default ArrowCircle;
