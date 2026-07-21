"use client";

import { Flame, Mail, MapPin, Phone } from "lucide-react";
import type { LumiereContent } from "./content";

export function BrandFooter({ content }: { content: LumiereContent["footer"] }) {
  return (
    <footer className="border-t border-[var(--d-line-soft)] bg-[var(--d-bg-soft)]">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-32 pt-20 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <a href="#top" className="inline-flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-gold)]">
              <Flame aria-hidden className="h-4 w-4 text-[var(--d-gold)]" strokeWidth={1.5} />
            </span>
            <span className="[font-family:var(--demo-display)] text-2xl font-medium tracking-[0.08em] text-[var(--d-ink)]">
              Maison{" "}
              <span className="italic text-[var(--d-gold-bright)]">Lumi&egrave;re</span>
            </span>
          </a>
          <p className="mt-5 max-w-xs text-sm font-light leading-relaxed text-[var(--d-ink-soft)]">
            {content.blurb}
          </p>
          <div className="mt-8">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--d-gold)]">
              {content.followLabel}
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {content.socials.map((social) => (
                <li
                  key={social}
                  className="text-xs font-light uppercase tracking-[0.2em] text-[var(--d-ink-soft)] transition-colors duration-300 hover:text-[var(--d-gold-bright)]"
                >
                  {social}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[var(--d-gold)]">
              <MapPin aria-hidden className="h-3.5 w-3.5" strokeWidth={1.5} />
              {content.addressLabel}
            </p>
            <ul className="mt-4 space-y-1.5">
              {content.address.map((line) => (
                <li key={line} className="text-sm font-light leading-relaxed text-[var(--d-ink-soft)]">
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[var(--d-gold)]">
              <Flame aria-hidden className="h-3.5 w-3.5" strokeWidth={1.5} />
              {content.hoursLabel}
            </p>
            <ul className="mt-4 space-y-1.5">
              {content.hours.map((line) => (
                <li key={line} className="text-sm font-light leading-relaxed text-[var(--d-ink-soft)]">
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[var(--d-gold)]">
              <Phone aria-hidden className="h-3.5 w-3.5" strokeWidth={1.5} />
              {content.contactLabel}
            </p>
            <ul className="mt-4 space-y-1.5">
              <li>
                <a
                  href={`tel:${content.phone.replace(/\s/g, "")}`}
                  className="text-sm font-light text-[var(--d-ink-soft)] transition-colors duration-300 hover:text-[var(--d-gold-bright)]"
                >
                  {content.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${content.email}`}
                  className="inline-flex items-center gap-2 break-all text-sm font-light text-[var(--d-ink-soft)] transition-colors duration-300 hover:text-[var(--d-gold-bright)]"
                >
                  <Mail aria-hidden className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                  {content.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--d-line-soft)]">
        <p className="mx-auto max-w-6xl px-6 py-6 text-center text-[10px] uppercase tracking-[0.25em] text-[var(--d-ink-faint)] md:text-left">
          {content.fineprint}
        </p>
      </div>
    </footer>
  );
}
