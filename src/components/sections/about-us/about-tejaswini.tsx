import * as React from "react";
import Image from "next/image";
import { Container, Section } from "@/components/layout";
import { SectionOrnament, WhatsAppButton } from "@/components/shared";
import { StatsRow } from "@/components/about/StatsRow";
import {
    SectionHeading,
    SectionSubheading,
    BodyText,
    BodyHighlight,
} from "@/components/typography";
import { aboutTejaswiniContent } from "@/data/about";

export interface AboutTejaswiniProps {
    /**
     * Intro content: ornament, SectionHeading, SectionSubheading, and first part of body text
     */
    intro?: React.ReactNode;
    /**
     * Rest content: second part of body text and the StatsRow
     */
    rest?: React.ReactNode;
}

function highlightPhrase(text: string, phrase: string) {
    if (!text || !text.includes(phrase)) return text;
    const parts = text.split(phrase);
    return (
        <>
            {parts[0]}
            <BodyHighlight>{phrase}</BodyHighlight>
            {parts.slice(1).join(phrase)}
        </>
    );
}

/**
 * AboutTejaswini Section Component ("About Teejaswinni")
 *
 * Measured from Figma specs:
 * - Mobile (425px):
 *   - Container padding: px-5 (20px), pt-4 (16px), pb-[60px]
 *   - Single column layout (image -> intro -> rest)
 *   - Image: 347px wide, aspect-[402/508], rounded-t-[999px]
 *   - Ornament: 162px wide
 *   - Heading: 30.43px / 35px Lovelace Text 400
 *   - Subheading: 17.3px / 25px Lovelace Text 400
 *   - Body: 16px / 22.2px Lato with 18px #FFD8A2 highlight
 *   - Stats: 2x2 grid, gap-x 24px, gap-y 32px, stat number 25.2px
 *
 * - Tablet (768px):
 *   - Container padding: px-15 (60px), pt-6 (24px), pb-[60px]
 *   - 2 columns (Image 347px, Intro 276px, gap 20px, max-w 645px)
 *   - Image: 347px wide, translate-y-6 (24px offset)
 *   - Ornament: 262px wide, mt-14 (56px offset)
 *   - Heading: 35px / 40px
 *   - Subheading: 19.08px / 23.3px
 *   - Stats: 4 across, gap 16px, stat number 28.58px
 *
 * - Desktop (1440px):
 *   - Container padding: px-20 (80px), pt-8 (32px), pb-[60px]
 *   - 2 columns (Image 402px spans 2 rows, Intro max 795px, Rest max 817px, gap-x 61px, gap-y 23px, max-w 1280px)
 *   - Image: 402px wide, rounded-t-[240px], translate-y-0
 *   - Ornament: 362px wide, mt-0
 *   - Heading: 54.93px / 70.4px
 *   - Subheading: 22.5px / 30.7px
 *   - Stats: 4 across, gap 50px, stat number 43.95px
 *
 * Seamless linear interpolation between 425px, 768px, and 1440px via CSS clamp().
 */
export function AboutTejaswini({ intro, rest }: AboutTejaswiniProps) {
    const { bgImage, image, heading, subheading, paragraph1, paragraph2, stats } =
        aboutTejaswiniContent;

    const defaultIntro = (
        <>
            {/* Reusable Section Ornament: fluid responsive (425px: 162px, 768px: 262px, 1440px: 362px) */}
            <SectionOrnament className="self-start mt-0 md:mt-14 xl:mt-0" />

            {/* Text group: heading block + first paragraph */}
            <div className="flex w-full min-w-0 flex-col gap-[clamp(1.5rem,0.95rem_+_2.07vw,2.813rem)]">
                {/* Heading block: max 523, gap fluid 8px -> 15px - Left aligned */}
                <div className="flex w-full max-w-[523px] min-w-0 flex-col gap-[clamp(0.5rem,0.35rem_+_0.5vw,0.938rem)] text-left self-start">
                    <SectionHeading className="break-words xl:whitespace-nowrap text-left text-[clamp(1.902rem,max(1.548rem_+_1.332vw,0.764rem_+_2.966vw),3.433rem)] leading-[clamp(2.188rem,max(1.8rem_+_1.458vw,0.329rem_+_4.524vw),4.4rem)]">
                        {heading}
                    </SectionHeading>
                    <SectionSubheading className="text-left text-[clamp(1.081rem,0.945rem_+_0.512vw,1.406rem)] leading-[clamp(1.456rem,max(1.456rem,0.928rem_+_1.1vw),1.919rem)]">
                        {subheading}
                    </SectionSubheading>
                </div>

                {/* Paragraph 1: BodyText (16px) with 18px highlight span */}
                <BodyText className="break-words text-left">
                    {highlightPhrase(paragraph1, "Teejaswinni K Lokesh")}
                </BodyText>
            </div>
        </>
    );

    const defaultRest = (
        <div className="flex w-full min-w-0 flex-col gap-[clamp(1rem,0.581rem_+_1.576vw,2rem)]">
            {/* Paragraph 2: BodyText (16px) with 18px highlight span */}
            <BodyText className="break-words text-left">
                {highlightPhrase(
                    paragraph2,
                    "Divine Infinity Numerology, Teejaswinni K Lokesh"
                )}
            </BodyText>

            {/* Stats row: padding over numbers scales smoothly, gap scales from 16px to 50px */}
            <StatsRow
                stats={stats}
                className="pt-[clamp(1.5rem,0.974rem_+_1.97vw,2.5rem)] md:pt-[clamp(0.5rem,0.25rem_+_0.5vw,1rem)] xl:pt-0"
            />
        </div>
    );

    const introContent = intro ?? defaultIntro;
    const restContent = rest ?? defaultRest;

    return (
        <Section
            container={false}
            spacing="none"
            aria-label="About Teejaswinni"
            className="relative flex w-full items-center overflow-hidden"
        >
            {/* 1440px Maximum Design Width Container - Centered on wider screens using existing Container */}
            <Container
                padding="page"
                className="relative z-20 w-full pt-[clamp(1rem,0.581rem_+_1.576vw,2rem)] pb-[60px]"
            >
                {/* 
          Inner Grid:
          - Mobile (<768px): 1 col (image, intro, rest) with fluid 24px-32px gap
          - Tablet (768-1279px, md:): 2 cols [347fr_276fr], fluid max-w 645px -> 1280px, fluid 20px-61px gap, Row 2 spans both cols
          - Desktop (1280px+, xl:): 2 cols [402px_1fr], max-w 1280px, image spans 2 rows, intro & rest stacked on right
        */}
                <div className="mx-auto w-full grid grid-cols-1 gap-[clamp(1.5rem,1.185rem_+_1.18vw,2rem)] md:grid-cols-[minmax(0,347fr)_minmax(0,276fr)] md:max-w-[clamp(40.313rem,-5.045rem_+_94.5vw,80rem)] md:gap-[clamp(1.25rem,0.107rem_+_2.38vw,3.813rem)] xl:grid-cols-[minmax(0,402px)_minmax(0,1fr)] xl:max-w-[1280px] xl:gap-x-[clamp(2rem,4.2vw,61px)] xl:gap-y-[clamp(1rem,1.6vw,23px)]">
                    {/* 1. Arched Image block: 347px (mobile & tablet) -> 402px (desktop), lowered on tablet by 24px */}
                    <div className="relative z-0 mx-auto w-full max-w-[min(100%,clamp(18rem,8rem_+_32vw,21.688rem))] md:max-w-[clamp(21.688rem,17.76rem_+_8.18vw,25.125rem)] aspect-[402/508] overflow-hidden rounded-t-[999px] md:col-start-1 md:row-start-1 md:self-center md:my-auto md:translate-y-6 xl:col-start-1 xl:row-start-1 xl:row-span-2 xl:max-w-[402px] xl:self-center xl:my-auto xl:translate-y-0 xl:rounded-t-[240px]">
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(min-width: 1280px) 402px, (min-width: 768px) 347px, 90vw"
                            className="object-cover"
                        />
                    </div>

                    {/* 2. Intro Block: 276px (tablet) -> 795px (desktop), fluid gap 24px -> 40px */}
                    <div className="relative flex min-w-0 w-full flex-col gap-[clamp(1.5rem,1.08rem_+_1.58vw,2.5rem)] md:col-start-2 md:row-start-1 md:max-w-[clamp(17.25rem,-2.036rem_+_40.18vw,49.688rem)] md:self-center md:my-auto xl:col-start-2 xl:row-start-1 xl:max-w-[795px] xl:gap-[clamp(1.5rem,2.8vw,40px)]">
                        {introContent}
                    </div>

                    {/* 3. Rest Block: 645px (tablet) -> 817px (desktop) */}
                    <div className="relative flex min-w-0 w-full flex-col md:col-span-2 md:col-start-1 md:row-start-2 md:max-w-[clamp(40.313rem,28.028rem_+_25.6vw,51.063rem)] xl:col-span-1 xl:col-start-2 xl:row-start-2 xl:max-w-[817px]">
                        {restContent}
                    </div>
                </div>

                {/* WhatsApp button - Absolute to section container, fluid responsive (not fixed to screen) */}
                <WhatsAppButton />
            </Container>

            {/* Stars overlay - Full-bleed edge-to-edge, positioned over the transition overlay (z-[16]) and behind content (z-20) */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[16]"
            >
                <Image
                    src={bgImage}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover object-top xl:object-center"
                />
            </div>
        </Section>
    );
}
