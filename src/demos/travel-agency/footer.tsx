"use client";

import { useState } from "react";
import { AtSign, Camera, Check, Compass, Globe, Mail, MapPin, Phone, Send, Share2 } from "lucide-react";
import type { TravelContent } from "./content";

const SOCIAL_ICONS = {
  atsign: AtSign,
  camera: Camera,
  share: Share2,
  globe: Globe,
} as const;

export function BrandFooter({ content }: { content: TravelContent["footer"] }) {
  const [sent, setSent] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-[var(--d-deep)] pt-16 text-[var(--d-ink)]">
      {/* Dotted route across the top */}
      <svg
        className="pointer-events-none absolute inset-x-0 top-8 mx-auto h-8 w-[80%] max-w-4xl opacity-40"
        viewBox="0 0 800 40"
        fill="none"
        aria-hidden
      >
        <path
          d="M8 32 C 180 8, 320 8, 400 20 S 640 32, 792 6"
          stroke="var(--d-peach)"
          strokeWidth="1.2"
          strokeDasharray="2 8"
          strokeLinecap="round"
        />
        <circle cx="8" cy="32" r="4" fill="var(--d-peach)" />
        <circle cx="792" cy="6" r="4" fill="var(--d-peach)" />
      </svg>

      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-12 border-b border-[var(--d-line-soft)] pb-14 lg:grid-cols-[1.3fr_0.8fr_0.9fr]">
          {/* Brand + newsletter */}
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-peach)] text-[var(--d-peach)]">
                <Compass className="h-4 w-4" strokeWidth={1.5} aria-hidden />
              </span>
              <span className="[font-family:var(--demo-display)] text-2xl font-semibold text-[var(--d-ink)]">
                Atlas <span className="italic font-normal text-[var(--d-peach)]">Voyages</span>
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--d-ink-soft)]">
              {content.blurb}
            </p>

            <div className="mt-7 max-w-sm">
              <p className="[font-family:var(--demo-display)] text-lg text-[var(--d-ink)]">
                {content.newsletterTitle}
              </p>
              <p className="mt-1 text-xs text-[var(--d-ink-faint)]">{content.newsletterBody}</p>
              {sent ? (
                <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--d-peach)] bg-[rgba(253,186,116,0.12)] px-4 py-2.5 text-xs font-medium text-[var(--d-peach-bright)]">
                  <Check className="h-4 w-4" strokeWidth={2} aria-hidden />
                  {content.newsletterDone}
                </p>
              ) : (
                <form
                  className="mt-4 flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <label className="sr-only" htmlFor="atlas-news">
                    {content.newsletterPlaceholder}
                  </label>
                  <input
                    id="atlas-news"
                    type="email"
                    required
                    placeholder={content.newsletterPlaceholder}
                    className="min-w-0 flex-1 rounded-full border border-[var(--d-line-soft)] bg-[var(--d-surface)] px-4 py-2.5 text-sm text-[var(--d-ink)] placeholder:text-[var(--d-ink-faint)] outline-none transition-colors focus:border-[var(--d-peach)]"
                  />
                  <button
                    type="submit"
                    aria-label={content.newsletterCta}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--d-peach)] text-[#04222A] transition-transform duration-300 hover:scale-[1.05]"
                  >
                    <Send className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8">
            {content.columns.map((col) => (
              <div key={col.title}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--d-peach)]">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#journeys"
                        className="text-sm text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-peach)]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--d-peach)]">
              {content.contactTitle}
            </p>
            <ul className="mt-4 space-y-3 text-sm text-[var(--d-ink-soft)]">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--d-peach)]" strokeWidth={1.6} aria-hidden />
                {content.address}
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--d-peach)]" strokeWidth={1.6} aria-hidden />
                <a href={`mailto:${content.email}`} className="transition-colors hover:text-[var(--d-peach)]">
                  {content.email}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--d-peach)]" strokeWidth={1.6} aria-hidden />
                {content.phone}
              </li>
            </ul>

            <div className="mt-6 flex gap-2.5">
              {content.social.map((s) => {
                const Icon = SOCIAL_ICONS[s.icon];
                return (
                  <a
                    key={s.label}
                    href="#top"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--d-line-soft)] text-[var(--d-ink-soft)] transition-colors duration-300 hover:border-[var(--d-peach)] hover:text-[var(--d-peach)]"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.6} aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 py-8 text-center sm:flex-row sm:text-left">
          <p className="text-[11px] tracking-wide text-[var(--d-ink-faint)]">
            &copy; 2026 {content.rights}
          </p>
          <p className="text-[11px] tracking-wide text-[var(--d-ink-faint)]">{content.credits}</p>
        </div>
      </div>
    </footer>
  );
}
