import type { Metadata } from "next";
import { NotFoundSection } from "@/components/sections/not-found";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Divine Infinity Numerology",
  description:
    "Your journey doesn’t have to stop here. Maybe it’s a sign that your stars want you to explore something better.",
};

export default function NotFoundRoutePage() {
  return (
    <main className="relative flex flex-col overflow-x-clip">
      <NotFoundSection />
    </main>
  );
}
