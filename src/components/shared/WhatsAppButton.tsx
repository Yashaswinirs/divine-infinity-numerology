import { cn } from "@/lib";
import { siteConfig } from "@/data/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

export interface WhatsAppButtonProps {
  /** Overrides the link built from siteConfig.whatsapp. */
  href?: string;
  className?: string;
}

const { number, message, label, regionLabel } = siteConfig.whatsapp;
const defaultHref = `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

// Floating action button, bottom right (Figma Contact Us & layout prototype).
// Figma Frame 279: 60 x 60, radius 30, padding 10, fill #47C756. On the tablet frame it sits right 60 / bottom 74 (derived).
// TODO(figma): the offsets (right 50, bottom 24 phone / 32 from 600px up) and the icon size (30) are not from a panel yet.
const styles = {
  root: "fixed right-12.5 bottom-6 tab:bottom-8 z-50",
  link: "bg-whatsapp shadow-whatsapp focus-visible:outline-accent flex size-12 items-center justify-center rounded-full text-white transition-transform duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95 lg:size-15",
  icon: "size-6 lg:size-7.5",
} as const;
export function WhatsAppButton({ href = defaultHref, className }: WhatsAppButtonProps) {
  return (
    <aside aria-label={regionLabel} className={cn(styles.root, className)}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={styles.link}
      >
        <WhatsAppIcon className={styles.icon} />
      </a>
    </aside>
  );
}
