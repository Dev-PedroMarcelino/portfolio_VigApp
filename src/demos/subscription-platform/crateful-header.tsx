"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Package, X } from "lucide-react";
import type { HeaderContent } from "./content";
import { scrollToId } from "./ui";

export function CratefulHeader({
  content,
  giftMode,
}: {
  content: HeaderContent;
  giftMode: boolean;
}) {
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

  const ctaLabel = giftMode ? content.ctaGift : content.ctaSelf;
  const ctaTarget = giftMode ? "#gifting" : "#builder";

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--d-line)] bg-[#FFF4E6]/92 shadow-[0_10px_34px_-22px_rgba(55,39,26,0.45)] backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 [font-family:var(--demo-display)] text-2xl leading-none tracking-tight text-[var(--d-ink)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--d-accent)] text-[var(--d-bg)]">
            <Package className="h-4 w-4" strokeWidth={2} aria-hidden />
          </span>
          Crateful
        </button>

        <nav className="hidden items-center gap-7 lg:flex">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                go(item.href);
              }}
              className="text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-accent)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait" initial={false}>
            <motion.a
              key={ctaLabel}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              href={ctaTarget}
              onClick={(e) => {
                e.preventDefault();
                go(ctaTarget);
              }}
              className="hidden rounded-full bg-[var(--d-accent)] px-5 py-2.5 text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-[var(--d-bg)] transition-transform hover:scale-[1.04] sm:inline-block"
            >
              {ctaLabel}
            </motion.a>
          </AnimatePresence>
          <button
            type="button"
            aria-label={open ? content.closeMenu : content.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--d-line)] bg-[var(--d-card)] text-[var(--d-ink)] lg:hidden"
          >
            {open ? (
              <X className="h-4 w-4" strokeWidth={2} />
            ) : (
              <Menu className="h-4 w-4" strokeWidth={2} />
            )}
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
            className="overflow-hidden border-t border-[var(--d-line)] bg-[#FFF4E6]/97 backdrop-blur-md lg:hidden"
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
                  className="rounded-xl px-3 py-3 text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--d-ink-soft)] transition-colors hover:bg-[var(--d-card)] hover:text-[var(--d-accent)]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={ctaTarget}
                onClick={(e) => {
                  e.preventDefault();
                  go(ctaTarget);
                }}
                className="mt-2 rounded-full bg-[var(--d-accent)] px-5 py-3 text-center text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-[var(--d-bg)]"
              >
                {ctaLabel}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
