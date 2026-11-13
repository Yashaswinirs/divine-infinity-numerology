import type { Metadata } from "next";
import {
  ConsultationHero,
  ConsultationPlans,
  ConsultationTypes,
  HeroSeam,
} from "@/components/sections/consultation";
import { StarField, WhatsAppButton } from "@/components/shared";
import { consultationMetadata } from "@/data/consultation";

export const metadata: Metadata = {
  title: consultationMetadata.title,
  description: consultationMetadata.description,
};

// TODO(figma): the Gradient panel of the Consultation frame (angle, stop positions) was not sent. Below lg the five stops
// are evenly spaced over the 6241px frame (0 / 1560 / 3120 / 4681 / 6241 px, 180deg).
// From lg (1024) the stops follow the measured desktop layout (1440 and 1280, same positions): purple peak at the Section 3
// paragraph (1700px), then fading to navy by the second tile row (1940px) and dark navy after. The colours are read from
// the Figma desktop frame by eye. TODO(figma): the positions after 1940px are placeholders until Sections 4 to 7 are built.
export default function ConsultationPage() {
  return (
    <main className="bg-gradient-stop-5 bg-[linear-gradient(180deg,var(--color-gradient-stop-1)_0px,var(--color-gradient-stop-2)_1560px,var(--color-gradient-stop-3)_3120px,var(--color-gradient-stop-4)_4681px,var(--color-gradient-stop-5)_6241px)] lg:bg-[linear-gradient(180deg,var(--color-gradient-stop-1)_0px,var(--color-gradient-stop-2)_1700px,var(--color-gradient-stop-3)_1850px,var(--color-gradient-stop-1)_1940px,var(--color-gradient-stop-5)_2300px,var(--color-gradient-stop-5)_6241px)]">
      <ConsultationHero />
      <HeroSeam />
      {/* Sections 2 to 7 share one StarField (same pattern as Contact). HeroSeam is the Figma Rectangle 1 strip under the hero. */}
      <div className="relative isolate z-20 overflow-hidden">
        <StarField copies={6} className="tab:[--star-scale:1] [--star-scale:0.5]" />
        <ConsultationPlans />
        <ConsultationTypes />
        {/* SLOT: sections 4 to 7 go here, inside this wrapper (built in the next steps). */}
      </div>
      {/* SLOT: "Looking for Clarity?" CTA (section 8). Built by the teammate, not here. The Footer goes in (public)/layout.tsx. */}
      <WhatsAppButton />
    </main>
  );
}
