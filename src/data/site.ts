export const siteConfig = {
  name: "Divine Infinity Numerology",
  logo: {
    src: "/images/layout/logo.png",
    alt: "Divine Infinity Numerology logo",
  },
  login: {
    label: "Login",
    // TODO(client): confirm the LMS login path after NEXT_PUBLIC_LMS_URL
    href: process.env.NEXT_PUBLIC_LMS_URL ?? "/",
  },
  decor: {
    sky: { src: "/images/shared/menu-bg.png" },
    ornament: { src: "/icons/ornament.svg", width: 120, height: 11.41 },
    sectionOrnament: { src: "/icons/section-ornament.svg", width: 362, height: 32.76 },
    sectionOrnamentGold: { src: "/icons/section-ornament-gold.svg", width: 362, height: 34.42 },
    // Laurels: rotated Figma groups exported with the rotation baked in (bounding box 25.8 x 52.28).
    laurelLeft: { src: "/icons/laurel-left.svg", width: 25.8, height: 52.28 },
    laurelRight: { src: "/icons/laurel-right.svg", width: 25.8, height: 52.28 },
    star: { src: "/icons/star.svg", width: 12, height: 12 },
  },
} as const;
