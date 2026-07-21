"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AtSign, Camera, Check, Globe, Share2, Trees } from "lucide-react";
import type { HotelContent } from "./content";

const SOCIAL_ICON = {
  at: AtSign,
  camera: Camera,
  share: Share2,
  globe: Globe,
} as const;

export function BrandFooter({ content }: { content: HotelContent["footer"] }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  };

  return (
    <footer className="relative border-t border-[var(--d-line-soft)] bg-[var(--d-pine)] pb-24 pt-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-brass)]">
                <Trees aria-hidden className="h-4 w-4 text-[var(--d-brass)]" strokeWidth={1.4} />
              </span>
              <span className="[font-family:var(--demo-display)] text-2xl font-medium tracking-[0.14em] text-[var(--d-linen)]">
                The <span className="italic text-[var(--d-brass-bright)]">Solace</span>
              </span>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--d-ink-soft)]">
              {content.tagline}
            </p>
            <address className="mt-6 flex flex-col gap-0.5 text-xs not-italic leading-relaxed text-[var(--d-ink-faint)]">
              {content.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>

            <div className="mt-7 flex items-center gap-3">
              {content.social.map((item) => {
                const Icon = SOCIAL_ICON[item.kind];
                return (
                  <a
                    key={item.label}
                    href="#top"
                    aria-label={item.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--d-line-soft)] text-[var(--d-ink-soft)] transition-colors duration-300 hover:border-[var(--d-brass)] hover:text-[var(--d-brass)]"
                  >
                    <Icon aria-hidden className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {content.columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[var(--d-brass)]">
                  {col.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#top"
                        className="text-xs text-[var(--d-ink-soft)] transition-colors duration-300 hover:text-[var(--d-linen)]"
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

        <div className="mt-16 border-t border-[var(--d-line-soft)] pt-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_2fr] lg:items-center">
            <div>
              <h3 className="[font-family:var(--demo-display)] text-2xl font-medium italic text-[var(--d-linen)]">
                {content.newsletterTitle}
              </h3>
              <p className="mt-2 max-w-sm text-xs leading-relaxed text-[var(--d-ink-soft)]">
                {content.newsletterBody}
              </p>
            </div>
            <form onSubmit={submit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row lg:ml-auto">
              <label className="flex-1">
                <span className="sr-only">{content.newsletterPlaceholder}</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setDone(false);
                  }}
                  placeholder={content.newsletterPlaceholder}
                  className="w-full border border-[var(--d-line-soft)] bg-[var(--d-surface)] px-4 py-3.5 text-sm text-[var(--d-linen)] outline-none transition-colors placeholder:text-[var(--d-ink-faint)] focus:border-[var(--d-brass)] [color-scheme:dark]"
                />
              </label>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-[var(--d-brass)] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#152A25] transition-colors duration-300 hover:bg-[var(--d-brass-bright)]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {done ? (
                    <motion.span
                      key="done"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="h-4 w-4" strokeWidth={2} />
                      {content.newsletterDone}
                    </motion.span>
                  ) : (
                    <motion.span key="idle" exit={{ opacity: 0 }}>
                      {content.newsletterCta}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-[var(--d-line-soft)] pt-8 text-[10px] uppercase tracking-[0.24em] text-[var(--d-ink-faint)] sm:flex-row">
          <span>The Solace · {content.rights}</span>
          <span>{content.credit}</span>
        </div>
      </div>
    </footer>
  );
}
