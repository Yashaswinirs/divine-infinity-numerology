import type { AwardCardProps, LogoMarqueeItem, StatCardItem } from "@/components/shared";

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

export const aboutContent = {
  title: "About Teejaswinni",
  subtitle: "Helping People Find Direction in Life",

  introParagraph:
    "For over 5+ years, Teejaswinni K Lokesh has been helping people through Numerology, Astrology, Tarot, Vastu, and Manifestation. What began as a personal curiosity to understand Numerology gradually grew into a passion for learning, teaching, and guiding others.",
  approachParagraph:
    "Through structured courses and one-on-one consultations, she has guided hundreds of individuals in making informed life decisions. Her approach focuses on making every subject practical, simple and easy to understand.",
  cta: { label: "Read My Full Journey", href: "/about" },
  // TODO(figma): alt text not supplied; replace with the client's wording.
  portrait: {
    src: "/images/home/about/about-portrait.webp",
    alt: "Teejaswinni K Lokesh seated at her consultation desk in front of a zodiac wheel",
  },
} as const;

// Figma order: top row 3+ and 500+, bottom row 300+ and Top 30 (also the mobile stack order).
export const milestonesContent = {
  title: "Milestones",

  stats: [
    { value: 3, suffix: "+", label: "Years of Experience" },
    { value: 500, suffix: "+", label: "Consultations" },
    { value: 300, suffix: "+", label: "Students Guided" },
    { value: 30, prefix: "Top ", label: "Recognised Numerologist (2025)" },
  ] satisfies readonly StatCardItem[],
  ouroboros: { src: "/images/home/milestones/ouroboros.png" },
  connectors: { src: "/images/home/milestones/connectors.svg" },
} as const;

// Desktop copy is the master. Tablet and mobile frames read "Rudraksha Studying" (TODO(client): confirm).
// Several cards reuse the same photo in Figma, but each card has its own export file.
export const awardsContent = {
  title: "Awards & Certifications",
  subtitle:
    "Recognised among the Top 30 Numerologists in 2025, with professional training and certifications in:",
  // TODO(figma): desktop star-dot background only; tablet and mobile versions not exported.
  background: { src: "/images/home/awards-certifications/stars-bg.svg" },
  awards: [
    {
      title: "Vedic Numerology",
      image: {
        src: "/images/home/awards-certifications/award-vedic-numerology.jpg",
        alt: "Award photo for Vedic Numerology",
      },
    },
    {
      title: "Astrology",
      image: {
        src: "/images/home/awards-certifications/award-astrology.jpg",
        alt: "Award photo for Astrology",
      },
    },
    {
      title: "Tarot Reading",
      image: {
        src: "/images/home/awards-certifications/award-tarot-reading.jpg",
        alt: "Award photo for Tarot Reading",
      },
    },
    {
      title: "Bhrigu Nandi Nadi Astrology",
      image: {
        src: "/images/home/awards-certifications/award-vedic-numerology.jpg",
        alt: "Award photo for Bhrigu Nandi Nadi Astrology",
      },
    },
    {
      title: "Vaastu",
      image: {
        src: "/images/home/awards-certifications/award-astrology.jpg",
        alt: "Award photo for Vaastu",
      },
    },
    {
      title: "Rudraksha Studying",
      image: {
        src: "/images/home/awards-certifications/award-tarot-reading.jpg",
        alt: "Award photo for Rudraksha Studying",
      },
    },
  ] satisfies readonly Pick<AwardCardProps, "title" | "image">[],
} as const;
