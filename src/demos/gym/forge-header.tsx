"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { NavContent } from "./content";
import { scrollToId } from "./ui";

function Wordmark() {
  return (
    <span className="flex items-baseline gap-1.5">
      <span className="[font-family:var(--demo-display)] text-[1.35rem] uppercase leading-none tracking-tight text-[var(--d-ink)]">
        Forge
      </span>
      <span className="[font-family:var(--demo-display)] text-[1.35rem] uppercase leading-none tracking-tight text-[var(--d-accent)]">
        Athletic
      </span>
    </span>
  );
}

export function ForgeHeader({ content }: { content: NavContent }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion() ?? false;

  function go(href: string) {
    setOpen(false);
    scrollToId(href.slice(1));
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--d-line)] bg-[#0B0B0D]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            go("#top");
          }}
          aria-label="Forge Athletic"
        >
          <Wordmark />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {content.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                go(link.href);
              }}
              className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[var(--d-ink-dim)] transition-colors hover:text-[var(--d-ink)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#join"
            onClick={(e) => {
              e.preventDefault();
              go("#join");
            }}
            className="hidden bg-[var(--d-accent)] px-5 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#0B0B0D] transition-transform hover:-translate-y-0.5 sm:inline-flex [clip-path:polygon(8%_0,100%_0,92%_100%,0_100%)]"
          >
            {content.cta}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? content.closeMenu : content.openMenu}
            className="inline-flex h-10 w-10 items-center justify-center border border-[var(--d-line-bright)] text-[var(--d-ink)] md:hidden"
          >
            {open ? (
              <X className="h-5 w-5" strokeWidth={2} aria-hidden />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={2} aria-hidden />
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
            transition={{ duration: 0.24 }}
            className="overflow-hidden border-t border-[var(--d-line)] bg-[#0E0E11] md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {content.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(link.href);
                  }}
                  className="px-3 py-3 text-sm font-bold uppercase tracking-[0.1em] text-[var(--d-ink-dim)] transition-colors hover:text-[var(--d-ink)]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#join"
                onClick={(e) => {
                  e.preventDefault();
                  go("#join");
                }}
                className="mt-2 bg-[var(--d-accent)] px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.1em] text-[#0B0B0D]"
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
