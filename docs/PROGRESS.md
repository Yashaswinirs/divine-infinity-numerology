# PROGRESS (update after every finished section)

Last updated: 4 Nov 2026

## Status (Home page)

| Item                                  | Status      |
| ------------------------------------- | ----------- |
| Navbar (desktop, tablet, mobile menu) | Done        |
| 1 Hero                                | Done        |
| 2 Proudly Featured                    | Done        |
| 3 About Teejaswini                    | Not started |
| 4 Milestones                          | Not started |
| 5 Awards & Certifications             | Not started |
| 6 Why Learn From Teejaswini           | Not started |
| 7 Courses                             | Not started |
| 8 Consultation Services               | Not started |
| 9 Testimonials                        | Not started |
| 10 Blogs                              | Not started |
| 11 FAQ                                | Not started |
| 12 CTA + Footer                       | Not started |

Global item, not a numbered section: WhatsApp floating button. It is visible in every Figma frame and is NOT built yet.

Hero note: desktop values are measured. Several tablet and mobile values are estimated (see Open TODOs).
Proudly Featured note: matches Figma about 95% by screenshot comparison on desktop, tablet and mobile. What the remaining 5% is: unknown. Marquee speed is an estimate.

## Decisions

### Layout and spacing

- Spacing uses the Tailwind v4 numeric scale = Figma px / 4 (example: pt-32.25 = 129px).
- Page background: `bg-page-gradient` on `<body>` (src/app/layout.tsx). `body` also gets `background-color: var(--color-gradient-stop-5)` in globals.css.
- Gradient seam fix (affects every page): the `<body>` in src/app/layout.tsx is `bg-page-gradient text-light flex min-h-screen flex-col font-sans`. The previous body classes are not in the handoff, so which class is the fix and what the seam looked like are unknown.
- Container `padding="page"` = px-5 md:px-15 xl:px-20 (20 / 60 / 80px). Default container max width is 1440px.
- Hero sections are full-bleed: `<Section container={false} spacing="none">` with an inner `<Container padding="page">`.
- Regular sections use `<Section spacing="none" containerPadding="page">` and put the Figma padding on the section `className`. ProudlyFeatured is the example.
- Rule: when a section's Figma y on tablet or mobile is below the previous section's end, the difference is added as top padding. Proudly Featured starts at y=630 (tablet) and 574 (mobile) while the Hero ends at 585 and 549, so 45px and 25px are added to the top padding.

### Breakpoints

- Defined in globals.css: `--breakpoint-2xl: 90rem` (1440px) only.
- `md` and `xl` are used by Navbar, MobileMenu, Hero, ProudlyFeatured, SectionHeading, Ornament and LogoMarquee. Their px values are NOT defined in globals.css: unknown from the code (Tailwind defaults would be 768 / 1280, unverified).
- `2xl` is used in NavLinks (gap-11.25). Older ui primitives (Container "normal" padding, Section, Card, Input) also use sm and lg.
- Desktop layout switches at `xl`; the mobile menu is hidden at `xl` and above; nav links show from `xl`.

### Tokens in src/styles/globals.css

Verified from Figma (per file comments):

| Token                         | Value                                              |
| ----------------------------- | -------------------------------------------------- |
| --color-primary               | #655373                                            |
| --color-secondary             | #fff0db                                            |
| --color-accent                | #ffd8a2                                            |
| --color-light                 | #ececec                                            |
| --color-gradient-stop-1 to -5 | #090d22, #2a1845, #1a1440, #0b1333, #040817        |
| --spacing-nav-y-sm / -md / -xl | 23px / 20px / 30px                                |
| --breakpoint-2xl              | 90rem                                              |

Added for the Hero (names are ours, Figma shows no style name):

| Token                     | Value                                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| --color-gold              | #fdbb5d                                                                                                            |
| --color-primary-dark      | #3e2066                                                                                                            |
| --blur-hero-fade          | 20px (Figma layer blur 40)                                                                                         |
| --animate-om-pulse-shift  | om-pulse-shift 3s ease-in-out infinite (width 1.76rem to 1.32rem, opacity 1 to 0.55, gold drop-shadow 6px)         |
| --animate-om-pulse        | om-pulse 3s ease-in-out infinite (scale 1 to 0.75, opacity 1 to 0.55). Timing assumed (TODO)                       |
| --font-eyebrow            | Mirza 700 (via --font-eyebrow-loaded)                                                                              |
| utility type-hero-h1      | 30.43/35 mobile, 35/40 from md, 54.93/70.4 from xl (px)                                                            |
| utility type-hero-eyebrow | Mirza 700 uppercase, line-height 1; 16px mobile, 20px md, 26px xl                                                  |
| utility type-btn-large    | 16px, line-height 1                                                                                                |

Added for Proudly Featured:

| Token                    | Value                                                                                                                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| utility type-section-title | Lovelace Text 400 (Figma H2 / H2 T / H2 M): 30.43/35 mobile, 35/40 from md, 43.95/48 from xl (px). text-box-trim "cap alphabetic" on mobile and tablet (Figma "Vertical trim: Cap height"), none at xl |
| utility animate-marquee  | `marquee var(--marquee-duration, 30s) linear infinite`                                                                                                                                 |
| @keyframes marquee       | translateX(0) to translateX(-50%)                                                                                                                                                      |
| --marquee-duration       | Not a theme token. Set per breakpoint on the LogoMarquee track (see Marquee behavior)                                                                                                  |

Present but NOT verified (TODO(figma)); the step in which each was added is unknown:

| Token                                          | Value             |
| ---------------------------------------------- | ----------------- |
| --color-territory                              | #8061a5           |
| --color-dark                                   | #1e1633           |
| --color-text-muted                             | #8c8c8c           |
| --color-card-solid                             | #3c2657           |
| --color-bg-light                               | #f8f6fb           |
| --color-card-gradient-start / -end (in :root)  | #2b1f51 / #482857 |

Other tokens and utilities:
- Fonts: `--font-sans` and `--font-lato` = Lato (local 400/500/700). `--font-heading` = "Lovelace Text", then Libre Baskerville 400 (stand-in), Georgia, serif.
- Fluid heading tokens in :root: `--font-size-h1` to `-h5`, `--line-height-h1`, `-h2`, `-h4`, `-h5` (clamp values). Used by `text-h1` to `text-h5`.
- Other utilities: `type-body-small` (16px / 22.2px, letter-spacing 0.01em), `type-h5-t`, `bg-card-gradient`, `bg-page-gradient` (180deg, angle and positions unconfirmed), `bg-hero-gradient` (old placeholder with raw hex).

### New components and API changes (Proudly Featured)

- `SectionHeading` (shared/): ornament + title + optional subtitle, centered, gap 15px (gap-3.75). Title is Heading size "section", font "heading", colour via className `text-accent` (not the Heading `color` prop, whose accent hex is old). Subtitle is Text weight medium, `type-body-small text-light`.
- `LogoMarquee` (shared/): endless logo strip, see Marquee behavior.
- `Ornament` now has `variant`: "divider" (default, 120 wide, mobile menu) and "section" (262 wide, 362 from xl; Figma 362 x 32.76 desktop, 262 x 23.71 tablet and mobile).
- `Heading` has a new size "section" (uses `type-section-title`).
- `siteConfig.decor.sectionOrnament` = /icons/section-ornament.svg (362 x 32.76).
- `featuredContent` in src/data/home.ts (title, subtitle, logosLabel, logos).
- `ProudlyFeatured` is exported from `sections/home/index.ts`.

### Per-logo sizing

- Every logo has its own `width` and `height` in `featuredContent.logos`. The LogoMarquee comment says they are the Figma desktop frame sizes; the TODO in home.ts calls them display hints to replace after export. Which is right: unknown.
- The width goes to the image through the CSS variable `--logo-w`. Desktop shows it at `--logo-w`; tablet and mobile show it at 0.6x (`calc(var(--logo-w) * 0.6)`).
- Each logo sits in a fixed cell: 200 x 85 on desktop, 120 x 64 on tablet and mobile. Logos are centered in their cell.
- `invert: true` (Dailyhunt only) applies `brightness-0 invert` to turn the logo white, as in Figma.
- Order follows the Figma strip: Times of India, The Hindu, Karnataka Today, The Indian Express, Kannada Prabha, Vartha Bharati, Prajavani, Dailyhunt.

### Marquee behavior

- Two identical sets in one track. The track moves from translateX(0) to translateX(-50%), linear, infinite, right to left.
- Gap between cells: 30px desktop, 10px tablet and mobile. Gap between the two sets: 40px on desktop (second set starts at 1850), none on tablet and mobile (starts at 1030).
- Viewport: 1372 wide on desktop (xl:max-w-343), full container width below (648 tablet, 385 mobile); 85px tall on desktop, 68px below.
- Duration in code: 9s below xl, 15.5s at xl (about 115px per second). The value is an estimate by eye. The real value is in the Figma prototype interaction. Direction of the two values is unconfirmed (see Open TODOs).
- The copy set is `aria-hidden`; its images have empty alt. The original set has `aria-label` from `logosLabel`.
- Reduced motion: no animation, the copy set is hidden, and the viewport scrolls by hand (`overflow-x-auto`).
- No pause on hover or focus in the code.

### Proudly Featured layout (src/components/sections/home/ProudlyFeatured.tsx)

- Section padding (Figma): top 60 / 40 / 30, bottom 40 / 40 / 30 (desktop / tablet / mobile); side padding 0 / 60 / 20.
- Classes: `pt-13.75 pb-7.5 md:pt-21.25 md:pb-10 xl:pt-15`. Mobile top 55 = 30 + 25 and tablet top 85 = 40 + 45 (the extra is the y offset from the Hero end).
- Inner frame: desktop 1418 wide (xl:max-w-354.5) and fixed 256 tall (xl:h-64), gap 24; tablet gap 50; mobile gap 40.
- Subtitle: 389 wide in Figma, 5px wider than its 384 frame. `-mx-1.25` keeps it on one line at 425 and 768.
- Heading id `featured-heading`; the section uses `aria-labelledby`.

### Hero behavior (src/components/sections/home/Hero.tsx)

- Section minimum height: mobile 549px (min-h-137.25), tablet 585px (min-h-146.25), desktop 750px (min-h-187.5). (Older notes said "fixed height"; the code uses min-h.)
- Background video: autoPlay, muted, loop, playsInline, preload="metadata", poster set. Rendered by HeroVideo ("use client").
- Reduced motion (usePrefersReducedMotion): video replaced by the poster via next/image (fill, priority, sizes 100vw). The server snapshot of the hook is false, so the server always renders the video branch first.
- Mobile (below md): 60% black overlay on top of the video. Hidden from md.
- Desktop (xl): video is 40px wider and 45px taller than the frame (bleed) and is clipped by the wrapper. object-cover, object-center.
- Fade strip: absolute, 95px tall (h-23.75), -50px bottom offset (spills into the next section), bg-page-gradient, blur 20px, aria-hidden, pointer-events-none. Same on all viewports; tablet and mobile NOT verified against Figma.
- Content: Container padding "page". Top padding: mobile 116px, tablet 114px, desktop 129px (desktop measured, others estimated). Text column max width: tablet 376px (max-w-94), desktop 760px (max-w-190).
- Eyebrow (HeroEyebrow): 3px light bar + Om icon + uppercase Mirza tagline in gold. Om pulse: width-changing animation below xl, scale animation at xl, none with reduced motion.
- H1: `<Heading as="h1" size="hero" font="heading" color="gold">`, id "hero-heading" (section uses aria-labelledby). Line breaks come from data (`breakAfter`): desktop 3 lines, tablet 4 lines, mobile wraps naturally.
- Description: Text weight medium with `type-body-small`. text-light on mobile/tablet, white at xl.
- Two CTAs (Button size "hero", 40px high, 48px at xl): "Book a Consultation" to /consultation (variant outline-accent); "Explore Courses" to /courses (variant accent, ArrowCircle on the right, shadow-none). Mobile: two equal halves that wrap if they cannot fit. Min widths: tablet 183 / 176px, desktop 202 / 197px.

### Video and asset paths

- Video: `/videos/hero-planets.mp4` (public/videos/hero-planets.mp4). File size: unknown.
- Poster: `/images/home/hero/hero-poster.jpg`.
- Om icon: `/icons/om.svg` (28.16 x 29.62).
- Section ornament: `/icons/section-ornament.svg` (362 x 32.76). Divider ornament: `/icons/ornament.svg` (120 x 11.41).
- Proudly Featured logos in `/images/home/proudly-featured/`: times-of-india.png, the-hindu.png, karnataka-today.png, the-indian-express.png, kannada-prabha.png, vartha-bharati.png, prajavani.png, dailyhunt.png. Real pixel sizes: unknown.
- Other assets: `/images/layout/logo.png`, `/images/shared/menu-bg.png`, Lato woff2 files in `/fonts/`.
- Content lives in `src/data/home.ts` (`heroContent`, `featuredContent`), `src/data/navigation.ts`, `src/data/site.ts`.

### Stack facts from the code

- Next 16.4.3 (dev and build use --webpack), React 19.3.0, Tailwind v4 via @tailwindcss/postcss, cva + clsx + tailwind-merge, pnpm 12.16.1, Node >= 22.
- tsconfig: strict, noUncheckedIndexedAccess, alias @/* to src/*.

## Gotchas

- Image checks: run `file` on every exported image. A 1x1 PNG is a placeholder.
- After replacing an image, stop the dev server, delete `.next` and restart; otherwise the old image can stay cached.
- `layout/index.ts` exports only Container, Section, Logo, Navbar. NavLinks, MenuToggleButton and MobileMenu are imported by relative path inside layout/. `sections/home/index.ts` exports Hero and ProudlyFeatured only (HeroEyebrow and HeroVideo are not exported). `shared/index.ts` exports all five shared components.
- `useScrolled` is exported but no Part 3 file uses it (no navbar scroll styling). Logo has no `variant` prop. MobileMenu takes `isActive` from the Navbar.
- Hero comments and classes disagree: the eyebrow comment says tablet 19 / mobile 15px but classes give 20 / 16px; the H1-to-paragraph comment says ~8 (tablet) / ~58 (mobile) but classes give 11 / 52px; the top-offset comment says mobile ~117 but the class gives 116px. Unknown which is intended.
- MobileMenu has two conflicting comments about the background image opacity ("not read yet" vs "baked into the image").
- Button in link mode (`href` set) only passes href, target, rel and className. `ref`, `onClick` and aria props are dropped.
- `siteConfig.login.href` uses `??`. If NEXT_PUBLIC_LMS_URL is set to an empty string (as in .env.example), href becomes "" and Button renders a plain `<button>`, not a link.
- Heading, Text and Icon color variants use old hex values that differ from the verified tokens (accent #ffd795 vs #ffd8a2, primary #675275 vs #655373, secondary #faeed4 vs #fff0db). Raw hex also remains in Button, Card, Badge, Input and Section. SectionHeading avoids this by using the `text-accent` class.
- `type-section-title` uses `text-box-trim`, which needs Chrome 133+ / Safari 18.2+. In other browsers the title box on mobile and tablet is just taller.
- Unverified risk: tailwind-merge may not know custom utilities (text-h1 to text-h5, type-*). It may drop `text-h1` when a `text-*` color class follows. Not tested.
- `featuredContent.logosLabel` reads "Teejaswinni" (double n); the rest of the project uses "Teejaswini". Not fixed.
- Lovelace Text is not loaded; Libre Baskerville is the stand-in, with -0.01em tracking on the hero H1 to match measured widths.
- Prettier uses 2-space indentation.
- AGENTS.md: this Next.js version has breaking changes; read node_modules/next/dist/docs/ before writing Next-specific code.
- Carried over from the old PROGRESS.md (not derivable from code): the editor shows about 12 warnings in globals.css (probably the CSS linter not knowing Tailwind v4 at-rules); the navbar took about 4 hours, so always get the Figma properties panel first; Claude accounts hit limits, so restart in a new account using HANDOFF.md.
- Not visible in Part 3, so unknown: src/app/design-system/page.tsx, .nvmrc, ESLint and Prettier configs, and the old text of docs/MASTER_PROMPT.md and docs/PROGRESS.md.

## Open TODOs

- Confirm the marquee duration. The code has 9s below xl and 15.5s at xl. The Figma prototype interaction holds the real value; the speed is an estimate.
- Build the WhatsApp floating button (visible in every Figma frame). Number, link and position: unknown.
- Verify the Hero fade strip on tablet and mobile against Figma.
- Hero (estimated, not measured): tablet and mobile top offset, H1-to-paragraph gap, CTA widths and CTA height; tablet/mobile eyebrow size. Om animation timing assumed.
- Proudly Featured: find out what the remaining ~5% difference from Figma is; confirm per-logo width/height are Figma frame sizes (see home.ts TODO); fix the "Teejaswinni" typo in `logosLabel` after confirming.
- Fonts: supply Lovelace Text files, then load with next/font/local and drop the Libre Baskerville stand-in.
- globals.css: card gradient stops; Territory, Dark, Text, Card color, Cards, Light Bg tokens; Gradient style angle and stop positions; replace `bg-hero-gradient` (used by Section bg="hero") with `bg-page-gradient`.
- ui primitives (Badge, Button, Card, Heading, Icon, Input, Text): radius, colors, sizes, paddings, hover/active states and font bindings are all marked TODO(figma).
- layout: Container narrow/wide widths and "normal" padding steps; Section spacing scale and muted bg; Logo tablet (100) and mobile (80) sizes; NavLinks hover state; MobileMenu Frame 108 opacity and the assumed 24px gap; ArrowCircle caret vector.
- TODO(client): confirm planned routes in navigation.ts; confirm the LMS login path in site.ts.
- Decide whether to wire `useScrolled` into the Navbar or remove it.

## OPEN TODOs (auto-generated from the code)

Append the output of the TODO scan here (line numbers go stale, regenerate each time).