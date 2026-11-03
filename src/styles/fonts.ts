import { Cormorant_Garamond, Lato } from "next/font/google";

// TODO(figma): Figma uses Lato 500 (Medium), which Google Fonts does not host.
// Using 400 + 700 until Lato Medium files are added via next/font/local.
export const fontLato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato-loaded",
  display: "swap",
});

// TODO(figma): stand-in for Lovelace Text (licensed). Replace with next/font/local
// once the client supplies the font files.
export const fontHeading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-heading-loaded",
  display: "swap",
});
