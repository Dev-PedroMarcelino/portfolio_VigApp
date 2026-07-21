"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Camera, Check, Mail, Package } from "lucide-react";
import type { FooterContent } from "./content";
import { scrollToId } from "./ui";

export function CratefulFooter({ content }: { content: FooterContent }) {
  const reduce = useReducedMotion() ?? false;
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim().length > 3) setSubscribed(true);
  };

  return (
    <footer className="bg-[var(--d-dark)] px-5 pb-24 pt-20 text-[var(--d-sand)]">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-md">
            <p className="flex items-center gap-2.5 [font-family:var(--demo-display)] text-4xl tracking-tight">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--d-accent)] text-[var(--d-bg)]">
                <Package className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
              </span>
              Crateful
            </p>
            <p className="mt-4 text-sm leading-[1.85] text-[var(--d-sand-dim)]">{content.tagline}</p>

            <div className="mt-9 rounded-[1.5rem] border border-[var(--d-dark-line)] bg-[#372817] p-6">
              <h3 className="[font-family:var(--demo-display)] text-xl italic tracking-tight">
                {content.newsTitle}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[var(--d-sand-dim)]">
                {content.newsBody}
              </p>
              <AnimatePresence mode="wait" initial={false}>
                {!subscribed ? (
                  <motion.form
                    key="form"
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={onSubmit}
                    className="mt-4"
                  >
                    <label
                      htmlFor="crateful-news-email"
                      className="text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-[var(--d-sand-dim)]"
                    >
                      {content.newsLabel}
                    </label>
                    <div className="mt-2 flex gap-2">
                      <input
                        id="crateful-news-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={content.newsPlaceholder}
                        className="min-w-0 flex-1 rounded-full border border-[var(--d-dark-line)] bg-[var(--d-dark)] px-4 py-3 text-sm text-[var(--d-sand)] placeholder:text-[var(--d-sand-dim)]/60 focus:border-[var(--d-accent)] focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="flex shrink-0 items-center gap-2 rounded-full bg-[var(--d-accent)] px-5 py-3 text-[0.64rem] font-extrabold uppercase tracking-[0.14em] text-[var(--d-bg)] transition-transform hover:scale-[1.04]"
                      >
                        {content.newsCta}
                        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
                      </button>
                    </div>
                    <p className="mt-3 text-[0.64rem] text-[var(--d-sand-dim)]">
                      {content.newsPrivacy}
                    </p>
                  </motion.form>
                ) : (
                  <motion.p
                    key="ok"
                    initial={reduce ? undefined : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 flex items-start gap-3 rounded-2xl bg-[var(--d-olive-deep)] p-4 text-sm font-bold text-[var(--d-sand)]"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--d-olive)] text-[var(--d-card)]">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                    </span>
                    {content.newsSuccess}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 lg:justify-items-end">
            <nav aria-label={content.exploreLabel}>
              <h3 className="text-[0.62rem] font-extrabold uppercase tracking-[0.26em] text-[var(--d-sand-dim)]">
                {content.exploreLabel}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {content.explore.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId(item.href.slice(1));
                      }}
                      className="text-sm text-[var(--d-sand)] transition-colors hover:text-[var(--d-accent)]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="text-[0.62rem] font-extrabold uppercase tracking-[0.26em] text-[var(--d-sand-dim)]">
                {content.contactLabel}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {content.addressLines.map((line) => (
                  <li key={line} className="text-[var(--d-sand-dim)]">
                    {line}
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${content.email}`}
                    className="flex items-center gap-2 pt-2 text-[var(--d-sand)] transition-colors hover:text-[var(--d-accent)]"
                  >
                    <Mail className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
                    {content.email}
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/crateful.crates"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[var(--d-sand)] transition-colors hover:text-[var(--d-accent)]"
                  >
                    <Camera className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
                    {content.instagram}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-[var(--d-dark-line)] pt-7 text-xs text-[var(--d-sand-dim)] sm:flex-row sm:items-center sm:justify-between">
          <p>{content.fine}</p>
          <p>{content.credit}</p>
        </div>
      </div>
    </footer>
  );
}
