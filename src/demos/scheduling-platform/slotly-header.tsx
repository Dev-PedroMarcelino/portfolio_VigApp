"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck2, Menu, X } from "lucide-react";
import type { HeaderContent } from "./content";
import { scrollToId } from "./ui";

export function SlotlyHeader({ content }: { content: HeaderContent }) {
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
          ? "border-b border-[var(--d-line)] bg-[#F0FDFA]/90 shadow-[0_10px_34px_-24px_rgba(4,47,46,0.45)] backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--d-accent)] text-white shadow-[0_6px_18px_-6px_rgba(13,148,136,0.55)]">
            <CalendarCheck2 className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
          </span>
          <span className="[font-family:var(--demo-display)] text-xl font-bold tracking-tight text-[var(--d-ink)]">
            Slotly<span className="text-[var(--d-accent)]">.</span>
          </span>
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
              className="text-[0.82rem] font-semibold text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-accent-deep)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#book"
            onClick={(e) => {
              e.preventDefault();
              go("#book");
            }}
            className="hidden rounded-full bg-[var(--d-accent)] px-5 py-2.5 text-[0.8rem] font-bold text-white transition-all hover:scale-[1.04] hover:bg-[var(--d-accent-deep)] sm:inline-block"
          >
            {content.cta}
          </a>
          <button
            type="button"
            aria-label={open ? content.closeMenu : content.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--d-line)] bg-[var(--d-card)] text-[var(--d-ink)] md:hidden"
          >
            {open ? (
              <X className="h-4 w-4" strokeWidth={2.2} />
            ) : (
              <Menu className="h-4 w-4" strokeWidth={2.2} />
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
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden border-t border-[var(--d-line)] bg-[#F0FDFA]/97 backdrop-blur-md md:hidden"
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
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-[var(--d-ink-soft)] transition-colors hover:bg-[var(--d-mint)] hover:text-[var(--d-ink)]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#book"
                onClick={(e) => {
                  e.preventDefault();
                  go("#book");
                }}
                className="mt-2 rounded-full bg-[var(--d-accent)] px-5 py-3 text-center text-[0.8rem] font-bold text-white"
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
