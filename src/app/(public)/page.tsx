import { StarField } from "@/components/shared";
import {
  AboutTeejaswinni,
  AwardsCertifications,
  Hero,
  Milestones,
  ProudlyFeatured,
} from "@/components/sections/home";

export default function HomePage() {
  return (
    <main className="bg-page-flow">
      <Hero />
      <ProudlyFeatured />
      <div className="relative isolate overflow-hidden">
        <StarField />
        <AboutTeejaswinni />
        <Milestones />
      </div>
      <AwardsCertifications />
    </main>
  );
}
