import { cn } from "@/lib";

export interface StarRatingProps {
  /** Number of stars shown (Figma: 5 of 5). */
  rating?: number;
  className?: string;
}

/** Row of 12 x 12 rounded stars, gap 4, centred, Secondary colour. */
export function StarRating({ rating = 5, className }: StarRatingProps) {
  return (
    <div
      role="img"
      aria-label={`Rated ${rating} out of 5`}
      className={cn("text-secondary flex justify-center gap-1", className)}
    >
      {Array.from({ length: rating }, (_, index) => (
        <svg
          key={index}
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-3 shrink-0"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        >
          <polygon points="12 2.5 14.9 8.6 21.5 9.4 16.6 14 17.9 20.6 12 17.4 6.1 20.6 7.4 14 2.5 9.4 9.1 8.6" />
        </svg>
      ))}
    </div>
  );
}
