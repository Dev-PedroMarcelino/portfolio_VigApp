"use client";

import type { CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { slotlyDict } from "./content";
import { SlotlyHeader } from "./slotly-header";
import { HeroBooking } from "./hero-booking";
import { FeaturesTrio } from "./features";
import { IntegrationsWall } from "./integrations";
import { TeamsSection } from "./teams";
import { PricingSection } from "./pricing";
import { TestimonialsCta } from "./testimonials-cta";
import { SlotlyFooter } from "./slotly-footer";

/**
 * Slotly — scheduling SaaS concept. Mint white and deep teal, playful but
 * precise. The palette lives here as CSS variables so the demo renders
 * identically whichever theme the host site is in.
 */
const PALETTE = {
  "--d-bg": "#F0FDFA",
  "--d-card": "#FFFFFF",
  "--d-mint": "#D8F7EF",
  "--d-ink": "#042F2E",
  "--d-ink-soft": "#4E7B76",
  "--d-accent": "#0D9488",
  "--d-accent-deep": "#0F766E",
  "--d-line": "#C4EAE1",
  "--d-pop": "#F59E0B",
  "--d-dark": "#042F2E",
  "--d-dark-soft": "#0A3F3C",
  "--d-dark-line": "#175450",
  "--d-mint-dim": "#8CCFC5",
} as CSSProperties;

export function SlotlyDemo({ locale }: { locale: string }) {
  const content = pickContent(slotlyDict, locale);

  return (
    <div
      style={{ ...PALETTE, backgroundColor: "#F0FDFA", color: "#042F2E" }}
      className="relative min-h-screen [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased"
    >
      <SlotlyHeader content={content.header} />
      <main>
        <HeroBooking hero={content.hero} booking={content.booking} />
        <FeaturesTrio content={content.features} />
        <IntegrationsWall content={content.integrations} />
        <TeamsSection content={content.teams} />
        <PricingSection content={content.pricing} />
        <TestimonialsCta testimonials={content.testimonials} cta={content.cta} />
      </main>
      <SlotlyFooter content={content.footer} />
    </div>
  );
}
