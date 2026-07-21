"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import type { NordformContent } from "./content";

export function NordformFooter({ content }: { content: NordformContent["footer"] }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-[var(--d-dark)] pb-28 pt-16 text-[var(--d-bone)] sm:pt-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="flex items-baseline gap-1.5 text-3xl [font-family:var(--demo-display)]">
              Nordform
              <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-[var(--d-sage)]" />
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--d-dark-text)]">
              {content.tagline}
            </p>
            <ul className="mt-6 flex flex-wrap gap-4">
              {content.social.map((label) => (
                <li key={label}>
                  <a
                    href="#top"
                    className="flex items-center gap-1 text-xs font-semibold text-[var(--d-dark-text)] transition-colors hover:text-[var(--d-bone)]"
                  >
                    {label}
                    <ArrowUpRight className="h-3 w-3" strokeWidth={1.8} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {content.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--d-oak)]">
                  {column.title}
                </p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-[var(--d-dark-text)] transition-colors hover:text-[var(--d-bone)]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 rounded-[20px] border border-[var(--d-dark-line)] bg-[var(--d-dark-2)] p-6 sm:p-8">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_1fr]">
            <div>
              <h3 className="text-xl [font-family:var(--demo-display)]">{content.newsTitle}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--d-dark-text)]">
                {content.newsBody}
              </p>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              {subscribed ? (
                <motion.p
                  key="done"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-[var(--d-sage)]"
                >
                  <Check className="h-4 w-4 shrink-0" strokeWidth={2} />
                  {content.newsSuccess}
                </motion.p>
              ) : (
                <motion.form
                  key="form"
                  exit={{ opacity: 0, y: -8 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email.includes("@") && email.includes(".")) setSubscribed(true);
                  }}
                  className="flex gap-2"
                >
                  <label htmlFor="footer-email" className="sr-only">
                    {content.newsLabel}
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={content.newsPlaceholder}
                    className="w-full flex-1 rounded-full border border-[var(--d-dark-line)] bg-[var(--d-dark)] px-5 py-3 text-sm text-[var(--d-bone)] outline-none transition-colors placeholder:text-[rgba(207,198,184,0.45)] focus:border-[var(--d-oak)]"
                  />
                  <button
                    type="submit"
                    aria-label={content.newsCta}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--d-bone)] text-[var(--d-ink)] transition-colors hover:bg-[var(--d-oak)]"
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-10 border-t border-[var(--d-dark-line)] pt-6 text-center text-[11px] tracking-wide text-[rgba(207,198,184,0.6)]">
          {content.legal}
        </p>
      </div>
    </footer>
  );
}
