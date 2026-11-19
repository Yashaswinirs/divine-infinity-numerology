export interface TimelineItem {
  title: string;
  icon: string; // icon = image path
}

export type LearningStep = TimelineItem;

export interface PathOfLearningData {
  name: string; // "Teejaswinni K Lokesh"
  heading: string;
  subheading: string;
  paragraphs: string[]; // use "{name}" placeholder inside the text
  timeline: TimelineItem[];
}

export const defaultLearningPath: PathOfLearningData = {
  name: "Teejaswinni K Lokesh",
  heading: "A Path of Learning",
  subheading: "Every Step Has Shaped the Journey",
  paragraphs: [
    "{name} journey reflects a unique blend of professional experience, continuous learning, and years of practical guidance. After completing her Bachelor of Commerce and CA Articleship, she built a successful corporate career, serving as a Financial Analyst, Data Analyst, Team Lead, and Corporate Trainer.",
    "This analytical foundation, combined with years of learning under respected mentors, shaped an approach that seamlessly blends logical thinking with traditional wisdom. Today, {name} helps individuals navigate relationships, career, business, health, and personal growth through personalized consultations, structured courses, and workshops.",
  ],
  timeline: [
    {
      title: "B.Com & CA Articleship",
      icon: "/images/path-of-learning-icons/graduation.svg",
    },
    {
      title: "Financial & Data Analyst",
      icon: "/images/path-of-learning-icons/analytics.svg",
    },
    {
      title: "Team Lead & Corporate Trainer",
      icon: "/images/path-of-learning-icons/trainer.svg",
    },
    {
      title: "Divine Infinity Numerology",
      icon: "/images/path-of-learning-icons/infinity.svg",
    },
  ],
};
