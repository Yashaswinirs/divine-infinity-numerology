export interface AcademicQualification {
  institution: string;
  degree: string;
  certification: string;
}

// Backward compatibility alias for QualificationItem
export type QualificationItem = AcademicQualification;

export interface AcademicColumn {
  type: "academic";
  icon: string;
  title: string;
  qualification: AcademicQualification;
  /** Backward-compatible qualifications array */
  qualifications?: AcademicQualification[];
}

export interface ExperienceColumn {
  type: "experience";
  icon: string;
  title: string;
  items: string[];
}

export interface EducationColumn {
  type: "education";
  icon: string;
  title: string;
  lead: string;
  institution: string;
}

export type FoundationColumn =
  | AcademicColumn
  | ExperienceColumn
  | EducationColumn;

export interface BuildingFoundationData {
  name: string; // "Teejaswinni K Lokesh"
  heading: string; // "Building a Strong Foundation"
  description: string; // contains the "{name}" placeholder
  columns?: FoundationColumn[];
}

export const defaultBuildingFoundation: BuildingFoundationData = {
  name: "Teejaswinni K Lokesh",
  heading: "Building a Strong Foundation",
  description:
    "Learning has always been an important part of {name} journey. Alongside her academic qualifications, she has continued to strengthen her knowledge through professional training and specialized learning under experienced mentors.",
  columns: [
    {
      type: "academic",
      icon: "/images/about-us/building-strong-foundation/cards-icons/GraduationCap.svg",
      title: "Academic Qualifications",
      qualification: {
        institution: "University of Mysore",
        degree: "Bachelor of Commerce",
        certification: "CA Articleship",
      },
    },
    {
      type: "experience",
      icon: "/images/about-us/building-strong-foundation/cards-icons/Briefcase.svg",
      title: "Professional Experience",
      items: [
        "Financial Analyst",
        "Data Analyst",
        "Team Lead",
        "Corporate Trainer",
      ],
    },
    {
      type: "education",
      icon: "/images/about-us/building-strong-foundation/cards-icons/BookOpenText.svg",
      title: "Continuing Education",
      lead: "Currently pursuing Astrology at",
      institution: "The Astrology Academy of India, Delhi",
    },
  ],
};
