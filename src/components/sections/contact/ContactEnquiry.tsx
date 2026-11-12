import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { StarField } from "@/components/shared";
import { Heading, Text } from "@/components/ui";
import { contactEnquiryContent } from "@/data/contact";
import { EnquiryForm } from "./EnquiryForm";

// Icons live in public/icons (phone.svg, mail.svg, location.svg, contact-divider-star.svg).
const itemIcons = {
  phone: "/icons/phone.svg",
  email: "/icons/mail.svg",
  address: "/icons/location.svg",
} as const;

// Figma desktop "Contact Us" section (1440 x 721, measured): padding 55 top and bottom, ornament 362 x 34.42, gap 60,
// content row 1280 wide at left 80: left column 530 | divider 32 | right column 638, gap 40.
// Left column: heading block (502 wide, 14 inset, gap 25), gap 41, three rows (padding 24 / 10, gap 24,
// 0.5px Accent border at the bottom, icon circle 66 at #FFF0DB 10%, label Lato 700 22.5, value Lato 500 18).
// Right column: header 571 wide (gap 20), gap 37, fields, gap 37, button.
// Divider: 32 x 448 (contact-divider-star.svg). The WhatsApp button is the fixed one rendered by the page.
// Below lg (estimated from the canvas, TODO(figma): panels not received): one column, no intro texts, second ornament
// and the title "Consultation Enquiry Form", horizontal star divider.
const styles = {
  section: "relative overflow-hidden",
  stars: "pointer-events-none absolute inset-0",
  container:
    "relative flex flex-col items-center gap-5.5 px-5 pt-12.5 pb-12.5 lg:gap-15 lg:px-20 lg:pt-13.75 lg:pb-13.75",
  ornament: "h-auto w-51.25 lg:w-90.5",
  row: "flex w-full flex-col items-center gap-11 tab:gap-7.5 lg:grid lg:grid-cols-[minmax(0,530fr)_2rem_minmax(0,638fr)] lg:items-start lg:gap-x-10",
  info: "flex w-full max-w-135 flex-col gap-3 lg:max-w-none lg:gap-10.25",
  infoHeader:
    "flex flex-col items-center gap-6.25 text-center lg:items-start lg:px-3.5 lg:text-left",
  list: "flex flex-col px-3.5 tab:px-0",
  item: "flex items-center gap-5.5 border-b-[0.5px] border-accent px-0 py-6 max-lg:last:border-b-0 tab:px-9.5 lg:gap-6 lg:px-2.5",
  iconCircle: "size-12 shrink-0 tab:size-14 lg:size-16.5",
  icon: "size-full",
  itemText: "flex min-w-0 flex-col gap-2",
  label:
    "text-[17.3px] leading-[25px] font-bold text-accent tab:text-[19.08px] tab:leading-[23.3px] lg:text-[22.5px] lg:leading-[30.7px]",
  value:
    "text-sm leading-snug font-medium text-secondary tab:text-base lg:text-lg lg:leading-[22.6px]",
  formColumn: "flex w-full max-w-115.75 flex-col gap-9.25 lg:max-w-none",
  formHeader:
    "flex flex-col items-center gap-5.5 text-center lg:max-w-142.75 lg:items-start lg:gap-5 lg:text-left",
} as const;

function SectionOrnament({ className }: { className?: string }) {
  return (
    <Image
      src="/icons/section-ornament-gold.svg"
      alt=""
      width={362}
      height={34}
      className={className}
    />
  );
}

export function ContactEnquiry() {
  const { info, form } = contactEnquiryContent;

  return (
    <Section
      container={false}
      spacing="none"
      aria-labelledby="contact-info-heading"
      className={styles.section}
    >
      <div aria-hidden="true" className={styles.stars}>
        <StarField />
      </div>

      <Container padding="none" className={styles.container}>
        <SectionOrnament className={styles.ornament} />

        <div className={styles.row}>
          <div className={styles.info}>
            <div className={styles.infoHeader}>
              <Heading
                as="h2"
                id="contact-info-heading"
                size="contactTitle"
                font="heading"
                className="text-accent text-center lg:text-left"
              >
                {info.title}
              </Heading>
              <Text weight="medium" className="type-body-small text-light hidden lg:block">
                {info.intro}
              </Text>
            </div>

            <ul className={styles.list}>
              {info.items.map((item) => (
                <li key={item.id} className={styles.item}>
                  <span className={styles.iconCircle}>
                    <Image
                      src={itemIcons[item.id]}
                      alt=""
                      width={66}
                      height={66}
                      className={styles.icon}
                    />
                  </span>
                  <div className={styles.itemText}>
                    <span className={styles.label}>{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className={`${styles.value} hover:underline`}>
                        {item.value}
                      </a>
                    ) : (
                      <span className={styles.value}>{item.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div
            aria-hidden="true"
            className="tab:mb-7.5 mb-4 w-full max-w-109.25 lg:mb-0 lg:w-8 lg:max-w-none"
          >
            <div className="text-accent flex items-center gap-3 lg:hidden">
              <span className="bg-accent h-px flex-1" />
              <span className="size-5.5 shrink-0 bg-[url('/icons/contact-divider-star.svg')] bg-[length:22px_308px] bg-center bg-no-repeat" />

              <span className="bg-accent h-px flex-1" />
            </div>
            <Image
              src="/icons/contact-divider-star.svg"
              alt=""
              width={32}
              height={448}
              className="hidden h-112 w-8 lg:block"
            />
          </div>

          <div className={styles.formColumn}>
            <div className={styles.formHeader}>
              <SectionOrnament className={`${styles.ornament} lg:hidden`} />
              <Heading
                as="h2"
                id="contact-form-heading"
                size="contactTitle"
                font="heading"
                className="text-accent text-center lg:text-left"
              >
                <span className="lg:hidden">{form.compactTitle}</span>
                <span className="hidden lg:inline">{form.title}</span>
              </Heading>
              <Text weight="medium" className="type-body-small text-light hidden lg:block">
                {form.intro}
              </Text>
            </div>

            <EnquiryForm
              labelledBy="contact-form-heading"
              interestOptions={form.interestOptions}
              labels={form.labels}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
