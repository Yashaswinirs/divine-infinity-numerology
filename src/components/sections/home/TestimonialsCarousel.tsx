"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { CarouselControls, TestimonialCard, type TestimonialCardProps } from "@/components/shared";
import { cn } from "@/lib";

type TestimonialItem = Pick<TestimonialCardProps, "title" | "quote" | "name" | "role" | "image">;

export interface TestimonialsCarouselProps {
  items: readonly TestimonialItem[];
  labels: { region: string; previous: string; next: string; goTo: string };
  className?: string;
}

const SWIPE_THRESHOLD = 50;

// One card visible, the others wait 40px (gap-10 = 2.5rem) to the right. The track moves by one card + one gap per step.
// Next loops from the last slide to the first. Previous is dimmed on the first slide (Figma). Touch swipe, arrow keys and
// reduced motion (no sliding) are handled here. Controls stay fixed over the card while the text slides.
// TODO(figma): slide timing is not in the design; 500ms ease-in-out is assumed.
const styles = {
  root: "relative mx-auto w-full max-w-[740px]",
  viewport: "touch-pan-y overflow-hidden rounded-3xl",
  track: "flex gap-10 transition-transform duration-500 ease-in-out motion-reduce:transition-none",
  slide: "w-full shrink-0",
  controls: "absolute right-4 bottom-4 left-4 xl:right-8.75 xl:bottom-5.75",
  controlsSpace: "h-10",
} as const;

export function TestimonialsCarousel({ items, labels, className }: TestimonialsCarouselProps) {
  const [index, setIndex] = useState(0);
  const swipeStartX = useRef<number | null>(null);
  const lastIndex = items.length - 1;

  const goPrevious = () => setIndex((current) => Math.max(current - 1, 0));
  const goNext = () => setIndex((current) => (current >= lastIndex ? 0 : current + 1));
  const goTo = (target: number) => setIndex(Math.min(Math.max(target, 0), lastIndex));

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    swipeStartX.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const startX = swipeStartX.current;
    swipeStartX.current = null;
    if (startX === null) return;

    const distance = event.clientX - startX;
    if (Math.abs(distance) < SWIPE_THRESHOLD) return;
    if (distance < 0) goNext();
    else goPrevious();
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
      onKeyDown={handleKeyDown}
      className={cn(styles.root, className)}
    >
      <div
        className={styles.viewport}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          swipeStartX.current = null;
        }}
      >
        <div
          aria-live="polite"
          className={styles.track}
          style={{ transform: `translateX(calc(${index} * (-100% - 2.5rem)))` }}
        >
          {items.map((item, position) => (
            <div
              key={item.name}
              role="group"
              aria-roledescription="slide"
              aria-label={`${position + 1} / ${items.length}`}
              inert={position !== index}
              className={styles.slide}
            >
              <TestimonialCard
                {...item}
                footer={<div aria-hidden="true" className={styles.controlsSpace} />}
              />
            </div>
          ))}
        </div>
      </div>

      <CarouselControls
        count={items.length}
        index={index}
        onPrevious={goPrevious}
        onNext={goNext}
        onSelect={goTo}
        previousDisabled={index === 0}
        labels={labels}
        className={styles.controls}
      />
    </div>
  );
}
