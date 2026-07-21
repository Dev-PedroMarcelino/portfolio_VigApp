"use client";

import type { CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { cortexaDict } from "./content";
import { Header } from "./header";
import { Hero } from "./hero";
import { Playground } from "./playground";
import { UseCases } from "./use-cases";
import { ModelTiers } from "./model-tiers";
import { Security } from "./security";
import { Pricing } from "./pricing";
import { Cta } from "./cta";
import { Footer } from "./footer";

/**
 * Cortexa — AI reasoning platform concept.
 * Void black surface, violet neural glow, streaming mono output. The palette
 * lives here as CSS variables so the demo renders identically regardless of
 * the host site's light or dark theme.
 */
const PALETTE = {
  "--d-bg": "#05050A",
  "--d-surface": "#0B0A14",
  "--d-panel": "rgba(167,139,250,0.06)",
  "--d-line": "rgba(167,139,250,0.14)",
  "--d-line-strong": "rgba(167,139,250,0.28)",
  "--d-ink": "#ECEAF6",
  "--d-ink-soft": "#A5A1C4",
  "--d-ink-faint": "#6B6788",
  "--d-accent": "#A78BFA",
  "--d-accent-bright": "#C4B5FD",
  "--d-accent-ink": "#0A0713",
} as CSSProperties;

export function Cortexa({ locale }: { locale: string }) {
  const content = pickContent(cortexaDict, locale);

  return (
    <div
      style={{ ...PALETTE, backgroundColor: "#05050A", color: "#ECEAF6" }}
      className="relative min-h-screen overflow-x-clip [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased selection:bg-[rgba(167,139,250,0.4)]"
    >
      <Header content={content.nav} />
      <main>
        <Hero content={content.hero} />
        <Playground content={content.playground} />
        <UseCases content={content.useCases} />
        <ModelTiers content={content.models} />
        <Security content={content.security} />
        <Pricing content={content.pricing} />
        <Cta content={content.cta} />
      </main>
      <Footer content={content.footer} />
    </div>
  );
}
