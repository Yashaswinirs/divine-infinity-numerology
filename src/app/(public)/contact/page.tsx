import type { Metadata } from "next";
import {
  ContactEnquiry,
  ContactFaq,
  ContactHero,
  ContactInsights,
  ContactOffice,
} from "@/components/sections/contact";
import { StarField, WhatsAppButton } from "@/components/shared";
import { contactMetadata } from "@/data/contact";

export const metadata: Metadata = {
  title: contactMetadata.title,
  description: contactMetadata.description,
};

// TODO(figma): bg-page-flow has the Home band positions (--glow-1..6). Scope the --glow variables on this <main>
// when the lower sections are built.
export default function ContactPage() {
  return (
    <main className="bg-gradient-stop-5 bg-[linear-gradient(180deg,var(--color-gradient-stop-1)_0px,var(--color-gradient-stop-2)_1154px,var(--color-gradient-stop-3)_2307px,var(--color-gradient-stop-4)_3461px,var(--color-gradient-stop-5)_4614px)]">
      <ContactHero />
      <ContactEnquiry />
      {/* Sections 3 to 5 share one StarField, like the Home wrappers. Sections 4 and 5 go inside this div. */}
      <div className="relative isolate overflow-hidden">
        <StarField copies={6} className="tab:[--star-scale:1] [--star-scale:0.5]" />
        <ContactInsights />
        <ContactOffice />
        <ContactFaq />
      </div>
      {/* SLOT: "Ready to Take the Next Step?" CTA. Built by the teammate, not here. The Footer goes in (public)/layout.tsx. */}
      <WhatsAppButton />
    </main>
  );
}
