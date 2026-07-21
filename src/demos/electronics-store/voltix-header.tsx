"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X, Zap } from "lucide-react";
import type { CartContent, HeaderContent } from "./content";
import { scrollToId } from "./ui";

export function VoltixHeader({
  content,
  cart,
  cartCount,
  onOpenCart,
}: {
  content: HeaderContent;
  cart: CartContent;
  cartCount: number;
  onOpenCart: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
          ? "border-b border-[var(--d-line)] bg-[#0A0F1E]/85 shadow-[0_12px_40px_-20px_rgba(0,212,255,0.25)] backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 [font-family:var(--demo-display)] text-xl font-bold uppercase tracking-[0.14em] text-[var(--d-ink)]"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--d-accent)] text-[#04101C] shadow-[0_0_18px_rgba(0,212,255,0.55)]">
            <Zap className="h-4 w-4" strokeWidth={2.4} aria-hidden />
          </span>
          Volt<span className="text-[var(--d-accent)]">ix</span>
        </button>

        <nav className="hidden items-center gap-7 lg:flex">
          {content.nav.map((item) => (
            <a
              key={item.href + item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                go(item.href);
              }}
              className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--d-ink-dim)] transition-colors hover:text-[var(--d-accent)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`${cart.open} (${cartCount})`}
            className="relative flex h-10 items-center gap-2 rounded-full border border-[var(--d-line)] bg-[var(--d-panel)] px-4 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--d-ink)] transition-colors hover:border-[var(--d-accent)]/60"
          >
            <ShoppingBag className="h-4 w-4 text-[var(--d-accent)]" strokeWidth={2} aria-hidden />
            <span className="hidden sm:inline">{content.cartLabel}</span>
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--d-accent)] px-1 text-[0.62rem] font-bold text-[#04101C] shadow-[0_0_12px_rgba(0,212,255,0.7)]"
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
            {open ? (
              <X className="h-4 w-4" strokeWidth={2} aria-hidden />
            ) : (
              <Menu className="h-4 w-4" strokeWidth={2} aria-hidden />
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
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="overflow-hidden border-t border-[var(--d-line)] bg-[#0A0F1E]/96 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {content.nav.map((item) => (
                <a
                  key={item.href + item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.href);
                  }}
                  className="rounded-xl px-3 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--d-ink-dim)] transition-colors hover:bg-[var(--d-panel)] hover:text-[var(--d-accent)]"
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
