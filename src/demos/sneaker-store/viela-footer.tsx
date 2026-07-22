"use client";

import { AtSign, Camera, Share2, Mail } from "lucide-react";
import type { FooterContent } from "./content";
import { scrollToId } from "./ui";

export function VielaFooter({ content }: { content: FooterContent }) {
  const go = (href: string) => {
    if (href.startsWith("#")) scrollToId(href.slice(1));
  };

  return (
    <footer className="relative overflow-hidden border-t border-[var(--d-line)] bg-[var(--d-bg-2)] px-5 pb-14 pt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 h-[24rem] w-[36rem] -translate-x-1/2 rounded-full opacity-30 blur-[130px]"
        style={{ background: "radial-gradient(circle, var(--d-accent) 0%, transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="[font-family:var(--demo-display)] text-3xl tracking-tight text-[var(--d-ink)]">
                VIELA
              </span>
              <span className="h-2 w-2 rounded-full bg-[var(--d-accent)] shadow-[0_0_12px_var(--d-accent)]" />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--d-ink-soft)]">
              {content.tagline}
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              <a
                href={`mailto:${content.email}`}
                aria-label={content.email}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink-soft)] transition-colors hover:border-[var(--d-accent)] hover:text-[var(--d-accent)]"
              >
                <Mail className="h-4 w-4" strokeWidth={1.9} />
              </a>
              <span
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink-soft)]"
              >
                <AtSign className="h-4 w-4" strokeWidth={1.9} />
              </span>
              <span
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink-soft)]"
              >
                <Camera className="h-4 w-4" strokeWidth={1.9} />
              </span>
              <span
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink-soft)]"
              >
                <Share2 className="h-4 w-4" strokeWidth={1.9} />
              </span>
            </div>
          </div>

          {content.groups.map((group) => (
            <div key={group.title}>
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.24em] text-[var(--d-mute)] [font-family:var(--demo-body)]">
                {group.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link, i) => (
                  <li key={`${link.label}-${i}`}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        go(link.href);
                      }}
                      className="text-sm text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-accent)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-[var(--d-line)] pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-[0.72rem] text-[var(--d-mute)] [font-family:var(--demo-body)]">
              <p>{content.followLabel} · {content.handle}</p>
              {content.addressLines.map((line) => (
                <p key={line} className="mt-0.5">
                  {line}
                </p>
              ))}
            </div>
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--d-accent)] [font-family:var(--demo-body)]">
              {content.credit}
            </p>
          </div>
          <p className="mt-5 max-w-2xl text-[0.62rem] leading-relaxed text-[var(--d-mute)]">
            {content.fine}
          </p>
        </div>
      </div>
    </footer>
  );
}
