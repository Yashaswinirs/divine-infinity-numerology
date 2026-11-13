// Copy as in the Figma "Consultation" frames (desktop, "Consultation Tab" and "Consultation Mobile").
// Names avoid `consultationContent`, which home.ts uses for the Home cards.
// TODO(client): confirm the page title and the meta description (the description reuses the hero copy).
export const consultationMetadata = {
  title: "Consultation | Divine Infinity Numerology",
  description:
    "Every stage of life brings important decisions. Teejaswinni K Lokesh’s personalised consultations help individuals gain clarity, a fresh perspective, and direction to move forward.",
} as const;

// Section 1 Hero. The title uses a straight apostrophe and the paragraph a curly one, as in Figma.
// TODO(client): "View Consultation Plans" is assumed to scroll to section 2 (#plans). Confirm.
// TODO(client): /consultation/book is not built yet (404 until then). Confirm whether the service goes in the URL.
// TODO(client): confirm the wheel alt text.
export const consultationHeroContent = {
  title: "Guidance for Life's Important Decisions",
  text: "Every stage of life brings important decisions. Teejaswinni K Lokesh’s personalised consultations help individuals gain clarity, a fresh perspective, and direction to move forward.",
  book: { label: "Book a Consultation", href: "/consultation/book" },
  plans: { label: "View Consultation Plans", href: "#plans" },
  // TODO(figma): one file per image for now. Tablet and phone crop it with CSS, so the crop can differ from Figma.
  // To match Figma exactly, export the tablet crops (bg 768 x 1024, wheel 648 x 440) and point `compact` at them.
  // Background: the Contact hero image (same Figma image). TODO(figma): confirm it matches the Consultation frame.
  background: { src: "/images/contact/hero/contact-hero-bg.webp" },
  // One file (1408 x 768, about 1.7x of 817 x 446). Figma crops the same image on desktop, tablet and phone; the hero fills each box with object-cover.
  wheel: {
    src: "/images/consultation/hero/consultation-hero-wheel.png",
    alt: "Golden numerology numbers around an astrology zodiac wheel",
  },
} as const;

// Section 2 "Personalised Guidance That Puts You First". Copy as in Figma (the title breaks after "Guidance" on every width).
// TODO(client): every "Enroll Now" goes to /consultation/book (not built yet; Figma opens an overlay). Confirm whether the plan goes in the URL.
// TODO(client): Figma spells "Personalised" in the title and "Personalized" in the cards, and "40Min - 1 Hr" without a space; kept as is.
// TODO(client): the "+7 More" items of "Overall Reading" are not in Figma (plain text, no link).
// The avatar is decorative (alt ""): one image file shared by the three cards (Figma "Scale: Crop" on one image).
export interface ConsultationPlan {
  id: string;
  title: string;
  description: string;
  duration: string;
  fee: string;
  features: readonly string[];
  moreLabel?: string;
  image: { src: string; alt: string };
  cta: { label: string; href: string };
}

const planCta = { label: "Enroll Now", href: "/consultation/book" } as const;
const planImage = { src: "/images/consultation/plans/plan-avatar.webp", alt: "" } as const;

const plans: readonly ConsultationPlan[] = [
  {
    id: "normal-session",
    title: "Normal Session",
    description: "Ideal for those seeking guidance on a single concern or specific question.",
    duration: "15 Minutes",
    fee: "₹1,000",
    features: ["One focused question", "Personalized guidance"],
    image: planImage,
    cta: planCta,
  },
  {
    id: "general-session",
    title: "General Session",
    description: "Designed for individuals looking for clarity across multiple related concerns.",
    duration: "30 - 40 Minutes",
    fee: "₹2,100",
    features: [
      "Discussion of 2–3 questions",
      "Personalized analysis",
      "One detailed chart reading",
    ],
    image: planImage,
    cta: planCta,
  },
  {
    id: "overall-reading",
    title: "Overall Reading",
    description:
      "A comprehensive consultation offering detailed guidance across multiple areas of life through personalized analysis.",
    duration: "40Min - 1 Hr",
    fee: "₹3,700",
    features: ["Personality insights", "Career guidance"],
    moreLabel: "+7 More",
    image: planImage,
    cta: planCta,
  },
];
export const consultationPlansContent = {
  title: "Personalised Guidance\nThat Puts You First",
  text: "Whether you’re looking for quick guidance on a specific concern or a detailed analysis across different areas of life, there’s a consultation designed to support your journey.",
  feeLabel: "Fee:",
  // Check icon: Figma frame "ai-art" (24 x 24), exported as SVG.
  featureIcon: "/icons/plan-check.svg",
  plans,
} as const;

// Section 3 "Choose the Consultation That Fits Your Needs". Copy as in Figma (same paragraph as section 2, curly apostrophes).
// The title breaks by hand: after "That" on tablet and desktop, after "Consultation" on phone (`compactTitle`).
// Phone labels (`compactLabel`) are broken in two lines by hand in Figma, tablet and desktop labels are one line.
// Every tile scrolls to the plans (Figma prototype: Component 8 on desktop, Frame 287 on tablet and phone).
// TODO(client): the tiles do not pick a service yet. If the booking page should know the service, link to
// /consultation/book?service=<id> instead (not built yet).
// TODO(figma): the icons are exported from the 40 x 40 frames inside each tile (SVG, `public/icons/consultation/`).
export interface ConsultationType {
  id: string;
  label: string;
  compactLabel: string;
  icon: string;
}

const consultationTypes: readonly ConsultationType[] = [
  {
    id: "love",
    label: "Love Consultation",
    compactLabel: "Love\nConsultation",
    icon: "/icons/consultation/service-love.svg",
  },
  {
    id: "marriage",
    label: "Marriage Consultation",
    compactLabel: "Marriage\nConsultation",
    icon: "/icons/consultation/service-marriage.svg",
  },
  {
    id: "career",
    label: "Career Guidance",
    compactLabel: "Career\nGuidance",
    icon: "/icons/consultation/service-career.svg",
  },
  {
    id: "business",
    label: "Business Consultation",
    compactLabel: "Business\nConsultation",
    icon: "/icons/consultation/service-business.svg",
  },
  {
    id: "health",
    label: "Health Consultation",
    compactLabel: "Health\nConsultation",
    icon: "/icons/consultation/service-health.svg",
  },
  {
    id: "numerology",
    label: "Numerology Guidance",
    compactLabel: "Numerology\nGuidance",
    icon: "/icons/consultation/service-numerology.svg",
  },
  {
    id: "astrology",
    label: "Astrology Consultation",
    compactLabel: "Astrology\nConsultation",
    icon: "/icons/consultation/service-astrology.svg",
  },
  {
    id: "vaastu",
    label: "Vaastu Consultation",
    compactLabel: "Vaastu\nConsultation",
    icon: "/icons/consultation/service-vaastu.svg",
  },
  {
    id: "tarot",
    label: "Tarot Reading",
    compactLabel: "Tarot\nReading",
    icon: "/icons/consultation/service-tarot.svg",
  },
  {
    id: "rudraksha",
    label: "Rudraksha Consultation",
    compactLabel: "Rudraksha\nConsultation",
    icon: "/icons/consultation/service-rudraksha.svg",
  },
  {
    id: "sai-baba",
    label: "Sai Baba Healing Cards",
    compactLabel: "Sai Baba\nHealing Cards",
    icon: "/icons/consultation/service-sai-baba.svg",
  },
  {
    id: "manifestation",
    label: "Manifestation Guidance",
    compactLabel: "Manifestation\nGuidance",
    icon: "/icons/consultation/service-manifestation.svg",
  },
];

export const consultationTypesContent = {
  title: "Choose the Consultation That\nFits Your Needs",
  compactTitle: "Choose the Consultation\nThat Fits Your Needs",
  text: "Whether you’re looking for quick guidance on a specific concern or a detailed analysis across different areas of life, there’s a consultation designed to support your journey.",
  href: "#plans",
  types: consultationTypes,
} as const;
