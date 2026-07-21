"use client";

import Image from "next/image";
import { ArrowUpRight, Clock, Camera, Mail, MapPin, Phone } from "lucide-react";
import type { VisitContent } from "./content";
import { SectionLabel } from "./ui";

const VISIT_IMG =
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1400&q=80";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Rua+Harmonia+456+Vila+Madalena+Sao+Paulo";

export function VisitSection({ content }: { content: VisitContent }) {
  return (
    <section id="visit" className="scroll-mt-20 px-5 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative mb-12 lg:mb-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2.25rem]">
            <Image
              src={VISIT_IMG}
              alt={content.imageAlt}
              fill
              sizes="(min-width: 1024px) 580px, 92vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(43,29,18,0.5) 0%, rgba(111,78,55,0.1) 45%, rgba(239,230,218,0.08) 100%)",
              }}
              aria-hidden
            />
          </div>
          <figure className="absolute -bottom-12 right-0 max-w-sm rounded-[1.5rem] bg-[var(--d-dark)] p-6 text-[var(--d-sand)] shadow-xl md:-bottom-10 md:right-6 md:p-7">
            <blockquote className="[font-family:var(--demo-display)] text-lg italic leading-relaxed">
              {content.quote}
            </blockquote>
            <figcaption className="mt-3 text-[0.64rem] font-bold uppercase tracking-[0.2em] text-[var(--d-sand-dim)]">
              {content.quoteAuthor}
            </figcaption>
          </figure>
        </div>

        <div>
          <SectionLabel text={content.label} />
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl tracking-tight text-[var(--d-ink)] md:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 max-w-md leading-[1.85] text-[var(--d-ink-soft)]">{content.intro}</p>

          <div className="mt-9 space-y-7">
            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--d-accent)]/12 text-[var(--d-accent)]">
                <MapPin className="h-4 w-4" strokeWidth={1.8} aria-hidden />
              </span>
              <div>
                <h3 className="text-[0.66rem] font-bold uppercase tracking-[0.24em] text-[var(--d-accent)]">
                  {content.addressLabel}
                </h3>
                {content.addressLines.map((line) => (
                  <p key={line} className="mt-1 text-sm leading-relaxed text-[var(--d-ink)]">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--d-accent)]/12 text-[var(--d-accent)]">
                <Clock className="h-4 w-4" strokeWidth={1.8} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[0.66rem] font-bold uppercase tracking-[0.24em] text-[var(--d-accent)]">
                  {content.hoursLabel}
                </h3>
                <dl className="mt-2 max-w-xs space-y-1.5">
                  {content.hours.map((row) => (
                    <div key={row.days} className="flex items-baseline gap-2 text-sm">
                      <dt className="text-[var(--d-ink)]">{row.days}</dt>
                      <span
                        className="flex-1 -translate-y-0.5 border-b border-dotted border-[var(--d-line)]"
                        aria-hidden
                      />
                      <dd className="text-[var(--d-ink-soft)]">{row.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--d-accent)]/12 text-[var(--d-accent)]">
                <Phone className="h-4 w-4" strokeWidth={1.8} aria-hidden />
              </span>
              <div>
                <h3 className="text-[0.66rem] font-bold uppercase tracking-[0.24em] text-[var(--d-accent)]">
                  {content.contactLabel}
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm">
                  <li>
                    <a
                      href={`tel:${content.phone.replace(/[^+\d]/g, "")}`}
                      className="text-[var(--d-ink)] underline-offset-4 hover:underline"
                    >
                      {content.phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-[var(--d-ink-soft)]" strokeWidth={1.8} aria-hidden />
                    <a
                      href={`mailto:${content.email}`}
                      className="text-[var(--d-ink)] underline-offset-4 hover:underline"
                    >
                      {content.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Camera className="h-3.5 w-3.5 text-[var(--d-ink-soft)]" strokeWidth={1.8} aria-hidden />
                    <a
                      href="https://instagram.com/terracafe.vm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--d-ink)] underline-offset-4 hover:underline"
                    >
                      {content.instagram}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-2 rounded-full border-2 border-[var(--d-accent)] px-6 py-3 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--d-accent)] transition-colors hover:bg-[var(--d-accent)] hover:text-[var(--d-cream)]"
          >
            {content.directionsCta}
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
