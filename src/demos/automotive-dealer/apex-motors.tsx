"use client";

import type { CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { apexDict } from "./content";
import { ApexHeader } from "./apex-header";
import { ApexHero } from "./apex-hero";
import { LineupSection } from "./lineup-section";
import { ConfiguratorSection } from "./configurator-section";
import { PerformanceSection } from "./performance-section";
import { TestDriveSection } from "./testdrive-section";
import { FinancingSection } from "./financing-section";
import { ApexFooter } from "./apex-footer";

/**
 * Apex Motors — a performance-car dealer concept.
 * Carbon black, racing red and brushed-metal grays. The palette lives as CSS
 * variables on the root so the demo renders identically in any host theme.
 */
const PALETTE = {
  "--d-bg": "#0C0C0F",
  "--d-carbon": "#08080A",
  "--d-surface": "#131318",
  "--d-surface-2": "#1C1C23",
  "--d-ink": "#F2F2F4",
  "--d-ink-soft": "#9A9AA6",
  "--d-metal": "#6E7078",
  "--d-metal-light": "#B8BAC2",
  "--d-accent": "#C8102E",
  "--d-accent-soft": "#EF3F55",
  "--d-line": "rgba(255,255,255,0.09)",
} as CSSProperties;

export function ApexMotors({ locale }: { locale: string }) {
  const content = pickContent(apexDict, locale);

  return (
    <div
      style={{ ...PALETTE, backgroundColor: "#0C0C0F", color: "#F2F2F4" }}
      className="relative min-h-screen [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased"
    >
      <ApexHeader content={content.header} />
      <main>
        <ApexHero content={content.hero} />
        <LineupSection content={content.lineup} />
        <ConfiguratorSection content={content.configurator} />
        <PerformanceSection content={content.performance} />
        <TestDriveSection content={content.testDrive} />
        <FinancingSection content={content.financing} />
      </main>
      <ApexFooter content={content.footer} />
    </div>
  );
}
