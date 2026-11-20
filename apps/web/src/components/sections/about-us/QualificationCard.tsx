import * as React from "react";
import { cn } from "@/lib";
import { FoundationCard } from "./FoundationCard";
import { type AcademicQualification } from "@/data/building-foundation";

export interface QualificationCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  qualification?: AcademicQualification;
  qualifications?: AcademicQualification[];
  items?: AcademicQualification[];
  className?: string;
}

const defaultQualification: AcademicQualification = {
  institution: "University of Mysore",
  degree: "Bachelor of Commerce",
  certification: "CA Articleship",
};

/**
 * QualificationCard Component (Column 1)
 *
 * Displays academic degree, institution, and professional certification
 * inside the shared FoundationCard shell.
 * - Fluid Responsive Dimensions:
 *   - Mobile (<768px): outer 374 x 188 (strip 16px, inner 358 x 172)
 *   - Tablet (768px): outer 374 x 188 (strip 16px, inner 358 x 172)
 *   - Desktop (1280px+): outer 374 x 196 (strip 24px, inner 350 x 172)
 * - Content: Degree + Institution, 226px dashed separator (#FFF0DB, 4px dash / 4px gap), Certification
 */
export function QualificationCard({
  qualification,
  qualifications,
  items,
  className,
  ...props
}: QualificationCardProps) {
  const item =
    qualification ??
    (qualifications && qualifications.length > 0 ? qualifications[0] : undefined) ??
    (items && items.length > 0 ? items[0] : undefined) ??
    defaultQualification;

  return (
    <FoundationCard
      className={cn("h-[188px] xl:h-[196px]", className)}
      innerClassName="h-[172px] flex flex-col justify-center px-6 md:px-[50px] py-[20px] text-left gap-[8px]"
      {...props}
    >
      <div className="relative z-10 flex w-full flex-col gap-[8px]">
        {/* Degree & Institution */}
        <div className="flex flex-col gap-[2px]">
          <p className="font-lato font-semibold text-[17px] leading-[22px] tracking-normal text-[#FFF0DB]">
            {item.degree}
          </p>
          <p className="font-lato font-normal text-[15px] leading-[20px] tracking-normal text-[#FFF0DB]/80">
            {item.institution}
          </p>
        </div>

        {/* 1px Dashed Horizontal Separator: 226px wide, 4px dash / 4px gap, color #FFF0DB */}
        <span
          aria-hidden="true"
          className="max-w-full w-[226px] h-px my-1 bg-[repeating-linear-gradient(to_right,#FFF0DB_0px,#FFF0DB_4px,transparent_4px,transparent_8px)] opacity-100"
        />

        {/* Certification */}
        {item.certification && (
          <p className="font-lato font-medium text-[16px] leading-[22.2px] tracking-[0.01em] text-[#FFD8A2]">
            {item.certification}
          </p>
        )}
      </div>
    </FoundationCard>
  );
}
