// Copy as in the Figma "Courses" frames (desktop and "Courses Tab"). The "Courses Mobile" frame still shows the Consultation
// copy (a stale placeholder), so the desktop copy is used on every width (confirmed 16 Nov 2026).
// TODO(client): confirm the page title and the meta description (the description reuses the hero copy).
export const coursesMetadata = {
  title: "Courses | Divine Infinity Numerology",
  description:
    "Every course is designed to help you build knowledge with clarity and apply it with confidence. Choose the path that's right for your learning journey.",
} as const;

// Section 1 Hero. The title breaks by hand after "Confidence." on every width (Figma), so it holds a "\n"
// and the h1 uses whitespace-pre-line. The paragraph uses a straight apostrophe as the Figma frame does.
// "Explore Courses" scrolls smoothly to Section 2 (#courses, confirmed). "Book a Consultation" goes to /consultation (confirmed).
// TODO(client): confirm the wheel alt text.
export const coursesHeroContent = {
  title: "Learn with Confidence.\nGrow with Clarity",
  text: "Every course is designed to help you build knowledge with clarity and apply it with confidence. Choose the path that's right for your learning journey.",
  explore: { label: "Explore Courses", href: "#courses" },
  book: { label: "Book a Consultation", href: "/consultation" },
  // Same background image as the Contact and Consultation heroes (Figma "Cosmic Astrology Background.png").
  background: { src: "/images/contact/hero/contact-hero-bg.webp" },
  // One file for all three frames (Figma crops the same image on desktop, tablet and phone).
  wheel: {
    src: "/images/courses/hero/courses-hero-wheel.webp",
    alt: "Golden astrology zodiac wheel with a sun at its centre",
  },
} as const;
