import { Section } from "@/components/layout";
import { LogoMarquee, SectionHeading } from "@/components/shared";
import { featuredContent } from "@/data/home";

// Figma padding: top 60 / 40 / 30 and bottom 40 / 40 / 30 (desktop / tablet / mobile); side padding 0 / 60 / 20.
// Desktop inner frame is 1418 wide and fixed 256 tall, gap 24; tablet gap 50; mobile gap 40.
export function ProudlyFeatured() {
  const { title, subtitle, logosLabel, logos } = featuredContent;

  return (
    <Section
      spacing="none"
      containerPadding="page"
      containerClassName="xl:px-0"
      aria-labelledby="featured-heading"
      // Figma frame starts at y=630 / 574 (tablet / mobile) but the Hero ends at 585 / 549:
      // the extra 45 / 25px is added to the top padding so the ornament lands at the Figma y.
      className="pt-13.75 pb-7.5 md:pt-21.25 md:pb-10 xl:pt-15"
    >
      <div className="mx-auto flex w-full flex-col gap-10 md:gap-12.5 xl:h-64 xl:max-w-354.5 xl:gap-6">
        {/* The subtitle is 389 wide in Figma, 5px wider than its 384 frame; -mx keeps it on one line at 425 and 768. */}
        <SectionHeading
          titleId="featured-heading"
          title={title}
          subtitle={subtitle}
          subtitleClassName="-mx-1.25"
        />
        <LogoMarquee logos={logos} label={logosLabel} />
      </div>
    </Section>
  );
}
