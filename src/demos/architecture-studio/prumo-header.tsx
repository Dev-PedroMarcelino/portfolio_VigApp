"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { Menu, X } from "lucide-react";
import type { PrumoContent } from "./content";

/**
 * Hairline header: PRUMO wordmark, anchor nav and the quote CTA.
 * Transparent over the hero video, bone-glass after the first scroll.
 */
export function PrumoHeader({ content }: { content: PrumoContent["header"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const inkOnHero = !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[8600] transition-colors duration-500 ${
        scrolled || open
          ? "border-b border-[var(--d-line)] bg-[rgba(245,242,236,0.9)] backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between px-5 sm:h-20 sm:px-8">
        <a
          href="#top"
          aria-label="Prumo Arquitetura"
          className={`flex items-baseline gap-2 leading-none transition-colors duration-500 ${
            inkOnHero ? "text-white" : "text-[var(--d-ink)]"
          }`}
        >
          <span className="[font-family:var(--demo-display)] text-2xl tracking-[0.14em]">
            PRUMO
          </span>
          <span
            className={`hidden [font-family:var(--demo-mono)] text-[10px] uppercase tracking-[0.3em] sm:inline ${
              inkOnHero ? "text-white/60" : "text-[var(--d-ink-faint)]"
            }`}
          >
            Arquitetura
          </span>
        </a>

        <nav aria-label={content.navAria} className="hidden items-center gap-8 lg:flex">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`[font-family:var(--demo-body)] text-[11px] uppercase tracking-[0.24em] transition-colors duration-300 ${
                inkOnHero
                  ? "text-white/75 hover:text-white"
                  : "text-[var(--d-ink-soft)] hover:text-[var(--d-ink)]"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contato"
            className={`hidden px-5 py-2.5 [font-family:var(--demo-body)] text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 sm:inline-block ${
              inkOnHero
                ? "border border-white/60 text-white hover:bg-white hover:text-[var(--d-ink)]"
                : "border border-[var(--d-ink)] text-[var(--d-ink)] hover:bg-[var(--d-ink)] hover:text-[var(--d-bg)]"
            }`}
          >
            {content.cta}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? content.closeMenu : content.openMenu}
            className={`grid h-10 w-10 place-items-center transition-colors duration-300 lg:hidden ${
              inkOnHero ? "text-white" : "text-[var(--d-ink)]"
            }`}
          >
            {open ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label={content.navAria}
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="border-t border-[var(--d-line)] bg-[var(--d-bg)] lg:hidden"
          >
            <div className="mx-auto flex max-w-[88rem] flex-col px-5 py-6 sm:px-8">
              {content.nav.map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-baseline justify-between py-4 [font-family:var(--demo-display)] text-2xl text-[var(--d-ink)] ${
                    i > 0 ? "border-t border-[var(--d-line)]" : ""
                  }`}
                >
                  {item.label}
                  <span className="[font-family:var(--demo-mono)] text-[10px] tracking-[0.3em] text-[var(--d-ink-faint)]">
                    0{i + 1}
                  </span>
                </a>
              ))}
              <a
                href="#contato"
                onClick={() => setOpen(false)}
                className="mt-6 border border-[var(--d-ink)] px-5 py-3.5 text-center [font-family:var(--demo-body)] text-[11px] uppercase tracking-[0.22em] text-[var(--d-ink)]"
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
