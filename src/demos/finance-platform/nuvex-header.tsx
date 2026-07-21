"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import type { NuvexContent } from "./content";
import { scrollToId } from "./ui";

export function NuvexHeader({ content }: { content: NuvexContent["header"] }) {
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
      className={`fixed inset-x-0 top-0 z-[500] transition-colors duration-500 ${
        scrolled
          ? "border-b border-[var(--d-line)] bg-[#05070C]/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <button
          type="button"
          onClick={() => go("top")}
          className="flex items-center gap-2.5 outline-none"
          aria-label="Nuvex"
        >
          <span className="relative flex h-7 w-7 items-center justify-center rounded-[9px] bg-gradient-to-br from-[var(--d-accent-soft)] to-[var(--d-accent-deep)] shadow-[0_0_18px_rgba(16,185,129,0.5)]">
            <span className="h-2.5 w-2.5 rotate-45 rounded-[3px] bg-[#05070C]" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)]">
            Nuvex
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {content.nav.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => go(item.href)}
              className="rounded-full px-3.5 py-2 text-[0.82rem] text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-ink)]"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go("pricing")}
            className="hidden rounded-full px-4 py-2 text-[0.82rem] text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-ink)] sm:block"
          >
            {content.signIn}
          </button>
          <button
            type="button"
            onClick={() => go("cta")}
            className="group hidden items-center gap-1.5 rounded-full bg-[var(--d-accent)] px-4 py-2 text-[0.82rem] font-medium text-[#05070C] shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-transform hover:scale-[1.03] sm:flex"
          >
            {content.cta}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.2} />
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink)] md:hidden"
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
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[var(--d-line)] bg-[#05070C]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {content.nav.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => go(item.href)}
                  className="rounded-xl px-3 py-3 text-left text-sm text-[var(--d-ink-soft)] transition-colors hover:bg-[var(--d-panel)] hover:text-[var(--d-ink)]"
                >
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => go("cta")}
                className="mt-2 rounded-xl bg-[var(--d-accent)] px-3 py-3 text-center text-sm font-medium text-[#05070C]"
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
