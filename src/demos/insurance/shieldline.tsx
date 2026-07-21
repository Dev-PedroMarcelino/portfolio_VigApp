"use client";

import type { CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { shieldlineDict } from "./content";
import { SlHeader } from "./sl-header";
import { SlHero } from "./sl-hero";
import { CoverageSection } from "./coverage-section";
import { ClaimsTimeline } from "./claims-timeline";
import { StatsBand } from "./stats-band";
import { ReviewsSection } from "./reviews-section";
import { FaqSection } from "./faq-section";
import { AgentSection } from "./agent-section";
import { SlFooter } from "./sl-footer";

/**
 * Shieldline — plain-language insurance concept.
 * Cool indigo on porcelain with shield geometry; the palette lives here as
 * CSS variables so the demo renders identically in light and dark host themes.
 */
const PALETTE = {
  "--d-bg": "#EEF2FF",
  "--d-paper": "#F9FAFF",
  "--d-mist": "#E4EAFC",
  "--d-ink": "#101736",
  "--d-ink-soft": "#4E587E",
  "--d-accent": "#1D4ED8",
  "--d-accent-soft": "#DCE5FF",
  "--d-line": "#D6DEF5",
  "--d-navy": "#0D1440",
  "--d-navy-2": "#141D52",
  "--d-cloud": "#B9C4EF",
  "--d-gold": "#F2B33D",
} as CSSProperties;

export function Shieldline({ locale }: { locale: string }) {
  const content = pickContent(shieldlineDict, locale);

  return (
    <div
      style={{ ...PALETTE, backgroundColor: "#EEF2FF", color: "#101736" }}
      className="relative min-h-screen [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased"
    >
      <SlHeader content={content.header} />
      <main>
        <SlHero content={content.hero} quote={content.quote} money={content.money} />
        <CoverageSection content={content.coverage} money={content.money} />
        <ClaimsTimeline content={content.claims} />
        <StatsBand content={content.stats} />
        <ReviewsSection content={content.reviews} />
        <FaqSection content={content.faq} />
        <AgentSection content={content.agent} />
      </main>
      <SlFooter content={content.footer} />
    </div>
  );
}
