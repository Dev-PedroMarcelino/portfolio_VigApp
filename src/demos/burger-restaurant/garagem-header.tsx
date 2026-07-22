"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { Menu, MessageCircle, X, Zap } from "lucide-react";
import type { GaragemContent } from "./content";
import { WHATSAPP_URL } from "./content";
import { FOCUS_RING, scrollToId } from "./ui";

/** Sticky gig-poster header: bolt wordmark, anchor nav, WhatsApp CTA. */
export function GaragemHeader({ content }: { content: GaragemContent["header"] }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion() ?? false;

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[80] border-b-2 border-[var(--d-line)] bg-[color:rgba(14,10,8,0.88)] backdrop-blur-md">
      {/* Hazard tape edge */}
      <div
        aria-hidden
        className="h-1 w-full opacity-90"
        style={{
          background:
            "repeating-linear-gradient(-45deg, var(--d-yellow) 0 12px, #0E0A08 12px 24px)",
        }}
      />

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <button
          type="button"
          onClick={() => go("topo")}
          aria-label="Garagem Burger — topo"
          className={`group flex items-center gap-2 ${FOCUS_RING}`}
        >
          <span className="grid h-9 w-9 place-items-center bg-[var(--d-red)] shadow-[3px_3px_0_var(--d-yellow)] transition-transform duration-300 group-hover:-rotate-6">
            <Zap className="h-5 w-5 text-[var(--d-bg)]" strokeWidth={2.6} fill="var(--d-bg)" />
          </span>
          <span className="text-2xl uppercase leading-none tracking-wide text-[var(--d-ink)] [font-family:var(--demo-display)]">
            Garagem
          </span>
        </button>

        <nav aria-label={content.navAria} className="hidden items-center gap-1 lg:flex">
          {content.nav.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => go(item.href)}
              className={`relative px-3.5 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-ink)] ${FOCUS_RING} after:absolute after:bottom-0.5 after:left-3.5 after:right-3.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-[var(--d-red)] after:transition-transform after:duration-300 hover:after:scale-x-100`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden items-center gap-2 bg-[var(--d-red)] px-4 py-2.5 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[var(--d-bg)] shadow-[3px_3px_0_var(--d-yellow)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[4px_5px_0_var(--d-yellow)] active:translate-y-0 sm:flex ${FOCUS_RING}`}
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2.4} />
            {content.cta}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? content.closeMenu : content.openMenu}
            className={`grid h-10 w-10 place-items-center border-2 border-[var(--d-line)] text-[var(--d-ink)] transition-colors hover:border-[var(--d-red)] lg:hidden ${FOCUS_RING}`}
          >
            {open ? <X className="h-5 w-5" strokeWidth={2.4} /> : <Menu className="h-5 w-5" strokeWidth={2.4} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label={content.navAria}
            initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t-2 border-[var(--d-line)] bg-[var(--d-bg)] lg:hidden"
          >
            <div className="flex flex-col px-5 py-3">
              {content.nav.map((item, i) => (
                <motion.button
                  key={item.href}
                  type="button"
                  onClick={() => go(item.href)}
                  initial={reduced ? false : { opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: reduced ? 0 : 0.05 * i }}
                  className={`border-b border-[var(--d-line)] py-3.5 text-left text-xl uppercase tracking-wide text-[var(--d-ink)] [font-family:var(--demo-display)] last:border-b-0 ${FOCUS_RING}`}
                >
                  <span aria-hidden className="mr-3 text-[var(--d-red)]">/</span>
                  {item.label}
                </motion.button>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 flex items-center justify-center gap-2 bg-[var(--d-red)] px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[var(--d-bg)] shadow-[3px_3px_0_var(--d-yellow)] ${FOCUS_RING}`}
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2.4} />
                {content.cta}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
