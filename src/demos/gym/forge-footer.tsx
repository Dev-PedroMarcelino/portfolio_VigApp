"use client";

import { AtSign, Camera, Globe, MapPin, MessageCircle, Phone, Share2 } from "lucide-react";
import type { FooterContent, SocialKind } from "./content";
import { scrollToId } from "./ui";

const ICONS: Record<SocialKind, typeof AtSign> = {
  at: AtSign,
  camera: Camera,
  share: Share2,
  message: MessageCircle,
  globe: Globe,
};

export function ForgeFooter({ content }: { content: FooterContent }) {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--d-line)] bg-[#0B0B0D] pt-16">
      {/* Oversized outlined wordmark */}
      <div className="pointer-events-none select-none px-5" aria-hidden>
        <div
          className="mx-auto max-w-6xl [font-family:var(--demo-display)] text-[18vw] uppercase leading-[0.8] tracking-[-0.02em] text-transparent sm:text-[13rem]"
          style={{ WebkitTextStroke: "1px #26262B" }}
        >
          Forge
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-10">
        <div className="grid gap-10 border-t border-[var(--d-line)] pt-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="[font-family:var(--demo-display)] text-2xl uppercase text-[var(--d-ink)]">
                Forge
              </span>
              <span className="[font-family:var(--demo-display)] text-2xl uppercase text-[var(--d-accent)]">
                Athletic
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[0.9rem] leading-relaxed text-[var(--d-ink-dim)]">
              {content.tagline}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {content.social.map((item) => {
                const Icon = ICONS[item.kind];
                return (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-2 border border-[var(--d-line-bright)] px-3 py-2 text-[0.7rem] font-semibold text-[var(--d-ink-dim)] transition-colors hover:border-[var(--d-accent)] hover:text-[var(--d-ink)]"
                  >
                    <Icon className="h-3.5 w-3.5 text-[var(--d-accent)]" strokeWidth={2} aria-hidden />
                    {item.label}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {content.columns.map((column) => (
              <div key={column.title}>
                <div className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[var(--d-ink-faint)]">
                  {column.title}
                </div>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link}>
                      <button
                        type="button"
                        onClick={() => scrollToId("top")}
                        className="text-[0.86rem] text-[var(--d-ink-dim)] transition-colors hover:text-[var(--d-accent)]"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-[var(--d-line)] pt-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[var(--d-accent)]">
              <MapPin className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
              {content.locationTitle}
            </div>
            <p className="mt-3 text-[0.86rem] leading-relaxed text-[var(--d-ink-dim)]">
              {content.address}
            </p>
          </div>
          <div>
            <div className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[var(--d-accent)]">
              {content.hoursTitle}
            </div>
            <ul className="mt-3 flex flex-col gap-1.5">
              {content.hours.map((line) => (
                <li key={line} className="text-[0.86rem] text-[var(--d-ink-dim)]">
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[var(--d-accent)]">
              {content.contactTitle}
            </div>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <a
                  href={`tel:${content.phone.replace(/[^+\d]/g, "")}`}
                  className="inline-flex items-center gap-2 text-[0.86rem] text-[var(--d-ink-dim)] transition-colors hover:text-[var(--d-ink)]"
                >
                  <Phone className="h-3.5 w-3.5 text-[var(--d-accent)]" strokeWidth={2} aria-hidden />
                  {content.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${content.email}`}
                  className="inline-flex items-center gap-2 text-[0.86rem] text-[var(--d-ink-dim)] transition-colors hover:text-[var(--d-ink)]"
                >
                  <AtSign className="h-3.5 w-3.5 text-[var(--d-accent)]" strokeWidth={2} aria-hidden />
                  {content.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-[var(--d-line)] pt-6 text-[0.72rem] text-[var(--d-ink-faint)]">
          {content.legal}
        </p>
      </div>
    </footer>
  );
}
