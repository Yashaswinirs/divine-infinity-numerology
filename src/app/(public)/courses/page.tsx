import type { Metadata } from "next";
import {
  CoursesHero,
  CoursesPaths,
  CoursesSmoothScroll,
  CoursesSupport,
} from "@/components/sections/courses";
// Direct import: the Consultation barrel would pull every Consultation section into this page.
import { HeroSeam } from "@/components/sections/consultation/HeroSeam";
import { StarField, WhatsAppButton } from "@/components/shared";
import { coursesMetadata } from "@/data/courses";

export const metadata: Metadata = {
  title: coursesMetadata.title,
  description: coursesMetadata.description,
};

// Page gradient: the Figma desktop Gradient CSS of the Courses frame (received 16 Nov 2026), with its percentage stops.
// The percentages follow the height of <main>, so they match Figma once all sections are in; with only the hero and Section 2 built the
// gradient is compressed into a short page. No section paints its own background, so the gradient runs under all of them.
// TODO(figma): the Gradient panels of "Courses Tab" and "Courses Mobile" were not received; the same stops are used on every width.
export default function CoursesPage() {
  return (
    <main className="bg-gradient-stop-5 bg-[linear-gradient(165.6deg,var(--color-gradient-stop-1)_1.7%,var(--color-gradient-stop-2)_28.11%,var(--color-gradient-stop-3)_50.11%,var(--color-gradient-stop-4)_72.12%,var(--color-gradient-stop-5)_89.73%)]">
      <CoursesSmoothScroll />
      <CoursesHero />
      {/* Same seam strip as the Consultation page (Figma Rectangle 1), so the hero image fades into the page with no line. */}
      <HeroSeam />
      {/* Sections 2 to 6 share one StarField (same pattern as Consultation). The wrapper is z-20 so the seam strip does not dim the Section 2 ornament. */}
      {/* copies is 7 (was 6): below tab one copy covers about 497px, so 7 cover about 3480px (phone wrapper: Section 2 about 2550px
          + Section 3 669px = about 3220px). Raise it by about 1 per 500px of extra height below tab when Sections 4 to 6 are added. */}
      <div className="relative isolate z-20 overflow-hidden">
        <StarField copies={7} className="tab:[--star-scale:1] [--star-scale:0.5]" />
        <CoursesPaths />
        <CoursesSupport />
        {/* SLOT: Sections 4 to 6 go here, inside this wrapper (after CoursesSupport). */}
      </div>
      {/* SLOT: "Ready to Connect?" CTA (section 7). Built by the teammate, not here. The Footer goes in (public)/layout.tsx. */}
      <WhatsAppButton />
    </main>
  );
}
