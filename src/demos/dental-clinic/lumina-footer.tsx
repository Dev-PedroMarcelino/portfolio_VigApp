"use client";

import { AtSign, Camera, Mail, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";
import type { FooterContent } from "./content";
import { scrollToId } from "./ui";

const SOCIAL_ICONS = [Camera, AtSign, MessageCircle];

export function LuminaFooter({ content }: { content: FooterContent }) {
  return (
    <footer className="relative overflow-hidden bg-[var(--d-navy)] px-6 pb-24 pt-20 text-white sm:px-10 lg:px-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-40 h-[28rem] w-[28rem] rounded-[58%_42%_55%_45%/55%_48%_52%_45%] opacity-20 blur-2xl"
        style={{ background: "radial-gradient(circle at 40% 40%, #5FC2D9 0%, #2E7CC0 60%, transparent 100%)" }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.2fr_repeat(3,0.8fr)]">
        <div>
          <p className="flex items-center gap-2 [font-family:var(--demo-display)] text-2xl font-bold tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-[40%_60%_55%_45%/55%_45%_60%_40%] bg-gradient-to-br from-[var(--d-accent)] to-[var(--d-aqua)] text-white">
              <Sparkles className="h-4 w-4" strokeWidth={2.2} />
            </span>
            Lumina
            <span className="font-light text-[var(--d-glow)]">Dental</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{content.blurb}</p>
          <div className="mt-6 flex gap-3">
            {content.social.map((item, index) => {
              const Icon = SOCIAL_ICONS[index % SOCIAL_ICONS.length];
              return (
                <a
                  key={item.label}
                  href="#top"
                  onClick={(e) => e.preventDefault()}
                  aria-label={item.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors hover:border-[var(--d-glow)]/60 hover:text-white"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--d-glow)]">
            {content.addressTitle}
          </h3>
          <address className="mt-4 flex flex-col gap-1.5 text-sm not-italic leading-relaxed text-white/70">
            {content.addressLines.map((line, index) => (
              <span key={line} className={index === 0 ? "flex items-center gap-2 font-semibold text-white" : ""}>
                {index === 0 && <MapPin className="h-3.5 w-3.5 text-[var(--d-glow)]" strokeWidth={2} />}
                {line}
              </span>
            ))}
          </address>

          <h3 className="mt-8 text-xs font-bold uppercase tracking-[0.28em] text-[var(--d-glow)]">
            {content.contactTitle}
          </h3>
          <p className="mt-4 flex items-center gap-2 text-sm text-white/70">
            <Phone className="h-3.5 w-3.5 text-[var(--d-glow)]" strokeWidth={2} />
            {content.phone}
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm text-white/70">
            <Mail className="h-3.5 w-3.5 text-[var(--d-glow)]" strokeWidth={2} />
            {content.email}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--d-glow)]">
            {content.hoursTitle}
          </h3>
          <dl className="mt-4 space-y-3">
            {content.hours.map((entry) => (
              <div key={entry.days} className="text-sm">
                <dt className="font-semibold text-white">{entry.days}</dt>
                <dd className="text-white/60">{entry.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--d-glow)]">
            {content.navTitle}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {content.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(item.href);
                  }}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative mx-auto mt-16 w-full max-w-6xl border-t border-white/10 pt-8">
        <p className="text-xs text-white/40">{content.legal}</p>
      </div>
    </footer>
  );
}
