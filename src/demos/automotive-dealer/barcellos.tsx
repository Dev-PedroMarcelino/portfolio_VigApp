"use client";

import type { CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { barcellosDict } from "./content";
import { Grain } from "./ui";
import { BarcellosHeader } from "./barcellos-header";
import { HeroSection } from "./hero-section";
import { FeaturedSection } from "./featured-section";
import { StockSection } from "./stock-section";
import { FinancingSection } from "./financing-section";
import { TradeinSection } from "./tradein-section";
import { VisitSection } from "./visit-section";
import { TestimonialsSection } from "./testimonials-section";
import { BarcellosFooter } from "./barcellos-footer";

/**
 * Barcellos Veículos — premium Brazilian pre-owned & armored car dealership
 * in Jardins, São Paulo. Graphite surfaces, champagne detailing and a real
 * Sketchfab 3D showroom stage. The palette is declared as CSS variables on
 * the root so the demo renders identically in either host theme.
 */
const PALETTE = {
  "--d-bg": "#0A0B0E",
  "--d-surface": "#12141A",
  "--d-panel": "#171A22",
  "--d-line": "#262B36",
  "--d-ink": "#F4F2ED",
  "--d-ink-soft": "#9BA1AD",
  "--d-silver": "#C9CDD6",
  "--d-gold": "#D9A441",
  "--d-gold-soft": "#E7BE6E",
  "--d-gold-deep": "#B9852C",
} as CSSProperties;

export function Barcellos({ locale }: { locale: string }) {
  const content = pickContent(barcellosDict, locale);

  return (
    <div
      style={{ ...PALETTE, backgroundColor: "#0A0B0E", color: "#F4F2ED" }}
      className="relative min-h-screen overflow-x-hidden [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased"
    >
      <Grain />
      <BarcellosHeader content={content.header} />
      <main>
        <HeroSection content={content.hero} whatsappMsg={content.header.whatsappMsg} />
        <FeaturedSection content={content.featured} />
        <StockSection content={content.stock} />
        <FinancingSection content={content.financing} />
        <TradeinSection content={content.tradein} />
        <VisitSection content={content.visit} />
        <TestimonialsSection content={content.testimonials} />
      </main>
      <BarcellosFooter content={content.footer} whatsappMsg={content.header.whatsappMsg} />
    </div>
  );
}
