"use client";

import { AtSign, Camera, Share2, Globe, HardHat, MapPin, Clock } from "lucide-react";
import type { VertexContent } from "./content";

const SOCIAL_ICONS = {
  at: AtSign,
  camera: Camera,
  share: Share2,
  globe: Globe,
} as const;

export function BrandFooter({
  content,
  navAria,
}: {
  content: VertexContent["footer"];
  navAria: string;
}) {
  return (
    <footer className="relative border-t border-[var(--d-line)] bg-[var(--d-bg)] pt-16">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-2"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--d-accent-ink) 0 18px, var(--d-accent) 18px 36px)",
        }}
      />
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 pb-14 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5 leading-none">
              <span className="flex h-8 w-8 items-center justify-center bg-[var(--d-accent)] text-[var(--d-accent-ink)]">
                <HardHat className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="[font-family:var(--demo-display)] text-lg uppercase tracking-[0.02em] text-[var(--d-ink)]">
                Vertex Build
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[var(--d-ink-soft)]">
              {content.tagline}
            </p>

            <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <div className="flex items-center gap-2 text-[var(--d-accent)]">
                  <MapPin className="h-4 w-4" strokeWidth={1.75} />
                  <span className="[font-family:var(--demo-body)] text-[10px] font-medium uppercase tracking-[0.2em]">
                    {content.addressLabel}
                  </span>
                </div>
                <div className="mt-2 text-sm text-[var(--d-ink)]">
                  {content.address.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[var(--d-accent)]">
                  <Clock className="h-4 w-4" strokeWidth={1.75} />
                  <span className="[font-family:var(--demo-body)] text-[10px] font-medium uppercase tracking-[0.2em]">
                    {content.hoursLabel}
                  </span>
                </div>
                <div className="mt-2 text-sm text-[var(--d-ink)]">{content.hours}</div>
              </div>
            </div>
          </div>

          <nav
            aria-label={navAria}
            className="grid grid-cols-2 gap-8 sm:grid-cols-3"
          >
            {content.columns.map((col) => (
              <div key={col.title}>
                <h3 className="[font-family:var(--demo-body)] text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--d-ink-faint)]">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#top"
                        className="text-sm text-[var(--d-ink-soft)] transition-colors duration-200 hover:text-[var(--d-accent)]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-5 border-t border-[var(--d-line)] py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--d-ink-faint)]">
            {content.legal}
          </p>
          <div className="flex items-center gap-2.5">
            <span className="sr-only">{content.socialLabel}</span>
            {content.social.map((item) => {
              const Icon = SOCIAL_ICONS[item.kind];
              return (
                <a
                  key={item.label}
                  href="#top"
                  aria-label={item.label}
                  className="flex h-9 w-9 items-center justify-center border border-[var(--d-line-strong)] text-[var(--d-ink-soft)] transition-colors duration-200 hover:border-[var(--d-accent)] hover:text-[var(--d-accent)]"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
