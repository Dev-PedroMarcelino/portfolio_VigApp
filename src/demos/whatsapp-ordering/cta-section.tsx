"use client";

import { Check, MessageCircle, ArrowRight } from "lucide-react";
import { site, whatsappUrl } from "@/lib/site";
import type { CtaContent } from "./content";
import { Eyebrow, scrollToId } from "./ui";

export function CtaSection({ content }: { content: CtaContent }) {
  const href = whatsappUrl(site.phones[0].tel, content.waMessage);

  return (
    <section id="cta" className="scroll-mt-20 px-5 py-16 sm:py-20">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-[var(--d-line)] bg-[var(--d-panel-2)] px-6 py-14 sm:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[var(--d-accent)]/20 blur-[100px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#128C7E]/20 blur-[110px]"
        />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow text={content.eyebrow} />
            <h2 className="mt-4 [font-family:var(--demo-display)] text-3xl font-extrabold leading-tight tracking-tight text-[var(--d-ink)] sm:text-4xl">
              {content.title}
            </h2>
            <p className="mt-4 max-w-xl text-[var(--d-ink-soft)]">{content.body}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--d-accent)] px-6 py-3.5 text-sm font-bold text-[#052014] transition-transform hover:scale-[1.03]"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                {content.primary}
              </a>
              <button
                type="button"
                onClick={() => scrollToId("chat")}
                className="group inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] px-6 py-3.5 text-sm font-semibold text-[var(--d-ink)] transition-colors hover:bg-[var(--d-panel)]"
              >
                {content.secondary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} aria-hidden />
              </button>
            </div>
          </div>

          <ul className="grid gap-3">
            {content.bullets.map((b) => (
              <li
                key={b}
                className="flex items-center gap-3 rounded-2xl border border-[var(--d-line)] bg-[var(--d-panel)] px-5 py-4 text-sm font-medium text-[var(--d-ink)]"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--d-accent)] text-[#052014]">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
