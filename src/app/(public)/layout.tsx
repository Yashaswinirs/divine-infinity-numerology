import type { ReactNode } from "react";
import { Navbar } from "@/components/layout";
import { Footer } from "@/components/shared";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
