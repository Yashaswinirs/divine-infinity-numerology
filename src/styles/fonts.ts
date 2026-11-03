import { Lato, Inter } from "next/font/google";

// Lato is defined in the Figma brand guidelines
export const fontLato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

// TODO(figma): Inter is a guessed UI sans fallback font family. Verify against Figma typography.
// TODO(figma): Only weights 400 and 600 loaded; verify if additional or different weights are required by Figma.
export const fontSans = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-sans",
  display: "swap",
});
