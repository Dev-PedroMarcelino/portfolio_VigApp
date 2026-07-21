"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Minus, Plus, ShoppingBag, X } from "lucide-react";
import type { CurrencyInfo, NordformContent } from "./content";
import { formatPrice } from "./content";
import type { CartLine } from "./nordform";

export function CartDrawer({
  content,
  currency,
  open,
  lines,
  onClose,
  onChangeQty,
  onRemove,
  onClear,
}: {
  content: NordformContent["cart"];
  currency: CurrencyInfo;
  open: boolean;
  lines: CartLine[];
  onClose: () => void;
  onChangeQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
  onClear: () => void;
}) {
  const reduce = useReducedMotion();
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    if (!open) setOrdered(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const total = lines.reduce((sum, l) => sum + l.price * l.qty, 0);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.button
            type="button"
            aria-label={content.close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-[rgba(33,29,25,0.45)]"
          />
          <motion.aside
            role="dialog"
            aria-label={content.title}
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-[var(--d-bone)] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[var(--d-line)] px-6 py-5">
              <h2 className="text-xl text-[var(--d-ink)] [font-family:var(--demo-display)]">
                {content.title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label={content.close}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink)] transition-colors hover:border-[var(--d-ink)]"
              >
                <X className="h-4 w-4" strokeWidth={1.7} />
              </button>
            </div>

            {ordered ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--d-sage)]">
                  <Check className="h-6 w-6 text-[var(--d-bone)]" strokeWidth={2} />
                </span>
                <p className="text-2xl text-[var(--d-ink)] [font-family:var(--demo-display)]">
                  {content.successTitle}
                </p>
                <p className="text-sm leading-relaxed text-[var(--d-soft)]">{content.successBody}</p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-2 rounded-full bg-[var(--d-ink)] px-6 py-3 text-sm font-semibold text-[var(--d-bone)] transition-colors hover:bg-[#443E37]"
                >
                  {content.continueShopping}
                </button>
              </motion.div>
            ) : lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
                <ShoppingBag className="h-8 w-8 text-[var(--d-soft)]" strokeWidth={1.4} />
                <p className="text-lg text-[var(--d-ink)] [font-family:var(--demo-display)]">
                  {content.empty}
                </p>
                <p className="text-sm text-[var(--d-soft)]">{content.emptyHint}</p>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-6 py-4">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <motion.li
                        key={line.key}
                        layout={!reduce}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        className="flex items-start justify-between gap-4 border-b border-[var(--d-line)] py-4 last:border-b-0"
                      >
                        <div className="min-w-0">
                          <p className="text-base text-[var(--d-ink)] [font-family:var(--demo-display)]">
                            {line.name}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-[var(--d-soft)]">
                            {line.variantLabel}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <div className="flex items-center rounded-full border border-[var(--d-line)]">
                              <button
                                type="button"
                                onClick={() => onChangeQty(line.key, -1)}
                                aria-label={content.decrease}
                                className="flex h-7 w-7 items-center justify-center text-[var(--d-ink)]"
                              >
                                <Minus className="h-3 w-3" strokeWidth={2} />
                              </button>
                              <span className="min-w-5 text-center text-xs font-semibold text-[var(--d-ink)]">
                                {line.qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => onChangeQty(line.key, 1)}
                                aria-label={content.increase}
                                className="flex h-7 w-7 items-center justify-center text-[var(--d-ink)]"
                              >
                                <Plus className="h-3 w-3" strokeWidth={2} />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => onRemove(line.key)}
                              className="text-[11px] font-medium text-[var(--d-soft)] underline underline-offset-2 hover:text-[var(--d-ink)]"
                            >
                              {content.remove}
                            </button>
                          </div>
                        </div>
                        <p className="shrink-0 text-sm font-semibold text-[var(--d-ink)]">
                          {formatPrice(line.price * line.qty, currency)}
                        </p>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <div className="border-t border-[var(--d-line)] px-6 pb-20 pt-5 sm:pb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--d-soft)]">{content.subtotal}</span>
                    <span className="text-lg font-bold text-[var(--d-ink)]">
                      {formatPrice(total, currency)}
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-[var(--d-soft)]">
                    {content.note}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setOrdered(true);
                      onClear();
                    }}
                    className="mt-4 w-full rounded-full bg-[var(--d-ink)] py-3.5 text-sm font-semibold text-[var(--d-bone)] transition-colors hover:bg-[#443E37]"
                  >
                    {content.checkout}
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
