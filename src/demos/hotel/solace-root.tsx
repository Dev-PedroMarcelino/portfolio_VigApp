"use client";

import { useEffect, useMemo, useState } from "react";
import { Menu, Trees, X } from "lucide-react";
import { pickContent } from "@/demos/content";
import { hotelDictionary, type HotelContent } from "./content";
import { Hero } from "./hero";
import { Suites } from "./suites";
import { RetreatSection } from "./retreat";
import { Experiences } from "./experiences";
import { Gallery } from "./gallery";
import { Reviews } from "./reviews";
import { BookingBand } from "./booking-band";
import { BrandFooter } from "./footer";

const PALETTE = {
  "--d-bg": "#152A25",
  "--d-surface": "#1C3730",
  "--d-pine": "#22423C",
  "--d-raised": "#2A4A43",
  "--d-linen": "#F1EBDD",
  "--d-ink": "#F1EBDD",
  "--d-ink-soft": "#C0CDC4",
  "--d-ink-faint": "#7E948B",
  "--d-brass": "#C7A45C",
  "--d-brass-bright": "#E0C283",
  "--d-line": "rgba(199,164,92,0.34)",
  "--d-line-soft": "rgba(241,235,221,0.12)",
  backgroundColor: "#152A25",
  color: "#F1EBDD",
} as React.CSSProperties;

export type CurrencyFormatter = (value: number) => string;

function SiteHeader({ content }: { content: HotelContent["header"] }) {
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
          ? "border-b border-[var(--d-line-soft)] bg-[rgba(21,42,37,0.9)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[70px] max-w-6xl items-center justify-between gap-6 px-5 sm:h-20 sm:px-6">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-brass)]">
            <Trees aria-hidden className="h-4 w-4 text-[var(--d-brass)]" strokeWidth={1.4} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="[font-family:var(--demo-display)] text-2xl font-medium tracking-[0.14em] text-[var(--d-linen)]">
              The <span className="italic text-[var(--d-brass-bright)]">Solace</span>
            </span>
            <span className="mt-1.5 hidden text-[8px] uppercase tracking-[0.42em] text-[var(--d-ink-faint)] sm:block">
              {content.tagline}
            </span>
          </span>
        </a>

        <nav aria-label={content.navAria} className="hidden items-center gap-8 lg:flex">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--d-ink-soft)] transition-colors duration-300 hover:text-[var(--d-brass-bright)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#book"
            className="hidden border border-[var(--d-brass)] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--d-brass)] transition-colors duration-300 hover:bg-[var(--d-brass)] hover:text-[#152A25] sm:inline-block"
          >
            {content.bookCta}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={content.navAria}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-linen)] lg:hidden"
          >
            {open ? <X className="h-4 w-4" strokeWidth={1.6} /> : <Menu className="h-4 w-4" strokeWidth={1.6} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--d-line-soft)] bg-[rgba(21,42,37,0.97)] px-5 py-5 backdrop-blur-md lg:hidden">
          <nav aria-label={content.navAria} className="flex flex-col gap-1">
            {content.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-[var(--d-line-soft)] py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--d-ink-soft)]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="mt-4 bg-[var(--d-brass)] py-3 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-[#152A25]"
            >
              {content.bookCta}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export function SolaceRoot({ locale }: { locale: string }) {
  const content = pickContent(hotelDictionary, locale);

  const format = useMemo<CurrencyFormatter>(() => {
    const formatter = new Intl.NumberFormat(content.format.locale, {
      style: "currency",
      currency: content.format.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return (value: number) => formatter.format(value);
  }, [content.format.locale, content.format.currency]);

  return (
    <div
      style={PALETTE}
      className="relative min-h-screen overflow-x-clip bg-[var(--d-bg)] text-[var(--d-ink)] antialiased [font-family:var(--demo-body)]"
    >
      <SiteHeader content={content.header} />
      <main>
        <Hero
          content={content.hero}
          widget={content.widget}
          suites={content.suites.items}
          format={format}
          intlLocale={content.format.locale}
        />
        <Suites content={content.suites} format={format} />
        <RetreatSection content={content.retreat} />
        <Experiences content={content.experiences} />
        <Gallery content={content.gallery} />
        <Reviews content={content.reviews} />
        <BookingBand content={content.booking} />
      </main>
      <BrandFooter content={content.footer} />
    </div>
  );
}
