"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AtSign, Check, Globe, Mail, MapPin, MessageCircle, Phone, Share2 } from "lucide-react";
import type { FooterContent } from "./content";
import { Crest, DoubleRule, scrollToId } from "./ui";

const socialIcon = {
  at: AtSign,
  globe: Globe,
  share: Share2,
  message: MessageCircle,
} as const;

export function Footer({ content }: { content: FooterContent }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    setEmail("");
  };

  return (
    <footer className="bg-[var(--d-footer)] text-[var(--d-parchment)]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          {/* brand block */}
          <div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3"
              aria-label="Northgate"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--d-parchment)]/25">
                <Crest className="h-6 w-6" stroke="var(--d-parchment)" accent="var(--d-gold)" />
              </span>
              <span className="flex flex-col leading-none text-left">
                <span className="[font-family:var(--demo-display)] text-2xl font-bold tracking-[0.04em]">
                  Northgate
                </span>
                <span className="mt-1 text-[0.62rem] italic text-[var(--d-gold)] [font-family:var(--demo-display)]">
                  {content.motto}
                </span>
              </span>
            </button>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[var(--d-parchment)]/65">
              {content.tagline}
            </p>

            <div className="mt-6 max-w-xs">
              <DoubleRule color="var(--d-parchment)" />
            </div>

            <form onSubmit={submit} className="mt-6 max-w-sm">
              <label htmlFor="northgate-news" className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--d-parchment)]/70">
                {content.newsletterLabel}
              </label>
              <div className="mt-2.5 flex gap-2">
                <input
                  id="northgate-news"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (done) setDone(false);
                  }}
                  placeholder={content.newsletterPlaceholder}
                  className="min-w-0 flex-1 rounded-lg border border-[var(--d-parchment)]/20 bg-[var(--d-parchment)]/5 px-3.5 py-2.5 text-sm text-[var(--d-parchment)] outline-none transition-colors placeholder:text-[var(--d-parchment)]/40 focus:border-[var(--d-gold)]"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-[var(--d-crimson)] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--d-parchment)] transition-transform hover:-translate-y-0.5"
                >
                  {content.newsletterCta}
                </button>
              </div>
              <AnimatePresence>
                {done && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-[var(--d-gold)]"
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                    {content.newsletterDone}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* links + contact */}
          <div className="grid gap-10 sm:grid-cols-4">
            {content.columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--d-gold)]">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#programs"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToId("programs");
                        }}
                        className="text-sm text-[var(--d-parchment)]/70 transition-colors hover:text-[var(--d-parchment)]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--d-gold)]">
                {content.contactTitle}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-[var(--d-parchment)]/70">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--d-parchment)]/50" strokeWidth={2} />
                  {content.address}
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--d-parchment)]/50" strokeWidth={2} />
                  {content.phone}
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--d-parchment)]/50" strokeWidth={2} />
                  {content.email}
                </li>
              </ul>
              <p className="mt-4 text-xs text-[var(--d-parchment)]/45">{content.hours}</p>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-14 flex flex-col gap-5 border-t border-[var(--d-parchment)]/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--d-parchment)]/50">
              {content.socialLabel}
            </span>
            <div className="flex gap-2">
              {content.socials.map((social) => {
                const Icon = socialIcon[social.kind];
                return (
                  <button
                    key={social.label}
                    type="button"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-parchment)]/20 text-[var(--d-parchment)]/70 transition-colors hover:border-[var(--d-gold)] hover:text-[var(--d-gold)]"
                  >
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </button>
                );
              })}
            </div>
          </div>
          <p className="text-xs text-[var(--d-parchment)]/45">{content.legal}</p>
        </div>
      </div>
    </footer>
  );
}
