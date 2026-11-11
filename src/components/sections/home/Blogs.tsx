import { Container, Section } from "@/components/layout";
import { ArrowCircle, BlogCard, SectionHeading } from "@/components/shared";
import { Button } from "@/components/ui";
import { blogsContent } from "@/data/home";

// Figma desktop (measured): frame 1440 x 744.42, padding 60 top and bottom, content 1260 wide. Heading block 959 x 145.42:
// ornament 362 x 34.42, gap 25 to the title (43.95/48 Accent), gap 15, subtitle Lato 500 18/22.6 (Body Large) in Light.
// Heading to cards 54. Cards 374 x 425 in one row, gap 70 (3 x 374 + 2 x 70 = 1262, the row is 1260, so the cards are flexible).
// 60 + 145.42 + 54 + 425 + 60 = 744.42.
// Phone and tablet have NO Figma frame. They follow the Courses section: a snap-scrolling row of cards that runs to the screen
// edge (first card on the section edge: 20 phone, 60 tablet), three flexible cards from lg (1024), gap 40, gap 70 from xl.
// The tablet starts at 768 (md). Padding 25 / 40 / 60 and the ornament widths 162 / 262 / 362 are copied from Testimonials.
// "View All Blogs" is not in the Figma desktop frame: it is added below the cards (to /blog), so the section is taller than 744.42.
// The ornament to title gap is 25 everywhere: SectionHeading gives 15, so +10 (at xl +11.66, the Figma ornament frame is 1.66
// taller than the exported SVG).
// TODO(figma): tablet and phone frames (padding, heading gaps, card width and gap, button) and the "View All Blogs" button.
// TODO(client): the posts come from WordPress later; keep the data in src/data/home.ts shaped like a post list.
const styles = {
  section: "py-6.25 md:py-10 xl:py-15",
  container: "relative px-5 md:px-15 lg:px-10",
  // Heading to cards: 30 phone, 40 tablet (14 / 24 plus the 16 of rail padding above the cards), 40 lg, 54 xl (measured).
  content: "mx-auto flex w-full max-w-315 flex-col gap-3.5 md:gap-6 lg:gap-10 xl:gap-13.5",
  ornament: "mb-2.5 w-40.5 md:w-65.5 xl:mb-[11.66px] xl:w-90.5",
  // Cards to button: 40 (12 plus the 28 of rail padding below the cards, 40 from lg).
  cards: "flex flex-col gap-3 lg:gap-10",
  // Phone and tablet: scroll row (16 above and 28 below the cards for the shadow). From lg: three flexible cards.
  rail: "-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-7.5 overflow-x-auto px-5 pt-4 pb-7 [scrollbar-width:thin] [scrollbar-color:var(--color-card-border)_transparent] pointer-coarse:[scrollbar-width:none] md:-mx-15 md:scroll-px-15 md:px-15 lg:mx-0 lg:snap-none lg:gap-10 lg:overflow-visible lg:p-0 xl:gap-17.5",
  item: "flex w-66 shrink-0 snap-start lg:w-auto lg:max-w-93.5 lg:min-w-0 lg:flex-1 lg:basis-0",
  cta: "flex justify-center",
  // Same button as Courses: 40 tall, full width on phone, 48 tall on desktop.
  button: "h-10 w-full min-w-49 py-0 text-sm shadow-none tab:w-auto xl:h-12 xl:text-base",
} as const;

export function Blogs() {
  const { title, subtitle, readMoreLabel, cta, posts } = blogsContent;

  return (
    <Section
      container={false}
      spacing="none"
      aria-labelledby="blogs-heading"
      className={styles.section}
    >
      <Container padding="page" className={styles.container}>
        <div className={styles.content}>
          <SectionHeading
            titleId="blogs-heading"
            title={title}
            subtitle={subtitle}
            titleSize="section"
            subtitleSize="largeXl"
            ornamentClassName={styles.ornament}
          />

          <div className={styles.cards}>
            <ul className={styles.rail}>
              {posts.map((post) => (
                <li key={post.slug} className={styles.item}>
                  <BlogCard
                    title={post.title}
                    excerpt={post.excerpt}
                    image={post.image}
                    href={`/blog/${post.slug}`}
                    readMoreLabel={readMoreLabel}
                    className="w-full"
                  />
                </li>
              ))}
            </ul>

            <div className={styles.cta}>
              <Button
                href={cta.href}
                variant="accent"
                size="hero"
                iconRight={<ArrowCircle />}
                className={styles.button}
              >
                {cta.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
