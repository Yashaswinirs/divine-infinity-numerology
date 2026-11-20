import type { NextConfig } from "next";

/**
 * cacheComponents and partialPrefetching were removed: they are experimental
 * opt-ins with no confirmed benefit for this project at this stage. They
 * triggered console warnings ("Cache Components enabled", "Partial Prefetching
 * enabled") without being intentionally enabled — they were leftover from the
 * initial scaffold. Re-add them only when explicitly needed.
 *
 * Tailwind CSS v4 is processed via PostCSS (postcss.config.mjs) using
 * @tailwindcss/postcss. The @tailwindcss/turbopack loader rule has been
 * removed alongside this config cleanup; turbopack is not used in production
 * builds (scripts use --webpack).
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    agentUpgrade: "security",
  },
};

export default nextConfig;
