import type { Metadata } from "next";
import { CoursesHero, CoursesSmoothScroll } from "@/components/sections/courses";
// Direct import: the Consultation barrel would pull every Consultation section into this page.
import { HeroSeam } from "@/components/sections/consultation/HeroSeam";
import { WhatsAppButton } from "@/components/shared";
import { coursesMetadata } from "@/data/courses";

export const metadata: Metadata = {
  title: coursesMetadata.title,
  description: coursesMetadata.description,
};

// Page gradient: the Figma desktop Gradient CSS of the Courses frame (received 16 Nov 2026), with its percentage stops.
// The percentages follow the height of <main>, so they match Figma once all sections are in; with only the hero built the
// gradient is compressed into a short page. No section paints its own background, so the gradient runs under all of them.
// TODO(figma): the Gradient panels of "Courses Tab" and "Courses Mobile" were not received; the same stops are used on every width.
export default function CoursesPage() {
  return (
    <main className="bg-gradient-stop-5 bg-[linear-gradient(165.6deg,var(--color-gradient-stop-1)_1.7%,var(--color-gradient-stop-2)_28.11%,var(--color-gradient-stop-3)_50.11%,var(--color-gradient-stop-4)_72.12%,var(--color-gradient-stop-5)_89.73%)]">
      <CoursesSmoothScroll />
      <CoursesHero />
      {/* Same seam strip as the Consultation page (Figma Rectangle 1), so the hero image fades into the page with no line. */}
      <HeroSeam />
      {/* SLOT: Sections 2 to 6 go here, inside one wrapper (relative isolate z-20 overflow-hidden) with one StarField. The
          wrapper must be z-20 so the seam strip does not dim the Section 2 ornament. Section 2 needs id="courses". */}
      {/* SLOT: "Ready to Connect?" CTA (section 7). Built by the teammate, not here. The Footer goes in (public)/layout.tsx. */}
      <WhatsAppButton />
    </main>
  );
}
