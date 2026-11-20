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
import { Navbar2 } from "./Navbar2";

const MENU_ID = "mobile-menu";

export interface NavbarProps {
  variant?: "default" | "blogs" | "navbar2";
}

const NAVBAR2_ROUTES = [
  "/blogs",
  "/about",
  "/contact",
  "/404",
];

function isNavbar2Route(pathname: string): boolean {
  return NAVBAR2_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export function Navbar({ variant }: NavbarProps = {}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Delegate to Navbar2 on target routes (/blogs, /about, /contact, /404) or when explicitly requested
  const shouldUseNavbar2 =
    variant === "blogs" ||
    variant === "navbar2" ||
    (variant === undefined && isNavbar2Route(pathname));

  if (shouldUseNavbar2) {
    return <Navbar2 />;
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Scrolled veil: ONLY on desktop layouts (hidden on tablet & mobile) */}
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
          <div className="tab:h-15 flex h-12.5 items-center justify-between lg:h-12">
            <Logo />

            <NavLinks items={mainNav} isActive={isActive} className="hidden lg:block" />

            <div className="tab:gap-4.5 flex items-center gap-4">
              <Button variant="accent" size="nav" href={siteConfig.login.href}>
                {siteConfig.login.label}
              </Button>
              <MenuToggleButton
                icon="menu"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls={MENU_ID}
                onClick={() => setMenuOpen(true)}
                className="tab:size-8 lg:hidden"
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
