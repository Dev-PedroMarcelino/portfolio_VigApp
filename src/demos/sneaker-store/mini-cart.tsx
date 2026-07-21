"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import type { CartContent, CartLine } from "./content";
import { money, shot } from "./ui";

export function MiniCart({
  open,
  onClose,
  items,
  onRemove,
  content,
  locale,
  currency,
}: {
  open: boolean;
  onClose: () => void;
  items: CartLine[];
  onRemove: (index: number) => void;
  content: CartContent;
  locale: string;
  currency: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const subtotal = items.reduce((sum, line) => sum + line.price, 0);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9000]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label={content.close}
            onClick={onClose}
            className="absolute inset-0 bg-[#080312]/70 backdrop-blur-sm"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={content.title}
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={{ x: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-[var(--d-line)] bg-[var(--d-bg-2)]"
          >
            <div className="flex items-center justify-between border-b border-[var(--d-line)] px-5 py-4">
              <div className="flex items-center gap-2 text-[var(--d-ink)]">
                <ShoppingBag className="h-4 w-4" strokeWidth={1.9} aria-hidden />
                <h2 className="[font-family:var(--demo-display)] text-lg tracking-tight">{content.title}</h2>
                {items.length > 0 && (
                  <span className="rounded-full bg-[var(--d-accent)] px-2 py-0.5 text-[0.6rem] font-bold text-[#12081F] [font-family:var(--demo-body)]">
                    {items.length}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={content.close}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-ink)]"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-mute)]">
                    <ShoppingBag className="h-6 w-6" strokeWidth={1.6} aria-hidden />
                  </span>
                  <p className="mt-4 text-sm font-bold text-[var(--d-ink)]">{content.empty}</p>
                  <p className="mt-1.5 text-[0.8rem] leading-relaxed text-[var(--d-ink-soft)]">
                    {content.emptyHint}
                  </p>
                </div>
              ) : (
                <ul className="space-y-3">
                  <AnimatePresence initial={false}>
                    {items.map((line, index) => (
                      <motion.li
                        key={`${line.key}-${index}`}
                        layout
                        initial={reduce ? undefined : { opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, x: 30 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-3 rounded-2xl border border-[var(--d-line)] bg-white/[0.02] p-3"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                          <Image src={shot(line.image, 200)} alt="" fill sizes="64px" className="object-cover" />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <p className="truncate text-[0.82rem] font-bold text-[var(--d-ink)]">{line.name}</p>
                          <p className="mt-0.5 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-[var(--d-ink-soft)] [font-family:var(--demo-body)]">
                            {content.sizeWord} {line.size}
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <span className="text-sm font-bold text-[var(--d-accent)] [font-family:var(--demo-display)]">
                              {money(locale, currency, line.price)}
                            </span>
                            <button
                              type="button"
                              onClick={() => onRemove(index)}
                              aria-label={content.remove}
                              className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--d-mute)] transition-colors hover:text-[var(--d-accent)]"
                            >
                              <Trash2 className="h-3.5 w-3.5" strokeWidth={1.9} />
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            <div className="border-t border-[var(--d-line)] px-5 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[var(--d-ink-soft)] [font-family:var(--demo-body)]">
                  {content.subtotal}
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={subtotal}
                    initial={reduce ? undefined : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="[font-family:var(--demo-display)] text-3xl text-[var(--d-ink)]"
                  >
                    {money(locale, currency, subtotal)}
                  </motion.span>
                </AnimatePresence>
              </div>
              <p className="mt-1.5 text-[0.66rem] text-[var(--d-mute)] [font-family:var(--demo-body)]">
                {content.shippingNote}
              </p>
              <button
                type="button"
                disabled={items.length === 0}
                className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-[0.72rem] font-bold uppercase tracking-[0.2em] transition-all [font-family:var(--demo-body)] ${
                  items.length === 0
                    ? "cursor-not-allowed bg-white/[0.06] text-[var(--d-mute)]"
                    : "bg-[var(--d-accent)] text-[#12081F] hover:scale-[1.02]"
                }`}
              >
                {content.checkout}
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} aria-hidden />
              </button>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
