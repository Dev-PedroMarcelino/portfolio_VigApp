"use client";

import type { CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { universityDict } from "./content";
import { Header } from "./header";
import { Hero } from "./hero";
import { Programs } from "./programs";
import { Research } from "./research";
import { Admissions } from "./admissions";
import { Stats } from "./stats";
import { StudentLife } from "./student-life";
import { Visit } from "./visit";
import { Footer } from "./footer";

/**
 * Northgate — a historic university concept.
 * Crimson, parchment and oxford navy, with an engraved serif display face and a
 * collegiate crest built in SVG. The full palette is declared here as CSS
 * variables so the demo renders identically in light and dark host themes.
 */
const PALETTE = {
  "--d-bg": "#F4ECDD",
  "--d-surface": "#FBF6EC",
  "--d-ink": "#2A211C",
  "--d-ink-soft": "#6E5F52",
  "--d-line": "#DFD1B8",
  "--d-crimson": "#7A1F2B",
  "--d-crimson-deep": "#571620",
  "--d-crimson-soft": "#ECD9D2",
  "--d-parchment": "#E8DCC8",
  "--d-navy": "#1B2A46",
  "--d-navy-deep": "#141F35",
  "--d-gold": "#B08A46",
  "--d-gold-soft": "#EFE2C4",
  "--d-footer": "#20161B",
} as CSSProperties;

export function Northgate({ locale }: { locale: string }) {
  const content = pickContent(universityDict, locale);

  return (
    <div
      style={{ ...PALETTE, backgroundColor: "#F4ECDD", color: "#2A211C" }}
      className="min-h-screen [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased"
    >
      <Header content={content.header} />
      <main>
        <Hero content={content.hero} />
        <Programs content={content.programs} />
        <Research content={content.research} />
        <Admissions content={content.admissions} />
        <Stats content={content.stats} />
        <StudentLife content={content.life} />
        <Visit content={content.visit} />
      </main>
      <Footer content={content.footer} />
    </div>
  );
}
