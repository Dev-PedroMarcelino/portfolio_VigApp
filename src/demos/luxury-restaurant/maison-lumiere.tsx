"use client";

import { useEffect, useMemo, useState } from "react";
import { Flame } from "lucide-react";
import { pickContent } from "@/demos/content";
import { lumiereDictionary, type LumiereContent } from "./content";
import { Hero } from "./hero";
import { TastingMenu } from "./tasting-menu";
import { ChefSection, Interlude } from "./chef-section";
import { WineCellar } from "./wine-cellar";
import { PrivateDining } from "./private-dining";
import { ReservationSection } from "./reservation";
import { BrandFooter } from "./footer";

const PALETTE = {
  "--d-bg": "#0E0C08",
  "--d-bg-soft": "#13100A",
  "--d-bg-raised": "#1A160E",
  "--d-ink": "#EDE6D6",
  "--d-ink-soft": "#A69A82",
  "--d-ink-faint": "#6E6350",
  "--d-gold": "#C9A227",
  "--d-gold-bright": "#E7C55E",
  "--d-line": "rgba(201,162,39,0.35)",
  "--d-line-soft": "rgba(237,230,214,0.12)",
  backgroundColor: "#0E0C08",
  color: "#EDE6D6",
} as React.CSSProperties;

function SiteHeader({ content }: { content: LumiereContent["header"] }) {
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
          ? "border-b border-[var(--d-line-soft)] bg-[rgba(14,12,8,0.92)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-6">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-gold)]">
            <Flame aria-hidden className="h-4 w-4 text-[var(--d-gold)]" strokeWidth={1.5} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="[font-family:var(--demo-display)] text-xl font-medium tracking-[0.08em] text-[var(--d-ink)]">
              Maison <span className="italic text-[var(--d-gold-bright)]">Lumi&egrave;re</span>
            </span>
            <span className="mt-1.5 hidden text-[8px] uppercase tracking-[0.4em] text-[var(--d-ink-faint)] sm:block">
              {content.tagline}
            </span>
          </span>
        </a>

        <nav aria-label={content.navAria} className="hidden items-center gap-8 lg:flex">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--d-ink-soft)] transition-colors duration-300 hover:text-[var(--d-gold-bright)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#reserve"
          className="border border-[var(--d-gold)] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--d-gold)] transition-colors duration-300 hover:bg-[var(--d-gold)] hover:text-[#0E0C08] sm:px-7 sm:py-3"
        >
          {content.reserveCta}
        </a>
      </div>
    </header>
  );
}

export function MaisonLumiereRoot({ locale }: { locale: string }) {
  const content = pickContent(lumiereDictionary, locale);

  const format = useMemo(() => {
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
        <Hero content={content.hero} />
        <TastingMenu content={content.tasting} format={format} />
        <ChefSection content={content.chef} detailAlt={content.tasting.detailAlt} />
        <Interlude content={content.interlude} />
        <WineCellar content={content.cellar} format={format} />
        <PrivateDining content={content.privateDining} format={format} />
        <ReservationSection
          content={content.reservation}
          intlLocale={content.format.locale}
        />
      </main>
      <BrandFooter content={content.footer} />
    </div>
  );
}
