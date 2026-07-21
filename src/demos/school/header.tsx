"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Sparkles, X } from "lucide-react";
import type { HeaderContent } from "./content";
import { scrollToId } from "./ui";

export function Header({ content }: { content: HeaderContent }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
          ? "border-b border-[var(--d-line)] bg-[var(--d-bg)]/90 shadow-[0_10px_40px_-24px_rgba(37,99,235,0.5)] backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2"
          aria-label="Brightpath"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--d-accent)] text-white shadow-[0_6px_16px_-4px_rgba(37,99,235,0.6)] transition-transform group-hover:-rotate-6">
            <Sparkles className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <span className="[font-family:var(--demo-display)] text-2xl font-extrabold leading-none tracking-tight text-[var(--d-ink)]">
            Brightpath
          </span>
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
              className="text-sm font-bold text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-accent)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href="#enroll"
            onClick={(e) => {
              e.preventDefault();
              go("#enroll");
            }}
            className="hidden rounded-full bg-[var(--d-sun)] px-5 py-2.5 text-sm font-extrabold text-[var(--d-ink)] shadow-[0_8px_20px_-8px_rgba(255,197,61,0.9)] transition-transform hover:scale-[1.04] sm:inline-block"
          >
            {content.cta}
          </a>
          <button
            type="button"
            aria-label={open ? content.closeMenu : content.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-[var(--d-line)] text-[var(--d-ink)] lg:hidden"
          >
            {open ? <X className="h-5 w-5" strokeWidth={2.4} /> : <Menu className="h-5 w-5" strokeWidth={2.4} />}
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
                  className="rounded-2xl px-4 py-3 text-base font-bold text-[var(--d-ink-soft)] transition-colors hover:bg-[var(--d-accent-soft)] hover:text-[var(--d-accent-deep)]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#enroll"
                onClick={(e) => {
                  e.preventDefault();
                  go("#enroll");
                }}
                className="mt-2 rounded-full bg-[var(--d-sun)] px-5 py-3 text-center text-sm font-extrabold text-[var(--d-ink)]"
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
