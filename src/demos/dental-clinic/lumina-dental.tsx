"use client";

import type { CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { luminaDict } from "./content";
import { LuminaHeader } from "./lumina-header";
import { Hero } from "./hero";
import { TreatmentsSection } from "./treatments-section";
import { SmileGallery } from "./smile-gallery";
import { TeamSection } from "./team-section";
import { AppointmentSection } from "./appointment-section";
import { FaqSection } from "./faq-section";
import { LuminaFooter } from "./lumina-footer";

/**
 * Lumina Dental — modern dental studio concept.
 * Sky blue and polar white with soft floating blobs and glossy highlights.
 * The palette lives here as CSS variables so the demo renders identically in
 * light and dark host themes.
 */
const PALETTE = {
  "--d-bg": "#E9F4FC",
  "--d-mist": "#F6FBFF",
  "--d-white": "#FFFFFF",
  "--d-sky": "#D7EAF8",
  "--d-ink": "#0D2B45",
  "--d-ink-soft": "#48688A",
  "--d-accent": "#2E7CC0",
  "--d-accent-deep": "#1D5E9C",
  "--d-aqua": "#5FC2D9",
  "--d-line": "#CBE2F3",
  "--d-glow": "#9FD1F2",
  "--d-navy": "#0B2540",
} as CSSProperties;

export function LuminaDental({ locale }: { locale: string }) {
  const content = pickContent(luminaDict, locale);

  return (
    <div
      style={{ ...PALETTE, backgroundColor: "#E9F4FC", color: "#0D2B45" }}
      className="relative min-h-screen overflow-x-clip [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased"
    >
      <LuminaHeader content={content.header} />
      <main>
        <Hero content={content.hero} />
        <TreatmentsSection content={content.treatments} />
        <SmileGallery content={content.gallery} />
        <TeamSection content={content.team} />
        <AppointmentSection content={content.appointment} />
        <FaqSection content={content.faq} />
      </main>
      <LuminaFooter content={content.footer} />
    </div>
  );
}
