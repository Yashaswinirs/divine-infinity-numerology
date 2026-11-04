import { Libre_Baskerville, Mirza } from "next/font/google";
import localFont from "next/font/local";

// Lato 2.0 (same as Figma), local files so the Medium (500) weight exists.
export const fontLato = localFont({
  src: [
    { path: "../../public/fonts/Lato-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Lato-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/Lato-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-lato-loaded",
  display: "swap",
});

// TODO(figma): stand-in for Lovelace Text (licensed). Libre Baskerville is the closest free font
// by width (measured within about 1%). Replace with next/font/local once the client supplies the files.
export const fontHeading = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading-loaded",
  display: "swap",
});

// Hero eyebrow: Figma uses Mirza Bold 700.
export const fontEyebrow = Mirza({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-eyebrow-loaded",
  display: "swap",
});
