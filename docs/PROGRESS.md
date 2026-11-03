# PROGRESS (update after every finished section)

Last updated: 3 Nov 2026

## Status (Home page)

| Item                                  | Status      |
| ------------------------------------- | ----------- |
| Navbar (desktop, tablet, mobile menu) | Done        |
| 1 Hero                                | Not started |
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

## Decisions (inferred from the code; correct anything wrong)

- Spacing uses the Tailwind v4 numeric scale = Figma px / 4 (20px = 5, 50px = 12.5, 648px = max-w-162).
- Page background is the bg-page-gradient token (Figma "Gradient" style).
- Mobile menu: fixed full-screen overlay (z-60), hidden at the xl breakpoint and above, slides in from the left, inert while closed, Escape closes, focus goes to the close button, respects reduced motion.
- Navbar scroll styling is driven by the useScrolled hook.
- Nav items live in src/data/navigation.ts; brand and decor config in src/data/site.ts.
- dev and build run Next with --webpack.

## Gotchas

- The editor shows about 12 warnings in globals.css, probably the CSS linter not knowing Tailwind v4 at-rules. lint and typecheck pass.
- The navbar took about 4 hours. Always get the Figma properties panel before building.
- Claude accounts hit limits: restart in a new account using HANDOFF.md.

## Open TODOs

The auto-generated TODO list is added to HANDOFF.md. Known: MobileMenu sky-decor opacity (Frame 108) is a guess.