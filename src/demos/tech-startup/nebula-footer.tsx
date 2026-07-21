"use client";

import { useReducedMotion } from "framer-motion";
import { AtSign, Globe, MessageCircle } from "lucide-react";
import type { FooterContent } from "./content";
import { scrollToId } from "./ui";

const SOCIAL_ICONS = [Globe, AtSign, MessageCircle];

export function NebulaFooter({ content }: { content: FooterContent }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <footer className="border-t border-[var(--d-line)] bg-[#08080E] px-5 pb-28 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-xs">
            <p className="flex items-center gap-2.5">
              <span
                className="h-6 w-6 shrink-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 32% 30%, #C4B5FD 0%, #8B5CF6 42%, #4C1D95 78%, #1E1B4B 100%)",
                  boxShadow: "0 0 18px rgba(139,92,246,0.5)",
                }}
                aria-hidden
              />
              <span className="[font-family:var(--demo-display)] text-lg font-semibold tracking-tight text-[var(--d-ink)]">
                Nebula<span className="ml-1 font-normal text-[var(--d-ink-dim)]">Labs</span>
              </span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--d-ink-dim)]">{content.tagline}</p>
            <div className="mt-6 flex gap-2.5">
              {content.social.map((item, i) => {
                const Icon = SOCIAL_ICONS[i % SOCIAL_ICONS.length];
                return (
                  <a
                    key={item.label}
                    href="#top"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId("top");
                    }}
                    aria-label={item.label}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--d-line-bright)] text-[var(--d-ink-dim)] transition-colors hover:border-[var(--d-accent)]/60 hover:text-[var(--d-ink)]"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.7} aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {content.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h3 className="text-[0.62rem] font-bold uppercase tracking-[0.26em] text-[var(--d-ink-faint)]">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToId(link.href.slice(1));
                        }}
                        className="text-sm text-[var(--d-ink-dim)] transition-colors hover:text-[var(--d-ink)]"
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

        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--d-line)] pt-7 text-xs text-[var(--d-ink-faint)] sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span
                className={`absolute inline-flex h-full w-full rounded-full bg-[var(--d-green)] opacity-60 ${
                  reduce ? "" : "animate-ping"
                }`}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--d-green)]" />
            </span>
            {content.status}
          </p>
          <p>{content.legal}</p>
        </div>
        <p className="mt-4 text-xs text-[var(--d-ink-faint)]">{content.copyright}</p>
      </div>
    </footer>
  );
}
