import { Container, Section } from "@/components/layout";
import { AwardCard, SectionHeading, StarField } from "@/components/shared";
import { awardsContent } from "@/data/home";

// Figma section padding: top/bottom 60 desktop (measured), about 53 tablet (estimated from the canvas), 0 mobile.
// Content width: 1242 desktop (xl:max-w-310.5), 662 tablet (md:max-w-165.5), 385 mobile. Gap header to grid: 70 / 40 / 40.
// Grid: 3 columns gap 60 (desktop), 2 columns gap 20 (tablet), 1 column gap 20 (mobile, estimated).
// Tablet side padding is 53 (668 - 662 = 53 each side), not the page 60, so md:px-13.25 overrides it.
// TODO(figma): mobile card panels and the desktop row 2 card/image sizes were not measured.
export function AwardsCertifications() {
  const { title, subtitle, background, awards } = awardsContent;

  return (
    <Section
      container={false}
      spacing="none"
      aria-labelledby="awards-heading"
      className="md:py-13.25 xl:py-15"
    >
      <StarField src={background.src} />

      <Container padding="page" className="relative md:px-13.25 xl:px-10">
        <div className="mx-auto flex w-full flex-col gap-10 md:max-w-165.5 md:gap-9 xl:max-w-310.5 xl:gap-17.5">
          <SectionHeading
            titleId="awards-heading"
            title={title}
            subtitle={subtitle}
            titleSize="sectionT"
            ornamentClassName="w-40.5 md:w-65.5 xl:w-90.5"
            className="md:py-10 xl:py-15"
            subtitleClassName="sm:max-w-120"
          />

          <ul className="mx-auto grid w-full max-w-96.25 grid-cols-1 gap-5 sm:max-w-none sm:grid-cols-2 xl:grid-cols-3 xl:gap-10 min-[90rem]:gap-15">
            {awards.map((award) => (
              <li key={award.title} className="flex">
                <AwardCard {...award} className="w-full" />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
