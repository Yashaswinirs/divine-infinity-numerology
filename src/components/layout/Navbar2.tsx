"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui";
import { cn } from "@/lib";
import { mainNav } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { MobileMenuButton } from "@/components/sections/blogs/MobileMenuButton";

const MENU_ID = "mobile-menu-2";

export interface Navbar2Props {
  className?: string;
}

/**
 * Navbar2 - Reusable responsive navigation bar component.
 *
 * Specifications:
 * - On tablet & mobile (< 1024px):
 *   - Left: Logo-2 (50x50 round logo with 1px border #FFD8A2, linking to /)
 *   - Right: Accessible hamburger button using /icons/three-lines-nav.svg (width 30, height 16, gap 8px)
 *   - No login button on tablet/mobile
 *   - NO background blur on scroll (blur removed on mobile/tablet)
 * - On desktop (>= 1024px):
 *   - Renders the standard desktop navigation (Logo, NavLinks, Login button)
 *   - Adds background blur behind the navbar on scroll
 */
export function Navbar2({ className }: Navbar2Props = {}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-50", className)}>
        {/* Scrolled veil with backdrop blur: ONLY on desktop layouts (hidden on tablet & mobile where 3 lines appear) */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 -bottom-6 -z-10 hidden opacity-0 lg:block",
            "from-gradient-stop-1/80 via-gradient-stop-1/60 to-gradient-stop-1/0 bg-linear-to-b",
            "[mask-image:linear-gradient(to_bottom,black_70%,transparent)] backdrop-blur-xs",
            "transition-opacity duration-300 motion-reduce:transition-none",
            scrolled && "opacity-100"
          )}
        />

        <Container
          padding="none"
          className="pt-nav-y-sm tab:pt-nav-y-md lg:pt-nav-y-xl tab:px-[clamp(1.25rem,calc(23.81vw-7.679rem),3.75rem)] px-5 pb-3 lg:px-10 xl:px-20"
        >
          {/* Tablet & Mobile Layout (< 1024px): Logo 2 + 3-line hamburger icon */}
          <div className="tab:h-15 flex h-12.5 items-center justify-between lg:hidden">
            <Link
              href="/"
              className={cn(
                "relative flex h-[50px] w-[50px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#FFD8A2]",
                "hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD8A2]",
                "transition-opacity"
              )}
              aria-label="Divine Infinity Numerology Home"
            >
              <Image
                src="/images/footer/logo2.webp"
                alt="Divine Infinity Numerology"
                width={50}
                height={50}
                priority
                className="h-full w-full object-cover"
              />
            </Link>

            <MobileMenuButton
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls={MENU_ID}
              onClick={() => setMenuOpen(true)}
            />
          </div>

          {/* Desktop Layout (>= 1024px): Standard Desktop Navigation */}
          <div className="hidden h-12 items-center justify-between lg:flex">
            <Logo />

            <NavLinks items={mainNav} isActive={isActive} />

            <div className="flex items-center gap-4">
              <Button variant="accent" size="nav" href={siteConfig.login.href}>
                {siteConfig.login.label}
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <MobileMenu
        id={MENU_ID}
        open={menuOpen}
        items={mainNav}
        isActive={isActive}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}

export default Navbar2;
