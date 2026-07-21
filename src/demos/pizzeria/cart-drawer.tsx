"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Bike,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingBasket,
  Trash2,
  X,
} from "lucide-react";
import type { PizzeriaContent } from "./content";
import type { CartLine, Fulfillment } from "./forno-nero";

interface CartDrawerProps {
  open: boolean;
  lines: CartLine[];
  content: PizzeriaContent["cart"];
  format: (value: number) => string;
  fulfillment: Fulfillment;
  onFulfillmentChange: (value: Fulfillment) => void;
  onClose: () => void;
  onIncrement: (key: string) => void;
  onDecrement: (key: string) => void;
  onRemove: (key: string) => void;
  onClear: () => void;
}

export function CartDrawer({
  open,
  lines,
  content,
  format,
  fulfillment,
  onFulfillmentChange,
  onClose,
  onIncrement,
  onDecrement,
  onRemove,
  onClear,
}: CartDrawerProps) {
  const [stage, setStage] = useState<"cart" | "done">("cart");
  const reduce = useReducedMotion();

  const itemCount = lines.reduce((total, line) => total + line.qty, 0);
  const subtotal = lines.reduce(
    (total, line) => total + line.unitPrice * line.qty,
    0,
  );
  const isDelivery = fulfillment === "delivery";
  const fee =
    isDelivery && lines.length > 0 && subtotal < content.freeAbove
      ? content.deliveryFee
      : 0;
  const feeWaived = isDelivery && lines.length > 0 && subtotal >= content.freeAbove;
  const total = subtotal + fee;

  const orderCode = useMemo(() => {
    const seed = lines.reduce(
      (acc, line, i) => acc + line.qty * (i + 3) * 17 + line.name.length * 5,
      41,
    );
    return `FN-${1000 + (Math.round(seed * 7) % 8999)}`;
  }, [lines]);

  const handleClose = useCallback(() => {
    if (stage === "done") {
      onClear();
      setStage("cart");
    }
    onClose();
  }, [stage, onClear, onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label={content.closeAria}
            className="fixed inset-0 z-[8900] bg-[rgba(32,18,9,0.55)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={content.title}
            className="fixed right-0 top-0 z-[8950] flex h-full w-full max-w-md flex-col bg-[var(--d-bg)] text-[var(--d-ink)] shadow-[-24px_0_60px_rgba(32,18,9,0.35)]"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
          >
            <header className="flex items-center justify-between border-b border-[rgba(42,26,16,0.14)] px-6 py-5">
              <h2 className="[font-family:var(--demo-display)] text-2xl font-semibold tracking-tight">
                {content.title}
                {itemCount > 0 && stage === "cart" && (
                  <span className="ml-2 align-middle text-sm font-bold text-[var(--d-red)]">
                    ({itemCount})
                  </span>
                )}
              </h2>
              <button
                type="button"
                aria-label={content.closeAria}
                onClick={handleClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(42,26,16,0.2)] transition-colors hover:bg-[rgba(42,26,16,0.06)]"
              >
                <X className="h-4 w-4" strokeWidth={2.2} aria-hidden />
              </button>
            </header>

            {stage === "done" ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 overflow-y-auto px-8 pb-24 text-center sm:pb-10">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--d-basil)] text-[#F5EBDC]">
                  <Check className="h-7 w-7" strokeWidth={2.4} aria-hidden />
                </span>
                <h3 className="[font-family:var(--demo-display)] text-3xl font-semibold italic tracking-tight">
                  {content.success.title}
                </h3>
                <p className="max-w-xs text-sm leading-relaxed text-[var(--d-ink-soft)]">
                  {content.success.body}
                </p>
                <dl className="mt-2 w-full max-w-xs space-y-2 rounded-2xl border border-[rgba(42,26,16,0.14)] bg-[var(--d-bg-soft)] p-5 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-[var(--d-ink-soft)]">
                      {content.success.orderLabel}
                    </dt>
                    <dd className="font-bold tabular-nums">{orderCode}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-[var(--d-ink-soft)]">
                      {content.success.totalLabel}
                    </dt>
                    <dd className="font-bold tabular-nums">{format(total)}</dd>
                  </div>
                </dl>
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--d-red)]">
                  {isDelivery ? (
                    <Bike className="h-4 w-4" strokeWidth={2} aria-hidden />
                  ) : (
                    <ShoppingBag className="h-4 w-4" strokeWidth={2} aria-hidden />
                  )}
                  {isDelivery
                    ? content.success.deliveryEta
                    : content.success.pickupEta}
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-3 rounded-full bg-[var(--d-ink)] px-6 py-3 text-sm font-semibold text-[#F5EBDC] transition-colors hover:bg-[var(--d-red)]"
                >
                  {content.success.newOrderCta}
                </button>
              </div>
            ) : lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 pb-24 text-center sm:pb-10">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(42,26,16,0.07)] text-[var(--d-ink-soft)]">
                  <ShoppingBasket className="h-7 w-7" strokeWidth={1.7} aria-hidden />
                </span>
                <h3 className="[font-family:var(--demo-display)] text-2xl font-semibold tracking-tight">
                  {content.empty.title}
                </h3>
                <p className="max-w-xs text-sm leading-relaxed text-[var(--d-ink-soft)]">
                  {content.empty.body}
                </p>
                <a
                  href="#menu"
                  onClick={handleClose}
                  className="mt-2 rounded-full bg-[var(--d-red)] px-6 py-3 text-sm font-semibold text-[#F5EBDC] transition-transform hover:scale-[1.03]"
                >
                  {content.empty.cta}
                </a>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
                  {lines.map((line) => (
                    <li
                      key={line.key}
                      className="rounded-2xl border border-[rgba(42,26,16,0.13)] bg-[var(--d-bg-soft)] p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="[font-family:var(--demo-display)] text-lg font-semibold leading-tight">
                            {line.name}
                          </p>
                          <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.12em] text-[var(--d-ink-soft)]">
                            {line.detail} · {format(line.unitPrice)}
                          </p>
                        </div>
                        <button
                          type="button"
                          aria-label={`${content.removeAria} ${line.name}`}
                          onClick={() => onRemove(line.key)}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--d-ink-soft)] transition-colors hover:bg-[rgba(193,39,45,0.1)] hover:text-[var(--d-red)]"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={2} aria-hidden />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center gap-1 rounded-full border border-[rgba(42,26,16,0.18)] p-1">
                          <button
                            type="button"
                            aria-label={`${content.decreaseAria} ${line.name}`}
                            disabled={line.qty === 1}
                            onClick={() => onDecrement(line.key)}
                            className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-[rgba(42,26,16,0.07)] disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            <Minus className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
                          </button>
                          <span className="w-6 text-center text-sm font-bold tabular-nums">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            aria-label={`${content.increaseAria} ${line.name}`}
                            onClick={() => onIncrement(line.key)}
                            className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-[rgba(42,26,16,0.07)]"
                          >
                            <Plus className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
                          </button>
                        </div>
                        <p className="text-sm font-bold tabular-nums">
                          {format(line.unitPrice * line.qty)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <footer className="border-t border-[rgba(42,26,16,0.14)] px-6 pb-24 pt-5 sm:pb-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--d-ink-soft)]">
                    {content.fulfillmentLabel}
                  </p>
                  <div className="mt-2.5 grid grid-cols-2 gap-1.5 rounded-full border border-[rgba(42,26,16,0.16)] p-1.5">
                    <button
                      type="button"
                      aria-pressed={isDelivery}
                      onClick={() => onFulfillmentChange("delivery")}
                      className={`inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
                        isDelivery
                          ? "bg-[var(--d-red)] text-[#F5EBDC]"
                          : "text-[var(--d-ink-soft)] hover:bg-[rgba(42,26,16,0.06)]"
                      }`}
                    >
                      <Bike className="h-4 w-4" strokeWidth={2} aria-hidden />
                      {content.deliveryLabel}
                    </button>
                    <button
                      type="button"
                      aria-pressed={!isDelivery}
                      onClick={() => onFulfillmentChange("pickup")}
                      className={`inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
                        !isDelivery
                          ? "bg-[var(--d-red)] text-[#F5EBDC]"
                          : "text-[var(--d-ink-soft)] hover:bg-[rgba(42,26,16,0.06)]"
                      }`}
                    >
                      <ShoppingBag className="h-4 w-4" strokeWidth={2} aria-hidden />
                      {content.pickupLabel}
                    </button>
                  </div>

                  <dl className="mt-4 space-y-1.5 text-sm">
                    <div className="flex items-center justify-between">
                      <dt className="text-[var(--d-ink-soft)]">
                        {content.subtotalLabel}
                      </dt>
                      <dd className="font-semibold tabular-nums">
                        {format(subtotal)}
                      </dd>
                    </div>
                    {isDelivery && (
                      <div className="flex items-center justify-between">
                        <dt className="text-[var(--d-ink-soft)]">
                          {content.feeLabel}
                        </dt>
                        <dd className="font-semibold tabular-nums">
                          {feeWaived ? (
                            <span className="rounded-full bg-[rgba(63,107,58,0.14)] px-2.5 py-0.5 text-xs font-bold uppercase tracking-[0.1em] text-[var(--d-basil)]">
                              {content.freeBadge}
                            </span>
                          ) : (
                            format(fee)
                          )}
                        </dd>
                      </div>
                    )}
                    <div className="flex items-center justify-between border-t border-[rgba(42,26,16,0.14)] pt-2.5">
                      <dt className="text-base font-bold">{content.totalLabel}</dt>
                      <dd className="[font-family:var(--demo-display)] text-xl font-bold tabular-nums">
                        {format(total)}
                      </dd>
                    </div>
                  </dl>
                  {isDelivery && !feeWaived && (
                    <p className="mt-2 text-xs text-[var(--d-ink-soft)]">
                      {content.freeHint} {format(content.freeAbove)}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => setStage("done")}
                    className="mt-4 w-full rounded-full bg-[var(--d-red)] py-3.5 text-sm font-bold text-[#F5EBDC] shadow-[0_12px_28px_rgba(193,39,45,0.3)] transition-transform hover:scale-[1.02]"
                  >
                    {content.checkoutCta} · {format(total)}
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
