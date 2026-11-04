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
