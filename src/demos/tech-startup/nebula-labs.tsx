"use client";

import type { CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { nebulaDict } from "./content";
import { NebulaHeader } from "./nebula-header";
import { NebulaHero } from "./nebula-hero";
import { FeatureTour } from "./feature-tour";
import { TerminalShowcase } from "./terminal-showcase";
import { MetricsBand } from "./metrics-band";
import { ChangelogSection } from "./changelog-section";
import { BackedBy } from "./backed-by";
import { WaitlistCta } from "./waitlist-cta";
import { NebulaFooter } from "./nebula-footer";

/**
 * Nebula Labs — venture-backed dev-tools startup concept.
 * Void black with aurora violet/indigo, defined as CSS variables so the demo
 * renders identically regardless of the host site theme.
 */
const PALETTE = {
  "--d-bg": "#0B0B12",
  "--d-bg-raise": "#101019",
  "--d-panel": "#13131F",
  "--d-ink": "#EEECFB",
  "--d-ink-dim": "#A5A3C2",
  "--d-ink-faint": "#6D6B8A",
  "--d-line": "#232336",
  "--d-line-bright": "#32324D",
  "--d-accent": "#8B5CF6",
  "--d-accent-soft": "#A78BFA",
  "--d-indigo": "#6366F1",
  "--d-cyan": "#22D3EE",
  "--d-green": "#34D399",
  "--d-amber": "#FBBF24",
  "--d-rose": "#FB7185",
  "--d-mono": "ui-monospace, 'SF Mono', 'Cascadia Code', Menlo, Consolas, monospace",
} as CSSProperties;

export function NebulaLabs({ locale }: { locale: string }) {
  const content = pickContent(nebulaDict, locale);

  return (
    <div
      style={{ ...PALETTE, backgroundColor: "#0B0B12", color: "#EEECFB" }}
      className="relative min-h-screen [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased selection:bg-[#8B5CF6]/40"
    >
      <NebulaHeader content={content.nav} />
      <main>
        <NebulaHero content={content.hero} numberLocale={content.numberLocale} />
        <FeatureTour content={content.tour} />
        <TerminalShowcase content={content.terminal} />
        <MetricsBand content={content.metrics} numberLocale={content.numberLocale} />
        <ChangelogSection content={content.changelog} />
        <BackedBy content={content.backedBy} />
        <WaitlistCta content={content.cta} numberLocale={content.numberLocale} />
      </main>
      <NebulaFooter content={content.footer} />
    </div>
  );
}
