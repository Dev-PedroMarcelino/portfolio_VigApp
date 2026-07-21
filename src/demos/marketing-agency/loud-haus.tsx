"use client";

import type { CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { loudDict } from "./content";
import { LoudStyles } from "./ui";
import { LoudHeader } from "./loud-header";
import { LoudHero } from "./loud-hero";
import { ServicesTicker } from "./services-ticker";
import { CaseStudies } from "./case-studies";
import { Manifesto } from "./manifesto";
import { AwardsPress } from "./awards-press";
import { LoudContact } from "./loud-contact";
import { LoudFooter } from "./loud-footer";

/**
 * LOUD/HAUS — brutalist creative-agency concept. Bone paper, jet-black 2px
 * borders and safety orange, pinned to CSS variables so the demo renders
 * identically regardless of the host site theme.
 */
const PALETTE = {
  "--d-bg": "#EDEDE6",
  "--d-paper": "#F6F5EF",
  "--d-ink": "#0E0C08",
  "--d-accent": "#FF4D00",
  "--d-accent-ink": "#FDF7EF",
} as CSSProperties;

export function LoudHaus({ locale }: { locale: string }) {
  const content = pickContent(loudDict, locale);

  return (
    <div
      style={{ ...PALETTE, backgroundColor: "#EDEDE6", color: "#0E0C08" }}
      className="min-h-screen [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased selection:bg-[var(--d-accent)] selection:text-[var(--d-accent-ink)]"
    >
      <LoudStyles />
      <LoudHeader content={content.nav} />
      <main>
        <LoudHero content={content.hero} />
        <ServicesTicker content={content.services} />
        <CaseStudies content={content.cases} />
        <Manifesto content={content.manifesto} />
        <AwardsPress content={content.awards} />
        <LoudContact content={content.contact} />
      </main>
      <LoudFooter content={content.footer} />
    </div>
  );
}
