import { cn } from "@/lib";

export interface CarouselControlsLabels {
  previous: string;
  next: string;
  /** Prefix of the dot labels, e.g. "Go to testimonial" gives "Go to testimonial 2". */
  goTo: string;
}

export interface CarouselControlsProps {
  count: number;
  /** Zero-based index of the active slide. */
  index: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
  /** Dims the previous arrow (Figma: first slide). It stays focusable and ignores clicks. */
  previousDisabled?: boolean;
  labels: CarouselControlsLabels;
  className?: string;
}

// Figma controls row (testimonials, measured): dots frame 98 x 24, radius 4, fill "Dark", padding 7, gap 4; dot 11 x 10 radius 2,
// Secondary at 40%; the active dot is 24 wide at full opacity (estimated). Arrows 40 x 40, radius 4, gap 25. Previous: Accent at
// 50% on the first slide, next: Secondary. Caret 24 x 24 box, vector 9 x 16.5 (#000000, no style name), the left one is rotated 180.
// TODO(figma): hover and pressed states are not designed.
const styles = {
  root: "flex items-center justify-between",
  dots: "bg-dark flex h-6 items-center gap-1 rounded-sm px-1.75",
  dotButton:
    "flex h-6 cursor-pointer items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light",
  dot: "bg-secondary block h-2.5 rounded-xs transition-[width,opacity] duration-300 motion-reduce:transition-none",
  arrows: "flex items-center gap-6.25",
  arrow:
    "inline-flex size-10 cursor-pointer items-center justify-center rounded-sm text-black transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light",
} as const;

function CaretIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={cn("size-6", className)}>
      <path
        d="M7.5 4.5 15 12l-7.5 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CarouselControls({
  count,
  index,
  onPrevious,
  onNext,
  onSelect,
  previousDisabled = false,
  labels,
  className,
}: CarouselControlsProps) {
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.dots}>
        {Array.from({ length: count }, (_, position) => {
          const active = position === index;
          return (
            <button
              key={position}
              type="button"
              aria-label={`${labels.goTo} ${position + 1}`}
              aria-current={active ? "true" : undefined}
              onClick={() => onSelect(position)}
              className={styles.dotButton}
            >
              <span className={cn(styles.dot, active ? "w-6 opacity-100" : "w-2.75 opacity-40")} />
            </button>
          );
        })}
      </div>

      <div className={styles.arrows}>
        <button
          type="button"
          aria-label={labels.previous}
          aria-disabled={previousDisabled}
          onClick={previousDisabled ? undefined : onPrevious}
          className={cn(
            styles.arrow,
            "bg-accent aria-disabled:cursor-default aria-disabled:opacity-50"
          )}
        >
          <CaretIcon className="rotate-180" />
        </button>
        <button
          type="button"
          aria-label={labels.next}
          onClick={onNext}
          className={cn(styles.arrow, "bg-secondary")}
        >
          <CaretIcon />
        </button>
      </div>
    </div>
  );
}
