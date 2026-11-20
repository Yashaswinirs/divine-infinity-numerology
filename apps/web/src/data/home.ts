import type {
  AwardCardProps,
  BlogCardProps,
  CourseCardProps,
  FaqItem,
  LogoMarqueeItem,
  StatCardItem,
  TestimonialCardProps,
} from "@/components/shared";

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

// Copy as in the Figma "Why Learn" frames (desktop is the master). "\n" is a manual line break inside a tile:
// Figma breaks "Practical and / easy-to-understand / teaching" and "... start their / own practice" by hand.
export const whyLearnContent = {
  title: "Why Learn From Teejaswinni",
  subtitle:
    "Her approach focuses on practical learning, personal guidance, and helping students apply what they learn with confidence.",
  tiles: [
    "Practical and\neasy-to-understand\nteaching",
    "Real case studies and examples",
    "Foundation and Advanced courses",
    "Assessment-based certification",
    "Downloadable PDF study materials",
    "Guidance to help students start their\nown practice",
  ],
} as const;
// Copy as in the Figma "Courses" frames (desktop is the master).
// TODO(client): confirm the course slugs for /courses/[slug]. TODO(figma): alt texts are placeholders.
export const coursesContent = {
  title: "Courses",
  subtitle:
    "My courses are designed to make learning simple, practical, and easy to follow. If you're taking your first step or looking to build your knowledge, you'll find structured learning that supports you at every stage.",
  cta: { label: "Explore Courses", href: "/courses" },
  courses: [
    {
      title: "Numerology",
      description:
        "Learn Numerology and understand how numbers can offer insights into different areas of life.",
      href: "/courses/numerology",
      image: {
        src: "/images/home/courses/course-numerology.webp",
        alt: "Zodiac wheel with glowing numbers for the Numerology course",
      },
    },
    {
      title: "Vedic Astrology",
      description:
        "Build an understanding of Vedic Astrology, birth charts, and planetary influences.",
      href: "/courses/vedic-astrology",
      image: {
        src: "/images/home/courses/course-vedic-astrology.webp",
        alt: "Vedic astrology chart with zodiac signs for the Vedic Astrology course",
      },
    },
    {
      title: "Manifestation",
      description: "Learn simple practices to develop clarity, focus, and a positive mindset.",
      href: "/courses/manifestation",
      image: {
        src: "/images/home/courses/course-manifestation.webp",
        alt: "Person meditating at sunset for the Manifestation course",
      },
    },
  ] satisfies readonly Pick<CourseCardProps, "title" | "description" | "href" | "image">[],
} as const;
// Copy as in the Figma "Consultation Services" frames (desktop is the master).
// TODO(client): confirm where each "Book a Consultation" button goes (all point to /consultation for now; /consultation/book
// with a service in the URL is another option). TODO(figma): alt texts are placeholders.
export const consultationContent = {
  title: "Consultation Services",
  subtitle: "One Conversation Can Make a Difference",
  services: [
    {
      title: "Love Consultation",
      description:
        "Understand your relationship better with guidance on love, compatibility, and emotional well-being.",
      image: {
        src: "/images/home/consultation/consultation-love.webp",
        alt: "Couple silhouetted under a glowing zodiac wheel in a starry sky",
      },
      action: { label: "Book a Consultation", href: "/consultation" },
    },
    {
      title: "Marriage Consultation",
      description:
        "Receive guidance for marriage, compatibility, family life, and important relationship decisions.",
      image: {
        src: "/images/home/consultation/consultation-marriage.webp",
        alt: "Hands over tarot cards on a red table with a candle",
      },
      action: { label: "Book a Consultation", href: "/consultation" },
    },
    {
      title: "Career Consultation",
      description:
        "Get support in making career choices, planning your next move, and achieving your professional goals.",
      image: {
        src: "/images/home/consultation/consultation-career.webp",
        alt: "Smiling man and woman in a career consultation",
      },
      action: { label: "Book a Consultation", href: "/consultation" },
    },
    {
      title: "Business Consultation",
      description:
        "Gain insights for business growth, partnerships, investments, and important business decisions.",
      image: {
        src: "/images/home/consultation/consultation-business.webp",
        alt: "Three people in a business consultation meeting",
      },
      action: { label: "Book a Consultation", href: "/consultation" },
    },
    {
      title: "Health Consultation",
      description:
        "Receive guidance to better understand your health concerns and overall well-being.",
      image: {
        src: "/images/home/consultation/consultation-health.webp",
        alt: "Hands over tarot cards and stones on a red table with candles",
      },
      action: { label: "Book a Consultation", href: "/consultation" },
    },
  ] satisfies readonly Pick<CourseCardProps, "title" | "description" | "image" | "action">[],
} as const;

// Copy as in the Figma "Testimonials" frames (desktop is the master). Slide order as in the Figma variants.
// TODO(client): confirm the customers allow their name, photo and quote on the site. TODO(figma): alt texts are placeholders.
// The tablet and phone frames read "Voices Of Transformation" (capital O); the desktop copy is used.
export const testimonialsContent = {
  title: "Testimonials",
  subtitle: "Voices of Transformation",
  labels: {
    region: "Customer testimonials",
    previous: "Previous testimonial",
    next: "Next testimonial",
    goTo: "Go to testimonial",
  },
  items: [
    {
      title: "Really Good Experience",
      quote:
        "I had a lot of questions before the consultation and was not really sure what to expect. The session was explained very nicely and I got answers to many things that were on my mind.",
      name: "Ananya Rao",
      role: "Homemaker",
      image: {
        src: "/images/home/testimonials/testimonial-ananya-rao.webp",
        alt: "Ananya Rao",
      },
    },
    {
      title: "Very Helpful Session",
      quote:
        "I mainly took the consultation for some questions related to my business. The discussion was good and I understood a few things which I had been confused about for a long time.",
      name: "Rahul Mehta",
      role: "Business Owner",
      image: {
        src: "/images/home/testimonials/testimonial-rahul-mehta.webp",
        alt: "Rahul Mehta",
      },
    },
    {
      title: "It Gave Me Some Clarity",
      quote:
        "I was actually going through a confusing phase in my career. After speaking with her, I felt a little more clear about what I should focus on. Overall, it was a good experience.",
      name: "Priya Nair",
      role: "IT Professional",
      image: {
        src: "/images/home/testimonials/testimonial-priya-nair.webp",
        alt: "Priya Nair",
      },
    },
    {
      title: "Enjoyed the Classes",
      quote:
        "The classes were easy to follow and I liked the way the topics were explained. Whenever I had doubts, they were explained properly with examples. I really enjoyed learning.",
      name: "Kavya Sharma",
      role: "Student",
      image: {
        src: "/images/home/testimonials/testimonial-kavya-sharma.webp",
        alt: "Kavya Sharma",
      },
    },
    {
      title: "Glad I Took the Consultation",
      quote:
        "I was a little unsure before booking the session, but I'm glad I went ahead with it. We discussed the things I wanted to know and the session felt very comfortable and easy to talk through.",
      name: "Arjun Kumar",
      role: "Marketing Professional",
      image: {
        src: "/images/home/testimonials/testimonial-arjun-kumar.webp",
        alt: "Arjun Kumar",
      },
    },
  ] satisfies readonly Pick<TestimonialCardProps, "title" | "quote" | "name" | "role" | "image">[],
} as const;
// Copy as in the Figma "Blogs" frame (desktop is the master; there are no tablet or phone frames).
// TODO(client): confirm the slugs for /blog/[slug]; the posts come from WordPress later.
// TODO(figma): alt texts are placeholders. Images to export (WebP, 2x of 332 x 186 = 664 x 372) into public/images/home/blogs/.
export const blogsContent = {
  title: "Blogs",
  subtitle: "A little guidance, whenever you need it.",
  readMoreLabel: "Read More",
  cta: { label: "View All Blogs", href: "/blog" },
  posts: [
    {
      slug: "how-your-birth-chart-shapes-your-career-path",
      title: "How Your Birth Chart Shapes Your Career Path",
      excerpt:
        "A simple guide to reading planetary placements and what they mean for your professional life.",
      image: {
        src: "/images/home/blogs/blog-birth-chart-career.webp",
        alt: "Woman using a laptop with an astrology wheel glowing behind her",
      },
    },
    {
      slug: "the-power-of-your-life-path-number",
      title: "The Power of Your Life Path Number",
      excerpt: "Discover what your Life Path Number reveals about your personality and purpose.",
      image: {
        src: "/images/home/blogs/blog-life-path-number.webp",
        alt: "Glowing numerology wheel surrounded by golden numbers",
      },
    },
    {
      slug: "5-manifestation-habits-that-actually-work",
      title: "5 Manifestation Habits That Actually Work",
      excerpt: "Small, practical shifts you can start today to align your mindset with your goals.",
      image: {
        src: "/images/home/blogs/blog-manifestation-habits.webp",
        alt: "Silhouette of a person with raised arms against a glowing sunset sky",
      },
    },
  ] satisfies readonly (Pick<BlogCardProps, "title" | "excerpt" | "image"> & { slug: string })[],
} as const;

// Copy as in the Figma "FAQ" frames (desktop is the master). The numbers "1." to "5." are added by the component.
// TODO(client): only the answer of question 1 is real Figma copy ("No. The Foundation Course ..."). Answers 2 to 5 are the

export const faqContent = {
  title: "Frequently Asked Questions",
  items: [
    {
      question: "Do I need any prior knowledge to join a course?",
      answer:
        "No. The Foundation Course is designed for beginners and provides step-by-step learning.",
    },
    {
      question: "Will I receive a certificate after completing the course?",
      answer:
        "Yes. A certificate is awarded after successfully completing the course assessment. Students are provided with up to three attempts to successfully complete the assessment.",
    },
    {
      question: "Are study materials included with the course?",
      answer: "Yes. Every course includes downloadable PDF study materials.",
    },
    {
      question: "How are consultations conducted?",
      answer:
        "Recorded courses include access ranging from 6 months to 1 year, depending on the course selected.",
    },
    {
      question: "Which consultation should I book?",
      answer: "Courses are offered in both Recorded Learning and One-to-One Learning formats.",
    },
  ] satisfies readonly FaqItem[],
} as const;
