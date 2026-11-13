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
