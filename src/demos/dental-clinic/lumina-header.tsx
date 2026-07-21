"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Menu, Sparkles, X } from "lucide-react";
import type { HeaderContent } from "./content";
import { scrollToId } from "./ui";

export function LuminaHeader({ content }: { content: HeaderContent }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    scrollToId(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--d-line)] bg-white/80 shadow-[0_12px_40px_-24px_rgba(19,74,120,0.35)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-10 lg:px-16">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 [font-family:var(--demo-display)] text-lg font-bold tracking-tight text-[var(--d-ink)]"
        >
          <span className="grid h-8 w-8 place-items-center rounded-[40%_60%_55%_45%/55%_45%_60%_40%] bg-gradient-to-br from-[var(--d-accent)] to-[var(--d-aqua)] text-white shadow-[0_8px_20px_-8px_rgba(46,124,192,0.8)]">
            <Sparkles className="h-4 w-4" strokeWidth={2.2} />
          </span>
          Lumina
          <span className="font-light text-[var(--d-accent)]">Dental</span>
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                go(item.href);
              }}
              className="text-sm font-medium text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-accent-deep)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#appointment"
            onClick={(e) => {
              e.preventDefault();
              go("#appointment");
            }}
            className="hidden items-center gap-2 rounded-full bg-[var(--d-accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgba(46,124,192,0.9)] transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            <CalendarCheck className="h-4 w-4" strokeWidth={2} />
            {content.cta}
          </a>
          <button
            type="button"
            aria-label={open ? content.closeMenu : content.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--d-line)] bg-white text-[var(--d-ink)] md:hidden"
          >
            {open ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden border-b border-[var(--d-line)] bg-white/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {content.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.href);
                  }}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--d-ink)] transition-colors hover:bg-[var(--d-bg)]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#appointment"
                onClick={(e) => {
                  e.preventDefault();
                  go("#appointment");
                }}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--d-accent)] px-5 py-3 text-sm font-semibold text-white"
              >
                <CalendarCheck className="h-4 w-4" strokeWidth={2} />
                {content.cta}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
