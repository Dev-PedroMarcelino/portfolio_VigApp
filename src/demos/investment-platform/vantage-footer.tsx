"use client";

import { AtSign, Globe, MessageCircle } from "lucide-react";
import type { VantageContent } from "./content";
import { scrollToId } from "./ui";

const SOCIAL_ICONS = [AtSign, Globe, MessageCircle];

export function VantageFooter({ content }: { content: VantageContent["footer"] }) {
  return (
    <footer className="relative border-t border-[var(--d-gold)]/25 bg-[#070D19]">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(209,177,102,0.6) 50%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.8fr)]">
          {/* Brand */}
          <div>
            <p className="[font-family:var(--demo-display)] text-2xl tracking-tight text-[var(--d-ink)]">
              Vantage <span className="italic text-[var(--d-gold)]">Capital</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.tagline}</p>
            <div className="mt-6 flex gap-3">
              {content.social.map((item, i) => {
                const Icon = SOCIAL_ICONS[i % SOCIAL_ICONS.length];
                return (
                  <button
                    key={item.label}
                    type="button"
                    aria-label={item.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink-soft)] transition-colors hover:border-[var(--d-gold)]/60 hover:text-[var(--d-gold)]"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.7} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Offices */}
          <div>
            <h3 className="text-[0.64rem] font-semibold uppercase tracking-[0.26em] text-[var(--d-gold)]">
              {content.officesTitle}
            </h3>
            <ul className="mt-5 space-y-4">
              {content.offices.map((office) => (
                <li key={office.city}>
                  <p className="[font-family:var(--demo-display)] text-sm text-[var(--d-ink)]">{office.city}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-[var(--d-ink-soft)]">{office.address}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-[0.64rem] font-semibold uppercase tracking-[0.26em] text-[var(--d-gold)]">
              {content.hoursTitle}
            </h3>
            <ul className="mt-5 space-y-3">
              {content.hours.map((line) => (
                <li key={line} className="text-xs leading-relaxed text-[var(--d-ink-soft)]">
                  {line}
                </li>
              ))}
            </ul>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-[0.64rem] font-semibold uppercase tracking-[0.26em] text-[var(--d-gold)]">
              {content.navTitle}
            </h3>
            <ul className="mt-5 space-y-2.5">
              {content.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(item.href.slice(1));
                    }}
                    className="text-xs text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-gold)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-[var(--d-line)] pt-7">
          <p className="max-w-3xl text-[0.66rem] leading-relaxed text-[var(--d-ink-soft)]/70">{content.smallPrint}</p>
          <p className="mt-4 font-mono text-[0.64rem] tracking-[0.14em] text-[var(--d-ink-soft)]/60">
            MCMXCIV — MMXXVI · Vantage Capital · {content.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
