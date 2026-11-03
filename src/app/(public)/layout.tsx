import type { ReactNode } from "react";
import { Navbar } from "@/components/layout";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
