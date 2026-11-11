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
  /**
   * Subtitle size for the "center" variant.
   * "small" (default) = Figma Body small 16/22.2.
   * "large" = Figma Body Large 18/22.6 on every viewport (Consultation Services).
   * "largeXl" = Body small below xl, Body Large 18/22.6 from xl (Blogs; the Figma desktop frame is Body Large).
   */
  subtitleSize?: "small" | "large" | "largeXl";
  className?: string;
  subtitleClassName?: string;
  ornamentClassName?: string;
  /** "gold" swaps in the gold section ornament (FAQ, Milestones). Default is the cream one. */
  ornamentTone?: "light" | "gold";
}

const subtitleStyles = {
  small: "type-body-small",
  large: "type-body-large",
  largeXl: "type-body-small xl:text-lg xl:leading-[22.6px] xl:tracking-normal",
} as const;

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
  ornamentTone,
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
      <Ornament variant="section" tone={ornamentTone} className={ornamentClassName} />
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
          className={cn(subtitleStyles[subtitleSize], "text-light", subtitleClassName)}
        >
          {subtitle}
        </Text>
      )}
    </div>
  );
}
