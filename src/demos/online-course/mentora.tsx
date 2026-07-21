"use client";

import type { CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { mentoraDict } from "./content";
import { Grain } from "./ui";
import { MentoraHeader } from "./mentora-header";
import { MentoraHero } from "./mentora-hero";
import { OutcomesSection } from "./outcomes-section";
import { CurriculumSection } from "./curriculum-section";
import { InstructorSection } from "./instructor-section";
import { GallerySection } from "./gallery-section";
import { TestimonialsSection } from "./testimonials-section";
import { PricingSection } from "./pricing-section";
import { CountdownSection } from "./countdown-section";
import { EnrollSection } from "./enroll-section";
import { FaqSection } from "./faq-section";
import { MentoraFooter } from "./mentora-footer";

/**
 * Mentora — premium cohort course concept (product design).
 * Warm charcoal, amber and cream. The palette lives here as CSS variables so
 * the demo renders identically regardless of the host site theme.
 */
const PALETTE = {
  "--d-charcoal": "#1C1917",
  "--d-charcoal-2": "#161311",
  "--d-charcoal-soft": "#26211C",
  "--d-charcoal-line": "#3A332D",
  "--d-cream": "#F6F0E6",
  "--d-cream-soft": "#FBF7F0",
  "--d-cream-dim": "#B7AC9B",
  "--d-sand": "#EFE6D6",
  "--d-sand-strong": "#D8C5A4",
  "--d-ink": "#211C18",
  "--d-ink-soft": "#6E6153",
  "--d-line": "#E2D6C4",
  "--d-accent": "#F59E0B",
  "--d-accent-deep": "#C97C0C",
  "--d-amber-soft": "#E9B968",
} as CSSProperties;

export function Mentora({ locale }: { locale: string }) {
  const content = pickContent(mentoraDict, locale);
  const plans = content.pricing.tiers.map((tier) => ({ id: tier.id, name: tier.name }));

  return (
    <div
      style={{ ...PALETTE, backgroundColor: "#F6F0E6", color: "#211C18" }}
      className="relative min-h-screen [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased"
    >
      <Grain />
      <MentoraHeader content={content.header} />
      <main>
        <MentoraHero content={content.hero} />
        <OutcomesSection content={content.outcomes} />
        <CurriculumSection content={content.curriculum} />
        <InstructorSection content={content.instructor} />
        <GallerySection content={content.gallery} />
        <TestimonialsSection content={content.testimonials} />
        <PricingSection content={content.pricing} />
        <CountdownSection content={content.countdown} />
        <EnrollSection content={content.enroll} plans={plans} />
        <FaqSection content={content.faq} />
      </main>
      <MentoraFooter content={content.footer} />
    </div>
  );
}
