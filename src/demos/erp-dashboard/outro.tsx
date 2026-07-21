"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { OutroContent } from "./content";

export function Outro({ content }: { content: OutroContent }) {
  return (
    <section className="relative overflow-hidden border-t border-[var(--d-line)] px-4 py-16 sm:px-6 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(20,184,166,0.22), rgba(20,184,166,0.05) 55%, transparent 75%)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] bg-[var(--d-panel)] px-3.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[var(--d-accent)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-accent)]" aria-hidden />
            {content.eyebrow}
          </p>
          <h2 className="mt-5 max-w-xl [font-family:var(--demo-display)] text-3xl font-semibold leading-tight tracking-tight text-[var(--d-ink)] sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]">
            {content.body}
          </p>

          <ul className="mt-6 flex flex-col gap-3">
            {content.bullets.map((b) => (
              <li key={b.title} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--d-accent)]" strokeWidth={1.8} />
                <p className="text-sm text-[var(--d-ink-soft)]">
                  <span className="font-semibold text-[var(--d-ink)]">{b.title}.</span> {b.text}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#top"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--d-accent)] px-5 py-3 text-sm font-semibold text-[var(--d-accent-ink)] transition-transform hover:scale-[1.03]"
            >
              {content.ctaPrimary}
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </a>
            <a
              href="#top"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--d-line-strong)] px-5 py-3 text-sm font-medium text-[var(--d-ink)] transition-colors hover:bg-[var(--d-panel)]"
            >
              {content.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[var(--d-line)]">
          <Image
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=80"
            alt={content.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(155deg, rgba(11,17,32,0.35) 0%, rgba(11,17,32,0.55) 55%, rgba(13,148,136,0.4) 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-overlay"
            style={{ background: "radial-gradient(circle at 30% 20%, rgba(20,184,166,0.35), transparent 60%)" }}
          />
        </div>
      </div>
    </section>
  );
}
