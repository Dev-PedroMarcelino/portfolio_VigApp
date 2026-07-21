"use client";

import { AtSign, Camera, Share2, MessageCircle, Globe, ArrowUp } from "lucide-react";
import type { FooterContent } from "./content";
import { scrollToId } from "./ui";

const ICONS = {
  at: AtSign,
  camera: Camera,
  share: Share2,
  message: MessageCircle,
  globe: Globe,
} as const;

export function LoudFooter({ content }: { content: FooterContent }) {
  return (
    <footer className="bg-[var(--d-ink)] text-[var(--d-accent-ink)]">
      <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
        <button
          type="button"
          onClick={() => scrollToId("contact")}
          className="lh-glitch block text-left [font-family:var(--demo-display)] text-[13vw] leading-[0.86] tracking-tight text-[var(--d-accent-ink)] transition-colors hover:text-[var(--d-accent)] md:text-[8rem]"
          data-text={content.callout}
        >
          {content.callout}
        </button>

        <div className="mt-14 grid gap-10 border-t-2 border-[var(--d-accent-ink)]/25 pt-10 md:grid-cols-[1fr_auto_auto]">
          <div>
            <div className="[font-family:var(--demo-display)] text-2xl tracking-tight">
              LOUD<span className="text-[var(--d-accent)]">/</span>HAUS
            </div>
            <p className="mt-4 max-w-xs [font-family:var(--demo-body)] text-xs uppercase tracking-[0.14em] text-[var(--d-accent-ink)]/55">
              {content.studioLine}
            </p>
            <div className="mt-6 flex gap-2.5">
              {content.socials.map((s) => {
                const Icon = ICONS[s.kind];
                return (
                  <a
                    key={s.label}
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId("contact");
                    }}
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center border-2 border-[var(--d-accent-ink)]/40 text-[var(--d-accent-ink)] transition-all hover:border-[var(--d-accent)] hover:bg-[var(--d-accent)] hover:text-[var(--d-accent-ink)]"
                  >
                    <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>

          {content.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <div className="[font-family:var(--demo-body)] text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--d-accent)]">
                {col.title}
              </div>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId("contact");
                      }}
                      className="[font-family:var(--demo-body)] text-sm text-[var(--d-accent-ink)]/70 transition-colors hover:text-[var(--d-accent)]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t-2 border-[var(--d-accent-ink)]/25 pt-6 sm:flex-row sm:items-center">
          <p className="[font-family:var(--demo-body)] text-[0.7rem] uppercase tracking-[0.12em] text-[var(--d-accent-ink)]/45">
            {content.legal}
          </p>
          <button
            type="button"
            onClick={() => scrollToId("top")}
            className="inline-flex items-center gap-2 border-2 border-[var(--d-accent-ink)]/40 px-3 py-2 [font-family:var(--demo-body)] text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--d-accent-ink)] transition-all hover:border-[var(--d-accent)] hover:text-[var(--d-accent)]"
          >
            {content.backToTop}
            <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  );
}
