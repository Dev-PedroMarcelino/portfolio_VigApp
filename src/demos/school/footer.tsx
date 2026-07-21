"use client";

import { useState } from "react";
import {
  AtSign,
  Camera,
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Share2,
  Sparkles,
} from "lucide-react";
import type { FooterContent } from "./content";
import { scrollToId } from "./ui";

const SOCIAL_ICON = { at: AtSign, camera: Camera, share: Share2, message: MessageCircle, globe: Globe } as const;

export function Footer({ content }: { content: FooterContent }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    setEmail("");
    window.setTimeout(() => setSent(false), 2600);
  };

  return (
    <footer className="relative overflow-hidden bg-[var(--d-footer)] pt-16 text-white">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <button
              type="button"
              onClick={() => scrollToId("programs")}
              className="flex items-center gap-2"
              aria-label="Brightpath"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--d-accent)] text-white">
                <Sparkles className="h-5 w-5" strokeWidth={2.4} />
              </span>
              <span className="[font-family:var(--demo-display)] text-2xl font-extrabold tracking-tight">
                Brightpath
              </span>
            </button>
            <p className="mt-4 max-w-xs leading-relaxed text-white/60">{content.tagline}</p>

            <ul className="mt-5 space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--d-sun)]" strokeWidth={2.2} />
                {content.address}
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-[var(--d-sun)]" strokeWidth={2.2} />
                {content.hours}
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[var(--d-sun)]" strokeWidth={2.2} />
                {content.phone}
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[var(--d-sun)]" strokeWidth={2.2} />
                {content.email}
              </li>
            </ul>
          </div>

          {content.columns.map((col) => (
            <div key={col.title}>
              <h3 className="[font-family:var(--demo-display)] text-sm font-extrabold uppercase tracking-[0.14em] text-white/50">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      onClick={() => scrollToId("enroll")}
                      className="text-sm font-semibold text-white/75 transition-colors hover:text-[var(--d-sun)]"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* newsletter + socials */}
        <div className="mt-12 grid gap-6 border-t border-white/10 py-8 sm:grid-cols-[1.2fr_1fr] sm:items-center">
          <form onSubmit={onSubmit} className="max-w-md">
            <label htmlFor="footer-news" className="mb-2 block text-sm font-extrabold text-white">
              {content.newsletterLabel}
            </label>
            <div className="flex gap-2">
              <input
                id="footer-news"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={content.newsletterPlaceholder}
                className="w-full rounded-full border-2 border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white outline-none transition-colors placeholder:text-white/40 focus:border-[var(--d-sun)]"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--d-sun)] px-5 py-2.5 text-sm font-extrabold text-[var(--d-ink)] transition-transform hover:scale-[1.04]"
              >
                {sent ? <Sparkles className="h-4 w-4" strokeWidth={2.4} /> : <Send className="h-4 w-4" strokeWidth={2.4} />}
                {content.newsletterCta}
              </button>
            </div>
          </form>

          <div className="sm:justify-self-end">
            <p className="mb-2.5 text-sm font-extrabold text-white/60">{content.socialLabel}</p>
            <div className="flex gap-2.5">
              {content.socials.map((s) => {
                const Icon = SOCIAL_ICON[s.kind];
                return (
                  <span
                    key={s.label}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8 text-white/80 transition-colors hover:bg-[var(--d-accent)] hover:text-white"
                    title={s.label}
                    aria-label={s.label}
                    role="img"
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <p className="border-t border-white/10 py-6 text-center text-xs font-semibold text-white/40">
          {content.legal}
        </p>
      </div>
    </footer>
  );
}
