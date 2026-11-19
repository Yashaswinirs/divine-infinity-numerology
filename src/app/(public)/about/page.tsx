import type { Metadata } from "next";
import {
  AboutHero,
  AboutTejaswini,
  AboutHeroTransition,
  PathOfLearning,
  BuildingStrongFoundation,
  Certificates,
  Recognition,
  AreasOfExpertise,
  RecognisedForExcellence,
} from "@/components/sections/about-us";
import { CtaBanner } from "@/components/shared";
import { aboutHeroContent } from "@/data/about";
import { aboutCtaBanner } from "@/data/cta-banner";

export const metadata: Metadata = {
  title: "About Us | Divine Infinity Numerology",
  description: `${aboutHeroContent.eyebrow} - ${aboutHeroContent.title}`,
};

export default function AboutPage() {
  return (
    <main className="relative flex min-h-[calc(100vh+1px)] flex-col overflow-x-clip">
      <AboutHero />
      {/* 95px transition overlay at top: 517px, sitting behind About Us stars and content */}
      <AboutHeroTransition />
      <AboutTejaswini />
      {/* Path of Learning Section */}
      <PathOfLearning />
      {/* Building a Strong Foundation Section */}
      <BuildingStrongFoundation />
      {/* Certificates Section */}
      <Certificates />
      {/* Recognition Section */}
      <Recognition />
      {/* Areas of Expertise Section */}
      <AreasOfExpertise />
      {/* Recognised for Excellence Section */}
      <RecognisedForExcellence />
      {/* Pre-footer CTA Section */}
      <CtaBanner data={aboutCtaBanner} />
    </main>
  );
}
