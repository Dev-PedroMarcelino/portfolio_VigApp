"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { NavContent } from "./content";
import { CortexaMark, scrollToId } from "./ui";

export function Header({ content }: { content: NavContent }) {
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
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--d-line)] bg-[rgba(5,5,10,0.82)] shadow-[0_16px_50px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <button
          type="button"
          onClick={() => scrollToId("top")}
          className="flex items-center gap-2.5 text-[var(--d-ink)]"
        >
          <CortexaMark />
          <span className="[font-family:var(--demo-display)] text-xl font-semibold tracking-tight">
            Cortexa
          </span>
        </button>

        <nav className="hidden items-center gap-7 lg:flex">
          {content.links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                go(item.href);
              }}
              className="text-[0.82rem] font-medium text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-ink)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href="#playground"
            onClick={(e) => {
              e.preventDefault();
              go("#playground");
            }}
            className="hidden text-[0.82rem] font-medium text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-ink)] sm:inline-block"
          >
            {content.login}
          </a>
          <a
            href="#cta"
            onClick={(e) => {
              e.preventDefault();
              go("#cta");
            }}
            className="hidden rounded-full bg-[var(--d-accent)] px-5 py-2 text-[0.82rem] font-semibold text-[var(--d-accent-ink)] shadow-[0_0_28px_-6px_var(--d-accent)] transition-transform hover:scale-[1.04] sm:inline-block"
          >
            {content.cta}
          </a>
          <button
            type="button"
            aria-label={open ? content.closeMenu : content.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink)] lg:hidden"
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
            className="overflow-hidden border-t border-[var(--d-line)] bg-[rgba(5,5,10,0.97)] backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {content.links.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.href);
                  }}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-[var(--d-ink-soft)] transition-colors hover:bg-[var(--d-panel)] hover:text-[var(--d-ink)]"
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
                className="mt-2 rounded-full bg-[var(--d-accent)] px-5 py-3 text-center text-sm font-semibold text-[var(--d-accent-ink)]"
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
