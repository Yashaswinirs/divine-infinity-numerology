import type { Metadata } from "next";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Heading,
  Icon,
  Input,
  Text,
} from "@/components/ui";
import { Container, Section } from "@/components/layout";

export const metadata: Metadata = {
  title: "Design System & Core UI Primitives | Divine Infinity Numerology",
  description:
    "Production-grade token master and reusable UI primitives showcase with complete variants.",
};

const COLOR_TOKENS = [
  {
    name: "Primary",
    hex: "#675275",
    rgb: "rgb(103, 82, 117)",
    bgClass: "bg-[#675275]",
    textClass: "text-white",
  },
  {
    name: "Secondary",
    hex: "#faeed4",
    rgb: "rgb(250, 238, 212)",
    bgClass: "bg-[#faeed4]",
    textClass: "text-[#1e1633]",
  },
  {
    name: "Accent",
    hex: "#ffd795",
    rgb: "rgb(255, 215, 149)",
    bgClass: "bg-[#ffd795]",
    textClass: "text-[#1e1633]",
  },
  {
    name: "Territory",
    hex: "#8061a5",
    rgb: "rgb(128, 97, 165)",
    bgClass: "bg-[#8061a5]",
    textClass: "text-white",
  },
  {
    name: "Dark",
    hex: "#1e1633",
    rgb: "rgb(30, 22, 51)",
    bgClass: "bg-[#1e1633]",
    textClass: "text-white",
  },
  {
    name: "Light",
    hex: "#ffffff",
    rgb: "rgb(255, 255, 255)",
    bgClass: "bg-white border border-neutral-200",
    textClass: "text-[#1e1633]",
  },
  {
    name: "Text (Muted)",
    hex: "#8c8c8c",
    rgb: "rgb(140, 140, 140)",
    bgClass: "bg-[#8c8c8c]",
    textClass: "text-white",
  },
  {
    name: "Cards (Solid)",
    hex: "#3c2657",
    rgb: "rgb(60, 38, 87)",
    bgClass: "bg-[#3c2657]",
    textClass: "text-white",
  },
  {
    name: "Light Bg",
    hex: "#f8f6fb",
    rgb: "rgb(248, 246, 251)",
    bgClass: "bg-[#f8f6fb] border border-neutral-200",
    textClass: "text-[#1e1633]",
  },
];

// Sample icons (inline accessible SVGs)
const SparkleIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
  </svg>
);

const ArrowRightIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const SearchIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const CalendarIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-[#faf8fc] pb-24 text-[#1e1633]">
      {/* Sticky Viewport Header */}
      <div className="sticky top-0 z-50 border-b border-[#e5dff0] bg-white/90 px-4 py-3 backdrop-blur-md sm:px-8">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          <div>
            <span className="font-mono text-xs font-bold tracking-wider text-[#8061a5] uppercase">
              Divine Infinity Numerology
            </span>
            <span className="mx-2 text-xs text-neutral-400">/</span>
            <span className="text-xs font-medium text-neutral-600">
              Design System & UI Primitives
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[#e5dff0] bg-[#f8f6fb] px-3 py-1 font-mono text-xs">
            <span className="text-neutral-500">Viewport:</span>
            <span className="font-bold text-[#8061a5]">
              <span className="inline sm:hidden">Mobile (&lt;640px)</span>
              <span className="hidden sm:inline md:hidden">Mobile L (≥640px)</span>
              <span className="hidden md:inline lg:hidden">Tablet (≥768px)</span>
              <span className="hidden lg:inline xl:hidden">Laptop (≥1024px)</span>
              <span className="hidden xl:inline 2xl:hidden">Desktop (≥1280px)</span>
              <span className="hidden 2xl:inline">Master (≥1440px)</span>
            </span>
          </div>
        </div>
      </div>

      <Container className="space-y-20 pt-10">
        {/* Intro */}
        <div>
          <Heading as="h1" size="h1" color="dark">
            Design Tokens & UI Primitives
          </Heading>
          <Text variant="body-lg" color="muted" className="mt-2 max-w-3xl">
            Single source of truth. Every primitive is built with typed variants using{" "}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs">cva</code>,{" "}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs">cn()</code>,
            and Figma design tokens.
          </Text>
        </div>

        {/* 1. Color Palette */}
        <section className="space-y-6">
          <Heading as="h2" size="h3" color="dark">
            1. Color Tokens
          </Heading>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {COLOR_TOKENS.map((token) => (
              <div
                key={token.name}
                className="overflow-hidden rounded-xl border border-[#e5dff0] bg-white shadow-2xs"
              >
                <div className={`h-24 w-full ${token.bgClass} flex items-end p-2.5`}>
                  <span className="rounded bg-black/30 px-1.5 py-0.5 font-mono text-[11px] text-white backdrop-blur-xs">
                    {token.hex}
                  </span>
                </div>
                <div className="p-3">
                  <div className="truncate text-xs font-semibold text-[#1e1633]">{token.name}</div>
                  <div className="truncate font-mono text-[11px] text-[#8c8c8c]">{token.rgb}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Heading Primitives */}
        <section className="space-y-6">
          <Heading as="h2" size="h3" color="dark">
            2. Heading Primitive (`&lt;Heading /&gt;`)
          </Heading>
          <div className="space-y-6 divide-y divide-neutral-100 rounded-2xl border border-[#e5dff0] bg-white p-6 shadow-2xs sm:p-8">
            <div className="space-y-1">
              <span className="font-mono text-xs text-[#8061a5]">
                size=&quot;h1&quot; (Clamp 36.7px → 42.9px)
              </span>
              <Heading as="h1" size="h1" color="dark">
                Divine Infinity Numerology H1
              </Heading>
            </div>
            <div className="space-y-1 pt-6">
              <span className="font-mono text-xs text-[#8061a5]">
                size=&quot;h2&quot; (Clamp 30.4px → 35px)
              </span>
              <Heading as="h2" size="h2" color="primary">
                Master Life Path & Destiny Numbers H2
              </Heading>
            </div>
            <div className="space-y-1 pt-6">
              <span className="font-mono text-xs text-[#8061a5]">
                size=&quot;h3&quot; (Clamp 25.2px → 28.6px)
              </span>
              <Heading as="h3" size="h3" color="accent">
                Empower Your Spiritual Journey H3
              </Heading>
            </div>
            <div className="space-y-1 pt-6">
              <span className="font-mono text-xs text-[#8061a5]">
                size=&quot;h4&quot; (Clamp 20.9px → 23.4px)
              </span>
              <Heading as="h4" size="h4" color="dark">
                Unlock Cosmic Guidance and Personal Forecasts H4
              </Heading>
            </div>
            <div className="space-y-1 pt-6">
              <span className="font-mono text-xs text-[#8061a5]">
                size=&quot;h5&quot; font=&quot;lato&quot; (Clamp 17.3px → 19.1px)
              </span>
              <Heading as="h5" size="h5" font="lato" color="primary">
                Ancient Wisdom Meets Modern Analytics in Lato H5
              </Heading>
            </div>
          </div>
        </section>

        {/* 3. Text Primitives */}
        <section className="space-y-6">
          <Heading as="h2" size="h3" color="dark">
            3. Text Primitive (`&lt;Text /&gt;`)
          </Heading>
          <div className="space-y-6 rounded-2xl border border-[#e5dff0] bg-white p-6 shadow-2xs sm:p-8">
            <div className="space-y-1">
              <span className="font-mono text-xs text-[#8061a5]">
                variant=&quot;body-lg&quot; (18px / 22.6px)
              </span>
              <Text variant="body-lg" color="dark">
                Comprehensive numerology courses designed for beginners, enthusiasts, and advanced
                practitioners.
              </Text>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-xs text-[#8061a5]">
                variant=&quot;body-base&quot; (16px / 22.2px)
              </span>
              <Text variant="body-base" color="dark">
                Learn how vibrational frequencies and sacred geometry unlock your life purpose,
                hidden strengths, and karmic lessons.
              </Text>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-xs text-[#8061a5]">
                variant=&quot;body-base&quot; weight=&quot;bold&quot; (16px / 22.2px font-bold)
              </span>
              <Text variant="body-base" weight="bold" color="dark">
                Certified Instructor-Led Modules with Lifetime Access and Live Consultations.
              </Text>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-xs text-[#8061a5]">
                variant=&quot;body-sm&quot; (14px / 18.8px)
              </span>
              <Text variant="body-sm" color="muted">
                Calculations are derived using Pythagorean and Chaldean numerology charts based on
                exact date and name records.
              </Text>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-xs text-[#8061a5]">
                variant=&quot;body-xs&quot; (12px)
              </span>
              <Text variant="body-xs" color="muted">
                © 2026 Divine Infinity Numerology LMS. All rights reserved. Registered trademark.
              </Text>
            </div>
          </div>
        </section>

        {/* 4. Button Primitives */}
        <section className="space-y-6">
          <Heading as="h2" size="h3" color="dark">
            4. Button Primitive (`&lt;Button /&gt;`)
          </Heading>
          <div className="space-y-8 rounded-2xl border border-[#e5dff0] bg-white p-6 shadow-2xs sm:p-8">
            {/* Color Variants */}
            <div>
              <Text variant="body-sm" weight="semibold" color="muted" className="mb-3">
                Color Variants
              </Text>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="accent">Accent Button</Button>
                <Button variant="dark">Dark Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <Text variant="body-sm" weight="semibold" color="muted" className="mb-3">
                Sizes (sm, md, lg)
              </Text>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="sm">
                  Small Button
                </Button>
                <Button variant="primary" size="md">
                  Medium Button (Default)
                </Button>
                <Button variant="primary" size="lg">
                  Large Button
                </Button>
              </div>
            </div>

            {/* With Icons & States */}
            <div>
              <Text variant="body-sm" weight="semibold" color="muted" className="mb-3">
                Icons & Interactive States (Loading, Disabled, Link Mode)
              </Text>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" iconLeft={<Icon size="sm">{SparkleIcon}</Icon>}>
                  With Left Icon
                </Button>
                <Button variant="secondary" iconRight={<Icon size="sm">{ArrowRightIcon}</Icon>}>
                  With Right Icon
                </Button>
                <Button variant="primary" loading>
                  Loading State
                </Button>
                <Button variant="primary" disabled>
                  Disabled Button
                </Button>
                <Button
                  variant="outline"
                  href="https://figma.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link Mode (`href`)
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Badge Primitive */}
        <section className="space-y-6">
          <Heading as="h2" size="h3" color="dark">
            5. Badge Primitive (`&lt;Badge /&gt;`)
          </Heading>
          <div className="space-y-4 rounded-2xl border border-[#e5dff0] bg-white p-6 shadow-2xs sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="primary" icon={<Icon size="xs">{SparkleIcon}</Icon>}>
                Primary Badge
              </Badge>
              <Badge variant="secondary">Secondary Badge</Badge>
              <Badge variant="accent">Accent Badge</Badge>
              <Badge variant="outline">Outline Badge</Badge>
              <Badge variant="dark">Dark Badge</Badge>
              <Badge variant="primary" size="sm">
                Small (sm)
              </Badge>
            </div>
          </div>
        </section>

        {/* 6. Icon Wrapper */}
        <section className="space-y-6">
          <Heading as="h2" size="h3" color="dark">
            6. Icon Wrapper Primitive (`&lt;Icon /&gt;`)
          </Heading>
          <div className="space-y-6 rounded-2xl border border-[#e5dff0] bg-white p-6 shadow-2xs sm:p-8">
            <div>
              <Text variant="body-sm" weight="semibold" color="muted" className="mb-3">
                Standard Sizes: xs (12px), sm (16px), md (20px), lg (24px), xl (32px)
              </Text>
              <div className="flex items-center gap-4">
                <Icon size="xs" color="primary">
                  {SparkleIcon}
                </Icon>
                <Icon size="sm" color="primary">
                  {SparkleIcon}
                </Icon>
                <Icon size="md" color="primary">
                  {SparkleIcon}
                </Icon>
                <Icon size="lg" color="primary">
                  {SparkleIcon}
                </Icon>
                <Icon size="xl" color="primary">
                  {SparkleIcon}
                </Icon>
              </div>
            </div>

            <div>
              <Text variant="body-sm" weight="semibold" color="muted" className="mb-3">
                Token Colors
              </Text>
              <div className="flex items-center gap-4">
                <Icon size="lg" color="primary">
                  {CalendarIcon}
                </Icon>
                <Icon size="lg" color="accent">
                  {CalendarIcon}
                </Icon>
                <Icon size="lg" color="dark">
                  {CalendarIcon}
                </Icon>
                <Icon size="lg" color="muted">
                  {CalendarIcon}
                </Icon>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Card Primitives */}
        <section className="space-y-6">
          <Heading as="h2" size="h3" color="dark">
            7. Card Primitive (`&lt;Card /&gt;`)
          </Heading>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Default White Card */}
            <Card variant="default" hover>
              <CardHeader>
                <Badge variant="primary" size="sm" className="mb-2 w-fit">
                  Foundation
                </Badge>
                <CardTitle>Pythagorean Numerology</CardTitle>
                <CardDescription>
                  Master life path calculations and cosmic vibrational numbers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Text variant="body-sm" color="muted">
                  Includes 12 hours of video instruction, downloadable workbook, and personal birth
                  chart decoder.
                </Text>
              </CardContent>
              <CardFooter>
                <Button variant="primary" size="sm" fullWidth>
                  Explore Course
                </Button>
              </CardFooter>
            </Card>

            {/* Gradient Card (Figma Card color) */}
            <Card variant="gradient" hover>
              <CardHeader>
                <Badge variant="dark" size="sm" className="mb-2 w-fit">
                  Featured
                </Badge>
                <CardTitle>Chaldean Numerology</CardTitle>
                <CardDescription className="text-white/80">
                  Ancient sound vibrations and destiny forecast methodologies.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Text variant="body-sm" className="text-white/70">
                  Deep dive into compound numbers, name correction rituals, and compatibility
                  charts.
                </Text>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" size="sm" fullWidth>
                  Enroll Now
                </Button>
              </CardFooter>
            </Card>

            {/* Solid Card (Figma Cards) */}
            <Card variant="solid" hover>
              <CardHeader>
                <Badge variant="dark" size="sm" className="mb-2 w-fit">
                  Masterclass
                </Badge>
                <CardTitle>Master Astrologer Live</CardTitle>
                <CardDescription className="text-white/80">
                  1-on-1 personalized destiny assessment and yearly forecast.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Text variant="body-sm" className="text-white/70">
                  Direct live interaction with certified senior practitioners.
                </Text>
              </CardContent>
              <CardFooter>
                <Button variant="accent" size="sm" fullWidth>
                  Book Session
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* 8. Input Primitive */}
        <section className="space-y-6">
          <Heading as="h2" size="h3" color="dark">
            8. Input Primitive (`&lt;Input /&gt;`)
          </Heading>
          <div className="space-y-6 rounded-2xl border border-[#e5dff0] bg-white p-6 shadow-2xs sm:p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label="Full Legal Name"
                placeholder="e.g. Priya Sharma"
                helperText="Enter your name as it appears on official birth certificates"
                required
              />

              <Input
                label="Search Modules"
                placeholder="Search courses, calculators, consultations..."
                iconLeft={<Icon size="sm">{SearchIcon}</Icon>}
              />

              <Input
                label="Birth Date"
                type="date"
                iconLeft={<Icon size="sm">{CalendarIcon}</Icon>}
                helperText="Required for Destiny Number calculation"
                required
              />

              <Input
                label="Email Address (Error State)"
                defaultValue="invalid-email"
                error="Please enter a valid email address with domain extension."
              />

              <Input
                label="Student Registration Code (Disabled)"
                defaultValue="DIVINE-2026-LOCKED"
                disabled
                helperText="Contact administration to unlock course access"
              />
            </div>
          </div>
        </section>

        {/* 9. Layout Sections & Container */}
        <section className="space-y-6">
          <Heading as="h2" size="h3" color="dark">
            9. Layout Primitives (`&lt;Container /&gt;` & `&lt;Section /&gt;`)
          </Heading>
          <div className="space-y-4">
            <Section bg="dark" spacing="sm" className="overflow-hidden rounded-2xl">
              <div className="space-y-2 text-center">
                <Badge variant="dark">Section (bg=&quot;dark&quot;, spacing=&quot;sm&quot;)</Badge>
                <Heading as="h3" size="h3" color="light" align="center">
                  Full-Width Dark Section with Built-In Container
                </Heading>
                <Text variant="body-sm" className="text-white/75" align="center">
                  Automatically centers content at `max-w-[1440px]` with fluid responsive gutters.
                </Text>
              </div>
            </Section>

            <Section bg="hero" spacing="sm" className="overflow-hidden rounded-2xl">
              <div className="space-y-2 text-center">
                <Badge variant="dark">Section (bg=&quot;hero&quot;)</Badge>
                <Heading as="h3" size="h3" color="light" align="center">
                  Hero Gradient Section
                </Heading>
                <Text variant="body-sm" className="text-white/75" align="center">
                  Vibrant deep indigo to plum gradient matching Figma master canvas background.
                </Text>
              </div>
            </Section>
          </div>
        </section>
      </Container>
    </main>
  );
}
