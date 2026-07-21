"use client";

import { useEffect, useMemo, useState } from "react";
import { HardHat, Menu, X } from "lucide-react";
import { pickContent } from "@/demos/content";
import { vertexDictionary, type VertexContent } from "./content";
import { Hero } from "./hero";
import { Capabilities } from "./capabilities";
import { Projects } from "./projects";
import { Capacity } from "./capacity";
import { Certifications } from "./certifications";
import { Quote } from "./quote";
import { BrandFooter } from "./footer";

const PALETTE = {
  "--d-bg": "#15181D",
  "--d-bg-2": "#191D23",
  "--d-panel": "#1F242B",
  "--d-panel-2": "#262C34",
  "--d-ink": "#F3F5F7",
  "--d-ink-soft": "#A4ACB6",
  "--d-ink-faint": "#6B7480",
  "--d-accent": "#F2A900",
  "--d-accent-deep": "#C98A00",
  "--d-accent-ink": "#15181D",
  "--d-line": "rgba(243,245,247,0.09)",
  "--d-line-strong": "rgba(243,245,247,0.18)",
  "--d-danger": "#FF5A47",
  "--d-good": "#39C15E",
  backgroundColor: "#15181D",
  color: "#F3F5F7",
} as React.CSSProperties;

function SiteHeader({
  content,
  ctaHref,
}: {
  content: VertexContent["header"];
  ctaHref: string;
}) {
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
      className={`fixed inset-x-0 top-0 z-[8600] transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--d-line)] bg-[rgba(21,24,29,0.9)] backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[92rem] items-center justify-between gap-6 px-5 sm:h-[4.5rem] sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 leading-none">
          <span className="flex h-8 w-8 items-center justify-center bg-[var(--d-accent)] text-[var(--d-accent-ink)]">
            <HardHat className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="[font-family:var(--demo-display)] text-lg uppercase tracking-[0.02em] text-[var(--d-ink)]">
            Vertex Build
          </span>
        </a>

        <nav
          aria-label={content.navAria}
          className="hidden items-center gap-8 md:flex"
        >
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="[font-family:var(--demo-body)] text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--d-ink-soft)] transition-colors duration-200 hover:text-[var(--d-ink)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={ctaHref}
            className="hidden bg-[var(--d-accent)] px-5 py-2.5 [font-family:var(--demo-body)] text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--d-accent-ink)] transition-colors duration-200 hover:bg-[var(--d-accent-deep)] sm:inline-block"
          >
            {content.cta}
          </a>
          <button
            type="button"
            aria-label={content.navAria}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center border border-[var(--d-line-strong)] text-[var(--d-ink)] md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--d-line)] bg-[rgba(21,24,29,0.97)] px-5 py-4 backdrop-blur-md md:hidden">
          <nav aria-label={content.navAria} className="flex flex-col gap-1">
            {content.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="[font-family:var(--demo-body)] py-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--d-ink-soft)]"
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaHref}
              onClick={() => setOpen(false)}
              className="mt-2 bg-[var(--d-accent)] px-5 py-3 text-center [font-family:var(--demo-body)] text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--d-accent-ink)]"
            >
              {content.cta}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export function VertexBuildRoot({ locale }: { locale: string }) {
  const content = pickContent(vertexDictionary, locale);

  const currencyCompact = useMemo(
    () =>
      new Intl.NumberFormat(content.format.locale, {
        style: "currency",
        currency: content.format.currency,
        notation: "compact",
        maximumFractionDigits: 1,
      }),
    [content.format.locale, content.format.currency],
  );

  return (
    <div
      style={PALETTE}
      className="relative min-h-screen overflow-x-clip bg-[var(--d-bg)] text-[var(--d-ink)] antialiased [font-family:var(--demo-body)]"
    >
      <SiteHeader content={content.header} ctaHref="#quote" />
      <main>
        <Hero content={content.hero} quoteHref="#quote" projectsHref="#projects" />
        <Capabilities content={content.capabilities} />
        <Projects
          content={content.projects}
          formatValue={(v) => currencyCompact.format(v)}
        />
        <Capacity content={content.stats} locale={content.format.locale} />
        <Certifications content={content.certs} />
        <Quote content={content.quote} />
      </main>
      <BrandFooter content={content.footer} navAria={content.header.navAria} />
    </div>
  );
}
