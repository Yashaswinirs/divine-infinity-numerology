import type { Metadata } from "next";
import {
  ConsultationConnect,
  ConsultationExpectation,
  ConsultationExpertise,
  ConsultationFaq,
  ConsultationHero,
  ConsultationPlans,
  ConsultationTypes,
} from "@/components/sections/consultation";
import { CtaBanner, HeroSeam, StarField, WhatsAppButton } from "@/components/shared";
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
// Gradient panel (angle and positions) for tablet and phone.
// Consultation 6 (16 Nov 2026): the Figma desktop gradient (165.6deg, #090D22 1.7%, #2A1845 28.11%, #1A1440 50.11%, #0B1333 72.12%,
// #040817 89.73% of the 1440 x 6241 frame) gives, down the centre column, Stop 4 at 4583px and Stop 5 at 5747px. The desktop tail now
// uses them (the old Stop 4 at 3360 and Stop 5 at 3540 were eye-sampled and ran near-black under Section 6). Below lg the tails keep
// the Section 5 wave up to Stop 3 and then fade the same way (colour about 65% of the way to Stop 4 at the bottom of Section 6). Estimated.
export default function ConsultationPage() {
  return (
    <main className="bg-gradient-stop-5 tab:bg-[linear-gradient(180deg,var(--color-gradient-stop-1)_0px,var(--color-gradient-stop-2)_1560px,var(--color-gradient-stop-3)_3120px,color-mix(in_srgb,var(--color-gradient-stop-1)_67%,var(--color-gradient-stop-2))_4142px,var(--color-gradient-stop-2)_4358px,var(--color-gradient-stop-3)_4562px,var(--color-gradient-stop-4)_6772px,var(--color-gradient-stop-5)_8540px)] bg-[linear-gradient(180deg,var(--color-gradient-stop-1)_0px,var(--color-gradient-stop-2)_1560px,var(--color-gradient-stop-3)_3120px,color-mix(in_srgb,var(--color-gradient-stop-1)_67%,var(--color-gradient-stop-2))_4399px,var(--color-gradient-stop-2)_4615px,var(--color-gradient-stop-3)_4819px,var(--color-gradient-stop-4)_6590px,var(--color-gradient-stop-5)_8007px)] max-[599px]:bg-[linear-gradient(180deg,var(--color-gradient-stop-1)_0px,var(--color-gradient-stop-2)_1560px,var(--color-gradient-stop-3)_3120px,color-mix(in_srgb,var(--color-gradient-stop-1)_67%,var(--color-gradient-stop-2))_4123px,var(--color-gradient-stop-2)_4339px,var(--color-gradient-stop-3)_4543px,var(--color-gradient-stop-4)_6623px,var(--color-gradient-stop-5)_8287px)] max-[449px]:bg-[linear-gradient(180deg,var(--color-gradient-stop-1)_0px,var(--color-gradient-stop-2)_1560px,var(--color-gradient-stop-3)_3120px,color-mix(in_srgb,var(--color-gradient-stop-1)_67%,var(--color-gradient-stop-2))_4399px,var(--color-gradient-stop-2)_4615px,var(--color-gradient-stop-3)_4819px,var(--color-gradient-stop-4)_6590px,var(--color-gradient-stop-5)_8007px)] max-[399px]:bg-[linear-gradient(180deg,var(--color-gradient-stop-1)_0px,var(--color-gradient-stop-2)_1560px,var(--color-gradient-stop-3)_3120px,color-mix(in_srgb,var(--color-gradient-stop-1)_67%,var(--color-gradient-stop-2))_4594px,var(--color-gradient-stop-2)_4810px,var(--color-gradient-stop-3)_5014px,var(--color-gradient-stop-4)_6915px,var(--color-gradient-stop-5)_8436px)] max-[349px]:bg-[linear-gradient(180deg,var(--color-gradient-stop-1)_0px,var(--color-gradient-stop-2)_1560px,var(--color-gradient-stop-3)_3120px,color-mix(in_srgb,var(--color-gradient-stop-1)_67%,var(--color-gradient-stop-2))_4759px,var(--color-gradient-stop-2)_4975px,var(--color-gradient-stop-3)_5179px,var(--color-gradient-stop-4)_7261px,var(--color-gradient-stop-5)_8927px)] lg:bg-[linear-gradient(180deg,var(--color-gradient-stop-1)_0px,var(--color-gradient-stop-2)_1700px,var(--color-gradient-stop-3)_1850px,var(--color-gradient-stop-1)_1940px,var(--color-gradient-stop-1)_2249px,var(--color-gradient-stop-2)_2460px,var(--color-gradient-stop-3)_2620px,color-mix(in_srgb,var(--color-gradient-stop-1)_67%,var(--color-gradient-stop-2))_2680px,var(--color-gradient-stop-2)_2896px,var(--color-gradient-stop-3)_3100px,var(--color-gradient-stop-4)_4583px,var(--color-gradient-stop-5)_5747px,var(--color-gradient-stop-5)_6241px)]">
      <ConsultationHero />
      <HeroSeam />
      {/* Sections 2 to 7 share one StarField (same pattern as Contact). HeroSeam is the Figma Rectangle 1 strip under the hero. */}
      {/* copies is 16 (was 6, 10, 12, 14): below tab one copy covers about 497px, so 16 cover about 7960px (page about 7400px at 320 with Section 7). */}
      <div className="relative isolate z-20 overflow-hidden">
        <StarField copies={16} className="tab:[--star-scale:1] [--star-scale:0.5]" />
        <ConsultationPlans />
        <ConsultationTypes />
        <ConsultationExpectation />
        <ConsultationConnect />
        <ConsultationExpertise />
        <ConsultationFaq />
      </div>
      {/* SLOT: "Looking for Clarity?" CTA (section 8). Built by the teammate, not here. The Footer goes in (public)/layout.tsx. */}
      <CtaBanner data={{ heading: "Looking for Clarity?" }} />
      <WhatsAppButton />
    </main>
  );
}
