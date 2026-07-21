"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import type { CartLine, GridContent, GridSneaker } from "./content";
import { Kicker, Chip, TiltCard, money, shot } from "./ui";

function SneakerCard({
  item,
  content,
  locale,
  currency,
  index,
  onAdd,
}: {
  item: GridSneaker;
  content: GridContent;
  locale: string;
  currency: string;
  index: number;
  onAdd: (line: CartLine) => void;
}) {
  const [added, setAdded] = useState(false);

  const add = () => {
    if (item.soldOut) return;
    onAdd({
      key: `${item.id}-os`,
      name: `KYNETIK ${item.name}`,
      size: content.oneSize,
      price: item.price,
      image: item.image,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: "easeOut" }}
    >
      <TiltCard className="group relative overflow-hidden rounded-[1.75rem] border border-[var(--d-line)] bg-[var(--d-panel)]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={shot(item.image, 800)}
            alt={item.alt}
            fill
            sizes="(min-width: 768px) 380px, 92vw"
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
              item.soldOut ? "grayscale" : ""
            }`}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,61,129,0.18) 0%, transparent 40%, rgba(176,38,255,0.28) 100%)",
              mixBlendMode: "soft-light",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(18,8,31,0.7) 0%, transparent 50%)" }}
          />

          <div className="absolute left-4 top-4 flex gap-2" style={{ transform: "translateZ(40px)" }}>
            {item.soldOut ? (
              <Chip tone="outline">{content.soldOut}</Chip>
            ) : item.tag ? (
              <Chip tone="volt">{item.tag}</Chip>
            ) : null}
          </div>

          <p
            className="absolute bottom-4 left-4 [font-family:var(--demo-display)] text-2xl leading-none text-[var(--d-ink)]"
            style={{ transform: "translateZ(50px)" }}
          >
            {money(locale, currency, item.price)}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 p-4">
          <div>
            <h3 className="[font-family:var(--demo-display)] text-lg leading-tight text-[var(--d-ink)]">
              {item.name}
            </h3>
            <p className="mt-0.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--d-ink-soft)] [font-family:var(--demo-body)]">
              {item.colorway}
            </p>
          </div>

          <button
            type="button"
            onClick={add}
            disabled={item.soldOut}
            aria-label={item.soldOut ? content.soldOut : `${content.quickAdd} — ${item.name}`}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all [font-family:var(--demo-body)] ${
              item.soldOut
                ? "cursor-not-allowed bg-white/[0.04] text-[var(--d-mute)]"
                : added
                ? "bg-[var(--d-volt)] text-[#12081F]"
                : "bg-[var(--d-accent)] text-[#12081F] hover:scale-110"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Check className="h-4 w-4" strokeWidth={2.6} aria-hidden />
                </motion.span>
              ) : (
                <motion.span key="add" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Plus className="h-4 w-4" strokeWidth={2.6} aria-hidden />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export function SneakerGrid({
  content,
  locale,
  currency,
  onAdd,
}: {
  content: GridContent;
  locale: string;
  currency: string;
  onAdd: (line: CartLine) => void;
}) {
  return (
    <section id="vault" className="scroll-mt-20 px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Kicker text={content.label} />
          <h2 className="mt-4 [font-family:var(--demo-display)] text-5xl tracking-tight text-[var(--d-ink)] md:text-6xl">
            {content.title}
          </h2>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, i) => (
            <SneakerCard
              key={item.id}
              item={item}
              content={content}
              locale={locale}
              currency={currency}
              index={i}
              onAdd={onAdd}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
