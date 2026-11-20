import { Fragment } from "react";
import { Container, Section } from "@/components/layout";
import { ArrowCircle } from "@/components/shared";
import { Button, Heading, Text } from "@/components/ui";
import { heroContent, type HeroCta, type TitleBreak } from "@/data/home";
import { HeroEyebrow } from "./HeroEyebrow";
import { HeroVideo } from "./HeroVideo";

// Figma button widths (minimums): desktop 202 / 197 (measured), tablet 183 / 176 (estimated).
// Mobile: two equal halves, stacking only when they cannot fit (320px).
const ctaWidth: Partial<Record<HeroCta["variant"], string>> = {
  "outline-accent": "min-w-fit flex-1 md:min-w-45.75 md:flex-none xl:min-w-50.5",
  accent: "min-w-fit flex-1 md:min-w-44 md:flex-none xl:min-w-49.25",
};

const titleBreak: Record<TitleBreak, string> = {
  tablet: "hidden md:block xl:hidden",
  desktop: "hidden xl:block",
  tabletDesktop: "hidden md:block",
};

export function Hero() {
  const { eyebrow, titleParts, description, ctas, video } = heroContent;

  return (
    <Section
      container={false}
      spacing="none"
      aria-labelledby="hero-heading"
      className="min-h-137.25 md:min-h-146.25 xl:min-h-187.5"
    >
      <HeroVideo src={video.src} poster={video.poster} />

      {/* Fade strip: 1440 x 95 at y=705 in a 750 hero, so it spills 50px into the next section.
          Layer blur 40 in Figma is about CSS blur(20px). TODO(figma): tablet/mobile strip not measured. */}
      <div
        aria-hidden="true"
        className="bg-page-gradient blur-hero-fade pointer-events-none absolute inset-x-0 -bottom-12.5 h-23.75"
      />

      {/* Top offset: desktop 129 (measured), tablet ~114 and mobile ~117 (estimated). */}
      <Container padding="page" className="relative pt-29 pb-6 md:pt-28.5 md:pb-0 xl:pt-32.25">
        <div className="flex flex-col gap-6.75 md:max-w-94 md:gap-7 xl:max-w-190 xl:gap-5.25">
          <HeroEyebrow text={eyebrow.text} icon={eyebrow.icon} />

          <div className="flex flex-col gap-7.25 md:gap-7 xl:gap-10">
            {/* H1 to paragraph: desktop 19 (measured), tablet ~8 and mobile ~58 (estimated). */}
            <div className="flex flex-col gap-13 md:gap-2.75 xl:gap-4.75">
              <Heading
                as="h1"
                id="hero-heading"
                size="hero"
                font="heading"
                color="gold"
                className="relative -top-[0.12em] md:max-w-90.25 xl:max-w-none"
              >
                {titleParts.map((part, index) => (
                  <Fragment key={part.text}>
                    {part.text}
                    {index < titleParts.length - 1 && " "}
                    {"breakAfter" in part && part.breakAfter && (
                      <br className={titleBreak[part.breakAfter]} />
                    )}
                  </Fragment>
                ))}
              </Heading>
              <Text
                weight="medium"
                className="type-body-small text-light md:max-w-86 xl:max-w-137.5 xl:text-white"
              >
                {description}
              </Text>
            </div>

            <div className="flex flex-wrap gap-2.5 md:gap-4">
              {ctas.map((cta) => (
                <Button
                  key={cta.href}
                  href={cta.href}
                  variant={cta.variant}
                  size="hero"
                  className={`${ctaWidth[cta.variant] ?? ""} ${cta.showArrow ? "shadow-none" : ""}`}
                  iconRight={cta.showArrow ? <ArrowCircle /> : undefined}
                >
                  {cta.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
