import type { CourseCardProps } from "@/components/shared";
import {
  coursesContent as homeCoursesContent,
  testimonialsContent as homeTestimonialsContent,
} from "@/data/home";

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

export interface CoursesPathItem extends Pick<CourseCardProps, "title" | "description" | "image"> {
  id: string;
  comingSoon: boolean;
}

// Section 2 "Choose the Path That's Right for You". Cards 1 to 3 reuse the Home course data (title, image, text). Figma's Courses frame has no
// comma in the Manifestation text ("clarity, focus and a positive mindset"), Home has one: Figma wins here, Home is left as it is.
const figmaDescriptions: Partial<Record<string, string>> = {
  Manifestation: "Learn simple practices to develop clarity, focus and a positive mindset.",
};

const availableCourses: readonly CoursesPathItem[] = homeCoursesContent.courses.map(
  ({ title, description, image, href }) => ({
    id: href.split("/").pop() ?? title,
    title,
    description: figmaDescriptions[title] ?? description,
    image,
    comingSoon: false,
  })
);

// Cards 4 to 6 are "Coming Soon" in Figma (dimmed button). Copy as in the Figma desktop frame.
// TODO(client): the Sai Baba description talks about "tarot cards" (Figma copy, looks copied from a tarot card); "Vaastu" in the title and
// "Vastu" in the text are both as in Figma. Confirm the three descriptions. TODO(figma): alt texts are written from the pictures.
// Images to export (WebP, 2x of 332 x 186 = 664 x 372, WITHOUT the "Coming Soon" text) into public/images/courses/paths/.
const comingSoonCourses: readonly CoursesPathItem[] = [
  {
    id: "sai-baba-healing-cards",
    title: "Sai Baba Healing Cards",
    description:
      "Learn the meaning of tarot cards and how they can be used for guidance and self-understanding.",
    image: {
      src: "/images/courses/paths/sai-baba-healing-cards.webp",
      alt: "Hands holding healing cards over a table with more cards spread out",
    },
    comingSoon: true,
  },
  {
    id: "bhrigu-nandi-nadi-astrology",
    title: "Bhrigu Nandi Nadi Astrology",
    description:
      "Explore the principles and practical understanding of Bhrigu Nandi Nadi Astrology.",
    image: {
      src: "/images/courses/paths/bhrigu-nandi-nadi-astrology.webp",
      alt: "Zodiac wheel glowing in a purple cosmic cloud",
    },
    comingSoon: true,
  },
  {
    id: "vaastu",
    title: "Vaastu",
    description:
      "Understand the principles of Vastu and how they can be applied to homes and workplaces.",
    image: {
      src: "/images/courses/paths/vaastu.webp",
      alt: "Antique compass resting on an old map",
    },
    comingSoon: true,
  },
];

// TODO(client): the "Enroll Now" buttons have no destination yet (plain buttons, no route).
export const coursesPathsContent = {
  title: "Choose the Path That's Right for You",
  enrollLabel: "Enroll Now",
  comingSoonLabel: "Coming Soon",
  courses: [...availableCourses, ...comingSoonCourses],
} as const;

// Section 3 "Support Beyond the Course". Copy as in the Figma desktop, "Courses Tab" and "Courses Mobile" frames (the same on all three).
// One image file for all three frames (Figma "image 20" / "image 21", the same picture cropped). The check icon is the plan check icon.
// TODO(client): confirm the image alt text (written from the picture, not supplied).
export const coursesSupportContent = {
  title: "Support Beyond the Course",
  text: "The learning continues beyond course completion, with continued guidance to help students apply their knowledge and build confidence.",
  listTitle: "You'll Also Receive",
  items: [
    "Continued guidance after course completion",
    "Support in applying their learning",
    "Business and marketing guidance for those planning to start their own practice",
  ],
  icon: "/icons/plan-check.svg",
  image: {
    src: "/images/courses/support/support-beyond-course.webp",
    alt: "Two women in a study room talking over a birth chart together",
  },
} as const;

// Section 4 "Learning That Makes a Difference". The carousel is the Home testimonial carousel: the five slides (title, quote, name, role,
// photo) and the labels are the Home data, the same as the Figma Courses variants. The title is two parts because the Figma tablet and
// phone frames break it after "That" (desktop is one line).
// TODO(client): confirm the customers allow their name, photo and quote on the site (same TODO as Home).
export const coursesLearningContent = {
  titleLines: ["Learning That", "Makes a Difference"],
  labels: homeTestimonialsContent.labels,
  items: homeTestimonialsContent.items,
} as const;

// Section 5 "Is This the Right Course for You?". Copy as in the Figma desktop, "Courses Tab" and "Courses Mobile" frames (the same on all three,
// except the stale Consultation paragraph under the title on tablet and phone, which is NOT used). The title is two parts because the Figma
// tablet and phone frames break it after "the" (desktop wraps by itself after "Course").
// The wheel is the SAME picture as Consultation Section 6 (confirmed 17 Nov 2026), so the existing file is used (no copy). It is decorative
// (alt "" in the component). The check icon is the plan check icon.
// TODO(client): confirm the six list items.
export const coursesFitContent = {
  titleLines: ["Is This the", "Right Course for You?"],
  listTitle: "These courses are ideal for individuals who:",
  items: [
    "Are completely new to the subject",
    "Want to strengthen their existing knowledge",
    "Prefer structured and easy-to-follow learning",
    "Wish to apply these concepts in everyday life",
    "Want guidance from an experienced mentor",
    "Plan to build their own professional practice in the future",
  ],
  icon: "/icons/plan-check.svg",
  wheel: { src: "/images/consultation/expertise/expertise-wheel.webp" },
} as const;
