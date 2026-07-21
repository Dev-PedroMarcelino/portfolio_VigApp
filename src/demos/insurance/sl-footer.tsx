"use client";

import { AtSign, Globe, MessageCircle } from "lucide-react";
import type { FooterContent } from "./content";
import { ShieldMark } from "./ui";

export function SlFooter({ content }: { content: FooterContent }) {
  return (
    <footer className="bg-[var(--d-navy)] px-5 pb-12 pt-16 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="flex items-center gap-2 [font-family:var(--demo-display)] text-2xl font-extrabold tracking-tight">
              <ShieldMark className="h-8 w-8 text-[var(--d-gold)]" />
              Shield<span className="text-[var(--d-gold)]">line</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-[1.85] text-[var(--d-cloud)]">
              {content.tagline}
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {[
                { icon: Globe, label: content.socialLabels.web },
                { icon: AtSign, label: content.socialLabels.email },
                { icon: MessageCircle, label: content.socialLabels.chat },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[var(--d-cloud)] transition-colors hover:border-[var(--d-gold)] hover:text-[var(--d-gold)]"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {content.columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-[0.66rem] font-bold uppercase tracking-[0.24em] text-[var(--d-gold)]">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <button
                        type="button"
                        className="text-left text-[0.82rem] text-[var(--d-cloud)] transition-colors hover:text-white"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="text-[0.72rem] text-[var(--d-cloud)]/80">&copy; {content.legal}</p>
          <p className="mt-2 max-w-3xl text-[0.66rem] leading-relaxed text-[var(--d-cloud)]/55">
            {content.regNote}
          </p>
        </div>
      </div>
    </footer>
  );
}
