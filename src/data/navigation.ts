export interface NavItem {
  label: string;
  href: string;
}

// TODO(client): confirm these planned routes before use
export const mainNav: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Consultation", href: "/consultation" },
  { label: "Horoscopes", href: "/horoscope" },
  { label: "Free Calculators", href: "/free-calculator" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
];
