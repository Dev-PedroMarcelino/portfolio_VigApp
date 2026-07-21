"use client";

import type { CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { schoolDict } from "./content";
import { Header } from "./header";
import { Hero } from "./hero";
import { Programs } from "./programs";
import { DayTimeline } from "./day-timeline";
import { Gallery } from "./gallery";
import { Teachers } from "./teachers";
import { Stats } from "./stats";
import { Enrollment } from "./enrollment";
import { Footer } from "./footer";

/**
 * Brightpath — joyful K-12 school concept.
 * Cornflower blue, sunshine yellow, coral and mint. The full palette lives here
 * as CSS variables so the demo renders identically in light and dark host themes.
 */
const PALETTE = {
  "--d-bg": "#EEF4FF",
  "--d-surface": "#FFFFFF",
  "--d-ink": "#16233D",
  "--d-ink-soft": "#55637D",
  "--d-line": "#DCE4F5",
  "--d-accent": "#2563EB",
  "--d-accent-deep": "#1D4FBF",
  "--d-accent-soft": "#DCE7FF",
  "--d-sun": "#FFC53D",
  "--d-sun-deep": "#9A6B00",
  "--d-sun-soft": "#FFF0C7",
  "--d-coral": "#FF6B6B",
  "--d-coral-deep": "#C23B3B",
  "--d-coral-soft": "#FFDFDD",
  "--d-mint": "#34D399",
  "--d-mint-deep": "#0F8A5F",
  "--d-mint-soft": "#CFF5E5",
  "--d-footer": "#101E38",
} as CSSProperties;

export function Brightpath({ locale }: { locale: string }) {
  const content = pickContent(schoolDict, locale);

  return (
    <div
      style={{ ...PALETTE, backgroundColor: "#EEF4FF", color: "#16233D" }}
      className="min-h-screen [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased"
    >
      <Header content={content.header} />
      <main>
        <Hero content={content.hero} />
        <Programs content={content.programs} />
        <DayTimeline content={content.day} />
        <Gallery content={content.gallery} />
        <Teachers content={content.teachers} />
        <Stats content={content.stats} />
        <Enrollment content={content.enroll} />
      </main>
      <Footer content={content.footer} />
    </div>
  );
}
