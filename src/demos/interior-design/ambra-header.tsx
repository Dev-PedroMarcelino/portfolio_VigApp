"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import type { AmbraContent } from "./content";

export function AmbraHeader({ content }: { content: AmbraContent["header"] }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--d-line)] bg-[var(--d-bg)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <a
          href="#top"
          className="flex items-baseline gap-2 [font-family:var(--demo-display)] text-[1.35rem] leading-none text-[var(--d-ink)] sm:text-[1.6rem]"
        >
          Studio Ambra
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--d-accent)]" />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {content.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-[13px] tracking-wide text-[var(--d-soft)] transition-colors hover:text-[var(--d-ink)]"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--d-accent)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#voices"
            aria-label={content.bookAria}
            className="hidden items-center gap-2 rounded-full bg-[var(--d-ink)] px-5 py-2.5 text-[13px] font-medium text-[var(--d-cream)] transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            {content.cta}
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? content.menuClose : content.menuOpen}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink)] lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            aria-label="Mobile"
            initial={reduce ? undefined : { height: 0, opacity: 0 }}
            animate={reduce ? undefined : { height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[var(--d-line)] bg-[var(--d-bg)] lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {content.nav.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-[15px] text-[var(--d-ink)] transition-colors hover:bg-[var(--d-cream)]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#voices"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--d-ink)] px-5 py-3 text-[14px] font-medium text-[var(--d-cream)]"
              >
                {content.cta}
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
              </a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
