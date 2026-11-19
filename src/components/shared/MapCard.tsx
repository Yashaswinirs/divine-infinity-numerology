import { Button } from "@/components/ui";
import { cn } from "@/lib";
import { ArrowCircle } from "./ArrowCircle";

export interface MapCardProps {
  /** Google Maps embed URL (iframe src). */
  embedUrl: string;
  /** Plain Google Maps link. The button and, below lg, a link over the map open it in a new tab. */
  mapsUrl: string;
  /** Title of the iframe (accessible name of the map). */
  mapTitle: string;
  /** Accessible name of the link over the map (below lg). */
  linkLabel: string;
  buttonLabel: string;
  className?: string;
}

// Figma Contact "Frame 192" (map) and "Frame 6" (button). Map 648 x 340 on tablet (measured), the same ratio gives
// 640 x 336 on desktop and 385 x 202 on phone (derived). Radius 12, border 1 Accent (measured on tablet; desktop and
// phone assumed the same). Map to button gap: 36 desktop and phone (desktop measured), 46 tablet (estimated).
// Button: 48 / 44 / 42 high, padding 10 10 10 16, radius 50; 217 hug on desktop (measured), 338 on tablet (measured),
// full width on phone. Gap 10 (desktop, measured) and 15 (tablet, measured; phone assumed).
// Below lg a transparent link covers the map, so touch scrolling is not trapped by the iframe and a tap opens Google Maps.
// From lg the map is interactive. TODO(figma): hover is not designed; a small brightness change and a visible focus outline are used.
const styles = {
  root: "flex w-full flex-col items-center gap-9 tab:gap-11.5 lg:gap-9",
  frame:
    "border-accent has-focus-visible:outline-accent relative aspect-[648/340] w-full max-w-162 overflow-hidden rounded-xl border transition-[filter] duration-200 hover:brightness-105 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 lg:max-w-160",
  iframe: "absolute inset-0 size-full border-0",
  overlay: "absolute inset-0 z-10 lg:hidden",
  button:
    "h-10.5 w-full gap-3.75 py-2.5 pr-2.5 pl-4 text-base leading-[22.2px] font-bold tracking-[0.01em] shadow-none tab:h-11 tab:w-84.5 lg:h-12 lg:w-auto lg:gap-2.5",
} as const;

export function MapCard({
  embedUrl,
  mapsUrl,
  mapTitle,
  linkLabel,
  buttonLabel,
  className,
}: MapCardProps) {
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.frame}>
        <iframe
          src={embedUrl}
          title={mapTitle}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className={styles.iframe}
        />
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={linkLabel}
          className={styles.overlay}
        />
      </div>
      <Button
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        variant="accent"
        className={styles.button}
        iconRight={<ArrowCircle tone="primary" />}
      >
        {buttonLabel}
        <span className="sr-only"> (opens in a new tab)</span>
      </Button>
    </div>
  );
}
