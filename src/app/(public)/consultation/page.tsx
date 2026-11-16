import type { Metadata } from "next";
import {
  ConsultationConnect,
  ConsultationExpectation,
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
// the Figma desktop frame by eye. Section 4 stops (2249 to 2620px) come from its measured heights.
// Consultation 5 (16 Nov 2026): the stops from 2680px on were sampled from pixels of the Figma desktop prototype (centre column, section 5
// top about 2929px): a purple wave peaks at 2896px (Stop 2), then Stop 3 at 3100, Stop 4 at 3360, Stop 5 at 3540. The colour at 2680 is
// Stop 1 and Stop 2 mixed 67 / 33. Figma's real gradient is slightly diagonal (about 171deg); this one stays 180deg. TODO(figma): the
// Gradient panel (angle and positions), tablet and phone, and the positions after 3540px for Sections 6 and 7.
export default function ConsultationPage() {
  return (
    <main className="bg-gradient-stop-5 tab:bg-[linear-gradient(180deg,var(--color-gradient-stop-1)_0px,var(--color-gradient-stop-2)_1560px,var(--color-gradient-stop-3)_3120px,color-mix(in_srgb,var(--color-gradient-stop-1)_67%,var(--color-gradient-stop-2))_4142px,var(--color-gradient-stop-2)_4358px,var(--color-gradient-stop-3)_4562px,var(--color-gradient-stop-4)_4822px,var(--color-gradient-stop-5)_5002px,var(--color-gradient-stop-5)_6241px)] bg-[linear-gradient(180deg,var(--color-gradient-stop-1)_0px,var(--color-gradient-stop-2)_1560px,var(--color-gradient-stop-3)_3120px,color-mix(in_srgb,var(--color-gradient-stop-1)_67%,var(--color-gradient-stop-2))_4399px,var(--color-gradient-stop-2)_4615px,var(--color-gradient-stop-3)_4819px,var(--color-gradient-stop-4)_5079px,var(--color-gradient-stop-5)_5259px,var(--color-gradient-stop-5)_6241px)] max-[599px]:bg-[linear-gradient(180deg,var(--color-gradient-stop-1)_0px,var(--color-gradient-stop-2)_1560px,var(--color-gradient-stop-3)_3120px,color-mix(in_srgb,var(--color-gradient-stop-1)_67%,var(--color-gradient-stop-2))_4123px,var(--color-gradient-stop-2)_4339px,var(--color-gradient-stop-3)_4543px,var(--color-gradient-stop-4)_4803px,var(--color-gradient-stop-5)_4983px,var(--color-gradient-stop-5)_6241px)] max-[449px]:bg-[linear-gradient(180deg,var(--color-gradient-stop-1)_0px,var(--color-gradient-stop-2)_1560px,var(--color-gradient-stop-3)_3120px,color-mix(in_srgb,var(--color-gradient-stop-1)_67%,var(--color-gradient-stop-2))_4399px,var(--color-gradient-stop-2)_4615px,var(--color-gradient-stop-3)_4819px,var(--color-gradient-stop-4)_5079px,var(--color-gradient-stop-5)_5259px,var(--color-gradient-stop-5)_6241px)] max-[399px]:bg-[linear-gradient(180deg,var(--color-gradient-stop-1)_0px,var(--color-gradient-stop-2)_1560px,var(--color-gradient-stop-3)_3120px,color-mix(in_srgb,var(--color-gradient-stop-1)_67%,var(--color-gradient-stop-2))_4594px,var(--color-gradient-stop-2)_4810px,var(--color-gradient-stop-3)_5014px,var(--color-gradient-stop-4)_5274px,var(--color-gradient-stop-5)_5454px,var(--color-gradient-stop-5)_6241px)] max-[349px]:bg-[linear-gradient(180deg,var(--color-gradient-stop-1)_0px,var(--color-gradient-stop-2)_1560px,var(--color-gradient-stop-3)_3120px,color-mix(in_srgb,var(--color-gradient-stop-1)_67%,var(--color-gradient-stop-2))_4759px,var(--color-gradient-stop-2)_4975px,var(--color-gradient-stop-3)_5179px,var(--color-gradient-stop-4)_5439px,var(--color-gradient-stop-5)_5619px,var(--color-gradient-stop-5)_6241px)] lg:bg-[linear-gradient(180deg,var(--color-gradient-stop-1)_0px,var(--color-gradient-stop-2)_1700px,var(--color-gradient-stop-3)_1850px,var(--color-gradient-stop-1)_1940px,var(--color-gradient-stop-1)_2249px,var(--color-gradient-stop-2)_2460px,var(--color-gradient-stop-3)_2620px,color-mix(in_srgb,var(--color-gradient-stop-1)_67%,var(--color-gradient-stop-2))_2680px,var(--color-gradient-stop-2)_2896px,var(--color-gradient-stop-3)_3100px,var(--color-gradient-stop-4)_3360px,var(--color-gradient-stop-5)_3540px,var(--color-gradient-stop-5)_6241px)]">
      <ConsultationHero />
      <HeroSeam />
      {/* Sections 2 to 7 share one StarField (same pattern as Contact). HeroSeam is the Figma Rectangle 1 strip under the hero. */}
      {/* copies is 10 (was 6): below tab the stars are scaled by 0.5, so 6 copies (about 2985px) ended before Section 5. */}
      <div className="relative isolate z-20 overflow-hidden">
        <StarField copies={12} className="tab:[--star-scale:1] [--star-scale:0.5]" />
        <ConsultationPlans />
        <ConsultationTypes />
        <ConsultationExpectation />
        <ConsultationConnect />
        {/* SLOT: sections 6 and 7 go here, inside this wrapper (built in the next steps). */}
      </div>
      {/* SLOT: "Looking for Clarity?" CTA (section 8). Built by the teammate, not here. The Footer goes in (public)/layout.tsx. */}
      <WhatsAppButton />
    </main>
  );
}
