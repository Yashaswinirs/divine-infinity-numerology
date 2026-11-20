export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkColumnData {
  title?: string;
  links: FooterLink[];
}

export interface FooterContactItemData {
  label: string;
  href?: string;
  icon: string;
}

export interface FooterContactAddressData {
  line1: string;
  line2: string;
  icon: string;
}

export interface FooterContactData {
  title: string;
  phone: FooterContactItemData;
  email: FooterContactItemData;
  address: FooterContactAddressData;
}

export interface FooterCourseCtaData {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export interface FooterBrandData {
  logo: {
    src: string;
    alt: string;
  };
  name: string;
  href?: string;
}

export interface FooterSocialItem {
  name: string;
  href: string;
  icon: string;
  ariaLabel: string;
}

export interface FooterSocialSectionData {
  title: string;
  items: FooterSocialItem[];
}

export interface FooterLegalItem {
  label: string;
  href: string;
}

export interface FooterBottomSubStripData {
  copyright: string;
  credits: string;
  legalLinks: FooterLegalItem[];
}

export interface FooterData {
  heading: string; // "Explore. Learn. Transform"
  tagline: string; // "Your journey of numbers and stars begin now"
  image?: { src: string };
  quickLinks: FooterLinkColumnData;
  column2?: FooterLinkColumnData;
  contact?: FooterContactData;
  courseCta?: FooterCourseCtaData;
  brand?: FooterBrandData;
  social?: FooterSocialSectionData;
  bottomBar?: FooterBottomSubStripData;
}

export const defaultFooter: FooterData = {
  heading: "Explore. Learn. Transform",
  tagline: "Your journey of numbers and stars begin now",
  image: { src: "/images/footer/footer-bg.webp" },
  quickLinks: {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about-us" },
      { label: "Courses", href: "/courses" },
      { label: "Consultation", href: "/consultation" },
      { label: "Horoscopes", href: "/horoscopes" },
    ],
  },
  column2: {
    links: [
      { label: "Free Calculators", href: "/free-calculators" },
      { label: "Blogs", href: "/blogs" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
  contact: {
    title: "Contact",
    phone: {
      label: "+91 98765 43210",
      href: "tel:+919876543210",
      icon: "/icons/footer-icons/Phone.svg",
    },
    email: {
      label: "abcdef@gmail.com",
      href: "mailto:abcdef@gmail.com",
      icon: "/icons/footer-icons/PaperPlaneRight.svg",
    },
    address: {
      line1: "123, Green Valley Road,",
      line2: "Indiranagar, Bengaluru, Karnataka – 560038, India.",
      icon: "/icons/footer-icons/MapPin.svg",
    },
  },
  courseCta: {
    title: "Study the meaning Behind the Numbers",
    description:
      "Explore our numerology courses to understand the patterns and meanings behind numbers, while deepening your knowledge of the broader world of astrology and spiritual guidance.",
    buttonText: "Explore Courses",
    buttonHref: "/courses",
  },
  brand: {
    logo: {
      src: "/images/footer/logo2.webp",
      alt: "Divine Infinity Numerology logo",
    },
    name: "DIVIINE INFINITY NUMEROLOGY",
    href: "/",
  },
  social: {
    title: "Follow Us",
    items: [
      {
        name: "Instagram",
        href: "https://instagram.com",
        icon: "/icons/footer-icons/instagram-icon.svg",
        ariaLabel: "Follow us on Instagram",
      },
      {
        name: "YouTube",
        href: "https://youtube.com",
        icon: "/icons/footer-icons/youtube-icon.svg",
        ariaLabel: "Follow us on YouTube",
      },
      {
        name: "Facebook",
        href: "https://facebook.com",
        icon: "/icons/footer-icons/facebook-icon.svg",
        ariaLabel: "Follow us on Facebook",
      },
      {
        name: "WhatsApp",
        href: "https://whatsapp.com",
        icon: "/icons/footer-icons/whatsapp-icon.svg",
        ariaLabel: "Contact us on WhatsApp",
      },
    ],
  },
  bottomBar: {
    copyright: "© Diviine Infinity Numerologgy 2026",
    credits: "🪐The planets planned it. Cojective made it ❤",
    legalLinks: [
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
};
