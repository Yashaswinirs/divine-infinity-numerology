import * as React from "react";
import Image from "next/image";
import { consultationCtaBanner, defaultCtaBanner, type CtaBannerData } from "@/data/cta-banner";
import { CtaBannerButton } from "@/components/shared/CtaBannerButton";

/**
 * ConsultationCtaBanner Component (PERMANENTLY FROZEN)
 *
 * Pre-footer CTA banner on the Consultation page above the Footer.
 *
 * FROZEN 3-VIEWPORT SPECIFICATIONS:
 * - Desktop (1440px / 1024px+):
 *   - Layout width (heading & paragraph): 617px
 *   - Vertical shift (Y-axis): -36px
 *   - Horizontal shift (X-axis): 0px
 *   - Text-to-buttons gap: 40px
 * - Tablet (768px - 1023px):
 *   - Layout width (heading & paragraph): 308px
 *   - Vertical shift (Y-axis): -15px
 *   - Horizontal shift (X-axis): 0px
 *   - Text-to-buttons gap: 40px
 * - Mobile (<768px / 425px):
 *   - Layout width (heading & paragraph): 330px
 *   - Vertical shift (Y-axis): 0px
 *   - Horizontal shift (X-axis): 0px
 *   - Text-to-buttons gap: 25px
 */
export function ConsultationCtaBanner() {
  const data: CtaBannerData = {
    ...defaultCtaBanner,
    ...consultationCtaBanner,
  };

  const headingId = "consultation-cta-heading";

  return (
    <section
      id="consultation-cta"
      aria-labelledby={headingId}
      className="relative w-full overflow-hidden bg-transparent px-[clamp(0rem,-10.355rem_+_21.577vw,9.0625rem)] py-[clamp(0rem,-2.143rem_+_4.464vw,1.875rem)]"
    >
      {/* Decorative Background Image */}
      {data.image?.src && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 z-0 -translate-x-1/2 aspect-[1264/842] top-[clamp(0.875rem,min(14.87vw_-_3.07rem,6.21rem_-_4.464vw),4.0625rem)] w-[clamp(30rem,min(30.137rem_+_58.31vw,33.13rem_+_52.08vw),80rem)]"
        >
          <Image
            fill
            alt=""
            aria-hidden="true"
            src={data.image.src}
            sizes="(min-width: 90rem) 1280px, (min-width: 48rem) 125vw, 150vw"
            className="max-w-none select-none object-contain"
          />
        </div>
      )}

      {/* Inner Frame */}
      <div className="relative mx-auto flex w-full max-w-[71.875rem] items-end justify-center px-5 pb-[clamp(1.875rem,min(0.501rem_+_7.289vw,6.429rem_-_5.06vw),4rem)] min-h-[clamp(26.8125rem,21.24rem_+_20.99vw,31.3125rem)]">
        {/* Content Wrapper: Vertically shifted (-36px desktop, -15px tablet, 0px mobile) */}
        <div className="relative z-10 flex w-full flex-col items-center text-center gap-[25px] md:gap-[40px] translate-y-0 md:-translate-y-[15px] lg:-translate-y-[36px] transition-transform duration-75">
          {/* Shared Text Group: Constrains BOTH heading and paragraph to the EXACT same width */}
          <div className="mx-auto flex w-full max-w-[330px] md:max-w-[308px] lg:max-w-[617px] flex-col items-center text-center gap-3">
            {/* Heading: Looking for Clarity? */}
            <h2
              id={headingId}
              className="w-full font-heading font-normal text-[#FFD8A2] text-center tracking-normal text-balance whitespace-pre-line leading-[1.26] text-[clamp(2.125rem,max(2.506rem_-_0.793vw,0.63rem_+_3.115vw),3.433rem)]"
            >
              {data.heading}
            </h2>

            {/* Paragraph: Your Answers May Be One Conversation Away Start Here */}
            <p className="w-full font-lato font-medium text-[#ECECEC] text-center tracking-[0.01em] leading-[1.3875] text-[1rem]">
              {data.description.map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>

          {/* Button Row: Automatically positioned relative to text block */}
          <div className="flex w-full max-w-[25.8125rem] min-[34rem]:max-w-none flex-wrap min-[34rem]:flex-nowrap items-center justify-center gap-[17px]">
            {data.primaryButton && (
              <CtaBannerButton
                href={data.primaryButton.href}
                label={data.primaryButton.label}
                variant={data.primaryButton.variant ?? "primary"}
                className="w-full max-w-[16.25rem] min-[34rem]:w-auto"
              />
            )}
            {data.secondaryButton && (
              <CtaBannerButton
                href={data.secondaryButton.href}
                label={data.secondaryButton.label}
                variant={data.secondaryButton.variant ?? "secondary"}
                className="w-full max-w-[16.25rem] min-[34rem]:w-auto"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
