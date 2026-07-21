"use client";

import { AtSign, Globe, Mail, MapPin, Phone, Share2 } from "lucide-react";
import type { FooterContent } from "./content";
import { CarbonTexture, scrollToId } from "./ui";

const SOCIAL_ICONS = [AtSign, Share2, Globe];

export function ApexFooter({ content }: { content: FooterContent }) {
  return (
    <footer className="relative overflow-hidden bg-[var(--d-carbon)] pt-16">
      <CarbonTexture opacity={0.45} />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 border-b border-[var(--d-line)] pb-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* brand */}
          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2.5"
              aria-label="Apex Motors — back to top"
            >
              <span className="inline-flex h-7 w-7 skew-x-[-10deg] items-center justify-center bg-[var(--d-accent)] text-[0.8rem] font-bold text-white [font-family:var(--demo-display)]">
                A
              </span>
              <span className="[font-family:var(--demo-display)] text-xl uppercase tracking-[0.2em] text-[var(--d-ink)]">
                Apex
              </span>
            </button>
            <p className="max-w-xs text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.tagline}</p>
            <div className="mt-2 flex items-center gap-2.5">
              {content.social.map((s, i) => {
                const Icon = SOCIAL_ICONS[i] ?? Globe;
                return (
                  <a
                    key={s.label}
                    href="#top"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId("top");
                    }}
                    aria-label={`${s.label} — ${s.handle}`}
                    className="flex h-9 w-9 items-center justify-center border border-[var(--d-line)] text-[var(--d-ink-soft)] transition-colors hover:border-[var(--d-accent)] hover:text-[var(--d-ink)]"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* explore */}
          <div>
            <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[var(--d-metal)]">
              {content.exploreLabel}
            </p>
            <ul className="flex flex-col gap-2.5">
              {content.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(item.href.slice(1));
                    }}
                    className="text-sm text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-ink)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* visit */}
          <div>
            <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[var(--d-metal)]">
              {content.visitLabel}
            </p>
            <address className="flex flex-col gap-3 not-italic text-sm text-[var(--d-ink-soft)]">
              <span className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--d-accent-soft)]" strokeWidth={1.8} />
                <span>
                  {content.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </span>
              <a href={`tel:${content.phone.replace(/\s/g, "")}`} className="flex items-center gap-2.5 transition-colors hover:text-[var(--d-ink)]">
                <Phone className="h-4 w-4 shrink-0 text-[var(--d-accent-soft)]" strokeWidth={1.8} />
                {content.phone}
              </a>
              <a href={`mailto:${content.email}`} className="flex items-center gap-2.5 transition-colors hover:text-[var(--d-ink)]">
                <Mail className="h-4 w-4 shrink-0 text-[var(--d-accent-soft)]" strokeWidth={1.8} />
                {content.email}
              </a>
              <span className="text-[0.72rem] text-[var(--d-metal)]">{content.hoursNote}</span>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-4">
            {content.legal.map((l) => (
              <span key={l} className="text-[0.7rem] uppercase tracking-[0.14em] text-[var(--d-metal)]">
                {l}
              </span>
            ))}
          </div>
          <p className="text-[0.7rem] text-[var(--d-metal)]">{content.credit}</p>
        </div>

        <p className="border-t border-[var(--d-line)] py-6 text-[0.66rem] leading-relaxed text-[var(--d-metal)]">
          {content.fine}
        </p>
      </div>
    </footer>
  );
}
