"use client";

import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { pickContent } from "@/demos/content";
import { eclatDictionary, type EclatContent } from "./content";
import { Hero } from "./hero";
import { Services } from "./services";
import { SignatureRitual } from "./ritual";
import { TeamPicker } from "./team";
import { ProductShelf } from "./products";
import { Booking } from "./booking";
import { BrandFooter } from "./footer";

/**
 * Fixed blush-and-plum palette. The demo is theme-independent: it renders
 * identically whether the host site is in light or dark mode, because every
 * colour is a literal value scoped to this root and never a site token.
 */
const PALETTE = {
  "--d-bg": "#F6EDE8",
  "--d-bg-soft": "#FBF4EF",
  "--d-bg-blush": "#EFDDD6",
  "--d-plum": "#2A171F",
  "--d-plum-soft": "#3A222C",
  "--d-ink": "#3A2A2E",
  "--d-ink-soft": "#7A5C62",
  "--d-ink-faint": "#A98E92",
  "--d-accent": "#8A4B5E",
  "--d-accent-deep": "#6E3A49",
  "--d-accent-bright": "#B06B7E",
  "--d-gold": "#B08D57",
  "--d-gold-bright": "#CDA972",
  "--d-line": "rgba(138,75,94,0.28)",
  "--d-line-soft": "rgba(58,42,46,0.14)",
  "--d-on-plum": "#F3E4DE",
  "--d-on-plum-soft": "#C9A9AF",
  backgroundColor: "#F6EDE8",
  color: "#3A2A2E",
} as React.CSSProperties;

function useCurrencyFormatter(locale: string, currency: string) {
  return useMemo(() => {
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return (value: number) => formatter.format(value);
  }, [locale, currency]);
}

function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span
        aria-hidden
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--d-accent)]"
      >
        <span className="[font-family:var(--demo-display)] text-lg italic leading-none text-[var(--d-accent)]">
          E
        </span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="[font-family:var(--demo-display)] text-xl tracking-[0.14em] text-[var(--d-ink)]">
          Éclat <span className="italic text-[var(--d-accent)]">Studio</span>
        </span>
        {!compact && (
          <span className="mt-1.5 hidden text-[8px] uppercase tracking-[0.42em] text-[var(--d-ink-faint)] sm:block">
            Jardins · SP
          </span>
        )}
      </span>
    </span>
  );
}

function SiteHeader({ content }: { content: EclatContent["header"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          ? "border-b border-[var(--d-line-soft)] bg-[rgba(246,237,232,0.9)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-6">
        <a href="#top" aria-label="Éclat Studio">
          <Wordmark />
        </a>

        <nav aria-label={content.navAria} className="hidden items-center gap-9 lg:flex">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--d-ink-soft)] transition-colors duration-300 hover:text-[var(--d-accent)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#booking"
            className="hidden border border-[var(--d-accent)] bg-[var(--d-accent)] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--d-on-plum)] transition-colors duration-300 hover:bg-transparent hover:text-[var(--d-accent)] sm:inline-block"
          >
            {content.bookCta}
          </a>
          <button
            type="button"
            aria-label={open ? content.nav[0].label : content.navAria}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center border border-[var(--d-line)] text-[var(--d-accent)] lg:hidden"
          >
            {open ? (
              <X aria-hidden className="h-4 w-4" strokeWidth={1.6} />
            ) : (
              <Menu aria-hidden className="h-4 w-4" strokeWidth={1.6} />
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label={content.navAria}
          className="border-t border-[var(--d-line-soft)] bg-[rgba(246,237,232,0.97)] px-6 py-5 backdrop-blur-md lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {content.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-xs font-medium uppercase tracking-[0.28em] text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-accent)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#booking"
                onClick={() => setOpen(false)}
                className="mt-3 block bg-[var(--d-accent)] px-6 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--d-on-plum)]"
              >
                {content.bookCta}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export function EclatStudioRoot({ locale }: { locale: string }) {
  const content = pickContent(eclatDictionary, locale);
  const format = useCurrencyFormatter(content.format.locale, content.format.currency);

  return (
    <div
      style={PALETTE}
      className="relative min-h-screen overflow-x-clip bg-[var(--d-bg)] text-[var(--d-ink)] antialiased [font-family:var(--demo-body)]"
    >
      <SiteHeader content={content.header} />
      <main>
        <Hero content={content.hero} />
        <Services content={content.services} format={format} common={content.common} />
        <SignatureRitual content={content.ritual} common={content.common} />
        <TeamPicker content={content.team} />
        <ProductShelf content={content.products} format={format} />
        <Booking
          content={content.booking}
          common={content.common}
          format={format}
          intlLocale={content.format.locale}
        />
      </main>
      <BrandFooter content={content.footer} />
    </div>
  );
}
