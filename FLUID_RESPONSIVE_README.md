# Fluid Responsiveness Strategy (Prompt README)

Paste this whole file into Gemini together with the component code, then fill in the
**ACTIVE TARGETS** block. Update the file whenever a section is finished.

Stack: Next.js (App Router) + React + TypeScript + Tailwind CSS.

---

## 0. SCOPE GUARD (read first, highest priority)

- Edit ONLY the sections/components listed under **ACTIVE TARGETS** below.
- Every other section, component, data file and shared helper is READ-ONLY.
  Do not refactor, rename, reformat, "clean up" or fix anything in them, even if you
  notice a problem. If you notice one, mention it in one line at the end of your reply
  and leave the code unchanged.
- Inside an active section, change only what the correction list asks for.
  Do not touch content, copy, colors, icons, data files or structure that were not named.
- Shared pieces (`SectionOrnament`, `cn`, helpers, fonts, `tailwind.config`) must not be
  edited. If a change seems to need one, stop and ask.
- Return only the files you changed, as complete files, with a short list of what changed.

### ACTIVE TARGETS (update this block every time)

```
Section(s) to correct now:   [e.g. AreasOfExpertise]
Files allowed to change:     [e.g. components/AreasOfExpertise.tsx]
Corrections requested:       [e.g. grid width must be 1280px at 1440px]
Everything else:             DO NOT TOUCH
```

---

## 1. Goal

From mobile (425px) to tablet (768px) to desktop (1440px), the layout must scale
SEAMLESSLY while dragging the browser width. No size, spacing or font jump at a breakpoint.

- NO `sm:` `md:` `lg:` `xl:` classes for sizes, spacing, padding, radius or font sizes.
- Everything uses `clamp()`, `min()`, `max()` with rem + vw values.
- Breakpoints are allowed only for true structure changes that cannot be fluid
  (and prefer `flex-wrap` / `auto-fit` so even those happen automatically).
- Desktop (1440px) and mobile (425px) must stay pixel-accurate to Figma.
- Pure Tailwind arbitrary values (use `_` for spaces, and `_+_` `_-_` around operators
  inside `min/max/clamp/calc`). No inline styles, no extra CSS files.

## 2. Conventions to keep

`cn` from `@/lib`, `font-heading` = Lovelace Text, `font-lato`, `SectionOrnament`
(reuse, never duplicate), data from `@/data/<section>`, `{name}` placeholder helper,
colors `#FFD8A2` (gold), `#FFF0DB` (cream), `#655373` (label purple), gradient
`linear-gradient(142.94deg,#1D1B4D 0%,#512B58 120.7%)`, border `0.5px #5F1BB7`,
shadow `0px 4px 24px rgba(85,81,255,0.25)`.

---

## 3. The recipe (how to compute every value)

1. Collect each Figma value at the three frames: 425 (mobile), 768 (tablet), 1440 (desktop).
2. For two anchors (x1, y1) and (x2, y2), in px:
   - slope `s = (y2 - y1) / (x2 - x1)`
   - vw part `= s * 100`
   - intercept (px) `= y1 - s * x1`, then divide by 16 for rem
   - value `= clamp(minRem, interceptRem + vwPart vw, maxRem)`
3. Check whether all three anchors sit on ONE straight line.
   - Yes: one `clamp(min, a + b*vw, max)`.
   - No: join two lines (see shapes below).
4. Set clamp min and max to the exact Figma values, so mobile and desktop are exact.
5. Delete the old `md:` / `lg:` size classes.

### Curve shapes

| Anchors (425 -> 768 -> 1440)        | Shape                | Formula pattern                                  |
|-------------------------------------|----------------------|--------------------------------------------------|
| One straight line                   | line                 | `clamp(min, a + b vw, max)`                      |
| Grows fast, then slow               | fast -> slow         | `min(lineFast, lineSlow)` inside clamp           |
| Grows slow, then fast               | slow -> fast         | `max(lineSlow, lineFast)` inside clamp           |
| Goes down, then up (e.g. 385>314>585) | V shape            | `max(lineDown, lineUp)`, with `min()` cap on the mobile value |
| Flat, then grows                    | step-free ramp       | `clamp(min, line, max)`                          |

### Worked example (title font, 20.91px @425, 28.13px @1440)

```
s = (28.13 - 20.91) / (1440 - 425) = 0.007113
vw = 0.711
intercept = 20.91 - 0.007113 * 425 = 17.887px = 1.118rem
=> text-[clamp(1.307rem,1.118rem_+_0.711vw,1.758rem)]
```

### Verified formulas already used in this project

| Item                    | 425   | 768   | 1440   | Tailwind value                                                        |
|-------------------------|-------|-------|--------|-----------------------------------------------------------------------|
| Recognition card width  | 385   | 648   | 939    | `clamp(24.0625rem,min(3.69rem_+_76.68vw,19.714rem_+_43.3vw),58.6875rem)` |
| Recognition card height | 232   | 238   | 360    | `clamp(14.5rem,max(14.04rem_+_1.75vw,6.161rem_+_18.15vw),22.5rem)`    |
| Recognition title size  | 20.91 | 23.35 | 28.13  | `clamp(1.307rem,1.118rem_+_0.711vw,1.758rem)`                         |
| Certificate card width  | 385   | 314   | 585.5  | `min(36.59375rem,max(min(24.0625rem,29.561rem_-_20.7vw),0.232rem_+_40.4vw))` |
| Expertise box width     | 180   | 200   | 248    | `clamp(11.25rem,max(9.701rem_+_5.831vw,9.0714rem_+_7.143vw),15.5rem)` |

---

## 4. What cannot be smooth (accept these)

- Font weight (400 vs 700) cannot be interpolated. Pick one weight for all sizes
  (e.g. regular text with a bold span).
- Columns wrapping (3 -> 2 -> 1, or 5 -> 3 -> 2) is a discrete event. Make it automatic:
  - wrapping flex: `flex flex-wrap justify-center`, items with a fluid width
  - or `grid-cols-[repeat(auto-fit,minmax(min(100%,Npx),1fr))]`
  - Items shrink right before the wrap so it looks gradual.
- Never use `w-screen`, `100vw` widths, or transform/scale hacks to shrink things.

## 5. Rules for common elements

- **Heights:** never fixed. Use `min-h` or an `aspect-ratio`. Do not set both a height
  clamp and an aspect ratio on the same box (they conflict).
- **Widths shared by two blocks** (image + text, etc.): put the fluid value in a CSS
  variable on the parent (`[--card-w:...]`) and use `w-[var(--card-w)]` on both.
- **Padding:** apply horizontal padding in ONE place only (not on the wrapper and the
  section, and no `max-w-[calc(100%-2rem)]` on top of `px-4`).
- **Transitions:** do not use `transition-all` on resizable boxes (it makes size changes lag).
  Use `transition-[box-shadow,border-color]`.
- **Text:** must wrap (`min-w-0`, never `whitespace-nowrap`); line-heights as unitless
  ratios or fluid clamps matching the Figma ratio (e.g. 22.2/16 = 1.3875).
- **`{name}` highlight spans:** use `text-[1.125em]` style relative sizes, not fixed px.
- **Images:** `next/image`, `sizes` attribute updated to match the fluid widths.
- **Figma "background" on a text layer** means the text color (fill).
- **Figma "gap" inside a box** is not the gap between boxes in a grid. Check both.
- **Figma "line-height: 100%"** on body text is usually wrong for real paragraphs.
  Work the real spacing out from the box height / number of lines, or ask me.

---

## 6. Process for every task

1. Read the code. List the breakpoint jumps and conflicts (a short bullet list).
2. Compute the fluid values from the Figma anchors with the recipe above.
3. Change ONLY the active targets (Section 0). Leave everything else untouched.
4. Update the doc comment at the top of each changed component: Figma anchors, one line
   per formula, curve shape used.
5. Run the quality checks below and tell me what you verified.

## 7. Quality checks

- Drag width continuously from 1440px down to 320px: nothing jumps, clips, overlaps,
  or causes horizontal scroll. Only the number of items per row may change, one at a time.
- In DevTools, sizes at 425px, 768px and 1440px match the Figma anchors exactly.
- No `sm:` `md:` `lg:` `xl:` size/spacing/font classes remain in the changed files.
- No file outside the active targets was modified.

---

## 8. Section status (update me)

| Section                     | Fluid done? | Notes                                                        |
|-----------------------------|-------------|--------------------------------------------------------------|
| Path of Learning            | [ ]         | Two-column row + timeline (see 768 / 1280 specs)             |
| Building a Strong Foundation| [ ]         | 3 cards (374px), header 898px, bottoms aligned               |
| Recognition card            | [x]         | 385x232 / 648x238 / 939x360                                  |
| Areas of Expertise          | [x]         | Grid 1280px at 1440 (5 x 248 + 4 x 10), box 180/200/248      |
| Certificates                | [ ]         | Prompt prepared, V-shaped card width 385 > 314 > 585.5       |
| Choose your zodiac sign     | [x]         | 186.5x174 (2-col) / 153x181 (4-col) / 200x220 (6-col)        |
| Today's Horoscope Box       | [x]         | 388x885 (stack) / 648x800 (side) / 1116x609 (side)           |
| Why Follow Your Horoscope   | [x]         | 385x178 (stack) / 645x298 (stack) / 645x298 (side-by-side)   |
| Shared Footer               | [x]         | 425x1120.5 (pt:30,px:20,pb:20,gap:60) / 768x842.5 (pt:40,px:60,pb:20,gap:60) / 1440x658 (gap:75) + Interactive BG Adjuster |

## 9. Figma anchors per section (fill in)

```
Section: Shared Footer
  425px:  Width 425, min-height 1120.5, pt: 30, pr: 20, pb: 20, pl: 20, gap: 60, angle: 0deg, opacity: 1, bg: linear-gradient(142.94deg, #1D1B4D 0%, #512B58 120.7%)
          Course CTA: Title 17.33/25, Description 16/22.2 (w:385), Button 145x35 (rounded 50px).
          Bottom Strip: 385x54 (gap:16px stacked), Copyright (228x19, center, 14/18.8), Legal Links (Terms & Conditions | Privacy Policy, center, 14/18.8).
  768px:  Width 768, min-height 842.5, pt: 40, pr: 60, pb: 20, pl: 60, gap: 60, angle: 0deg, opacity: 1
          Course CTA: Title 19.08/23.3, Description 16/22.2, Button 145x35.
          Bottom Strip: 648x19 (side-by-side, justify-between), Copyright (228x19), Legal Links (243x19).
  1440px: Width 1440, min-height 658, pt: 40, pr: 80, pb: 20/16, pl: 80, gap: 75, angle: 0deg, opacity: 1
  Desktop BG Controls (locked): scaleX 1.38, scaleY 1.38, shiftX 200px, shiftY 15px, origin bottom, opacity 85%
  Tablet BG Controls (verified): zoom 3.75, shiftX -21px, shiftY 13px, origin bottom, opacity 85%
  Mobile BG Controls (verified): zoom 6.3, shiftX -160px, shiftY -306px, origin bottom, opacity 85%
  SSR Classes: translate-x-[-160px] translate-y-[-306px] scale-[6.3] md:translate-x-[-21px] md:translate-y-[13px] md:scale-[3.75] lg:translate-x-[200px] lg:translate-y-[15px] lg:scale-[1.38] origin-bottom
  Interactive UI: Floating dev adjuster widget preserved for fine-tuning.

```
Section: Choose your zodiac sign (Horoscope)
  425px:  Heading 30.43/35, Card 186.5x174, p: 10/8, 2 cols, text 17.33/25, btn 169.5x32, icon 88x88
  768px:  Card 153x181, p: 10/8, 4 cols, text 19.08/23.3, btn 136x38, icon 88x88
  1440px: Heading 44/52.8, Card 200x220, p: 21/14, 6 cols, text 22.5/30.7, btn 172x38, icon 88x88

Section: Today's Horoscope Box (ZodiacDetailPanel)
  425px:  Box 388x885, p: 20/10, tabs 320x32, heading 17.33/25, body 14/18.8, 2x2 lucky 175x68 (icon 36)
  768px:  Box 648x800, p: 20/20, tabs 396x43, heading 19.08/23.3, body 16/22.2, 2x2 lucky 278x72 (icon 48)
  1440px: Box 1116x609, tabs 433x43, heading 22.5/30.7, body 16/22.2, 1x4 lucky 228x72 (icon 48)

Section: Why Follow Your Horoscope
  425px:  Heading 30.43/35 (center), ornament 254.4x24.2, image 385x178 (under heading), subtitle 17.33/25, paragraph 16/22.2 (1% tracking)
  768px:  Heading 35/40 (left), ornament 262x24.9 (left), image 645x298 (under heading), subtitle 19.08/23.3, paragraph 18/22.6
  1440px: Heading 35.16/100%, ornament 362x34.4, image 645x298 (side-by-side), subtitle 22.5/30.7, paragraph 18/22.6
```

## 10. Reusable request template

```
Read FLUID_RESPONSIVE_README.md and follow it exactly.

ACTIVE TARGETS
  Section(s): <name>
  Files allowed to change: <paths>
  Corrections: <what is wrong / what to change>
  Figma anchors: <425 / 768 / 1440 values>

All other sections and files are read-only. Do not touch them.
Return only the changed files, plus a short list of the changes.
```
