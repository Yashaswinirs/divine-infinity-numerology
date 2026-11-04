import { Heading, Text, type HeadingLevel } from "@/components/ui";
import { cn } from "@/lib";
import { Ornament } from "./Ornament";

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  titleId?: string;
  as?: HeadingLevel;
  className?: string;
  subtitleClassName?: string;
}

/** Centered section header: ornament, Lovelace title (Accent), Body small subtitle (Light). Gap 15 in Figma. */
export function SectionHeading({
  title,
  subtitle,
  titleId,
  as = "h2",
  className,
  subtitleClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex w-full flex-col items-center gap-3.75", className)}>
      <Ornament variant="section" />
      <Heading
        as={as}
        id={titleId}
        size="section"
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
          className={cn("type-body-small text-light", subtitleClassName)}
        >
          {subtitle}
        </Text>
      )}
    </div>
  );
}
