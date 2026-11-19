import { blogsCtaBanner, type CtaBannerData } from "./cta-banner";

export interface HoroscopeHeroButton {
  label: string;
  href: string;
}

export interface HoroscopeHeroData {
  heading: string;
  paragraph: string;
  exploreBtn: HoroscopeHeroButton;
  todayBtn: HoroscopeHeroButton;
  bgImage?: string;
  wheelImage?: string;
}

export const horoscopeHeroData: HoroscopeHeroData = {
  heading: "Daily Guidance for Every Zodiac Sign",
  paragraph:
    "Stay connected with daily, weekly, monthly, and yearly horoscope updates to understand the opportunities and challenges that may lie ahead.",
  exploreBtn: {
    label: "Explore All Zodiac Signs",
    href: "#zodiac-signs",
  },
  todayBtn: {
    label: "View Today's Horoscope",
    href: "#today",
  },
  bgImage: "/images/horoscope/horoscope-hero.webp",
  wheelImage: "/images/horoscope/horoscope-hero-wheel.webp",
};

export interface ZodiacSignItem {
  id: string;
  name: string;
  slug: string;
}

export interface ChooseYourZodiacSignData {
  heading: string;
  paragraph: string;
  cards: ZodiacSignItem[];
}

export const chooseYourZodiacSignData: ChooseYourZodiacSignData = {
  heading: "Choose your zodiac sign",
  paragraph: "Get clarity on our consultations, predictions and astrology services.",
  cards: [
    // Row 1
    { id: "aries", name: "Aries", slug: "aries" },
    { id: "taurus", name: "Taurus", slug: "taurus" },
    { id: "gemini", name: "Gemini", slug: "gemini" },
    { id: "cancer", name: "Cancer", slug: "cancer" },
    { id: "leo", name: "Leo", slug: "leo" },
    { id: "virgo", name: "Virgo", slug: "virgo" },
    // Row 2
    { id: "libra", name: "Libra", slug: "libra" },
    { id: "scorpio", name: "Scorpio", slug: "scorpio" },
    { id: "sagittarius", name: "Sagittarius", slug: "sagittarius" },
    { id: "capricorn", name: "Capricorn", slug: "capricorn" },
    { id: "aquarius", name: "Aquarius", slug: "aquarius" },
    { id: "pisces", name: "Pisces", slug: "pisces" },
  ],
};

export interface ZodiacAttribute {
  label: string;
  value: string;
  icon?: string;
  iconType?: "element" | "ruling-planet" | "quality" | string;
}

export interface LuckyInfoItem {
  label: string;
  value: string;
  icon?: string;
  iconType?: "lucky-number" | "lucky-color" | "lucky-direction" | "lucky-time" | string;
}

export type HoroscopePeriod = "daily" | "weekly" | "monthly" | "yearly";

export interface HoroscopeSection {
  label: string;
  text: string;
}

export interface HoroscopePeriodContent {
  heading: string;
  intro: string;
  sections: HoroscopeSection[];
}

export type HoroscopePeriodMap = Record<HoroscopePeriod, HoroscopePeriodContent>;

export interface ZodiacDetailData {
  slug: string;
  name: string;
  icon?: string;
  attributes: ZodiacAttribute[];
  luckyInfo: LuckyInfoItem[];
  horoscopes: HoroscopePeriodMap;
}

export const leoZodiacDetailData: ZodiacDetailData = {
  slug: "leo",
  name: "Leo",
  icon: "/images/horoscope/zodiac-sign-icons/leo.svg",
  attributes: [
    {
      label: "Element",
      value: "Fire",
      icon: "/images/horoscope/zodiac-detail-panel/element.svg",
      iconType: "element",
    },
    {
      label: "Ruling Planet",
      value: "Sun",
      icon: "/images/horoscope/zodiac-detail-panel/ruling-planet.svg",
      iconType: "ruling-planet",
    },
    {
      label: "Quality",
      value: "Fixed",
      icon: "/images/horoscope/zodiac-detail-panel/quality.svg",
      iconType: "quality",
    },
  ],
  luckyInfo: [
    {
      label: "Lucky Number",
      value: "8",
      icon: "/images/horoscope/zodiac-detail-panel/lucky-number.svg",
      iconType: "lucky-number",
    },
    {
      label: "Lucky Color",
      value: "Grey",
      icon: "/images/horoscope/zodiac-detail-panel/lucky-color.svg",
      iconType: "lucky-color",
    },
    {
      label: "Lucky Direction",
      value: "North West",
      icon: "/images/horoscope/zodiac-detail-panel/lucky-direction.svg",
      iconType: "lucky-direction",
    },
    {
      label: "Lucky Time",
      value: "11.30 am - 1.00 pm",
      icon: "/images/horoscope/zodiac-detail-panel/lucky-time.svg",
      iconType: "lucky-time",
    },
  ],
  horoscopes: {
    daily: {
      heading: "Today’s Horoscope",
      intro:
        "Today is a day of renewed energy, clarity, and positive movement. You may find yourself feeling more confident about decisions that have been on your mind. Trust your intuition, but take time to think before making important choices.",
      sections: [
        {
          label: "Career",
          text: "A productive day is ahead. Stay focused on your priorities and don’t hesitate to share your ideas. A new opportunity or useful conversation may help you move closer to your goals.",
        },
        {
          label: "Love & Relationships",
          text: "Open communication can strengthen your relationships. If you’re single, a meaningful conversation could spark an interesting connection.",
        },
        {
          label: "Finance",
          text: "Avoid unnecessary spending and focus on practical decisions. A balanced approach can help you maintain financial stability.",
        },
      ],
    },
    weekly: {
      heading: "This Week’s Horoscope",
      intro:
        "TODO: weekly copy - The cosmos invites you to step into your natural leadership this week. Opportunities for collaboration and personal growth are in focus.",
      sections: [
        {
          label: "Career",
          text: "TODO: weekly copy - Stay focused on team alignment and long-term milestones. Recognition for your creative problem-solving is likely.",
        },
        {
          label: "Love & Relationships",
          text: "TODO: weekly copy - Meaningful discussions with loved ones bring greater mutual understanding and shared warmth.",
        },
        {
          label: "Finance",
          text: "TODO: weekly copy - Re-evaluate budget allocations and review planned investments with thoughtful discretion.",
        },
      ],
    },
    monthly: {
      heading: "This Month’s Horoscope",
      intro:
        "TODO: monthly copy - This month shines a light on your personal aspirations and inner strength. Embrace creative ventures with confidence and patience.",
      sections: [
        {
          label: "Career",
          text: "TODO: monthly copy - Major career strides are possible as planetary alignments favor bold initiatives and strategic leadership.",
        },
        {
          label: "Love & Relationships",
          text: "TODO: monthly copy - Deeper emotional connections flourish when you offer authentic vulnerability and supportive listening.",
        },
        {
          label: "Finance",
          text: "TODO: monthly copy - Maintain disciplined oversight over resources while exploring new streams of sustainable growth.",
        },
      ],
    },
    yearly: {
      heading: "This Year’s Horoscope",
      intro:
        "TODO: yearly copy - A transformative year defined by empowerment, wisdom, and expansive horizons. Your dedication will yield lasting rewards.",
      sections: [
        {
          label: "Career",
          text: "TODO: yearly copy - Significant breakthroughs await as your experience aligns with major opportunities in your field.",
        },
        {
          label: "Love & Relationships",
          text: "TODO: yearly copy - A year of harmony and enduring companionship as relationships reach deeper levels of commitment.",
        },
        {
          label: "Finance",
          text: "TODO: yearly copy - Prudent wealth planning and long-term security take center stage, establishing solid financial footing.",
        },
      ],
    },
  },
};

export interface HoroscopeInsightItem {
  id: string;
  label: string;
  icon: string;
  side: "left" | "right";
  anchor: { x: number; y: number };
  bend?: number; // wheel-relative X fraction (horizontal leg extends to this X before bending)
  desktop: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
}

export interface WhatYouWillFindData {
  title: string;
  description: string;
  wheel: {
    src: string;
    alt: string;
    desktop: {
      left: number;
      top: number;
      size: number;
    };
  };
  insights: HoroscopeInsightItem[];
}

export const horoscopeInsights: HoroscopeInsightItem[] = [
  // Left side (4 insights)
  {
    id: "career",
    label: "Career",
    icon: "/images/horoscope/what-you-will-find-icons/career.svg",
    side: "left",
    anchor: { x: 0.3041, y: 0.1693 },
    bend: 0.2281,
    desktop: { left: 200, top: 246, width: 415, height: 68 },
  },
  {
    id: "business",
    label: "Business",
    icon: "/images/horoscope/what-you-will-find-icons/business.svg",
    side: "left",
    anchor: { x: 0.2343, y: 0.4082 },
    bend: 0.1481,
    desktop: { left: 159, top: 375, width: 415, height: 68 },
  },
  {
    id: "love",
    label: "Love and Relationship",
    icon: "/images/horoscope/what-you-will-find-icons/love&reloationship.svg",
    side: "left",
    anchor: { x: 0.3141, y: 0.6667 },
    bend: 0.2281,
    desktop: { left: 80, top: 514, width: 415, height: 68 },
  },
  {
    id: "finance",
    label: "Finance",
    icon: "/images/horoscope/what-you-will-find-icons/finance.svg",
    side: "left",
    anchor: { x: 0.3656, y: 0.8744 },
    bend: 0.2593,
    desktop: { left: 241, top: 627, width: 415, height: 68 },
  },
  // Right side (3 insights)
  {
    id: "health",
    label: "Health",
    icon: "/images/horoscope/what-you-will-find-icons/health.svg",
    side: "right",
    anchor: { x: 0.7406, y: 0.2386 },
    bend: 0.82,
    desktop: { left: 849, top: 280, width: 415, height: 68 },
  },
  {
    id: "marriage",
    label: "Marriage",
    icon: "/images/horoscope/what-you-will-find-icons/marriage.svg",
    side: "right",
    anchor: { x: 0.7253, y: 0.4645 },
    bend: 0.8267,
    desktop: { left: 849, top: 409, width: 415, height: 68 },
  },
  {
    id: "growth",
    label: "Personal Growth",
    icon: "/images/horoscope/what-you-will-find-icons/persional-growth.svg",
    side: "right",
    anchor: { x: 0.7322, y: 0.7105 },
    bend: 0.8326,
    desktop: { left: 849, top: 548, width: 485, height: 68 },
  },
];

export const whatYouWillFindData: WhatYouWillFindData = {
  title: "What You Will Find",
  description: "Horoscope Insights Include",
  wheel: {
    src: "/images/horoscope/what-you-will-find.webp",
    alt: "Astrological zodiac wheel diagram",
    desktop: {
      left: 450,
      top: 235,
      size: 540,
    },
  },
  insights: horoscopeInsights,
};

export interface WhyFollowYourHoroscopeData {
  heading: string;
  subtitle: string;
  description: string;
  image: {
    src: string;
    alt: string;
    desktop: {
      width: number;
      height: number;
    };
  };
  ornament: string;
}

export const whyFollowYourHoroscopeData: WhyFollowYourHoroscopeData = {
  heading: "Why Follow Your Horoscope?",
  subtitle: "A Broader Perspective on What's Ahead",
  description:
    "Horoscopes offer insights into possible opportunities and challenges, helping individuals understand what may lie ahead and approach different stages of life with greater awareness.",
  image: {
    src: "/images/horoscope/why-follow-your-horoscope.webp",
    alt: "Celestial horoscope observation chart",
    desktop: {
      width: 645,
      height: 298,
    },
  },
  ornament: "/images/ornament.svg",
};

export const horoscopeCtaBanner: Partial<CtaBannerData> = {
  heading: "Want To\nKnow More?",
  headingClassName: "whitespace-pre-line text-center leading-[0.9] sm:leading-[0.95] lg:leading-[0.95]",
  description: [
    "See Where Your Birth Details",
    "Lead You Next With Personalised Guidance",
  ],
  contentWrapperClassName: "-translate-y-[30px]",
  primaryButton: {
    label: "Book a Consultation",
    href: "/book-consultation",
    variant: "secondary",
  },
  secondaryButton: null,
};



