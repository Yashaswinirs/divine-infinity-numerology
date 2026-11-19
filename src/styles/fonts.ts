import { Mirza, Libre_Baskerville } from "next/font/google";
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

// Lovelace Text (licensed font files from Figma, supplied by user)
export const fontHeading = localFont({
  src: [
    { path: "../../public/fonts/LovelaceText-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/LovelaceText-BoldItalic.otf", weight: "700", style: "italic" },
  ],
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

// Milestone numbers: Libre Baskerville
export const fontLibreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville-loaded",
  display: "swap",
});
