export interface AboutHeroData {
  bgImage: string;
  heroImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  eyebrow: string;
  title: string;
  description: string;
}

export interface AboutTejaswiniData {
  bgImage: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  heading: string;
  subheading: string;
  paragraph1: string;
  paragraph2: string;
  stats: Array<{ number: string; label: string }>;
}

export const aboutHeroContent: AboutHeroData = {
  bgImage: "/images/page-hero-bg.webp",
  heroImage: {
    src: "/images/about-us/about-hero-img.webp",
    alt: "Teejaswinni K Lokesh",
    width: 671,
    height: 572,
  },
  eyebrow: "Meet Teejaswinni K Lokesh",
  title: "The Mind Behind the Guidance.",
  description:
    "Helping people find clarity through knowledge, experience, and wisdom.",
};

export const aboutTejaswiniContent: AboutTejaswiniData = {
  bgImage: "/images/about-us/stars.svg",
  image: {
    src: "/images/about-us/about-tejasswini-portrait.svg",
    alt: "Teejaswinni K Lokesh",
    width: 409,
    height: 516,
  },
  heading: "About Teejaswinni",
  subheading: "Learning, Growing, and Guiding",
  paragraph1:
    "Teejaswinni K Lokesh began her journey with a genuine curiosity to understand Numerology and its influence on people's lives. As her passion grew, she expanded her expertise across Chaldean Numerology, Vedic Numerology, Astrology, Bhrigu Nandi Nadi Astrology, Tarot Reading, Vaastu Shastra, Rudraksha Studies, Sai Baba Healing Cards, and Manifestation.",
  paragraph2:
    "Through Divine Infinity Numerology, Teejaswinni K Lokesh now conducts consultations, courses, and workshops designed to make these ancient sciences practical, accessible, and meaningful for people from all walks of life. Her approach blends traditional wisdom with practical guidance, empowering individuals to gain clarity, make confident decisions, and apply these insights in their everyday lives.",
  stats: [
    { number: "3+", label: "Years of Experience" },
    { number: "500+", label: "Consultations" },
    { number: "300+", label: "Students Guided" },
    { number: "20+", label: "Workshops Conducted" },
  ],
};
