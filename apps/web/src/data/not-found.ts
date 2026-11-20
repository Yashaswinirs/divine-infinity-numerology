export interface NotFoundButtonData {
  label: string;
  href: string;
}

export interface NotFoundData {
  heading: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  subtitle: string;
  coursesButton: NotFoundButtonData;
  consultationButton: NotFoundButtonData;
}

export const notFoundData: NotFoundData = {
  heading: "Your journey doesn’t have to stop here.",
  image: {
    src: "/images/404/404-image.webp",
    alt: "404 - Cosmic Page Not Found",
    width: 742,
    height: 465,
  },
  subtitle:
    "Maybe it’s a sign that your stars want you to explore something better.",
  coursesButton: {
    label: "Explore Courses",
    href: "/courses",
  },
  consultationButton: {
    label: "Book a Consultation",
    href: "/consultation",
  },
};
