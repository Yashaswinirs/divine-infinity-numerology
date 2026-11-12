// Copy as in the Figma "Contact Us" frames (desktop, tablet and mobile).
// TODO(client): confirm the meta description and the wheel alt text.
export const contactMetadata = {
  title: "Contact Us | Divine Infinity Numerology",
  description:
    "Have a question about a course, consultation, or service? Connect with Teejaswinni K Lokesh to get the information you need and find the right path forward.",
} as const;

export const contactHeroContent = {
  title: "Let's Connect",
  // Laptop and desktop (Figma "Contact Us"): one text layer with a blank line between the two paragraphs.
  paragraphs: [
    "Have a question about a course, consultation, or service? Connect with Teejaswinni K Lokesh to get the information you need and find the right path forward.",
    "From choosing a course to understanding a consultation, every enquiry is an opportunity to help you make the right choice.",
  ],
  // Tablet and phone (Figma "Contact us tab" and "Contact us Mobile"): shorter copy, one paragraph.
  compactParagraphs: [
    "Have a question about a course or consultation? Get in touch, and we'll be happy to help. I'm ready to guide you with the right information and support you need.",
  ],
  background: { src: "/images/contact/hero/contact-hero-bg.webp" },
  image: {
    src: "/images/contact/hero/contact-hero-wheel.webp",
    alt: "Astrological wheel showing the planets and the five elements",
  },
} as const;

export interface ContactInfoItem {
  id: "phone" | "email" | "address";
  label: string;
  value: string;
  href?: string;
}

// TODO(client): phone, email and address are the Figma placeholders. Confirm the real ones.
const contactInfoItems: readonly ContactInfoItem[] = [
  { id: "phone", label: "Phone", value: "+91 9876543210", href: "tel:+919876543210" },
  { id: "email", label: "Email", value: "Contact@gmail.com", href: "mailto:Contact@gmail.com" },
  {
    id: "address",
    label: "Office address",
    value: "123, Cenetary corner, 2nd floor AVN building, Maranthahalli, Bangalore, Karnataka.",
  },
];

export const contactEnquiryContent = {
  info: {
    title: "Contact Information",
    // Shown from laptop (lg) only; the tablet and phone frames have no intro text.
    intro:
      "For course enquiries, consultation bookings, or general questions, reach out through the contact details below.",
    items: contactInfoItems,
  },
  form: {
    title: "Have a Question?",
    // Tablet and phone title (Figma "Consultation Enquiry Form").
    compactTitle: "Consultation Enquiry Form",
    intro: "Share your details and your enquiry, and the team will get back to you.",
    labels: {
      fullName: "Full Name",
      mobile: "Mobile number",
      email: "Email",
      interest: "Select Interest",
      subject: "Subject",
      submit: "Submit Enquiry",
    },
    // TODO(client): confirm the "Select Interest" options.
    interestOptions: [
      "Numerology",
      "Astrology",
      "Tarot",
      "Vastu",
      "Manifestation",
      "Course enquiry",
      "Consultation booking",
      "Other",
    ],
  },
} as const;
