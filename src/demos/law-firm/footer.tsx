"use client";

import { Scale, AtSign, Globe, Share2, Phone, Mail } from "lucide-react";
import type { LawContent } from "./content";

const GLYPHS: Record<string, typeof AtSign> = {
  at: AtSign,
  globe: Globe,
  share: Share2,
};

export function BrandFooter({ content }: { content: LawContent["footer"] }) {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--d-line-soft)] bg-[var(--d-navy-deep)] pt-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-10">
          {/* Brand */}
          <div>
            <a href="#top" className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-bronze)]">
                <Scale aria-hidden className="h-4 w-4 text-[var(--d-bronze-bright)]" strokeWidth={1.4} />
              </span>
              <span className="[font-family:var(--demo-display)] text-xl font-bold tracking-[0.05em] text-[var(--d-ink)]">
                Castellan <span className="text-[var(--d-bronze-bright)]">&amp;</span> Reis
              </span>
            </a>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.blurb}</p>

            <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--d-bronze-bright)]">
              {content.socialLabel}
            </p>
            <ul className="mt-4 flex gap-3">
              {content.social.map((item) => {
                const Icon = GLYPHS[item.glyph] ?? Globe;
                return (
                  <li key={item.label}>
                    <a
                      href="#top"
                      aria-label={item.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--d-line-soft)] text-[var(--d-ink-soft)] transition-colors duration-300 hover:border-[var(--d-bronze)] hover:text-[var(--d-bronze-bright)]"
                    >
                      <Icon aria-hidden className="h-4 w-4" strokeWidth={1.4} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Links */}
          <nav aria-label={content.linksLabel}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
              {content.linksLabel}
            </p>
            <ul className="mt-5 space-y-3">
              {content.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--d-ink-soft)] transition-colors duration-300 hover:text-[var(--d-bronze-bright)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
              {content.contactLabel}
            </p>
            <ul className="mt-5 space-y-3 text-sm text-[var(--d-ink-soft)]">
              <li className="flex items-center gap-3">
                <Phone aria-hidden className="h-3.5 w-3.5 text-[var(--d-bronze)]" strokeWidth={1.5} />
                {content.phone}
              </li>
              <li className="flex items-center gap-3">
                <Mail aria-hidden className="h-3.5 w-3.5 text-[var(--d-bronze)]" strokeWidth={1.5} />
                {content.email}
              </li>
              <li>{content.hours}</li>
            </ul>
          </nav>

          {/* Offices */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
              {content.officesLabel}
            </p>
            <ul className="mt-5 space-y-6">
              {content.offices.map((office) => (
                <li key={office.city}>
                  <p className="[font-family:var(--demo-display)] text-base text-[var(--d-bronze-bright)]">
                    {office.city}
                  </p>
                  <address className="mt-1.5 not-italic text-sm leading-relaxed text-[var(--d-ink-soft)]">
                    {office.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 border-t border-[var(--d-line-soft)] py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--d-bronze)]">{content.credo}</p>
          <p className="max-w-lg text-[11px] leading-relaxed text-[var(--d-ink-faint)]">{content.legal}</p>
        </div>
      </div>
    </footer>
  );
}
