import Image from "next/image";
import { Button } from "@/components/ui";
import { cn } from "@/lib";

export interface ConsultationPlanCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  feeLabel: string;
  fee: string;
  features: readonly string[];
  /** Last row after the features, small text (Figma "+7 More", plain text, not a link). */
  moreLabel?: string;
  /** Check icon (24 x 24) in front of every feature. */
  featureIcon: string;
  image: { src: string; alt: string };
  cta: { label: string; href: string };
  className?: string;
}

// Figma "Component 8 / 38 / 39". Padding 30, gap 24, radius 12, 1px Accent 25% border, gradient #1D1B4D to #512B58.
// Heights: 482 desktop, 475 tablet, 453 phone (min-height). Content stacks from the top, the button is pinned to the bottom
// (Figma space-between). Frame 125 = avatar 60 + gap 16 + Frame 120 (title, gap 8, description).
// Description box: 3 lines (67) on phone and desktop (xl), 4 lines (89) from 600 to 1279 (measured on the tablet frame).
// Title and fee: Figma H5 (17.3/25 phone, 19.08/23.3 tablet, both cap-trimmed; 22.5/30.7 from xl).
// Desktop button is 2px wider than the content and sits 23px from the card bottom (xl:pb-5.75), both copied from Figma.
// TODO(figma): fee colour (Accent assumed) and "+7 More" style (14px medium, Accent assumed) are not from a panel.
// Hover (prototype screenshot): border Accent 100% and a soft Accent glow, the fill stays. TODO(figma): values estimated, no hover panel.
const styles = {
  card: "bg-card-gradient border-accent/25 hover:border-accent hover:shadow-accent-glow flex min-h-113.25 w-full flex-col gap-6 rounded-xl border p-7.5 transition-[border-color,box-shadow] duration-300 ease-out motion-reduce:transition-none tab:min-h-118.75 lg:min-h-120.5 xl:pb-5.75",
  top: "flex flex-col gap-4",
  header: "flex items-start justify-between",
  avatar: "size-15 shrink-0 rounded-full object-cover",
  avatarSpacer: "size-15 shrink-0",
  chip: "bg-secondary/15 text-accent shrink-0 rounded-md px-3 py-1 text-sm leading-4.7 font-bold whitespace-nowrap",
  copy: "flex flex-col gap-2",
  title: "type-plan-title text-accent",
  description: "type-body-small text-light min-h-16.75 font-medium tab:min-h-22.25 xl:min-h-16.75",
  fee: "type-plan-title text-accent",
  features: "flex flex-col gap-3",
  feature: "flex min-h-6 items-center gap-3",
  featureText: "type-body-small text-light font-medium",
  more: "text-accent flex min-h-6 items-center text-sm leading-4.7 font-medium",
  button: "mt-auto h-12 w-full shadow-none xl:w-[calc(100%+0.125rem)]",
} as const;

export function ConsultationPlanCard({
  id,
  title,
  description,
  duration,
  feeLabel,
  fee,
  features,
  moreLabel,
  featureIcon,
  image,
  cta,
  className,
}: ConsultationPlanCardProps) {
  const titleId = `consultation-plan-${id}`;

  return (
    <article aria-labelledby={titleId} className={cn(styles.card, className)}>
      <div className={styles.top}>
        <div className={styles.header}>
          {image?.src ? (
            <Image
              src={image.src}
              alt={image.alt ?? ""}
              width={60}
              height={60}
              sizes="60px"
              className={styles.avatar}
            />
          ) : (
            <span aria-hidden="true" className={styles.avatarSpacer} />
          )}
          <span className={styles.chip}>{duration}</span>
        </div>
        <div className={styles.copy}>
          <h3 id={titleId} className={styles.title}>
            {title}
          </h3>
          <p className={styles.description}>{description}</p>
        </div>
      </div>

      <p className={styles.fee}>
        {feeLabel} {fee}
      </p>

      <ul className={styles.features}>
        {features.map((feature) => (
          <li key={feature} className={styles.feature}>
            <Image
              src={featureIcon}
              alt=""
              width={24}
              height={24}
              aria-hidden="true"
              className="size-6 shrink-0"
            />
            <span className={styles.featureText}>{feature}</span>
          </li>
        ))}
        {moreLabel && <li className={styles.more}>{moreLabel}</li>}
      </ul>

      <Button href={cta.href} variant="accent" size="hero" className={styles.button}>
        {cta.label}
      </Button>
    </article>
  );
}
