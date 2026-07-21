"use client";

import { type CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { ambraDict } from "./content";
import { AmbraHeader } from "./ambra-header";
import { HeroSection } from "./hero-section";
import { PortfolioGallery } from "./portfolio-gallery";
import { BeforeAfter } from "./before-after";
import { MaterialsPalette } from "./materials-palette";
import { ProcessTimeline } from "./process-timeline";
import { Testimonials } from "./testimonials";
import { AmbraFooter } from "./ambra-footer";

/**
 * Studio Ambra — warm minimal interior design concept.
 * Linen, clay, terracotta and walnut, declared as CSS variables so the demo
 * renders identically whatever theme the host site is in.
 */
const PALETTE = {
  "--d-bg": "#EFE9E1",
  "--d-bg-2": "#E7DFD3",
  "--d-cream": "#F7F2EA",
  "--d-ink": "#2B2621",
  "--d-soft": "#6F655A",
  "--d-line": "#D9CEBF",
  "--d-accent": "#B4560F",
  "--d-accent-soft": "#D08A4C",
  "--d-clay": "#A8674A",
  "--d-walnut": "#5C4433",
  "--d-dark": "#221E19",
  "--d-dark-2": "#2B261F",
  "--d-dark-line": "#3A342C",
  "--d-dark-text": "#CFC3B1",
} as CSSProperties;

export function StudioAmbra({ locale }: { locale: string }) {
  const content = pickContent(ambraDict, locale);

  return (
    <div
      id="top"
      style={{ ...PALETTE, backgroundColor: "#EFE9E1", color: "#2B2621" }}
      className="relative min-h-screen scroll-smooth [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased"
    >
      <AmbraHeader content={content.header} />
      <main>
        <HeroSection content={content.hero} currency={content.currency} />
        <PortfolioGallery content={content.portfolio} />
        <BeforeAfter content={content.beforeAfter} />
        <MaterialsPalette content={content.materials} />
        <ProcessTimeline content={content.process} />
        <Testimonials content={content.testimonials} />
      </main>
      <AmbraFooter content={content.footer} />
    </div>
  );
}
