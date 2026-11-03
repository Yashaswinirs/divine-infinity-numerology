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
