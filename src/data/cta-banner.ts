export interface CtaButton {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

export interface CtaBannerData {
  heading: string;
  description: string[]; // one entry per line
  primaryButton: CtaButton;
  secondaryButton?: CtaButton | null;
  image?: { src: string }; // optional decorative background
  headingMaxWidth?: string;
  contentMaxWidth?: string;
  headingClassName?: string;
  paragraphClassName?: string;
  textGroupClassName?: string;
  contentWrapperClassName?: string;
}

export const defaultCtaBanner: CtaBannerData = {
  heading: "Ready To Connect?",
  description: [
    "Have Questions Or Seeking Guidance?",
    "Connect With Us For Personalised Readings",
  ],
  primaryButton: { label: "Contact Us", href: "#frame-279" },
  secondaryButton: { label: "Book a Consultation", href: "/book-consultation" },
  image: { src: "/images/cta-banner/cta-banner.webp" },
};

export const firstStepCta: Partial<CtaBannerData> = {
  heading: "Take the First Step?",
  description: [
    "Explore your path towards clarity, personal growth, and meaningful guidance.",
  ],
  primaryButton: { label: "Explore Courses", href: "/courses" },
  secondaryButton: { label: "Book a Consultation", href: "/book-consultation" },
};

export const aboutCtaBanner: Partial<CtaBannerData> = firstStepCta;

export const blogsCtaBanner: Partial<CtaBannerData> = {
  heading: "Looking for Personal Insights?",
  description: [
    "Explore ideas and insights through our articles, or take the next step with personalised astrology guidance.",
  ],
  primaryButton: { label: "Explore Courses", href: "/courses" },
  secondaryButton: { label: "Book a Consultation", href: "/book-consultation" },
  headingClassName:
    "max-w-[clamp(17.5rem,min(90.59vw,max(21.817rem_+_8.455vw,17.375rem_+_17.708vw)),33.3125rem)] text-[clamp(1.728rem,min(8.64vw,1.819rem_+_1.794vw),3.433rem)] leading-[clamp(2.1625rem,min(10.82vw,2.221rem_+_2.463vw),4.4375rem)]",
  paragraphClassName:
    "max-w-[clamp(17.5rem,min(89.41vw,max(20.188rem_+_13.411vw,18.982rem_+_15.923vw)),33.3125rem)]",
  textGroupClassName:
    "gap-[clamp(0.75rem,1.31rem_-_1.166vw,1rem)] max-w-[33.3125rem]",
  contentWrapperClassName:
    "gap-[clamp(1rem,-0.859rem_+_7vw,2.5rem)] max-w-[33.3125rem] translate-y-[max(0rem,2.799rem_-_5.83vw)]",
};

/**
 * Example per-page overrides:
 *
 * export const aboutPageCta: Partial<CtaBannerData> = {
 *   heading: "Begin Your Personal Journey",
 *   description: [
 *     "Gain deep insights and clarity into your life path.",
 *     "Schedule your personalised session today.",
 *   ],
 *   primaryButton: { label: "Get In Touch", href: "#contact-section" },
 *   secondaryButton: { label: "Explore Courses", href: "/courses" },
 * };
 */
