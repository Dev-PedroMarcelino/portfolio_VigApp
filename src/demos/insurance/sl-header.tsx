"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { HeaderContent } from "./content";
import { ShieldMark, scrollToId } from "./ui";

export function SlHeader({ content }: { content: HeaderContent }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
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
          ? "border-b border-[var(--d-line)] bg-[#EEF2FF]/90 shadow-[0_10px_34px_-22px_rgba(16,23,54,0.5)] backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 [font-family:var(--demo-display)] text-xl font-extrabold tracking-tight text-[var(--d-ink)]"
        >
          <ShieldMark className="h-7 w-7 text-[var(--d-accent)]" />
          Shield<span className="text-[var(--d-accent)]">line</span>
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
              className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-accent)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#quote"
            onClick={(e) => {
              e.preventDefault();
              go("#quote");
            }}
            className="hidden rounded-full bg-[var(--d-accent)] px-5 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white shadow-[0_10px_24px_-12px_rgba(29,78,216,0.7)] transition-transform hover:scale-[1.04] sm:inline-block"
          >
            {content.cta}
          </a>
          <button
            type="button"
            aria-label={open ? content.closeMenu : content.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--d-line)] bg-white/70 text-[var(--d-ink)] md:hidden"
          >
            {open ? (
              <X className="h-4 w-4" strokeWidth={2} />
            ) : (
              <Menu className="h-4 w-4" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="overflow-hidden border-t border-[var(--d-line)] bg-[#EEF2FF]/97 backdrop-blur-md md:hidden"
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
                  className="rounded-xl px-3 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[var(--d-ink-soft)] transition-colors hover:bg-white hover:text-[var(--d-accent)]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#quote"
                onClick={(e) => {
                  e.preventDefault();
                  go("#quote");
                }}
                className="mt-2 rounded-full bg-[var(--d-accent)] px-5 py-3 text-center text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white"
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
