"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import type { NavContent } from "./content";
import { MeridianMark, scrollToId } from "./ui";

export function MeridianHeader({ content }: { content: NavContent }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
          ? "border-b border-[var(--d-line)] bg-[rgba(15,23,42,0.86)] backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3.5">
        <button
          type="button"
          onClick={() => scrollToId("top")}
          className="flex items-center gap-3 text-[var(--d-ink)]"
          aria-label="Meridian Group"
        >
          <MeridianMark className="h-8 w-8" />
          <span className="flex flex-col items-start leading-none">
            <span className="[font-family:var(--demo-display)] text-[1.2rem] font-semibold tracking-[-0.01em]">
              Meridian Group
            </span>
            <span className="mt-1 text-[0.56rem] font-medium uppercase tracking-[0.32em] text-[var(--d-ink-faint)]">
              {content.tagline}
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-8 lg:flex">
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
            href="#investor"
            onClick={(e) => {
              e.preventDefault();
              go("#investor");
            }}
            className="hidden items-center gap-1.5 rounded-sm border border-[var(--d-line-strong)] bg-[var(--d-panel)] px-4 py-2 text-[0.8rem] font-medium text-[var(--d-ink)] transition-colors hover:border-[var(--d-steel-bright)] hover:bg-[var(--d-panel-strong)] sm:inline-flex"
          >
            {content.cta}
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
          </a>
          <button
            type="button"
            aria-label={open ? content.closeMenu : content.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--d-line)] text-[var(--d-ink)] lg:hidden"
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
            className="overflow-hidden border-t border-[var(--d-line)] bg-[rgba(15,23,42,0.97)] backdrop-blur-xl lg:hidden"
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
                  className="rounded-sm px-3 py-3 text-sm font-medium text-[var(--d-ink-soft)] transition-colors hover:bg-[var(--d-panel)] hover:text-[var(--d-ink)]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#investor"
                onClick={(e) => {
                  e.preventDefault();
                  go("#investor");
                }}
                className="mt-2 rounded-sm bg-[var(--d-steel)] px-4 py-3 text-center text-sm font-semibold text-[var(--d-accent-ink)]"
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
