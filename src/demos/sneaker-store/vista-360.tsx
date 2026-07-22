"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { Check, Plus, Rotate3d, Ruler } from "lucide-react";
import { SketchfabEmbed } from "@/components/demos/sketchfab-embed";
import type { CartLine, Vista360Content } from "./content";
import { Kicker, Chip, money, VISTA_ACCENT } from "./ui";
import { VISTA_MODEL } from "./content";

/**
 * "Gira o tênis" — featured product with a real Sketchfab 3D scan inside a
 * neon house-style frame. The buy panel feeds the same mini-cart as the rest
 * of the store.
 */
export function Vista360({
  content,
  locale,
  currency,
  onAdd,
}: {
  content: Vista360Content;
  locale: string;
  currency: string;
  onAdd: (line: CartLine) => void;
}) {
  const [size, setSize] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);
  const reduce = useReducedMotion() ?? false;

  const add = () => {
    if (!size) return;
    onAdd({
      key: `aj1-panda-${size}`,
      name: content.name,
      size,
      price: content.price,
      image: VISTA_MODEL.thumb,
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <section id="vista" className="relative scroll-mt-20 overflow-hidden px-5 py-20 md:py-28">
      {/* radial glow behind the stage */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-[26rem] w-[26rem] rounded-full opacity-40 blur-[130px]"
        style={{ background: "radial-gradient(circle, var(--d-accent) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Kicker text={content.label} live />
          <h2 className="mt-4 [font-family:var(--demo-display)] text-5xl tracking-tight text-[var(--d-ink)] md:text-6xl">
            {content.title}
          </h2>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* 3D stage in a neon frame */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative rounded-[2rem] border border-[var(--d-accent)]/50 p-2 shadow-[0_0_60px_rgba(255,61,129,0.18)]">
              {/* corner ticks */}
              <span aria-hidden className="absolute -left-px -top-px h-6 w-6 rounded-tl-[2rem] border-l-2 border-t-2 border-[var(--d-accent)]" />
              <span aria-hidden className="absolute -right-px -top-px h-6 w-6 rounded-tr-[2rem] border-r-2 border-t-2 border-[var(--d-accent)]" />
              <span aria-hidden className="absolute -bottom-px -left-px h-6 w-6 rounded-bl-[2rem] border-b-2 border-l-2 border-[var(--d-accent)]" />
              <span aria-hidden className="absolute -bottom-px -right-px h-6 w-6 rounded-br-[2rem] border-b-2 border-r-2 border-[var(--d-accent)]" />

              <SketchfabEmbed
                uid={VISTA_MODEL.uid}
                title={content.modelTitle}
                thumb={VISTA_MODEL.thumb}
                credit={VISTA_MODEL.credit}
                loadLabel={content.loadLabel}
                hint={content.hint}
                accent={VISTA_ACCENT}
                autospin
                className="aspect-square w-full rounded-[1.6rem] bg-[var(--d-panel)]"
              />
            </div>

            {/* floating sticker */}
            <div className="absolute -left-3 -top-4 rotate-[-8deg]">
              <Chip tone="pink">{content.badge}</Chip>
            </div>

            <p className="mt-4 flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--d-mute)] [font-family:var(--demo-body)]">
              <Rotate3d className="h-3.5 w-3.5 text-[var(--d-accent)]" strokeWidth={2} aria-hidden />
              {content.featureNote}
            </p>
          </motion.div>

          {/* buy panel */}
          <div className="rounded-[2rem] border border-[var(--d-line)] bg-[var(--d-panel)] p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="[font-family:var(--demo-display)] text-2xl leading-tight text-[var(--d-ink)]">
                  {content.name}
                </h3>
                <p className="mt-1 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[var(--d-ink-soft)] [font-family:var(--demo-body)]">
                  {content.colorway}
                </p>
              </div>
              <p className="[font-family:var(--demo-display)] text-3xl text-[var(--d-accent)]">
                {money(locale, currency, content.price)}
              </p>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.description}</p>

            {/* sizes */}
            <fieldset className="mt-7">
              <div className="flex items-center justify-between">
                <legend className="text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[var(--d-ink)] [font-family:var(--demo-body)]">
                  {content.sizeLabel}
                </legend>
                <span className="flex items-center gap-1.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[var(--d-mute)] [font-family:var(--demo-body)]">
                  <Ruler className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
                  {content.sizeUnit}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7">
                {content.sizes.map((opt) => {
                  const selected = size === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setSize(opt)}
                      className={`rounded-xl border py-2.5 text-sm font-bold tabular-nums transition-all [font-family:var(--demo-body)] ${
                        selected
                          ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-[#12081F]"
                          : "border-[var(--d-line)] text-[var(--d-ink)] hover:border-[var(--d-accent)]"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <button
              type="button"
              onClick={add}
              disabled={!size}
              className={`mt-7 flex w-full items-center justify-center gap-2 rounded-full py-4 text-[0.74rem] font-bold uppercase tracking-[0.2em] transition-all [font-family:var(--demo-body)] ${
                !size
                  ? "cursor-not-allowed bg-white/[0.06] text-[var(--d-mute)]"
                  : justAdded
                  ? "bg-[var(--d-volt)] text-[#12081F]"
                  : "bg-[var(--d-accent)] text-[#12081F] hover:scale-[1.02]"
              }`}
            >
              {!size ? (
                content.pickSize
              ) : justAdded ? (
                <>
                  <Check className="h-4 w-4" strokeWidth={2.4} aria-hidden />
                  {content.added}
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" strokeWidth={2.4} aria-hidden />
                  {content.addToCart}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
