"use client";

import type { CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { orbitflowDict } from "./content";
import { OrbitHeader } from "./orbit-header";
import { OrbitHero } from "./orbit-hero";
import { FeatureTabs } from "./feature-tabs";
import { Integrations } from "./integrations";
import { SecurityBand } from "./security-band";
import { Pricing } from "./pricing";
import { QuoteWall } from "./quote-wall";
import { CtaBand } from "./cta-band";
import { OrbitFooter } from "./orbit-footer";

/**
 * Orbitflow — enterprise work-management SaaS concept.
 * Deep slate, glassmorphism and blue glow. The palette lives here as CSS
 * variables so the demo renders identically in light and dark host themes.
 */
const PALETTE = {
  "--d-bg": "#0A101F",
  "--d-surface": "#0F172A",
  "--d-panel": "rgba(148, 163, 184, 0.07)",
  "--d-panel-strong": "rgba(148, 163, 184, 0.13)",
  "--d-line": "rgba(148, 163, 184, 0.16)",
  "--d-line-strong": "rgba(148, 163, 184, 0.3)",
  "--d-ink": "#E6EDF7",
  "--d-ink-soft": "#94A3B8",
  "--d-ink-faint": "#64748B",
  "--d-accent": "#60A5FA",
  "--d-accent-deep": "#3B82F6",
  "--d-accent-ink": "#081120",
} as CSSProperties;

export function Orbitflow({ locale }: { locale: string }) {
  const content = pickContent(orbitflowDict, locale);

  return (
    <div
      style={{ ...PALETTE, backgroundColor: "#0A101F", color: "#E6EDF7" }}
      className="relative min-h-screen [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased selection:bg-[rgba(96,165,250,0.35)]"
    >
      <OrbitHeader content={content.nav} />
      <main>
        <OrbitHero content={content.hero} />
        <FeatureTabs content={content.features} />
        <Integrations content={content.integrations} />
        <SecurityBand content={content.security} />
        <Pricing content={content.pricing} />
        <QuoteWall content={content.quotes} />
        <CtaBand content={content.cta} />
      </main>
      <OrbitFooter content={content.footer} />
    </div>
  );
}
