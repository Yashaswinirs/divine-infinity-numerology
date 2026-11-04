"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Ornament, StarIcon } from "@/components/shared";
import { cn } from "@/lib";
import type { NavItem } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { MenuToggleButton } from "./MenuToggleButton";

export interface MobileMenuProps {
  id: string;
  open: boolean;
  items: readonly NavItem[];
  isActive: (href: string) => boolean;
  onClose: () => void;
}

export function MobileMenu({ id, open, items, isActive, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Body scroll lock, initial focus, and focus restore on close
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      onClose();
      return;
    }
    if (event.key !== "Tab") return;

    const focusable = panelRef.current?.querySelectorAll<HTMLElement>("a[href], button");
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      id={id}
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      onKeyDown={handleKeyDown}
      className={cn(
        "bg-page-gradient fixed inset-0 z-60 overflow-y-auto xl:hidden",
        "transition-[transform,visibility] duration-300 ease-out motion-reduce:transition-none",
        open ? "visible translate-x-0" : "invisible -translate-x-full"
      )}
    >
      <Container padding="none" className="relative min-h-full px-5 py-5 md:px-15 md:py-10">
        {/* TODO(figma): Frame 108 opacity not read yet; 25% matches the faint look */}
        {/* Figma Frame 108 export: opacity is baked into the image */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 w-full max-w-187 -translate-x-1/2 overflow-hidden"
        >
          <Image
            src={siteConfig.decor.sky.src}
            alt=""
            fill
            sizes="(min-width: 768px) 748px, 100vw"
            className="object-cover object-left-bottom"
          />
        </div>
        <div className="relative mx-auto flex w-full max-w-162 flex-col gap-10">
          <div className="flex h-12.5 items-center justify-between md:h-15">
            <Logo onClick={onClose} />
            <MenuToggleButton
              ref={closeRef}
              icon="close"
              aria-label="Close menu"
              onClick={onClose}
            />
          </div>

          {/* TODO(figma): gap between the title block and the list is assumed (24) */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-6">
              <p className="type-h5-t text-secondary text-center">MENU</p>
              <Ornament />
            </div>

            <ul>
              {items.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "type-body-small flex items-center justify-center gap-2.5 border-b-[0.5px]",
                        "px-2.5 py-4 font-medium transition-colors md:py-5",
                        "focus-visible:ring-accent focus-visible:ring-2 focus-visible:outline-hidden",
                        active
                          ? "border-accent text-accent"
                          : "border-secondary/25 text-light hover:text-accent"
                      )}
                    >
                      {active && <StarIcon />}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
