import type { LogoMarqueeItem } from "@/components/shared";
import type { ButtonProps } from "@/components/ui";

export interface HeroCta {
  label: string;
  href: string;
  variant: NonNullable<ButtonProps["variant"]>;
  showArrow?: boolean;
}

/** Where the Figma H1 breaks the line after a part: tablet only, desktop only, or both. */
export type TitleBreak = "tablet" | "desktop" | "tabletDesktop";

export interface HeroTitlePart {
  text: string;
  breakAfter?: TitleBreak;
}

export const heroContent = {
  eyebrow: {
    text: "Sarve Jana Sukhino Bhavantu",
    icon: { src: "/icons/om.svg", width: 28.16, height: 29.62 },
  },
  // Desktop: "Your Journey to a / More Meaningful Life / Begins Here."
  // Tablet: "Your Journey / to a More / Meaningful Life / Begins Here."
  // Mobile: wraps naturally.
  titleParts: [
    { text: "Your Journey", breakAfter: "tablet" },
    { text: "to a", breakAfter: "desktop" },
    { text: "More", breakAfter: "tablet" },
    { text: "Meaningful Life", breakAfter: "tabletDesktop" },
    { text: "Begins Here." },
  ] satisfies readonly HeroTitlePart[],
  description:
    "Master Astrology, Numerology, and Manifestation through easy-to-follow courses, or book a personalized consultation to make confident decisions during life's biggest turning points.",
  ctas: [
    { label: "Book a Consultation", href: "/consultation", variant: "outline-accent" },
    { label: "Explore Courses", href: "/courses", variant: "accent", showArrow: true },
  ] satisfies readonly HeroCta[],
  video: {
    src: "/videos/hero-planets.mp4",
    poster: "/images/home/hero/hero-poster.jpg",
  },
} as const;

// Logo order follows the Figma strip (frames 21, 20, 14, 22, 23, 24, 25, 19).
// TODO(figma): width/height are display hints only; replace with the real file sizes after export.

export const featuredContent = {
  title: "Proudly Featured",
  subtitle: "Recognised across leading platforms and publications.",
  logosLabel: "Publications that have featured Teejaswinni",
  logos: [
    {
      src: "/images/home/proudly-featured/times-of-india.png",
      alt: "The Times of India",
      width: 180,
      height: 60,
    },
    {
      src: "/images/home/proudly-featured/the-hindu.png",
      alt: "The Hindu",
      width: 135,
      height: 60,
    },
    {
      src: "/images/home/proudly-featured/karnataka-today.png",
      alt: "Karnataka Today",
      width: 131,
      height: 75,
    },
    {
      src: "/images/home/proudly-featured/the-indian-express.png",
      alt: "The Indian Express",
      width: 146,
      height: 82,
    },
    {
      src: "/images/home/proudly-featured/kannada-prabha.png",
      alt: "Kannada Prabha",
      width: 139,
      height: 79,
    },
    {
      src: "/images/home/proudly-featured/vartha-bharati.png",
      alt: "Vartha Bharati",
      width: 163,
      height: 82,
    },
    {
      src: "/images/home/proudly-featured/prajavani.png",
      alt: "Prajavani",
      width: 156,
      height: 39,
    },
    {
      src: "/images/home/proudly-featured/dailyhunt.png",
      alt: "Dailyhunt",
      width: 135,
      height: 41,
      invert: true,
    },
  ] satisfies readonly LogoMarqueeItem[],
} as const;
