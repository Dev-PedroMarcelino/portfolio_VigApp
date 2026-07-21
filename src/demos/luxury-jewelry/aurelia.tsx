"use client";

import { useEffect, useMemo, useState } from "react";
import { pickContent } from "@/demos/content";
import { aureliaDictionary, type AureliaContent } from "./content";
import { Hero } from "./hero";
import { Collections } from "./collections";
import { Configurator } from "./configurator";
import { Heritage } from "./heritage";
import { Bespoke } from "./bespoke";
import { Appointment } from "./appointment";
import { BrandFooter } from "./footer";

const PALETTE = {
  "--d-bg": "#0A0A0D",
  "--d-bg-soft": "#101014",
  "--d-bg-raised": "#17171D",
  "--d-ink": "#F2EDE3",
  "--d-ink-soft": "#A7A192",
  "--d-ink-faint": "#6B6558",
  "--d-gold": "#D4AF37",
  "--d-gold-bright": "#E8CE7A",
  "--d-line": "rgba(212,175,55,0.34)",
  "--d-line-soft": "rgba(242,237,227,0.10)",
  backgroundColor: "#0A0A0D",
  color: "#F2EDE3",
} as React.CSSProperties;

function SiteHeader({ content }: { content: AureliaContent["header"] }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[8600] transition-all duration-700 ${
        scrolled
          ? "border-b border-[var(--d-line-soft)] bg-[rgba(10,10,13,0.9)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-6">
        <a href="#top" className="flex flex-col leading-none">
          <span className="[font-family:var(--demo-display)] text-2xl font-light tracking-[0.22em] text-[var(--d-ink)]">
            Aurelia
          </span>
          <span className="mt-1.5 hidden text-[8px] uppercase tracking-[0.4em] text-[var(--d-ink-faint)] sm:block">
            {content.tagline}
          </span>
        </a>

        <nav aria-label={content.navAria} className="hidden items-center gap-9 lg:flex">
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
          href="#appointment"
          className="border border-[var(--d-gold)] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--d-gold)] transition-colors duration-500 hover:bg-[var(--d-gold)] hover:text-[#101014] sm:px-7 sm:py-3"
        >
          {content.appointmentCta}
        </a>
      </div>
    </header>
  );
}

export function AureliaRoot({ locale }: { locale: string }) {
  const content = pickContent(aureliaDictionary, locale);

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
        <Collections content={content.collections} format={format} />
        <Configurator content={content.configurator} format={format} />
        <Heritage content={content.heritage} />
        <Bespoke content={content.bespoke} />
        <Appointment content={content.appointment} />
      </main>
      <BrandFooter content={content.footer} />
    </div>
  );
}
