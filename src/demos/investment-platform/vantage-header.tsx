"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { VantageContent } from "./content";
import { scrollToId } from "./ui";

export function VantageHeader({ content }: { content: VantageContent["header"] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    scrollToId(href.slice(1));
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--d-line)] bg-[#0B1221]/90 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.8)] backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-baseline gap-2 [font-family:var(--demo-display)] text-xl leading-none tracking-tight text-[var(--d-ink)]"
        >
          Vantage
          <span className="italic text-[var(--d-gold)]">Capital</span>
        </button>

        <nav className="hidden items-center gap-7 lg:flex">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                go(item.href);
              }}
              className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-gold)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#onboarding"
            onClick={(e) => {
              e.preventDefault();
              go("#onboarding");
            }}
            className="hidden rounded-full border border-[var(--d-gold)]/60 px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-gold)] transition-colors hover:bg-[var(--d-gold)] hover:text-[#0B1221] sm:inline-block"
          >
            {content.cta}
          </a>
          <button
            type="button"
            aria-label={open ? content.closeMenu : content.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink)] lg:hidden"
          >
            {open ? <X className="h-4 w-4" strokeWidth={2} /> : <Menu className="h-4 w-4" strokeWidth={2} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-[var(--d-line)] bg-[#0B1221]/97 backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {content.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.href);
                  }}
                  className="rounded-xl px-3 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--d-ink-soft)] transition-colors hover:bg-[var(--d-panel)] hover:text-[var(--d-gold)]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#onboarding"
                onClick={(e) => {
                  e.preventDefault();
                  go("#onboarding");
                }}
                className="mt-2 rounded-full bg-[var(--d-gold)] px-5 py-3 text-center text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#0B1221]"
              >
                {content.cta}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
