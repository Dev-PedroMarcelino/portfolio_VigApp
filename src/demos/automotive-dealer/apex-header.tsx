"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { HeaderContent } from "./content";
import { scrollToId } from "./ui";

export function ApexHeader({ content }: { content: HeaderContent }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
          ? "border-b border-[var(--d-line)] bg-[#0C0C0F]/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2.5"
          aria-label="Apex Motors — back to top"
        >
          <span className="inline-flex h-6 w-6 skew-x-[-10deg] items-center justify-center bg-[var(--d-accent)] text-[0.7rem] font-bold text-white [font-family:var(--demo-display)]">
            A
          </span>
          <span className="[font-family:var(--demo-display)] text-lg uppercase tracking-[0.18em] text-[var(--d-ink)]">
            Apex
          </span>
        </button>

        <nav className="hidden items-center gap-9 lg:flex">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                go(item.href);
              }}
              className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-ink)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#testdrive"
            onClick={(e) => {
              e.preventDefault();
              go("#testdrive");
            }}
            className="hidden skew-x-[-8deg] bg-[var(--d-accent)] px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white transition-all hover:bg-[var(--d-accent-soft)] sm:inline-block"
          >
            <span className="inline-block skew-x-[8deg]">{content.cta}</span>
          </a>
          <button
            type="button"
            aria-label={open ? content.closeMenu : content.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center border border-[var(--d-line)] text-[var(--d-ink)] lg:hidden"
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
            className="overflow-hidden border-t border-[var(--d-line)] bg-[#0C0C0F]/97 backdrop-blur-xl lg:hidden"
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
                  className="px-3 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--d-ink-soft)] transition-colors hover:bg-white/5 hover:text-[var(--d-ink)]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#testdrive"
                onClick={(e) => {
                  e.preventDefault();
                  go("#testdrive");
                }}
                className="mt-2 bg-[var(--d-accent)] px-5 py-3 text-center text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white"
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
