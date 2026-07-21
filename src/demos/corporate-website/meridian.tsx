"use client";

import type { CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { meridianDict } from "./content";
import { MeridianHeader } from "./header";
import { MeridianHero } from "./hero";
import { BusinessUnits } from "./business-units";
import { KeyFigures } from "./key-figures";
import { Leadership } from "./leadership";
import { Newsroom } from "./newsroom";
import { Esg } from "./esg";
import { InvestorBand } from "./investor-band";
import { MeridianFooter } from "./footer";

/**
 * Meridian Group — global holding company concept.
 * Graphite slate, silver and steel blue. The palette lives here as CSS
 * variables so the demo renders identically in light or dark host themes.
 */
const PALETTE = {
  "--d-bg": "#0F172A",
  "--d-surface": "#1E293B",
  "--d-panel": "rgba(148, 163, 184, 0.06)",
  "--d-panel-strong": "rgba(148, 163, 184, 0.13)",
  "--d-line": "rgba(148, 163, 184, 0.15)",
  "--d-line-strong": "rgba(148, 163, 184, 0.28)",
  "--d-ink": "#E2E8F0",
  "--d-ink-soft": "#94A3B8",
  "--d-ink-faint": "#64748B",
  "--d-accent": "#94A3B8",
  "--d-steel": "#5B7A9B",
  "--d-steel-bright": "#8AACCE",
  "--d-accent-ink": "#0B1220",
} as CSSProperties;

export function Meridian({ locale }: { locale: string }) {
  const content = pickContent(meridianDict, locale);

  return (
    <div
      style={{ ...PALETTE, backgroundColor: "#0F172A", color: "#E2E8F0" }}
      className="relative min-h-screen [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased selection:bg-[rgba(138,172,206,0.3)]"
    >
      <MeridianHeader content={content.nav} />
      <main>
        <MeridianHero content={content.hero} />
        <BusinessUnits content={content.units} />
        <KeyFigures content={content.figures} />
        <Leadership content={content.leadership} />
        <Newsroom content={content.newsroom} />
        <Esg content={content.esg} />
        <InvestorBand content={content.investor} />
      </main>
      <MeridianFooter content={content.footer} />
    </div>
  );
}
