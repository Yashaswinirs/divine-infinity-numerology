export interface ExpertiseItem {
  label: string;
  icon: string;
}

export interface AreasOfExpertiseData {
  name: string;
  heading: string;
  description: string; // contains the "{name}" placeholder
  items: ExpertiseItem[];
}

const ICON_DIR = "/images/areas-of-expertise";
const ICON_EXT = ".svg"; // CHANGE to .png / .webp if files use another format

// "Vedic Numerology" -> "vedic-numerology", "Workshops & Training" -> "workshops-training"
const toIconPath = (label: string) =>
  `${ICON_DIR}/${label
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/ /g, "-")}${ICON_EXT}`;

const labels = [
  "Chaldean Numerology",
  "Vedic Numerology",
  "Astrology",
  "Bhrigu Nandi Nadi Astrology",
  "Vaastu Shastra",
  "Tarot Reading",
  "Rudraksha Consultation",
  "Sai Baba Healing Cards",
  "Manifestation",
  "Love Consultation",
  "Marriage Consultation",
  "Career Guidance",
  "Business Consultation",
  "Health Consultation",
  "Workshops & Training",
];

export const defaultAreasOfExpertise: AreasOfExpertiseData = {
  name: "Teejaswinni",
  heading: "Areas of Expertise",
  description:
    "Over the years, {name} has worked with students and clients from diverse backgrounds, offering guidance through consultations, courses, and workshops across a wide range of subjects.",
  items: labels.map((label) => ({ label, icon: toIconPath(label) })),
};
