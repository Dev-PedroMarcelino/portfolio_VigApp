"use client";

import { AtSign, Globe, MapPin, Clock, Mail, Phone } from "lucide-react";
import type { AmbraContent } from "./content";

export function AmbraFooter({ content }: { content: AmbraContent["footer"] }) {
  const socialIcons = [AtSign, Globe];

  return (
    <footer className="border-t border-[var(--d-line)] bg-[var(--d-bg-2)] px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <p className="flex items-baseline gap-2 [font-family:var(--demo-display)] text-[1.7rem] leading-none text-[var(--d-ink)]">
              Studio Ambra
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--d-accent)]" />
            </p>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-[var(--d-soft)]">
              {content.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-[var(--d-accent)]">
              {content.studioLabel}
            </h3>
            <address className="mt-4 not-italic text-[14px] leading-relaxed text-[var(--d-soft)]">
              <span className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.6} aria-hidden />
                <span>
                  {content.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </span>
            </address>
            <h3 className="mt-6 text-[11px] uppercase tracking-[0.2em] text-[var(--d-accent)]">
              {content.hoursLabel}
            </h3>
            <p className="mt-4 flex items-start gap-2 text-[14px] leading-relaxed text-[var(--d-soft)]">
              <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.6} aria-hidden />
              <span>
                {content.hours.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </p>
          </div>

          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-[var(--d-accent)]">
              {content.contactLabel}
            </h3>
            <ul className="mt-4 space-y-3 text-[14px] text-[var(--d-soft)]">
              <li>
                <a
                  href={`mailto:${content.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-[var(--d-ink)]"
                >
                  <Mail className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />
                  {content.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${content.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2 transition-colors hover:text-[var(--d-ink)]"
                >
                  <Phone className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />
                  {content.phone}
                </a>
              </li>
            </ul>

            <h3 className="mt-6 text-[11px] uppercase tracking-[0.2em] text-[var(--d-accent)]">
              {content.socialLabel}
            </h3>
            <ul className="mt-4 space-y-3 text-[14px] text-[var(--d-soft)]">
              {content.social.map((s, i) => {
                const Icon = socialIcons[i % socialIcons.length];
                return (
                  <li key={s.label}>
                    <a
                      href="#top"
                      className="flex items-center gap-2 transition-colors hover:text-[var(--d-ink)]"
                    >
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />
                      <span className="text-[var(--d-ink)]">{s.label}</span>
                      <span className="text-[var(--d-soft)]">{s.handle}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-[var(--d-accent)]">
              {content.linksLabel}
            </h3>
            <ul className="mt-4 space-y-3 text-[14px] text-[var(--d-soft)]">
              {content.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-[var(--d-ink)]">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[var(--d-line)] pt-6 text-[12px] text-[var(--d-soft)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            {"©"} 2011{"–"}2026 {content.rights}
          </p>
          <p>{content.credit}</p>
        </div>
      </div>
    </footer>
  );
}
