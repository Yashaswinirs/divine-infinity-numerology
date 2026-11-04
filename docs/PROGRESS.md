# PROGRESS (update after every finished section)

Last updated: 4 Nov 2026

## Status (Home page)

| Item                                  | Status      |
| ------------------------------------- | ----------- |
| Navbar (desktop, tablet, mobile menu) | Done        |
| 1 Hero                                | Done        |
| 2 Proudly Featured                    | Not started |
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

Hero note: desktop values are measured. Several tablet and mobile values are estimated (see Open TODOs).

## Decisions

### Layout and spacing

- Spacing uses the Tailwind v4 numeric scale = Figma px / 4 (example: pt-32.25 = 129px).
- Page background: `bg-page-gradient` on `<body>` (src/app/layout.tsx). `body` also gets `background-color: var(--color-gradient-stop-5)` in globals.css.
- Container `padding="page"` = px-5 md:px-15 xl:px-20 (20 / 60 / 80px). Default container max width is 1440px.
- Hero sections are full-bleed: `<Section container={false} spacing="none">` with an inner `<Container padding="page">`.

### Breakpoints

- Defined in globals.css: `--breakpoint-2xl: 90rem` (1440px) only.
- `md` and `xl` are used by the Navbar, MobileMenu and Hero. Their px values are NOT defined in globals.css: unknown from the code (Tailwind defaults would be 768 / 1280, unverified).
- `2xl` is used in NavLinks (gap-11.25). Older ui primitives (Container "normal" padding, Section, Card, Input) also use sm and lg.
- Desktop layout switches at `xl`; the mobile menu is hidden at `xl` and above; nav links show from `xl`.

### Tokens in src/styles/globals.css

Verified from Figma (per file comments):

| Token | Value |
| --- | --- |
| --color-primary | #655373 |
| --color-secondary | #fff0db |
| --color-accent | #ffd8a2 |
| --color-light | #ececec |
| --color-gradient-stop-1 to -5 | #090d22, #2a1845, #1a1440, #0b1333, #040817 |
| --spacing-nav-y-sm / -md / -xl | 23px / 20px / 30px |
| --breakpoint-2xl | 90rem |

Added for the Hero (names are ours, Figma shows no style name):

| Token | Value |
| --- | --- |
| --color-gold | #fdbb5d |
| --color-primary-dark | #3e2066 |
| --blur-hero-fade | 20px (Figma layer blur 40) |
| --animate-om-pulse-shift | om-pulse-shift 3s ease-in-out infinite (width 1.76rem to 1.32rem, opacity 1 to 0.55, gold drop-shadow 6px) |
| --animate-om-pulse | om-pulse 3s ease-in-out infinite (scale 1 to 0.75, opacity 1 to 0.55). Timing assumed (TODO) |
| --font-eyebrow | Mirza 700 (via --font-eyebrow-loaded) |
| utility type-hero-h1 | 30.43/35 mobile, 35/40 from md, 54.93/70.4 from xl (px) |
| utility type-hero-eyebrow | Mirza 700 uppercase, line-height 1; 16px mobile, 20px md, 26px xl |
| utility type-btn-large | 16px, line-height 1 |

Present but NOT verified (TODO(figma)); the step in which each was added is unknown:

| Token | Value |
| --- | --- |
| --color-territory | #8061a5 |
| --color-dark | #1e1633 |
| --color-text-muted | #8c8c8c |
| --color-card-solid | #3c2657 |
| --color-bg-light | #f8f6fb |
| --color-card-gradient-start / -end (in :root) | #2b1f51 / #482857 |

Other tokens and utilities:
- Fonts: `--font-sans` and `--font-lato` = Lato (local 400/500/700). `--font-heading` = "Lovelace Text", then Libre Baskerville 400 (stand-in), Georgia, serif.
- Fluid heading tokens in :root: `--font-size-h1` to `-h5`, `--line-height-h1`, `-h2`, `-h4`, `-h5` (clamp values). Used by `text-h1` to `text-h5`.
- Other utilities: `type-body-small` (16px / 22.2px, letter-spacing 0.01em), `type-h5-t`, `bg-card-gradient`, `bg-page-gradient` (180deg, angle and positions unconfirmed), `bg-hero-gradient` (old placeholder with raw hex).

### Hero behavior (src/components/sections/home/Hero.tsx)

- Fixed section height: mobile 549px (h-137.25), tablet 585px (h-146.25), desktop 750px (h-187.5).
- Background video: autoPlay, muted, loop, playsInline, preload="metadata", poster set. Rendered by HeroVideo ("use client").
- Reduced motion (usePrefersReducedMotion): video replaced by the poster via next/image (fill, priority, sizes 100vw). The server snapshot of the hook is false, so the server always renders the video branch first.
- Mobile (below md): 60% black overlay on top of the video. Hidden from md.
- Desktop (xl): video is 40px wider and 45px taller than the frame (bleed) and is clipped by the wrapper. object-cover, object-center.
- Fade strip: absolute, 95px tall (h-23.75), -50px bottom offset (spills into the next section), bg-page-gradient, blur 20px, aria-hidden, pointer-events-none. Same on all viewports; tablet/mobile not measured.
- Content: Container padding "page". Top padding: mobile 116px, tablet 114px, desktop 129px (desktop measured, others estimated). Text column max width: tablet 376px (max-w-94), desktop 760px (max-w-190).
- Eyebrow (HeroEyebrow): 3px light bar + Om icon + uppercase Mirza tagline in gold. Om pulse: width-changing animation below xl, scale animation at xl, none with reduced motion.
- H1: `<Heading as="h1" size="hero" font="heading" color="gold">`, id "hero-heading" (section uses aria-labelledby). Line breaks come from data (`breakAfter`): desktop 3 lines, tablet 4 lines, mobile wraps naturally.
- Description: Text weight medium with `type-body-small`. text-light on mobile/tablet, white at xl.
- Two CTAs (Button size "hero", 40px high, 48px at xl): "Book a Consultation" to /consultation (variant outline-accent); "Explore Courses" to /courses (variant accent, ArrowCircle on the right, shadow-none). Mobile: two equal halves that wrap if they cannot fit. Min widths: tablet 183 / 176px, desktop 202 / 197px.

### Video and asset paths

- Video: `/videos/hero-planets.mp4` (public/videos/hero-planets.mp4). File size: unknown.
- Poster: `/images/home/hero/hero-poster.jpg`.
- Om icon: `/icons/om.svg` (28.16 x 29.62).
- Other assets: `/icons/ornament.svg`, `/images/layout/logo.png`, `/images/shared/menu-bg.png`, Lato woff2 files in `/fonts/`.
- Content lives in `src/data/home.ts` (`heroContent`), `src/data/navigation.ts`, `src/data/site.ts`.

### Stack facts from the code

- Next 16.4.3 (dev and build use --webpack), React 19.3.0, Tailwind v4 via @tailwindcss/postcss, cva + clsx + tailwind-merge, pnpm 12.16.1, Node >= 22.
- tsconfig: strict, noUncheckedIndexedAccess, alias @/* to src/*.

## Gotchas

- The "WHAT IS ALREADY BUILT" text in MASTER_PROMPT was outdated. In the code: Logo has no `variant` prop; MobileMenu takes `isActive` from the Navbar; `useScrolled` is exported but no Part 3 file uses it (no navbar scroll styling visible); the menu image is menu-bg.png.
- `layout/index.ts` exports only Container, Section, Logo, Navbar. NavLinks, MenuToggleButton and MobileMenu are imported by relative path inside layout/. `sections/home/index.ts` exports only Hero.
- Comments and classes disagree in the Hero: eyebrow comment says tablet 19 / mobile 15px but classes give 20 / 16px; H1-to-paragraph comment says ~8 (tablet) / ~58 (mobile) but classes give 11 / 52px. Unknown which is intended.
- MobileMenu has two conflicting comments about the background image opacity ("not read yet" vs "baked into the image").
- Button in link mode (`href` set) only passes href, target, rel and className. `ref`, `onClick` and aria props are dropped.
- `siteConfig.login.href` uses `??`. If NEXT_PUBLIC_LMS_URL is set to an empty string (as in .env.example), href becomes "" and Button renders a plain `<button>`, not a link.
- Heading, Text and Icon color variants use old hex values that differ from the verified tokens (accent #ffd795 vs #ffd8a2, primary #675275 vs #655373, secondary #faeed4 vs #fff0db). Raw hex also remains in Button, Card, Badge, Input and Section.
- Unverified risk: tailwind-merge may not know custom utilities (text-h1 to text-h5, type-*). It may drop `text-h1` when a `text-*` color class follows. Not tested.
- Lovelace Text is not loaded; Libre Baskerville is the stand-in, with -0.01em tracking on the hero H1 to match measured widths.
- AGENTS.md: this Next.js version has breaking changes; read node_modules/next/dist/docs/ before writing Next-specific code.
- Carried over from the old PROGRESS.md (not derivable from code): the editor shows about 12 warnings in globals.css (probably the CSS linter not knowing Tailwind v4 at-rules); the navbar took about 4 hours, so always get the Figma properties panel first; Claude accounts hit limits, so restart in a new account using HANDOFF.md.
- Not visible in Part 3, so unknown: src/app/design-system/page.tsx, docs/MASTER_PROMPT.md and docs/PROGRESS.md current text, .nvmrc, ESLint and Prettier configs.

## Open TODOs

Tag counts come from the Part 3 code; line numbers are left out because they go stale.

- Hero (estimated, not measured): tablet/mobile fade strip; tablet and mobile top offset, H1-to-paragraph gap, CTA widths and CTA height; tablet/mobile eyebrow size. Om animation timing assumed.
- Fonts: supply Lovelace Text files, then load with next/font/local and drop the Libre Baskerville stand-in.
- globals.css: card gradient stops; Territory, Dark, Text, Card color, Cards, Light Bg tokens; Gradient style angle and stop positions; replace `bg-hero-gradient` (used by Section bg="hero") with `bg-page-gradient`.
- ui primitives (Badge, Button, Card, Heading, Icon, Input, Text): radius, colors, sizes, paddings, hover/active states and font bindings are all marked TODO(figma).
- layout: Container narrow/wide widths and "normal" padding steps; Section spacing scale and muted bg; Logo tablet (100) and mobile (80) sizes; NavLinks hover state; MobileMenu Frame 108 opacity and the assumed 24px gap; ArrowCircle caret vector.
- TODO(client): confirm planned routes in navigation.ts; confirm the LMS login path in site.ts.
- Decide whether to wire `useScrolled` into the Navbar or remove it.