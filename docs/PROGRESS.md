# PROGRESS (update after every finished section)

Last updated: 6 Nov 2026

## Status (Home page)

| Item                                  | Status      |
| ------------------------------------- | ----------- |
| Navbar (desktop, tablet, mobile menu) | Done        |
| 1 Hero                                | Done        |
| 2 Proudly Featured                    | Done        |
| 3 About Teejaswini                    | Done        |
| 4 Milestones                          | Done        |
| 5 Awards & Certifications             | Done        |
| 6 Why Learn From Teejaswini           | Not started |
| 7 Courses                             | Not started |
| 8 Consultation Services               | Not started |
| 9 Testimonials                        | Not started |
| 10 Blogs                              | Not started |
| 11 FAQ                                | Not started |
| 12 CTA + Footer                       | Not started |

Global item, not a numbered section: WhatsApp floating button. Visible in every Figma frame, NOT built yet.

Project is LOCAL ONLY. It is never pushed to GitHub. Commit locally only.

Section notes:

- Hero: desktop measured, several tablet and mobile values estimated (see Open TODOs).
- Proudly Featured: about 95% match to Figma by screenshot comparison. What the other 5% is: unknown. Marquee speed estimated.
- About (3): match to Figma: unknown. Estimated or by eye: unknown. Changed by hand after AI code: unknown. Missing: unknown. From the code: portrait alt text is a placeholder (TODO(figma)); arch inner inset, dot size and dot positions are measured from screenshots (Ellipse 3, Ellipse 4, Frame 32 panels not received).
- Milestones (4): match to Figma: unknown. Estimated or by eye: unknown. Changed by hand: unknown. Missing: unknown. From the code: corner connector lines are not rendered (Figma "Group 8" export missing); count-up duration 2000ms ease-out is assumed; phone stat card 245 x 96 and phone number size are estimated.
- Awards (5): match to Figma: unknown. Estimated or by eye: unknown. Changed by hand: unknown. Missing: unknown. From the code: mobile card panels and desktop row 2 card/image sizes were not measured; tablet side padding 53 is estimated; star background is desktop only (tablet and mobile versions not exported).

## Decisions

### Layout and spacing

- Spacing uses the Tailwind v4 numeric scale = Figma px / 4 (pt-32.25 = 129px).
- Page background: `bg-page-gradient` on `<body>` (src/app/layout.tsx), plus `background-color: var(--color-gradient-stop-5)` on body in globals.css.
- Home page background: `<main className="bg-page-flow">` in src/app/(public)/page.tsx. It paints one continuous background; sections must not paint their own background. Bands sit at fixed pixel positions `--glow-1` to `--glow-6` (1700, 2350, 2950, 3350, 3950, 4350px), angle 172deg. Both are TODO(figma), estimated from screenshots, desktop only. Tablet and phone values do not exist yet.
- Gradient seam fix: body in layout.tsx is `bg-page-gradient text-light flex min-h-screen flex-col font-sans`. Which class is the fix: unknown.
- Container `padding="page"` = px-5 md:px-15 xl:px-20. Default max width 1440px.
- Hero is full-bleed: `<Section container={false} spacing="none">` with an inner `<Container padding="page">`.
- Regular sections: `<Section spacing="none" containerPadding="page">` with Figma padding in `className`.
- Rule: when a section's Figma y on tablet or mobile is below the previous section's end, add the difference as top padding.
- About and Milestones share one wrapper in page.tsx: `relative isolate overflow-hidden` with one `<StarField />`. Awards sits outside it and has its own StarField.
- No new section paints its own background.

### Breakpoints

- Defined in globals.css: `--breakpoint-2xl: 90rem` (1440px) and `--breakpoint-tab: 37.5rem` (600px).
- `md` and `xl` are NOT defined in globals.css. Tailwind defaults (768 / 1280) probably apply: unverified. Also used: default `sm` (640) and `lg` (1024), arbitrary `min-[900px]` and `min-[90rem]`.
- INCONSISTENCY: About, Milestones, StatCard and the "feature" SectionHeading switch to tablet at `tab` (600). Awards, Hero, ProudlyFeatured, Navbar, Ornament, LogoMarquee switch at `md` (768). Awards also uses `sm` (640) for its 2-column grid.
- Desktop layout switches at `xl`. Mobile menu hidden at `xl` and above.
- Do not add breakpoints without asking.

### Tokens in src/styles/globals.css

Verified from Figma:

| Token                          | Value                                       |
| ------------------------------ | ------------------------------------------- |
| --color-primary                | #655373                                     |
| --color-secondary              | #fff0db                                     |
| --color-accent                 | #ffd8a2                                     |
| --color-light                  | #ececec                                     |
| --color-gradient-stop-1 to -5  | #090d22, #2a1845, #1a1440, #0b1333, #040817 |
| --spacing-nav-y-sm / -md / -xl | 23px / 20px / 30px                          |
| --breakpoint-2xl               | 90rem                                       |

Added for Hero (names are ours): `--color-gold` #fdbb5d, `--color-primary-dark` #3e2066, `--blur-hero-fade` 20px, `--animate-om-pulse-shift`, `--animate-om-pulse` (timing assumed), `--font-eyebrow` (Mirza 700); utilities `type-hero-h1` (30.43/35, 35/40 from md, 54.93/70.4 from xl), `type-hero-eyebrow`, `type-btn-large`.

Added for Proudly Featured: `type-section-title` (Lovelace Text 400, 30.43/35, 35/40 from md, 43.95/48 from xl, cap trim below xl), `animate-marquee`, `@keyframes marquee`. `--marquee-duration` is set on the LogoMarquee track, not in the theme.

Added for About (3): `--breakpoint-tab` 600px; `--color-arch-border` #806398 (Figma border, no style name, differs from Territory); `type-feature-title` (30.43/35, 35/40 from tab, 54.93/70.4 from xl); `type-h5` (17.3/25 phone, 19.1/23.3 from tab, 22.5/30.7 from xl).

Added for Milestones (4): `type-stat-number` (phone 25.2 estimated, tablet 28.58 measured, desktop 43.95/48 measured; cap trim below xl); `type-section-title-tab` (same as type-section-title but the tablet size starts at tab).

Added for Awards (5): `--color-card-border` #5f1bb7; `--shadow-card` 0 4px 24px 0 rgb(85 81 255 / 0.25); `type-section-title-t` (35/40 on phone and tablet, 43.95/48 from xl); `type-card-title` (19.1/23.3, 22.5/30.7 from xl, cap trim below xl; phone size assumed = tablet).

Page background tokens: `--glow-1` to `--glow-6` in :root, utility `bg-page-flow`.

Present but NOT verified (TODO(figma)): `--color-territory` #8061a5, `--color-dark` #1e1633, `--color-text-muted` #8c8c8c, `--color-card-solid` #3c2657, `--color-bg-light` #f8f6fb. Card gradient (:root) `--color-card-gradient-start` #1d1b4d and `--color-card-gradient-end` #512b58, angle 180deg assumed. This differs from the older notes (#2b1f51 / #482857), so it also changes `Card variant="gradient"` and `Section bg="card"`.

Other: `--font-sans` and `--font-lato` = Lato (local 400/500/700). `--font-heading` = "Lovelace Text", then Libre Baskerville 400 (stand-in), Georgia, serif. Fluid `--font-size-h1` to `-h5` and `text-h1` to `text-h5`. Utilities `type-body-small`, `type-h5-t`, `bg-card-gradient`, `bg-page-gradient` (170deg), `bg-hero-gradient` (old placeholder, raw hex).

### Components (all sections)

- `SectionHeading` (shared/): `variant="center"` (default): centered Ornament (section), Heading (size via `titleSize`, default "section", Lovelace, `text-accent` class), optional Text subtitle (medium, `type-body-small text-light`), gap 15 (gap-3.75). `variant="feature"` (About): centered on phone, left from tab, width xl:w-130.75, ornament-to-title gap 25 (gap-6.25), title Heading size "feature", subtitle `type-h5` white. `titleSize` can be any Heading size. `ornamentClassName` is passed to the Ornament.
- `Heading` sizes: h1 to h5, hero, feature, section, sectionTab, sectionT, cardTitle.
- `Ornament`: `variant` divider (120 wide) or section (262 wide, 362 from xl).
- `StarField` (shared/): absolute inset-0 overlay of stacked copies (2) of one 1962 x 995 star image, every second copy flipped. Props: `className`, `src` (added by the typecheck fix, default `/images/shared/stars-bg.svg`). It forces 1962 x 995 on any src.
- `ArchPortrait` (shared/): `src`, `alt`, `sizes` (default "362px"), `className`. Figma "Group 4" 402 x 508, top radii 240, 1px border `arch-border`, inner arch inset 4.975% / 3.937%, four 15px dots on the outline (two at 70% opacity). All inner measures are percentages.
- `StatCard` (shared/): `value`, `prefix`, `suffix`, `label`, `as` (div|li), `className`. Radius 12, 1px accent border, padding 12, gap 8, no fill. Phone 245 x 96, tablet 202 wide, desktop 263 wide and hug height.
- `CountUp` (shared/, "use client"): counts 0 to `value` every time it scrolls into view (threshold 0.5, resets when it leaves). Server renders the final number. Reduced motion: final number. Width reserved. Screen readers read the final text once. Duration 2000ms, ease-out cubic (assumed).
- `AwardCard` (shared/): `title`, `image {src, alt}`, `rating` (default 5), `className`. Radius 24 (rounded-3xl), 1px `card-border`, `bg-card-gradient`, `shadow-card`. Desktop 374 x 315, tablet 320 x 287, phone estimated. Image `aspect-[343/181]` on phone, h-39.75 from sm. Title row: laurel left and right (h-11.5, xl 52.28), Heading "cardTitle" in `text-secondary`.
- `StarRating` (shared/): `rating` (default 5), `className`. 12 x 12 stars, gap 4, Secondary colour, `role="img"` with aria-label.
- `siteConfig.decor`: sky, ornament, sectionOrnament, laurelLeft and laurelRight (25.8 x 52.28), star (`/icons/star.svg`, file missing).
- Content in src/data/home.ts: `heroContent`, `featuredContent`, `aboutContent`, `milestonesContent`, `awardsContent`.
- `sections/home/index.ts` exports AboutTeejaswinni, AwardsCertifications, Hero, Milestones, ProudlyFeatured.

### Marquee behavior and per-logo sizing (Proudly Featured)

- Two identical sets in one track, translateX(0) to -50%, linear, infinite, right to left. Gap between cells 30px desktop, 10px tablet and mobile. Gap between sets 40px desktop, none below. Viewport 1372 wide on desktop (xl:max-w-343), full container below; 85 / 68 tall.
- Duration in code: 9s below xl, 15.5s at xl. Estimated by eye. The real value is in the Figma prototype.
- Copy set is aria-hidden with empty alt. Original set has aria-label from `logosLabel`. Reduced motion: no animation, copy hidden, strip scrolls by hand. No pause on hover or focus.
- Each logo has its own width and height in `featuredContent.logos`. Whether they are Figma frame sizes or display hints: unknown. Desktop shows `--logo-w`, tablet and mobile 0.6x. Cells 200 x 85 desktop, 120 x 64 below. `invert: true` (Dailyhunt) turns the logo white.
- Section padding top 60 / 40 / 30, bottom 40 / 40 / 30. Classes `pt-13.75 pb-7.5 md:pt-21.25 md:pb-10 xl:pt-15`. Inner frame desktop 1418 wide (xl:max-w-354.5), fixed 256 tall.

### Hero behavior (src/components/sections/home/Hero.tsx)

- Min height: mobile 549 (min-h-137.25), tablet 585 (min-h-146.25), desktop 750 (min-h-187.5).
- Background video via HeroVideo ("use client"): autoPlay, muted, loop, playsInline, preload="metadata", poster. Reduced motion: poster only (next/image fill, priority). Below md a 60% black overlay. At xl the video bleeds 40px wider and 45px taller, clipped by the wrapper.
- Fade strip: 95px tall, -50px bottom, `bg-page-gradient`, blur 20px, aria-hidden. Same on all viewports, tablet and mobile not verified.
- Content: Container "page". Top padding 116 / 114 / 129px (desktop measured). Text column max width tablet 376, desktop 760.
- Eyebrow: 3px light bar + Om icon + uppercase Mirza tagline in gold. Om pulse: width animation below xl, scale at xl, none with reduced motion.
- H1: `<Heading as="h1" size="hero" font="heading" color="gold">`, id "hero-heading". Line breaks come from data (`breakAfter`).
- CTAs (Button size "hero"): "Book a Consultation" to /consultation (outline-accent), "Explore Courses" to /courses (accent, ArrowCircle).

### About Teejaswini (3) – AboutTeejaswinni.tsx

- Section: `spacing="none" containerPadding="page"`, aria-labelledby "about-heading". Classes `pt-7.5 pb-7.5 tab:py-10 lg:pb-11`.
- Phone (below 600): one centered column. Tablet (600 to 1023): grid, text column + portrait column (`clamp(13rem,45vw,21.6875rem)`), gap-x 40. From 900px the second paragraph moves up beside the portrait. Laptop (1024+): text left, portrait right (flex, gap 40, xl:min-h-126.5). Exact Figma sizes (row 506, column 810, portrait 402) apply from 1440 (2xl). Between 1024 and 1439 the text column flexes.
- One DOM order. `contents` wrappers vanish below lg so grid placement can rearrange the pieces.
- Heading: SectionHeading `variant="feature"`. Ornament uses `xl:mb-[1.66px]` (Figma ornament frame 34.42, SVG 32.76).
- Copy: two paragraphs (Text medium, `type-body-small text-light`), centered on phone, left from tab.
- Button: "Read My Full Journey" to /about, accent, size hero, ArrowCircle right, full width on phone, auto width from tab, `lg:w-fit`.
- Portrait `sizes`: "(min-width: 1024px) 402px, (min-width: 600px) 312px, 306px".
- Static, no animation, Server Component.

### Milestones (4) – Milestones.tsx

- Section: `spacing="none" containerPadding="page"`, aria-labelledby "milestones-heading". `pt-7.5 pb-7.5 tab:py-10 xl:pt-0`.
- Desktop (measured): frame 1152 x 658.75 (xl:max-w-288). Heading frame 262 wide at top 45. Cards 263 wide at left 0 and right 0, tops 89 and 435. Ouroboros 1066 x 658.75 at 75% opacity.
- Tablet (600 to 1023): frame 531 tall, cards 202 x 96 at the corners, ouroboros 432 wide (aspect kept) between the card rows.
- Laptop step (1024 to 1279): frame 588 tall, ouroboros 648 wide.
- Phone: single column, cards 245 x 96 (estimated), ouroboros below (aspect 648/400).
- Ouroboros is aria-hidden, alt empty, `next/image fill`.
- Numbers count up from 0 each time the section scrolls into view (CountUp). Reduced motion: final numbers.
- Stats (Figma order, also the phone stack): 3+ Years of Experience, 500+ Consultations, 300+ Students Guided, Top 30 Recognised Numerologist (2025).
- Corner connector lines are NOT rendered (`milestonesContent.connectors` points to a file that does not exist yet).

### Awards & Certifications (5) – AwardsCertifications.tsx

- Section: `container={false} spacing="none"`, aria-labelledby "awards-heading", `md:py-13.25 xl:py-15` (no vertical padding on phone). Inner Container `padding="page"` with `md:px-13.25 xl:px-10` (tablet side padding 53, not 60).
- Content width: 1242 desktop (xl:max-w-310.5), 662 tablet (md:max-w-165.5), 385 phone. Header-to-grid gap: classes give 40 / 36 / 70 (phone / tablet / desktop). The code comment says 70 / 40 / 40, so the tablet value is unclear.
- Heading: SectionHeading with `titleSize="sectionT"`, ornament width 162 phone / 262 md / 362 xl, `md:py-10 xl:py-15` on the heading, subtitle `sm:max-w-120`.
- Grid: 1 column (max 385) on phone, 2 columns from sm (640, gap 20), 3 columns from xl (gap 40, 60 from 1440).
- 6 cards (Vedic Numerology, Astrology, Tarot Reading, Bhrigu Nandi Nadi Astrology, Vaastu, Rudraksha Studying). Only 3 photos exist; each is reused twice.
- Background: `<StarField src={background.src} />` (awards-specific SVG, desktop version only).
- Static, Server Component.

### Video and asset paths

- Video `/videos/hero-planets.mp4` (size unknown). Poster `/images/home/hero/hero-poster.jpg`.
- Icons: `/icons/om.svg`, `/icons/ornament.svg`, `/icons/section-ornament.svg`, `/icons/laurel-left.svg`, `/icons/laurel-right.svg`.
- Proudly Featured logos in `/images/home/proudly-featured/` (8 png files).
- About: `/images/home/about/about-portrait.webp`.
- Milestones: `/images/home/milestones/ouroboros.png`. `connectors.svg` is referenced in data but missing.
- Awards: `/images/home/awards-certifications/` (`award-vedic-numerology.jpg`, `award-astrology.jpg`, `award-tarot-reading.jpg`, `stars-bg.svg`).
- Shared: `/images/shared/stars-bg.svg` (StarField default and Navbar background), `/images/shared/menu-bg.png`, `/images/layout/logo.png`, Lato woff2 in `/fonts/`.

### Stack facts from the code

- Next 16.4.3 (dev and build use --webpack), React 19.3.0, Tailwind v4 via @tailwindcss/postcss, cva + clsx + tailwind-merge, pnpm 12.16.1, Node >= 22.
- tsconfig: strict, noUncheckedIndexedAccess, alias @/* to src/*.

## Gotchas

- TYPECHECK ERRORS (fixed): AwardsCertifications.tsx used `<StarField src>` and `<SectionHeading ornamentGap>`, but the shared components had neither prop. Likely cause: shared components edited in different chats, so the version in the repo lacked the Awards props (cannot be proven from the code). `next dev` does not typecheck and ignores unknown props, so nothing looked wrong on screen. Fix: StarField got an optional `src` (default `/images/shared/stars-bg.svg`); `ornamentGap="wide"` was removed (what "wide" meant is unknown).
- Run `pnpm typecheck` after every section, not only `pnpm lint`.
- Image checks: run `file` on every exported image. A 1x1 PNG is a placeholder. After replacing an image, stop the dev server, delete `.next` and restart.
- Every path in `src/data/*.ts` must exist in `public/`. `connectors.svg` and `/icons/star.svg` are declared but missing.
- Tablet starts at 600 (`tab`) in About and Milestones but at 768 (`md`) in Awards, Hero and ProudlyFeatured. Awards also switches to 2 columns at `sm` (640). Between 640 and 767 Awards is in its phone container with a 2-column grid. Not changed.
- `StarField` forces the image to 1962 x 995. A star image with another aspect ratio will stretch. With only 2 copies a very tall wrapper (phone) can run out of stars.
- `--glow-*` bands are fixed pixel positions for desktop. Tablet and phone page heights differ. The Hero fade strip uses `bg-page-gradient`, not `bg-page-flow`, so a seam is possible. Unverified.
- `layout/index.ts` exports only Container, Section, Logo, Navbar. `shared/index.ts` exports 11 components. `sections/home/index.ts` exports 5 (HeroEyebrow and HeroVideo are not exported).
- `useScrolled` is exported but unused. Navbar has its own scroll listener.
- Button in link mode (`href`) only passes href, target, rel and className. `ref`, `onClick` and aria props are dropped.
- `siteConfig.login.href` uses `??`. An empty NEXT_PUBLIC_LMS_URL (as in .env.example) makes Button render a plain `<button>`.
- Heading, Text and Icon color variants still use old hex values (accent #ffd795, primary #675275, secondary #faeed4). SectionHeading avoids this with the `text-accent` class. The "feature" subtitle uses `text-white`, not a token.
- `text-box-trim` (type-section-title*, type-stat-number, type-card-title) needs Chrome 133+ / Safari 18.2+. Elsewhere the boxes are just taller.
- Unverified risk: tailwind-merge may not know custom utilities (text-h1 to text-h5, type-*).
- Spelling: file `AboutTeejaswinni.tsx` has a double "n". `src/data/home.ts` copy also uses "Teejaswinni" (About title, intro, portrait alt, logosLabel). The rest of the project says "Teejaswini". Not changed.
- Hero comments and classes disagree (eyebrow 19/15 vs 20/16px; H1-to-paragraph ~8/~58 vs 11/52px; top offset ~117 vs 116). MobileMenu has two conflicting comments about the background image opacity.
- Lovelace Text is not loaded. Libre Baskerville is the stand-in.
- AGENTS.md: this Next.js version has breaking changes; read node_modules/next/dist/docs/ before writing Next-specific code.
- The editor shows about 12 warnings in globals.css (probably the CSS linter not knowing Tailwind v4 at-rules). The navbar took about 4 hours, so always get the Figma properties panel first.
- Not visible in Part 3, so unknown: src/app/design-system/page.tsx, .nvmrc, ESLint and Prettier configs.

## Open TODOs

- Confirm what "wide" ornament gap was meant for Awards (ornamentGap was removed) and whether Awards should use the awards-specific star SVG (check its real size).
- Decide one tablet breakpoint for Home (tab 600 vs md 768) and align Awards, Hero, ProudlyFeatured.
- Export Figma "Group 8" connector lines (`connectors.svg`) and render them in Milestones.
- Export tablet and mobile star backgrounds for Awards.
- Awards: measure mobile card panels, desktop row 2 card/image sizes, tablet padding (53 is estimated) and the tablet header gap (40 vs 36).
- Confirm CountUp duration (2000ms ease-out assumed).
- Confirm "Rudraksha Studying" (tablet and mobile frames read differently) and replace placeholder alt texts (About portrait, award photos).
- ArchPortrait: Ellipse 3, Ellipse 4 and Frame 32 panels not received.
- Page background: confirm `bg-page-flow` angle (172deg) and glow positions; add tablet and phone values; check the Hero fade-strip seam.
- Confirm marquee duration (9s below xl, 15.5s at xl) from the Figma prototype.
- Build the WhatsApp floating button (number, link and position unknown) and the Footer.
- Verify Hero fade strip on tablet and mobile; Hero estimated values (tablet and mobile top offset, H1-to-paragraph gap, CTA widths and height, eyebrow size); Om animation timing.
- Proudly Featured: find the remaining ~5% difference; confirm per-logo sizes are Figma frame sizes.
- Decide the spelling "Teejaswini" vs "Teejaswinni" in file names, data and docs.
- Remove or create `/icons/star.svg` (`siteConfig.decor.star`).
- Fonts: supply Lovelace Text files, load with next/font/local, drop Libre Baskerville.
- globals.css: card gradient angle and stops; Territory, Dark, Text, Card color, Cards, Light Bg tokens; Gradient style angle and stops; replace `bg-hero-gradient`.
- ui primitives (Badge, Button, Card, Heading, Icon, Input, Text): radius, colors, sizes, paddings, hover/active states and font bindings are TODO(figma).
- layout: Container narrow/wide widths and "normal" padding; Section spacing scale and muted bg; Logo tablet (100) and mobile (80) sizes; NavLinks hover; MobileMenu Frame 108 opacity and 24px gap; ArrowCircle caret.
- TODO(client): confirm planned routes in navigation.ts; confirm the LMS login path in site.ts.
- Decide whether to use `useScrolled` in the Navbar or remove it.
- Regenerate the auto-generated TODO list from the code (line numbers go stale): for example `grep -rn "TODO(" src`.