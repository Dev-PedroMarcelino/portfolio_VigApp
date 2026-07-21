"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Flame,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import type { EmberStackContent } from "./content";
import type { CartLine } from "./ember-stack";

const spring = { type: "spring", stiffness: 380, damping: 30 } as const;

interface CartBarProps {
  lines: CartLine[];
  open: boolean;
  content: EmberStackContent["cart"];
  format: (value: number) => string;
  onOpenChange: (open: boolean) => void;
  onIncrement: (key: string) => void;
  onDecrement: (key: string) => void;
  onRemove: (key: string) => void;
  onClear: () => void;
}

export function CartBar({
  lines,
  open,
  content,
  format,
  onOpenChange,
  onIncrement,
  onDecrement,
  onRemove,
  onClear,
}: CartBarProps) {
  const [receipt, setReceipt] = useState<{ id: string; total: string } | null>(
    null,
  );

  const itemCount = lines.reduce((sum, line) => sum + line.qty, 0);
  const total = lines.reduce((sum, line) => sum + line.unitPrice * line.qty, 0);
  const countLabel = `${itemCount} ${
    itemCount === 1 ? content.itemSingular : content.itemPlural
  }`;

  const handleCheckout = () => {
    setReceipt({
      id: `ES-${1000 + (Date.now() % 9000)}`,
      total: format(total),
    });
    onClear();
  };

  const handleClose = () => {
    onOpenChange(false);
    setReceipt(null);
  };

  const handleAgain = () => {
    setReceipt(null);
    onOpenChange(false);
  };

  return (
    <>
      <AnimatePresence>
        {!open && itemCount > 0 && (
          <motion.div
            key="es-cart-bar"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={spring}
            className="fixed inset-x-3 bottom-[84px] z-[8450] mx-auto max-w-xl"
          >
            <button
              type="button"
              onClick={() => onOpenChange(true)}
              aria-expanded={open}
              aria-label={`${content.viewLabel} — ${countLabel}`}
              className="flex w-full items-center justify-between gap-4 rounded-2xl border-2 border-[#120A05] bg-[var(--d-flame)] px-5 py-3.5 text-[#1A0E08] shadow-[5px_5px_0_rgba(0,0,0,0.55)] transition-transform hover:scale-[1.015]"
            >
              <span className="flex items-center gap-2.5">
                <ShoppingBag className="h-5 w-5" strokeWidth={2.4} aria-hidden />
                <span className="[font-family:var(--demo-display)] text-xs uppercase leading-none">
                  {countLabel}
                </span>
              </span>
              <span className="flex items-center gap-3">
                <span className="[font-family:var(--demo-display)] text-lg leading-none tabular-nums">
                  {format(total)}
                </span>
                <span className="rounded-lg border-2 border-[#120A05] bg-[var(--d-mustard)] px-3 py-1.5 [font-family:var(--demo-display)] text-[10px] uppercase leading-none shadow-[2px_2px_0_rgba(0,0,0,0.4)]">
                  {content.viewLabel}
                </span>
              </span>
            </button>
          </motion.div>
        )}

        {open && (
          <motion.div
            key="es-cart-panel"
            initial={{ y: 48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 48, opacity: 0 }}
            transition={spring}
            className="fixed inset-x-3 bottom-[84px] z-[8700] mx-auto max-w-xl"
          >
            <div
              role="dialog"
              aria-label={content.barLabel}
              className="overflow-hidden rounded-3xl border-2 border-[#120A05] bg-[var(--d-card)] shadow-[0_28px_70px_rgba(0,0,0,0.65)]"
            >
              <div className="flex items-center justify-between gap-3 border-b-2 border-dashed border-[var(--d-line)] px-5 py-4">
                <p className="flex items-center gap-2.5 [font-family:var(--demo-display)] text-sm uppercase leading-none text-[var(--d-ink)]">
                  <ShoppingBag
                    className="h-4.5 w-4.5 text-[var(--d-flame)]"
                    strokeWidth={2.4}
                    aria-hidden
                  />
                  {content.barLabel}
                  {itemCount > 0 && (
                    <span className="rounded-md bg-[var(--d-mustard)] px-2 py-1 text-[10px] leading-none text-[#1A0E08] tabular-nums">
                      {countLabel}
                    </span>
                  )}
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label={content.closeAria}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[var(--d-line-strong)] text-[var(--d-ink-soft)] transition-colors hover:border-[var(--d-mustard)] hover:text-[var(--d-ink)]"
                >
                  <X className="h-4 w-4" strokeWidth={2.4} aria-hidden />
                </button>
              </div>

              {receipt ? (
                <SuccessView
                  receipt={receipt}
                  content={content.success}
                  onAgain={handleAgain}
                />
              ) : lines.length === 0 ? (
                <EmptyView content={content} onBrowse={handleClose} />
              ) : (
                <>
                  <ul className="max-h-[48vh] divide-y divide-[var(--d-line)] overflow-y-auto px-5">
                    {lines.map((line) => (
                      <li key={line.key} className="flex items-center gap-3 py-3.5">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-[var(--d-ink)]">
                            {line.name}
                          </p>
                          <p className="truncate text-xs text-[var(--d-ink-soft)]">
                            {line.detail}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => onDecrement(line.key)}
                            aria-label={`${content.decreaseAria} ${line.name}`}
                            className="flex h-7 w-7 items-center justify-center rounded-lg border-2 border-[var(--d-line-strong)] text-[var(--d-ink-soft)] transition-colors hover:border-[var(--d-mustard)] hover:text-[var(--d-ink)]"
                          >
                            <Minus className="h-3 w-3" strokeWidth={3} aria-hidden />
                          </button>
                          <span className="w-6 text-center text-sm font-bold text-[var(--d-ink)] tabular-nums">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => onIncrement(line.key)}
                            aria-label={`${content.increaseAria} ${line.name}`}
                            className="flex h-7 w-7 items-center justify-center rounded-lg border-2 border-[var(--d-line-strong)] text-[var(--d-ink-soft)] transition-colors hover:border-[var(--d-mustard)] hover:text-[var(--d-ink)]"
                          >
                            <Plus className="h-3 w-3" strokeWidth={3} aria-hidden />
                          </button>
                        </div>
                        <p className="w-20 text-right [font-family:var(--demo-display)] text-sm text-[var(--d-mustard)] tabular-nums">
                          {format(line.unitPrice * line.qty)}
                        </p>
                        <button
                          type="button"
                          onClick={() => onRemove(line.key)}
                          aria-label={`${content.removeAria} ${line.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-flame)]"
                        >
                          <Trash2 className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t-2 border-dashed border-[var(--d-line)] px-5 py-4">
                    <div className="flex items-center justify-between">
                      <p className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.18em] text-[var(--d-ink-soft)]">
                        {content.totalLabel}
                      </p>
                      <p className="[font-family:var(--demo-display)] text-2xl leading-none text-[var(--d-mustard)] tabular-nums">
                        {format(total)}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={onClear}
                        className="rounded-xl border-2 border-[var(--d-line-strong)] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--d-ink-soft)] transition-colors hover:border-[var(--d-flame)] hover:text-[var(--d-ink)]"
                      >
                        {content.clearLabel}
                      </button>
                      <motion.button
                        type="button"
                        onClick={handleCheckout}
                        whileTap={{ scale: 0.95 }}
                        transition={spring}
                        className="flex-1 rounded-xl border-2 border-[#120A05] bg-[var(--d-flame)] px-4 py-3 [font-family:var(--demo-display)] text-xs uppercase leading-none text-[#1A0E08] shadow-[3px_3px_0_rgba(0,0,0,0.45)] transition-colors hover:bg-[var(--d-mustard)]"
                      >
                        {content.checkoutLabel}
                      </motion.button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function EmptyView({
  content,
  onBrowse,
}: {
  content: EmberStackContent["cart"];
  onBrowse: () => void;
}) {
  return (
    <div className="flex flex-col items-center px-6 py-10 text-center">
      <span className="flex h-14 w-14 -rotate-6 items-center justify-center rounded-2xl border-2 border-[#120A05] bg-[var(--d-mustard)] text-[#1A0E08] shadow-[3px_3px_0_rgba(0,0,0,0.45)]">
        <Flame className="h-6 w-6" strokeWidth={2.2} aria-hidden />
      </span>
      <p className="mt-5 [font-family:var(--demo-display)] text-base uppercase text-[var(--d-ink)]">
        {content.emptyTitle}
      </p>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-[var(--d-ink-soft)]">
        {content.emptyBody}
      </p>
      <a
        href="#menu"
        onClick={onBrowse}
        className="mt-6 inline-flex rounded-xl border-2 border-[#120A05] bg-[var(--d-flame)] px-5 py-3 [font-family:var(--demo-display)] text-xs uppercase leading-none text-[#1A0E08] shadow-[3px_3px_0_rgba(0,0,0,0.45)]"
      >
        {content.emptyCta}
      </a>
    </div>
  );
}

function SuccessView({
  receipt,
  content,
  onAgain,
}: {
  receipt: { id: string; total: string };
  content: EmberStackContent["cart"]["success"];
  onAgain: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={spring}
      className="flex flex-col items-center px-6 py-8 text-center"
    >
      <motion.span
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: -6 }}
        transition={{ type: "spring", stiffness: 420, damping: 16, delay: 0.1 }}
        className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-[#120A05] bg-[var(--d-mustard)] text-[#1A0E08] shadow-[4px_4px_0_rgba(0,0,0,0.45)]"
      >
        <Check className="h-8 w-8" strokeWidth={3} aria-hidden />
      </motion.span>
      <p className="mt-5 [font-family:var(--demo-display)] text-lg uppercase text-[var(--d-ink)]">
        {content.title}
      </p>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--d-ink-soft)]">
        {content.body}
      </p>

      <dl className="mt-6 w-full max-w-xs space-y-2 rounded-2xl border-2 border-dashed border-[var(--d-line-strong)] px-5 py-4 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-[var(--d-ink-soft)]">{content.orderLabel}</dt>
          <dd className="[font-family:var(--demo-display)] text-[var(--d-flame)]">
            {receipt.id}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-[var(--d-ink-soft)]">{content.totalLabel}</dt>
          <dd className="font-bold text-[var(--d-ink)] tabular-nums">
            {receipt.total}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-[var(--d-ink-soft)]">{content.etaLabel}</dt>
          <dd className="font-bold text-[var(--d-ink)]">{content.eta}</dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={onAgain}
        className="mt-6 rounded-xl border-2 border-[#120A05] bg-[var(--d-flame)] px-5 py-3 [font-family:var(--demo-display)] text-xs uppercase leading-none text-[#1A0E08] shadow-[3px_3px_0_rgba(0,0,0,0.45)] transition-colors hover:bg-[var(--d-mustard)]"
      >
        {content.again}
      </button>
    </motion.div>
  );
}
