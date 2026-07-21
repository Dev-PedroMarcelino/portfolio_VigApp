"use client";

import type { CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { haloDict } from "./content";
import { HaloHeader } from "./halo-header";
import { HaloHero } from "./halo-hero";
import { SocialProof } from "./social-proof";
import { Benefits } from "./benefits";
import { SpecSheet } from "./spec-sheet";
import { Comparison } from "./comparison";
import { Testimonials } from "./testimonials";
import { Pricing } from "./pricing";
import { Faq } from "./faq";
import { FinalCta } from "./final-cta";
import { HaloFooter } from "./halo-footer";
import { BackToTop } from "./back-to-top";

/**
 * HALO — single-product conversion page for a smart ring.
 * Charcoal surface with a mint glow, defined as CSS variables on the root so
 * the demo renders identically regardless of the host site theme.
 */
const PALETTE = {
  "--d-bg": "#0E0E12",
  "--d-bg-raise": "#131319",
  "--d-panel": "#17171F",
  "--d-ink": "#F2F5F2",
  "--d-ink-dim": "#A7ADA9",
  "--d-ink-faint": "#6B716D",
  "--d-line": "#23242B",
  "--d-line-bright": "#33353E",
  "--d-accent": "#7EE7C7",
  "--d-accent-deep": "#3FB89A",
} as CSSProperties;

export function Halo({ locale }: { locale: string }) {
  const content = pickContent(haloDict, locale);

  return (
    <div
      style={{ ...PALETTE, backgroundColor: "#0E0E12", color: "#F2F5F2" }}
      className="relative min-h-screen [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased selection:bg-[#7EE7C7]/30"
    >
      <HaloHeader content={content.nav} />
      <main>
        <HaloHero content={content.hero} />
        <SocialProof content={content.proof} />
        <Benefits content={content.benefits} />
        <SpecSheet content={content.specs} />
        <Comparison content={content.comparison} />
        <Testimonials content={content.testimonials} />
        <Pricing content={content.pricing} intlLocale={content.intlLocale} currency={content.currency} />
        <Faq content={content.faq} />
        <FinalCta content={content.finalCta} />
      </main>
      <HaloFooter content={content.footer} />
      <BackToTop label={content.backToTop} />
    </div>
  );
}
