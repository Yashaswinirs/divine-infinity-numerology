export interface BlogsHeroData {
  heading: string;
  paragraph: string;
  cta: {
    label: string;
    href: string;
  };
  logo: {
    src: string;
    alt: string;
  };
  bg: {
    src: string;
    fallbackColor: string;
  };
}

export interface BlogCategoryItem {
  id: string;
  name: string;
  count: number;
}

export interface BlogPostItem {
  id: string;
  slug?: string;
  category: string;
  categoryId: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  image?: string;
  href?: string;
  content?: string[];
}

export const manifestationArticleContent: string[] = [
  "Manifestation is often misunderstood as simply wishing for something and waiting for it to happen. In reality, manifestation is the process of aligning your thoughts, beliefs, emotions, and actions with the future you want to create. It begins with clarity—knowing exactly what you want and why it matters. When your intentions are clear, your decisions become more focused, allowing you to move toward your goals with confidence and purpose.",
  "Every meaningful achievement starts with a vision, but it is consistent action that turns that vision into reality. Manifestation encourages you to take responsibility for your journey by making intentional choices every day. Whether it's developing a new skill, improving your relationships, or working toward a career goal, your daily habits become the bridge between your dreams and your achievements.",
  "One of the most important aspects of manifestation is cultivating a positive mindset. Negative self-talk, fear, and self-doubt can often create mental barriers that prevent progress. By replacing limiting beliefs with empowering thoughts, you begin to build confidence in your abilities. Practices such as gratitude journaling, affirmations, and mindfulness can help shift your perspective and keep you focused on possibilities rather than obstacles.",
  "Visualization is another powerful technique that supports manifestation. Spending a few minutes each day imagining your desired future can strengthen your motivation and reinforce your commitment to your goals. While visualization alone will not create results, it helps you stay emotionally connected to your aspirations, making it easier to remain consistent even when challenges arise.",
  "Manifestation is also closely connected with self-awareness. Understanding your strengths, values, and personal patterns allows you to make decisions that are aligned with your authentic self. This is where disciplines such as astrology and numerology can offer meaningful guidance. They provide insights into your natural tendencies, life cycles, and opportunities, helping you approach important decisions with greater awareness. These practices should be viewed as tools for reflection and personal growth rather than guarantees of specific outcomes.",
  "Patience plays a significant role in the manifestation journey. Results rarely happen overnight, and meaningful transformation often takes time. Instead of becoming discouraged by temporary setbacks, consider them opportunities to learn, adapt, and grow. Every challenge teaches resilience, strengthens character, and prepares you for future success. Trusting the process allows you to remain focused even when progress feels slow.",
  "Remember that manifestation is not about controlling every aspect of life. Instead, it is about creating the best possible conditions for growth through conscious choices, positive thinking, and purposeful action. While external circumstances may not always be within your control, your attitude, effort, and willingness to learn remain powerful tools that shape your journey.",
  "Ultimately, manifestation is a lifelong practice of becoming the person capable of achieving the life you desire. By combining clear intentions with meaningful action, self-belief, patience, and continuous learning, you create a strong foundation for personal and professional success. Every thoughtful decision, every positive habit, and every small step forward brings you closer to the future you envision. The journey itself becomes just as valuable as the destination, reminding us that true manifestation is about growth, purpose, and living with intention every day.",
];

export interface FeaturedTopicsData {
  heading: string;
  subtitle: string;
  categoriesHeading: string;
  categories: BlogCategoryItem[];
  posts: BlogPostItem[];
}

export interface FeaturedReadsData {
  heading: string;
  subtitle: string;
  posts: BlogPostItem[];
}

export const blogsHeroData: BlogsHeroData = {
  heading: "Insights That Help You Learn and Grow",
  paragraph:
    "Explore articles on Numerology, Astrology, Bhrigu Nandi Nadi Astrology, Manifestation, and more written to make complex ideas simple, practical, and easy to understand.",
  cta: {
    label: "Explore Blogs",
    href: "#blogs-list",
  },
  logo: {
    src: "/images/footer/logo2.webp",
    alt: "Divine Infinity Numerology",
  },
  bg: {
    src: "/images/blogs/blogs-hero-bg.webp",
    fallbackColor: "#090D22",
  },
};

export const featuredTopicsData: FeaturedTopicsData = {
  heading: "Featured Topics",
  subtitle: "Find articles based on the topics that interest you.",
  categoriesHeading: "Find by Categories",
  categories: [
    { id: "all", name: "All", count: 1445 },
    { id: "numerology", name: "Numerology", count: 546 },
    { id: "astrology", name: "Astrology", count: 296 },
    { id: "bhrigu-nandi-astrology", name: "Bhrigu Nandi Astrology", count: 178 },
    { id: "manifestation", name: "Manifestation", count: 148 },
  ],
  posts: [
    {
      id: "1",
      slug: "understanding-the-fundamentals-of-numerology",
      category: "Numerology",
      categoryId: "numerology",
      title: "Understanding the Fundamentals of Numerology",
      description:
        "Numbers are more than mathematical symbols they carry unique energies that can reveal your personality, strengths, challenges, and life path.",
      date: "May 4, 2026",
      readTime: "7 Mins to Read",
      image: "/images/blogs/blogs-cards-images/blog-image-1.webp",
      href: "/blogs/understanding-the-fundamentals-of-numerology",
    },
    {
      id: "2",
      slug: "navigating-planetary-alignments-in-astrology",
      category: "Astrology",
      categoryId: "astrology",
      title: "Navigating Planetary Alignments in Astrology",
      description:
        "Discover how celestial movements shape our daily experiences, emotional rhythms, and spiritual awakenings across the zodiac.",
      date: "May 3, 2026",
      readTime: "6 Mins to Read",
      image: "/images/blogs/blogs-cards-images/blog-image-2.webp",
      href: "/blogs/navigating-planetary-alignments-in-astrology",
    },
    {
      id: "3",
      slug: "mastering-bhrigu-nandi-nadi-techniques",
      category: "Bhrigu Nandi Astrology",
      categoryId: "bhrigu-nandi-astrology",
      title: "Mastering Bhrigu Nandi Nadi Techniques",
      description:
        "Unveil the ancient predictive principles of Bhrigu Nandi Nadi, decoding planetary combinations and past life karma with clarity.",
      date: "Apr 29, 2026",
      readTime: "8 Mins to Read",
      image: "/images/blogs/blogs-cards-images/blog-image-3.webp",
      href: "/blogs/mastering-bhrigu-nandi-nadi-techniques",
    },
    {
      id: "4",
      slug: "awakening-your-inner-power-of-manifestation",
      category: "Manifestation",
      categoryId: "manifestation",
      title: "Awakening Your Inner Power of Manifestation",
      description:
        "Learn how intentional thought, emotional frequency, and cosmic alignment work together to attract your highest goals.",
      date: "Apr 25, 2026",
      readTime: "5 Mins to Read",
      image: "/images/blogs/blogs-cards-images/blog-image-4.webp",
      href: "/blogs/awakening-your-inner-power-of-manifestation",
    },
    {
      id: "5",
      slug: "master-numbers-unlocking-11-22-and-33",
      category: "Numerology",
      categoryId: "numerology",
      title: "Master Numbers: Unlocking 11, 22, and 33",
      description:
        "Explore the profound spiritual vibrations of master numbers and understand the divine responsibilities they bestow.",
      date: "Apr 20, 2026",
      readTime: "9 Mins to Read",
      image: "/images/blogs/blogs-cards-images/blog-image-5.webp",
      href: "/blogs/master-numbers-unlocking-11-22-and-33",
    },
    {
      id: "6",
      slug: "zodiac-houses-and-their-cosmic-influences",
      category: "Astrology",
      categoryId: "astrology",
      title: "Zodiac Houses and Their Cosmic Influences",
      description:
        "A comprehensive guide to understanding the twelve houses of the astrological chart and their impact on destiny.",
      date: "Apr 18, 2026",
      readTime: "7 Mins to Read",
      image: "/images/blogs/blogs-cards-images/blog-image-6.webp",
      href: "/blogs/zodiac-houses-and-their-cosmic-influences",
    },
    {
      id: "7",
      slug: "karmic-patterns-in-bhrigu-nandi-astrology",
      category: "Bhrigu Nandi Astrology",
      categoryId: "bhrigu-nandi-astrology",
      title: "Karmic Patterns in Bhrigu Nandi Astrology",
      description:
        "Decode the planetary transits and karmic debts that shape your soul's journey through classical Nadi methodologies.",
      date: "Apr 12, 2026",
      readTime: "8 Mins to Read",
      image: "/images/blogs/blogs-cards-images/blog-image-7.webp",
      href: "/blogs/karmic-patterns-in-bhrigu-nandi-astrology",
    },
    {
      id: "8",
      slug: "aligning-subconscious-energies-for-success",
      category: "Manifestation",
      categoryId: "manifestation",
      title: "Aligning Subconscious Energies for Success",
      description:
        "Harness the power of belief systems, affirmations, and energetic clearing to remove blocks and manifest abundance.",
      date: "Apr 8, 2026",
      readTime: "6 Mins to Read",
      image: "/images/blogs/blogs-cards-images/blog-image-8.webp",
      href: "/blogs/aligning-subconscious-energies-for-success",
    },
    {
      id: "9",
      slug: "the-secrets-of-your-life-path-number",
      category: "Numerology",
      categoryId: "numerology",
      title: "The Secrets of Your Life Path Number",
      description:
        "Calculate your core life path number and discover how it reveals your true vocation, relationships, and spiritual potential.",
      date: "Apr 2, 2026",
      readTime: "6 Mins to Read",
      image: "/images/blogs/blogs-cards-images/blog-image-9.webp",
      href: "/blogs/the-secrets-of-your-life-path-number",
    },
  ],
};

export const featuredReadsData: FeaturedReadsData = {
  heading: "Featured Reads",
  subtitle:
    "Explore selected articles offering useful insights, practical ideas, and a deeper understanding of each subject.",
  posts: featuredTopicsData.posts.slice(0, 3),
};

/**
 * Backwards compatibility aliases
 */
export type BlogHeroContent = BlogsHeroData;
export const defaultBlogHero = blogsHeroData;
