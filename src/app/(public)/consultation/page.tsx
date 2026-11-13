import type { Metadata } from "next";
import { ConsultationHero } from "@/components/sections/consultation";
import { WhatsAppButton } from "@/components/shared";
import { consultationMetadata } from "@/data/consultation";

export const metadata: Metadata = {
  title: consultationMetadata.title,
  description: consultationMetadata.description,
};

// TODO(figma): the Gradient panel of the Consultation frame (stop positions, angle, frame heights) was not sent yet.
// Until then the page is the solid first Gradient stop, which matches the hero seam. Add the gradient with section 2.
export default function ConsultationPage() {
  return (
    <main className="bg-gradient-stop-1">
      <ConsultationHero />
      {/* SLOT: sections 2 to 7 go here, inside one wrapper with the StarField (built in the next steps). */}
      {/* SLOT: "Looking for Clarity?" CTA (section 8). Built by the teammate, not here. The Footer goes in (public)/layout.tsx. */}
      <WhatsAppButton />
    </main>
  );
}
