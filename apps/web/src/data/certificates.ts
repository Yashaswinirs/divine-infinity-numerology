export interface CertificateCardItem {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  issuer?: string;
  date?: string;
}

// Backward compatibility alias
export type CertificateItem = CertificateCardItem;

export interface CertificatesData {
  name: string; // "Teejaswinni K Lokesh"
  heading: string; // "A Commitment to Continuous Learning"
  description: string; // contains "{name}" placeholder
  cards: CertificateCardItem[];
}

export const defaultCertificates: CertificatesData = {
  name: "Teejaswinni K Lokesh",
  heading: "A Commitment to Continuous Learning",
  description:
    "{name} has trained under respected mentors and continues to deepen her knowledge through professional certifications and specialized learning.",
  cards: [
    {
      id: "cert-1",
      title: "Professional Numerology Certification",
      description:
        "Academy of Vedic Vidya, under Arviend Sud, a Numerologist and Vaastu expert with over 25 years of experience.",
      image: "/images/about-us/certificates/vastu-shastra.webp",
      imageAlt: "Professional Numerology Certification",
    },
    {
      id: "cert-2",
      title: "Advanced Numerology & Rudraksha Studies",
      description:
        "Learn advanced numerology and rudraksha studies under CA Vyomesh Pathak.",
      image: "/images/about-us/certificates/numerology.webp",
      imageAlt: "Advanced Numerology & Rudraksha Studies Certificate",
    },
    {
      id: "cert-3",
      title: "Vaastu Shastra Training",
      description:
        "Under Er. Y. Kirubanandan Sowma, an eighth-generation Vaastu Shastra consultant and trainer based in Chennai.",
      image: "/images/about-us/certificates/vastu-shastra.webp",
      imageAlt: "Vaastu Shastra Certificate",
    },
    {
      id: "cert-4",
      title: "Bhrigu Nandi Nadi Astrology",
      description: "Certified under Vaibhav and Rajeev Arora.",
      image: "/images/about-us/certificates/bhrigu-nandi.webp",
      imageAlt: "Bhrigu Nandi Nadi Astrology Certificate",
    },
  ],
};
