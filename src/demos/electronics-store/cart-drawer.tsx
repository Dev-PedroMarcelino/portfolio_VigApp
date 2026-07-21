"use client";

import { useEffect, useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, Headphones, Laptop, Minus, Plus, ShoppingBag, Smartphone, Trash2, Watch, X } from "lucide-react";
import type { CartContent, DealProduct, ProductIcon } from "./content";
import { scrollToId } from "./ui";

export interface CartLine {
  id: string;
  qty: number;
}

const ICONS: Record<ProductIcon, typeof Laptop> = {
  laptop: Laptop,
  phone: Smartphone,
  audio: Headphones,
  watch: Watch,
};

export function CartDrawer({
  open,
  onClose,
  lines,
  products,
  content,
  priceLocale,
  currency,
  ordered,
  onChangeQty,
  onRemove,
  onCheckout,
  onReset,
}: {
  open: boolean;
  onClose: () => void;
  lines: CartLine[];
  products: DealProduct[];
  content: CartContent;
  priceLocale: string;
  currency: string;
  ordered: boolean;
  onChangeQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  onReset: () => void;
}) {
  const reduce = useReducedMotion() ?? false;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const format = useMemo(
    () =>
      new Intl.NumberFormat(priceLocale, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }),
    [priceLocale, currency],
  );

  const resolved = lines
    .map((line) => {
      const product = products.find((p) => p.id === line.id);
      return product ? { line, product } : null;
    })
    .filter((x): x is { line: CartLine; product: DealProduct } => x !== null);

  const subtotal = resolved.reduce((sum, r) => sum + r.product.price * r.line.qty, 0);
  const savings = resolved.reduce(
    (sum, r) => sum + (r.product.wasPrice - r.product.price) * r.line.qty,
    0,
  );

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
            className="absolute inset-0 h-full w-full cursor-default bg-[#020610]/70 backdrop-blur-sm"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={content.title}
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-[var(--d-line)] bg-[var(--d-bg-soft)] shadow-[-30px_0_80px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center justify-between border-b border-[var(--d-line)] px-6 py-5">
              <h2 className="flex items-center gap-2.5 [font-family:var(--demo-display)] text-lg font-bold tracking-tight text-[var(--d-ink)]">
                <ShoppingBag className="h-5 w-5 text-[var(--d-accent)]" strokeWidth={2} aria-hidden />
                {content.title}
              </h2>
              <button
                type="button"
                aria-label={content.close}
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink-dim)] transition-colors hover:text-[var(--d-ink)]"
              >
                <X className="h-4 w-4" strokeWidth={2} aria-hidden />
              </button>
            </div>

            {ordered ? (
              <motion.div
                initial={reduce ? undefined : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-1 flex-col overflow-y-auto px-6 py-8"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--d-accent)] text-[#04101C] shadow-[0_0_30px_rgba(0,212,255,0.5)]">
                  <BadgeCheck className="h-7 w-7" strokeWidth={2} aria-hidden />
                </span>
                <h3 className="mt-6 [font-family:var(--demo-display)] text-2xl font-bold tracking-tight text-[var(--d-ink)]">
                  {content.successTitle}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--d-ink-dim)]">
                  {content.successBody}
                </p>
                <div className="mt-7 rounded-2xl border border-[var(--d-line)] bg-[var(--d-panel)] p-5">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[var(--d-accent)]">
                    {content.orderLabel} VX-2608-4417
                  </p>
                  <div className="mt-4 flex items-baseline justify-between border-t border-[var(--d-line)] pt-4">
                    <span className="text-sm text-[var(--d-ink-dim)]">{content.subtotal}</span>
                    <span className="[font-family:var(--demo-display)] text-xl font-bold text-[var(--d-ink)]">
                      {format.format(subtotal)}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onReset}
                  className="mt-auto rounded-full border border-[var(--d-accent)]/50 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-accent)] transition-colors hover:bg-[var(--d-accent)]/10"
                >
                  {content.continueShopping}
                </button>
              </motion.div>
            ) : resolved.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-dashed border-[var(--d-line)] text-[var(--d-ink-dim)]">
                  <ShoppingBag className="h-6 w-6" strokeWidth={1.6} aria-hidden />
                </span>
                <p className="max-w-xs text-sm leading-relaxed text-[var(--d-ink-dim)]">
                  {content.empty}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    scrollToId("deals");
                  }}
                  className="rounded-full bg-[var(--d-accent)] px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#04101C] transition-transform hover:scale-[1.03]"
                >
                  {content.emptyCta}
                </button>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-3 overflow-y-auto px-6 py-5">
                  <AnimatePresence initial={false}>
                    {resolved.map(({ line, product }) => {
                      const Icon = ICONS[product.icon];
                      return (
                        <motion.li
                          key={product.id}
                          layout={!reduce}
                          initial={reduce ? undefined : { opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduce ? undefined : { opacity: 0, x: 40 }}
                          transition={{ duration: 0.22 }}
                          className="rounded-2xl border border-[var(--d-line)] bg-[var(--d-panel)] p-4"
                        >
                          <div className="flex items-start gap-3.5">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--d-accent)]/25 to-[var(--d-violet)]/25 text-[var(--d-accent)]">
                              <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-semibold text-[var(--d-ink)]">
                                Voltix {product.name}
                              </p>
                              <p className="mt-0.5 flex items-baseline gap-2 text-sm">
                                <span className="font-semibold text-[var(--d-accent)]">
                                  {format.format(product.price)}
                                </span>
                                <s className="text-xs text-[var(--d-ink-dim)]">
                                  {format.format(product.wasPrice)}
                                </s>
                              </p>
                            </div>
                            <button
                              type="button"
                              aria-label={`${content.remove}: Voltix ${product.name}`}
                              onClick={() => onRemove(product.id)}
                              className="text-[var(--d-ink-dim)] transition-colors hover:text-[#FF6B8B]"
                            >
                              <Trash2 className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                            </button>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-1 rounded-full border border-[var(--d-line)] p-1">
                              <button
                                type="button"
                                aria-label={`${content.decrease}: Voltix ${product.name}`}
                                onClick={() => onChangeQty(product.id, -1)}
                                className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--d-ink-dim)] transition-colors hover:bg-[var(--d-bg)] hover:text-[var(--d-ink)]"
                              >
                                <Minus className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                              </button>
                              <span className="w-7 text-center font-mono text-sm font-semibold text-[var(--d-ink)]">
                                {line.qty}
                              </span>
                              <button
                                type="button"
                                aria-label={`${content.increase}: Voltix ${product.name}`}
                                onClick={() => onChangeQty(product.id, 1)}
                                className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--d-ink-dim)] transition-colors hover:bg-[var(--d-bg)] hover:text-[var(--d-ink)]"
                              >
                                <Plus className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                              </button>
                            </div>
                            <span className="font-mono text-sm font-semibold text-[var(--d-ink)]">
                              {format.format(product.price * line.qty)}
                            </span>
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>

                <div className="border-t border-[var(--d-line)] px-6 pb-20 pt-5 sm:pb-8">
                  <div className="flex items-baseline justify-between text-sm text-[var(--d-ink-dim)]">
                    <span>{content.savings}</span>
                    <span className="font-semibold text-[var(--d-good)]">
                      {format.format(savings)}
                    </span>
                  </div>
                  <div className="mt-2.5 flex items-baseline justify-between">
                    <span className="text-sm text-[var(--d-ink-dim)]">{content.subtotal}</span>
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={subtotal}
                        initial={reduce ? undefined : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? undefined : { opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="[font-family:var(--demo-display)] text-2xl font-bold tracking-tight text-[var(--d-ink)]"
                      >
                        {format.format(subtotal)}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <p className="mt-2 text-[0.7rem] text-[var(--d-ink-dim)]">{content.taxNote}</p>
                  <button
                    type="button"
                    onClick={onCheckout}
                    className="mt-4 w-full rounded-full bg-[var(--d-accent)] py-4 text-[0.74rem] font-bold uppercase tracking-[0.2em] text-[#04101C] shadow-[0_0_30px_rgba(0,212,255,0.35)] transition-transform hover:scale-[1.02]"
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
