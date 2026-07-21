"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import type { NordformContent, UnitId } from "./content";

const UNITS: UnitId[] = ["cm", "in"];

export function NordformHeader({
  content,
  unit,
  onUnitChange,
  cartCount,
  onOpenCart,
}: {
  content: NordformContent["header"];
  unit: UnitId;
  onUnitChange: (unit: UnitId) => void;
  cartCount: number;
  onOpenCart: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--d-line)] bg-[rgba(237,231,222,0.88)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="#top"
          className="flex items-baseline gap-1.5 text-xl tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)]"
        >
          Nordform
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--d-sage)]" />
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium text-[var(--d-soft)] transition-colors hover:text-[var(--d-ink)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div
            role="group"
            aria-label={content.unitAria}
            className="flex items-center rounded-full border border-[var(--d-line)] bg-[var(--d-bone)] p-0.5"
          >
            {UNITS.map((u) => (
              <button
                key={u}
                type="button"
                aria-pressed={unit === u}
                onClick={() => onUnitChange(u)}
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                  unit === u
                    ? "bg-[var(--d-ink)] text-[var(--d-bone)]"
                    : "text-[var(--d-soft)] hover:text-[var(--d-ink)]"
                }`}
              >
                {u}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={content.cartAria}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--d-line)] bg-[var(--d-bone)] text-[var(--d-ink)] transition-colors hover:border-[var(--d-ink)]"
          >
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.7} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--d-sage-ink)] px-1 text-[10px] font-bold text-[var(--d-bone)]"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? content.menuClose : content.menuOpen}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--d-line)] bg-[var(--d-bone)] text-[var(--d-ink)] md:hidden"
          >
            {menuOpen ? (
              <X className="h-[18px] w-[18px]" strokeWidth={1.7} />
            ) : (
              <Menu className="h-[18px] w-[18px]" strokeWidth={1.7} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-[var(--d-line)] bg-[var(--d-bg)] md:hidden"
          >
            <div className="flex flex-col px-5 py-3">
              {content.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-[var(--d-line)] py-3 text-sm font-medium text-[var(--d-ink)] last:border-b-0"
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
