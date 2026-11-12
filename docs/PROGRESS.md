# PROGRESS (update after every finished section)

Last updated: 12 Nov 2026

## Status (Home page)

| Item                                  | Status                          |
| ------------------------------------- | ------------------------------- |
| Navbar (desktop, tablet, mobile menu) | Done                            |
| 1 Hero                                | Done                            |
| 2 Proudly Featured                    | Done                            |
| 3 About Teejaswinni                   | Done                            |
| 4 Milestones                          | Done                            |
| 5 Awards & Certifications             | Done                            |
| 6 Why Learn From Teejaswinni          | Done                            |
| 7 Courses                             | Done                            |
| 8 Consultation Services               | Done                            |
| 9 Testimonials                        | Done                            |
| 10 Blogs                              | Done                            |
| 11 FAQ                                | Done                            |
| 12 CTA + Footer                       | Teammate (not in this repo yet) |

Home page: complete except section 12 (teammate) and the WhatsApp floating button (built as shared/WhatsAppButton; on Contact now, being added to Home)

## Status (Contact page)

| Item                               | Status                                              |
| ---------------------------------- | --------------------------------------------------- |
| 1 Hero ("Let's Connect")           | Done                                                |
| 2 Contact info + enquiry form      | Done                                                |
| 3 Looking for Personal Insights?   | Done                                                |
| 4 Visit the Office + Find Us (map) | Done (about 97% match to Figma, 12 Nov 2026)        |
| 5 FAQ                              | Done (about 96% match to Figma, 12 Nov 2026)         |
| 6 CTA + Footer                     | Teammate (not in this repo yet)                     |

Contact route: `src/app/(public)/contact/page.tsx`. Sections 3 to 5 are built and share one `<StarField copies={6} className="[--star-scale:0.5] tab:[--star-scale:1]" />` in a wrapper in that file (see "Contact 4" and "Contact 5" below). Only the CTA slot (teammate) is left.

Project is LOCAL ONLY. It is never pushed to GitHub. Commit locally only.

Page wiring (`src/app/(public)/page.tsx`): Hero, ProudlyFeatured, wrapper A (About + Milestones + StarField), Awards, wrapper B (WhyLearn + Courses + StarField), ConsultationServices, Testimonials, wrapper C (Blogs + FAQ + StarField). The Footer is a teammate's task; `(public)/layout.tsx` renders only the Navbar today.

Page wiring (`src/app/(public)/contact/page.tsx`): ContactHero, ContactEnquiry, then one wrapper (`relative isolate overflow-hidden`) with the StarField, ContactInsights, ContactOffice and the FAQ slot, then the CTA slot (teammate) and WhatsAppButton. `<main>` carries the Contact page gradient (stops 0 / 1154 / 2307 / 3461 / 4614 px).

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
- FAQ (11): desktop measured (1440 x 841.42, padding 60 top/bottom, content 816 wide, 5 accordion cards 816 x 74 closed, gap 35). Tablet (768 x 678, padding 40/60, content 648, list gap 25). Phone (425 x 655.91, padding 25/20, content 385, title on two lines, heading block 105.91, gap 25). Ornament to title gap: 25 phone/tablet (SectionHeading 15 + 10), 69 desktop (15 + 54px). The ornament uses `ornamentTone="gold"` (gold section ornament SVG). Title to list: 30 phone / 54 tablet / 60 desktop. Shares wrapper C's StarField with Blogs. Toggle radius is 15 (was 10; changed 12 Nov 2026 from the Contact FAQ panel).

- Contact 3 (Looking for Personal Insights?): desktop, tablet and phone measured (section 1440 x 540 / 768 x 804 / 425 x 677). New shared `InsightsCta` (ornament, title, text, button, image); copy in `contactInsightsContent` (`src/data/contact.ts`); the button goes to /consultation (not built yet). Phone top padding is 82 (Figma 40 plus a 42 gap read from the canvas, estimated). Paragraph `min-h` (91 / 68 / 89) copies the Figma text box heights, which are one line taller than the text (inferred). The phone frame reads 597 high but the measured parts add up to 589.42 (7.6 unexplained). No hover state is designed. Image: `public/images/contact/insights/contact-insights.webp` (2x, 1288 x 844); the alt text is a placeholder.

- Contact 4 (Visit the Office + Find Us): DONE, about 97% match to Figma (desktop and tablet about 97%, phone about 96%).
  - Files: `sections/contact/ContactOffice.tsx`; shared `InfoCard` and `MapCard`; copy and map links in `contactOfficeContent` (`src/data/contact.ts`: title, compactTitle, intro, hours, findUsTitle, map).
  - Measured: desktop 1440 x 764 (padding 60 top and bottom, ornament 362 x 34.42, gap 69, three columns 410 | divider 32 | 640 with 84 gaps), tablet 768 and phone 425 (one column, content 648 / 385, ornament 212 x 20.16, column gap 50 / 56, horizontal star divider 438 / 378 long, padding top 50, bottom 54 tablet / 92 phone, phone frame 425 x 953).
  - Breakpoints: `tab` (600) tablet layout, `lg` (1024) three columns (410fr | 2rem | 640fr), side padding 60 from lg and 80 from xl.
  - Office Hours card: label, value, icon (40 to 60) and icon-to-text gap (16 to 24) switch to the Figma desktop sizes at xl (1280). From 1024 to 1279 it keeps the tablet sizes so the text does not wrap.
  - Map: real Google embed (Mysore pin) through `officeEmbedUrl` (the "Embed a map" src, road map `!5e0`) and `officeMapsUrl` (opens the same pin by coordinates). Google draws its own "Open in Maps" box, zoom control and logo, so it cannot be pixel-identical to Figma. Accepted.
  - Dividers: plain 1px accent lines, no fade (checked against Figma).
  - Background: ContactOffice paints no solid colour. It has one soft purple glow layer (`styles.glow`: gradient of #2a1845 at 0.7 and 0.55, transparent at top and bottom) sized in % of the section height, so it follows the section on desktop, tablet and phone and shows no seam with section 3.
  - Stars: StarField got a `copies` prop and a `--star-scale` CSS variable. The Contact wrapper passes `copies={6}` and `className="[--star-scale:0.5] tab:[--star-scale:1]"` (phone packs the 1962 x 995 star image at half size to match the 425 wide Figma phone star group; the 0.5 is estimated from the size ratio and looks right in the browser).
  - Known: the "Closed/Open based on client" line wraps to two lines at 320 and below (card still fits, left as is).

- Contact 5 (FAQ): DONE, about 96% match to Figma (desktop about 97%, tablet about 96%, phone about 95%; checked at 1440, 1334, 1280, about 1024, 768, 600, 425, 375, 320).
  - Files: `sections/contact/ContactFaq.tsx` (new); shared `FaqAccordion` (new `variant="compact"` and `FaqItem.compactQuestion`); `contactFaqContent` in `src/data/contact.ts`; new `type-faq-title` in globals.css; `contact/index.ts` and `contact/page.tsx` (section added in the shared StarField wrapper).
  - Measured: desktop 1440 x 796 (content 816 x 612.42 centred, padding 91.79 derived, ornament 362 x 34.42, gap 69, title 43.95/48, title to list 60, 4 cards 816 x 74, gap 35). Tablet 768 x 585.16 (padding 50 / 60, ornament 212 x 20.16, gap 20, title 35/40, list 345 = 4 cards 60 tall, gap 35, toggle 42, radius 12). Phone 425 x 606.16 (padding 40 / 20, gap 25, title 30.43/38 on two lines, same cards).
  - Breakpoints: md and xl, same as Home 11. Sections 3 and 4 switch at tab (600), so from 600 to 767 this section shows the phone layout.
  - The heading is built in `ContactFaq` (the shared gold ornament file, not `SectionHeading`) because the ornament width (212), the three gaps (25 / 20 / 69) and the uncut title differ from Home.
  - `FaqAccordion` compact variant: below xl the card is 60 tall (padding 9 plus a 42 row), radius 12, toggle 42, gap 35, wrapped questions indented 24 (`-my-1 pl-6 -indent-6`); from xl it is the same as the default card. The toggle glyph bars are now sized in % of the toggle (36% x 6%, the same 18 x 3 at 50). Toggle radius is 15 for every variant.
  - Question 1 reads "How can a consultation be booked?" on desktop and "How can i book a consultation?" on tablet and phone (`compactQuestion`, shown below xl).
  - Answers are the Figma prototype placeholder (the same text on all four cards).
  - Stars: no change needed, `copies={6}` covers the section on every size.

## Contact page notes

- Contact data lives in `src/data/contact.ts` (exports contactMetadata, contactHeroContent, contactEnquiryContent, contactInsightsContent, contactOfficeContent). The form submits to the stub `submitEnquiry` in `src/lib/api/enquiry.ts` (TODO(api)).
- Real phone, email, address and WhatsApp number: <fill in when confirmed>. TODO(client).
- The Contact 4 map is the real Mysore pin. The Contact 2 address ("Bangalore") is still the Figma placeholder, TODO(client). Confirm the pin and the Google listing name (it reads "Diviine Infinity Numerologgy", which looks misspelled).
- The WhatsApp number lives in ONE place only: `contactEnquiryContent.whatsapp` in contact.ts.
- Contact uses the `tab` / `lg` / `xl` / `2xl` breakpoints.

## Section behavior (10 Blogs)

- Blogs (10): `container={false} spacing="none"`, classes `py-6.25 md:py-10 xl:py-15`. Container `relative px-5 md:px-15 lg:px-10`. Content `max-w-315` (1260), gap 14 / 24 / 40 / 54 (phone / md / lg / xl). SectionHeading `titleSize="section"` `subtitleSize="largeXl"` ornament `mb-2.5 w-40.5 md:w-65.5 xl:mb-[11.66px] xl:w-90.5`. Three BlogCards in a `<ul>`: phone and md scroll row (snap-x mandatory, `-mx-5` / `-mx-15` bleed, `scrollbar-width:thin` with `card-border` track colour, hidden on `pointer-coarse`), card `w-66` (264) every width, gap 30. From lg: no scroll, three flexible cards (max 374, gap 40, gap 70 from xl). Card item `w-66 shrink-0 snap-start lg:w-auto lg:max-w-93.5 lg:flex-1 lg:basis-0`. "View All Blogs" Button (accent, hero size, ArrowCircle): full width h-40 phone, auto width (min 196) from tab, h-48 and 16px text from xl. Static server component.

## Section behavior (11 FAQ)

- FAQ (11): `container={false} spacing="none"`, classes `py-6.25 md:py-10 xl:py-15`. Container `relative px-5 md:px-15`. Content `max-w-204` (816), gap 30 / 54 / 60 (phone / md / xl). SectionHeading `titleSize="section"` `ornamentTone="gold"` ornament `w-65.5 xl:mb-[54px] xl:w-90.5`. FaqAccordion is a `"use client"` component: `<ul>` of `<li>` cards, each with an h3 > button trigger and a region panel. All items closed at first; clicking toggles one item; multiple items can be open at once. Answer panel animates `grid-template-rows` 0fr→1fr and `opacity` 0→1, 300ms ease-in-out, no transition for `prefers-reduced-motion`. Toggle glyph is a CSS plus/minus built from two `<span>` bars (18 x 3) with rotate and opacity transition. Card: rounded-3xl, 0.5px secondary border, `bg-card-gradient`. Question: `type-faq-question` (H5 M 17.3/25 phone, H5 T 19.08/23.3 from md, H5 22.5/30.7 from xl), `font-heading`, secondary colour, numbered "1. ...". Toggle: 50 x 50 accent bg, radius 10, glyph colour raw `#1D1B4D`. Answer: `type-body-small` (16/22.2), `text-light`, `font-medium`, `whitespace-pre-line`. Focus: `has-focus-visible:ring-2 has-focus-visible:ring-accent` on the card, `focus-visible:outline-hidden` on the trigger. Panel is `inert` when closed. `aria-expanded`, `aria-controls`, `aria-labelledby`, `role="region"`. Static section wrapper; FaqAccordion is the only client component.

## New components in sections 10 and 11

- BlogCard (`shared/BlogCard.tsx`, exported from `shared/index.ts`): title, excerpt, image {src, alt}, href, readMoreLabel? ("Read More"), className. `<article>` with Image (fill, `aspect-240/151` below xl, `aspect-332/186` at xl), Heading h3 `cardTitle` Accent, Text `body-sm` medium Secondary, full-width accent Button with ArrowCircle and a `<span className="sr-only">: {title}</span>` for context. Card: `bg-card-gradient`, `border-card-border`, `shadow-card`, rounded-3xl. Padding 11/10/16/10 below xl, 20 at xl. Min-h 425 at xl. Exports BlogCardProps.
- FaqAccordion (`shared/FaqAccordion.tsx`, exported from `shared/index.ts`): items (readonly FaqItem[]), className. Client component. Exports FaqItem {question, answer} and FaqAccordionProps. Uses `useId` for unique aria IDs and `useState<ReadonlySet<number>>` for open items.

## New components in Contact sections 3 and 4

- InsightsCta (`shared/InsightsCta.tsx`): ornament, title, text, button, image (Contact 3).
- InfoCard (`shared/InfoCard.tsx`): the Office Hours card. Props: `rows` (icon, label, value per row). Rows are 70 high below lg and 100 from lg. Card gradient is `bg-card-gradient`.
- MapCard (`shared/MapCard.tsx`): props `embedUrl`, `mapsUrl`, `mapTitle`, `linkLabel`, `buttonLabel`. Sizes the map (640 x 336 desktop, 648 x 340 tablet, full width phone), keeps `loading="lazy"`, `allowFullScreen` and the referrer policy. Below 1024 the map area is clickable and opens Google Maps in a new tab. The "View on Google map" button opens it on every width.
- Count in `shared/index.ts` was not updated after Contact 3 and 4 (the "17 components" below is stale); check the file.

## Changes to existing components

- SectionHeading: `subtitleSize` expanded from `"small" | "large"` to `"small" | "large" | "largeXl"`. `"largeXl"` renders `type-body-small xl:text-lg xl:leading-[22.6px] xl:tracking-normal` (Body small below xl, Body Large from xl). New prop `ornamentTone?: "light" | "gold"` (default "light"), passed to Ornament.
- Ornament: new prop `tone?: "light" | "gold"` (default "light"). When `variant="section"` and `tone="gold"`, uses `siteConfig.decor.sectionOrnamentGold` (`/icons/section-ornament-gold.svg`, 362 x 34.42).
- siteConfig (site.ts): added `decor.sectionOrnamentGold: { src: "/icons/section-ornament-gold.svg", width: 362, height: 34.42 }`.
- StarField (12 Nov 2026): new optional prop `copies` (default 2, so Home, About and the other sections are unchanged). Size and position now follow the CSS variable `--star-scale` (default 1), which a wrapper can set per breakpoint, for example `[--star-scale:0.5] tab:[--star-scale:1]`.
- ArrowCircle: prop `tone`: "dark" (default, Hero) or "primary" (#655373, Contact buttons).

## New tokens and utilities in globals.css

- `type-faq-question`: Lovelace Text 400, phone 17.3/25 (H5 M), md 19.08/23.3 (H5 T), xl 22.5/30.7 (H5). Breakpoints: md and xl.
- SectionHeading `subtitleSize="largeXl"` is implemented with inline classes, not a new utility.
- `type-insights-title`: phone 30.43/38, from tab 35/35, from lg a fluid size (32 to 43.95, 3.052vw). Used by `InsightsCta`.
- `type-info-label` (Contact 4 card label, Lato 700 from `font-bold` on the element): phone 17.3/25, from tab 19.08/23.3, from xl 22.5/30.7.
- `type-info-value` (Contact 4 card value): phone 14/22, from tab 16/22.2, from xl 18/22.6 (phone and tablet estimated, TODO(figma)).

## New data keys in src/data/home.ts

- `blogsContent`: title, subtitle, readMoreLabel, cta {label, href}, posts[] {slug, title, excerpt, image {src, alt}}. Types: uses `BlogCardProps` from shared. Satisfies `(Pick<BlogCardProps, "title" | "excerpt" | "image"> & { slug: string })[]`.
- `faqContent`: title, items[] {question, answer}. Type `FaqItem` imported from shared.

## Barrel updates

- `sections/home/index.ts`: exports 11 (added Blogs, Faq). HeroEyebrow, HeroVideo and TestimonialsCarousel are still not exported.
- `shared/index.ts`: exports 17 components as of section 11 (added BlogCard + BlogCardProps, FaqAccordion + FaqAccordionProps + FaqItem). Contact 3 and 4 added more (see above).
- `sections/contact/index.ts`: exports ContactHero, ContactEnquiry, ContactInsights, ContactOffice.

## Decisions

### Layout and spacing

- Spacing uses the Tailwind v4 numeric scale = Figma px / 4. Arbitrary values only when no scale value exists, with a comment saying why.
- Page background: `bg-page-gradient` on `<body>`, `bg-page-flow` on `<main>`. Bands at `--glow-1` to `--glow-6` (desktop px). TODO(figma), estimated from screenshots, desktop only. The Contact page has its own gradient on `<main>` (stops 0 / 1154 / 2307 / 3461 / 4614 px) and Contact 4 adds a purple glow layer in %, so it matches on tablet and phone.
- Container `padding="page"` = px-5 md:px-15 xl:px-20. Default max width 1440px.
- Hero is full-bleed. Sections 6–11 use `container={false} spacing="none"` with their own Container.
- Star fields: wrapper A (About + Milestones), wrapper B (WhyLearn + Courses), wrapper C (Blogs + FAQ) each have ONE `<StarField />`. Awards, ConsultationServices and Testimonials render their own. Contact: one wrapper for sections 3 to 5 with `copies={6}` and the `--star-scale` class above.

### Breakpoints

- Defined in globals.css: `2xl` 1440px, `tab` 600px. Tailwind v4 defaults assumed: sm 640, md 768, lg 1024, xl 1280.
- Blogs (10): md, lg, xl (no tab). The scroll row lasts below lg; three flexible cards from lg.
- FAQ (11): md, xl. Content max 816. Ornament only switches at xl (the `w-65.5` is the same on phone and tablet).
- `type-faq-question`: md and xl.
- `type-faq-title` (Contact FAQ title): phone 30.43/38, md 35/40, xl 43.95/48, no cap trim. md and xl.
- INCONSISTENCY: Testimonials lays out at md but its title switches at tab. Blogs uses md for its tablet padding. FAQ uses md. This is consistent with the Testimonials pattern (md-based sections). Decision still open (see Open TODOs).
- Contact 3 and 4: `tab` (600) for the tablet size and padding, `lg` (1024) for the two-column row, `xl` (1280) for 80px side padding and the 130px gap / desktop card sizes. The Contact 3 title grows with the width from lg (see `type-insights-title`). Contact FAQ (5) uses md and xl like the Home FAQ (decided 12 Nov 2026).

### Tokens in src/styles/globals.css

Additions for sections 10 and 11: `type-faq-question`. The gold ornament SVG is referenced through siteConfig, not a new CSS token. Contact additions: `type-insights-title`, `type-info-label`, `type-info-value` (see above).

### Components

shared/ exports 17 components as of section 11 (see the note above for later additions). New: BlogCard, FaqAccordion. See "New components" above.

sections/home/ index.ts exports 11 (was 9). New: Blogs (blogsContent), Faq (faqContent). Both take no props.

### Asset paths

New for Blogs: `/images/home/blogs/blog-birth-chart-career.webp`, `blog-life-path-number.webp`, `blog-manifestation-habits.webp` (all exist in public/).

New for FAQ: `/icons/section-ornament-gold.svg` (exists in public/).

New for Contact 4: `/icons/section-ornament-gold.svg` (reused), `/icons/contact-divider-star.svg`, `/icons/calendar.svg` and `/icons/calendar-close.svg` (the Office Hours card icons, exported from Figma as SVG).

### Stack facts from the code

Unchanged from sections 1–9.

## Gotchas

- Run `pnpm typecheck` after every section, not only `pnpm lint`. Also run `pnpm format:check` (it checks docs too: run `pnpm prettier --write docs/PROGRESS.md` after editing this file).
- Image checks: run `file` on every exported image (1x1 PNG = placeholder). After replacing an image, stop the dev server, delete `.next`, restart.
- Every path in `src/data/*.ts` must exist in `public/`. All referenced assets now exist (unused references to missing `connectors.svg` and `star.svg` removed). Blog images now exist.
- Comments drifted from classes in sections 6 to 8. The classes are what runs; the comments are not trustworthy.
- Testimonials mixes md and tab. Awards switches to 2 columns at sm (640).
- Inline styles exist: carousel `transform`, StarField sizes (now `calc(... * var(--star-scale, 1))`), LogoMarquee `--logo-w` (all dynamic values).
- Raw colours without a token: `text-black` (CarouselControls caret), `bg-black/60` (HeroVideo overlay), `#1D1B4D` (FaqAccordion toggle glyph bars). Heading, Text and Icon colour variants still use old hex.
- Lato 600 italic and 800 are not loaded (fonts.ts has 400 / 500 / 700): the browser draws testimonial quotes as synthetic italic and the title at 700.
- `SectionHeading` `subtitleSize="large"` is still unused (Consultation and Testimonials repeat Body Large by hand). `"largeXl"` is used by Blogs.
- `text-box-trim` needs Chrome 133+ / Safari 18.2+; elsewhere the boxes are taller.
- Unverified risk: tailwind-merge may not know custom utilities (text-h1 to text-h5, type-*).
- `StarField` forces 1962 x 995 (times `--star-scale`) on any src. The default is 2 copies, so a very tall wrapper can run out of stars: pass a higher `copies` (the Contact wrapper passes 6 with scale 0.5 on phone).
- Button in link mode only passes href, target, rel, className. `siteConfig.login.href` uses `??`: an empty NEXT_PUBLIC_LMS_URL makes Button render a plain `<button>`.
- Spelling: "Teejaswinni" everywhere (confirmed 12 Nov 2026).
- Lovelace Text is not loaded; Libre Baskerville is the stand-in.
- AGENTS.md: this Next.js version has breaking changes; read `node_modules/next/dist/docs/`.
- A teammate is building section 12. They will touch `(public)/layout.tsx` and probably shared files; merge against the current files.
- A shared component edited in one chat or account (ArrowCircle, StarField, shared/index.ts, globals.css, contact.ts) must be pasted whole into the next chat; never paste an older copy over it.
- Dev-only console warnings: Next/Image "width or height modified" for `icons/section-ornament-gold.svg` and `images/layout/logo.png` (navbar, old file, not changed). They do not affect how the page looks.

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
- Page background: confirm `bg-page-flow` angle (172deg) and glow positions, add values below 4350px, tablet and phone; check the Hero fade-strip seam. The Contact page gradient in `contact/page.tsx` also uses desktop pixel positions; Contact 4 compensates with its own glow, but Contact sections 1 to 3 on tablet and phone are not checked against the Figma gradient panel.
- Section 12 (CTA + Footer) on Home and on Contact: teammate.
- Decide whether to use `useScrolled` in the Navbar or remove it.
- Fonts: supply Lovelace Text files, load with next/font/local, drop Libre Baskerville.
- globals.css: card gradient angle and stops; Territory, Dark, Text, Card color, Cards, Light Bg tokens; replace `bg-hero-gradient`.
- ui primitives: radius, colors, sizes, paddings, hover/active states, font bindings are TODO(figma).
- TODO(client): confirm planned routes in navigation.ts; confirm the LMS login path in site.ts.
- Regenerate the TODO list from the code when needed: `grep -rn "TODO(" src`.
- Contact 3: confirm the image alt text, the phone frame height (597 vs 589.42), the paragraph box height, and the title weight once Lovelace Text is loaded. Build /consultation (the button is a 404 until then).
- Contact 2: differences are being collected (TODO from the user); apply them to ContactEnquiry / EnquiryForm only.
- Contact 4: TODO(client) confirm the map pin and the Google listing name ("Diviine Infinity Numerologgy" looks misspelled); the Contact 2 address ("Bangalore") is still the Figma placeholder. TODO(figma): tablet and phone panels for the Office Hours card (value text 16 and 14, icon 40, gap 16 / 24 are estimated); the tablet Figma star group size (tablet and desktop stars use scale 1); phone star scale 0.5 is estimated from the size ratio (adjust to 0.6 / 0.4 if it looks off). The "Closed/Open based on client" line wraps at 320 and below (accepted).
- Contact 5: TODO(client) send the real answers (placeholder now) and confirm the question 1 wording on tablet and phone (lowercase "i"). TODO(figma): tablet title panel, compact toggle radius (12 estimated), open-state spacing on tablet and phone (not designed), desktop padding 91.79 (derived), hover state.
- WhatsApp: the real number and message are pending from the client (site.ts); the Home page already renders the button.