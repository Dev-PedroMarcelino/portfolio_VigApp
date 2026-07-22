"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import type { HeaderContent } from "./content";
import { scrollToId } from "./ui";

export function VielaHeader({
  content,
  cartCount,
  onOpenCart,
}: {
  content: HeaderContent;
  cartCount: number;
  onOpenCart: () => void;
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

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--d-line)] bg-[#12081F]/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2"
          aria-label="VIELA"
        >
          <span className="[font-family:var(--demo-display)] text-2xl leading-none tracking-tight text-[var(--d-ink)]">
            VIELA
          </span>
          <span className="h-2 w-2 rounded-full bg-[var(--d-accent)] shadow-[0_0_12px_var(--d-accent)] transition-transform group-hover:scale-125" />
        </button>

        <nav className="hidden items-center gap-8 lg:flex">
          {content.nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                go(item.href);
              }}
              className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-accent)] [font-family:var(--demo-body)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={content.cartLabel}
            className="relative flex h-10 items-center gap-2 rounded-full border border-[var(--d-line)] bg-white/[0.03] px-4 text-[var(--d-ink)] transition-colors hover:border-[var(--d-accent)]"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.9} aria-hidden />
            <span className="hidden text-[0.68rem] font-bold uppercase tracking-[0.18em] sm:inline [font-family:var(--demo-body)]">
              {content.cartLabel}
            </span>
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 22 }}
                  className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--d-accent)] px-1 text-[0.6rem] font-bold text-[#12081F] [font-family:var(--demo-body)]"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

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
            className="overflow-hidden border-t border-[var(--d-line)] bg-[#12081F]/97 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {content.nav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.href);
                  }}
                  className="rounded-xl px-3 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[var(--d-ink-soft)] transition-colors hover:bg-white/5 hover:text-[var(--d-accent)] [font-family:var(--demo-body)]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
