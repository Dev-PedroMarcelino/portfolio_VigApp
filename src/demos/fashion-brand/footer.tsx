"use client";

import { useState } from "react";
import { AtSign, Camera, Globe } from "lucide-react";
import type { NoirContent } from "./content";

const SOCIAL_ICONS = [AtSign, Camera, Globe];

export function BrandFooter({ content }: { content: NoirContent["footer"] }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="relative border-t border-[var(--d-line)] bg-[var(--d-bg)] px-6 pb-16 pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <p className="[font-family:var(--demo-display)] text-5xl tracking-[0.02em] text-[var(--d-ink)] sm:text-6xl">
              NOIR <span className="italic text-[var(--d-gold-bright)]">Atelier</span>
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--d-ink-soft)]">
              {content.maisonLine}
            </p>

            <address className="mt-8 not-italic">
              {content.address.map((line) => (
                <p key={line} className="text-sm text-[var(--d-ink-soft)]">
                  {line}
                </p>
              ))}
            </address>

            <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
              {content.hoursLabel}
            </p>
            <p className="mt-1.5 text-sm text-[var(--d-ink-soft)]">{content.hours}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {content.social.map((item, i) => {
                const Icon = SOCIAL_ICONS[i % SOCIAL_ICONS.length];
                return (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-2 border border-[var(--d-line-soft)] px-3 py-2 text-[11px] tracking-[0.12em] text-[var(--d-ink-soft)]"
                  >
                    <Icon aria-hidden className="h-3.5 w-3.5 text-[var(--d-gold)]" strokeWidth={1.5} />
                    {item.handle}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {content.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--d-gold)]">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#lookbook"
                        className="text-sm text-[var(--d-ink-soft)] transition-colors duration-200 hover:text-[var(--d-ink)]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-[var(--d-line-soft)] pt-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-md">
            <p className="[font-family:var(--demo-display)] text-2xl italic text-[var(--d-ink)]">
              {content.newsletterTitle}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--d-ink-soft)]">
              {content.newsletterBody}
            </p>
          </div>
          {subscribed ? (
            <p className="text-sm text-[var(--d-gold-bright)]">
              {content.newsletterTitle} — {content.address[0]}
            </p>
          ) : (
            <form onSubmit={submit} className="flex w-full max-w-sm items-stretch" aria-label={content.newsletterAria}>
              <label htmlFor="noir-newsletter" className="sr-only">
                {content.newsletterPlaceholder}
              </label>
              <input
                id="noir-newsletter"
                type="email"
                required
                value={email}
                placeholder={content.newsletterPlaceholder}
                onChange={(e) => setEmail(e.target.value)}
                className="min-w-0 flex-1 border border-[var(--d-line-soft)] bg-transparent px-4 py-3 text-sm text-[var(--d-ink)] outline-none transition-colors placeholder:text-[var(--d-ink-faint)] focus:border-[var(--d-gold)]"
              />
              <button
                type="submit"
                className="shrink-0 bg-[var(--d-gold)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0A0A0A] transition-colors hover:bg-[var(--d-gold-bright)]"
              >
                {content.newsletterCta}
              </button>
            </form>
          )}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[var(--d-line-soft)] pt-8 text-[11px] uppercase tracking-[0.2em] text-[var(--d-ink-faint)] sm:flex-row sm:items-center sm:justify-between">
          <p>{content.legal}</p>
          <p>{content.credit}</p>
        </div>
      </div>
    </footer>
  );
}
