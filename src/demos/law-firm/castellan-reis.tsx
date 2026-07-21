"use client";

import { useEffect, useMemo, useState } from "react";
import { Scale, Menu, X } from "lucide-react";
import { pickContent } from "@/demos/content";
import { lawDictionary, type LawContent } from "./content";
import { Hero } from "./hero";
import { PracticeAreas } from "./practice-areas";
import { LegacyQuote } from "./legacy-quote";
import { Partners } from "./partners";
import { Results } from "./results";
import { Insights } from "./insights";
import { Consultation } from "./consultation";
import { BrandFooter } from "./footer";

const PALETTE = {
  "--d-navy": "#14202E",
  "--d-navy-deep": "#0E1824",
  "--d-navy-soft": "#1B2B3C",
  "--d-navy-raised": "#24384C",
  "--d-bronze": "#8C6F3F",
  "--d-bronze-bright": "#C2A567",
  "--d-cream": "#F1EADC",
  "--d-cream-soft": "#E5DBC7",
  "--d-ink": "#ECE4D3",
  "--d-ink-soft": "#9CAABA",
  "--d-ink-faint": "#657686",
  "--d-paper-ink": "#1B2B3C",
  "--d-paper-soft": "#55606C",
  "--d-paper-faint": "#8A93A0",
  "--d-line": "rgba(140,111,63,0.40)",
  "--d-line-soft": "rgba(236,228,211,0.12)",
  "--d-paper-line": "rgba(20,32,46,0.14)",
  "--d-paper-bronze-line": "rgba(140,111,63,0.30)",
  backgroundColor: "#14202E",
  color: "#ECE4D3",
} as React.CSSProperties;

/** Fine engraved double rule used across dark and light sections. */
export function EngravedRule({ tone = "bronze" }: { tone?: "bronze" | "ink" | "paper" }) {
  const color =
    tone === "bronze"
      ? "var(--d-bronze)"
      : tone === "ink"
        ? "var(--d-line-soft)"
        : "var(--d-paper-line)";
  return (
    <span aria-hidden className="flex items-center gap-2">
      <span className="h-px w-8" style={{ backgroundColor: color }} />
      <span className="h-1 w-1 rotate-45" style={{ backgroundColor: "var(--d-bronze)" }} />
      <span className="h-px w-8" style={{ backgroundColor: color }} />
    </span>
  );
}

function SiteHeader({ content }: { content: LawContent["header"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[8600] transition-all duration-500 ${
        scrolled
          ? "border-b border-[var(--d-line-soft)] bg-[rgba(14,24,36,0.94)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.75rem] max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-bronze)]">
            <Scale aria-hidden className="h-4 w-4 text-[var(--d-bronze-bright)]" strokeWidth={1.4} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="[font-family:var(--demo-display)] text-lg font-bold tracking-[0.06em] text-[var(--d-ink)]">
              Castellan <span className="text-[var(--d-bronze-bright)]">&amp;</span> Reis
            </span>
            <span className="mt-1.5 hidden text-[8px] uppercase tracking-[0.42em] text-[var(--d-ink-faint)] sm:block">
              {content.tagline}
            </span>
          </span>
        </a>

        <nav aria-label={content.navAria} className="hidden items-center gap-9 lg:flex">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[10px] font-medium uppercase tracking-[0.32em] text-[var(--d-ink-soft)] transition-colors duration-300 hover:text-[var(--d-bronze-bright)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#consult"
            className="hidden border border-[var(--d-bronze)] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--d-bronze-bright)] transition-colors duration-300 hover:bg-[var(--d-bronze)] hover:text-[var(--d-navy-deep)] sm:inline-block"
          >
            {content.cta}
          </a>
          <button
            type="button"
            aria-label={content.navAria}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center border border-[var(--d-line-soft)] text-[var(--d-ink)] lg:hidden"
          >
            {menuOpen ? (
              <X aria-hidden className="h-4 w-4" strokeWidth={1.6} />
            ) : (
              <Menu aria-hidden className="h-4 w-4" strokeWidth={1.6} />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          aria-label={content.navAria}
          className="border-t border-[var(--d-line-soft)] bg-[rgba(14,24,36,0.98)] px-5 py-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {content.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-[11px] font-medium uppercase tracking-[0.3em] text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-bronze-bright)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#consult"
                onClick={() => setMenuOpen(false)}
                className="mt-2 block border border-[var(--d-bronze)] py-3 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--d-bronze-bright)]"
              >
                {content.cta}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export function CastellanReisRoot({ locale }: { locale: string }) {
  const content = pickContent(lawDictionary, locale);

  const formatCurrencyCompact = useMemo(() => {
    const formatter = new Intl.NumberFormat(content.format.locale, {
      style: "currency",
      currency: content.format.currency,
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => formatter.format(value);
  }, [content.format.locale, content.format.currency]);

  const formatInteger = useMemo(() => {
    const formatter = new Intl.NumberFormat(content.format.locale, {
      maximumFractionDigits: 0,
    });
    return (value: number) => formatter.format(value);
  }, [content.format.locale]);

  return (
    <div
      id="top"
      style={PALETTE}
      className="relative min-h-screen overflow-x-clip bg-[var(--d-navy)] text-[var(--d-ink)] antialiased [font-family:var(--demo-body)]"
    >
      <SiteHeader content={content.header} />
      <main>
        <Hero content={content.hero} consultCta={content.header.cta} />
        <PracticeAreas content={content.practice} />
        <LegacyQuote content={content.legacy} />
        <Partners content={content.partners} />
        <Results content={content.results} formatCurrencyCompact={formatCurrencyCompact} formatInteger={formatInteger} />
        <Insights content={content.insights} />
        <Consultation content={content.consultation} areas={content.practice.areas} />
      </main>
      <BrandFooter content={content.footer} />
    </div>
  );
}
