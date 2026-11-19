import { blogsCtaBanner, type CtaBannerData } from "./cta-banner";

export interface FreeCalculatorHeroData {
  heading: string;
  paragraph: string;
  exploreBtn: {
    label: string;
    href: string;
  };
  consultationBtn: {
    label: string;
    href: string;
  };
}

export const freeCalculatorHeroData: FreeCalculatorHeroData = {
  heading: "Free Numerology Calculators",
  paragraph:
    "Explore simple and easy-to-use calculators that help uncover the significance of numbers in your life. Get instant results and take the first step towards meaningful insights.",
  exploreBtn: {
    label: "Explore Calculators",
    href: "#calculators",
  },
  consultationBtn: {
    label: "Book a Consultation",
    href: "/consultation",
  },
};

export interface CalculatorCardItem {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  cta: {
    label: string;
    href: string;
  };
}

export interface ChooseCalculatorData {
  heading: string;
  featuredCard: CalculatorCardItem;
}

export const chooseCalculatorData: ChooseCalculatorData = {
  heading: "Choose Your Calculator",
  featuredCard: {
    id: "life-path",
    title: "Life Path Number Calculator",
    description:
      "Discover your Life Path Number using your date of birth, and what it means for your journey.",
    image: "/images/calculator/calculator-card.webp",
    imageAlt: "Life Path Number Calculator Illustration",
    cta: {
      label: "Calculate Now",
      href: "/calculator/life-path",
    },
  },
};

export interface FreeCalculatorDeeperMeaningData {
  jewelSrc: string;
  heading: string;
  paragraph: string;
  button: {
    label: string;
    href: string;
  };
  image: {
    src: string;
    alt: string;
  };
}

export const freeCalculatorDeeperMeaningData: FreeCalculatorDeeperMeaningData = {
  jewelSrc: "/images/calculator/jewel.svg",
  heading: "Every Number Has a Deeper Meaning",
  paragraph:
    "Free calculators provide general results, but every individual is unique. For deeper insights and a personalised consultation based on your birth details, connect with Teejaswinni K Lokesh",
  button: {
    label: "Explore Calculators",
    href: "#calculators",
  },
  image: {
    src: "/images/calculator/deeper-meaning.webp",
    alt: "Every Number Has a Deeper Meaning illustration",
  },
};

export const freeCalculatorCtaBanner: Partial<CtaBannerData> = {
  ...blogsCtaBanner,
  heading: "Ready to Explore More",
  description: [
    "Discover what your birth details reveal, or go deeper with personalised guidance from an astrology consultation.",
  ],
};

export interface CalculatorFormField {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  icon: string;
  iconAlt: string;
}

export interface CalculatorModalData {
  ornament: string;
  heading: string;
  fields: CalculatorFormField[];
  submitButton: {
    label: string;
  };
  bottomSection: {
    defaultDigits: string;
    label: string;
  };
}

export const calculatorModalData: CalculatorModalData = {
  ornament: "/images/ornament.svg",
  heading: "Enter your details",
  fields: [
    {
      id: "fullName",
      name: "fullName",
      type: "text",
      placeholder: "Full Name",
      icon: "/images/calculator/calculator-form-icons/full-name.svg",
      iconAlt: "Full Name",
    },
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Email Address",
      icon: "/images/calculator/calculator-form-icons/email.svg",
      iconAlt: "Email Address",
    },
    {
      id: "dob",
      name: "dob",
      type: "text",
      placeholder: "Date of Birth",
      icon: "/images/calculator/calculator-form-icons/dob.svg",
      iconAlt: "Date of Birth",
    },
    {
      id: "mobileNumber",
      name: "mobileNumber",
      type: "tel",
      placeholder: "Mobile Number",
      icon: "/images/calculator/calculator-form-icons/mobile-number.svg",
      iconAlt: "Mobile Number",
    },
  ],
  submitButton: {
    label: "Reveal My Path Number",
  },
  bottomSection: {
    defaultDigits: "00",
    label: "Here your Life Path number",
  },
};




