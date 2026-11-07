import { Heading, Text, type HeadingLevel, type HeadingProps } from "@/components/ui";
import { cn } from "@/lib";
import { Ornament } from "./Ornament";

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  titleId?: string;
  as?: HeadingLevel;
  /**
   * "center" (default): centered ornament, section title, Body small subtitle.
   * "feature": About style. Centered on phone, left aligned from 600px (tab); hero-size title and a
   * serif white subtitle (Figma H5).
   */
  variant?: "center" | "feature";
  /** Title size for the "center" variant. "sectionTab" switches to the tablet size at 600px instead of 768px. */
  titleSize?: HeadingProps["size"];
  /** Subtitle size for the "center" variant. "large" = Figma Body Large 18/22.6 (Consultation Services). */
  subtitleSize?: "small" | "large";
  className?: string;
  subtitleClassName?: string;
  ornamentClassName?: string;
}

/** Section header: ornament, Lovelace title (Accent), subtitle. Gap 15 in Figma (25 / 15 in "feature"). */
export function SectionHeading({
  title,
  subtitle,
  titleId,
  as = "h2",
  variant = "center",
  titleSize = "section",
  subtitleSize = "small",
  className,
  subtitleClassName,
  ornamentClassName,
}: SectionHeadingProps) {
  if (variant === "feature") {
    return (
      <div
        className={cn(
          "tab:items-start flex w-full flex-col items-center gap-6.25 xl:w-130.75",
          className
        )}
      >
        <Ornament variant="section" className={ornamentClassName} />
        <div className="tab:items-start flex w-full flex-col items-center gap-3.75">
          <Heading
            as={as}
            id={titleId}
            size="feature"
            font="heading"
            className="text-accent tab:text-left text-center lg:whitespace-nowrap"
          >
            {title}
          </Heading>
          {subtitle && (
            <p className={cn("type-h5 tab:text-left text-center text-white", subtitleClassName)}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex w-full flex-col items-center gap-3.75", className)}>
      <Ornament variant="section" className={ornamentClassName} />
      <Heading
        as={as}
        id={titleId}
        size={titleSize}
        font="heading"
        align="center"
        className="text-accent"
      >
        {title}
      </Heading>
      {subtitle && (
        <Text
          weight="medium"
          align="center"
          className={cn(
            subtitleSize === "large" ? "type-body-large" : "type-body-small",
            "text-light",
            subtitleClassName
          )}
        >
          {subtitle}
        </Text>
      )}
    </div>
  );
}
