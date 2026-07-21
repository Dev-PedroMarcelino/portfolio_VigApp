"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus, Trash2, Clock, ShoppingBag, ArrowRight } from "lucide-react";
import type { PratoContent } from "./content";
import type { CartLine } from "./prato";

export function CartSheet({
  open,
  lines,
  content,
  currency,
  onClose,
  onIncrement,
  onDecrement,
  onRemove,
  onClear,
  onCheckout,
}: {
  open: boolean;
  lines: CartLine[];
  content: PratoContent["cart"];
  currency: (value: number) => string;
  onClose: () => void;
  onIncrement: (key: string) => void;
  onDecrement: (key: string) => void;
  onRemove: (key: string) => void;
  onClear: () => void;
  onCheckout: () => void;
}) {
  const subtotal = lines.reduce((sum, l) => sum + l.unitPrice * l.qty, 0);
  const primary = lines[0];
  const deliveryFee = primary ? primary.deliveryFee : 0;
  const serviceFee = lines.length > 0 ? content.serviceFeeValue : 0;
  const total = subtotal + deliveryFee + serviceFee;
  const missing = Math.max(0, content.minOrder - subtotal);
  const belowMin = lines.length > 0 && missing > 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[8700] bg-[rgba(26,12,4,0.55)] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            className="fixed right-0 top-0 z-[8800] flex h-full w-full max-w-md flex-col bg-[var(--d-bg)] shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            role="dialog"
            aria-label={content.title}
          >
            <header className="flex items-center justify-between border-b border-[var(--d-line)] px-5 py-4">
              <div>
                <h2 className="[font-family:var(--demo-display)] text-xl font-bold text-[var(--d-ink)]">
                  {content.title}
                </h2>
                {primary && (
                  <p className="text-xs font-medium text-[var(--d-ink-soft)]">
                    {content.fromLabel} {primary.restaurantName}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={content.closeAria}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-line-strong)] text-[var(--d-ink)] transition-colors hover:bg-[var(--d-cream)]"
              >
                <X className="h-4.5 w-4.5" aria-hidden />
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--d-cream)] text-[var(--d-accent)]">
                  <ShoppingBag className="h-7 w-7" aria-hidden />
                </span>
                <div>
                  <p className="[font-family:var(--demo-display)] text-lg font-bold text-[var(--d-ink)]">
                    {content.empty}
                  </p>
                  <p className="mt-1 text-sm text-[var(--d-ink-soft)]">
                    {content.emptyNote}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full bg-[var(--d-accent)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--d-accent-deep)]"
                >
                  {content.emptyCta}
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <motion.div
                        key={line.key}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-3 overflow-hidden rounded-2xl border border-[var(--d-line)] bg-[var(--d-card)] p-3"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-[var(--d-ink)]">
                            {line.name}
                          </p>
                          <p className="text-xs font-medium text-[var(--d-ink-soft)] tabular-nums">
                            {currency(line.unitPrice)}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 rounded-full border border-[var(--d-line-strong)] p-0.5">
                          <button
                            type="button"
                            onClick={() => onDecrement(line.key)}
                            aria-label={content.qtyDecAria}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--d-ink)] transition-colors hover:bg-[var(--d-cream)]"
                          >
                            <Minus className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden />
                          </button>
                          <span className="w-5 text-center text-sm font-bold text-[var(--d-ink)] tabular-nums">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => onIncrement(line.key)}
                            aria-label={content.qtyIncAria}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--d-ink)] transition-colors hover:bg-[var(--d-cream)]"
                          >
                            <Plus className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden />
                          </button>
                        </div>
                        <span className="w-16 text-right text-sm font-bold text-[var(--d-ink)] tabular-nums">
                          {currency(line.unitPrice * line.qty)}
                        </span>
                        <button
                          type="button"
                          onClick={() => onRemove(line.key)}
                          aria-label={content.removeAria}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--d-ink-soft)] transition-colors hover:bg-[var(--d-cream)] hover:text-[var(--d-accent)]"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <button
                    type="button"
                    onClick={onClear}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-accent)]"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden />
                    {content.clearLabel}
                  </button>
                </div>

                <div className="border-t border-[var(--d-line)] bg-[var(--d-card)] px-5 py-4">
                  <dl className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-[var(--d-ink-soft)]">
                      <dt>{content.subtotal}</dt>
                      <dd className="tabular-nums">{currency(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between text-[var(--d-ink-soft)]">
                      <dt>{content.deliveryFee}</dt>
                      <dd className="tabular-nums">
                        {deliveryFee === 0 ? content.freeLabel : currency(deliveryFee)}
                      </dd>
                    </div>
                    <div className="flex justify-between text-[var(--d-ink-soft)]">
                      <dt>{content.serviceFee}</dt>
                      <dd className="tabular-nums">{currency(serviceFee)}</dd>
                    </div>
                    <div className="flex justify-between border-t border-[var(--d-line)] pt-2 text-base font-bold text-[var(--d-ink)]">
                      <dt>{content.total}</dt>
                      <dd className="tabular-nums">{currency(total)}</dd>
                    </div>
                  </dl>

                  {primary && (
                    <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--d-cream)] px-3 py-1.5 text-xs font-semibold text-[var(--d-ink)]">
                      <Clock className="h-3.5 w-3.5 text-[var(--d-accent)]" aria-hidden />
                      {content.etaLabel}: {primary.eta} min
                    </p>
                  )}

                  {belowMin && (
                    <p className="mt-3 rounded-xl bg-[var(--d-accent)]/10 px-3 py-2 text-xs font-semibold text-[var(--d-accent-deep)]">
                      {content.minWarning.replace("{amount}", currency(missing))}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={onCheckout}
                    disabled={belowMin}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--d-accent)] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[var(--d-accent-deep)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {content.checkout}
                    <ArrowRight className="h-4 w-4" strokeWidth={2.4} aria-hidden />
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
