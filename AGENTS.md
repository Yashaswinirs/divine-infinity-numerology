<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Reusable Component Rules (Non-Negotiable)

1. **Check Before Building**: Always verify if a similar component exists in `src/components/ui/` or `src/components/layout/`. Reuse or extend; never duplicate.
2. **Component Granularity**: Any element appearing (or potentially appearing) more than once is an extracted primitive (`Button`, `Container`, `Section`, `Heading`, `Text`, `Badge`, `Card`, `Icon`, `Input`).
3. **Props & Variants**: Control visual variants via `cva` and `cn()` props (`variant`, `size`, `fullWidth`, `disabled`, `asChild`, `href`). Never copy-paste components with minor style tweaks.
4. **Zero Hardcoded Design Values**: All colors, font families, font sizes, line heights, radii, and shadows must use defined design tokens (Tailwind theme variables).
5. **Content Separation**: UI components are purely presentational. All copy, lists, navigation items, and media references live in typed data files inside `src/data/*.ts`.
6. **Strict Types & Semantic HTML**: Every component must expose a strongly-typed props interface, provide sensible defaults, accept `className` overrides, and use semantic, accessible HTML.
7. **Server Components by Default**: All components run on the server unless interactivity is strictly required (`"use client"` pushed as far down the tree as possible).
8. **Single Export Pattern**: One component per file; each component directory exports cleanly through an `index.ts` barrel.
9. **Tokens on Demand**: Do NOT invent design tokens. If a color, size, radius, or font is not confirmed from Figma, add a `// TODO(figma): <description>` comment inline and use the closest existing token as a placeholder. Never silently invent values.

## Responsive Design Rules

- **Mobile-First CSS**: Styles are written mobile-first (`base -> sm -> md -> lg -> xl -> 2xl`).
- **Concurrent 3-Viewport Development**: Desktop, tablet, and mobile layouts are built and verified simultaneously.
- **Reference Breakpoints & Test Widths**:
  - `320px` (Minimum mobile)
  - `375px` (Standard mobile)
  - `425px` (Large mobile)
  - `768px` (Tablet)
  - `1024px` (Small desktop / iPad Pro)
  - `1280px` (Desktop)
  - `1440px` (Measurement master desktop)

## Frozen Pages & Components (STRICT - DO NOT MODIFY)

The following pages, sections, and supporting components have been completed, verified against Figma designs across all viewports (Mobile, Tablet, Desktop 1440px), and are **PERMANENTLY FROZEN**. Under NO circumstances should any agent make changes, edits, refactoring, or adjustments to these pages, their components, or their data unless the user explicitly requests changes to them:

1. **About Us Page (`/about`)**:
   - Route: [`src/app/(public)/about/page.tsx`](file:///d:/Workspace/divine-infinity-numerology/src/app/(public)/about/page.tsx)
   - Components: All sections in `src/components/sections/about-us/` (`AboutHero`, `AboutTejaswini`, `AboutHeroTransition`, `PathOfLearning`, `BuildingStrongFoundation`, `Certificates`, `Recognition`, `AreasOfExpertise`, `RecognisedForExcellence`), `StatsRow`, `StatNumber`
   - Data: `src/data/about.ts`, `src/data/learning-path.ts`, `src/data/building-foundation.ts`, `src/data/certificates.ts`, `src/data/recognition.ts`, `src/data/areas-of-expertise.ts`, `src/data/recognised-for-excellence.ts`
   - Features:
     - Hero Section (`AboutHero.tsx`): Responsive 3-viewport fluid clamp specs (572px @425 -> 383px @768 -> 574px @1440) and compass scale (`1.68` mobile, `1.34` tablet, `1.0` desktop).
     - About Teejaswinni Section: Milestone stats numbers styled with `font-heading` (`Lovelace Text` 400 Regular) matching the Recognition section title.
     - Centered `AboutHeroTransition` transition strip.

2. **Blogs Index Page (`/blogs`)**:
   - Route: [`src/app/(public)/blogs/page.tsx`](file:///d:/Workspace/divine-infinity-numerology/src/app/(public)/blogs/page.tsx)
   - Components: `BlogsHero`, `BlogsHeroTransition`, `FeaturedTopicsSection`, `BlogGridWithFilter`, `CategoryFilterPills` in `src/components/sections/blogs/`

3. **Blog Inner Page (`/blogs/[slug]`)**:
   - Route: [`src/app/(public)/blogs/[slug]/page.tsx`](file:///d:/Workspace/divine-infinity-numerology/src/app/(public)/blogs/[slug]/page.tsx)
   - Components: `BlogInnerSection`, `FeaturedReadsSection`, `BlogCard` in `src/components/sections/blogs/`
   - Data: `src/data/blogs.ts`

4. **Shared Components & Layout**:
   - Header & Navigation: `src/components/layout/Navbar.tsx` (verified for all viewports across all active routes)
   - Pre-Footer CTA: `src/components/shared/CtaBanner.tsx` and `src/data/cta-banner.ts`
   - Section Ornaments: `src/components/shared/SectionOrnament.tsx`
   - WhatsApp Floating Button: `src/components/shared/WhatsAppButton.tsx`
   - Associated fluid responsive styles in `src/styles/globals.css`

5. **Free Numerology Calculators Page (`/free-calculator`)**:
   - Route: [`src/app/(public)/free-calculator/page.tsx`](file:///d:/Workspace/divine-infinity-numerology/src/app/(public)/free-calculator/page.tsx)
   - Components: All sections in `src/components/sections/free-calculator/` (`FreeCalculatorHero`, `ChooseYourCalculator`, `FreeCalculatorDeeperMeaning`, `CalculatorDetailsModal`)
   - Data: `src/data/free-calculator.ts`
   - Features:
     - Hero with focal position and zoom controls.
     - Blurry transition strip spanning across the Hero background image and the page gradient without overlaying content.
     - "Choose Your Calculator" card with mobile, tablet, and desktop layouts.
     - "Every Number Has a Deeper Meaning" dual-column desktop / single-column mobile CSS grid.
     - Interactive Life Path Number details popup modal (`CalculatorDetailsModal`) portaled to `document.body` with 80% device height auto-scaling and responsive 425 mobile typography (`20.91px / 29.1px`).
     - Continuous page background gradient enclosing and ending with `CtaBanner`.

6. **Horoscope Page (`/horoscope`)**:
   - Route: [`src/app/(public)/horoscope/page.tsx`](file:///d:/Workspace/divine-infinity-numerology/src/app/(public)/horoscope/page.tsx)
   - Components: All sections in `src/components/sections/horoscope/` (`HoroscopeHero`, `ChooseYourZodiacSign`, `ZodiacDetailPanel`, `ZodiacHoroscopeContent`, `WhatYouWillFind`, `WhyFollowYourHoroscope`)
   - Data: `src/data/horoscope.ts`
   - Features:
     - Hero with desktop (1440px), small desktop (1024px), tablet (768px), and mobile (<768px) wheel controls and fluid background positioning.
     - Blurry rectangle transition spanning across Hero and gradient page body.
     - Choose Your Zodiac Sign interactive grid with `ZodiacDetailPanel` (tabbed Horoscope periods Daily/Weekly/Monthly/Yearly, Sign Identity, Attributes, and Lucky Info footer strip scaling down cleanly on 375px and 320px).
     - What You Will Find interactive astrological zodiac wheel diagram with dynamic SVG connector lines and uniform vertical spacing across all viewports.
     - Why Follow Your Horoscope section with stacked tablet/mobile layout and side-by-side desktop grid.
     - Continuous page background gradient concluding with `CtaBanner`.

7. **Footer Component & Supporting Sub-components**:
   - Components: `src/components/shared/Footer.tsx`, `FooterBgAdjuster.tsx`, `FooterBottomBar.tsx`, `FooterContactColumn.tsx`, `FooterCourseColumn.tsx`, `FooterLinkColumn.tsx`, `FooterSocialSection.tsx`
   - Data: `src/data/footer.ts`
   - Features:
     - Desktop master (1440px) frozen layout with bottom-anchored background image and gradient overlay (`zoom: 1.38`, `shiftX: +200px`, `shiftY: +15px`).
     - Tablet (768px) exact Figma layout with 2-block structure, 3-column links/contact row, centered bottom branding with bottom-only separator, and red heart credit (`zoom: 3.75`, `shiftX: -21px`, `shiftY: +13px`).
     - Mobile (425px, 375px, 320px) responsive layout with side-by-side Quick Links & Secondary Links, fluid scaling for Brand logo/name and social icons down to 320px without screen overflow (`zoom: 6.30`, `shiftX: -160px`, `shiftY: -306px`).
     - Unified continuous fluid background image layer (`FooterBgAdjuster`) seamlessly interpolating across all intermediate viewports (including 768px, 786px, 1024px, 1280px) with zero breakpoint jumps or pops.

8. **404 Not Found Page (`/404` and `not-found.tsx`)**:
   - Routes: [`src/app/not-found.tsx`](file:///d:/Workspace/divine-infinity-numerology/src/app/not-found.tsx), [`src/app/(public)/404/page.tsx`](file:///d:/Workspace/divine-infinity-numerology/src/app/(public)/404/page.tsx)
   - Components: `src/components/sections/not-found/NotFoundSection.tsx`
   - Data: `src/data/not-found.ts`
   - Features:
     - Uses Blogs Navbar on Desktop (top 28px) and Tablet/Mobile (50x50 round Logo-2 with hamburger menu).
     - 404 artwork image anchored in the background layer (`translateY(20px) scale(1.2)` on mobile, `translateY(60px) scale(1.1)` on tablet, `translateY(42px) scale(1.0)` on desktop).
     - Background gradient tilted 45° anticlockwise (`135deg`: `linear-gradient(135deg, var(--color-gradient-stop-1) ...)`).
     - Action buttons styled with circular chevron badges (`>` inside a 28px-30px rounded circle matching Hero & CTA Banner styling).
     - Fluid typography, line heights, and padding compliant with `FLUID_RESPONSIVE_README.md`.
     - Zero extra empty space between section and footer on tablet.
     - Attached to frozen `<Footer />`.

