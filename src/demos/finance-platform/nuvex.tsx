"use client";

import type { CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { nuvexDict } from "./content";
import { ScanLines, Grain } from "./ui";
import { NuvexHeader } from "./nuvex-header";
import { HeroSection } from "./hero-section";
import { DashboardSection } from "./dashboard-section";
import { SavingsSection } from "./savings-section";
import { SecuritySection } from "./security-section";
import { PricingSection } from "./pricing-section";
import { CtaSection } from "./cta-section";
import { NuvexFooter } from "./nuvex-footer";

/**
 * Nuvex — dark-futurist neobank concept.
 * Obsidian surface, emerald glow and mono numerals. The palette is declared as
 * CSS variables on the root so the demo renders identically in either host theme.
 */
const PALETTE = {
  "--d-bg": "#05070C",
  "--d-bg-soft": "#0A0E16",
  "--d-panel": "#0E141F",
  "--d-line": "#1B2536",
  "--d-ink": "#E9F2EE",
  "--d-ink-soft": "#7E8CA0",
  "--d-accent": "#10B981",
  "--d-accent-soft": "#34D399",
  "--d-accent-deep": "#059669",
} as CSSProperties;

export function Nuvex({ locale }: { locale: string }) {
  const content = pickContent(nuvexDict, locale);
  const { localeTag, currency } = content;

  return (
    <div
      style={{ ...PALETTE, backgroundColor: "#05070C", color: "#E9F2EE" }}
      className="relative min-h-screen overflow-x-hidden [font-family:var(--demo-display)] text-[var(--d-ink)] antialiased"
    >
      <Grain />
      <ScanLines />
      <NuvexHeader content={content.header} />
      <main>
        <HeroSection content={content.hero} localeTag={localeTag} currency={currency} />
        <DashboardSection
          content={content.dashboard}
          transfer={content.transfer}
          localeTag={localeTag}
          currency={currency}
        />
        <SavingsSection content={content.savings} localeTag={localeTag} currency={currency} />
        <SecuritySection content={content.security} altText={content.security.imageAlt} />
        <PricingSection content={content.pricing} />
        <CtaSection content={content.cta} />
      </main>
      <NuvexFooter content={content.footer} />
    </div>
  );
}
