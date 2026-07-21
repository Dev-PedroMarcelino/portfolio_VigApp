"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { pickContent } from "@/demos/content";
import { atelierDictionary, type AtelierContent } from "./content";
import { Hero } from "./hero";
import { ProjectIndex } from "./project-index";
import { ProjectDetail } from "./project-detail";
import { Philosophy } from "./philosophy";
import { Awards } from "./awards";
import { Contact } from "./contact";
import { BrandFooter } from "./footer";

const PALETTE = {
  "--d-bg": "#E9E5DC",
  "--d-bg-soft": "#E1DCD1",
  "--d-ink": "#171614",
  "--d-ink-soft": "#57544D",
  "--d-ink-faint": "#9C978B",
  "--d-line": "rgba(23,22,20,0.13)",
  "--d-line-strong": "rgba(23,22,20,0.42)",
  "--d-bg-dim": "rgba(233,229,220,0.72)",
  "--d-bg-faint": "rgba(233,229,220,0.42)",
  backgroundColor: "#E9E5DC",
  color: "#171614",
} as React.CSSProperties;

function SiteHeader({
  content,
  ctaHref,
}: {
  content: AtelierContent["header"];
  ctaHref: string;
}) {
  const [scrolled, setScrolled] = useState(false);

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
          ? "border-b border-[var(--d-line)] bg-[rgba(233,229,220,0.86)] backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[92rem] items-center justify-between gap-6 px-5 sm:h-20 sm:px-8">
        <a href="#top" className="flex items-baseline gap-2 leading-none">
          <span className="[font-family:var(--demo-display)] text-lg font-medium tracking-[-0.01em] text-[var(--d-ink)] sm:text-xl">
            Atelier
          </span>
          <span className="[font-family:var(--demo-body)] text-lg italic text-[var(--d-ink-soft)] sm:text-xl">
            Meridian
          </span>
        </a>

        <nav
          aria-label={content.navAria}
          className="hidden items-center gap-9 md:flex"
        >
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.28em] text-[var(--d-ink-soft)] transition-colors duration-300 hover:text-[var(--d-ink)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={ctaHref}
          className="border border-[var(--d-ink)] px-4 py-2 [font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.25em] text-[var(--d-ink)] transition-colors duration-300 hover:bg-[var(--d-ink)] hover:text-[var(--d-bg)] sm:px-6 sm:py-2.5"
        >
          {content.cta}
        </a>
      </div>
    </header>
  );
}

export function AtelierMeridianRoot({ locale }: { locale: string }) {
  const content = pickContent(atelierDictionary, locale);
  const [selectedId, setSelectedId] = useState(content.projects[0].id);

  const areaFormatter = useMemo(
    () => new Intl.NumberFormat(content.format.locale),
    [content.format.locale],
  );

  const selected = useMemo(
    () =>
      content.projects.find((p) => p.id === selectedId) ?? content.projects[0],
    [content.projects, selectedId],
  );

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    const el = document.getElementById("project");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div
      style={PALETTE}
      className="relative min-h-screen overflow-x-clip bg-[var(--d-bg)] text-[var(--d-ink)] antialiased [font-family:var(--demo-body)]"
    >
      <SiteHeader content={content.header} ctaHref="#contact" />
      <main>
        <Hero content={content.hero} />
        <ProjectIndex
          content={content.index}
          projects={content.projects}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
        <ProjectDetail
          content={content.detail}
          project={selected}
          areaValue={areaFormatter.format(selected.area)}
        />
        <Philosophy content={content.philosophy} />
        <Awards content={content.awards} />
        <Contact content={content.contact} />
      </main>
      <BrandFooter content={content.footer} />
    </div>
  );
}
