"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import type { ZelaContent } from "./content";
import { EASE, scrollToId } from "./ui";

/** Lowercase wordmark — "zela." with the amber full stop. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={`lowercase tracking-tight [font-family:var(--demo-display)] font-semibold ${className ?? ""}`}
    >
      zela<span className="text-[var(--d-amber)]">.</span>
    </span>
  );
}

export function ZelaHeader({ content }: { content: ZelaContent["header"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
      className={`fixed inset-x-0 top-0 z-[500] transition-all duration-500 ${
        scrolled
          ? "border-b border-[var(--d-line)] bg-[#F7F3EA]/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <button
          type="button"
          onClick={() => go("top")}
          className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--d-green)]"
          aria-label="Zela"
        >
          <Wordmark className="text-[1.55rem] text-[var(--d-ink)]" />
        </button>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
          {content.nav.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => go(item.href)}
              className="rounded-full px-3.5 py-2 text-[0.84rem] text-[var(--d-ink-soft)] transition-colors hover:bg-[var(--d-green)]/8 hover:text-[var(--d-ink)]"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={() => go("cta")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="group hidden items-center gap-1.5 rounded-full bg-[var(--d-green)] px-4.5 py-2 pl-5 text-[0.84rem] font-medium text-[#FFFDF7] shadow-[0_10px_24px_-12px_rgba(22,107,74,0.6)] sm:flex"
          >
            {content.cta}
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2.2}
            />
          </motion.button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-line)] bg-[var(--d-surface)] text-[var(--d-ink)] md:hidden"
            aria-label={open ? content.closeMenu : content.openMenu}
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="overflow-hidden border-t border-[var(--d-line)] bg-[#F7F3EA]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {content.nav.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => go(item.href)}
                  className="rounded-xl px-3 py-3 text-left text-sm text-[var(--d-ink-soft)] transition-colors hover:bg-[var(--d-surface)] hover:text-[var(--d-ink)]"
                >
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => go("cta")}
                className="mt-2 rounded-xl bg-[var(--d-green)] px-3 py-3 text-center text-sm font-medium text-[#FFFDF7]"
              >
                {content.cta}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
