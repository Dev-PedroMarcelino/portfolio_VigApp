"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { NavContent } from "./content";
import { scrollToId } from "./ui";

function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <span
        className="relative h-6 w-6 shrink-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 30%, #C4B5FD 0%, #8B5CF6 42%, #4C1D95 78%, #1E1B4B 100%)",
          boxShadow: "0 0 18px rgba(139,92,246,0.65)",
        }}
        aria-hidden
      >
        <span className="absolute inset-0 rounded-full border border-white/20" />
      </span>
      <span className="[font-family:var(--demo-display)] text-[1.05rem] font-semibold tracking-tight text-[var(--d-ink)]">
        Nebula<span className="ml-1 font-normal text-[var(--d-ink-dim)]">Labs</span>
      </span>
    </span>
  );
}

export function NebulaHeader({ content }: { content: NavContent }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion() ?? false;

  function go(href: string) {
    setOpen(false);
    scrollToId(href.slice(1));
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--d-line)]/70 bg-[#0B0B12]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            go("#top");
          }}
          aria-label="Nebula Labs"
        >
          <Wordmark />
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {content.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                go(link.href);
              }}
              className="text-[0.82rem] font-medium text-[var(--d-ink-dim)] transition-colors hover:text-[var(--d-ink)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#waitlist"
            onClick={(e) => {
              e.preventDefault();
              go("#waitlist");
            }}
            className="hidden rounded-full border border-[var(--d-accent)]/50 bg-[var(--d-accent)]/15 px-4 py-2 text-[0.78rem] font-semibold text-[var(--d-accent-soft)] shadow-[0_0_24px_-6px_rgba(139,92,246,0.7)] transition-colors hover:bg-[var(--d-accent)]/25 sm:inline-flex"
          >
            {content.cta}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? content.closeMenu : content.openMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--d-line-bright)] text-[var(--d-ink)] md:hidden"
          >
            {open ? (
              <X className="h-5 w-5" strokeWidth={1.8} aria-hidden />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.8} aria-hidden />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            key="mobile-nav"
            initial={reduce ? undefined : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[var(--d-line)] bg-[#0D0D16] md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {content.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(link.href);
                  }}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--d-ink-dim)] transition-colors hover:bg-[var(--d-panel)] hover:text-[var(--d-ink)]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#waitlist"
                onClick={(e) => {
                  e.preventDefault();
                  go("#waitlist");
                }}
                className="mt-2 rounded-xl bg-[var(--d-accent)] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                {content.cta}
              </a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
