import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CourseCard, Ornament } from "@/components/shared";
import { Heading } from "@/components/ui";
import { coursesPathsContent } from "@/data/courses";

// Figma Courses Section 2, "Choose the Path That's Right for You" (desktop Frame 279, "Courses Tab" Frame 394, "Courses Mobile" Frame 394).
// Breakpoints (same as Consultation Section 2): phone below 600, tablet from tab (600), laptop from lg (1024), Figma desktop from xl (1280).
// Desktop (1440 x 1294, measured): padding 60 / 80, content 1280, gap 60 between the heading and the cards. Heading: ornament 362 x 34.42
// (gold), gap 40, title 43.95/48 on one line. Cards: grid 1262 wide (centered in the 1280), three 374 x 460 cards, gap 70 both ways.
// Tablet (768 x 1632.91 in Figma, measured): padding 40 / 60, content 648, gap 40, ornament 262 x 24.91, gap 25, title 35/40, two columns of
// 312 wide cards, gap 24. Phone (425, measured): padding 25 / 20, content 385, gap 30 (derived: 2665.91 - 25 - 25 - 221.91 - 2364), ornament 262,
// gap 25, title 30.43/35 (two lines), one column of 385 x 374 cards, gap 24.
// The Figma tablet and phone frames still carry the Consultation heading and a paragraph (stale copy). The desktop copy is used and the
// paragraph is not built (it is also a hidden layer in the desktop frame), so the tablet and phone heights are 82.9 (tablet) and 116 (phone)
// shorter than the Figma frames. From lg the cards are three flexible columns (no Figma frame at 1024 to 1279: tablet card interior, gap 40);
// from xl gap 70 and the 460 card height.
// id="courses" is the target of the hero button "Explore Courses". scroll-mt clears the fixed navbar (80 below lg, 60 from lg, as #plans).
// Stars: the page wrapper in courses/page.tsx. Desktop min height 1294 (xl:min-h-323.5): the content is 1292.42, Figma keeps 1294.
// TODO(figma): the phone gap between the heading and the cards (30) is derived from the frame heights, not read from a panel.
const styles = {
  section: "relative scroll-mt-20 lg:scroll-mt-15 xl:min-h-324 xl:pt-0.5",
  container:
    "mx-auto flex w-full flex-col items-center gap-7.5 px-5 py-6.25 tab:max-w-192 tab:gap-10 tab:px-[min(3.75rem,calc(1.25rem_+(100vw-37.5rem)*_0.238))] tab:py-10 lg:max-w-360 lg:gap-15 lg:px-15 lg:py-15 xl:px-20",
  heading: "flex w-full flex-col items-center gap-6.25 text-center xl:gap-10",
  ornament: "aspect-[10.517] h-auto w-65.5 xl:w-90.5",
  title: "text-accent text-balance lg:whitespace-nowrap",
  list: "grid w-full grid-cols-1 gap-6 tab:grid-cols-2 lg:grid-cols-3 lg:gap-10 xl:max-w-315.5 xl:gap-17.5",
  item: "flex",
} as const;

export function CoursesPaths() {
  const { title, enrollLabel, comingSoonLabel, courses } = coursesPathsContent;

  return (
    <Section
      container={false}
      spacing="none"
      id="courses"
      aria-labelledby="courses-paths-heading"
      className={styles.section}
    >
      <Container padding="none" className={styles.container}>
        <div className={styles.heading}>
          <Ornament variant="section" tone="gold" className={styles.ornament} />
          <Heading
            as="h2"
            id="courses-paths-heading"
            size="sectionTab"
            font="heading"
            align="center"
            className={styles.title}
          >
            {title}
          </Heading>
        </div>

        <ul role="list" className={styles.list}>
          {courses.map(({ id, comingSoon, ...course }) => (
            <li key={id} className={styles.item}>
              <CourseCard
                {...course}
                path={{ buttonLabel: enrollLabel, comingSoon, comingSoonLabel }}
                className="w-full"
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
