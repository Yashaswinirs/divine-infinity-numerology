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
  },
} as const;
