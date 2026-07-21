"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import type { HeaderContent } from "./content";
import { scrollToId } from "./ui";

export function ZapHeader({ content }: { content: HeaderContent }) {
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--d-line)] bg-[#0B141A]/90 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--d-accent)] text-[#052014] shadow-[0_6px_18px_-6px_rgba(37,211,102,0.7)]">
            <MessageCircle className="h-5 w-5" strokeWidth={2.4} aria-hidden />
          </span>
          <span className="[font-family:var(--demo-display)] text-xl font-extrabold tracking-tight text-[var(--d-ink)]">
            Zap<span className="text-[var(--d-accent)]">Pedido</span>
          </span>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                go(item.href);
              }}
              className="text-[0.82rem] font-semibold text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-ink)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href="#cta"
            onClick={(e) => {
              e.preventDefault();
              go("#cta");
            }}
            className="hidden rounded-full bg-[var(--d-accent)] px-5 py-2.5 text-[0.8rem] font-bold text-[#052014] transition-transform hover:scale-[1.04] sm:inline-block"
          >
            {content.cta}
          </a>
          <button
            type="button"
            aria-label={open ? content.closeMenu : content.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink)] md:hidden"
          >
            {open ? <X className="h-4 w-4" strokeWidth={2} /> : <Menu className="h-4 w-4" strokeWidth={2} />}
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
            className="overflow-hidden border-t border-[var(--d-line)] bg-[#0B141A]/97 backdrop-blur-md md:hidden"
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
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-[var(--d-ink-soft)] transition-colors hover:bg-[var(--d-panel)] hover:text-[var(--d-ink)]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#cta"
                onClick={(e) => {
                  e.preventDefault();
                  go("#cta");
                }}
                className="mt-2 rounded-full bg-[var(--d-accent)] px-5 py-3 text-center text-[0.82rem] font-bold text-[#052014]"
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
