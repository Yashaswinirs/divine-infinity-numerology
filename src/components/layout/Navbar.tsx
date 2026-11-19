"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui";
import { mainNav } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { MenuToggleButton } from "./MenuToggleButton";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { MobileMenuButton } from "@/components/sections/blogs/MobileMenuButton";

const MENU_ID = "mobile-menu";

export interface NavbarProps {
  variant?: "default" | "blogs";
}

export function Navbar({ variant }: NavbarProps = {}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isBlogsIndex = pathname === "/blogs";
  const isInnerBlog = pathname.startsWith("/blogs/") && pathname !== "/blogs";
  const useBlogsNavbar =
    isInnerBlog ||
    pathname === "/404" ||
    pathname.startsWith("/404") ||
    variant === "blogs";

  useEffect(() => {
    const handleOpen = () => setMenuOpen(true);
    window.addEventListener("open-mobile-menu", handleOpen);
    return () => window.removeEventListener("open-mobile-menu", handleOpen);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-50", isBlogsIndex && "hidden lg:block")}>
        {useBlogsNavbar ? (
          <>
            {/* Tablet + Mobile Header for Inner Blog Page (visible below 1024px, just like BlogsHero) */}
            <div className="flex h-[50px] items-center justify-between pt-[20px] px-[clamp(20.5px,calc(11.516vw_-_28.44px),60px)] md:px-[60px] lg:hidden">
              {/* Logo-2: 50x50 round with 1px border (#FFD8A2) */}
              <Link
                href="/"
                className="relative flex h-[50px] w-[50px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#FFD8A2] hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD8A2] transition-opacity"
                aria-label="Divine Infinity Numerology Home"
              >
                <Image
                  src="/images/footer/logo2.webp"
                  alt="Divine Infinity Numerology"
                  width={50}
                  height={50}
                  className="h-full w-full object-cover"
                />
              </Link>

              {/* 3-line Accessible Hamburger Button */}
              <MobileMenuButton onClick={() => setMenuOpen(true)} />
            </div>

            {/* Desktop Navbar for Inner Blog Page (visible at 1024px+, identical to desktop blogs navbar) */}
            <Container
              padding="none"
              className="hidden lg:block pt-nav-y-sm md:pt-nav-y-md lg:pt-[clamp(21.33px,2.083vw,30px)] px-5 pb-3 md:px-15 lg:px-[clamp(56.88px,5.556vw,80px)]"
            >
              <div className="flex h-12.5 items-center justify-between md:h-15 lg:h-[clamp(34.13px,3.333vw,48px)]">
                <Logo />

                <NavLinks items={mainNav} isActive={isActive} className="hidden lg:block" />

                <div className="flex items-center gap-4 md:gap-4.5">
                  <Button variant="accent" size="nav" href={siteConfig.login.href}>
                    {siteConfig.login.label}
                  </Button>
                </div>
              </div>
            </Container>
          </>
        ) : (
          <Container
            padding="none"
            className="pt-nav-y-sm md:pt-nav-y-md lg:pt-[clamp(21.33px,2.083vw,30px)] px-5 pb-3 md:px-15 lg:px-[clamp(56.88px,5.556vw,80px)]"
          >
            <div className="flex h-12.5 items-center justify-between md:h-15 lg:h-[clamp(34.13px,3.333vw,48px)]">
              <Logo />

              <NavLinks items={mainNav} isActive={isActive} className="hidden lg:block" />

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
                  className="md:size-8 lg:hidden"
                />
              </div>
            </div>
          </Container>
        )}
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
