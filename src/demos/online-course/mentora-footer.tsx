"use client";

import { AtSign, Camera, Globe, MessageCircle, Share2 } from "lucide-react";
import type { FooterContent } from "./content";
import { scrollToId } from "./ui";

const GLYPHS = {
  at: AtSign,
  camera: Camera,
  share: Share2,
  message: MessageCircle,
  globe: Globe,
} as const;

export function MentoraFooter({ content }: { content: FooterContent }) {
  return (
    <footer className="relative overflow-hidden bg-[var(--d-charcoal)] pt-16 text-[var(--d-cream)]" style={{ backgroundColor: "#141110" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[42rem] max-w-full -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #F59E0B 0%, transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="grid gap-12 pb-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-baseline gap-0.5 [font-family:var(--demo-display)] text-[1.9rem] leading-none tracking-tight text-[var(--d-cream)]"
            >
              Mentora
              <span className="text-[var(--d-accent)]">.</span>
            </button>
            <p className="mt-5 max-w-xs text-[0.92rem] leading-relaxed text-[var(--d-cream-dim)]">
              {content.tagline}
            </p>
            <div className="mt-7">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-cream-dim)]">
                {content.socialLabel}
              </p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {content.social.map((item) => {
                  const Glyph = GLYPHS[item.kind];
                  return (
                    <span
                      key={item.label}
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--d-charcoal-line)] px-3 py-1.5 text-[0.72rem] text-[var(--d-cream-dim)]"
                    >
                      <Glyph className="h-3.5 w-3.5 text-[var(--d-accent)]" strokeWidth={1.8} />
                      {item.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {content.columns.map((col) => (
            <nav key={col.title}>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--d-accent)]">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      onClick={() => scrollToId("enroll")}
                      className="text-[0.9rem] text-[var(--d-cream-dim)] transition-colors hover:text-[var(--d-cream)]"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-[var(--d-charcoal-line)] py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-[0.78rem] text-[var(--d-cream-dim)]">{content.rights}</p>
          <p className="text-[0.78rem] text-[var(--d-cream-dim)]">{content.note}</p>
        </div>
      </div>
    </footer>
  );
}
