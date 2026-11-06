"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui";
import { cn } from "@/lib";
import { mainNav } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { MenuToggleButton } from "./MenuToggleButton";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

const MENU_ID = "mobile-menu";

export function Navbar() {
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
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background-color,border-color] duration-300",
          scrolled && "border-accent/10 bg-gradient-stop-1/95 backdrop-blur-sm"
        )}
      >
        {/* Stars, same image as the page background. Fades in with the dark background. */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 -z-10 bg-[url('/images/shared/stars-bg.svg')] bg-cover bg-center opacity-0 transition-opacity duration-300",
            scrolled && "opacity-70"
          )}
        />
        <Container
          padding="none"
          className="pt-nav-y-sm md:pt-nav-y-md xl:pt-nav-y-xl px-5 pb-3 md:px-15 xl:px-20"
        >
          <div className="flex h-12.5 items-center justify-between md:h-15 xl:h-12">
            <Logo />

            <NavLinks items={mainNav} isActive={isActive} className="hidden xl:block" />

            <div className="flex items-center gap-4 md:gap-4.5">
              <Button variant="accent" size="nav" href={siteConfig.login.href}>
                {siteConfig.login.label}
              </Button>
              <MenuToggleButton
                icon="menu"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls={MENU_ID}
                onClick={() => setMenuOpen(true)}
                className="md:size-8 xl:hidden"
              />
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
