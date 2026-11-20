"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ArrowCircle } from "@/components/shared/ArrowCircle";
import {
  calculatorModalData,
  type CalculatorModalData,
} from "@/data/free-calculator";
import { cn } from "@/lib";

export interface CalculatorDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: Partial<CalculatorModalData>;
  className?: string;
}

/**
 * Numerology Life Path Number Calculator
 * Calculates the single-digit life path number or master number (11, 22, 33) from birth date digits.
 */
function calculateLifePathNumber(dobString: string): {
  number: number;
  archetype: string;
} | null {
  const digits = dobString.replace(/\D/g, "");
  if (digits.length < 4) return null;

  let sum = digits
    .split("")
    .reduce((acc, digit) => acc + parseInt(digit, 10), 0);

  // Keep reducing unless it's a master number (11, 22, 33)
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum
      .toString()
      .split("")
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }

  const archetypes: Record<number, string> = {
    1: "The Leader & Independent Pioneer",
    2: "The Harmonizer & Sensitive Diplomat",
    3: "The Creative Communicator & Expressive Soul",
    4: "The Master Builder & Grounded Strategist",
    5: "The Free Spirit & Dynamic Adventurer",
    6: "The Compassionate Nurturer & Healer",
    7: "The Mystic Seeker & Deep Truth Seeker",
    8: "The Powerful Achiever & Material Visionary",
    9: "The Wise Philanthropist & Humanitarian",
    11: "The Master Intuitive & Spiritual Illuminator",
    22: "The Master Architect & Visionary Builder",
    33: "The Master Teacher & Cosmic Healer",
  };

  return {
    number: sum,
    archetype: archetypes[sum] || "Unique Cosmic Path",
  };
}

/**
 * CalculatorDetailsModal Component
 *
 * SPECIFICATIONS:
 * - Desktop & Tablet Frame:
 *   width: 648px, height: 762.91px, gap: 40px, border-radius: 25px, padding: 40px 60px
 *   background: linear-gradient(142.94deg, #1D1B4D 0%, #512B58 120.7%)
 *
 * - Inside Frame:
 *   1. Form Section: width: 528px, height: 504.91px, gap: 40px
 *      - Block A (Header + 4 Inputs): width: 528px, height: 416.91px, gap: 40px
 *        - Header: width: 267px, height: 69.91px, gap: 25px
 *          - Ornament: /images/ornament.svg (Desktop: 267px; Mobile: 261.97px x 24.91px)
 *          - Heading: "Enter your details" (Desktop: Lovelace Text 400, 28.58px; Mobile: 25.22px, color: #FFD8A2)
 *        - 4 Input Boxes: width: 528px, height: 307px, gap: 25px
 *          - Each box: 528px x 58px, gap: 10px, border-radius: 8px, padding: 16px 12px, border: 1px solid #FFD8A2
 *          - 24x24 icon, 23px vertical divider (#FFD8A2), Lato 500 18px text (placeholder #8A8A8A, text #ECECEC)
 *      - Button: width: 242px, height: 48px, gap: 12px, border-radius: 50px, padding: 10px 10px 10px 16px
 *        - Background: #FFD8A2, text: #655373 (Lato 16px bold), 28px circular badge with #FFD8A2 chevron
 *   2. Section 2: width: 333px, height: 138px, gap: 37px
 *      - Displays trust status initially, and reveals computed Life Path Number upon submission.
 *
 * - Mobile (< 768px):
 *   Responsive fluid sizing: max-w-[calc(100vw-32px)], p-[32px_20px], ornament 261.97px x 24.91px, heading 25.22px.
 */
export function CalculatorDetailsModal({
  isOpen,
  onClose,
  data: propData,
  className,
}: CalculatorDetailsModalProps) {
  const data: CalculatorModalData = {
    ...calculatorModalData,
    ...propData,
    fields: propData?.fields || calculatorModalData.fields,
    submitButton: {
      ...calculatorModalData.submitButton,
      ...propData?.submitButton,
    },
    bottomSection: {
      ...calculatorModalData.bottomSection,
      ...propData?.bottomSection,
    },
  };

  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    dob: "",
    mobileNumber: "",
  });

  const [result, setResult] = React.useState<{
    number: number;
    archetype: string;
  } | null>(null);

  const [error, setError] = React.useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Scale down to 80% of device height if the modal height exceeds 80% of the viewport
  React.useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => {
      const vh = window.innerHeight;
      const isMobile = window.innerWidth < 768;
      // Target design heights: 762.91px for desktop/tablet, 729.91px for mobile 425px
      const targetHeight = isMobile ? 729.91 : 762.91;
      const maxAllowedHeight = vh * 0.8; // 80% of device height

      if (targetHeight > maxAllowedHeight) {
        const calculatedScale = maxAllowedHeight / targetHeight;
        // Keep scale responsive and fluid, with a sensible minimum
        setScale(Math.min(1, Math.max(0.4, calculatedScale)));
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  // Close on Escape key press & body scroll locking
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.dob.trim()) {
      setError("Please enter your date of birth");
      return;
    }

    const calculated = calculateLifePathNumber(formData.dob);
    if (!calculated) {
      setError("Please enter a valid date (e.g. DD/MM/YYYY)");
      return;
    }

    setResult(calculated);
    setError(null);
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-details-heading"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto"
    >
      {/* Backdrop with celestial blur */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-[#040817]/80 backdrop-blur-md transition-opacity duration-200"
      />

      {/* Modal Card Container:
          Desktop & Tablet (>= 768px): width 648px, height 762.91px, gap 40px, border-radius 25px, padding 40px 60px
          Mobile / 425px (< 768px): width 385px, height 729.91px, gap 40px, border-radius 12px, padding 25px 20px
          Fluid Device Height Scaling: auto-scales to fit within 80% of device height
      */}
      <div
        style={{
          background:
            "linear-gradient(142.94deg, #1D1B4D 0%, #512B58 120.7%)",
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
        className={cn(
          "relative z-10 w-full",
          "max-w-[385px] md:max-w-[648px]",
          "min-h-[729.91px] md:min-h-[762.91px]",
          "p-[25px_20px] md:p-[40px_60px]",
          "flex flex-col items-center justify-between",
          "gap-[40px]",
          "rounded-[12px] md:rounded-[25px]",
          "border border-[#FFD8A2]/30 shadow-[0_24px_64px_rgba(0,0,0,0.6)]",
          "text-white transition-transform duration-150 ease-out",
          className
        )}
      >
        {/* Close Button ("X") */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className={cn(
            "absolute top-4 right-4 md:top-6 md:right-6 z-20",
            "flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full",
            "bg-white/5 border border-[#FFD8A2]/30 text-[#FFD8A2]",
            "hover:bg-[#FFD8A2]/20 hover:text-white active:scale-95",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFD8A2]",
            "transition-all duration-150 cursor-pointer"
          )}
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* ============================================================== */}
        {/* SECTION 1: Form Section (width: 528, height: 504.91, gap: 40px) */}
        {/* ============================================================== */}
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-[528px] md:min-h-[504.91px] flex-col items-center justify-between gap-[32px] md:gap-[40px]"
        >
          {/* Block A: Header + 4 Inputs (width: 528, height: 416.91, gap: 40px) */}
          <div className="flex w-full max-w-[528px] md:min-h-[416.91px] flex-col items-center gap-[32px] md:gap-[40px]">
            {/* Header Block: width 267px (mobile: 261.97px), height 69.91px, gap 25px */}
            <div className="flex w-full max-w-[267px] min-h-[69.91px] flex-col items-center justify-center gap-[25px] text-center mx-auto">
              {/* Ornament: Desktop 267px, Mobile 261.97px x 24.91px */}
              <div className="flex items-center justify-center">
                <Image
                  src={data.ornament}
                  alt=""
                  width={267}
                  height={25}
                  aria-hidden="true"
                  className={cn(
                    "h-auto max-w-full text-accent",
                    "w-[clamp(261.97px,70vw,267px)]"
                  )}
                />
              </div>

              {/* Heading: Lovelace Text 400, Desktop 28.58px, Mobile 25.22px, leading 100%, color #FFD8A2 */}
              <h3
                id="modal-details-heading"
                className={cn(
                  "font-heading font-normal text-[#FFD8A2] tracking-normal text-center leading-none",
                  "text-[clamp(25.22px,5.8vw,28.58px)]"
                )}
              >
                {data.heading}
              </h3>
            </div>

            {/* 4 Input Boxes Container: width: 528px, height: 307px, gap: 25px */}
            <div className="flex w-full max-w-[528px] flex-col gap-[25px]">
              {data.fields.map((field) => (
                <div
                  key={field.id}
                  className={cn(
                    "flex w-full max-w-[528px] h-[58px] items-center gap-[10px]",
                    "rounded-[8px] p-[16px_12px]",
                    "border border-[#FFD8A2] bg-[#090D22]/30 backdrop-blur-sm",
                    "transition-all duration-150",
                    "focus-within:ring-1 focus-within:ring-[#FFD8A2] focus-within:border-[#FFD8A2]"
                  )}
                >
                  {/* Icon: 24x24 px */}
                  <div className="relative flex h-[24px] w-[24px] shrink-0 items-center justify-center">
                    <Image
                      src={field.icon}
                      alt={field.iconAlt}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>

                  {/* Vertical Divider: width 23px rotated -90deg = vertical 23px tall, 1px solid #FFD8A2 */}
                  <span
                    aria-hidden="true"
                    className="h-[23px] w-[1px] bg-[#FFD8A2] shrink-0 opacity-100"
                  />

                  {/* Placeholder / Input Text: Lato 500, 18px, line-height 22.6px, color #ECECEC, placeholder #8A8A8A */}
                  <input
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    value={formData[field.id as keyof typeof formData] || ""}
                    onChange={(e) =>
                      handleInputChange(field.id, e.target.value)
                    }
                    placeholder={field.placeholder}
                    required={field.id === "dob"}
                    className={cn(
                      "w-full bg-transparent p-0 border-none outline-none focus:outline-none focus:ring-0",
                      "font-lato font-medium text-[18px] leading-[22.6px] text-[#ECECEC]",
                      "placeholder:text-[#8A8A8A] placeholder:font-lato placeholder:font-medium placeholder:text-[18px] placeholder:leading-[22.6px]"
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Validation Error Message if any */}
          {error && (
            <p className="font-lato text-sm text-[#FFB3B3] text-center -mt-2">
              {error}
            </p>
          )}

          {/* Button: width: 242px, height: 48px, gap: 12px, border-radius: 50px, padding: 10px 10px 10px 16px */}
          <button
            type="submit"
            className={cn(
              "flex h-[48px] w-[242px] items-center justify-between",
              "rounded-[50px] bg-[#FFD8A2] p-[10px_10px_10px_16px] gap-[12px]",
              "font-lato font-bold text-[16px] leading-none tracking-normal text-[#655373]",
              "hover:brightness-105 active:scale-[0.98]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD8A2]",
              "transition-all duration-150 cursor-pointer mx-auto whitespace-nowrap"
            )}
          >
            <span>{data.submitButton.label}</span>
            <ArrowCircle tone="primary" size={28} />
          </button>
        </form>

        {/* ============================================================== */}
        {/* SECTION 2: Bottom Section (width: 333, height: 138, gap: 37px) */}
        {/* ============================================================== */}
        <div className="flex w-full max-w-[333px] h-[138px] flex-col items-center justify-between gap-[37px] mx-auto text-center">
          {/* Digits Block: width 333px, height 85px, Lovelace Text 400, 114px, leading 70.4px, #FFF0DB, opacity 0.4 (40%) */}
          <div
            className={cn(
              "flex w-full max-w-[333px] h-[85px] items-center justify-center",
              "font-heading font-normal text-[114px] leading-[70.4px] tracking-normal text-[#FFF0DB] select-none text-center",
              !result ? "opacity-40" : "opacity-100"
            )}
          >
            <span>
              {result
                ? result.number < 10
                  ? `0${result.number}`
                  : String(result.number)
                : data.bottomSection.defaultDigits}
            </span>
          </div>

          {/* Label: width 333px, height 16px, Lovelace Text 400, mobile 425: 20.91px / 29.1px, desktop: 23.35px / 33.6px, #FFF0DB */}
          <div className="flex w-full max-w-[333px] h-[16px] items-center justify-center font-heading font-normal text-[20.91px] leading-[29.1px] md:text-[23.35px] md:leading-[33.6px] tracking-normal text-[#FFF0DB] text-center whitespace-nowrap">
            {data.bottomSection.label}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default CalculatorDetailsModal;

