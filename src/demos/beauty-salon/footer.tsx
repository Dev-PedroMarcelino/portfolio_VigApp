"use client";

import { AtSign, Globe, Mail, MapPin, Phone } from "lucide-react";
import type { EclatContent } from "./content";

const SOCIAL_ICONS = [AtSign, Globe, Mail];

export function BrandFooter({ content }: { content: EclatContent["footer"] }) {
  return (
    <footer className="relative overflow-hidden bg-[var(--d-plum)] py-20 text-[var(--d-on-plum)]">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_15%_20%,rgba(176,107,126,0.9)_0%,transparent_42%),radial-gradient(circle_at_88%_82%,rgba(176,141,87,0.7)_0%,transparent_40%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <span className="flex items-center gap-3">
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-gold-bright)]"
              >
                <span className="[font-family:var(--demo-display)] text-lg italic leading-none text-[var(--d-gold-bright)]">
                  E
                </span>
              </span>
              <span className="[font-family:var(--demo-display)] text-2xl tracking-[0.12em]">
                Éclat <span className="italic text-[var(--d-gold-bright)]">Studio</span>
              </span>
            </span>
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-[var(--d-on-plum-soft)]">
              {content.blurb}
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[var(--d-gold-bright)]">
              <MapPin aria-hidden className="h-3.5 w-3.5" strokeWidth={1.6} />
              {content.addressLabel}
            </h3>
            <address className="mt-4 space-y-1 text-sm font-light not-italic leading-relaxed text-[var(--d-on-plum-soft)]">
              {content.address.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </address>
          </div>

          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-[var(--d-gold-bright)]">
              {content.hoursLabel}
            </h3>
            <ul className="mt-4 space-y-1 text-sm font-light leading-relaxed text-[var(--d-on-plum-soft)]">
              {content.hours.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-[var(--d-gold-bright)]">
              {content.contactLabel}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm font-light text-[var(--d-on-plum-soft)]">
              <li>
                <a
                  href={`tel:${content.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-[var(--d-on-plum)]"
                >
                  <Phone aria-hidden className="h-3.5 w-3.5" strokeWidth={1.6} />
                  {content.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${content.email}`}
                  className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-[var(--d-on-plum)]"
                >
                  <Mail aria-hidden className="h-3.5 w-3.5" strokeWidth={1.6} />
                  {content.email}
                </a>
              </li>
            </ul>

            <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-[var(--d-gold-bright)]">
              {content.followLabel}
            </p>
            <ul className="mt-3 flex items-center gap-3">
              {content.socials.map((social, index) => {
                const Icon = SOCIAL_ICONS[index % SOCIAL_ICONS.length];
                return (
                  <li key={social}>
                    <a
                      href="#top"
                      aria-label={social}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(243,228,222,0.28)] text-[var(--d-on-plum-soft)] transition-colors duration-300 hover:border-[var(--d-gold-bright)] hover:text-[var(--d-gold-bright)]"
                    >
                      <Icon aria-hidden className="h-3.5 w-3.5" strokeWidth={1.6} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-[rgba(243,228,222,0.14)] pt-6">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--d-on-plum-soft)]">
            {content.fineprint}
          </p>
        </div>
      </div>
    </footer>
  );
}
