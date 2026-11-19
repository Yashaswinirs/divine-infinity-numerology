// Figma "Rectangle 1" (1440 x 95, 5-stop Gradient, Layer blur 40). It sits ON TOP of the hero bottom (z-10, under the navbar)
// so its blurred top edge softens the hero image into the page. Starts 38px above the hero's bottom edge.
// Layer blur 40 is about CSS 20 (token blur-hero-fade). The Contact Figma frames say layer blur 60, but a 30px CSS blur left a visible
// edge on /contact; the same 20px as Consultation and Courses fixed it (17 Nov 2026).
// Wider than the page by 40px per side so the blur fade stays off screen.
// The next section must sit in a wrapper with z-20 so the strip does not dim its ornament and heading.
// Used by Consultation, Courses and Contact.
// TODO(figma): Y (-38), angle (180deg) and stop positions (even) are estimated.
const styles = {
  anchor: "pointer-events-none relative z-10 h-0 overflow-x-clip",
  strip:
    "blur-hero-fade absolute -inset-x-10 -top-9.5 h-23.75 bg-[linear-gradient(180deg,var(--color-gradient-stop-1)_0%,var(--color-gradient-stop-2)_25%,var(--color-gradient-stop-3)_50%,var(--color-gradient-stop-4)_75%,var(--color-gradient-stop-5)_100%)]",
} as const;

export function HeroSeam() {
  return (
    <div aria-hidden="true" className={styles.anchor}>
      <div className={styles.strip} />
    </div>
  );
}
