"use client";

import type { CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { zelaDict } from "./content";
import { ZelaHeader } from "./zela-header";
import { ZelaHero } from "./zela-hero";
import { ZelaPix } from "./zela-pix";
import { ZelaBoxes } from "./zela-caixinhas";
import { ZelaCard } from "./zela-card";
import { ZelaSecurity } from "./zela-security";
import { ZelaFees } from "./zela-fees";
import { ZelaCta } from "./zela-cta";
import { ZelaFooter } from "./zela-footer";

/**
 * Zela — a warm, cream-and-green Brazilian digital account. The deliberate
 * inverse of the dark-fintech cliché: organic shapes, serif warmth and one
 * single dark passage (the metal card stage) for dramatic contrast.
 *
 * Every amount is R$ formatted with pt-BR in all languages — the product is
 * Brazilian; only the interface translates.
 */
const PALETTE = {
  "--d-bg": "#F7F3EA", // warm cream page
  "--d-surface": "#FFFDF7", // raised panels
  "--d-line": "#E5DCC8", // hairlines
  "--d-ink": "#1C2B24", // deep green-black text
  "--d-ink-soft": "#57675D", // muted text (AA on cream)
  "--d-green": "#166B4A", // brand deep green (AA on cream)
  "--d-forest": "#0E3B29", // dark stage for the 3D card + CTA
  "--d-lime": "#7CB342", // soft lime accent (decorative / on dark)
  "--d-lime-deep": "#47691F", // lime for small text on cream (AA)
  "--d-amber": "#E8A13D", // warm amber accent (decorative / on dark)
  "--d-amber-deep": "#9A6314", // amber for small text on cream (AA)
} as CSSProperties;

export function Zela({ locale }: { locale: string }) {
  const content = pickContent(zelaDict, locale);

  return (
    <div
      id="top"
      style={{ ...PALETTE, backgroundColor: "#F7F3EA", color: "#1C2B24" }}
      className="relative min-h-screen overflow-x-hidden text-[var(--d-ink)] antialiased [font-family:var(--demo-body)]"
    >
      <ZelaHeader content={content.header} />
      <main>
        <ZelaHero content={content.hero} />
        <ZelaPix content={content.pix} />
        <ZelaBoxes content={content.boxes} />
        <ZelaCard content={content.card} />
        <ZelaSecurity content={content.security} />
        <ZelaFees content={content.fees} />
        <ZelaCta content={content.cta} />
      </main>
      <ZelaFooter content={content.footer} />
    </div>
  );
}
