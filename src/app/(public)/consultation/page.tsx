import type { Metadata } from "next";
import { ConsultationHero, ConsultationPlans, HeroSeam } from "@/components/sections/consultation";
import { StarField, WhatsAppButton } from "@/components/shared";
import { consultationMetadata } from "@/data/consultation";

export const metadata: Metadata = {
  title: consultationMetadata.title,
  description: consultationMetadata.description,
};

// TODO(figma): the Gradient panel of the Consultation frame (angle, stop positions, frame height) was not sent. The five
// stops use the Contact page positions (0 / 1154 / 2307 / 3461 / 4614 px) until it arrives. Desktop pixel positions.
export default function ConsultationPage() {
  return (
    <main className="bg-gradient-stop-5 bg-[linear-gradient(180deg,var(--color-gradient-stop-1)_0px,var(--color-gradient-stop-2)_1560px,var(--color-gradient-stop-3)_3120px,var(--color-gradient-stop-4)_4681px,var(--color-gradient-stop-5)_6241px)]">
      <ConsultationHero />
      <HeroSeam />
      {/* Sections 2 to 7 share one StarField (same pattern as Contact). HeroSeam is the Figma Rectangle 1 strip under the hero. */}
      <div className="relative isolate z-20 overflow-hidden">
        <StarField copies={6} className="tab:[--star-scale:1] [--star-scale:0.5]" />
        <ConsultationPlans />
        {/* SLOT: sections 3 to 7 go here, inside this wrapper (built in the next steps). */}
      </div>
      {/* SLOT: "Looking for Clarity?" CTA (section 8). Built by the teammate, not here. The Footer goes in (public)/layout.tsx. */}
      <WhatsAppButton />
    </main>
  );
}
