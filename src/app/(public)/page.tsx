import { StarField } from "@/components/shared";
import {
  AboutTeejaswinni,
  AwardsCertifications,
  ConsultationServices,
  Courses,
  Hero,
  Milestones,
  ProudlyFeatured,
  Testimonials,
  WhyLearn,
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
      <div className="relative isolate overflow-hidden">
        <StarField />
        <WhyLearn />
        <Courses />
      </div>
      <ConsultationServices />
      <Testimonials />
    </main>
  );
}
