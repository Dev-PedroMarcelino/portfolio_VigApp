"use client";

import type { CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { garagemDict } from "./content";
import { PosterGrain } from "./ui";
import { GaragemHeader } from "./garagem-header";
import { HeroPoster } from "./hero-poster";
import { MenuBoard } from "./menu-board";
import { CasaSection } from "./casa-section";
import { ShowsSection } from "./shows-section";
import { VisitSection } from "./visit-section";
import { GaragemFooter } from "./garagem-footer";

/**
 * Garagem Burger — Brazilian rock-bar burger joint in Cambuí, Campinas/SP.
 * Gig-poster identity: near-black asphalt, poster red and mustard, halftone
 * grain, masking tape and stamps. The palette is declared as CSS variables on
 * the root so the demo renders identically in either host theme.
 */
const PALETTE = {
  "--d-bg": "#0E0A08",
  "--d-bg-soft": "#15100C",
  "--d-panel": "#1C1510",
  "--d-line": "#33281F",
  "--d-ink": "#F5EFE6",
  "--d-ink-soft": "#B3A896",
  "--d-red": "#F43F2E",
  "--d-yellow": "#F2B705",
  "--d-paper": "#F5EFE6",
} as CSSProperties;

export function GaragemBurger({ locale }: { locale: string }) {
  const content = pickContent(garagemDict, locale);

  return (
    <div
      style={{ ...PALETTE, backgroundColor: "#0E0A08", color: "#F5EFE6" }}
      className="relative min-h-screen overflow-x-hidden text-[var(--d-ink)] antialiased [font-family:var(--demo-body)] selection:bg-[var(--d-red)] selection:text-[var(--d-bg)]"
    >
      <PosterGrain />
      <GaragemHeader content={content.header} />
      <main>
        <HeroPoster content={content.hero} />
        <MenuBoard content={content.menu} />
        <CasaSection content={content.casa} />
        <ShowsSection content={content.shows} />
        <VisitSection content={content.visit} />
      </main>
      <GaragemFooter content={content.footer} />
    </div>
  );
}
