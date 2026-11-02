# Divine Infinity Numerology — Public Website

Production-grade public website for the **Divine Infinity Numerology** Learning Management System (LMS), architected with Next.js App Router, TypeScript, and Tailwind CSS.

---

## Getting Started

### Prerequisites

- **Node.js**: `22.x` (pinned via `.nvmrc` and `engines`)
- **Package Manager**: `pnpm` (`>= 12.0.0`)

### Installation & Development

```bash
# Install dependencies
pnpm install

# Start local development server
pnpm dev

# Build for production
pnpm build

# Run ESLint validation
pnpm lint
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Codebase Architecture & Folder Structure

```
divine-infinity-numerology/
├── public/                 # Static assets
│   ├── images/             # Photographic assets, illustrations
│   ├── icons/              # UI icons and symbols
│   └── fonts/              # Custom web fonts (if self-hosted)
├── src/
│   ├── app/                # App router routes and route groups
│   │   ├── (public)/       # Public website route group
│   │   │   └── page.tsx    # Home page
│   │   ├── layout.tsx      # Root HTML layout & metadata
│   │   └── not-found.tsx   # Custom 404 page
│   ├── components/         # Reusable presentation layer
│   │   ├── ui/             # Core primitives (Button, Heading, Card, etc.)
│   │   ├── layout/         # Structural components (Container, Section, Navbar, Footer)
│   │   ├── sections/       # Page-specific assembled sections (home/, about/, etc.)
│   │   └── shared/         # Composed reusable multi-primitive widgets
│   ├── data/               # Typed content and static configuration files
│   ├── hooks/              # Custom reusable React hooks
│   ├── lib/                # Utility functions (cn.ts, constants)
│   ├── styles/             # Global CSS, theme layers, and custom utilities
│   └── types/              # Shared TypeScript definitions
├── .env.example            # Template for environment variables
├── .nvmrc                  # Node version definition
├── eslint.config.mjs       # ESLint 9 flat configuration
├── next.config.ts          # Next.js compiler and build configuration
├── package.json            # Pinned dependencies, engines, and scripts
├── pnpm-lock.yaml          # Deterministic dependency lockfile
└── tsconfig.json           # Strict TypeScript configuration
```

---

## Core Component Principles (Non-Negotiable)

1. **Check Before Building**: Always verify if a similar component exists in `src/components/ui/` or `src/components/layout/`. Reuse or extend; never duplicate.
2. **Component Granularity**: Any element appearing (or potentially appearing) more than once is an extracted primitive (`Button`, `Container`, `Section`, `Heading`, `Text`, `Badge`, `Card`, `Icon`, `Input`).
3. **Props & Variants**: Control visual variants via `cva` and `cn()` props (`variant`, `size`, `fullWidth`, `disabled`, `asChild`, `href`). Never copy-paste components with minor style tweaks.
4. **Zero Hardcoded Design Values**: All colors, font families, font sizes, line heights, radii, and shadows must use defined design tokens (Tailwind theme variables).
5. **Content Separation**: UI components are purely presentational. All copy, lists, navigation items, and media references live in typed data files inside `src/data/*.ts`.
6. **Strict Types & Semantic HTML**: Every component must expose a strongly-typed props interface, provide sensible defaults, accept `className` overrides, and use semantic, accessible HTML.
7. **Server Components by Default**: All components run on the server unless interactivity is strictly required (`"use client"` pushed as far down the tree as possible).
8. **Single Export Pattern**: One component per file; each component directory exports cleanly through an `index.ts` barrel.

---

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

---

## Naming & Code Conventions

- **Components**: PascalCase (e.g., `PrimaryButton.tsx`, `Container.tsx`)
- **Utilities & Hooks**: camelCase (e.g., `cn.ts`, `useMediaQuery.ts`)
- **Directories**: kebab-case (e.g., `design-system/`, `core-primitives/`)
- **Strict Quality**: No `any` types, no magic numbers, no inline styles, no unused imports or variables.
