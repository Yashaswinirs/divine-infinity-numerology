# PROGRESS (update after every finished section)

Last updated: 11 Nov 2026

## Status (Home page)

| Item                                  | Status                          |
| ------------------------------------- | ------------------------------- |
| Navbar (desktop, tablet, mobile menu) | Done                            |
| 1 Hero                                | Done                            |
| 2 Proudly Featured                    | Done                            |
| 3 About Teejaswini                    | Done                            |
| 4 Milestones                          | Done                            |
| 5 Awards & Certifications             | Done                            |
| 6 Why Learn From Teejaswini           | Done                            |
| 7 Courses                             | Done                            |
| 8 Consultation Services               | Done                            |
| 9 Testimonials                        | Done                            |
| 10 Blogs                              | Done                            |
| 11 FAQ                                | Done                            |
| 12 CTA + Footer                       | Teammate (not in this repo yet) |

Home page: complete except section 12 (teammate) and the WhatsApp floating button (NOT built; no code for it exists in the repo).

Project is LOCAL ONLY. It is never pushed to GitHub. Commit locally only.

Page wiring (`src/app/(public)/page.tsx`): Hero, ProudlyFeatured, wrapper A (About + Milestones + StarField), Awards, wrapper B (WhyLearn + Courses + StarField), ConsultationServices, Testimonials, wrapper C (Blogs + FAQ + StarField). The Footer is a teammate's task; `(public)/layout.tsx` renders only the Navbar today.

## Section notes

- Hero: desktop measured. Tablet and mobile partly estimated (top offset, H1-to-paragraph gap, CTA widths and height, eyebrow size, Om timing, fade strip).
- Proudly Featured: about 95% match to Figma by screenshot comparison (the other 5%: unknown). Marquee speed estimated.
- About (3): match unknown. Portrait alt is a placeholder. Arch inner inset, dot size and dot positions measured from screenshots (Ellipse 3, Ellipse 4, Frame 32 panels not received).
- Milestones (4): match unknown. Connector lines not rendered (Figma "Group 8" export missing). Count-up 2000ms ease-out assumed. Phone stat card 245 x 96 and phone number size estimated.
- Awards (5): match unknown. Mobile card panels and desktop row 2 card/image sizes not measured. Tablet side padding 53 estimated. Star background is desktop only.
- Why Learn (6): from the code: desktop measured; tablet and phone section padding, heading gaps and the phone title-to-subtitle gap estimated (TODO(figma)).
- Courses (7): from the code: tablet and phone panels (section padding, heading gaps, card, button) not received; desktop 897 total and 167.42 / 522 / 610 frames measured, the 50 / 30 / 40 split read from the canvas.
- Consultation (8): phone bottom padding, tablet card gap (about 30, +-3, read from the canvas) and the 1024 layout not confirmed; all five buttons go to /consultation (TODO(client)).
- Testimonials (9): tablet and phone panels not received (tablet card about 327 tall and phone about 343 read or estimated); slide timing 500ms ease-in-out assumed; active dot width 24 estimated; desktop subtitle copy used.
- Blogs (10): desktop measured (1440 x 744.42, padding 60 top/bottom, content 1260 wide, three 374 x 425 cards gap 70). Phone and tablet have NO Figma frame; they follow the Courses scroll-row pattern (snap-x, first card on section edge 20 phone / 60 tablet, three flexible cards from lg gap 40 / 70 from xl). Ornament widths 162 / 262 / 362; padding 25 / 40 / 60 copied from Testimonials. "View All Blogs" button not in the Figma desktop frame; added below the cards. SectionHeading uses `subtitleSize="largeXl"` (Body small below xl, Body Large 18/22.6 from xl). Ornament uses the default cream tone. Blog card images exist in public/.
- FAQ (11): desktop measured (1440 x 841.42, padding 60 top/bottom, content 816 wide, 5 accordion cards 816 x 74 closed, gap 35). Tablet (768 x 678, padding 40/60, content 648, list gap 25). Phone (425 x 655.91, padding 25/20, content 385, title on two lines, heading block 105.91, gap 25). Ornament to title gap: 25 phone/tablet (SectionHeading 15 + 10), 69 desktop (15 + 54px). The ornament uses `ornamentTone="gold"` (gold section ornament SVG). Title to list: 30 phone / 54 tablet / 60 desktop. Shares wrapper C's StarField with Blogs.

## Section behavior (10 Blogs)

- Blogs (10): `container={false} spacing="none"`, classes `py-6.25 md:py-10 xl:py-15`. Container `relative px-5 md:px-15 lg:px-10`. Content `max-w-315` (1260), gap 14 / 24 / 40 / 54 (phone / md / lg / xl). SectionHeading `titleSize="section"` `subtitleSize="largeXl"` ornament `mb-2.5 w-40.5 md:w-65.5 xl:mb-[11.66px] xl:w-90.5`. Three BlogCards in a `<ul>`: phone and md scroll row (snap-x mandatory, `-mx-5` / `-mx-15` bleed, `scrollbar-width:thin` with `card-border` track colour, hidden on `pointer-coarse`), card `w-66` (264) every width, gap 30. From lg: no scroll, three flexible cards (max 374, gap 40, gap 70 from xl). Card item `w-66 shrink-0 snap-start lg:w-auto lg:max-w-93.5 lg:flex-1 lg:basis-0`. "View All Blogs" Button (accent, hero size, ArrowCircle): full width h-40 phone, auto width (min 196) from tab, h-48 and 16px text from xl. Static server component.

## Section behavior (11 FAQ)

- FAQ (11): `container={false} spacing="none"`, classes `py-6.25 md:py-10 xl:py-15`. Container `relative px-5 md:px-15`. Content `max-w-204` (816), gap 30 / 54 / 60 (phone / md / xl). SectionHeading `titleSize="section"` `ornamentTone="gold"` ornament `w-65.5 xl:mb-[54px] xl:w-90.5`. FaqAccordion is a `"use client"` component: `<ul>` of `<li>` cards, each with an h3 > button trigger and a region panel. All items closed at first; clicking toggles one item; multiple items can be open at once. Answer panel animates `grid-template-rows` 0fr→1fr and `opacity` 0→1, 300ms ease-in-out, no transition for `prefers-reduced-motion`. Toggle glyph is a CSS plus/minus built from two `<span>` bars (18 x 3) with rotate and opacity transition. Card: rounded-3xl, 0.5px secondary border, `bg-card-gradient`. Question: `type-faq-question` (H5 M 17.3/25 phone, H5 T 19.08/23.3 from md, H5 22.5/30.7 from xl), `font-heading`, secondary colour, numbered "1. ...". Toggle: 50 x 50 accent bg, radius 10, glyph colour raw `#1D1B4D`. Answer: `type-body-small` (16/22.2), `text-light`, `font-medium`, `whitespace-pre-line`. Focus: `has-focus-visible:ring-2 has-focus-visible:ring-accent` on the card, `focus-visible:outline-hidden` on the trigger. Panel is `inert` when closed. `aria-expanded`, `aria-controls`, `aria-labelledby`, `role="region"`. Static section wrapper; FaqAccordion is the only client component.

## New components in sections 10 and 11

- BlogCard (`shared/BlogCard.tsx`, exported from `shared/index.ts`): title, excerpt, image {src, alt}, href, readMoreLabel? ("Read More"), className. `<article>` with Image (fill, `aspect-240/151` below xl, `aspect-332/186` at xl), Heading h3 `cardTitle` Accent, Text `body-sm` medium Secondary, full-width accent Button with ArrowCircle and a `<span className="sr-only">: {title}</span>` for context. Card: `bg-card-gradient`, `border-card-border`, `shadow-card`, rounded-3xl. Padding 11/10/16/10 below xl, 20 at xl. Min-h 425 at xl. Exports BlogCardProps.
- FaqAccordion (`shared/FaqAccordion.tsx`, exported from `shared/index.ts`): items (readonly FaqItem[]), className. Client component. Exports FaqItem {question, answer} and FaqAccordionProps. Uses `useId` for unique aria IDs and `useState<ReadonlySet<number>>` for open items.

## Changes to existing components

- SectionHeading: `subtitleSize` expanded from `"small" | "large"` to `"small" | "large" | "largeXl"`. `"largeXl"` renders `type-body-small xl:text-lg xl:leading-[22.6px] xl:tracking-normal` (Body small below xl, Body Large from xl). New prop `ornamentTone?: "light" | "gold"` (default "light"), passed to Ornament.
- Ornament: new prop `tone?: "light" | "gold"` (default "light"). When `variant="section"` and `tone="gold"`, uses `siteConfig.decor.sectionOrnamentGold` (`/icons/section-ornament-gold.svg`, 362 x 34.42).
- siteConfig (site.ts): added `decor.sectionOrnamentGold: { src: "/icons/section-ornament-gold.svg", width: 362, height: 34.42 }`.

## New tokens and utilities in globals.css

- `type-faq-question`: Lovelace Text 400, phone 17.3/25 (H5 M), md 19.08/23.3 (H5 T), xl 22.5/30.7 (H5). Breakpoints: md and xl.
- SectionHeading `subtitleSize="largeXl"` is implemented with inline classes, not a new utility.

## New data keys in src/data/home.ts

- `blogsContent`: title, subtitle, readMoreLabel, cta {label, href}, posts[] {slug, title, excerpt, image {src, alt}}. Types: uses `BlogCardProps` from shared. Satisfies `(Pick<BlogCardProps, "title" | "excerpt" | "image"> & { slug: string })[]`.
- `faqContent`: title, items[] {question, answer}. Type `FaqItem` imported from shared.

## Barrel updates

- `sections/home/index.ts`: exports 11 (added Blogs, Faq). HeroEyebrow, HeroVideo and TestimonialsCarousel are still not exported.
- `shared/index.ts`: exports 17 components (added BlogCard + BlogCardProps, FaqAccordion + FaqAccordionProps + FaqItem).

## Decisions

### Layout and spacing

- Spacing uses the Tailwind v4 numeric scale = Figma px / 4. Arbitrary values only when no scale value exists, with a comment saying why.
- Page background: `bg-page-gradient` on `<body>`, `bg-page-flow` on `<main>`. Bands at `--glow-1` to `--glow-6` (desktop px). TODO(figma), estimated from screenshots, desktop only.
- Container `padding="page"` = px-5 md:px-15 xl:px-20. Default max width 1440px.
- Hero is full-bleed. Sections 6–11 use `container={false} spacing="none"` with their own Container.
- Star fields: wrapper A (About + Milestones), wrapper B (WhyLearn + Courses), wrapper C (Blogs + FAQ) each have ONE `<StarField />`. Awards, ConsultationServices and Testimonials render their own.

### Breakpoints

- Defined in globals.css: `2xl` 1440px, `tab` 600px. Tailwind v4 defaults assumed: sm 640, md 768, lg 1024, xl 1280.
- Blogs (10): md, lg, xl (no tab). The scroll row lasts below lg; three flexible cards from lg.
- FAQ (11): md, xl. Content max 816. Ornament only switches at xl (the `w-65.5` is the same on phone and tablet).
- `type-faq-question`: md and xl.
- INCONSISTENCY: Testimonials lays out at md but its title switches at tab. Blogs uses md for its tablet padding. FAQ uses md. This is consistent with the Testimonials pattern (md-based sections). Decision still open (see Open TODOs).

### Tokens in src/styles/globals.css

Additions for sections 10 and 11: `type-faq-question`. The gold ornament SVG is referenced through siteConfig, not a new CSS token.

### Components

shared/ exports 17 components (was 15). New: BlogCard, FaqAccordion. See "New components" above.

sections/home/ index.ts exports 11 (was 9). New: Blogs (blogsContent), Faq (faqContent). Both take no props.

### Asset paths

New for Blogs: `/images/home/blogs/blog-birth-chart-career.webp`, `blog-life-path-number.webp`, `blog-manifestation-habits.webp` (all exist in public/).

New for FAQ: `/icons/section-ornament-gold.svg` (exists in public/).

### Stack facts from the code

Unchanged from sections 1–9.

## Gotchas

- Run `pnpm typecheck` after every section, not only `pnpm lint`.
- Image checks: run `file` on every exported image (1x1 PNG = placeholder). After replacing an image, stop the dev server, delete `.next`, restart.
- Every path in `src/data/*.ts` must exist in `public/`. All referenced assets now exist (unused references to missing `connectors.svg` and `star.svg` removed). Blog images now exist.
- Comments drifted from classes in sections 6 to 8. The classes are what runs; the comments are not trustworthy.
- Testimonials mixes md and tab. Awards switches to 2 columns at sm (640).
- Inline styles exist: carousel `transform`, StarField sizes, LogoMarquee `--logo-w` (all dynamic values).
- Raw colours without a token: `text-black` (CarouselControls caret), `bg-black/60` (HeroVideo overlay), `#1D1B4D` (FaqAccordion toggle glyph bars). Heading, Text and Icon colour variants still use old hex.
- Lato 600 italic and 800 are not loaded (fonts.ts has 400 / 500 / 700): the browser draws testimonial quotes as synthetic italic and the title at 700.
- `SectionHeading` `subtitleSize="large"` is still unused (Consultation and Testimonials repeat Body Large by hand). `"largeXl"` is used by Blogs.
- `text-box-trim` needs Chrome 133+ / Safari 18.2+; elsewhere the boxes are taller.
- Unverified risk: tailwind-merge may not know custom utilities (text-h1 to text-h5, type-*).
- `StarField` forces 1962 x 995 on any src; only 2 copies, so a very tall wrapper (phone) can run out of stars.
- Button in link mode only passes href, target, rel, className. `siteConfig.login.href` uses `??`: an empty NEXT_PUBLIC_LMS_URL makes Button render a plain `<button>`.
- Spelling: file `AboutTeejaswinni.tsx` and copy in data use "Teejaswinni"; the rest says "Teejaswini".
- Lovelace Text is not loaded; Libre Baskerville is the stand-in.
- AGENTS.md: this Next.js version has breaking changes; read `node_modules/next/dist/docs/`.
- A teammate is building section 12. They will touch `(public)/layout.tsx` and probably shared files; merge against the current files.

## Open TODOs

- Decide one tablet breakpoint for Home (tab 600 vs md 768) and align Testimonials, Awards, Hero, ProudlyFeatured. Fix the stale comments in WhyLearn, Courses, ConsultationServices.
- Figma panels not received for tablet and phone: WhyLearn, Courses, Consultation, Testimonials (section padding, heading gaps, card, button). Confirm Courses card width (264 vs 290) and gaps (37 vs 38 / 20).
- Confirm Consultation: phone bottom padding, tablet card gap (about 30), the 1024 layout, and the card title size from 1280 to 1439 (24/30 vs 28.13/35).
- Blogs: no Figma tablet or phone frame. Padding, heading gaps, card width and gap, and the "View All Blogs" button are estimated from the Courses pattern. TODO(figma).
- FAQ: the tablet list gap reads 24 in the Figma panel but the 470 total means 25; the tablet title-to-list gap is derived, not measured. Answers 2–5 are Figma placeholder text; send the real answers. TODO(client). Open-state bottom padding (24), toggle radius (10) and glyph colour are from a prototype screenshot, not from a properties panel.
- TODO(client): course slugs for /courses/[slug]; where each "Book a Consultation" button goes; customers' permission for name, photo and quote; "Voices of Transformation" capitalisation; blog slugs for /blog/[slug] (posts come from WordPress later).
- TODO(figma): placeholder alt texts (About portrait, awards, courses, consultation, testimonials, blogs); hover and pressed states of CourseCard, BlogCard, CarouselControls and FaqAccordion; carousel slide timing (500ms assumed) and active dot width (24); Lato 600 italic / 800 weights.
- Verify `--color-dark` (#413f85) and update its stale TODO comment; align the raw #1e1633 uses. Replace `text-black`, `bg-black/60`, and `#1D1B4D` (FAQ glyph) with tokens.
- Awards: measure mobile card panels, desktop row 2 card/image sizes, tablet padding (53 estimated) and the tablet header gap (40 vs 36). Confirm CountUp duration (2000ms ease-out assumed). Confirm "Rudraksha Studying".
- ArchPortrait: Ellipse 3, Ellipse 4 and Frame 32 panels not received. Confirm marquee duration (9s below xl, 15.5s at xl).
- Page background: confirm `bg-page-flow` angle (172deg) and glow positions, add values below 4350px, tablet and phone; check the Hero fade-strip seam.
- Hero: verify the fade strip on tablet/mobile, estimated values and Om animation timing. ProudlyFeatured: find the remaining ~5% difference; confirm per-logo sizes.
- Build the WhatsApp floating button (number, link, position unknown). Section 12 CTA + Footer: teammate.
- Decide "Teejaswini" vs "Teejaswinni" in file names, data and docs. Decide whether to use `useScrolled` in the Navbar or remove it.
- Fonts: supply Lovelace Text files, load with next/font/local, drop Libre Baskerville.
- globals.css: card gradient angle and stops; Territory, Dark, Text, Card color, Cards, Light Bg tokens; replace `bg-hero-gradient`.
- ui primitives: radius, colors, sizes, paddings, hover/active states, font bindings are TODO(figma).
- TODO(client): confirm planned routes in navigation.ts; confirm the LMS login path in site.ts.
- Regenerate the TODO list from the code when needed: `grep -rn "TODO(" src`.