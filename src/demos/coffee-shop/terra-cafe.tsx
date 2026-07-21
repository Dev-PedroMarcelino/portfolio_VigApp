"use client";

import type { CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { terraDict } from "./content";
import { Grain } from "./ui";
import { TerraHeader } from "./terra-header";
import { TerraHero } from "./terra-hero";
import { MenuSection } from "./menu-section";
import { OriginsSection } from "./origins-section";
import { BrewGuide } from "./brew-guide";
import { SubscriptionBuilder } from "./subscription-builder";
import { VisitSection } from "./visit-section";
import { TerraFooter } from "./terra-footer";

/**
 * Terra Café — slow-living specialty coffee concept.
 * Latte cream, espresso brown and terracotta; the palette is defined here as
 * CSS variables so the demo renders identically in light and dark host themes.
 */
const PALETTE = {
  "--d-bg": "#EFE6DA",
  "--d-cream": "#FBF6EC",
  "--d-tan": "#E6D7C0",
  "--d-ink": "#2B1D12",
  "--d-ink-soft": "#6E5844",
  "--d-accent": "#6F4E37",
  "--d-terra": "#B4633C",
  "--d-line": "#DFCFB9",
  "--d-dark": "#231710",
  "--d-dark-soft": "#2F2013",
  "--d-dark-line": "#44311F",
  "--d-footer": "#1A100A",
  "--d-sand": "#EBDFC8",
  "--d-sand-dim": "#B5A288",
} as CSSProperties;

export function TerraCafe({ locale }: { locale: string }) {
  const content = pickContent(terraDict, locale);

  return (
    <div
      style={{ ...PALETTE, backgroundColor: "#EFE6DA", color: "#2B1D12" }}
      className="relative min-h-screen [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased"
    >
      <Grain />
      <TerraHeader content={content.header} />
      <main>
        <TerraHero content={content.hero} />
        <MenuSection content={content.menu} />
        <OriginsSection content={content.origins} />
        <BrewGuide content={content.brew} />
        <SubscriptionBuilder content={content.subscription} />
        <VisitSection content={content.visit} />
      </main>
      <TerraFooter content={content.footer} />
    </div>
  );
}
