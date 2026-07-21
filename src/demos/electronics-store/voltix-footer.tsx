"use client";

import { AtSign, Globe, Share2, Zap } from "lucide-react";
import type { FooterContent } from "./content";
import { scrollToId } from "./ui";

export function VoltixFooter({ content }: { content: FooterContent }) {
  const socials = [
    { icon: AtSign, label: content.socialLabels.newsletter },
    { icon: Globe, label: content.socialLabels.site },
    { icon: Share2, label: content.socialLabels.share },
  ];

  return (
    <footer id="footer" className="border-t border-[var(--d-line)] bg-[#060A15] px-5 pb-16 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div>
            <p className="flex items-center gap-2 [font-family:var(--demo-display)] text-xl font-bold uppercase tracking-[0.14em] text-[var(--d-ink)]">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--d-accent)] text-[#04101C]">
                <Zap className="h-4 w-4" strokeWidth={2.4} aria-hidden />
              </span>
              Volt<span className="text-[var(--d-accent)]">ix</span>
            </p>
            <p className="mt-4 max-w-xs text-[0.8rem] leading-[1.8] text-[var(--d-ink-dim)]">
              {content.blurb}
            </p>
            <p className="mt-5 font-mono text-[0.66rem] tracking-[0.08em] text-[var(--d-ink-dim)]">
              {content.address}
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {socials.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink-dim)] transition-colors hover:border-[var(--d-accent)]/60 hover:text-[var(--d-accent)]"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                </button>
              ))}
            </div>
          </div>

          {content.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-[var(--d-accent)]">
                {column.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId(link.href.slice(1));
                      }}
                      className="text-[0.8rem] text-[var(--d-ink-dim)] transition-colors hover:text-[var(--d-ink)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 border-t border-[var(--d-line)] pt-7">
          <p className="text-center font-mono text-[0.64rem] leading-relaxed tracking-[0.06em] text-[var(--d-ink-dim)]">
            {content.legal}
          </p>
        </div>
      </div>
    </footer>
  );
}
