import Link from "next/link";
import { cn } from "@/lib";
import type { NavItem } from "@/data/navigation";

export interface NavLinksProps {
  items: readonly NavItem[];
  isActive: (href: string) => boolean;
  className?: string;
}

export function NavLinks({ items, isActive, className }: NavLinksProps) {
  return (
    <nav aria-label="Primary" className={className}>
      <ul className="flex items-center gap-6 2xl:gap-11.25">
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "type-body-small font-medium whitespace-nowrap transition-colors",
                  "focus-visible:ring-accent focus-visible:ring-2 focus-visible:outline-hidden",
                  // TODO(figma): hover state not designed; Accent text assumed
                  active ? "text-accent" : "text-light hover:text-accent"
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
