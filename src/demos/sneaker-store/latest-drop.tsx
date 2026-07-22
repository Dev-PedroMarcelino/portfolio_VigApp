"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { Check, Plus, Ruler } from "lucide-react";
import type { CartLine, LatestContent } from "./content";
import { Kicker, Chip, money, shot } from "./ui";

const HERO_IMG = "photo-1595950653106-6c9ebd614d3a";

export function LatestDrop({
  content,
  locale,
  currency,
  onAdd,
}: {
  content: LatestContent;
  locale: string;
  currency: string;
  onAdd: (line: CartLine) => void;
}) {
  const [size, setSize] = useState<string | null>(null);
  const [activeThumb, setActiveThumb] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const reduce = useReducedMotion() ?? false;

  const gallery = [HERO_IMG, ...content.thumbs];
  const galleryAlts = [content.imageAlt, ...content.thumbAlts];
  // A single deterministic size flagged as running low (index 4 is always available).
  const lowStockSize = content.sizes[4]?.us;
  const lowStock = size !== null && size === lowStockSize;

  const add = () => {
    if (!size) return;
    onAdd({
      key: `velocity-${size}`,
      name: content.name,
      size,
      price: content.price,
      image: HERO_IMG,
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <section id="latest" className="scroll-mt-20 px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Kicker text={content.label} />
          <h2 className="mt-4 [font-family:var(--demo-display)] text-5xl tracking-tight text-[var(--d-ink)] md:text-6xl">
            {content.title}
          </h2>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* gallery */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-[var(--d-line)] bg-[var(--d-panel)]">
              <motion.div
                key={activeThumb}
                initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={shot(gallery[activeThumb], 1200)}
                  alt={galleryAlts[activeThumb]}
                  fill
                  sizes="(min-width: 1024px) 620px, 92vw"
                  className="object-cover"
                />
              </motion.div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 120% at 20% 15%, rgba(255,61,129,0.28) 0%, transparent 45%), radial-gradient(120% 120% at 90% 90%, rgba(176,38,255,0.32) 0%, transparent 50%)",
                  mixBlendMode: "soft-light",
                }}
              />
              <div className="absolute left-4 top-4">
                <Chip tone="violet">{content.colorway}</Chip>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {gallery.map((img, i) => (
                <button
                  key={img + i}
                  type="button"
                  aria-label={galleryAlts[i]}
                  aria-pressed={activeThumb === i}
                  onClick={() => setActiveThumb(i)}
                  className={`relative aspect-square overflow-hidden rounded-2xl border-2 transition-colors ${
                    activeThumb === i ? "border-[var(--d-accent)]" : "border-[var(--d-line)] hover:border-[var(--d-ink-soft)]"
                  }`}
                >
                  <Image src={shot(img, 400)} alt="" fill sizes="200px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

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

            {/* specs */}
            <div className="mt-6 grid grid-cols-2 gap-2.5">
              {content.specs.map((sp) => (
                <div key={sp.k} className="rounded-xl border border-[var(--d-line)] bg-white/[0.02] px-3.5 py-3">
                  <p className="text-[0.56rem] font-bold uppercase tracking-[0.2em] text-[var(--d-mute)] [font-family:var(--demo-body)]">
                    {sp.k}
                  </p>
                  <p className="mt-1 text-sm text-[var(--d-ink)]">{sp.v}</p>
                </div>
              ))}
            </div>

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
              <div className="mt-3 grid grid-cols-5 gap-2">
                {content.sizes.map((opt) => {
                  const selected = size === opt.us;
                  return (
                    <button
                      key={opt.us}
                      type="button"
                      disabled={!opt.available}
                      aria-pressed={selected}
                      onClick={() => setSize(opt.us)}
                      className={`relative rounded-xl border py-2.5 text-sm font-bold tabular-nums transition-all [font-family:var(--demo-body)] ${
                        !opt.available
                          ? "cursor-not-allowed border-[var(--d-line)] text-[var(--d-mute)]/50"
                          : selected
                          ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-[#12081F]"
                          : "border-[var(--d-line)] text-[var(--d-ink)] hover:border-[var(--d-accent)]"
                      }`}
                    >
                      {opt.us}
                      {!opt.available && (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-0 flex items-center justify-center"
                        >
                          <span className="h-px w-8 rotate-[-24deg] bg-[var(--d-mute)]/60" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <AnimatePresence>
                {lowStock && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[var(--d-volt)] [font-family:var(--demo-body)]"
                  >
                    {content.lowStock}
                  </motion.p>
                )}
              </AnimatePresence>
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
