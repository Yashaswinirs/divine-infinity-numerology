import { cn } from "@/lib";

export interface StarIconProps {
  className?: string;
}

/** Four-point star (Figma "Vector", 12 x 12). Colour comes from currentColor. */
export function StarIcon({ className }: StarIconProps) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="currentColor"
      aria-hidden="true"
      className={cn("size-3 shrink-0", className)}
    >
      <path d="M0 6C3.31371 6 6 3.31371 6 0C6 3.31371 8.68627 6 12 6C8.68627 6 6 8.68627 6 12C6 8.68627 3.31371 6 0 6Z" />
    </svg>
  );
}
