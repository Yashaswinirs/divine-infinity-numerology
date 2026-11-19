import type { FaqItem } from "@/components/shared";

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
// Contact section 3 "Looking for Personal Insights?" (Figma copy, same text on every frame).
// TODO(client): confirm the image alt text. The button goes to /consultation, which is not built yet.
export const contactInsightsContent = {
  title: "Looking for Personal Insights?",
  text: "For personalised insights based on individual needs and birth details, book a one-to-one consultation with Teejaswinni K Lokesh",
  cta: { label: "Book a Consultation", href: "/consultation" },
  image: {
    src: "/images/contact/insights/contact-insights.webp",
    alt: "Silhouette of a woman facing a glowing numerology wheel against a sunset sky",
  },
} as const;
// Contact section 4 "Visit the Office" + "Find Us" (Figma copy; tablet and phone use "Office Hours" as the title).
// TODO(client): the intro says "Mysore" in Figma while the contact info and the map say Bangalore. Confirm.
// Real office pin (Google Maps embed of "Diviine Infinity Numerologgy", Mysore). embedUrl is the src of the Google
// "Embed a map" iframe with !5e0 (road map) instead of !5e1 (satellite), so it looks like the Figma map.
// TODO(client): confirm the pin and the name Google shows ("Diviine Infinity Numerologgy" looks misspelled).
// TODO(client): mapsUrl opens the same pin by coordinates. Paste the Google Maps "Send a link" share URL here if you
// want the business listing to open instead.
const officeEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4228.148291524342!2d76.63114097536442!3d12.300915329227209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf7ba385c1f86b%3A0x5bc745feba9377aa!2sDiviine%20Infinity%20Numerologgy!5e0!3m2!1sen!2sin!4v1794467761079!5m2!1sen!2sin";
const officeMapsUrl = "https://www.google.com/maps/search/?api=1&query=12.3009153,76.6311410";

export const contactOfficeContent = {
  title: "Visit the Office",
  compactTitle: "Office Hours",
  intro: "For in-person consultations, visitors can find the office in Mysore.",
  hours: [
    {
      id: "weekdays",
      icon: "/icons/calendar.svg",
      title: "Monday - Saturday",
      text: "10.00 AM - 6.00 PM",
    },
    {
      id: "sunday",
      icon: "/icons/calendar-close.svg",
      title: "Sunday",
      text: "Closed/Open based on client",
    },
  ],
  findUsTitle: "Find Us",
  map: {
    embedUrl: officeEmbedUrl,
    mapsUrl: officeMapsUrl,
    mapTitle: "Map showing the office location",
    linkLabel: "Open the office location in Google Maps",
    buttonLabel: "View on Google map",
  },
} as const;

// Contact section 5 "Frequently Asked Questions" (Figma "Contact Us" frames). The numbers "1." to "4." are added by the component.
// Desktop is the master. The tablet and phone frames word question 1 differently ("How can i book a consultation?"); it is
// kept as compactQuestion and shown below xl. TODO(client): confirm that wording (lowercase "i" looks like a typo).
// TODO(client): the answers are the Figma prototype placeholder (the same text on all four cards). Send the real answers.
const faqPlaceholderAnswer =
  "Choose your astrology consultation, select a convenient time, and complete the booking. You'll receive the session details after confirmation.";

export const contactFaqContent = {
  title: "Frequently Asked Questions",
  items: [
    {
      question: "How can a consultation be booked?",
      compactQuestion: "How can i book a consultation?",
      answer: faqPlaceholderAnswer,
    },
    {
      question: "Are consultations available online and offline?",
      answer: faqPlaceholderAnswer,
    },
    {
      question: "How quickly will an enquiry receive a response?",
      answer: faqPlaceholderAnswer,
    },
    {
      question: "How can course-related questions be answered?",
      answer: faqPlaceholderAnswer,
    },
  ] satisfies readonly FaqItem[],
} as const;
