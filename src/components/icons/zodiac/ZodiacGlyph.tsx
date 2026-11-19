import * as React from "react";
import { cn } from "@/lib";

export interface ZodiacGlyphProps extends React.SVGProps<SVGSVGElement> {
  sign: string;
  size?: number | string;
  className?: string;
}

/**
 * 12 Zodiac Glyphs (Astronomical/Astrological SVGs)
 *
 * Rendered at 88x88 with uniform stroke weight, single color via currentColor,
 * matching Figma design requirements for the Zodiac cards.
 */
export function ZodiacGlyph({
  sign,
  size = 88,
  className,
  ...props
}: ZodiacGlyphProps) {
  const normalizedSign = sign.toLowerCase().trim();

  const renderGlyph = () => {
    switch (normalizedSign) {
      case "aries":
        return (
          <>
            <path d="M 44 70 V 38" />
            <path d="M 44 38 C 40 24 24 22 22 34 C 20 44 28 48 34 44" />
            <path d="M 44 38 C 48 24 64 22 66 34 C 68 44 60 48 54 44" />
          </>
        );

      case "taurus":
        return (
          <>
            <circle cx="44" cy="54" r="18" />
            <path d="M 22 24 C 28 38 60 38 66 24" />
          </>
        );

      case "gemini":
        return (
          <>
            <path d="M 22 22 C 36 30 52 30 66 22" />
            <path d="M 22 66 C 36 58 52 58 66 66" />
            <path d="M 35 27 V 61" />
            <path d="M 53 27 V 61" />
          </>
        );

      case "cancer":
        return (
          <>
            <circle cx="33" cy="33" r="8" />
            <path d="M 33 25 C 53 25 68 36 68 44" />
            <circle cx="55" cy="55" r="8" />
            <path d="M 55 63 C 35 63 20 52 20 44" />
          </>
        );

      case "leo":
        return (
          <>
            <circle cx="28" cy="56" r="7" />
            <path d="M 33 51 C 36 28 52 22 56 38 C 58 48 54 64 66 58 C 72 54 70 44 64 44" />
          </>
        );

      case "virgo":
        return (
          <>
            <path d="M 20 64 V 36 C 20 28 28 28 28 36 V 64" />
            <path d="M 28 36 C 28 28 36 28 36 36 V 64" />
            <path d="M 36 36 C 36 28 44 28 44 36 V 58 C 44 70 64 70 64 48 C 64 36 48 46 48 70" />
          </>
        );

      case "libra":
        return (
          <>
            <path d="M 20 44 H 33 C 33 28 55 28 55 44 H 68" />
            <path d="M 20 62 H 68" />
          </>
        );

      case "scorpio":
        return (
          <>
            <path d="M 20 64 V 36 C 20 28 28 28 28 36 V 64" />
            <path d="M 28 36 C 28 28 36 28 36 36 V 64" />
            <path d="M 36 36 C 36 28 44 28 44 36 V 64" />
            <path d="M 44 56 C 48 64 58 64 66 52" />
            <path d="M 56 50 H 68 V 62" />
          </>
        );

      case "sagittarius":
        return (
          <>
            <path d="M 24 64 L 64 24" />
            <path d="M 44 24 H 64 V 44" />
            <path d="M 32 46 L 46 60" />
          </>
        );

      case "capricorn":
        return (
          <>
            <path d="M 22 30 L 34 60 L 46 34" />
            <path d="M 46 34 C 46 24 56 24 58 34 C 60 48 44 54 44 64 C 44 72 52 74 58 68" />
          </>
        );

      case "aquarius":
        return (
          <>
            <path d="M 20 36 L 28 26 L 36 36 L 44 26 L 52 36 L 60 26 L 68 36" />
            <path d="M 20 54 L 28 44 L 36 54 L 44 44 L 52 54 L 60 44 L 68 54" />
          </>
        );

      case "pisces":
        return (
          <>
            <path d="M 32 22 C 22 36 22 52 32 66" />
            <path d="M 56 22 C 66 36 66 52 56 66" />
            <path d="M 20 44 H 68" />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 88 88"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("shrink-0 select-none", className)}
      {...props}
    >
      {renderGlyph()}
    </svg>
  );
}

export default ZodiacGlyph;

