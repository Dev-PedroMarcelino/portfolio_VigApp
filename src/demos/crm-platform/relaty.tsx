"use client";

import type { CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { relatyDict } from "./content";
import { Header } from "./header";
import { Hero } from "./hero";
import { Features } from "./features";
import { Contacts } from "./contacts";
import { Automations } from "./automations";
import { Pricing } from "./pricing";
import { Testimonials } from "./testimonials";
import { Cta } from "./cta";
import { Footer } from "./footer";

/**
 * Relaty — a focused CRM concept.
 * Paper white and indigo with candy accents for each pipeline stage. The
 * palette lives here as CSS variables so the demo renders identically whether
 * the host site is in light or dark mode.
 */
const PALETTE = {
  "--d-bg": "#F6F7FB",
  "--d-bg-alt": "#EFF1F8",
  "--d-surface": "#FFFFFF",
  "--d-ink": "#1E1B4B",
  "--d-ink-soft": "#565973",
  "--d-ink-faint": "#8A8DA6",
  "--d-line": "#E6E8F2",
  "--d-line-strong": "#D3D6E6",
  "--d-accent": "#4F46E5",
  "--d-accent-deep": "#4338CA",
  "--d-accent-soft": "#EEF0FF",
  "--d-accent-ink": "#FFFFFF",
} as CSSProperties;

export function Relaty({ locale }: { locale: string }) {
  const content = pickContent(relatyDict, locale);

  return (
    <div
      style={{ ...PALETTE, backgroundColor: "#F6F7FB", color: "#1E1B4B" }}
      className="relative min-h-screen [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased selection:bg-[rgba(79,70,229,0.18)]"
    >
      <Header content={content.nav} />
      <main>
        <Hero content={content.hero} />
        <Features content={content.features} />
        <Contacts content={content.contacts} />
        <Automations content={content.automations} />
        <Pricing content={content.pricing} />
        <Testimonials content={content.testimonials} />
        <Cta content={content.cta} />
      </main>
      <Footer content={content.footer} />
    </div>
  );
}
