"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { pickContent } from "@/demos/content";
import { noirDictionary, type NoirContent } from "./content";
import { LookbookHero } from "./lookbook-hero";
import { Collection } from "./collection";
import { MaisonStory } from "./maison-story";
import { Atelier } from "./atelier";
import { Runway } from "./runway";
import { RequestModal, RequestSection } from "./request-piece";
import { BrandFooter } from "./footer";

const PALETTE = {
  "--d-bg": "#0A0A0A",
  "--d-bg-soft": "#111110",
  "--d-paper": "#EFEBE1",
  "--d-ink": "#F4F1EA",
  "--d-ink-soft": "#A29C90",
  "--d-ink-faint": "#6A655B",
  "--d-gold": "#BFA145",
  "--d-gold-bright": "#DCC069",
  "--d-line": "rgba(191,161,69,0.34)",
  "--d-line-soft": "rgba(244,241,234,0.10)",
  backgroundColor: "#0A0A0A",
  color: "#F4F1EA",
} as React.CSSProperties;

function SiteHeader({
  content,
  onRequest,
}: {
  content: NoirContent["header"];
  onRequest: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[8600] transition-all duration-500 ${
        scrolled
          ? "border-b border-[var(--d-line-soft)] bg-[rgba(10,10,10,0.9)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.75rem] max-w-6xl items-center justify-between gap-6 px-6">
        <a href="#lookbook" className="flex items-baseline gap-2">
          <span className="[font-family:var(--demo-display)] text-2xl tracking-[0.04em] text-[var(--d-ink)]">
            NOIR
          </span>
          <span className="[font-family:var(--demo-display)] text-2xl italic text-[var(--d-gold-bright)]">
            Atelier
          </span>
        </a>

        <nav aria-label={content.navAria} className="hidden items-center gap-9 lg:flex">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--d-ink-soft)] transition-colors duration-300 hover:text-[var(--d-gold-bright)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={onRequest}
          className="border border-[var(--d-gold)] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--d-gold-bright)] transition-colors duration-300 hover:bg-[var(--d-gold)] hover:text-[#0A0A0A] sm:px-6 sm:py-3"
        >
          {content.requestCta}
        </button>
      </div>
    </header>
  );
}

export function NoirAtelierRoot({ locale }: { locale: string }) {
  const content = pickContent(noirDictionary, locale);

  const [requestOpen, setRequestOpen] = useState(false);
  const [initialPiece, setInitialPiece] = useState("");

  const openRequest = useCallback((pieceId?: string) => {
    setInitialPiece(pieceId ?? "");
    setRequestOpen(true);
  }, []);

  const closeRequest = useCallback(() => setRequestOpen(false), []);

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
      <SiteHeader content={content.header} onRequest={() => openRequest()} />
      <main>
        <LookbookHero content={content.hero} onRequest={() => openRequest()} />
        <Collection content={content.collection} format={format} onRequest={openRequest} />
        <MaisonStory content={content.story} />
        <Atelier content={content.atelier} />
        <Runway
          content={content.runway}
          intlLocale={content.format.locale}
          onRequest={() => openRequest()}
        />
        <RequestSection content={content.request} onRequest={() => openRequest()} />
      </main>
      <BrandFooter content={content.footer} />

      <RequestModal
        open={requestOpen}
        content={content.request}
        pieces={content.collection.pieces}
        initialPiece={initialPiece}
        onClose={closeRequest}
      />
    </div>
  );
}
