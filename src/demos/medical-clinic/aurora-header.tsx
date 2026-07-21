"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarCheck, HeartPulse, Menu, X } from "lucide-react";
import type { HeaderContent } from "./content";

export function AuroraHeader({
  content,
  onBook,
}: {
  content: HeaderContent;
  onBook: () => void;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion() ?? false;

  return (
    <header
      className="sticky top-0 z-40 border-b border-[var(--d-line)] backdrop-blur-md"
      style={{ backgroundColor: "rgba(251, 253, 252, 0.86)" }}
    >
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Aurora Health">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--d-accent)] text-[var(--d-foam)]">
            <HeartPulse className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
          </span>
          <span className="text-lg font-bold tracking-tight text-[var(--d-ink)]">
            Aurora{" "}
            <em className="[font-family:var(--demo-display)] font-medium italic text-[var(--d-accent)]">
              Health
            </em>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.83rem] font-medium text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-accent)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBook}
            className="hidden items-center gap-2 rounded-full bg-[var(--d-accent)] px-5 py-2.5 text-[0.8rem] font-semibold text-[var(--d-foam)] shadow-[0_10px_24px_-12px_rgba(29,138,126,0.7)] transition-transform hover:scale-[1.03] sm:flex"
          >
            <CalendarCheck className="h-4 w-4" strokeWidth={2} aria-hidden />
            {content.cta}
          </button>
          <button
            type="button"
            aria-label={open ? content.closeMenu : content.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink)] lg:hidden"
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
            initial={reduce ? undefined : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-[var(--d-line)] bg-[var(--d-bg)] lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {content.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--d-ink)] transition-colors hover:bg-[var(--d-mint)]"
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onBook();
                }}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[var(--d-accent)] px-5 py-3 text-sm font-semibold text-[var(--d-foam)]"
              >
                <CalendarCheck className="h-4 w-4" strokeWidth={2} aria-hidden />
                {content.cta}
              </button>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
