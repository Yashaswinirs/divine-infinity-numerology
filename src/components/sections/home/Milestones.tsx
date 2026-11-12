import Image from "next/image";
import { Section } from "@/components/layout";
import { SectionHeading, StatCard } from "@/components/shared";
import { milestonesContent } from "@/data/home";

// Figma desktop (measured): frame 1152 x 658.75. Heading frame 262 wide at top 45. Cards 263 wide at left 0 /
// right 0, top 89 and 435. Ouroboros 1066 x 658.75 at 75% opacity.
// Tablet (600-1023): frame 531 tall, cards 202 x 96 at the corners, ouroboros 432 wide (aspect kept) between the
// card rows. Laptop step (1024-1279): frame 588 tall, ouroboros 648 wide, still clear of the cards.
// Phone (below 600): single column, ouroboros below.
const styles = {
  section: "pt-7.5 pb-7.5 tab:py-10 xl:pt-0",
  frame:
    "relative mx-auto flex w-full flex-col items-center tab:block tab:h-132.75 lg:h-147 xl:h-[658.75px] xl:max-w-288",
  heading: "gap-4 p-2.5 tab:absolute tab:inset-x-0 tab:top-3 tab:z-10 xl:top-11.25",
  stats:
    "mt-5 flex w-full flex-col items-center gap-5 tab:absolute tab:inset-x-0.5 tab:top-34.5 tab:z-10 tab:mt-0 tab:grid tab:h-91.25 tab:grid-cols-[repeat(2,12.625rem)] tab:content-between tab:justify-between tab:gap-0 lg:h-105.5 xl:inset-x-0 xl:top-22.25 xl:h-112.25 xl:grid-cols-[repeat(2,16.4375rem)]",
  ouroboros:
    "pointer-events-none relative mt-10 aspect-648/400 w-full opacity-75 tab:absolute tab:top-46.75 tab:left-1/2 tab:z-0 tab:mt-0 tab:w-[min(100%,27rem)] tab:-translate-x-1/2 lg:top-37.25 lg:w-[min(100%,40.5rem)] xl:top-0 xl:aspect-auto xl:h-[658.75px] xl:w-266.5",
} as const;

export function Milestones() {
  const { title, stats, ouroboros } = milestonesContent;

  return (
    <Section
      spacing="none"
      containerPadding="page"
      aria-labelledby="milestones-heading"
      className={styles.section}
    >
      <div className={styles.frame}>
        <SectionHeading
          titleId="milestones-heading"
          title={title}
          titleSize="sectionTab"
          ornamentTone="gold"
          className={styles.heading}
        />

        <ul className={styles.stats}>
          {stats.map((stat) => (
            <StatCard key={stat.label} as="li" {...stat} />
          ))}
        </ul>

        <div aria-hidden="true" className={styles.ouroboros}>
          <Image
            src={ouroboros.src}
            alt=""
            fill
            sizes="(min-width: 1280px) 1066px, (min-width: 1024px) 648px, (min-width: 600px) 432px, 385px"
            className="object-fill"
          />
        </div>
      </div>
    </Section>
  );
}
