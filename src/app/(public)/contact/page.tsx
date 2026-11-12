import type { Metadata } from "next";
import { ContactEnquiry, ContactHero } from "@/components/sections/contact";
import { WhatsAppButton } from "@/components/shared";
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
      {/* SLOT: sections 3 to 5 (insights, office + map, FAQ) are added here, one at a time. */}
      {/* SLOT: "Ready to Take the Next Step?" CTA. Built by the teammate, not here. The Footer goes in (public)/layout.tsx. */}
      <WhatsAppButton />
    </main>
  );
}
