"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { NavContent } from "./content";
import { LoudButton, scrollToId } from "./ui";

export function LoudHeader({ content }: { content: NavContent }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion() ?? false;

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className="sticky top-0 z-50 border-b-2 border-[var(--d-ink)] bg-[var(--d-bg)]">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3.5 md:px-8">
        <button
          type="button"
          onClick={() => go("top")}
          className="[font-family:var(--demo-display)] text-lg leading-none tracking-tight text-[var(--d-ink)] transition-colors hover:text-[var(--d-accent)] md:text-xl"
        >
          LOUD<span className="text-[var(--d-accent)]">/</span>HAUS
        </button>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {content.links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => go(link.id)}
              className="group relative text-xs font-bold uppercase tracking-[0.16em] text-[var(--d-ink)]"
            >
              <span className="transition-opacity group-hover:opacity-40">{link.label}</span>
              <span className="absolute left-0 top-1/2 h-[2px] w-0 -translate-y-1/2 bg-[var(--d-accent)] transition-all duration-200 group-hover:w-full" />
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <LoudButton onClick={() => go("contact")} className="px-5 py-2.5 text-xs">
            {content.cta}
          </LoudButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center border-2 border-[var(--d-ink)] bg-[var(--d-bg)] text-[var(--d-ink)] md:hidden"
          aria-label={open ? content.menuClose : content.menuOpen}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" strokeWidth={2.5} /> : <Menu className="h-5 w-5" strokeWidth={2.5} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            aria-label="Mobile"
            initial={reduce ? undefined : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden border-t-2 border-[var(--d-ink)] bg-[var(--d-bg)] md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {content.links.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => go(link.id)}
                  className="border-b border-[var(--d-ink)]/15 py-3 text-left [font-family:var(--demo-display)] text-2xl tracking-tight text-[var(--d-ink)]"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4">
                <LoudButton onClick={() => go("contact")} className="w-full">
                  {content.cta}
                </LoudButton>
              </div>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
