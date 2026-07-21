"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Heart } from "lucide-react";
import { pickContent } from "@/demos/content";
import { altureDictionary, type AltureContent, type Filters } from "./content";
import { Hero } from "./hero";
import { Listings } from "./listings";
import { Neighborhoods } from "./neighborhoods";
import { Spotlight } from "./spotlight";
import { Journey } from "./journey";
import { Contact } from "./contact";
import { BrandFooter } from "./footer";

const PALETTE = {
  "--d-bg": "#10273F",
  "--d-bg-deep": "#0B1B2E",
  "--d-bg-soft": "#16324F",
  "--d-bg-raised": "#1B3A5C",
  "--d-ivory": "#F4EFE6",
  "--d-ink": "#F4EFE6",
  "--d-ink-soft": "#B7C4D3",
  "--d-ink-faint": "#7C8DA1",
  "--d-gold": "#C0A46B",
  "--d-gold-bright": "#D8C08A",
  "--d-gold-deep": "#A98C50",
  "--d-line": "rgba(192,164,107,0.32)",
  "--d-line-soft": "rgba(244,239,230,0.12)",
  "--d-glass": "rgba(11,27,46,0.55)",
  backgroundColor: "#10273F",
  color: "#F4EFE6",
} as React.CSSProperties;

export type FormatFn = (value: number) => string;

function SiteHeader({
  content,
  savedCount,
}: {
  content: AltureContent["header"];
  savedCount: number;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[8600] transition-all duration-500 ${
        scrolled
          ? "border-b border-[var(--d-line-soft)] bg-[rgba(11,27,46,0.9)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[74px] max-w-6xl items-center justify-between gap-6 px-6">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="[font-family:var(--demo-display)] text-2xl font-semibold tracking-[0.16em] text-[var(--d-ivory)]">
            ALTURE
          </span>
          <span
            aria-hidden
            className="hidden h-1.5 w-1.5 rounded-full bg-[var(--d-gold)] sm:block"
          />
        </a>

        <nav
          aria-label={content.navAria}
          className="hidden items-center gap-9 lg:flex"
        >
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--d-ink-soft)] transition-colors duration-300 hover:text-[var(--d-gold-bright)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-1.5 rounded-full border border-[var(--d-line)] px-3 py-1.5 text-[11px] tracking-[0.14em] text-[var(--d-ink-soft)]"
            aria-live="polite"
          >
            <Heart
              className={`h-3.5 w-3.5 ${
                savedCount > 0 ? "fill-[var(--d-gold)] text-[var(--d-gold)]" : "text-[var(--d-gold)]"
              }`}
              strokeWidth={1.6}
              aria-hidden
            />
            <span className="tabular-nums text-[var(--d-ivory)]">{savedCount}</span>
            <span className="hidden uppercase sm:inline">{content.savedLabel}</span>
          </div>
          <a
            href="#contact"
            className="hidden bg-[var(--d-gold)] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0B1B2E] transition-colors duration-300 hover:bg-[var(--d-gold-bright)] sm:inline-block"
          >
            {content.cta}
          </a>
        </div>
      </div>
    </header>
  );
}

export function AltureRoot({ locale }: { locale: string }) {
  const content = pickContent(altureDictionary, locale);

  const [filters, setFilters] = useState<Filters>({
    city: "all",
    type: "all",
    maxPrice: content.filters.priceMax,
  });
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const toggleSaved = useCallback((id: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const format = useMemo<FormatFn>(() => {
    const formatter = new Intl.NumberFormat(content.format.locale, {
      style: "currency",
      currency: content.format.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return (value: number) => formatter.format(value);
  }, [content.format.locale, content.format.currency]);

  const formatArea = useMemo(() => {
    const formatter = new Intl.NumberFormat(content.format.locale, {
      maximumFractionDigits: 0,
    });
    return (value: number) => formatter.format(value);
  }, [content.format.locale]);

  const visible = useMemo(
    () =>
      content.listings.items.filter(
        (item) =>
          (filters.city === "all" || item.city === filters.city) &&
          (filters.type === "all" || item.type === filters.type) &&
          item.price <= filters.maxPrice,
      ),
    [content.listings.items, filters],
  );

  return (
    <div
      style={PALETTE}
      className="relative min-h-screen overflow-x-clip bg-[var(--d-bg)] text-[var(--d-ink)] antialiased [font-family:var(--demo-body)]"
    >
      <SiteHeader content={content.header} savedCount={saved.size} />
      <main>
        <Hero
          content={content.hero}
          filterConfig={content.filters}
          filters={filters}
          onChange={setFilters}
          format={format}
          resultCount={visible.length}
        />
        <Listings
          content={content.listings}
          filterConfig={content.filters}
          filters={filters}
          onChange={setFilters}
          items={visible}
          totalCount={content.listings.items.length}
          saved={saved}
          onToggleSaved={toggleSaved}
          format={format}
          formatArea={formatArea}
        />
        <Neighborhoods content={content.neighborhoods} />
        <Spotlight content={content.spotlight} format={format} />
        <Journey content={content.journey} format={format} intlLocale={content.format.locale} />
        <Contact content={content.contact} />
      </main>
      <BrandFooter content={content.footer} />
    </div>
  );
}
