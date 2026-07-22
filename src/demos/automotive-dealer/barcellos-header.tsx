"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { MessageCircle, Menu, X } from "lucide-react";
import type { BarcellosContent } from "./content";
import { waLink } from "./content";
import { EASE, FOCUS, scrollToId } from "./ui";

export function BarcellosHeader({ content }: { content: BarcellosContent["header"] }) {
  const reduced = useReducedMotion() ?? false;
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
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ${
        scrolled || open
          ? "border-b border-[var(--d-line)] bg-[#0A0B0E]/85 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:h-[4.5rem]">
        {/* Wordmark */}
        <button
          type="button"
          onClick={() => scrollToId("top")}
          aria-label="Barcellos Veículos — voltar ao topo"
          className={`group flex items-baseline gap-1.5 ${FOCUS}`}
        >
          <span className="text-[1.05rem] font-semibold uppercase tracking-[0.22em] text-[var(--d-ink)] [font-family:var(--demo-display)]">
            Barcellos
          </span>
          <span className="text-[0.8rem] lowercase tracking-[0.08em] text-[var(--d-gold)] [font-family:var(--demo-mono)]">
            veículos
          </span>
        </button>

        {/* Desktop nav */}
        <nav aria-label="Seções" className="hidden items-center gap-1 lg:flex">
          {content.nav.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => go(link.href)}
              className={`rounded-full px-3.5 py-2 text-[0.82rem] text-[var(--d-ink-soft)] transition-colors hover:bg-[var(--d-panel)] hover:text-[var(--d-ink)] ${FOCUS}`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={waLink(content.whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden items-center gap-2 rounded-full bg-[var(--d-gold)] px-4 py-2 text-[0.82rem] font-semibold text-[#141008] shadow-[0_0_24px_rgba(217,164,65,0.28)] transition-transform hover:scale-[1.04] sm:flex ${FOCUS}`}
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2} />
            {content.cta}
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="barcellos-mobile-nav"
            aria-label={open ? content.menuClose : content.menuOpen}
            className={`grid h-10 w-10 place-items-center rounded-full border border-[var(--d-line)] text-[var(--d-ink)] transition-colors hover:border-[var(--d-gold)]/60 lg:hidden ${FOCUS}`}
          >
            {open ? <X className="h-4.5 w-4.5" strokeWidth={1.8} /> : <Menu className="h-4.5 w-4.5" strokeWidth={1.8} />}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="barcellos-mobile-nav"
            aria-label="Seções"
            initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden border-t border-[var(--d-line)] bg-[#0A0B0E]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
              {content.nav.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => go(link.href)}
                  className={`rounded-xl px-4 py-3 text-left text-[0.95rem] text-[var(--d-ink)] transition-colors hover:bg-[var(--d-panel)] ${FOCUS}`}
                >
                  {link.label}
                </button>
              ))}
              <a
                href={waLink(content.whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-2 flex items-center justify-center gap-2 rounded-xl bg-[var(--d-gold)] px-4 py-3 text-[0.9rem] font-semibold text-[#141008] ${FOCUS}`}
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2} />
                {content.cta}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
