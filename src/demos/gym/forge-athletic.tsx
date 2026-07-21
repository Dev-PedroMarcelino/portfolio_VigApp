"use client";

import type { CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { gymDict } from "./content";
import { ForgeHeader } from "./forge-header";
import { ForgeHero } from "./forge-hero";
import { ProgramsGrid } from "./programs-grid";
import { ClassSchedule } from "./class-schedule";
import { MembershipPlans } from "./membership-plans";
import { TrainersSection } from "./trainers-section";
import { StatsCounters } from "./stats-counters";
import { RmCalculator } from "./rm-calculator";
import { JoinCta } from "./join-cta";
import { ForgeFooter } from "./forge-footer";

/**
 * Forge Athletic — a blackout performance-gym concept.
 * Palette lives as CSS variables on the root so the demo renders identically
 * regardless of the host site's light/dark theme.
 */
const PALETTE = {
  "--d-bg": "#0B0B0D",
  "--d-panel": "#141418",
  "--d-ink": "#F4F4F0",
  "--d-ink-dim": "#A6A6AE",
  "--d-ink-faint": "#6B6B72",
  "--d-line": "#22222A",
  "--d-line-bright": "#33333D",
  "--d-accent": "#D7FF3E",
} as CSSProperties;

export function ForgeAthletic({ locale }: { locale: string }) {
  const content = pickContent(gymDict, locale);

  return (
    <div
      style={{ ...PALETTE, backgroundColor: "#0B0B0D", color: "#F4F4F0" }}
      className="min-h-screen [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased selection:bg-[#D7FF3E] selection:text-[#0B0B0D]"
    >
      <ForgeHeader content={content.nav} />
      <main>
        <ForgeHero content={content.hero} />
        <ProgramsGrid content={content.programs} />
        <ClassSchedule content={content.schedule} />
        <MembershipPlans content={content.membership} />
        <TrainersSection content={content.trainers} />
        <StatsCounters content={content.stats} locale={content.membership.numberLocale} />
        <RmCalculator content={content.calculator} locale={content.membership.numberLocale} />
        <JoinCta content={content.join} />
      </main>
      <ForgeFooter content={content.footer} />
    </div>
  );
}
