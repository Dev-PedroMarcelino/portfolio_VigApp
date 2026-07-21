"use client";

import { useCallback, useState } from "react";
import type { CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import { pickContent } from "@/demos/content";
import type { BookingRequest, SpecialtyId } from "./content";
import { auroraDict } from "./content";
import { AuroraHeader } from "./aurora-header";
import { AuroraHero } from "./hero";
import { SpecialtiesSection } from "./specialties";
import { DoctorsSection } from "./doctors";
import { JourneySection } from "./journey";
import { PlansSection } from "./plans";
import { TestimonialsSection } from "./testimonials";
import { FaqSection } from "./faq";
import { BookingSection } from "./booking";
import { AuroraFooter } from "./footer";

/**
 * Aurora Health — calm, human healthcare concept.
 * Soft mint, deep teal and warm white, defined as CSS variables so the demo
 * renders identically whatever theme the host site is in.
 */
const PALETTE = {
  "--d-bg": "#FBFDFC",
  "--d-mint": "#EAF6F4",
  "--d-mint-deep": "#DBEDE9",
  "--d-mist": "#F2FAF8",
  "--d-card": "#FFFFFF",
  "--d-cream": "#FBF3E7",
  "--d-ink": "#0F2E2B",
  "--d-ink-soft": "#517470",
  "--d-accent": "#1D8A7E",
  "--d-accent-deep": "#136A60",
  "--d-teal-dark": "#0C4A43",
  "--d-teal-ink": "#083A34",
  "--d-line": "#D6E8E4",
  "--d-glow": "#BFE3DC",
  "--d-foam": "#EAF6F3",
  "--d-foam-dim": "#9CC3BC",
  "--d-peach": "#E9A178",
} as CSSProperties;

export function AuroraHealth({ locale }: { locale: string }) {
  const content = pickContent(auroraDict, locale);
  const reduce = useReducedMotion() ?? false;
  const [request, setRequest] = useState<BookingRequest>({
    specialty: null,
    doctorId: null,
    token: 0,
  });

  /** Raised by the hero card, specialty grid and doctor directory: presets the
   *  stepper and glides down to the booking section. */
  const requestBooking = useCallback(
    (specialty: SpecialtyId | null, doctorId: string | null) => {
      setRequest((prev) => ({ specialty, doctorId, token: prev.token + 1 }));
      document
        .getElementById("booking")
        ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    },
    [reduce],
  );

  return (
    <div
      style={{ ...PALETTE, backgroundColor: "#FBFDFC", color: "#0F2E2B" }}
      className="min-h-screen [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased"
    >
      <AuroraHeader content={content.header} onBook={() => requestBooking(null, null)} />
      <main>
        <AuroraHero
          content={content.hero}
          specialties={content.specialties.items}
          onBook={requestBooking}
        />
        <SpecialtiesSection content={content.specialties} onBook={requestBooking} />
        <DoctorsSection
          content={content.doctors}
          specialties={content.specialties.items}
          onBook={requestBooking}
        />
        <JourneySection content={content.journey} />
        <PlansSection content={content.plans} />
        <TestimonialsSection content={content.testimonials} />
        <FaqSection content={content.faq} />
        <BookingSection
          content={content.booking}
          contact={content.contact}
          specialties={content.specialties.items}
          doctors={content.doctors.doctors}
          request={request}
        />
      </main>
      <AuroraFooter content={content.footer} />
    </div>
  );
}
