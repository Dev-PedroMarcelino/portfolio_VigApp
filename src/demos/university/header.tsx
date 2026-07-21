"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { HeaderContent } from "./content";
import { Crest, scrollToId } from "./ui";

export function Header({ content }: { content: HeaderContent }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[var(--d-line)] bg-[var(--d-bg)]/94 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-3"
          aria-label="Northgate"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--d-crimson)] text-[var(--d-parchment)] shadow-[0_6px_18px_-8px_rgba(122,31,43,0.8)] transition-transform group-hover:-translate-y-0.5">
            <Crest className="h-6 w-6" stroke="var(--d-parchment)" accent="var(--d-gold)" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="[font-family:var(--demo-display)] text-xl font-bold tracking-[0.04em] text-[var(--d-ink)]">
              Northgate
            </span>
            <span className="mt-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.32em] text-[var(--d-crimson)]">
              Est. MDCCCXLVII
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-8 lg:flex">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                go(item.href);
              }}
              className="relative text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-[var(--d-ink-soft)] transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-[var(--d-crimson)] after:transition-all after:duration-300 hover:text-[var(--d-crimson)] hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href="#visit"
            onClick={(e) => {
              e.preventDefault();
              go("#visit");
            }}
            className="hidden text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-crimson)] xl:inline-block"
          >
            {content.visit}
          </a>
          <a
            href="#admissions"
            onClick={(e) => {
              e.preventDefault();
              go("#admissions");
            }}
            className="hidden rounded-full bg-[var(--d-crimson)] px-5 py-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-[var(--d-parchment)] shadow-[0_10px_24px_-12px_rgba(122,31,43,0.9)] transition-transform hover:-translate-y-0.5 sm:inline-block"
          >
            {content.apply}
          </a>
          <button
            type="button"
            aria-label={open ? content.closeMenu : content.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink)] lg:hidden"
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
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-[var(--d-line)] bg-[var(--d-bg)]/97 backdrop-blur-md lg:hidden"
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
                  className="rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--d-ink-soft)] transition-colors hover:bg-[var(--d-crimson-soft)] hover:text-[var(--d-crimson)]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#admissions"
                onClick={(e) => {
                  e.preventDefault();
                  go("#admissions");
                }}
                className="mt-2 rounded-full bg-[var(--d-crimson)] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.12em] text-[var(--d-parchment)]"
              >
                {content.apply}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
