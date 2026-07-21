"use client";

import type { CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { vantageDict } from "./content";
import { Grain } from "./ui";
import { VantageHeader } from "./vantage-header";
import { VantageHero } from "./vantage-hero";
import { AllocationSection } from "./allocation-section";
import { GrowthSimulator } from "./growth-simulator";
import { AssetClasses } from "./asset-classes";
import { PerformanceSection } from "./performance-section";
import { QuoteBand } from "./quote-band";
import { AdvisorsSection } from "./advisors-section";
import { OnboardingSection } from "./onboarding-section";
import { VantageFooter } from "./vantage-footer";

/**
 * Vantage Capital — private wealth management concept.
 * Midnight navy, muted gold and ivory serif; the palette lives here as CSS
 * variables so the demo renders identically in light and dark host themes.
 */
const PALETTE = {
  "--d-bg": "#0B1221",
  "--d-bg-soft": "#0E1626",
  "--d-panel": "#131E33",
  "--d-line": "#1E2A42",
  "--d-ink": "#F4EFE4",
  "--d-ink-soft": "#9BA6BC",
  "--d-gold": "#D1B166",
  "--d-green": "#8FBFA5",
} as CSSProperties;

export function VantageCapital({ locale }: { locale: string }) {
  const content = pickContent(vantageDict, locale);

  return (
    <div
      style={{ ...PALETTE, backgroundColor: "#0B1221", color: "#F4EFE4" }}
      className="relative min-h-screen [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased"
    >
      <Grain />
      <VantageHeader content={content.header} />
      <main>
        <VantageHero content={content.hero} />
        <AllocationSection content={content.allocation} />
        <GrowthSimulator content={content.simulator} />
        <AssetClasses content={content.assetClasses} />
        <PerformanceSection content={content.performance} />
        <QuoteBand content={content.quote} />
        <AdvisorsSection content={content.advisors} />
        <OnboardingSection content={content.onboarding} />
      </main>
      <VantageFooter content={content.footer} />
    </div>
  );
}
