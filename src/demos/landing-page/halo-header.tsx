"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { NavContent } from "./content";

export function HaloHeader({ content }: { content: NavContent }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion() ?? false;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[8000] flex justify-center px-4 pt-4">
      <div
        className={`flex w-full max-w-6xl items-center justify-between gap-4 rounded-full border px-4 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "border-[var(--d-line)] bg-[#0E0E12]/80 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <a
          href="#top"
          className="flex items-center gap-2 [font-family:var(--demo-display)] text-lg font-semibold tracking-tight text-[var(--d-ink)]"
        >
          <span
            className="grid h-6 w-6 place-items-center rounded-full border-[3px] border-[var(--d-accent)]"
            aria-hidden
          >
            <span className="h-1 w-1 rounded-full bg-[var(--d-accent)]" />
          </span>
          HALO
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="HALO">
          {content.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-1.5 text-sm text-[var(--d-ink-dim)] transition-colors hover:bg-white/[0.06] hover:text-[var(--d-ink)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#pricing"
            className="hidden rounded-full bg-[var(--d-accent)] px-5 py-2 text-sm font-semibold text-[#08130F] transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            {content.cta}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? content.menuClose : content.menuOpen}
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-full border border-[var(--d-line)] text-[var(--d-ink)] md:hidden"
          >
            {open ? <X className="h-4 w-4" strokeWidth={2} /> : <Menu className="h-4 w-4" strokeWidth={2} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={reduce ? undefined : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            aria-label="HALO"
            className="absolute inset-x-4 top-[4.5rem] rounded-3xl border border-[var(--d-line)] bg-[#0E0E12]/95 p-3 backdrop-blur-xl md:hidden"
          >
            {content.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm text-[var(--d-ink-dim)] transition-colors hover:bg-white/[0.06] hover:text-[var(--d-ink)]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-2xl bg-[var(--d-accent)] px-4 py-3 text-center text-sm font-semibold text-[#08130F]"
            >
              {content.cta}
            </a>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
