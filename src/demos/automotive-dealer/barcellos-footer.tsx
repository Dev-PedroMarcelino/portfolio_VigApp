"use client";

import { Camera, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import type { BarcellosContent } from "./content";
import { waLink } from "./content";
import { FOCUS, scrollToId } from "./ui";

export function BarcellosFooter({
  content,
  whatsappMsg,
}: {
  content: BarcellosContent["footer"];
  whatsappMsg: string;
}) {
  return (
    <footer className="relative border-t border-[var(--d-line)] bg-[#08090C]">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.9fr_0.9fr]">
          {/* Brand */}
          <div>
            <p className="flex items-baseline gap-1.5">
              <span className="text-[1.15rem] font-semibold uppercase tracking-[0.22em] text-[var(--d-ink)] [font-family:var(--demo-display)]">
                Barcellos
              </span>
              <span className="text-[0.85rem] lowercase tracking-[0.08em] text-[var(--d-gold)] [font-family:var(--demo-mono)]">
                veículos
              </span>
            </p>
            <p className="mt-4 max-w-sm text-[0.85rem] leading-relaxed text-[var(--d-ink-soft)]">{content.blurb}</p>
            <p className="mt-5 flex items-start gap-2 text-[0.8rem] leading-relaxed text-[var(--d-silver)]">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--d-gold)]" strokeWidth={1.8} aria-hidden />
              {content.address}
            </p>
            <p className="mt-2.5 flex items-center gap-2 text-[0.8rem] text-[var(--d-silver)]">
              <Clock className="h-4 w-4 shrink-0 text-[var(--d-gold)]" strokeWidth={1.8} aria-hidden />
              {content.hours}
            </p>
          </div>

          {/* Nav */}
          <nav aria-label={content.navLabel}>
            <p className="text-[0.64rem] uppercase tracking-[0.26em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
              {content.navLabel}
            </p>
            <ul className="mt-4 space-y-2.5">
              {content.nav.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollToId(link.href)}
                    className={`text-[0.85rem] text-[var(--d-silver)] transition-colors hover:text-[var(--d-gold)] ${FOCUS}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-[0.64rem] uppercase tracking-[0.26em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
              {content.contactLabel}
            </p>
            <ul className="mt-4 space-y-2.5 text-[0.85rem]">
              <li className="flex items-center gap-2 text-[var(--d-silver)]">
                <Phone className="h-4 w-4 shrink-0 text-[var(--d-gold)]" strokeWidth={1.8} aria-hidden />
                <span className="[font-family:var(--demo-mono)]">{content.phone}</span>
              </li>
              <li>
                <a
                  href={waLink(whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-[var(--d-silver)] transition-colors hover:text-[var(--d-gold)] ${FOCUS}`}
                >
                  <MessageCircle className="h-4 w-4 shrink-0 text-[var(--d-gold)]" strokeWidth={1.8} aria-hidden />
                  <span className="[font-family:var(--demo-mono)]">{content.whatsapp}</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-[var(--d-silver)]">
                <Camera className="h-4 w-4 shrink-0 text-[var(--d-gold)]" strokeWidth={1.8} aria-hidden />
                <span className="[font-family:var(--demo-mono)]">{content.instagram}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[var(--d-line)] pt-7 sm:flex-row sm:items-center">
          <p className="text-[0.72rem] text-[var(--d-ink-soft)]">{content.rights}</p>
          <p className="text-[0.72rem] text-[var(--d-gold)]/80 [font-family:var(--demo-mono)]">{content.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
