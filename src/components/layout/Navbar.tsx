"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui";
import { cn } from "@/lib";
import { useScrolled } from "@/hooks";
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
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200",
          // TODO(figma): scrolled background is assumed (Figma only shows the transparent state)
          scrolled
            ? "border-secondary/25 bg-gradient-stop-1/90 backdrop-blur-md"
            : "border-transparent bg-transparent"
        )}
      >
        <Container
          padding="none"
          className="pt-nav-y-sm md:pt-nav-y-md xl:pt-nav-y-xl px-5 pb-3 md:px-15 xl:px-20"
        >
          <div className="flex h-12.5 items-center justify-between md:h-15 xl:h-12">
            <Logo variant="nav" />

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
