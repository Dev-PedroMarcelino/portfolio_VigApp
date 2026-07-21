"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUp,
  AtSign,
  Clock,
  Flame,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import type { EmberStackContent } from "./content";
import { Eyebrow, Sticker } from "./ui";

const VISIT_IMG =
  "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=1400&q=80";

export function VisitSection({ content }: { content: EmberStackContent["visit"] }) {
  const reduce = useReducedMotion();

  return (
    <section
      id="visit"
      className="relative scroll-mt-24 border-y-4 border-[#120A05] bg-[var(--d-bg-deep)] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 className="mt-5 [font-family:var(--demo-display)] text-[clamp(1.9rem,4.5vw,3.1rem)] uppercase leading-[1.02] text-[var(--d-ink)]">
              {content.title}
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--d-ink-soft)]">
              {content.intro}
            </p>

            <dl className="mt-10 space-y-7">
              <div className="flex gap-4">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 -rotate-3 items-center justify-center rounded-xl border-2 border-[#120A05] bg-[var(--d-flame)] text-[#1A0E08] shadow-[3px_3px_0_rgba(0,0,0,0.45)]"
                >
                  <MapPin className="h-4.5 w-4.5" strokeWidth={2.2} />
                </span>
                <div>
                  <dt className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.18em] text-[var(--d-mustard)]">
                    {content.addressLabel}
                  </dt>
                  <dd className="mt-1.5 text-sm font-semibold text-[var(--d-ink)]">
                    {content.address}
                  </dd>
                  <dd className="text-sm text-[var(--d-ink-soft)]">{content.city}</dd>
                </div>
              </div>

              <div className="flex gap-4">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 rotate-2 items-center justify-center rounded-xl border-2 border-[#120A05] bg-[var(--d-mustard)] text-[#1A0E08] shadow-[3px_3px_0_rgba(0,0,0,0.45)]"
                >
                  <Clock className="h-4.5 w-4.5" strokeWidth={2.2} />
                </span>
                <div className="flex-1">
                  <dt className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.18em] text-[var(--d-mustard)]">
                    {content.hoursLabel}
                  </dt>
                  <dd className="mt-1.5">
                    <ul className="max-w-sm space-y-1.5">
                      {content.hours.map((row) => (
                        <li
                          key={row.days}
                          className="flex items-baseline justify-between gap-4 border-b border-dashed border-[var(--d-line)] pb-1.5 text-sm"
                        >
                          <span className="text-[var(--d-ink-soft)]">{row.days}</span>
                          <span className="font-semibold text-[var(--d-ink)] tabular-nums">
                            {row.time}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 -rotate-2 items-center justify-center rounded-xl border-2 border-[#120A05] bg-[var(--d-ink)] text-[#1A0E08] shadow-[3px_3px_0_rgba(0,0,0,0.45)]"
                >
                  <Phone className="h-4.5 w-4.5" strokeWidth={2.2} />
                </span>
                <div>
                  <dt className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.18em] text-[var(--d-mustard)]">
                    {content.contactLabel}
                  </dt>
                  <dd className="mt-1.5 text-sm font-semibold text-[var(--d-ink)]">
                    {content.phone}
                  </dd>
                  <dd className="flex items-center gap-1.5 text-sm text-[var(--d-ink-soft)]">
                    <Mail className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                    {content.email}
                  </dd>
                </div>
              </div>
            </dl>

            <motion.a
              href={content.telHref}
              whileHover={{ scale: 1.04, rotate: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="mt-10 inline-flex items-center gap-2 rounded-xl border-2 border-[#120A05] bg-[var(--d-flame)] px-6 py-3.5 [font-family:var(--demo-display)] text-sm uppercase leading-none text-[#1A0E08] shadow-[4px_4px_0_rgba(0,0,0,0.5)]"
            >
              <Phone className="h-4 w-4" strokeWidth={2.4} aria-hidden />
              {content.ctaLabel}
            </motion.a>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 32, rotate: 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 1.5 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-4 border-[#120A05] shadow-[8px_10px_0_rgba(0,0,0,0.5)] lg:aspect-[5/6]">
              <Image
                src={VISIT_IMG}
                alt={content.dineAlt}
                fill
                sizes="(min-width: 1024px) 540px, 92vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(190deg,rgba(255,107,44,0.14),transparent_40%,rgba(18,10,5,0.7))]"
              />
            </div>
            <div className="absolute -bottom-5 left-6 right-6 -rotate-1 rounded-2xl border-2 border-[#120A05] bg-[var(--d-mustard)] px-5 py-4 shadow-[4px_4px_0_rgba(0,0,0,0.45)]">
              <p className="text-xs font-semibold leading-relaxed text-[#1A0E08]">
                {content.pickupNote}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const SOCIAL_ICONS = [AtSign, Globe, MessageCircle];

export function SiteFooter({
  content,
  header,
}: {
  content: EmberStackContent["footer"];
  header: EmberStackContent["header"];
}) {
  return (
    <footer className="relative bg-[#120A05] pb-28 pt-16">
      <div className="mx-auto max-w-6xl px-6">
        <p className="[font-family:var(--demo-display)] text-[clamp(2.2rem,7.5vw,5.4rem)] uppercase leading-[0.95] text-[var(--d-ink)]">
          Ember <span className="text-[var(--d-flame)]">&amp;</span> Stack
        </p>

        <div className="mt-10 grid gap-10 border-t-2 border-dashed border-[var(--d-line)] pt-10 md:grid-cols-[1.2fr_0.9fr_0.9fr]">
          <div>
            <div className="-rotate-1">
              <Sticker tone="flame">{header.tagline}</Sticker>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--d-ink-soft)]">
              {content.blurb}
            </p>
          </div>

          <nav aria-label={content.navLabel}>
            <p className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.18em] text-[var(--d-mustard)]">
              {content.navLabel}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm font-medium">
              {[
                { href: "#menu", label: header.navMenu },
                { href: "#combo", label: header.navCombo },
                { href: "#sides", label: header.navSides },
                { href: "#visit", label: header.navVisit },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-mustard)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.18em] text-[var(--d-mustard)]">
              {content.socialLabel}
            </p>
            <ul className="mt-4 space-y-2.5">
              {content.socials.map((social, i) => {
                const Icon = SOCIAL_ICONS[i % SOCIAL_ICONS.length];
                return (
                  <li
                    key={social}
                    className="flex items-center gap-2.5 text-sm font-medium text-[var(--d-ink-soft)]"
                  >
                    <Icon
                      className="h-4 w-4 text-[var(--d-flame)]"
                      strokeWidth={2}
                      aria-hidden
                    />
                    {social}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--d-line)] pt-6">
          <p className="flex items-center gap-2 text-xs text-[var(--d-ink-soft)]">
            <Flame className="h-3.5 w-3.5 text-[var(--d-flame)]" strokeWidth={2.2} aria-hidden />
            {content.legal}
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 rounded-xl border-2 border-[var(--d-line-strong)] px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-[var(--d-ink-soft)] transition-colors hover:border-[var(--d-mustard)] hover:text-[var(--d-ink)]"
          >
            <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
            {content.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
