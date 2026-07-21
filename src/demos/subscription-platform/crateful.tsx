"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { cratefulDict } from "./content";
import { Grain } from "./ui";
import { CratefulHeader } from "./crateful-header";
import { CratefulHero } from "./crateful-hero";
import { HowItWorks } from "./how-it-works";
import { PlanBuilder } from "./plan-builder";
import { MonthReveal } from "./month-reveal";
import { PastBoxes } from "./past-boxes";
import { Gifting } from "./gifting";
import { Reviews } from "./reviews";
import { Faq } from "./faq";
import { CratefulFooter } from "./crateful-footer";

/**
 * Crateful — artisanal snack box subscription concept.
 * Cream, tangerine and olive over a kraft-paper texture; the palette lives
 * here as CSS variables so the demo is identical in light and dark hosts.
 */
const PALETTE = {
  "--d-bg": "#FFF4E6",
  "--d-card": "#FFFBF2",
  "--d-ink": "#37271A",
  "--d-ink-soft": "#7C6A55",
  "--d-accent": "#E2593B",
  "--d-accent-deep": "#C24428",
  "--d-olive": "#6B7243",
  "--d-olive-deep": "#474E2C",
  "--d-kraft": "#E9D4B0",
  "--d-kraft-deep": "#C9A97C",
  "--d-peach": "#FFE7CC",
  "--d-line": "#EDDCC2",
  "--d-dark": "#2C1F13",
  "--d-dark-line": "#4A3826",
  "--d-sand": "#F3E6CE",
  "--d-sand-dim": "#B7A387",
} as CSSProperties;

export function Crateful({ locale }: { locale: string }) {
  const content = pickContent(cratefulDict, locale);
  const [giftMode, setGiftMode] = useState(false);

  return (
    <div
      style={{ ...PALETTE, backgroundColor: "#FFF4E6", color: "#37271A" }}
      className="relative min-h-screen [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased"
    >
      <Grain />
      <CratefulHeader content={content.header} giftMode={giftMode} />
      <main>
        <CratefulHero content={content.hero} />
        <HowItWorks content={content.how} />
        <PlanBuilder content={content.builder} />
        <MonthReveal content={content.monthBox} />
        <PastBoxes content={content.pastBoxes} />
        <Gifting
          content={content.gifting}
          giftMode={giftMode}
          onGiftModeChange={setGiftMode}
        />
        <Reviews content={content.reviews} />
        <Faq content={content.faq} />
      </main>
      <CratefulFooter content={content.footer} />
    </div>
  );
}
