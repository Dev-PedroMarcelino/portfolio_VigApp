"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Compass, Menu, X } from "lucide-react";
import { pickContent } from "@/demos/content";
import { travelDictionary, type TravelContent, type FilterOption } from "./content";
import { Hero } from "./hero";
import { Journeys } from "./journeys";
import { JourneyDetail } from "./journey-detail";
import { StyleQuiz } from "./style-quiz";
import { TailorMade } from "./tailor-made";
import { Journal } from "./journal";
import { BrandFooter } from "./footer";

const PALETTE = {
  "--d-bg": "#062E38",
  "--d-surface": "#083A47",
  "--d-raised": "#0C4756",
  "--d-deep": "#04222A",
  "--d-ink": "#F6EFE3",
  "--d-ink-soft": "#C6D4D3",
  "--d-ink-faint": "#7E9B9C",
  "--d-peach": "#FDBA74",
  "--d-peach-bright": "#FCD9B0",
  "--d-coral": "#F19A6B",
  "--d-sand": "#E7D8BE",
  "--d-line": "rgba(253,186,116,0.30)",
  "--d-line-soft": "rgba(246,239,227,0.13)",
  backgroundColor: "#062E38",
  color: "#F6EFE3",
} as React.CSSProperties;

export type CurrencyFormatter = (value: number) => string;
export type ContinentId = FilterOption["id"];

function SiteHeader({ content }: { content: TravelContent["header"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[8600] transition-all duration-700 ${
        scrolled
          ? "border-b border-[var(--d-line-soft)] bg-[rgba(4,34,42,0.82)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-6 px-5 sm:h-[76px] sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-peach)] text-[var(--d-peach)]">
            <Compass aria-hidden className="h-4 w-4" strokeWidth={1.5} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="[font-family:var(--demo-display)] text-[22px] font-semibold tracking-tight text-[var(--d-ink)]">
              Atlas <span className="italic font-normal text-[var(--d-peach)]">Voyages</span>
            </span>
            <span className="mt-1 hidden text-[8px] uppercase tracking-[0.42em] text-[var(--d-ink-faint)] sm:block">
              {content.tagline}
            </span>
          </span>
        </a>

        <nav aria-label={content.navAria} className="hidden items-center gap-7 lg:flex">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--d-ink-soft)] transition-colors duration-300 hover:text-[var(--d-peach)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#quiz"
            className="hidden rounded-full bg-[var(--d-peach)] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#04222A] transition-transform duration-300 hover:scale-[1.04] sm:inline-block"
          >
            {content.planCta}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={content.menuAria}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink)] lg:hidden"
          >
            {open ? <X className="h-4 w-4" strokeWidth={1.6} /> : <Menu className="h-4 w-4" strokeWidth={1.6} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--d-line-soft)] bg-[rgba(4,34,42,0.97)] px-5 py-5 backdrop-blur-md lg:hidden">
          <nav aria-label={content.navAria} className="flex flex-col gap-1">
            {content.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-[var(--d-line-soft)] py-3 text-xs font-semibold uppercase tracking-[0.26em] text-[var(--d-ink-soft)]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#quiz"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-[var(--d-peach)] py-3 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-[#04222A]"
            >
              {content.planCta}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export function AtlasRoot({ locale }: { locale: string }) {
  const content = pickContent(travelDictionary, locale);

  const [continent, setContinent] = useState<ContinentId>("all");
  const [selectedJourneyId, setSelectedJourneyId] = useState<string>(
    content.journeys.items[0]?.id ?? "",
  );

  const format = useMemo<CurrencyFormatter>(() => {
    const formatter = new Intl.NumberFormat(content.format.locale, {
      style: "currency",
      currency: content.format.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return (value: number) => formatter.format(value);
  }, [content.format.locale, content.format.currency]);

  const openJourney = useCallback((id: string) => {
    setSelectedJourneyId(id);
    if (typeof document !== "undefined") {
      document.getElementById("itinerary")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const selectContinent = useCallback((id: ContinentId) => {
    setContinent(id);
    if (typeof document !== "undefined") {
      document.getElementById("journeys")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const selectedJourney =
    content.journeys.items.find((j) => j.id === selectedJourneyId) ?? content.journeys.items[0];

  return (
    <div
      id="top"
      style={PALETTE}
      className="relative min-h-screen overflow-x-clip bg-[var(--d-bg)] text-[var(--d-ink)] antialiased [font-family:var(--demo-body)]"
    >
      <SiteHeader content={content.header} />
      <main>
        <Hero
          content={content.hero}
          regions={content.journeys.filters}
          popular={content.journeys.items}
          onSearch={selectContinent}
        />
        <Journeys
          content={content.journeys}
          format={format}
          continent={continent}
          onContinent={setContinent}
          onOpen={openJourney}
        />
        <JourneyDetail
          content={content.detail}
          journeys={content.journeys.items}
          selected={selectedJourney}
          onSelect={setSelectedJourneyId}
          format={format}
        />
        <StyleQuiz
          content={content.quiz}
          journeys={content.journeys.items}
          format={format}
          onOpen={openJourney}
        />
        <TailorMade content={content.tailor} />
        <Journal content={content.journal} />
      </main>
      <BrandFooter content={content.footer} />
    </div>
  );
}
