import type { Metadata } from "next";
import { fontEyebrow, fontHeading, fontLato } from "@/styles/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Divine Infinity Numerology",
  description: "Public Website for Divine Infinity Numerology LMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontLato.variable} ${fontHeading.variable} ${fontEyebrow.variable} antialiased`}
    >
      <body className="bg-page-gradient text-light flex min-h-screen flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
