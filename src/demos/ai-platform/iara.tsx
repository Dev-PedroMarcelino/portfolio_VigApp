"use client";

import type { CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { iaraDict } from "./content";
import { Caustics, Grain, IaraStyles, WaveDivider } from "./ui";
import { IaraHeader } from "./iara-header";
import { Hero } from "./hero";
import { WhyBrazilian } from "./why-brazilian";
import { SectorCases } from "./sector-cases";
import { DevApi } from "./dev-api";
import { Security } from "./security";
import { Pricing } from "./pricing";
import { Closing } from "./closing";

/**
 * IARA — Brazilian AI platform concept named after the folklore lady of the
 * waters. Deep-water palette, caustic light, wave dividers; the playground is
 * the hero. All vector/CSS — no WebGL.
 */
const PALETTE = {
  "--d-bg": "#03191D",
  "--d-surface": "#062A30",
  "--d-line": "#12414A",
  "--d-ink": "#E6F4F1",
  "--d-ink-soft": "#93B8B3",
  "--d-ink-faint": "#5E8783",
  "--d-teal": "#2DD4BF",
  "--d-cyan": "#22D3EE",
} as CSSProperties;

export function Iara({ locale }: { locale: string }) {
  const content = pickContent(iaraDict, locale);

  return (
    <div
      id="iara-root"
      lang={content.localeTag}
      style={{ ...PALETTE, backgroundColor: "#03191D", color: "#E6F4F1" }}
      className="relative min-h-screen overflow-x-hidden text-[var(--d-ink)] antialiased [font-family:var(--demo-body)]"
    >
      <IaraStyles />
      <Caustics />
      <Grain />
      <IaraHeader content={content.header} />
      <main className="relative z-10">
        <Hero hero={content.hero} playground={content.playground} />
        <WaveDivider />
        <WhyBrazilian content={content.why} />
        <WaveDivider flip fill="var(--d-surface)" className="bg-[var(--d-bg)]" />
        <SectorCases content={content.cases} />
        <WaveDivider />
        <DevApi content={content.api} />
        <WaveDivider flip fill="var(--d-surface)" className="bg-[var(--d-bg)]" />
        <Security content={content.security} />
        <WaveDivider />
        <Pricing content={content.pricing} localeTag={content.localeTag} />
        <WaveDivider flip fill="var(--d-surface)" className="bg-[var(--d-bg)]" />
        <Closing cta={content.cta} footer={content.footer} />
      </main>
    </div>
  );
}
